import type { Note } from "../lib/notes";

export default function NoteList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) {
    return (
      <p className="text-center text-gray-500 py-6">
        No public notes yet. Create one above!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow"
        >
          <h3 className="font-semibold text-gray-900 mb-1">{note.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{note.content}</p>
          <p className="text-xs text-gray-400 mt-3">
            By {note.author} · {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
