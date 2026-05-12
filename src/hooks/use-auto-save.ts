import { useEffect, useRef, useState } from "react"

type SaveState = "idle" | "saving" | "saved" | "error"

interface UseAutosaveOptions<T> {
  data: T
  onSave: (data: T) => Promise<unknown>
  delay?: number
}

export function useAutosave<T>({
  data,
  onSave,
  delay = 500,
}: UseAutosaveOptions<T>) {
  const [saveState, setSaveState] = useState<SaveState>("idle")

  const lastSavedRef = useRef(data)
  const requestIdRef = useRef(0)

  useEffect(() => {
    const isEqual = JSON.stringify(data) === JSON.stringify(lastSavedRef.current)
    if (isEqual) return

    setSaveState("saving")

    const timer = setTimeout(async () => {
      const requestId = ++requestIdRef.current

      try {
        await onSave(data)

        if (requestId === requestIdRef.current) {
          lastSavedRef.current = data
          setSaveState("saved")
        }
      }
      catch {
        if (requestId === requestIdRef.current) {
          setSaveState("error")
        }
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [data, onSave, delay])

  return { saveState }
}