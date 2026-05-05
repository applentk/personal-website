import "@/styles/globals.css"
import { ReactNode } from "react"
import { Navbar } from "@/features/navbar/components/navbar"
import { navbarItems } from "@/features/navbar/constants"

interface FrontendLayoutProps {
  children: ReactNode
}

export default function FrontendLayout({ children }: FrontendLayoutProps) {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <Navbar items={ navbarItems } />
      <div className="p-6">
        { children }
      </div>
    </div>
  )
}
