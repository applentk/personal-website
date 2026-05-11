import FileCard from "@/features/files/components/file-card"
import { deleteFile, getFiles } from "@/features/files/queries"
import { FileUploadButton } from "@/features/files/components/file-upload-button"
import { refresh } from "next/cache"

export default async function FilesPage() {
  const files = await getFiles()

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl">files</h1>

      <div className="grid grid-cols-4 gap-2 mt-4">
        <FileUploadButton
          className="px-2 h-50 flex items-center justify-center border border-gray-300 rounded-lg text-gray-400 hover:cursor-default hover:text-gray-700"
          onFileUploaded={async () => {
            "use server"
            refresh()
          }}
        />
        {files.map((file) => (
          <FileCard
            key={file.name}
            file={file}
            onDelete={ async (file) => {
              "use server"
              await deleteFile(file.name)
              refresh()
            } }
          />
        ))}
      </div>
    </div>
  )
}
