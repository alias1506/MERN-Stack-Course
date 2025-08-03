import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setUserId(decoded.id || decoded._id);
      } catch (err) {
        console.error("Invalid token:", err.message);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleExploreJobs = async () => {
    if (!userId) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/auth/all-users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = res.data.user;

      const isProfileUpdated =
        user.phone &&
        user.location &&
        user.education &&
        user.experience &&
        user.skills &&
        user.skills.length > 0;

      if (isProfileUpdated) {
        navigate("/my-job");
      } else {
        alert("⚠️ Please update your profile before exploring jobs.");
        navigate("/profile");
      }
    } catch (err) {
      console.error("Error checking profile:", err);
      alert("Failed to check profile. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center bg-blue-50 px-4">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">
          Welcome to JobPortal
        </h2>
        <p className="text-lg text-gray-700 max-w-xl">
          Find your dream job or post opportunities for others. Whether you're a
          job seeker or a job poster, our platform connects talent with
          opportunity.
        </p>

        {role === "job-seeker" && (
          <div className="mt-6">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
              onClick={handleExploreJobs}
            >
              Explore Jobs
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
