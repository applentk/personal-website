type AcceptType = "image/*" | "video/*" | "audio/*" | string

export function pickFile(accept: AcceptType, onPick: (file: File) => void) {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = accept

  input.onchange = () => {
    const file = input.files?.[0]
    if (file) onPick(file)
  }

  input.click()
}

export function pickFiles(accept: AcceptType, onPick: (files: File[]) => void) {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = accept
  input.multiple = true

  input.onchange = () => {
    const files = input.files
    if (files) onPick(Array.from(files))
  }

  input.click()
}

// export function structureFiles(files: { key: string }[]) {

// }