import { WorkEditor } from "@/features/works/components/work-editor"
import { deleteWork, getWork, updateWork } from "@/features/works/queries"
import { refresh } from "next/cache"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

interface WorkIdPageProps {
  params: Promise<{ id: string }>
}

export default async function WorkIdPage({ params }: WorkIdPageProps) {
  const { id } = await params
  const work = await getWork(id)

  if (!work) {
    notFound()
  }

  async function onClickPublish() {
    "use server"
    await updateWork(id, { ...work, published: !work?.published })
    refresh()
  }

  async function onClickDelete() {
    "use server"
    await deleteWork(id)
    redirect("/admin/works")
  }

  console.log(work)

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-2">
        <h1 className="text-lg">
          <Link href={"/admin/works"} className="opacity-25 font-light">works {">"}</Link> { work.title || "edit" }
        </h1>

        <div className="flex gap-2">
          <button
            onClick={onClickPublish}
            className="hover:underline"
          >
            { work.published ? "unpublish" : "publish" }
          </button>
          <button
            onClick={onClickDelete}
            className="text-red-500 hover:underline decoration-red-500"
          >
            delete
          </button>
        </div>
      </div>

      <WorkEditor initialWork={work} />
    </div>
  )
}