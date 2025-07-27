import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-black flex justify-between top-0 w-full p-3">
      <Link to="/" className="text-white text-xl font-bold px-2">
        Students Details
      </Link>
      <div className="flex items-center">
        <Link to="/addStudents" className="text-white text-lg px-2 font-medium">
          Add Students
        </Link>
      </div>
    </div>
  );
}
