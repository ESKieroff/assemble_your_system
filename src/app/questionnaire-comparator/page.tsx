"use client";

import { useState } from "react";
import { perguntas } from "../../data/questionnaire-data";
import { useComparisonStore } from "../../store/comparisonStore";
import { Button } from "../components/ui/Button";

export default function QuestionnaireComparatorPage() {
  const [respostas, setRespostas] = useState<{ [key: string]: string | string[] }>({});
  const { setFilters } = useComparisonStore();

  const handleChange = (id: string, value: string | string[]) => {
    setRespostas((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    setFilters(respostas);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Configurar Comparação de Stacks</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-6"
      >
        {perguntas.map((pergunta) => (
          <div key={pergunta.id} className="space-y-2">
            <label className="block font-medium">{pergunta.pergunta}</label>
            {pergunta.multiplas ? (
              <div className="grid grid-cols-2 gap-2">
                {pergunta.opcoes.map((opcao) => (
                  <label key={opcao} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={opcao}
                      checked={respostas[pergunta.id]?.includes(opcao) || false}
                      onChange={(e) => {
                        const selecionadas = respostas[pergunta.id] || [];
                        if (e.target.checked) {
                          handleChange(pergunta.id, [...selecionadas, opcao]);
                        } else {
                          handleChange(
                            pergunta.id,
                            Array.isArray(selecionadas) ? selecionadas.filter((o: string) => o !== opcao) : []
                          );
                        }
                      }}
                    />
                    <span>{opcao}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {pergunta.opcoes.map((opcao) => (
                  <label key={opcao} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={pergunta.id}
                      value={opcao}
                      checked={respostas[pergunta.id] === opcao}
                      onChange={() => handleChange(pergunta.id, opcao)}
                    />
                    <span>{opcao}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="pt-4">
          <Button type="submit" className="w-full">
            Aplicar Filtros para Comparação
          </Button>
        </div>
      </form>
    </div>
  );
}
