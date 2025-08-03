import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AppliedJobs() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col bg-blue-50 px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Applied Jobs</h1>
        <p className="text-gray-700">You have not applied to any jobs yet.</p>
      </main>
      <Footer />
    </div>
  );
}
