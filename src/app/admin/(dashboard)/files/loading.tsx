export default function FilesLoading() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl">files</h1>
      <div className="grid grid-cols-4 gap-2 mt-4">
        <div className="px-2 h-50 flex items-center justify-center border border-gray-300 rounded-lg text-gray-400">
          upload file
        </div>
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="px-2 h-50 flex items-center justify-center rounded-lg bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    </div>
  )
}