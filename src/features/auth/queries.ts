import "server-only"
import { clearSession, createSession, isValidSession } from "@/features/session/queries"

export async function signIn(username: string, password: string) {
  if (username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD)
  {
    await createSession()
  }
}

export async function signOut() {
  await clearSession()
  
}

export async function isAuthorized() {
  return await isValidSession()
}

export async function requireAuth() {
  if (!await isAuthorized()) {
    throw new Error("Unauthorized")
  }
}