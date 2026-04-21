// =============================================================
//  ARVIC — Dados do portal
// =============================================================
//  Rafael edita esse arquivo (ou pede pra mim via Claude) sempre
//  que quiser atualizar algo. Tudo que o cliente vê sai daqui.
//
//  Estrutura geral:
//   - ARVIC_CONFIG    → configurações globais (WhatsApp, etc)
//   - ARVIC_SERVICES  → catálogo completo das soluções Arvic
//   - ARVIC_CLIENTS   → um bloco por cliente ativo no portal
// =============================================================

window.ARVIC_CONFIG = {
  whatsapp: "5511942605977",           // número que recebe mensagens
  whatsappDisplay: "(11) 94260-5977",
  email: "contato@arvicgroup.com",
  instagram: "@arvicgroup",
};

// -------------------------------------------------------------
//  CATÁLOGO DE SOLUÇÕES
// -------------------------------------------------------------
//  Nomes repaginados pra transmitir o que é entregue de verdade,
//  sem jargão de agência. Descrições em voz humana, sem discurso
//  de IA.
// -------------------------------------------------------------
window.ARVIC_SERVICES = [
  // Conteúdo --------------------------------------------------
  {
    id: "narrativa",
    titulo: "Narrativa de Marca",
    categoria: "Conteúdo",
    descricao:
      "Roteiros pensados pra cada vídeo: o que falar, em que ordem, com qual gancho. A gente parte da sua voz e transforma em material que as pessoas assistem até o fim.",
  },
  {
    id: "direcao-audiovisual",
    titulo: "Direção Audiovisual",
    categoria: "Conteúdo",
    descricao:
      "Gravação no consultório ou no estúdio, com direção no set. Você aparece bem, fala o que precisa e a gente cuida de tudo em volta.",
  },
  {
    id: "pos-producao",
    titulo: "Pós-produção Cinematográfica",
    categoria: "Conteúdo",
    descricao:
      "Cortes dinâmicos, legendas, cor tratada, transições que não distraem. O vídeo que sai daqui segura atenção do primeiro ao último segundo.",
  },
  {
    id: "presenca-digital",
    titulo: "Presença Digital Estratégica",
    categoria: "Conteúdo",
    descricao:
      "Calendário editorial, postagem, monitoramento, resposta pra seguidor. Seu Instagram tem cara de quem está ali todo dia — porque estamos.",
  },
  // Design ---------------------------------------------------
  {
    id: "identidade-aplicada",
    titulo: "Identidade Visual Aplicada",
    categoria: "Design",
    descricao:
      "Peças que parecem saídas da sua marca, não de um template genérico. Cada arte com intenção, alinhada com o que você quer comunicar.",
  },
  {
    id: "storytelling-visual",
    titulo: "Storytelling Visual",
    categoria: "Design",
    descricao:
      "Carrosséis que ensinam, convertem e são salvos. A gente desenha cada slide pra funcionar sozinho e em sequência.",
  },
  {
    id: "criativos-conversao",
    titulo: "Criativos de Conversão",
    categoria: "Design",
    descricao:
      "Artes feitas especificamente pra anúncio. Testadas, otimizadas, trocadas quando cansa. Pago pra converter, não pra decorar.",
  },
  {
    id: "videos-publicitarios",
    titulo: "Vídeos Publicitários Animados",
    categoria: "Design",
    descricao:
      "Vídeos com motion graphics pra campanhas que precisam impactar nos primeiros 3 segundos. Formato feed, reel e story.",
  },
  // Copy -----------------------------------------------------
  {
    id: "escrita-performance",
    titulo: "Escrita de Alta Performance",
    categoria: "Copy",
    descricao:
      "Copy de post, legenda, anúncio e página. Texto que soa como você, com gancho, argumento e chamada clara pro próximo passo.",
  },
  {
    id: "relacionamento-email",
    titulo: "Relacionamento por E-mail",
    categoria: "Copy",
    descricao:
      "Sequências de e-mail por etapa da jornada do paciente. Cada mensagem com um motivo pra ser aberta e lida.",
  },
  // Mídia Paga -----------------------------------------------
  {
    id: "aceleracao-meta",
    titulo: "Aceleração Meta Ads",
    categoria: "Mídia Paga",
    descricao:
      "Campanhas no Instagram e Facebook com três frentes rodando juntas: distribuição de autoridade, captação de lead quente e remarketing pra quem já se interessou.",
  },
  {
    id: "aceleracao-google",
    titulo: "Aceleração Google Ads",
    categoria: "Mídia Paga",
    descricao:
      "Search, Display e YouTube calibrados pro seu tipo de paciente. Pessoa procura, te encontra, agenda.",
  },
  {
    id: "presenca-organica",
    titulo: "Presença Orgânica no Google",
    categoria: "Mídia Paga",
    descricao:
      "Conteúdo que rankeia, site rápido, estrutura certa. Tráfego que chega sem você pagar por clique.",
  },
  {
    id: "engenharia-conversao",
    titulo: "Engenharia de Conversão",
    categoria: "Mídia Paga",
    descricao:
      "Desenho do funil interno: da base fria até o paciente marcar. Cada etapa com um próximo passo pensado.",
  },
  // Tecnologia -----------------------------------------------
  {
    id: "crm",
    titulo: "Infraestrutura Comercial Digital",
    categoria: "Tecnologia",
    descricao:
      "Toda clínica perde paciente em algum ponto: mensagem não respondida, follow-up esquecido, agenda bagunçada. A gente monta o CRM integrando WhatsApp, Instagram e agendamento — seu time vê quem precisa de atenção agora.",
    upsell: true,
  },
  {
    id: "ia",
    titulo: "Inteligência Artificial Proprietária",
    categoria: "Tecnologia",
    descricao:
      "Uma IA treinada na sua base de conhecimento. Atende paciente no WhatsApp 24h, tira dúvidas comuns, pré-agenda. Seu paciente sente que tem você disponível o tempo todo — e seu time atende quem precisa de humano de verdade.",
    upsell: true,
  },
  // Consultoria ----------------------------------------------
  {
    id: "consultoria-360",
    titulo: "Consultoria Arvic 360º",
    categoria: "Consultoria",
    descricao:
      "Às vezes marketing não é o problema — é a operação toda. A gente olha seu negócio de cima e redesenha o que precisa: atendimento, comercial, processos, posicionamento. Você sai com um plano de 90 dias claro, sem palpite.",
    upsell: true,
  },
  {
    id: "formacao-comercial",
    titulo: "Formação Comercial Executiva",
    categoria: "Consultoria",
    descricao:
      "Treinamento ao vivo do seu time: qualificar lead, abordar, fechar, cuidar do pipeline. Time que vende no padrão do que você cobra. A gente acompanha depois pra ver se o que ensinou virou prática.",
    upsell: true,
  },
  {
    id: "arquitetura-operacional",
    titulo: "Arquitetura Operacional",
    categoria: "Consultoria",
    descricao:
      "Seu negócio roda porque você empurra. Isso trava o crescimento. A gente mapeia e documenta os processos — captação, atendimento, follow-up, retenção — pra rolar sem depender de você em cada etapa.",
    upsell: true,
  },
  {
    id: "branding-medico",
    titulo: "Branding Médico Premium",
    categoria: "Consultoria",
    descricao:
      "Quando o nível do seu trabalho não aparece na sua marca, você perde pra concorrente menos preparado que investiu em presença. Reposicionamento completo: identidade, site, tom de voz. A cara do que você é de verdade.",
    upsell: true,
  },
];

