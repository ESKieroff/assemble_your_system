import { create } from 'zustand';

type SystemState = {
  systemType: string | null;
  persistence: string | null;
  realtime: string | null;
  language: string | null;
  framework: string[];
  orm: string[];
  setSystemType: (type: string) => void;
  setPersistence: (value: string) => void;
  setRealtime: (value: string) => void;
  setLanguage: (lang: keyof typeof technologies.languages) => void;
};

const technologies = {
  languages: {
    Java: ['Spring Boot', 'JPA', 'Hibernate'],
    NodeJS: ['NestJS', 'Express', 'Prisma'],
    PHP: ['Laravel', 'CodeIgniter', 'Yii'],
    Python: ['Django', 'Flask', 'SQLAlchemy']
  },
  orm: {
    Java: ['JPA', 'Hibernate'],
    NodeJS: ['Prisma'],
    PHP: ['Eloquent'],
    Python: ['SQLAlchemy']
  },
  realtime: ['WebSockets', 'Redis', 'RabbitMQ', 'Kafka']
};

export const useSystemStore = create<SystemState>((set) => ({
  systemType: null,
  persistence: null,
  realtime: null,
  language: null,
  framework: [],
  orm: [],
  setSystemType: (type) => set({ systemType: type }),
  setPersistence: (value) => set({ persistence: value }),
  setRealtime: (value) => set({ realtime: value }),
  setLanguage: (lang) => set({ language: lang, framework: technologies.languages[lang], orm: technologies.orm[lang] })
}));
