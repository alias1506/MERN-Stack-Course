import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import AddStudents from "./pages/AddStudents";
import EditStudent from "./pages/EditStudents";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Table />} />
            <Route path="/addStudents" element={<AddStudents />} />
            <Route path="/editStudent/:id" element={<EditStudent />} />{" "}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
