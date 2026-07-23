import { AdminCheckbox, AdminFormShell } from "@/components/admin-form-shell";
import { AdminPageHeader } from "@/components/admin-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { agendaCategories } from "@/config/agenda";
import { hasDatabase } from "@/db";
import { getAllEvents } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { createEventAction } from "../actions";

export default async function AdminAgendaPage() {
  const items = await getAllEvents();
  const usingLocalStore = !hasDatabase();

  return (
    <>
      <AdminPageHeader
        title="Agenda pública"
        description="Publique apenas compromissos confirmados para divulgação e atualize rapidamente mudanças de horário ou local. A página /agenda lê esta mesma fonte."
      />
      <div className="grid gap-7 xl:grid-cols-[.8fr_1.2fr]">
        <AdminFormShell title="Novo evento">
          <form action={createEventAction} className="grid gap-4">
            <F label="Título" name="title" />
            <div>
              <Label>Descrição</Label>
              <Textarea name="description" />
            </div>
            <F label="Município" name="city" defaultValue="Imperatriz" />
            <F label="Local" name="location" />
            <F label="Início" name="startAt" type="datetime-local" />
            <F label="Fim opcional" name="endAt" type="datetime-local" required={false} />
            <div>
              <Label>Categoria</Label>
              <Select name="category" defaultValue="Encontro comunitário">
                {agendaCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Região</Label>
              <Select name="region" defaultValue="imperatriz">
                <option value="imperatriz">Imperatriz</option>
                <option value="tocantina">Região Tocantina</option>
                <option value="maranhao">Maranhão</option>
                <option value="online">Online</option>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select name="status" defaultValue="confirmado">
                <option value="confirmado">confirmado</option>
                <option value="a confirmar">a confirmar</option>
                <option value="adiado">adiado</option>
                <option value="cancelado">cancelado</option>
              </Select>
            </div>
            <div className="flex flex-wrap gap-5">
              <AdminCheckbox name="public" label="Evento público" />
              <AdminCheckbox name="featured" label="Destaque" defaultChecked={false} />
            </div>
            <Button type="submit">Cadastrar evento</Button>
            {usingLocalStore ? (
              <p className="text-xs text-black/45">
                Banco indisponível: eventos ficam no store local (.data) e alimentam /agenda.
              </p>
            ) : null}
          </form>
        </AdminFormShell>
        <div className="grid gap-4 content-start">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={item.status === "confirmado" ? "success" : "warning"}>
                    {item.status}
                  </Badge>
                  {item.public ? <Badge tone="brand">público</Badge> : <Badge tone="neutral">privado</Badge>}
                  {"featured" in item && item.featured ? <Badge tone="warning">destaque</Badge> : null}
                </div>
                <h2 className="mt-3 text-lg font-bold">{item.title}</h2>
                <p className="mt-2 text-sm text-black/50">
                  {formatDate(item.startAt, true)} · {item.city}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
              </CardContent>
            </Card>
          ))}
          {items.length === 0 && <Empty />}
        </div>
      </div>
    </>
  );
}

function F(p: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>{p.label}</Label>
      <Input
        name={p.name}
        type={p.type}
        defaultValue={p.defaultValue}
        required={p.required !== false}
      />
    </div>
  );
}

function Empty() {
  return (
    <Card>
      <CardContent className="py-10 text-center text-sm text-black/40">
        Nenhum evento cadastrado.
      </CardContent>
    </Card>
  );
}
