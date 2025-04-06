import { create } from "zustand";

const technologies = {
  languages: {
    Java: ["Spring Boot", "JPA", "Hibernate"],
    NodeJS: ["NestJS", "Express", "Prisma"],
    PHP: ["Laravel", "CodeIgniter", "Yii"],
    Python: ["Django", "Flask", "SQLAlchemy"],
  },
  orm: {
    Java: ["JPA", "Hibernate"],
    NodeJS: ["Prisma"],
    PHP: ["Eloquent"],
    Python: ["SQLAlchemy"],
  },
  realtime: ["WebSockets", "Redis", "RabbitMQ", "Kafka"],
};

export interface SystemState {
  systemType: string | null;
  persistence: string | null;
  realtime: string | null;
  language: string | null;
  framework: string[];
  orm: string[];
  recommendation?: {
    nome: string;
    tecnologias: string[];
    score: Record<string, number>;
  };
}

interface Setters {
  setSystemType: (type: string) => void;
  setPersistence: (value: string) => void;
  setRealtime: (value: string) => void;
  setLanguage: (lang: keyof typeof technologies.languages) => void;
  setFramework: (framework: string) => void;
  setOrm: (orm: string) => void;
  setRecommendation: (rec: SystemState["recommendation"]) => void;
}

export const useSystemStore = create<SystemState & Setters>((set) => ({
  systemType: null,
  persistence: null,
  realtime: null,
  language: null,
  framework: [],
  orm: [],
  recommendation: undefined,

  setSystemType: (type: string) => set({ systemType: type }),
  setPersistence: (value: string) => set({ persistence: value }),
  setRealtime: (value: string) => set({ realtime: value }),
  setLanguage: (lang: keyof typeof technologies.languages) =>
    set({
      language: lang,
      framework: technologies.languages[lang],
      orm: technologies.orm[lang],
    }),
  setFramework: (framework: string) =>
    set((state) => ({ framework: [...state.framework, framework] })),
  setOrm: (orm: string) =>
    set((state) => ({ orm: [...state.orm, orm] })),
  setRecommendation: (rec) => set({ recommendation: rec }),
}));
