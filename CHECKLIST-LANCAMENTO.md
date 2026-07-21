# Checklist antes de publicar

## Jurídico e eleitoral

- Revisar textos, slogans, pedidos de voto e datas permitidas.
- Preencher CNPJ, responsável e identificação exigida nas páginas e materiais.
- Validar política de privacidade, consentimentos e prazo de retenção.
- Conferir regras para impulsionamento, IA, WhatsApp e prestação de contas.
- Confirmar que propostas são compatíveis com atribuições de deputada federal.

## Segurança

- Usar senha exclusiva e forte no painel.
- Preferir `ADMIN_PASSWORD_HASH` em produção.
- Gerar `AUTH_SECRET` aleatório com pelo menos 32 bytes.
- Ativar autenticação em dois fatores no GitHub, Vercel, Neon e domínio.
- Não compartilhar variáveis de ambiente no repositório.
- Revisar quem possui acesso ao projeto.

## Conteúdo

- Substituir todos os textos demonstrativos.
- Conferir nome, número, partido, contatos e links.
- Publicar foto oficial otimizada.
- Revisar fontes de dados e links das checagens.
- Remover agenda fictícia e inserir compromissos reais.
- Testar formulários e confirmar gravação no banco.

## Técnico

- Executar `npm run check`.
- Testar no celular, tablet e computador.
- Testar acessibilidade por teclado.
- Configurar domínio e `NEXT_PUBLIC_SITE_URL`.
- Conferir `robots.txt` e `sitemap.xml`.
- Fazer um envio de demanda e validar o painel.
