"use client";

import { useState } from "react";
import { perguntas } from "../../data/questionnaire-data";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/card";
import { Slider } from "../components/ui/Slider";
import { useRouter } from "next/navigation";

export default function QuestionnairePage() {
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [pesos, setPesos] = useState<Record<string, number>>({});
  const [etapaAtual, setEtapaAtual] = useState(0);
  const router = useRouter();

  const etapaFinal = perguntas.length;

  const handleResposta = (perguntaId: string, resposta: string) => {
    setRespostas((prev) => ({
      ...prev,
      [perguntaId]: resposta,
    }));
  };

  const handlePeso = (criterio: string, valor: number) => {
    setPesos((prev) => ({
      ...prev,
      [criterio]: valor,
    }));
  };

  const handleAvancar = () => {
    if (etapaAtual < etapaFinal) {
      setEtapaAtual((prev) => prev + 1);
    }
  };

  const handleVoltar = () => {
    if (etapaAtual > 0) {
      setEtapaAtual((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem(
      "recommendation",
      JSON.stringify({ respostas, pesos })
    );
    router.push("/questionnaire/recommendation");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Monte sua Stack Ideal</h1>
      <p className="text-muted-foreground text-center">
        Etapa {etapaAtual + 1} de {etapaFinal + 1}
      </p>

      {etapaAtual < etapaFinal ? (
        <Card>
          <CardContent className="p-4 space-y-4">
            <p className="font-semibold">{perguntas[etapaAtual].pergunta}</p>
            <div className="flex flex-wrap gap-2">
              {perguntas[etapaAtual].opcoes.map((opcao) => (
                <Button
                  key={opcao}
                  variant={respostas[perguntas[etapaAtual].id] === opcao ? "primary" : "ghost"}
                  onClick={() => handleResposta(perguntas[etapaAtual].id, opcao)}
                >
                  {opcao}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4 space-y-4">
            <p className="font-semibold text-center">Critérios de prioridade</p>
            {["complexidade", "curvaAprendizado", "comunidade", "tempoEntrega", "custo"].map(
              (criterio) => (
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
              )
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        {etapaAtual > 0 && <Button onClick={handleVoltar}>Voltar</Button>}
        {etapaAtual < etapaFinal ? (
          <Button onClick={handleAvancar}>Avançar</Button>
        ) : (
          <Button onClick={handleSubmit}>Ver Recomendação</Button>
        )}
      </div>
    </div>
  );
}
