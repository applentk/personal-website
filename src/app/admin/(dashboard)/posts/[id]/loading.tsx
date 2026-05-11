export default function PostIdLoading() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <h1 className="text-lg opacity-25 font-light">
            posts {">"}
          </h1>
          <div className="h-5 w-30 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 rounded bg-gray-100 animate-pulse" />
          <div className="h-5 w-12 rounded bg-gray-100 animate-pulse" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto my-4">
        {/* Title */}
        <div className="h-12 w-2/3 rounded bg-gray-100 animate-pulse" />

        {/* Meta row */}
        <div className="flex gap-4 mt-2">
          <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
          <div className="h-4 w-16 rounded bg-gray-100 animate-pulse" />
        </div>

        {/* Thumbnail */}
        <div className="w-full h-80 rounded-lg bg-gray-100 animate-pulse my-6" />

        {/* Content lines */}
        <div className="flex flex-col gap-3 mt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`h-4 rounded bg-gray-100 animate-pulse ${i % 3 === 2 ? "w-1/2" : "w-full"}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
