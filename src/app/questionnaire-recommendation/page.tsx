"use client";

import { useState } from "react";
import { Button } from "../components/ui/Button";
import { useRouter } from "next/navigation";
import { perguntas, stacks } from "../../data/questionnaire-data";

export default function QuestionarioRecomendacao() {
  const [respostas, setRespostas] = useState<string[]>([]);
  const [etapa, setEtapa] = useState(0);
  const router = useRouter();

  const handleSelecionar = (opcao: string) => {
    const novasRespostas = [...respostas, opcao];
    if (etapa + 1 < perguntas.length) {
      setRespostas(novasRespostas);
      setEtapa(etapa + 1);
    } else {
      // Pontuar stacks
      const pontuacoes: Record<string, number> = {};
      stacks.forEach((stack) => {
        let score = 0;
        stack.tecnologias.forEach((tecnologia) => {
          if (novasRespostas.includes(tecnologia)) score++;
        });
        pontuacoes[stack.nome] = score;
      });

      const recomendadas = Object.entries(pontuacoes)
        .sort((a, b) => b[1] - a[1])
        .map(([name, score]) => ({ name, score }));

      localStorage.setItem(
        "recommendation",
        JSON.stringify({ respostas: novasRespostas, recomendadas })
      );

      router.push("/result");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Monte seu Sistema</h1>
      <h2 className="text-lg font-medium mb-2">{perguntas[etapa].pergunta}</h2>
      <div className="space-y-2">
        {perguntas[etapa].opcoes.map((opcao: string) => (
          <Button
            key={opcao}
            variant="primary"
            className="w-full justify-start"
            onClick={() => handleSelecionar(opcao)}
          >
            {opcao}
          </Button>
        ))}
      </div>
    </div>
  );
}
