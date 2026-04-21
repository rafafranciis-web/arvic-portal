# Portal do Cliente — Arvic Group

Portal estático, por cliente, com visão geral de entregas, performance, materiais (Drive), agenda e catálogo de soluções.

> MVP de validação. Sem backend, sem build. Só HTML, CSS e JS. Deploy na Vercel.

---

## Como o portal funciona

- `index.html` — página de acesso. Cliente digita **código** (ex: `instituto-caquetti`) e **senha**.
- `portal.html?c=<código>` — dashboard do cliente. Carregado dinamicamente com os dados de [js/clients.js](js/clients.js).
- `js/clients.js` — **aqui mora tudo**: catálogo de serviços da Arvic + dados de cada cliente.
- Materiais: exibidos via embed da pasta do Google Drive do cliente (sem upload novo).

---

## Como adicionar um cliente novo

1. Abrir [js/clients.js](js/clients.js)
2. Copiar o bloco de `"instituto-caquetti"` e colar abaixo, trocando a **chave** (slug sem acento/espaço) e os dados.
3. Preencher:
   - `nome`, `nomeCurto`, `especialidade`
   - `password` — senha que o cliente vai usar no login
   - `services` — IDs dos serviços contratados (ver lista em `ARVIC_SERVICES` no mesmo arquivo)
   - `driveEmbed` + `driveLink` — ver seção abaixo
   - `kpis`, `entregas`, `agenda`, `performance` — atualizar conforme avança o mês
4. (Opcional) colocar o logo do cliente em `assets/clientes/<slug>/logo.png`
5. Salvar → commit → push. A Vercel republica sozinha em ~30s.
6. Mandar pro cliente: URL do portal + **código** + **senha**.

---

## Conectando a pasta do Google Drive do cliente

1. Drive → clica direito na pasta do cliente → **Compartilhar**
2. Muda permissão para **"Qualquer pessoa com o link"** (visualizador)
3. Copia o link. Vai vir parecido com:
   `https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOp?usp=sharing`
4. Extrai o ID (a parte depois de `folders/` e antes do `?`):
   `1AbCdEfGhIjKlMnOp`
5. Em `js/clients.js`, para o cliente:
   ```js
   driveLink: "https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOp",
   driveEmbed: "https://drive.google.com/embeddedfolderview?id=1AbCdEfGhIjKlMnOp#grid",
   ```
6. Dali em diante, tudo que você jogar naquela pasta aparece no portal automaticamente.

---

## Onde colocar a logo

- **Logo da Arvic:** `assets/brand/arvic-logo.png` (já está lá)
- **Logo de cada cliente:** `assets/clientes/<slug>/logo.png`
  (exemplo: `assets/clientes/instituto-caquetti/logo.png`)

Depois referenciar no campo `logo` do cliente em `js/clients.js`.

---

## Deploy na Vercel (primeira vez)

Feito por mim (Claude) a partir daqui. Fluxo:

1. `git init` + primeiro commit (local).
2. Publicar em um repositório GitHub (precisa de conta GitHub).
3. Na Vercel: **Import Project** → conectar GitHub → escolher o repo `arvic-portal` → deploy.
4. Vercel dá um URL tipo `arvic-portal.vercel.app`.
5. (Opcional) conectar domínio próprio: `portal.arvicgroup.com.br`.

Depois do primeiro deploy, cada push no GitHub republica automaticamente.

---

## Próximos passos (pós-validação)

- [ ] Admin UI pra Rafael editar tudo sem mexer em arquivo
- [ ] Auth real (cada cliente tem conta, não senha compartilhada)
- [ ] Conexão direta Meta Ads / Google Ads → KPIs automáticos
- [ ] Embed Cal.com pra agendamento auto-atendimento
- [ ] Relatório mensal em PDF gerado do portal
