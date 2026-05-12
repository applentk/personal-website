import Link from "next/link"
import { Work } from "../types"

interface WorkCardProps {
  work: Work
}

export default function WorkCard({ work }: WorkCardProps) {
  return (
    <Link href={`/admin/works/${work.id}`} className="border border-gray-300 rounded-lg p-4 cursor-default">
      <h2 className="text-lg">
        {work.title ?? <span className="text-gray-300">{"untitled work"}</span>}
      </h2>
      <p className="text-sm text-gray-500">
        created at: {work.createdAt?.toISOString().split("T")[0]}
      </p>
    </Link>
  )
}