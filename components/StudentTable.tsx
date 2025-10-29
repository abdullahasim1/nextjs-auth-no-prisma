"use client";

import { useState } from "react";
import { useOptimistic } from "react";
import { deleteStudent } from "@/app/actions/studentActions";
import StudentForm from "./StudentForm";
import SearchBar from "./SearchBar";
import { User, Edit, Trash2, UserPlus, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Student } from "@/app/actions/studentActions";

export default function StudentTable({ students }: { students: Student[] }) {
  const [optimisticStudents, optimisticDelete] = useOptimistic(
    students,
    (state: Student[], id: string) => state.filter((s) => s.id !== id)
  );

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Show 5 students per page

  // 🔍 Filter students by search
  const filteredStudents = optimisticStudents.filter((student) =>
    [student.name, student.email, student.grade]
      .some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  // Reset to first page when search changes
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // 🚨 If search term is entered but no match found → throw error
  if (searchTerm && filteredStudents.length === 0) {
    throw new Error(`No students found for "${searchTerm}".`);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 space-y-4">
      {/* ✅ Search bar on top */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />

      {/* ✅ Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-700">Student List</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Show:</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Items per page"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">per page</span>
          </div>
          <button
            onClick={() => setShowAddPopup(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            <UserPlus size={16} />
            Add Student
          </button>
        </div>
      </div>

      {/* ✅ Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-xs">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-center">Age</th>
              <th className="p-3 text-center">Grade</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((student) => (
              <tr
                key={student.id}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="p-3 font-medium text-gray-800 flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User size={16} className="text-blue-600" />
                  </div>
                  {student.name}
                </td>
                <td className="p-3">{student.email}</td>
                <td className="p-3 text-center">{student.age}</td>
                <td className="p-3 text-center">{student.grade}</td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setEditingStudent(student)}
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="Edit Student"
                      aria-label="Edit"
                    >
                      <Edit size={16} />
                      <span className="sr-only">Edit</span>
                    </button>
                    <form
                      action={async () => {
                        optimisticDelete(student.id);
                        await deleteStudent(student.id);
                      }}
                    >
                      <button
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete Student"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                        <span className="sr-only">Delete</span>
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-2">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} students
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {/* Show page numbers with smart pagination */}
              {(() => {
                const pages = [];
                const maxVisiblePages = 5;
                
                if (totalPages <= maxVisiblePages) {
                  // Show all pages if total is small
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  // Smart pagination for many pages
                  if (currentPage <= 3) {
                    // Show first 5 pages
                    for (let i = 1; i <= 5; i++) {
                      pages.push(i);
                    }
                    pages.push('...');
                    pages.push(totalPages);
                  } else if (currentPage >= totalPages - 2) {
                    // Show last 5 pages
                    pages.push(1);
                    pages.push('...');
                    for (let i = totalPages - 4; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    // Show current page with context
                    pages.push(1);
                    pages.push('...');
                    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                      pages.push(i);
                    }
                    pages.push('...');
                    pages.push(totalPages);
                  }
                }
                
                return pages.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && setCurrentPage(page)}
                    disabled={page === '...'}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : page === '...'
                        ? "bg-gray-100 text-gray-400 cursor-default"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ));
              })()}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* 🧩 Add/Edit Popups */}
      {(showAddPopup || editingStudent) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative">
            <button
              onClick={() => {
                setShowAddPopup(false);
                setEditingStudent(null);
              }}
              className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
              title="Close"
              aria-label="Close"
            >
              <X size={18} className="text-gray-600" />
              <span className="sr-only">Close</span>
            </button>
            <StudentForm student={editingStudent} />
          </div>
        </div>
      )}
    </div>
  );
}
