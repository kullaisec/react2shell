"use client";

import { useState, useTransition } from "react";
import { searchNotesAction } from "../actions";
import type { Note } from "../lib/notes";

export default function SearchNotes() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Note[]>([]);
  const [searched, setSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    if (!query.trim()) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.set("query", query);

      const searchResults = (await searchNotesAction(formData)) as Note[];
      setResults(searchResults);
      setSearched(true);
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Search notes..."
        />
        <button
          onClick={handleSearch}
          disabled={isPending}
          className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors font-medium"
        >
          {isPending ? "Searching..." : "Search"}
        </button>
      </div>

      {searched && (
        <div className="mt-4">
          {results.length === 0 ? (
            <p className="text-sm text-gray-500">
              No results found for &quot;{query}&quot;
            </p>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                {results.length} result{results.length !== 1 && "s"} found
              </p>
              {results.map((note) => (
                <div
                  key={note.id}
                  className="p-4 bg-gray-50 rounded-md border border-gray-100"
                >
                  <h3 className="font-medium text-gray-900">{note.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {note.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    By {note.author} ·{" "}
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
