import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("📦 Register Data:", data);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName", { required: true })}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">First Name is required</p>
          )}

          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName", { required: true })}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">Last Name is required</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.email && (
            <p className="text-sm text-red-500">Email is required</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.password && (
            <p className="text-sm text-red-500">Password is required</p>
          )}

          <select
            {...register("role", { required: true })}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select Role</option>
            <option value="job-seeker">Job-Seeker</option>
            <option value="job-poster">Job-Poster</option>
          </select>
          {errors.role && (
            <p className="text-sm text-red-500">Role is required</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
