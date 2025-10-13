// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Auth App",
  description: "Simple Login & Signup with PostgreSQL",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 flex items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  );
}
