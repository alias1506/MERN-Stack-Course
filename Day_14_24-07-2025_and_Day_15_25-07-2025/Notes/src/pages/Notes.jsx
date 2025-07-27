import NoteCard from "../components/note-card";
import { useEffect, useState } from "react";
import { getNotes, saveNotes } from "../utils/localStorage";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    console.log(getNotes());
    
    setNotes(getNotes());
  }, []);

  const deleteNote = (id) => {
    const updated = notes.filter((note) => note.id !== id);
    setNotes(updated);
    saveNotes(updated);
  };
  return (
    <div className="container mx-auto px-8 grow mt-6">
      <h1 className="text-2xl font-bold mb-4">All Notes </h1>
      {!notes.length && <p className="text-gray-600">No notes found.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
    </div>
  );
}
