import WorkCard from "@/features/works/components/work-card";
import { createWork, getWorks } from "@/features/works/queries"
import { redirect } from "next/navigation";

export default async function WorksPage() {
  const works = await getWorks();
  
  async function onCreateWork() {
    "use server"
    const work = await createWork()
    redirect(`/admin/works/${work.id}`)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h1 className="text-lg">
          works
        </h1>
        <button onClick={onCreateWork} className="border px-2 py-1 rounded-sm hover:cursor-default">
          new
        </button>
      </div>

      <div className="flex flex-col">
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </div>
  )
}