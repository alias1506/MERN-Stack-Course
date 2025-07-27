import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Home from "./pages/Home.jsx";
import Notes from "./pages/Notes.jsx";
import AddNote from "./pages/AddNote.jsx";
import EditNote from "./pages/EditNote.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/addnote" element={<AddNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
