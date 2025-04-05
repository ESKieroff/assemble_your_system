import { create } from 'zustand';

const technologies = {
  languages: {
    Java: ['Spring Boot', 'JPA', 'Hibernate'],
    NodeJS: ['NestJS', 'Express', 'Prisma'],
    PHP: ['Laravel', 'CodeIgniter', 'Yii'],
    Python: ['Django', 'Flask', 'SQLAlchemy'],
  },
  orm: {
    Java: ['JPA', 'Hibernate'],
    NodeJS: ['Prisma'],
    PHP: ['Eloquent'],
    Python: ['SQLAlchemy'],
  },
  realtime: ['WebSockets', 'Redis', 'RabbitMQ', 'Kafka'],
};

export interface Recommendation {
  nome: string;
  tecnologias: string[];
  score: Record<string, number>;
}

type SystemState = {
  systemType: string | null;
  persistence: string | null;
  realtime: string | null;
  language: keyof typeof technologies.languages | null;
  framework: string[];
  orm: string[];
  recommendation?: Recommendation;
};

interface Setters {
  setSystemType: (type: string) => void;
  setPersistence: (value: string) => void;
  setRealtime: (value: string) => void;
  setLanguage: (lang: keyof typeof technologies.languages) => void;
  setFramework: (framework: string) => void;
  setOrm: (orm: string) => void;
  setRecommendation: (rec: Recommendation) => void;
  reset: () => void;
}

export const useSystemStore = create<SystemState & Setters>((set) => ({
  systemType: null,
  persistence: null,
  realtime: null,
  language: null,
  framework: [],
  orm: [],
  recommendation: undefined,

  setSystemType: (type) => set({ systemType: type }),
  setPersistence: (value) => set({ persistence: value }),
  setRealtime: (value) => set({ realtime: value }),
  setLanguage: (lang) =>
    set({
      language: lang,
      framework: technologies.languages[lang],
      orm: technologies.orm[lang],
    }),
  setFramework: (framework) =>
    set((state) => ({
      framework: [...new Set([...state.framework, framework])],
    })),
  setOrm: (orm) =>
    set((state) => ({
      orm: [...new Set([...state.orm, orm])],
    })),
  setRecommendation: (rec) => set({ recommendation: rec }),
  reset: () =>
    set({
      systemType: null,
      persistence: null,
      realtime: null,
      language: null,
      framework: [],
      orm: [],
      recommendation: undefined,
    }),
}));

export { technologies };
