import React from "react";
import Button from "./button";
import { Link } from "react-router";

export default function NoteCard({ note: { id, title, content }, onDelete }) {
  return (
    <div className="shadow-lg p-4 rounded bg-gray-100">
      <h2 className="test-lg font-bold">{title}</h2>
      <p className="text-gray-600">{content}</p>
      <div className="mt-4 flex gap-2">
        <Link to={`/edit/${id}`}>
          <Button text="Edit" />
        </Link>
        <Button
          text="Delete"
          onClick={() => onDelete(id)}
          className="bg-red-600 hover:bg-red-700"
        />
      </div>
    </div>
  );
}
