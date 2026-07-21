# Personalização rápida

## 1. Dados da candidata

Edite `src/config/site.ts`:

- nome completo;
- nome de urna;
- iniciais;
- número;
- partido;
- slogan;
- biografia;
- e-mail, WhatsApp e redes sociais;
- CNPJ e responsável legal após o registro.

## 2. Cores

Edite as variáveis no início de `src/app/globals.css`:

- `--brand`: cor principal;
- `--brand-dark`: versão escura;
- `--brand-soft`: fundo suave;
- `--accent`: cor de destaque;
- `--ink`: cor dos textos.

## 3. Fotografia

A versão entregue utiliza um bloco elegante com as iniciais para não depender de foto provisória. Substitua o bloco em `src/app/(public)/sobre/page.tsx` por uma imagem oficial depois de tratar direitos, qualidade e autorização.

## 4. Conteúdo demonstrativo

O site exibe conteúdo demonstrativo quando o banco ainda não está conectado. Depois de configurar o Neon, execute:

```bash
npm run db:push
npm run db:seed
```

O conteúdo poderá ser administrado em `/admin`.
