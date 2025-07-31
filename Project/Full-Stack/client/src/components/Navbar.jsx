import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const token = localStorage.getItem("token");
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded);
      role = decoded.role;
    } catch (err) {
      console.error("Invalid token:", err.message);
    }
  }

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/home" className="text-xl font-bold">
        Job Portal
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/home" className="hover:underline">
          Home
        </Link>

        {role === "job-poster" && (
          <>
            <Link to="/create-job" className="hover:underline">
              Create Job
            </Link>
            <Link to="/my-job" className="hover:underline">
              My Jobs
            </Link>
          </>
        )}

        <Link to="/profile" className="hover:underline">
          Profile
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100 hover:cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
