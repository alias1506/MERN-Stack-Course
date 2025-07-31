import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export default function EditJob() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      alert("You must be logged in to edit a job.");
      navigate("/login");
      return;
    }

    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/jobs/all-jobs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const job = res.data;

        // Pre-fill form
        setValue("jobTitle", job.jobTitle);
        setValue("company", job.company);
        setValue("location", job.location);
        setValue("description", job.description);
        setValue("skillsRequired", job.skillsRequired.join(", "));
        setValue("salaryRange", job.salaryRange);
        setValue("jobType", job.jobType);

        setLoading(false);
      } catch (err) {
        console.error("❌ Failed to fetch job:", err);
        alert("Failed to load job data.");
        navigate("/my-job");
      }
    };

    fetchJob();
  }, [id, token, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedJob = {
        ...data,
        skillsRequired: data.skillsRequired.split(",").map((s) => s.trim()),
      };

      await axios.put(
        `http://localhost:5000/api/jobs/update-job/${id}`,
        updatedJob,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Job updated successfully!");
      navigate("/my-job");
    } catch (err) {
      console.error(
        "❌ Error updating job:",
        err.response?.data || err.message
      );
      alert("Failed to update job. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <p className="text-blue-700 text-lg">Loading job data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center bg-blue-50 px-4 py-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Edit Job</h2>
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
            Update Job
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
