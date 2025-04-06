"use client";

import { useSystemStore } from "../store/useSystemStore";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/Badge";

export default function QuestionnaireResultPage() {
  const recommendation = useSystemStore((state) => state.recommendation);

  if (!recommendation) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Nenhuma recomendação encontrada</h2>
        <p className="text-muted-foreground">
          Responda o questionário para receber uma recomendação personalizada de stack.
        </p>
      </div>
    );
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Resultado da Recomendação</h1>

      <Card className="shadow-md rounded-xl p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            {recommendation.nome}
          </h2>

          <p className="mb-4 text-muted-foreground">
            Tecnologias sugeridas para seu projeto:
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {recommendation.tecnologias.map((tech: string) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            <p>
              <strong>Recomendada para:</strong>{" "}
              {getStackFitDescription(recommendation.score)}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

function getStackFitDescription(score: Record<string, number>) {
  const keys = Object.entries(score)
    .filter(([, value]) => value >= 4)
    .map(([key]) => mapKeyToLabel(key));

  return keys.length ? keys.join(", ") : "Casos gerais.";
}

function mapKeyToLabel(key: string) {
  const labels: Record<string, string> = {
    web: "Web",
    mobile: "Mobile",
    desktop: "Desktop",
    realtime: "Tempo Real",
    persistence: "Persistência de Dados",
    ai: "IA / Machine Learning",
    experience: "Equipes Experientes",
  };

  return labels[key] || key;
}
