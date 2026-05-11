import "server-only"
import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"

const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function createSession() {
  const payload = {
    username: process.env.ADMIN_USERNAME,
  }

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(encodedSecret)

  const cookieStore = await cookies()
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours
    sameSite: "lax",
    path: "/",
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

export async function isValidSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value

  if (!session) {
    return false
  }
  
  try {
    const { payload } = await jwtVerify(session, encodedSecret)
    return !!payload
  }
  catch {
    return false
  }
}