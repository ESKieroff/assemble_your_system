"use client";

import { useState } from "react";
import { perguntas } from "../../data/questionnaire-data";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/card";
import { Slider } from "../components/ui/Slider";
import { useRouter } from "next/navigation";

export default function QuestionarioPage() {
  const [respostas, setRespostas] = useState<Record<string, string[]>>({});
  const [pesos, setPesos] = useState<Record<string, number>>({});
  const router = useRouter();

  const handleResposta = (perguntaId: string, resposta: string) => {
    setRespostas((prev) => ({
      ...prev,
      [perguntaId]: prev[perguntaId]?.includes(resposta)
        ? prev[perguntaId].filter((r) => r !== resposta)
        : [...(prev[perguntaId] || []), resposta],
    }));
  };

  const handlePeso = (criterio: string, valor: number) => {
    setPesos((prev) => ({
      ...prev,
      [criterio]: valor,
    }));
  };

  const handleSubmit = () => {
    localStorage.setItem(
      "recomendacao",
      JSON.stringify({ respostas, pesos })
    );
    router.push("/recomendacao/resultado");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Monte sua Stack Ideal</h1>
      <p className="text-muted-foreground text-center">
        Selecione as opções que mais se aplicam ao seu projeto.
      </p>

      {perguntas.map((p) => (
        <Card key={p.id}>
          <CardContent className="p-4 space-y-2">
            <p className="font-semibold">{p.pergunta}</p>
            <div className="grid grid-cols-2 gap-2">
              {p.opcoes.map((opcao) => (
                <label key={opcao} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={respostas[p.id]?.includes(opcao) || false}
                    onChange={() => handleResposta(p.id, opcao)}
                  />
                  <span>{opcao}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent className="p-4 space-y-4">
          <p className="font-semibold text-center">Critérios de prioridade</p>
          {[
            "complexidade",
            "curvaAprendizado",
            "comunidade",
            "tempoEntrega",
            "custo",
          ].map((criterio) => (
            <div key={criterio}>
              <p className="text-sm font-medium capitalize">{criterio}</p>
              <Slider
                defaultValue={[String(pesos[criterio] || 5)]}
                min={1}
                max={10}
                step={1}
                onChange={(event) => {
                  const valor = Number(event.target.value);
                  handlePeso(criterio, valor);
                }}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={handleSubmit}>Ver Recomendação</Button>
      </div>
    </div>
  );
}
