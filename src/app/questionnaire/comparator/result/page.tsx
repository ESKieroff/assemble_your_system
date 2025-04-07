"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StackScore } from "@/app/utils/scoreCalculator";
import { Badge } from "../../../components/ui/Badge";

export default function ComparatorResultPage() {
  const [recommendations, setRecommendations] = useState<StackScore[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("comparatorResult");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecommendations(parsed);
        }
      } catch (err) {
        console.error("Erro ao ler comparação:", err);
      }
    }
  }, []);

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-xl font-semibold">Nenhuma comparação disponível</h2>
        <p className="text-muted-foreground">
          Por favor, selecione até 4 stacks no questionário de comparação.
        </p>
        <button
          onClick={() => router.push("/questionnaire/comparator")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ir para o Comparador
        </button>
      </div>
    );
  }

  const criterios = [
    "complexidade",
    "curvaAprendizado",
    "comunidade",
    "tempoEntrega",
    "custo",
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Comparativo de Stacks</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Critério</th>
              {recommendations.map((stack) => (
                <th
                  key={stack.id}
                  className="border px-4 py-2 text-left font-semibold"
                >
                  {stack.nome}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criterios.map((criterio) => (
              <tr key={criterio}>
                <td className="border px-4 py-2 font-medium capitalize">
                  {criterio}
                </td>
                {recommendations.map((stack) => (
                  <td key={stack.id + criterio} className="border px-4 py-2">
                    {stack.score[criterio] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="border px-4 py-2 font-medium">Tecnologias</td>
              {recommendations.map((stack) => (
                <td key={stack.id + "-techs"} className="border px-4 py-2">
                  <div className="flex flex-wrap gap-1">
                    {stack.tecnologias.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
