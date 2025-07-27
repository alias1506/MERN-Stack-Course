import React from "react";

export default function Button({ text, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 ${className}`}
    >
      {text}
    </button>
  );
}
