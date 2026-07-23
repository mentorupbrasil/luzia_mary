"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { CheckCircle2, Copy, Loader2, RotateCcw, Send } from "lucide-react";
import { submitDemand, type DemandState } from "@/app/(public)/demandas/actions";
import { demandCategories, content } from "@/config/site";

const initialState: DemandState = { ok: false, message: "" };

const TITLE_MAX = 160;
const DESCRIPTION_MAX = 4000;

export function DemandForm({ defaultCategory = "" }: { defaultCategory?: string }) {
  const [state, action, pending] = useActionState(submitDemand, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [titleLen, setTitleLen] = useState(0);
  const [descriptionLen, setDescriptionLen] = useState(0);
  const [copied, setCopied] = useState(false);

  const categoryValue = demandCategories.includes(
    defaultCategory as (typeof demandCategories)[number],
  )
    ? defaultCategory
    : "";

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  if (state.ok && state.protocol) {
    const when = formatRegisteredAt(state.registeredAt);

    return (
      <div className="participate-success" role="status" aria-live="polite">
        <div className="participate-success-icon" aria-hidden>
          <CheckCircle2 size={34} strokeWidth={2.1} />
        </div>
        <h3 className="participate-success-title">Demanda registrada com sucesso</h3>
        <p className="participate-success-text">
          Guarde o número abaixo para identificar seu registro junto à equipe.
        </p>
        <div className="participate-protocol">
          <span className="participate-protocol-label">Protocolo</span>
          <strong className="participate-protocol-value">{state.protocol}</strong>
        </div>
        {when ? (
          <p className="participate-success-meta">Registro em {when}</p>
        ) : null}
        <div className="participate-success-actions">
          <button
            type="button"
            className="participate-btn participate-btn--navy"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(state.protocol || "");
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2200);
              } catch {
                window.prompt("Copie o protocolo:", state.protocol);
              }
            }}
          >
            <Copy size={16} aria-hidden />
            {copied ? "PROTOCOLO COPIADO" : "COPIAR PROTOCOLO"}
          </button>
          <button
            type="button"
            className="participate-btn participate-btn--ghost"
            onClick={() => window.location.reload()}
          >
            <RotateCcw size={16} aria-hidden />
            ENVIAR OUTRA DEMANDA
          </button>
        </div>
        <p className="participate-success-contact">
          Em caso de dúvida, escreva para{" "}
          <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>{" "}
          informando o número do protocolo.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="participate-form" noValidate>
      {state.message ? (
        <div className="participate-alert" role="alert">
          <strong>Não foi possível enviar.</strong>
          <span>{state.message}</span>
        </div>
      ) : null}

      {/* Honeypot anti-bot — oculto visualmente e da navegação por teclado útil */}
      <div className="participate-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="participate-form-grid">
        <div className="participate-field">
          <label htmlFor="name" className="participate-label">
            Nome completo <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Seu nome completo"
            className={`participate-input${state.errors?.name ? " is-invalid" : ""}`}
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
          />
          <FieldError id="name-error" errors={state.errors?.name} />
        </div>

        <div className="participate-field">
          <label htmlFor="city" className="participate-label">
            Município <span aria-hidden="true">*</span>
          </label>
          <input
            id="city"
            name="city"
            required
            autoComplete="address-level2"
            placeholder="Ex.: Imperatriz, Açailândia, São Luís…"
            className={`participate-input${state.errors?.city ? " is-invalid" : ""}`}
            aria-invalid={Boolean(state.errors?.city)}
            aria-describedby={state.errors?.city ? "city-error" : undefined}
          />
          <FieldError id="city-error" errors={state.errors?.city} />
        </div>

        <div className="participate-field">
          <label htmlFor="email" className="participate-label">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@email.com"
            className={`participate-input${state.errors?.email ? " is-invalid" : ""}`}
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" errors={state.errors?.email} />
        </div>

        <div className="participate-field">
          <label htmlFor="phone" className="participate-label">
            Telefone ou WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            placeholder="DDD + número"
            className={`participate-input${state.errors?.phone ? " is-invalid" : ""}`}
            aria-invalid={Boolean(state.errors?.phone)}
            aria-describedby={state.errors?.phone ? "phone-error" : undefined}
          />
          <FieldError id="phone-error" errors={state.errors?.phone} />
        </div>

        <div className="participate-field">
          <label htmlFor="neighborhood" className="participate-label">
            Bairro ou localidade
          </label>
          <input
            id="neighborhood"
            name="neighborhood"
            placeholder="Bairro, povoado ou comunidade"
            className="participate-input"
          />
        </div>

        <div className="participate-field">
          <label htmlFor="category" className="participate-label">
            Tema <span aria-hidden="true">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={categoryValue}
            className={`participate-input participate-select${state.errors?.category ? " is-invalid" : ""}`}
            aria-invalid={Boolean(state.errors?.category)}
            aria-describedby={state.errors?.category ? "category-error" : undefined}
          >
            <option value="" disabled>
              Selecione o tema
            </option>
            {demandCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <FieldError id="category-error" errors={state.errors?.category} />
        </div>
      </div>

      <div className="participate-field">
        <div className="participate-label-row">
          <label htmlFor="title" className="participate-label">
            Resumo da demanda <span aria-hidden="true">*</span>
          </label>
          <span className="participate-counter" aria-live="polite">
            {titleLen}/{TITLE_MAX}
          </span>
        </div>
        <input
          id="title"
          name="title"
          required
          maxLength={TITLE_MAX}
          placeholder="Ex.: demora para conseguir exame especializado"
          className={`participate-input${state.errors?.title ? " is-invalid" : ""}`}
          aria-invalid={Boolean(state.errors?.title)}
          aria-describedby={state.errors?.title ? "title-error" : undefined}
          onChange={(event) => setTitleLen(event.target.value.length)}
        />
        <FieldError id="title-error" errors={state.errors?.title} />
      </div>

      <div className="participate-field">
        <div className="participate-label-row">
          <label htmlFor="description" className="participate-label">
            Conte o que está acontecendo <span aria-hidden="true">*</span>
          </label>
          <span className="participate-counter" aria-live="polite">
            {descriptionLen}/{DESCRIPTION_MAX}
          </span>
        </div>
        <textarea
          id="description"
          name="description"
          required
          maxLength={DESCRIPTION_MAX}
          rows={6}
          placeholder="Descreva o problema, onde acontece, há quanto tempo e qual solução você considera importante."
          className={`participate-input participate-textarea${state.errors?.description ? " is-invalid" : ""}`}
          aria-invalid={Boolean(state.errors?.description)}
          aria-describedby={state.errors?.description ? "description-error" : undefined}
          onChange={(event) => setDescriptionLen(event.target.value.length)}
        />
        <FieldError id="description-error" errors={state.errors?.description} />
      </div>

      <fieldset className="participate-consents">
        <legend className="participate-sr-only">Consentimentos</legend>

        <label className="participate-consent participate-consent--required">
          <input type="checkbox" name="consent" required className="participate-checkbox" />
          <span>
            <strong>Obrigatório.</strong> Li e concordo com o tratamento dos dados necessários
            para registrar, analisar e responder esta demanda, conforme a{" "}
            <Link href="/privacidade">Política de Privacidade</Link>.
          </span>
        </label>
        <FieldError id="consent-error" errors={state.errors?.consent} />

        <label className="participate-consent">
          <input type="checkbox" name="updates" className="participate-checkbox" />
          <span>
            <strong>Opcional.</strong> Desejo receber atualizações pelos canais informados. Posso
            cancelar essa autorização a qualquer momento.
          </span>
        </label>
      </fieldset>

      <button type="submit" className="participate-submit" disabled={pending} aria-busy={pending}>
        {pending ? (
          <>
            <Loader2 className="animate-spin" size={18} aria-hidden />
            ENVIANDO…
          </>
        ) : (
          <>
            <Send size={18} aria-hidden />
            ENVIAR DEMANDA E GERAR PROTOCOLO
          </>
        )}
      </button>
    </form>
  );
}

function FieldError({ id, errors }: { id?: string; errors?: string[] }) {
  if (!errors?.[0]) return null;
  return (
    <p id={id} className="participate-field-error" role="alert">
      <span aria-hidden="true">!</span>
      {errors[0]}
    </p>
  );
}

function formatRegisteredAt(value?: string) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "America/Fortaleza",
    }).format(new Date(value));
  } catch {
    return "";
  }
}
