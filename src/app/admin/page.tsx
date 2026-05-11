import { isAuthorized, signIn } from "@/features/auth/queries"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  if (await isAuthorized()) {
    redirect("/admin/overview")
  }

  async function handleSubmit(formData: FormData) {
    "use server"

    const username = formData.get("username") as string
    const password = formData.get("password") as string
    
    await signIn(username, password)
    redirect("/admin/overview")
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form action={handleSubmit} className="w-full max-w-sm">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full px-2 py-1 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-2 py-1 mb-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 border font-semibold rounded-md hover:bg-gray-50 transition-colors"
        >
          let&apos;s go
        </button>
      </form>
    </div>
  )
}