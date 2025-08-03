import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("You must be logged in to view jobs.");
      navigate("/login");
      return;
    }

    const decoded = jwtDecode(token);
    setUserRole(decoded.role);

    const fetchJobsAndApplications = async () => {
      try {
        const jobEndpoint =
          decoded.role === "job-poster"
            ? "http://localhost:5000/api/jobs/my-jobs"
            : "http://localhost:5000/api/jobs/all-jobs";

        const [jobsRes, appsRes] = await Promise.all([
          axios.get(jobEndpoint, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          decoded.role === "job-seeker"
            ? axios.get(
                "http://localhost:5000/api/applications/my-applications",
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              )
            : Promise.resolve({ data: [] }),
        ]);

        const jobsData =
          decoded.role === "job-seeker" ? jobsRes.data.jobs : jobsRes.data;
        setJobs(jobsData);

        if (decoded.role === "job-seeker") {
          const appliedIds = appsRes.data.map((app) => app.job._id);
          setAppliedJobIds(appliedIds);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load jobs.");
        setLoading(false);
      }
    };

    fetchJobsAndApplications();
  }, [navigate, token]);

  const handleEdit = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Failed to delete job:", err);
      alert("Failed to delete the job. Please try again.");
    }
  };

  const handleApply = async (jobId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/applications/${jobId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAppliedJobIds([...appliedJobIds, jobId]);
    } catch (err) {
      if (err.response?.data?.message === "You already applied to this job") {
        alert("You have already applied to this job.");
        setAppliedJobIds([...appliedJobIds, jobId]); // fallback to prevent repeat
      } else {
        console.error("Failed to apply:", err);
        alert("Failed to apply for the job. Try again.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-blue-50 px-4 py-10">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">
          {userRole === "job-poster" ? "My Posted Jobs" : "Available Jobs"}
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-600">
            {userRole === "job-poster"
              ? "You haven't posted any jobs yet."
              : "No jobs available at the moment."}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => {
              const isApplied = appliedJobIds.includes(job._id);

              return (
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
                >
                  <div>
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

                  <div className="mt-4 flex justify-between">
                    {userRole === "job-poster" ? (
                      <>
                        <button
                          className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                          onClick={() => handleEdit(job._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                          onClick={() => handleDelete(job._id)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        className={`${
                          isApplied
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        } text-white px-4 py-1 rounded w-full`}
                        onClick={() => !isApplied && handleApply(job._id)}
                        disabled={isApplied}
                      >
                        {isApplied ? "Applied" : "Apply"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
