"use client";

import { useState } from "react";
import { perguntas } from "@/data/questionnaire-data";
import { stacks } from "@/data/stack-data";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/card";
import { Slider } from "../../components/ui/Slider";
import { useRouter } from "next/navigation";
import { StackScore } from "@/app/utils/scoreCalculator";

export default function StackComparatorPage() {
  const [respostas, setRespostas] = useState<Record<string, string[]>>({});
  const [pesos, setPesos] = useState<Record<string, number>>({});
  const [selecionadas, setSelecionadas] = useState<string[]>([]);
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

  const handleSelecionarStack = (id: string) => {
    if (selecionadas.includes(id)) {
      setSelecionadas(selecionadas.filter((stackId) => stackId !== id));
    } else if (selecionadas.length < 4) {
      setSelecionadas([...selecionadas, id]);
    }
  };

  const handleSubmit = () => {
    const stacksSelecionadas: StackScore[] = stacks.filter((s) =>
      selecionadas.includes(s.id)
    );

    localStorage.setItem("comparatorResult", JSON.stringify(stacksSelecionadas));
    router.push("/questionnaire/comparator/result");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Comparador de Stacks</h1>
      <p className="text-muted-foreground text-center">
        Escolha até 4 stacks para comparar lado a lado.
      </p>

      {/* PERGUNTAS */}
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

      {/* SLIDERS DE PESO */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <p className="font-semibold text-center">Critérios de Prioridade</p>
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

      {/* LISTA DE STACKS */}
      <div>
        <p className="font-semibold text-center mb-2">Stacks disponíveis</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stacks.map((stack) => (
            <button
              key={stack.id}
              onClick={() => handleSelecionarStack(stack.id)}
              className={`border rounded-lg p-4 text-left transition hover:shadow ${
                selecionadas.includes(stack.id)
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
              disabled={
                !selecionadas.includes(stack.id) && selecionadas.length >= 4
              }
            >
              <h3 className="font-bold">{stack.nome}</h3>
              <p className="text-sm text-muted-foreground">
                {stack.tecnologias.join(", ")}
              </p>
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center mt-2">
          {selecionadas.length}/4 stacks selecionadas
        </p>
      </div>

      <div className="text-center">
        <Button onClick={handleSubmit} disabled={selecionadas.length === 0}>
          Ver Comparativo
        </Button>
      </div>
    </div>
  );
}
