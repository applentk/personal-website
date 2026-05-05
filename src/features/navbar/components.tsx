"use client"

import Link from "next/link"
import type { NavbarItem } from "./types"
import { usePathname } from "next/navigation"

interface NavbarProps {
  items: NavbarItem[]
}

export function Navbar({ items }: NavbarProps) {
  const path = usePathname()

  return (
    <div className="w-full py-4">
      <ul className="flex justify-center gap-12">
        { items.map(({ label, href }) => 
          <li
            key={label}
            className="flex flex-col group"
          >
            <Link href={href}>
              { label }
            </Link>
            <span className={`${ href === path ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1" } w-full h-px bg-gray-600 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-in-out`} />
          </li>
        ) }
      </ul>
    </div>
  )
}