// Catálogo completo de serviços da Arvic Group.
// Rafael edita aqui quando lançar um novo serviço.
window.ARVIC_SERVICES = [
  {
    id: "roteiros",
    titulo: "Roteirização de Vídeos",
    categoria: "Conteúdo",
    descricao:
      "Roteiros estratégicos de vídeos para redes sociais, pensados pra engajamento e conversão.",
  },
  {
    id: "gravacao",
    titulo: "Gravação",
    categoria: "Conteúdo",
    descricao: "Direção e captação de vídeos no estúdio ou no consultório.",
  },
  {
    id: "edicao",
    titulo: "Edição de Vídeo",
    categoria: "Conteúdo",
    descricao: "Edição profissional, legendas, cortes otimizados para Reels e Shorts.",
  },
  {
    id: "postagem",
    titulo: "Postagem em Redes Sociais",
    categoria: "Conteúdo",
    descricao: "Planejamento de publicação, copy, hashtags e cronograma.",
  },
  {
    id: "artes",
    titulo: "Artes para Redes Sociais",
    categoria: "Design",
    descricao: "Posts estáticos, banners, identidade visual aplicada.",
  },
  {
    id: "carrosseis",
    titulo: "Carrosséis",
    categoria: "Design",
    descricao: "Carrosséis educativos e de conversão para Instagram e LinkedIn.",
  },
  {
    id: "trafego-google",
    titulo: "Gestão de Tráfego Google",
    categoria: "Mídia Paga",
    descricao:
      "Google Ads (Search, Display, YouTube) para atração qualificada de pacientes e clientes.",
  },
  {
    id: "trafego-meta",
    titulo: "Gestão de Tráfego Meta",
    categoria: "Mídia Paga",
    descricao:
      "Campanhas no Instagram e Facebook focadas em geração de leads e agendamentos.",
  },
  {
    id: "crm",
    titulo: "Implantação de CRM",
    categoria: "Tecnologia",
    descricao:
      "Configuração, integração e organização do funil comercial em CRM (Kommo, Bitrix, HubSpot).",
  },
  {
    id: "ia",
    titulo: "Implantação de IA",
    categoria: "Tecnologia",
    descricao:
      "Agentes de IA para atendimento, qualificação de leads e automação de tarefas.",
  },
  {
    id: "treinamento-comercial",
    titulo: "Treinamento para Time Comercial",
    categoria: "Consultoria",
    descricao:
      "Capacitação ao vivo para fechamento, qualificação e gestão de pipeline.",
  },
  {
    id: "processos",
    titulo: "Estruturação de Processos",
    categoria: "Consultoria",
    descricao:
      "Desenho e documentação de processos comerciais, operacionais e de atendimento.",
  },
];

// Clientes ativos no portal.
// Para adicionar cliente: copiar o bloco abaixo, trocar o slug (chave) e os dados.
// - services: lista de IDs do ARVIC_SERVICES que o cliente contratou.
// - driveEmbed: pegar o link de compartilhamento da pasta do Drive do cliente
//   e converter para o formato "embed" (ver README).
// - password: senha simples para o MVP de validação.
window.ARVIC_CLIENTS = {
  "dr-caqueti": {
    nome: "Dr. Caqueti",
    nomeCurto: "Dr. Caqueti",
    especialidade: "Médico",
    logo: "assets/clientes/dr-caqueti/logo.png",
    password: "arvic2026",
    corDestaque: "#3FA095",
    driveEmbed: "", // preencher: https://drive.google.com/embeddedfolderview?id=XXXXX#grid
    driveLink: "", // preencher com link de compartilhamento normal
    services: ["trafego-meta", "roteiros", "gravacao", "edicao", "postagem"],
    kpis: {
      seguidores: { label: "Seguidores", value: 0, delta: 0, prefix: "" },
      leads: { label: "Leads no mês", value: 0, delta: 0, prefix: "" },
      cpl: { label: "Custo por lead", value: 0, delta: 0, prefix: "R$ " },
      investimento: {
        label: "Investimento no mês",
        value: 0,
        delta: 0,
        prefix: "R$ ",
      },
    },
    entregas: [
      // Exemplo:
      // { titulo: "Roteiro Episódio 12", categoria: "Conteúdo", status: "em-revisao", prazo: "2026-04-25" },
    ],
    agenda: [
      // Exemplo:
      // { titulo: "Alinhamento mensal", data: "2026-04-28T14:00", local: "Google Meet" },
    ],
    performance: {
      // Dados históricos para o gráfico. Edite conforme a evolução do cliente.
      labels: ["Dez", "Jan", "Fev", "Mar", "Abr"],
      series: [
        { name: "Leads", values: [0, 0, 0, 0, 0], color: "#3FA095" },
        { name: "Investimento (R$)", values: [0, 0, 0, 0, 0], color: "#F29442" },
      ],
    },
  },
};
