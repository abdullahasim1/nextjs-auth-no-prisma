"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@/app/lib/db";

export interface Student {
  id: string;
  name: string;
  email: string;
  age: number;
  grade: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

// ✅ READ - Get all students
export async function getStudents(): Promise<Student[]> {
  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not configured, returning sample data");
      return getSampleStudents();
    }

    const students = await sql`
      SELECT * FROM students 
      ORDER BY created_at DESC
    `;
    return students as Student[];
  } catch (error) {
    console.error("Error fetching students:", error);
    console.warn("Database connection failed, returning sample data");
    return getSampleStudents();
  }
}

// Sample data for when database is not available
function getSampleStudents(): Student[] {
  return [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@email.com",
      age: 20,
      grade: "A+",
      phone: "555-0101",
      address: "123 Main St",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      age: 21,
      grade: "A",
      phone: "555-0102",
      address: "456 Oak Ave",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@email.com",
      age: 19,
      grade: "B+",
      phone: "555-0103",
      address: "789 Pine Rd",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice.brown@email.com",
      age: 22,
      grade: "A",
      phone: "555-0104",
      address: "321 Elm St",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Charlie Wilson",
      email: "charlie.wilson@email.com",
      age: 20,
      grade: "B",
      phone: "555-0105",
      address: "654 Maple Dr",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}

// ✅ CREATE
export async function createStudent(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const age = Number(formData.get("age"));
  const grade = formData.get("grade") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  // Validate required fields
  if (!name || !email || !age || !grade) {
    throw new Error("Name, email, age, and grade are required");
  }

  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not configured, create operation skipped");
      revalidatePath("/");
      return;
    }

    // Check if email already exists
    const existingStudent = await sql`
      SELECT id FROM students WHERE email = ${email}
    `;

    if (existingStudent.length > 0) {
      throw new Error("Student with this email already exists");
    }

    await sql`
      INSERT INTO students (name, email, age, grade, phone, address)
      VALUES (${name}, ${email}, ${age}, ${grade}, ${phone || null}, ${address || null});
    `;

    revalidatePath("/");
  } catch (error) {
    console.error("Error creating student:", error);
    throw new Error("Failed to create student. Please try again.");
  }
}

// ✅ UPDATE
export async function updateStudent(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const age = Number(formData.get("age"));
  const grade = formData.get("grade") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  // Validate required fields
  if (!name || !email || !age || !grade) {
    throw new Error("Name, email, age, and grade are required");
  }

  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not configured, update operation skipped");
      revalidatePath("/");
      return;
    }

    // Check if email exists for another student
    const existingStudent = await sql`
      SELECT id FROM students WHERE email = ${email} AND id != ${id}
    `;

    if (existingStudent.length > 0) {
      throw new Error("Student with this email already exists");
    }

    await sql`
      UPDATE students 
      SET name = ${name}, email = ${email}, age = ${age}, grade = ${grade}, 
          phone = ${phone || null}, address = ${address || null}, updated_at = NOW()
      WHERE id = ${id};
    `;

    revalidatePath("/");
  } catch (error) {
    console.error("Error updating student:", error);
    throw new Error("Failed to update student. Please try again.");
  }
}

// ✅ DELETE
export async function deleteStudent(id: string) {
  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not configured, delete operation skipped");
      revalidatePath("/");
      return;
    }

    await sql`DELETE FROM students WHERE id = ${id};`;
    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting student:", error);
    throw new Error("Failed to delete student. Please try again.");
  }
}
