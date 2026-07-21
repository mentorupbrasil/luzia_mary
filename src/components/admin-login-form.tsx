"use client";

import { useActionState } from "react";
import { Loader2, LockKeyhole, LogIn } from "lucide-react";
import { loginAction, type LoginState } from "@/app/admin/login/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const initialState: LoginState = {};

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);
  return <form action={action} className="space-y-5"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)]"><LockKeyhole/></div><div><h1 className="text-3xl font-semibold tracking-[-.04em]">Painel da campanha</h1><p className="mt-2 text-sm leading-6 text-black/50">Acesso restrito à equipe autorizada.</p></div>{state.error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{state.error}</div>}<div><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" autoComplete="username" required/></div><div><Label htmlFor="password">Senha</Label><Input id="password" name="password" type="password" autoComplete="current-password" required/></div><Button type="submit" size="lg" className="w-full" disabled={pending}>{pending ? <><Loader2 className="animate-spin" size={18}/> Entrando...</> : <><LogIn size={18}/> Entrar</>}</Button></form>;
}
