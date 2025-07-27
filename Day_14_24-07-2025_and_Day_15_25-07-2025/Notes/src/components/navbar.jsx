import React from "react";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="bg-blue-600 flex justify-between p-3  top-0 w-full">
      <Link to="/" className="flex items-center">
        <img src="/notes.png" className="w-10 h-10" />
        <h1 className="px-3 text-white text-xl font-bold">Notes App</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-white text-lg font-medium">
          Home
        </Link>
        <Link to="/notes" className="text-white text-lg font-medium">
          Notes
        </Link>
        <Link to="/addnote" className="text-white text-lg font-medium">
          Create Notes
        </Link>
       
      </div>
    </div>
  );
}
