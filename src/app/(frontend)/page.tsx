import Apple3D from "@/features/home/components/apple-3d"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="group relative w-full max-w-lg h-90">
        <div className="absolute size-full flex flex-col items-center justify-center">
          <Apple3D
            className="group-hover:opacity-0"
          />
        </div>
        <div className="absolute size-full flex justify-center items-center gap-2 cursor-default max-md:flex-col px-6">
          <div className="flex flex-col">
            <h1 className="opacity-0 group-hover:opacity-100 text-xl">
              hey there
            </h1>
            <h2 className="opacity-0 delay-0 group-hover:opacity-100 group-hover:delay-1000 text-2xl font-semibold">
              I&aposm Nonthakorn Srichai
            </h2>
            <p className="mt-2 opacity-0 delay-0 group-hover:opacity-100 group-hover:delay-2000 text-sm font-serif text-gray-600">
              a KMITL student who interests in Computer Graphics, Web Development and Android Development
            </p>
          </div>
          <Image
            src={"/images/me.jpg"}
            alt="Profile Picture"
            width={500}
            height={500}
            className="rounded-full size-50 object-cover opacity-0 group-hover:opacity-100 delay-0 group-hover:delay-3000"
          />
        </div>
      </div>
    </div>
  )
}
