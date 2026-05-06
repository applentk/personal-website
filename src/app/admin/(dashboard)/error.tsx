"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface AdminErrorPageProps {
  error: Error
}

export default function AdminErrorPage({ error }: AdminErrorPageProps) {
  const router = useRouter()

  useEffect(() => {
    if (error.message === "Unauthorized") {
      router.replace("/admin")
    }
  }, [error.message, router])

  if (error.message === "Unauthorized") {
    return null
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">An error occurred while loading the admin page.</h1>
    </div>
  )
}