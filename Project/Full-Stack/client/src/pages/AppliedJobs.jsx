import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("You must be logged in to view applied jobs.");
      navigate("/login");
      return;
    }

    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/applications/my-applications",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setApplications(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applied jobs.");
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate, token]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex flex-col bg-blue-50 px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
          Applied Jobs
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading applied jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : applications.length === 0 ? (
          <p className="text-center text-gray-700">
            You have not applied to any jobs yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {applications.map(({ job, _id }) => (
              <div
                key={_id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between relative"
              >
                <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                  ✅ Applied
                </span>

                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {job.jobTitle}
                </h3>
                <p className="text-gray-700 mb-1">
                  <strong>Company:</strong> {job.company}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Salary:</strong> {job.salaryRange}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Type:</strong> {job.jobType}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Skills:</strong>{" "}
                  {job.skillsRequired?.join(", ") || "N/A"}
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Description:</strong> {job.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
