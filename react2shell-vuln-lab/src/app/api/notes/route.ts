import { NextRequest, NextResponse } from "next/server";
import {
  getAllPublicNotes,
  getNoteById,
  createNote,
  searchNotes,
} from "../../lib/notes";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const query = searchParams.get("q");

  if (id) {
    const note = getNoteById(id);
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json(note);
  }

  if (query) {
    const results = searchNotes(query);
    return NextResponse.json(results);
  }

  const notes = getAllPublicNotes();
  return NextResponse.json(notes);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, author, isPublic } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const note = createNote({
      title,
      content,
      author: author || "anonymous",
      isPublic: isPublic ?? false,
    });

    return NextResponse.json(note, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
