"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StackScore, calcularPontuacoes } from "@/app/utils/scoreCalculator";
import { stacks } from "@/data/stack-data";
import { Badge } from "../../../components/ui/Badge";
import { Card, CardContent } from "../../../components/ui/card";

export default function ComparatorResultPage() {
  const [comparacao, setComparacao] = useState<StackScore[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("comparatorSelections");
    const storedPesos = localStorage.getItem("comparatorWeights");

    if (stored && storedPesos) {
      try {
        const selectedIds: string[] = JSON.parse(stored);
        const pesos: Record<string, number> = JSON.parse(storedPesos);


        const resultados = calcularPontuacoes(
          stacks.filter((s) => selectedIds.includes(s.id)),
          {},
          pesos
        );

        setComparacao(resultados);
      } catch (err) {
        console.error("Erro ao processar comparação:", err);
      }
    }
  }, []);

  if (comparacao.length === 0) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center space-y-4">
        <h2 className="text-xl font-semibold">Nenhuma comparação encontrada</h2>
        <p className="text-muted-foreground">
          Selecione as stacks no comparador antes de visualizar.
        </p>
        <button
          onClick={() => router.push("/questionnaire/comparator")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Voltar ao Comparador
        </button>
      </div>
    );
  }

  const criterios = [
    "tempoEntrega",
    "custo",
    "curvaAprendizado",
    "comunidade",
    "complexidade",
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-center">Comparação de Stacks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {comparacao.map((stack) => (
          <Card key={stack.id}>
            <CardContent className="p-4 space-y-3">
              <h2 className="text-lg font-semibold text-center">{stack.nome}</h2>

              <div className="flex flex-wrap gap-2 justify-center">
                {stack.tecnologias.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>

              <div className="mt-2">
                <p className="font-semibold text-sm text-muted-foreground text-center">Critérios:</p>
                <ul className="text-sm space-y-1 mt-1">
                  {criterios.map((crit) => (
                    <li key={crit} className="flex justify-between">
                      <span className="capitalize">{crit}</span>
                      <span className="font-medium">
                        {stack.score[crit] ?? "-"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm font-semibold">Pontuação Total:</p>
                <p className="text-xl font-bold">{stack.totalScore}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
