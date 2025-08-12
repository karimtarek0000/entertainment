export default function SkeletonCard({ count }: { count: number }) {
  const skeleton = Array.from({ length: count }).map((_, index) => (
    <div key={index} className="animate-pulse">
      <div className="card overflow-hidden relative bg-gray-800 rounded-lg">
        {/* Image skeleton */}
        <div className="w-full h-full bg-gray-700"></div>
      </div>

      <div className="mt-2 space-y-2">
        {/* Meta info skeleton */}
        <div className="flex items-center gap-x-1 my-3">
          <div className="h-3 bg-gray-700 rounded w-8"></div>
          <div className="h-3 bg-gray-700 rounded w-1"></div>
          <div className="h-2.5 w-2.5 bg-gray-700 rounded"></div>
          <div className="h-3 bg-gray-700 rounded w-16"></div>
          <div className="h-3 bg-gray-700 rounded w-1"></div>
        </div>

        {/* Title skeleton */}
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      </div>
    </div>
  ))

  return <>{skeleton}</>
}
