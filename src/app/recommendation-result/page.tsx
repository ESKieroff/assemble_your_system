"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";

interface StackResult {
  name: string;
  score: number;
}

export default function ResultadoRecomendacao() {
  const [respostas, setRespostas] = useState<string[]>([]);
  const [recomendadas, setRecomendadas] = useState<StackResult[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("recomendacao");
    if (raw) {
      const parsed = JSON.parse(raw);
      setRespostas(parsed.respostas || []);
      setRecomendadas(parsed.recomendadas || []);
    }
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Stacks Recomendadas</h1>

      <Card>
        <CardContent className="p-4">
          <p className="font-semibold">Suas respostas:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {respostas.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {recomendadas.map((stack, index) => (
          <Card key={index} className="border-l-4 border-blue-500">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{stack.name}</h2>
              <p className="text-sm text-muted-foreground">Compatibilidade: {stack.score} pontos</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
