import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PrivateRoute from "./components/privateRoutes.jsx";
import Profile from "./pages/Profile.jsx";
import CreateJob from "./pages/CreateJob.jsx";
import MyJobs from "./pages/MyJobs.jsx";
import EditJob from "./pages/EditJob.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-job" element={<MyJobs />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
