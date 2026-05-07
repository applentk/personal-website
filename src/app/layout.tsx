import type { Metadata } from "next"
import { JetBrains_Mono, Literata, Outfit, } from "next/font/google"
import { ReactNode } from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "@/styles/globals.css"

const outfitSans = Outfit({
  variable: "--outfit",
  subsets: ["latin"],
})

const literata = Literata({
  variable: "--literata",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--jetbrains-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "applezk",
  description: "applezk's blog",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${outfitSans.variable} ${literata.variable} ${jetbrainsMono.variable} font-sans antialiased`}
    >
      <body className="min-h-full">
        { children }
      </body>
      <SpeedInsights />
    </html>
  )
}
