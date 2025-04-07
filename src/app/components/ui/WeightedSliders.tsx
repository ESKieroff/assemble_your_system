"use client";

import { useEffect } from "react";

type WeightedSlidersProps = {
  pesos: Record<string, number>;
  setPesos: (pesos: Record<string, number>) => void;
};

// Lista de critérios usados para pontuação
const criterios = [
  "complexidade",
  "curvaAprendizado",
  "comunidade",
  "tempoEntrega",
  "custo",
];

export default function WeightedSliders({ pesos, setPesos }: WeightedSlidersProps) {
  // Inicializa pesos iguais se ainda não estiverem definidos
  useEffect(() => {
    if (Object.keys(pesos).length === 0) {
      const pesoInicial = Math.floor(100 / criterios.length);
      const resto = 100 % criterios.length;
      const inicial: Record<string, number> = {};
      criterios.forEach((crit, i) => {
        inicial[crit] = pesoInicial + (i === 0 ? resto : 0); // soma o resto no primeiro
      });
      setPesos(inicial);
    }
  }, [pesos, setPesos]);

  const total = criterios.reduce((sum, crit) => sum + (pesos[crit] || 0), 0);

  const handleChange = (criterio: string, novoValor: number) => {
    const outros = criterios.filter((c) => c !== criterio);
    const restante = 100 - novoValor;
    const somaOutros = outros.reduce((sum, c) => sum + (pesos[c] || 0), 0);

    const novosPesos: Record<string, number> = {
      ...pesos,
      [criterio]: novoValor,
    };

    outros.forEach((c) => {
      const proporcao = somaOutros === 0 ? 1 / outros.length : (pesos[c] || 0) / somaOutros;
      novosPesos[c] = Math.round(restante * proporcao);
    });

    // Ajuste final para garantir que a soma seja exatamente 100
    const ajuste = 100 - Object.values(novosPesos).reduce((a, b) => a + b, 0);
    const primeiraChave = criterios[0];
    novosPesos[primeiraChave] += ajuste;

    setPesos(novosPesos);
  };

  return (
    <div className="space-y-4">
      {criterios.map((criterio) => (
        <div key={criterio}>
          <label className="block mb-1 capitalize font-medium">
            {criterio} ({pesos[criterio] || 0}%)
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={pesos[criterio] || 0}
            onChange={(e) => handleChange(criterio, Number(e.target.value))}
            className="w-full"
          />
        </div>
      ))}
      <p className="text-sm text-muted-foreground text-center">
        Total: {total}%
      </p>
    </div>
  );
}
