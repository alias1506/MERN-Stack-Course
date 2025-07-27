import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { getNotes, saveNotes } from "../utils/localStorage";

export default function AddStudents() {
  const [formData, setFormData] = useState({
    studentName: "",
    department: "",
    year: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = {
      id: Date.now(),
      ...formData,
    };

    const existingStudents = getNotes();
    const updatedStudents = [...existingStudents, newStudent];
    saveNotes(updatedStudents);

    setFormData({
      studentName: "",
      department: "",
      year: "",
    });

    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-2xl shadow space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Add Student
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
          Submit
        </Button>
      </form>
    </div>
  );
}
