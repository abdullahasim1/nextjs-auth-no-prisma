"use client";

import { useEffect, useState } from "react";
import WalkingLoader from "@/components/WalkingLoader";

export default function Loading() {
  const [showSkeleton, setShowSkeleton] = useState(false);

  // 👇 Switch to skeleton after 2 seconds to show walking animation longer
  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!showSkeleton) {
    return <WalkingLoader />;
  }

  // 👇 Skeleton UI after loader
  return (
    <main className="space-y-8 p-6 animate-fadeIn">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="h-8 w-48 rounded-lg bg-gray-200 animate-pulse mb-2" />
          <div className="h-4 w-64 mt-2 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="h-10 w-44 rounded-xl bg-gray-200 animate-pulse" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl p-6 border bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-100 animate-pulse" />
              <div>
                <div className="h-4 w-24 mb-3 rounded bg-gray-200 animate-pulse" />
                <div className="h-7 w-20 rounded bg-gray-200 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="rounded-2xl overflow-hidden border bg-white shadow-sm">
        <div className="hidden md:grid grid-cols-5 px-6 pt-2 pb-2 text-xs font-semibold text-gray-400">
          <div>Student</div>
          <div>Contact</div>
          <div>Grade</div>
          <div>Age</div>
          <div>Actions</div>
        </div>

        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 px-6 py-3 border-b bg-gray-50 animate-pulse"
          >
            <div className="h-10 w-10 rounded-full bg-gray-100 mr-3" />
            <div className="flex-1">
              <div className="h-4 w-32 rounded bg-gray-200 mb-1" />
              <div className="h-3 w-24 rounded bg-gray-100" />
            </div>
            <div className="flex-1">
              <div className="h-4 w-40 rounded bg-gray-200 mb-1" />
              <div className="h-3 w-16 rounded bg-gray-100" />
            </div>
            <div>
              <div className="w-12 h-6 rounded-full bg-gray-100" />
            </div>
            <div>
              <div className="h-4 w-8 rounded bg-gray-200" />
            </div>
            <div className="flex gap-2 ml-2">
              <div className="w-10 h-5 rounded bg-gray-200" />
              <div className="w-10 h-5 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
