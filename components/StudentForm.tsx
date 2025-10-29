"use client";

import { useTransition } from "react";
import { createStudent, updateStudent } from "@/app/actions/studentActions";
import { Loader2, UserPlus } from "lucide-react";
import type { Student } from "@/app/actions/studentActions";

interface StudentFormProps {
  student?: Student | null;
}

export default function StudentForm({ student }: StudentFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        if (student) {
          await updateStudent(student.id, formData);
        } else {
          await createStudent(formData);
        }
      } catch (error) {
        console.error("Error saving student:", error);
      }
    });
  };

  return (
    <form
      action={handleSubmit}
      className="max-w-md w-full mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-gray-200 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <UserPlus className="text-blue-600" size={22} />
          {student ? "Edit Student" : "Add New Student"}
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            name="name"
            required
            placeholder="Enter student name"
            defaultValue={student?.name || ""}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            name="email"
            type="email"
            required
            placeholder="Enter email"
            defaultValue={student?.email || ""}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Age *</label>
            <input
              name="age"
              type="number"
              required
              placeholder="Age"
              defaultValue={student?.age || ""}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Grade *</label>
            <select
              name="grade"
              required
              defaultValue={student?.grade || ""}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              aria-label="Student grade"
            >
              <option value="" disabled>
                Select grade
              </option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C+">C+</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            name="phone"
            placeholder="Phone number"
            defaultValue={student?.phone || ""}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            name="address"
            placeholder="Student address"
            defaultValue={student?.address || ""}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 transition disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              {student ? "Updating..." : "Saving..."}
            </>
          ) : (
            <>
              <UserPlus size={18} />
              {student ? "Update Student" : "Add Student"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
