import { create } from "zustand";

export type Stack = {
  name: string;
  features: {
    performance: number;
    cost: number;
    learningCurve: number;
    communitySupport: number;
    flexibility: number;
  };
};

export interface ComparisonStore {
  stacks: Stack[];
  filters: { [key: string]: string | string[] };
  addStack: (stack: Stack) => void;
  removeStack: (name: string) => void;
  clearStacks: () => void;
  setFilters: (filters: { [key: string]: string | string[] }) => void;
}

export const useComparisonStore = create<ComparisonStore>((set) => ({
  stacks: [],
  filters: {},
  addStack: (stack) =>
    set((state) => ({
      stacks: [...state.stacks.filter((s) => s.name !== stack.name), stack],
    })),
  removeStack: (name) =>
    set((state) => ({
      stacks: state.stacks.filter((s) => s.name !== name),
    })),
  clearStacks: () => set({ stacks: [] }),
  setFilters: (filters) => set({ filters }),
}));
