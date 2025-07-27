import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotes, saveNotes } from "../utils/localStorage";
import { Button } from "./Button";

export default function Table() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setStudents(getNotes());
  }, []);

  const handleDelete = (id) => {
    const filtered = students.filter((student) => student.id !== id);
    saveNotes(filtered);
    setStudents(filtered);
  };

  const handleEdit = (id) => {
    navigate(`/editStudent/${id}`);
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full bg-white text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Sl. No.</th>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Year</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.length === 0 ? (
              <tr>
                <td className="px-6 py-4 text-center" colSpan="5">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{student.studentName}</td>
                  <td className="px-6 py-4">{student.department}</td>
                  <td className="px-6 py-4">{student.year}</td>
                  <td className="px-6 py-4 space-x-2">
                    <Button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs"
                      onClick={() => handleEdit(student.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
