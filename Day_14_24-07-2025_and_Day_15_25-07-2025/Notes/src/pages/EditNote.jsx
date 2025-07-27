import React, { useState } from "react";
import { Input } from "../components/input";
import Button from "../components/button";
import { getNotes, saveNotes } from "../utils/localStorage";
import { useNavigate, useParams } from "react-router";

export default function EditNote() {
  const { id } = useParams();
  const note = getNotes().find((note) => note.id === id);
  const [title, setTitle] = useState(note.title ?? "");
  const [content, setContent] = useState(note.content ?? "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, content);

    const notes = getNotes().map((note) =>
      note.id === id ? { ...note, title, content } : note
    );

    saveNotes(notes);
    navigate("/notes");
  };
  return (
    <div className="grow flex flex-col items-center justify-center">
      <div className="w-xl px-12 py-8 bg-neutral-100/50 rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Update Note</h1>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-3">
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button text="Update Note" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
}
