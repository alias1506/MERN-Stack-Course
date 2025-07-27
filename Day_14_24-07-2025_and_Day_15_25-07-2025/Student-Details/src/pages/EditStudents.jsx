import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { getNotes, saveNotes } from "../utils/localStorage";

export default function EditStudent() {
  const [formData, setFormData] = useState({
    studentName: "",
    department: "",
    year: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const existingStudents = getNotes();
    const studentToEdit = existingStudents.find(
      (student) => student.id === Number(id)
    );

    if (!studentToEdit) {
      alert("Student not found");
      navigate("/");
    } else {
      setFormData({
        studentName: studentToEdit.studentName,
        department: studentToEdit.department,
        year: studentToEdit.year,
      });
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const students = getNotes();

    const updated = students.map((s) =>
      s.id === Number(id) ? { ...s, ...formData } : s
    );

    saveNotes(updated);
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-2xl shadow space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Edit Student
        </h2>

        <div>
          <Label htmlFor="studentName">Student Name</Label>
          <Input
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Enter student name"
          />
        </div>

        <div>
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter department"
          />
        </div>

        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Enter year"
          />
        </div>

        <Button type="submit" className="w-full mt-4">
          Update
        </Button>
      </form>
    </div>
  );
}
