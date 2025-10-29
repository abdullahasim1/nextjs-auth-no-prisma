import { getStudents } from "@/app/actions/studentActions";
import { getCurrentUser } from "@/app/actions/authActions";
import DashboardClient from "@/components/DashboardClient";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getCurrentUser();
  
  // If no user is authenticated, redirect to login
  if (!user) {
    redirect("/login");
  }

  const students = await getStudents();

  return <DashboardClient students={students} />;
}
