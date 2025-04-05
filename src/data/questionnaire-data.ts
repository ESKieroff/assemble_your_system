export interface Pergunta {
  id: string;
  pergunta: string;
  opcoes: string[];
  multiplas?: boolean;
  categoria?: string;
}

export const perguntas: Pergunta[] = [
  {
    id: "tipo_projeto",
    pergunta: "Qual o tipo do seu projeto?",
    opcoes: ["Aplicativo Mobile", "Aplicativo Web", "PWA", "API", "Sistema Desktop"],
  },
  {
    id: "persistencia",
    pergunta: "Seu projeto precisa de persistência de dados?",
    opcoes: ["Sim", "Não"],
  },
  {
    id: "tempo_entrega",
    pergunta: "Qual o prazo ideal de entrega?",
    opcoes: ["1-2 semanas", "1 mês", "2-3 meses", "+3 meses"],
  },
  {
    id: "complexidade",
    pergunta: "Qual o nível de complexidade esperado?",
    opcoes: ["Baixa", "Média", "Alta"],
  },
  {
    id: "custo",
    pergunta: "Qual o orçamento disponível?",
    opcoes: ["Muito Baixo", "Baixo", "Moderado", "Alto"],
  },
  {
    id: "inteligencia_artificial",
    pergunta: "Você pretende usar alguma funcionalidade de IA?",
    opcoes: ["Sim", "Não", "Talvez"],
  },
  {
    id: "preferencias_tecnologicas",
    pergunta: "Você já tem alguma preferência tecnológica?",
    opcoes: ["Node.js", "Python", "Java", "Flutter", "React", "Laravel"],
    multiplas: true,
  },
  {
    id: "realtime",
    pergunta: "Seu projeto exige comunicação em tempo real?",
    opcoes: ["Sim", "Não"],
  },
];

export const stacks = [
  {
    id: "mern",
    nome: "MERN (MongoDB, Express, React, Node.js)",
    tecnologias: ["MongoDB", "Express", "React", "Node.js"],
    score: {
      web: 5,
      mobile: 2,
      desktop: 1,
      realtime: 4,
      persistence: 4,
      ai: 3,
      experience: 3,
    },
  },
  {
    id: "flutter_firebase",
    nome: "Flutter + Firebase",
    tecnologias: ["Flutter", "Firebase", "Firestore", "Firebase Auth"],
    score: {
      web: 3,
      mobile: 5,
      desktop: 2,
      realtime: 5,
      persistence: 4,
      ai: 3,
      experience: 2,
    },
  },
  {
    id: "spring_react",
    nome: "Spring Boot + React",
    tecnologias: ["Spring Boot", "React", "PostgreSQL"],
    score: {
      web: 5,
      mobile: 2,
      desktop: 1,
      realtime: 3,
      persistence: 5,
      ai: 2,
      experience: 2,
    },
  },
  {
    id: "nextjs_supabase",
    nome: "Next.js + Supabase",
    tecnologias: ["Next.js", "Supabase", "PostgreSQL"],
    score: {
      web: 5,
      mobile: 3,
      desktop: 1,
      realtime: 4,
      persistence: 4,
      ai: 2,
      experience: 4,
    },
  },
  {
    id: "nestjs_angular_ai",
    nome: "NestJS + Angular + TensorFlow.js",
    tecnologias: ["NestJS", "Angular", "PostgreSQL", "TensorFlow.js"],
    score: {
      web: 5,
      mobile: 2,
      desktop: 1,
      realtime: 4,
      persistence: 5,
      ai: 5,
      experience: 1,
    },
  },
];
