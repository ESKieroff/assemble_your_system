export type StackScore = {
  id: string;
  nome: string;
  tecnologias: string[];
  score: Record<string, number | undefined>;
  totalScore?: number;
};

type Respostas = {
  [key: string]: string | string[];
};

type Pesos = {
  [key: string]: number;
};

type StackComPontuacao = StackScore & {
  pontuacaoTotal: number;
};

export function calcularPontuacoes(
  stacks: StackScore[],
  respostas: Respostas,
  pesos: Pesos = {}
): StackComPontuacao[] {
  return stacks.map((stack) => {
    let pontuacaoTotal = 0;

    Object.entries(respostas).forEach(([criterio, resposta]) => {
      const peso = pesos[criterio] ?? 1;

      if (Array.isArray(resposta)) {
        resposta.forEach((res) => {
          const key = res.toLowerCase();
          pontuacaoTotal += (stack.score[key] || 0) * peso;
        });
      } else {
        const key = resposta.toLowerCase();
        pontuacaoTotal += (stack.score[key] || 0) * peso;
      }
    });

    Object.entries(pesos).forEach(([criterio, peso]) => {
      if (!respostas[criterio]) {
        pontuacaoTotal += (stack.score[criterio] || 0) * peso;
      }
    });

    return { ...stack, pontuacaoTotal, totalScore: pontuacaoTotal };
  });
}

export function calcularMelhorStack(
  stacks: StackScore[],
  respostas: Respostas,
  pesos: Pesos = {}
): StackComPontuacao | null {
  const resultados = calcularPontuacoes(stacks, respostas, pesos);
  return resultados.sort((a, b) => b.pontuacaoTotal - a.pontuacaoTotal)[0] || null;
}
