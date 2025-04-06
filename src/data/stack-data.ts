import { StackScore } from "@/app/utils/scoreCalculator";

export const stacks: StackScore[] = [
  {
    id: "stack1",
    nome: "Node.js + React + MongoDB",
    tecnologias: ["Node.js", "Express", "React", "MongoDB"],
    score: {
      nodejs: 9,
      react: 9,
      mongodb: 8,
      tempoentrega: 9,
      custo: 8,
      curvaaprendizado: 7,
      comunidade: 10,
      complexidade: 6,
    },
  },
  {
    id: "stack2",
    nome: "Java + Spring Boot + MySQL",
    tecnologias: ["Java", "Spring Boot", "JPA", "MySQL"],
    score: {
      java: 8,
      springboot: 8,
      mysql: 8,
      tempoentrega: 6,
      custo: 6,
      curvaaprendizado: 5,
      comunidade: 9,
      complexidade: 7,
    },
  },
  {
    id: "stack3",
    nome: "Python + Django + PostgreSQL",
    tecnologias: ["Python", "Django", "SQLAlchemy", "PostgreSQL"],
    score: {
      python: 9,
      django: 9,
      postgresql: 8,
      tempoentrega: 8,
      custo: 7,
      curvaaprendizado: 6,
      comunidade: 8,
      complexidade: 5,
    },
  },
  {
    id: "stack4",
    nome: "PHP + Laravel + MySQL",
    tecnologias: ["PHP", "Laravel", "Eloquent", "MySQL"],
    score: {
      php: 7,
      laravel: 8,
      mysql: 8,
      tempoentrega: 7,
      custo: 7,
      curvaaprendizado: 6,
      comunidade: 7,
      complexidade: 5,
    },
  },
];
