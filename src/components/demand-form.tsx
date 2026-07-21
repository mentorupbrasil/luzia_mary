"use client";

import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitDemand, type DemandState } from "@/app/(public)/demandas/actions";
import { demandCategories } from "@/config/site";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { Textarea } from "./ui/textarea";

const initialState: DemandState = { ok: false, message: "" };

export function DemandForm({ defaultCategory = "" }: { defaultCategory?: string }) {
  const [state, action, pending] = useActionState(submitDemand, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const categoryValue = demandCategories.includes(defaultCategory as (typeof demandCategories)[number])
    ? defaultCategory
    : "";

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  if (state.ok) {
    return (
      <div
        className="border border-emerald-200 bg-emerald-50 p-8"
        style={{ borderRadius: "var(--radius)" }}
      >
        <CheckCircle2 className="text-emerald-700" size={34} aria-hidden />
        <h2 className="mt-5 font-display text-2xl font-semibold">Recebemos sua contribuição</h2>
        <p className="mt-3 text-sm leading-7 text-emerald-950/70">
          Guarde o protocolo abaixo. A equipe poderá utilizá-lo para localizar seu registro.
        </p>
        <div
          className="mt-5 bg-white px-5 py-4 font-mono text-lg font-bold tracking-wider text-emerald-800"
          style={{ borderRadius: "calc(var(--radius) - 4px)" }}
        >
          {state.protocol}
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-5 text-sm font-bold text-emerald-800 underline"
        >
          Enviar outra demanda
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="grid gap-5">
      {state.message && (
        <div
          className="border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          style={{ borderRadius: "var(--radius)" }}
          role="alert"
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nome completo *</Label>
          <Input id="name" name="name" required autoComplete="name" placeholder="Seu nome" />
          <FieldError errors={state.errors?.name} />
        </div>
        <div>
          <Label htmlFor="city">Município *</Label>
          <Input id="city" name="city" required defaultValue="Imperatriz" autoComplete="address-level2" />
          <FieldError errors={state.errors?.city} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="voce@email.com" />
          <FieldError errors={state.errors?.email} />
        </div>
        <div>
          <Label htmlFor="phone">Telefone ou WhatsApp</Label>
          <Input id="phone" name="phone" inputMode="tel" autoComplete="tel" placeholder="DDD + número" />
          <FieldError errors={state.errors?.phone} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="neighborhood">Bairro ou localidade</Label>
          <Input id="neighborhood" name="neighborhood" />
        </div>
        <div>
          <Label htmlFor="category">Tema *</Label>
          <Select id="category" name="category" required defaultValue={categoryValue}>
            <option value="" disabled>
              Selecione
            </option>
            {demandCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <FieldError errors={state.errors?.category} />
        </div>
      </div>

      <div>
        <Label htmlFor="title">Resumo da demanda *</Label>
        <Input
          id="title"
          name="title"
          required
          placeholder="Ex.: demora para conseguir exame especializado"
        />
        <FieldError errors={state.errors?.title} />
      </div>

      <div>
        <Label htmlFor="description">Conte o que está acontecendo *</Label>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="Descreva o problema, onde acontece, há quanto tempo e qual solução você considera importante."
        />
        <FieldError errors={state.errors?.description} />
      </div>

      <label
        className="flex items-start gap-3 bg-[var(--surface-muted)] p-4 text-sm leading-6 text-[var(--text-muted)]"
        style={{ borderRadius: "var(--radius)" }}
      >
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[var(--brand)]" />
        <span>
          Concordo com o tratamento dos dados informados para registro, análise e resposta desta
          demanda, conforme a Política de Privacidade. *
        </span>
      </label>
      <FieldError errors={state.errors?.consent} />

      <label className="flex items-start gap-3 px-1 text-sm leading-6 text-[var(--text-muted)]">
        <input type="checkbox" name="updates" className="mt-1 h-4 w-4 accent-[var(--brand)]" />
        <span>
          Também desejo receber atualizações pelos canais informados. Posso cancelar a qualquer
          momento.
        </span>
      </label>

      <Button type="submit" size="lg" disabled={pending} className="min-h-12">
        {pending ? (
          <>
            <Loader2 className="animate-spin" size={18} aria-hidden /> Enviando...
          </>
        ) : (
          <>
            <Send size={18} aria-hidden /> Registrar demanda
          </>
        )}
      </Button>
    </form>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  return errors?.[0] ? (
    <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
      {errors[0]}
    </p>
  ) : null;
}
