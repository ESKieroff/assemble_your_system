"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StackScore } from "@/app/utils/scoreCalculator";
import { Badge } from "../components/ui/Badge";
import { Card, CardContent } from "../components/ui/card";

export default function RecommendationResultPage() {
  const [recommendation, setRecommendation] = useState<StackScore | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("recommendation");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id && parsed.nome) {
          setRecommendation(parsed);
        }
      } catch (err) {
        console.error("Erro ao ler recomendação:", err);
      }
    }
  }, []);

  if (!recommendation) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-xl font-semibold">Nenhuma recomendação encontrada</h2>
        <p className="text-muted-foreground">
          Preencha o questionário primeiro para obter uma recomendação.
        </p>
        <button
          onClick={() => router.push("/questionnaire")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ir para o Questionário
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Recomendação de Stack</h1>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">{recommendation.nome}</h2>
          <div className="flex flex-wrap gap-2">
            {recommendation.tecnologias.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Pontuações (debug):</p>
            <ul className="list-disc ml-6 text-sm">
              {Object.entries(recommendation.score).map(([key, value]) => (
                <li key={key}>
                  {key}: <strong>{value}</strong>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
