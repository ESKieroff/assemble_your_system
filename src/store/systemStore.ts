import { create } from "zustand";

type SystemStore = {
  systemType: string[];
  persistence: string[];
  realtime: string[];
  language: string[];
  framework: string[];
  orm: string[];
  aiFeatures: string[];
  setSystemType: (value: string[]) => void;
  setPersistence: (value: string[]) => void;
  setRealtime: (value: string[]) => void;
  setLanguage: (value: string[]) => void;
  setFramework: (value: string[]) => void;
  setOrm: (value: string[]) => void;
  setAiFeatures: (value: string[]) => void;
};

export const useSystemStore = create<SystemStore>((set) => ({
  systemType: [],
  persistence: [],
  realtime: [],
  language: [],
  framework: [],
  orm: [],
  aiFeatures: [],
  setSystemType: (value) => set({ systemType: value }),
  setPersistence: (value) => set({ persistence: value }),
  setRealtime: (value) => set({ realtime: value }),
  setLanguage: (value) => set({ language: value }),
  setFramework: (value) => set({ framework: value }),
  setOrm: (value) => set({ orm: value }),
  setAiFeatures: (value) => set({ aiFeatures: value }),
}));
