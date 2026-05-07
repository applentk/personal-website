import { ReactNode } from "react"

import { Sidebar } from "@/features/sidebar/components/sidebar"
import { sidebarItems } from "@/features/sidebar/constants"
import { RequiredAuth } from "@/features/auth/components/required-auth"

interface BackendLayoutProps {
  children: ReactNode
}

export default function BackendLayout({ children }: BackendLayoutProps) {
  return (
    <RequiredAuth signInUrl="/admin">
      <div className="flex">
        <Sidebar
          items={ sidebarItems }
        />
        <div className="p-8 pr-32 w-full max-w-6xl mx-auto">
          { children }
        </div>
      </div>
    </RequiredAuth>
  )
}