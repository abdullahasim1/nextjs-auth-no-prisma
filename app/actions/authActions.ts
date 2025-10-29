"use server";

import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ✅ Signup Function
export async function signup(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) throw new Error("All fields are required");

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    if (errorMessage.includes("duplicate")) {
      throw new Error("Email already exists");
    }
    throw new Error("Signup failed: " + errorMessage);
  }
}

// ✅ Login Function
export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) throw new Error("Both fields are required");

  try {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    const user = result.rows[0];

    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid password");

    // ✅ Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("user-session", JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return { success: true, user: { id: user.id, name: user.name, email: user.email } };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    throw new Error("Login failed: " + errorMessage);
  }
}

// ✅ Logout Function
export async function logout() {
  // Clear the session cookie
  const cookieStore = await cookies();
  cookieStore.delete("user-session");
  return { success: true };
}

// ✅ Login with redirect (server action)
export async function loginWithRedirect(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) throw new Error("Both fields are required");

  const result = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;
  const user = result.rows[0];

  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid password");

  // ✅ Set session cookie
  const cookieStore = await cookies();
  cookieStore.set("user-session", JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  // Redirect to dashboard
  redirect("/");
}

// ✅ Check if user is authenticated
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("user-session");
    
    if (!sessionCookie) {
      return null;
    }
    
    const user = JSON.parse(sessionCookie.value);
    return user;
  } catch {
    return null;
  }
}
