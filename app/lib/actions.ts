"use server";

import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 🟢 CREATE
export async function createStudent(formData: FormData) {
  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const age = Number(formData.get("age")) || 0;
  const grade = formData.get("grade")?.toString() || "";

  await sql`
    INSERT INTO students (name, email, age, grade)
    VALUES (${name}, ${email}, ${age}, ${grade})
  `;

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

// 🟡 UPDATE
export async function updateStudent(id: string, formData: FormData) {
  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const age = Number(formData.get("age")) || 0;
  const grade = formData.get("grade")?.toString() || "";

  await sql`
    UPDATE students
    SET name=${name}, email=${email}, age=${age}, grade=${grade}
    WHERE id=${id}
  `;

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

// 🔴 DELETE
export async function deleteStudent(id: string) {
  await sql`DELETE FROM students WHERE id=${id}`;
  revalidatePath("/dashboard");
}
