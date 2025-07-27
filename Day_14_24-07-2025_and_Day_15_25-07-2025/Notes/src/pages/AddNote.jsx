import React, { useState } from "react";
import { Input } from "../components/input";
import Button from "../components/button";
import { v4 as uuidv4 } from "uuid";
import { getNotes, saveNotes } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, content);
    const newNote = { id: uuidv4(), title, content };
    console.log(newNote.id);

    const updatedNotes = [...getNotes(), newNote];
    saveNotes(updatedNotes);
    console.log(updatedNotes);

    navigate("/notes");
  };
  return (
    <div className="grow flex flex-col items-center justify-center">
      <div className="w-xl px-12 py-8 bg-neutral-100/50 rounded-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Create New Note</h1>

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
          <Button text="Save Note" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
}
