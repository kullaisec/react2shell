import { v4 as uuidv4 } from "uuid";

export interface Note {
  id: string;
  title: string;
  content: string;
  author: string;
  isPublic: boolean;
  createdAt: string;
}

const notes: Note[] = [
  {
    id: uuidv4(),
    title: "Getting Started with NoteVault",
    content:
      "Welcome to NoteVault! This is a collaborative notes platform built with React Server Components and Next.js. Create, search, and share notes with your team.",
    author: "system",
    isPublic: true,
    createdAt: new Date("2025-11-01").toISOString(),
  },
  {
    id: uuidv4(),
    title: "React Server Components Overview",
    content:
      "React Server Components allow rendering parts of your application on the server, reducing client-side JavaScript and improving performance. They enable seamless data fetching and streaming between server and client.",
    author: "admin",
    isPublic: true,
    createdAt: new Date("2025-11-15").toISOString(),
  },
  {
    id: uuidv4(),
    title: "Team Standup Notes — Dec 2025",
    content:
      "Discussed Q4 roadmap, migration to Next.js 15, and upcoming security audit. Action items: update dependencies, review server action endpoints, enable rate limiting on API routes.",
    author: "alice",
    isPublic: true,
    createdAt: new Date("2025-12-01").toISOString(),
  },
];

export function getAllPublicNotes(): Note[] {
  return notes.filter((n) => n.isPublic);
}

export function searchNotes(query: string): Note[] {
  const q = query.toLowerCase();
  return notes.filter(
    (n) =>
      n.isPublic &&
      (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q))
  );
}

export function getNoteById(id: string): Note | undefined {
  return notes.find((n) => n.id === id);
}

export function createNote(data: {
  title: string;
  content: string;
  author: string;
  isPublic: boolean;
}): Note {
  const note: Note = {
    id: uuidv4(),
    ...data,
    createdAt: new Date().toISOString(),
  };
  notes.push(note);
  return note;
}

export function deleteNote(id: string): boolean {
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) return false;
  notes.splice(index, 1);
  return true;
}
