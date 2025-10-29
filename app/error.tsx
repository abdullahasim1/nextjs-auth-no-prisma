"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Optionally log error to analytics service
    // console.error(error.message);
  }, [error]);

  return (
    <main className="flex flex-col justify-center items-center min-h-[60vh] p-6 bg-white">
      <div className="bg-white border border-red-100 rounded-2xl shadow-md px-8 py-10 max-w-md text-center animate-fadeIn">
        <div className="flex flex-col items-center gap-3 mb-4">
          <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2" className="opacity-20" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
          </svg>
          <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
      </div>
        <div className="mb-5 text-gray-700">
          {error?.message || "An unexpected error occurred. Please try again or contact support."}
        </div>
        <button
        onClick={() => reset()}
          className="bg-red-100 text-red-700 border border-red-100 px-5 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
