import { getAllPublicNotes } from "./lib/notes";
import NoteEditor from "./components/NoteEditor";
import SearchNotes from "./components/SearchNotes";
import NoteList from "./components/NoteList";

export default async function HomePage() {
  const publicNotes = getAllPublicNotes();

  return (
    <div className="space-y-10">
      <section className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">NoteVault</h1>
        <p className="text-gray-500">
          Collaborative notes powered by React Server Components
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Search Notes
        </h2>
        <SearchNotes />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Create a Note
        </h2>
        <NoteEditor />
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Public Notes
        </h2>
        <NoteList notes={publicNotes} />
      </section>
    </div>
  );
}
