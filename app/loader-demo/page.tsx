"use client";

import WalkingLoader from "@/components/WalkingLoader";

export default function LoaderDemo() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Walking Loader Demo
        </h1>
        <WalkingLoader />
        <p className="text-gray-600 mt-8 text-lg">
          A charming walking character animation for loading states
        </p>
      </div>
    </div>
  );
}
