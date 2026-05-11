import { pickFile, pickFiles } from "@/utils/file"
import { ButtonHTMLAttributes } from "react"

interface FilePickerButtonPropsMultiple extends ButtonHTMLAttributes<HTMLButtonElement> {
  multiple: true
  onFileSelected: (file: File[]) => void
}

interface FilePickerButtonPropsSingle extends ButtonHTMLAttributes<HTMLButtonElement> {
  multiple?: false
  onFileSelected: (file: File) => void
}

type FilePickerButtonProps = FilePickerButtonPropsMultiple | FilePickerButtonPropsSingle

export default function FilePickerButton({ onFileSelected, multiple, ...props }: FilePickerButtonProps) {
  return (
    <button
      {...props}
      onClick={() => {
        if (multiple) {
          pickFiles("*/*", (files) => onFileSelected(files))
        }
        else {
          pickFile("*/*", (file) => onFileSelected(file))
        }
      }}
    />
  )
} 