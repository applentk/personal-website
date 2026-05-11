export default function PostsLoading() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-start">
        <h1 className="text-lg">posts</h1>
        <button className="px-2 py-1 border hover:cursor-default">
          new post
        </button>
      </div>

      <table className="mt-4">
        <thead className="border border-gray-300">
          <tr>
            {["title", "date created", "last update", "status", "views"].map((header) => (
              <th key={header} className="text-start font-semibold bg-gray-50 py-1 pr-8 first:pl-2 last:pr-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-serif">
          {[...Array(6)].map((_, i) => (
            <tr key={i} className="border border-gray-300">
              <td className="w-sm pl-2 pr-8 py-2.5">
                <div className="h-4 w-3/4 rounded bg-gray-100 animate-pulse" />
              </td>
              <td className="pr-8 py-2">
                <div className="h-4 w-28 rounded bg-gray-100 animate-pulse" />
              </td>
              <td className="pr-8 py-2">
                <div className="h-4 w-28 rounded bg-gray-100 animate-pulse" />
              </td>
              <td className="pr-8 py-2">
                <div className="h-6 w-20 rounded bg-gray-100 animate-pulse" />
              </td>
              <td className="pr-2 py-2">
                <div className="h-4 w-8 rounded bg-gray-100 animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}