import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function CreateJob() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("You must be logged in to post a job.");
      navigate("/login");
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    try {
      const jobData = {
        ...data,
        skillsRequired: data.skillsRequired.split(",").map((s) => s.trim()),
      };

      // ✅ Fixed endpoint: "jobs" instead of "job"
      const res = await axios.post("http://localhost:5000/api/jobs", jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Job Created:", res.data);
      alert("Job posted successfully!");
      reset();
      navigate("/home");
    } catch (err) {
      console.error("❌ Error posting job:", err.response?.data || err.message);
      alert(
        err.response?.data?.message || "Failed to post job. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center bg-blue-50 px-4 py-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Create Job</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
        >
          <input
            type="text"
            placeholder="Job Title"
            {...register("jobTitle", { required: true })}
            className="w-full px-4 py-2 border rounded-xl"
          />
          {errors.jobTitle && (
            <p className="text-sm text-red-500">Job Title is required</p>
          )}

          <input
            type="text"
            placeholder="Company"
            {...register("company", { required: true })}
            className="w-full px-4 py-2 border rounded-xl"
          />
          {errors.company && (
            <p className="text-sm text-red-500">Company is required</p>
          )}

          <input
            type="text"
            placeholder="Location"
            {...register("location", { required: true })}
            className="w-full px-4 py-2 border rounded-xl"
          />
          {errors.location && (
            <p className="text-sm text-red-500">Location is required</p>
          )}

          <textarea
            placeholder="Job Description"
            {...register("description", { required: true })}
            className="w-full px-4 py-2 border rounded-xl h-24"
          />
          {errors.description && (
            <p className="text-sm text-red-500">Description is required</p>
          )}

          <input
            type="text"
            placeholder="Skills Required (comma separated)"
            {...register("skillsRequired", { required: true })}
            className="w-full px-4 py-2 border rounded-xl"
          />
          {errors.skillsRequired && (
            <p className="text-sm text-red-500">Skills are required</p>
          )}

          <input
            type="text"
            placeholder="Salary Range (e.g. ₹50,000 - ₹80,000)"
            {...register("salaryRange", { required: true })}
            className="w-full px-4 py-2 border rounded-xl"
          />
          {errors.salaryRange && (
            <p className="text-sm text-red-500">Salary Range is required</p>
          )}

          <select
            {...register("jobType", { required: true })}
            className="w-full px-4 py-2 border rounded-xl"
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Remote">Remote</option>
          </select>
          {errors.jobType && (
            <p className="text-sm text-red-500">Job Type is required</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
          >
            Post Job
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
