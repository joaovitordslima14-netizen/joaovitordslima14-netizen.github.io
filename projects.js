/*
  Para adicionar vídeos ou imagens reais a um projeto, copie o arquivo para a pasta media/
  (vídeos em media/videos/) e acrescente em "media":
    { type: "video",   src: "media/videos/meu-video.mp4", caption: "Fluxo de agendamento" }
    { type: "youtube", src: "ID_DO_VIDEO",                caption: "Demonstração" }
    { type: "image",   src: "media/minha-imagem.png",     caption: "Tela de pedidos" }
*/
window.PROJECTS = [
  {
    id: "olimpios",
    title: "Barbearia Olimpios",
    category: "Agendamento",
    kind: "Aplicação web full stack",
    role: "Desenvolvimento completo: back-end em Python/Flask, banco de dados, tempo real e interface.",
    summary:
      "Plataforma de agendamento online para barbearia: o cliente escolhe barbeiro, serviço e horário; a equipe gerencia a agenda em tempo real e acompanha relatórios.",
    benefits: [
      "Clientes agendam sozinhos 24h, sem depender de mensagem ou ligação",
      "Agenda do dia atualizada em tempo real para toda a equipe (WebSocket)",
      "Relatórios de serviços realizados e atendimentos por barbeiro",
      "Distingue agendamentos feitos pelo cliente e pela barbearia",
      "Recuperação de senha e controle de horários por barbeiro",
    ],
    features: [
      "Cadastro, login e redefinição de senha",
      "Escolha de data com horários livres e bloqueio de domingo",
      "Painel da barbearia com filtros por barbeiro e data",
      "Dashboard de relatórios por ano e mês",
      "Configuração de horários de atendimento",
    ],
    stack: ["Python", "Flask", "Flask-SocketIO", "SQLAlchemy", "PostgreSQL", "Gunicorn", "HTML/CSS/JS"],
    link: null,
    logo: "media/olimpios-logo.png",
    mock: "olimpios",
    media: [],
  },
  {
    id: "star-life",
    title: "Star Life Legend",
    category: "Jogo",
    kind: "Jogo web jogável",
    role: "Projeto autoral: arquitetura, modelagem de banco, regras de negócio com testes e interface.",
    summary:
      "Simulador de carreira de futebol: você cria um atleta aos 15 anos, treina, joga partidas 2D, administra finanças e constrói uma lenda temporada após temporada.",
    benefits: [
      "Roda direto no navegador, sem instalar nada (desktop e mobile)",
      "Saves na nuvem com conta, ou offline no próprio dispositivo",
      "Regras de carreira cobertas por testes determinísticos automatizados",
      "Segurança por RLS: cada jogador só acessa os próprios dados",
      "Arquitetura pronta para crescer: finanças, vida social e mundo de clubes",
    ],
    features: [
      "Partida 2D com física de bola, passe, drible, desarme e finalização",
      "Criador de atleta com aparência, 11 posições e atributos",
      "Treino com progresso limitado por potencial, carga e recuperação",
      "Finanças com ledger, imóveis e veículos; contratos e salários",
      "Calendário de competições Sub-13 ao profissional",
    ],
    stack: ["React 19", "TypeScript", "Vite", "Phaser 3", "Supabase", "PostgreSQL", "IndexedDB", "Vitest"],
    link: null,
    mock: null,
    media: [
      { type: "image", src: "media/star-dia.png", caption: "Painel “Meu dia”: treino, rotina e próxima partida" },
      { type: "image", src: "media/star-carreira.png", caption: "Atributos, forma e potencial do atleta" },
      { type: "image", src: "media/star-atleta.png", caption: "Personalização do atleta" },
      { type: "image", src: "media/star-armario.png", caption: "Armário e loja" },
      { type: "image", src: "media/star-financas.png", caption: "Finanças: extrato, imóveis e veículos" },
      { type: "image", src: "media/star-social.png", caption: "Vida social e reputação" },
      { type: "image", src: "media/star-pessoal.png", caption: "Vida pessoal e comportamento" },
      { type: "image", src: "media/star-mundo.png", caption: "Mundo: classificação e jogos da liga" },
    ],
  },
  {
    id: "cnsi",
    title: "Gestão de Produção e Estoque",
    category: "Indústria",
    kind: "Sistema de gestão industrial",
    role: "API REST, modelagem PostgreSQL com migrações, autenticação, relatórios em PDF/Excel e telas.",
    summary:
      "Controle operacional de produção e estoque de peças: lotes, pesagens, reservas, clientes, pedidos e etiquetas imprimíveis, com rastreabilidade ponta a ponta.",
    benefits: [
      "Rastreabilidade de cada peça: lote, pesagens, movimentações e reservas",
      "Pedidos com impressão de documento e etiquetas, sem retrabalho manual",
      "Saldo de estoque confiável e consumo registrado por pedido",
      "Acesso por perfis de usuário com autenticação segura (JWT + bcrypt)",
      "Pronto para nuvem: migrações SQL versionadas e health check",
    ],
    features: [
      "Produção de lotes e cadastro de peças com pesagem e repesagem",
      "Reserva e liberação de peças para pedidos",
      "Clientes e pedidos: finalizar, cancelar e imprimir",
      "Geração de etiquetas com histórico de eventos",
      "Exportação em PDF e Excel",
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "JWT", "bcrypt", "PDFKit", "ExcelJS", "Render"],
    link: null,
    mock: "cnsi",
    media: [],
  },
  {
    id: "systeminv",
    title: "SystemINV",
    category: "Indústria",
    kind: "Inventário de almoxarifado",
    role: "API em Node.js com SQL Server, autenticação por perfis, exportações e documentação técnica e de usuário.",
    summary:
      "Sistema de controle de estoque para almoxarifado com entrada, baixa, cadastro de itens, histórico completo e gestão de usuários por perfil.",
    benefits: [
      "Histórico detalhado de toda movimentação, com exportação em PDF e Excel",
      "Histórico de pesquisas por item para auditoria",
      "Perfis admin e usuário: cada um vê e faz só o que deve",
      "Interface simples, com guia do usuário e documentação técnica completas",
      "Senhas protegidas com bcrypt e sessões JWT de 1 hora",
    ],
    features: [
      "Entrada e baixa de estoque",
      "Cadastro e listagem de itens",
      "Histórico de movimentações e de pesquisas",
      "Gerenciamento de usuários (admin)",
      "Integração com SQL Server",
    ],
    stack: ["Node.js", "Express", "SQL Server", "JWT", "bcrypt", "ExcelJS", "jsPDF"],
    link: null,
    mock: "inv",
    media: [],
  },
];
