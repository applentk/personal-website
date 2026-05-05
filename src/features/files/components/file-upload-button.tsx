"use client"

import type { File as FFile } from "@/features/files/types"
import FilePickerButton from "@/features/files/components/file-picker-button"
import { getUploadUrl } from "@/features/files/queries"
import { ButtonHTMLAttributes } from "react"

interface FileUploadButtonPropsMultiple extends ButtonHTMLAttributes<HTMLButtonElement> {
  multiple: true
  onFileUploaded?: (file: FFile[]) => void
}

interface FileUploadButtonPropsSingle extends ButtonHTMLAttributes<HTMLButtonElement> {
  multiple?: false
  onFileUploaded?: (file: FFile) => void
}

type FileUploadButtonProps = FileUploadButtonPropsMultiple | FileUploadButtonPropsSingle

export function FileUploadButton({ onFileUploaded, multiple, ...props }: FileUploadButtonProps) {
  async function handleFileSelected(files: File[] | File) {
    await Promise.all(
      (Array.isArray(files) ? files : [files]).map(async (file) => {
        const url = await getUploadUrl(file.name, file.type)
        await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        })
      })
    )

    const uploadedFiles = (Array.isArray(files) ? files : [files]).map((file) => ({
      name: file.name,
      url: `${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/${file.name}`,
    }));

    if (multiple) {
      onFileUploaded?.(uploadedFiles)
    }
    else {
      onFileUploaded?.(uploadedFiles[0])
    }
  }

  return (
    <FilePickerButton
      multiple={multiple}
      onFileSelected={ handleFileSelected }
      {...props}
    >
      upload file
    </FilePickerButton>
  )
}
