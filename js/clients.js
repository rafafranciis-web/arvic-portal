// Catálogo completo de serviços da Arvic Group.
// Rafael edita aqui quando lançar um novo serviço.
window.ARVIC_SERVICES = [
  // Conteúdo ---------------------------------------------------------------
  {
    id: "roteiros",
    titulo: "Roteirização de Vídeos",
    categoria: "Conteúdo",
    descricao:
      "Roteiros estratégicos e scripts personalizados, alinhados à mensagem e aos objetivos da marca.",
  },
  {
    id: "gravacao",
    titulo: "Gravação",
    categoria: "Conteúdo",
    descricao: "Direção e captação de vídeos no estúdio ou no consultório.",
  },
  {
    id: "edicao",
    titulo: "Edição de Alto Impacto",
    categoria: "Conteúdo",
    descricao:
      "Cortes dinâmicos, efeitos visuais, transições suaves e correção de cor para Reels, Shorts e anúncios.",
  },
  {
    id: "postagem",
    titulo: "Gestão de Redes Sociais",
    categoria: "Conteúdo",
    descricao:
      "Planejamento editorial, cronograma, publicação e interação com o público.",
  },
  // Design ------------------------------------------------------------------
  {
    id: "artes",
    titulo: "Artes para Redes Sociais",
    categoria: "Design",
    descricao: "Posts orgânicos, banners e identidade visual aplicada.",
  },
  {
    id: "carrosseis",
    titulo: "Carrosséis",
    categoria: "Design",
    descricao: "Carrosséis educativos e de conversão para Instagram e LinkedIn.",
  },
  {
    id: "artes-anuncios",
    titulo: "Artes para Anúncios",
    categoria: "Design",
    descricao:
      "Peças visuais otimizadas para conversão em campanhas pagas no Google e Meta.",
  },
  {
    id: "videos-anuncios",
    titulo: "Vídeos Animados para Anúncios",
    categoria: "Design",
    descricao:
      "Vídeos dinâmicos e animados criados para impacto imediato em campanhas pagas.",
  },
  // Copy --------------------------------------------------------------------
  {
    id: "copywriting",
    titulo: "Copywriting para Posts e Anúncios",
    categoria: "Copy",
    descricao:
      "Textos persuasivos que capturam atenção, comunicam o diferencial e incentivam a ação.",
  },
  {
    id: "email-marketing",
    titulo: "Escrita Criativa para Email Marketing",
    categoria: "Copy",
    descricao:
      "E-mails personalizados por estágio da jornada do cliente, com foco em conversão.",
  },
  // Mídia Paga --------------------------------------------------------------
  {
    id: "trafego-google",
    titulo: "Gestão de Tráfego Google",
    categoria: "Mídia Paga",
    descricao:
      "Google Ads (Search, Display, YouTube): distribuição, captação e remarketing.",
  },
  {
    id: "trafego-meta",
    titulo: "Gestão de Tráfego Meta",
    categoria: "Mídia Paga",
    descricao:
      "Campanhas no Instagram e Facebook focadas em geração de leads e agendamentos.",
  },
  {
    id: "seo",
    titulo: "Otimização SEO",
    categoria: "Mídia Paga",
    descricao:
      "Conteúdo e palavras-chave, UX, link building — tráfego orgânico qualificado.",
  },
  {
    id: "funil-captacao",
    titulo: "Funil de Captação Interno",
    categoria: "Mídia Paga",
    descricao:
      "Base → Curiosidade → Oportunidades → Clientes. Estrutura de conversão da base.",
  },
  // Tecnologia --------------------------------------------------------------
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
  // Consultoria -------------------------------------------------------------
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
// Para adicionar cliente novo: copiar o bloco abaixo, trocar o slug e os dados.
window.ARVIC_CLIENTS = {
  "instituto-caquetti": {
    nome: "Instituto Caquetti",
    nomeCurto: "Dr. Filippe",
    especialidade: "Dr. Filippe Mendes Caquetti · CRM-SP 139171 · Saúde Personalizada",
    logo: "assets/clientes/instituto-caquetti/logo.png",
    password: "caquetti2026",
    corDestaque: "#3FA095",
    // Para conectar: compartilhar a pasta do Drive ("Qualquer pessoa com o link")
    //   e preencher os dois campos abaixo. Ver README.
    driveEmbed: "",
    driveLink: "",
    // Serviços contratados conforme proposta comercial (R$ 4.990,00/mês):
    services: [
      "artes",
      "carrosseis",
      "artes-anuncios",
      "videos-anuncios",
      "roteiros",
      "gravacao",
      "edicao",
      "postagem",
      "copywriting",
      "email-marketing",
      "trafego-google",
      "trafego-meta",
      "seo",
      "funil-captacao",
    ],
    kpis: {
      seguidores: { label: "Seguidores @institutocaquetti", value: 1602, delta: 0, prefix: "" },
      leads: { label: "Leads no mês", value: 0, delta: 0, prefix: "" },
      cpl: { label: "Custo por lead", value: 0, delta: 0, prefix: "R$ " },
      investimento: {
        label: "Investimento mensal",
        value: 4990,
        delta: 0,
        prefix: "R$ ",
      },
    },
    entregas: [
      // Exemplo (remover e preencher com o que está em produção):
      // { titulo: "Roteiro Episódio 12", categoria: "Conteúdo", status: "em-revisao", prazo: "2026-04-30" },
    ],
    agenda: [
      // Exemplo:
      // { titulo: "Briefing inicial", data: "2026-04-28T14:00", local: "Google Meet" },
    ],
    performance: {
      // Dados históricos para o gráfico. Atualizar conforme a evolução.
      labels: ["Dez", "Jan", "Fev", "Mar", "Abr"],
      series: [
        { name: "Leads", values: [0, 0, 0, 0, 0], color: "#3FA095" },
        { name: "Investimento (R$)", values: [0, 0, 0, 0, 4990], color: "#F29442" },
      ],
    },
  },
};
