"use client"

import Link from "next/link"
import { SidebarItem } from "../type"
import { usePathname } from "next/navigation"
import { ComponentProps } from "react"

interface SidebarProps {
  items: SidebarItem[]
}

export function Sidebar({ items, className }: SidebarProps & ComponentProps<"nav">) {
  const pathname = usePathname()

  return (
    <nav className={`flex flex-col h-screen w-42 px-6 py-6 border-gray-500 ${ className }`}>
      {/* Items */}
      <ul className="flex flex-col text-lg">
        { items.map(({ label, href }) => 
          <li key={ label } className="group flex items-center gap-3 py-2">
            <span className={ `${ pathname.includes(href) ? "opacity-100" : "opacity-0" } h-full w-px bg-black` } />
            <Link href={ href } className="hover:cursor-default">
              { label }
            </Link>
          </li>
        ) }
      </ul>
    </nav>
  ) 
}