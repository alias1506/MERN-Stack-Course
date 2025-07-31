import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const fetchProfile = async () => {
        const res = await axios.get(
          `http://localhost:5000/api/auth/all-users/${decoded.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = res.data;
        console.log("👤 Profile Data:", userData);

        // Reset the form with existing profile values
        reset({
          phone: userData.user.phone || "",
          location: userData.user.location || "",
          education: userData.user.education || "",
          experience: userData.user.experience || "",
          skills: userData.user.skills ? userData.user.skills.join(", ") : "",
        });
      };

      fetchProfile();
    } catch (err) {
      console.error("Error fetching profile data:", err.message);
    }
  }, [reset, token]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        {
          ...data,
          skills: data.skills.split(",").map((s) => s.trim()), // convert to array
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Profile Updated:", res.data);
      alert("Profile updated successfully!");
      navigate("/home");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Profile update failed.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center bg-blue-50 px-4 py-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">
          Update Profile
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-4"
        >
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone")}
            className="w-full px-4 py-2 border rounded-xl"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">Phone Number is required</p>
          )}
          <input
            type="text"
            placeholder="Location"
            {...register("location")}
            className="w-full px-4 py-2 border rounded-xl"
          />
          {errors.location && (
            <p className="text-sm text-red-500">Location is required</p>
          )}
          <input
            type="text"
            placeholder="Education Qualification"
            {...register("education")}
            className="w-full px-4 py-2 border rounded-xl"
          />
          {errors.education && (
            <p className="text-sm text-red-500">
              Education Qualification is required
            </p>
          )}
          <input
            type="text"
            placeholder="Experience"
            {...register("experience")}
            className="w-full px-4 py-2 border rounded-xl"
          />
          {errors.experience && (
            <p className="text-sm text-red-500">Experience is required</p>
          )}
          <input
            type="text"
            placeholder="Skills (comma separated)"
            {...register("skills")}
            className="w-full px-4 py-2 border rounded-xl"
          />
          {errors.skills && (
            <p className="text-sm text-red-500">Skills required</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
          >
            Update
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
