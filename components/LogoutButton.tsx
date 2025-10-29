"use client";

import { logout } from "@/app/actions/authActions";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    // Redirect to login page after logout
    router.push("/login");
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
    >
      Logout
    </motion.button>
  );
}
