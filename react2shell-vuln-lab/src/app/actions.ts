"use server";

import {
  searchNotes,
  createNote,
  deleteNote,
  getAllPublicNotes,
} from "./lib/notes";
import { revalidatePath } from "next/cache";

export async function searchNotesAction(formData: FormData) {
  const query = formData.get("query") as string;
  if (!query || query.trim().length === 0) {
    return [];
  }
  return searchNotes(query.trim());
}

export async function createNoteAction(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const author = (formData.get("author") as string)?.trim() || "anonymous";
  const isPublic = formData.get("isPublic") === "true";

  if (!title || !content) {
    return { error: "Title and content are required" };
  }

  const note = createNote({ title, content, author, isPublic });
  revalidatePath("/");
  return { success: true, noteId: note.id };
}

export async function deleteNoteAction(formData: FormData) {
  const noteId = formData.get("noteId") as string;
  if (!noteId) {
    return { error: "Note ID is required" };
  }

  const deleted = deleteNote(noteId);
  if (!deleted) {
    return { error: "Note not found" };
  }

  revalidatePath("/");
  return { success: true };
}

export async function getPublicNotesAction() {
  return getAllPublicNotes();
}