// -------------------------------------------------------------
//  CLIENTES ATIVOS
// -------------------------------------------------------------
window.ARVIC_CLIENTS = {
  "instituto-caquetti": {
    // Identificação
    nome: "Instituto Caquetti",
    nomeCurto: "Dr. Filippe",
    especialidade: "Dr. Filippe Mendes Caquetti · CRM-SP 139171",
    tagline: "Saúde personalizada — cuidando por inteiro",
    logo: "assets/clientes/instituto-caquetti/logo.png",
    instagram: "@institutocaquetti",
    instagramUrl: "https://instagram.com/institutocaquetti",
    linkBio: "https://linktr.ee/drfelippecaquetti",
    password: "caquetti2026",
    corDestaque: "#3FA095",

    // Pasta do Drive (preencher assim que Rafael organizar):
    //   driveLink  = link normal de compartilhamento da pasta-mãe
    //   driveEmbed = variante "embeddedfolderview" (ver README)
    driveLink: "",
    driveEmbed: "",

    // Comercial
    honorarios: 4990,          // valor mensal dos nossos serviços
    exibirHonorarios: true,    // mostra no portal?

    // Soluções contratadas (IDs do ARVIC_SERVICES)
    services: [
      "presenca-digital",
      "narrativa",
      "direcao-audiovisual",
      "pos-producao",
      "identidade-aplicada",
      "storytelling-visual",
      "criativos-conversao",
      "videos-publicitarios",
      "escrita-performance",
      "relacionamento-email",
      "aceleracao-meta",
      "aceleracao-google",
      "presenca-organica",
      "engenharia-conversao",
    ],

    // KPIs que este cliente vê no Visão Geral
    // (outros clientes podem ter KPIs diferentes)
    kpis: [
      {
        id: "seguidores",
        label: "Seguidores no Instagram",
        valor: 0,
        delta: 0,
        formato: "numero",
        fonte: "Atualizado pela Arvic",
      },
      {
        id: "conteudos",
        label: "Conteúdos publicados",
        valor: 0,
        delta: 0,
        formato: "numero",
        fonte: "Somado da Biblioteca",
      },
      {
        id: "proximo-marco",
        label: "Próximo marco",
        valor: "A definir",
        formato: "texto",
        fonte: "Planejamento Arvic",
      },
      {
        id: "proximo-encontro",
        label: "Próximo encontro",
        valor: "",
        formato: "texto",
        fonte: "Agenda",
      },
    ],

    // Jornada Instagram — o norte dessa parceria
    jornadaInstagram: {
      metaSeguidores: 0,        // Rafael define a meta estratégica
      // Rafael atualiza no final de cada mês. Vai puxando dados do
      // Instagram Insights ou anotando manualmente.
      historico: [
        // { mes: "2026-01", seguidores: 0, alcance: 0, interacoes: 0 },
      ],
      marcos: [
        {
          data: "2026-01-15",
          titulo: "Kickoff da parceria Arvic",
          descricao:
            "Briefing, mapeamento de conteúdo e alinhamento da estratégia de crescimento no Instagram.",
        },
      ],
    },

    // Biblioteca de conteúdo, organizada por mês
    // Chaves no formato YYYY-MM. Meses sem produção ficam vazios
    // (a UI já trata automaticamente).
    biblioteca: {
      "2026-01": { videos: [], roteiros: [], artes: [] },
      "2026-02": { videos: [], roteiros: [], artes: [] },
      "2026-03": { videos: [], roteiros: [], artes: [] },
      "2026-04": { videos: [], roteiros: [], artes: [] },
    },

    // Vídeos aguardando aprovação do cliente
    // Formato: { id, titulo, descricao, driveId, enviadoEm, duracao }
    // Quando o cliente aprovar, ele dispara WhatsApp pra Arvic.
    aprovacoesPendentes: [
      // (exemplos removíveis — substituir por itens reais assim que
      // tiver vídeos rodando pra aprovação)
    ],

    // Agenda: reuniões, gravações, entregas
    agenda: [
      // { titulo: "Gravação mensal", data: "2026-05-08T09:00", local: "Consultório", link: "" }
    ],
  },
};
