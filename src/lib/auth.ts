import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "mandato_admin_session";

function getSecret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new Error("AUTH_SECRET não configurado.");
  return new TextEncoder().encode(value);
}

export async function createAdminSession(email: string) {
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getSecret());
  const store = await cookies();
  store.set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 12 });
}

export async function getAdminSession() {
  try {
    const token = (await cookies()).get(COOKIE_NAME)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch { return null; }
}

export async function destroyAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}
