// src/data/recommendation-data.ts

import { StackScore } from "@/app/utils/scoreCalculator";

export const stacks: StackScore[] = [
  {
    id: "stack1",
    nome: "Node.js + React + MongoDB",
    tecnologias: ["Node.js", "React", "MongoDB"],
    score: {
      node: 10,
      react: 9,
      mongo: 8,
      tempoEntrega: 8,
      custo: 9,
      curvaAprendizado: 7,
      comunidade: 9,
      complexidade: 6,
    },
  },
  {
    id: "stack2",
    nome: "Java + Angular + MySQL",
    tecnologias: ["Java", "Angular", "MySQL"],
    score: {
      java: 9,
      angular: 8,
      mysql: 8,
      tempoEntrega: 6,
      custo: 6,
      curvaAprendizado: 5,
      comunidade: 8,
      complexidade: 8,
    },
  },
  {
    id: "stack3",
    nome: "Python + Django + PostgreSQL",
    tecnologias: ["Python", "Django", "PostgreSQL"],
    score: {
      python: 9,
      django: 9,
      postgresql: 9,
      tempoEntrega: 7,
      custo: 7,
      curvaAprendizado: 8,
      comunidade: 9,
      complexidade: 6,
    },
  },
  {
    id: "stack4",
    nome: "PHP + Laravel + MySQL",
    tecnologias: ["PHP", "Laravel", "MySQL"],
    score: {
      php: 8,
      laravel: 9,
      mysql: 8,
      tempoEntrega: 7,
      custo: 8,
      curvaAprendizado: 6,
      comunidade: 8,
      complexidade: 5,
    },
  },
  {
    id: "stack5",
    nome: "Go + Vue.js + PostgreSQL",
    tecnologias: ["Go", "Vue.js", "PostgreSQL"],
    score: {
      go: 9,
      vue: 8,
      postgresql: 9,
      tempoEntrega: 7,
      custo: 7,
      curvaAprendizado: 7,
      comunidade: 7,
      complexidade: 7,
    },
  },
];
