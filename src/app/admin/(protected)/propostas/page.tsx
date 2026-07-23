import { AdminFormShell, AdminCheckbox } from "@/components/admin-form-shell";
import { AdminPageHeader } from "@/components/admin-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { proposalNumber } from "@/config/bandeiras";
import { demandCategories } from "@/lib/demand-category";
import { hasDatabase } from "@/db";
import { getAllProposals } from "@/lib/data";
import { createProposalAction } from "../actions";

export default async function AdminProposalsPage() {
  const items = await getAllProposals();
  const fromFallback = !hasDatabase();

  return (
    <>
      <AdminPageHeader
        title="Propostas"
        description="Cadastre conteúdos objetivos, compatíveis com as atribuições de uma deputada federal e revisados pela coordenação e pelo jurídico. Home, listagem e páginas individuais leem a mesma fonte."
      />
      <div className="grid gap-7 xl:grid-cols-[.8fr_1.2fr]">
        <AdminFormShell title="Nova proposta">
          <form action={createProposalAction} className="grid gap-4">
            <Field label="Título" name="title" />
            <Field label="Slug opcional" name="slug" />
            <Field label="Categoria" name="category" />
            <div>
              <Label>Tema da demanda (formulário Participe)</Label>
              <select
                name="demandTheme"
                required
                defaultValue=""
                className="flex h-11 w-full rounded-2xl border border-black/10 bg-white px-3 text-sm"
              >
                <option value="" disabled>
                  Selecione um tema válido
                </option>
                {demandCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <Field label="Ícone" name="icon" placeholder="heart-handshake, home, heart-pulse, building-2, shield, messages-square" />
            <div>
              <Label>Resumo</Label>
              <Textarea name="summary" required />
            </div>
            <div>
              <Label>Texto principal (corpo curto)</Label>
              <Textarea name="body" required className="min-h-28" />
            </div>
            <div>
              <Label>Por que importa</Label>
              <Textarea name="whyItMatters" required className="min-h-28" />
            </div>
            <div>
              <Label>Compromissos (um por linha)</Label>
              <Textarea name="commitments" required className="min-h-36" placeholder="Buscar recursos federais..." />
            </div>
            <div>
              <Label>Atuação federal (um por linha)</Label>
              <Textarea name="howFederalActs" required className="min-h-36" placeholder="Emendas parlamentares..." />
            </div>
            <Field label="Ordem" name="sortOrder" type="number" defaultValue="0" />
            <div className="flex flex-wrap gap-5">
              <AdminCheckbox name="featured" label="Destaque" defaultChecked={false} />
              <AdminCheckbox name="published" label="Publicada" />
            </div>
            <Button type="submit" disabled={fromFallback}>
              Cadastrar proposta
            </Button>
            {fromFallback && (
              <p className="text-xs text-black/45">
                Banco indisponível: o painel exibe o fallback. Configure DATABASE_URL para cadastrar.
              </p>
            )}
          </form>
        </AdminFormShell>
        <div className="grid gap-4 content-start">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="brand">{item.category}</Badge>
                      {!item.published && <Badge tone="neutral">Rascunho</Badge>}
                    </div>
                    <h2 className="mt-3 text-lg font-bold">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-black/50">{item.summary}</p>
                    <p className="mt-2 text-xs text-black/35">
                      Ícone: {item.icon} · Tema demanda: {item.demandTheme}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-black/30">#{proposalNumber(item.sortOrder)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          {items.length === 0 && <Empty />}
        </div>
      </div>
    </>
  );
}

function Field(props: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <Label>{props.label}</Label>
      <Input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        required={props.name !== "slug" && props.name !== "icon"}
      />
    </div>
  );
}

function Empty() {
  return (
    <Card>
      <CardContent className="py-10 text-center text-sm text-black/40">
        Nenhuma proposta cadastrada.
      </CardContent>
    </Card>
  );
}
