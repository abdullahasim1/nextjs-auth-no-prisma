// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
// import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description: "Manage student records with full CRUD operations",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen h-full relative antialiased">
        <div className="absolute inset-0 bg-white" />
        <div className="relative z-10 container-prose py-10">
          <header className="mb-10 flex items-center justify-between rounded-2xl ui-card px-5 py-4">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-xl">
              <span className="inline-block h-3 w-3 rounded-full bg-black500" />
              Student Dashboard
            </Link>
            <nav className="flex items-center gap-3">
              <LogoutButton />
              {/* <ThemeToggle /> */}
            </nav>
          </header>
          {children}
          <footer className="mt-12 text-center text-sm text-[rgb(var(--muted))]">© {new Date().getFullYear()} Next Auth. All rights reserved.</footer>
        </div>
      </body>
    </html>
  );
}
