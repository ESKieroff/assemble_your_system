"use client";

import { useSystemStore } from "../store/useSystemStore";

export default function RecommendationResult() {
  const recommendation = useSystemStore((state) => state.recommendation);

  if (!recommendation) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Nenhuma recomendação disponível. Preencha o questionário primeiro.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Stack Recomendada</h2>
      <p className="mb-4">
        <strong>{recommendation.nome}</strong>
      </p>

      <h3 className="text-xl font-semibold mb-2">Tecnologias</h3>
      <ul className="list-disc list-inside mb-4">
        {recommendation.tecnologias.map((tec) => (
          <li key={tec}>{tec}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Pontuação</h3>
      <ul className="list-disc list-inside">
        {Object.entries(recommendation.score).map(([criterio, valor]) => (
          <li key={criterio}>
            {criterio}: {valor}
          </li>
        ))}
      </ul>
    </div>
  );
}
