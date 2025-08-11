export default function SkeletonCard({ count }: { count: number }) {
  const skeleton = Array.from({ length: count }).map((_, index) => (
    <div key={index} className="animate-pulse">
      <div className="card overflow-hidden relative bg-gray-800 rounded-lg h-32 md:h-40">
        {/* Bookmark button skeleton */}
        <div className="absolute top-2 right-2 z-40 w-8 h-8 bg-gray-700 rounded-full"></div>

        {/* Image skeleton */}
        <div className="w-full h-full bg-gray-700"></div>
      </div>

      <div className="mt-2 space-y-2">
        {/* Meta info skeleton */}
        <div className="flex items-center gap-x-1">
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
