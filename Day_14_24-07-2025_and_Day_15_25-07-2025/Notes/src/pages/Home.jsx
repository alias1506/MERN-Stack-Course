import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/button";

export default function Home() {
  return (
    <div className="grow flex flex-col items-center justify-center text-center">
      <div className="max-w-xl">
        <div className="text-6xl mb-6 flex justify-center">
          <img src="/notes.png" alt="" className="w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Welcome to the Note App.</h1>
        <p className="text-gray-600 text-lg mb-6">
          Quickly create, edit, and manage your notes - all in one place.
          <br />
          Simple, fast, and stored in your browser.
        </p>
        <Link to="/notes">
          <Button text="View My Notes" />
        </Link>
      </div>
    </div>
  );
}
