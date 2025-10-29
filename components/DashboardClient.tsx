"use client";

import { Suspense } from "react";
import StudentTable from "@/components/StudentTable";
import StatsCards from "@/components/StatsCards";
import ErrorBoundary from "@/components/ErrorBoundary";
import { CardsSkeleton, TableSkeleton } from "@/components/Skeletons";
import type { Student } from "@/app/actions/studentActions";

interface DashboardClientProps {
  students: Student[];
}

export default function DashboardClient({ students }: DashboardClientProps) {
  return (
    <ErrorBoundary>
      <main className="min-h-screen w-full bg-white px-6 py-10">
        <div className="max-w-7xl mx-auto space-y-10 border rounded-2xl p-8 shadow-sm bg-white">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
                Student Dashboard
              </h1>
              <p className="text-gray-500 mt-2">
                Manage, search, and track student records efficiently.
              </p>
            </div>
          </header>

          {/* Stats Cards */}
          <Suspense fallback={<CardsSkeleton />}>
            <StatsCards students={students} />
          </Suspense>

          {/* Student Table */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <Suspense fallback={<TableSkeleton />}>
              <StudentTable students={students} />
            </Suspense>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}
