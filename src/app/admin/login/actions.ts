"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createAdminSession, destroyAdminSession } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!configuredEmail || !process.env.AUTH_SECRET || (!process.env.ADMIN_PASSWORD && !process.env.ADMIN_PASSWORD_HASH)) {
    return { error: "Configure ADMIN_EMAIL, ADMIN_PASSWORD (ou ADMIN_PASSWORD_HASH) e AUTH_SECRET nas variáveis de ambiente." };
  }
  const passwordOk = process.env.ADMIN_PASSWORD_HASH
    ? await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
    : password === process.env.ADMIN_PASSWORD;
  if (email !== configuredEmail || !passwordOk) return { error: "E-mail ou senha inválidos." };
  await createAdminSession(email);
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}
