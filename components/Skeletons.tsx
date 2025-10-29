export function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-6 bg-gray-200 rounded"></div>
      ))}
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
      ))}
    </div>
  );
}
