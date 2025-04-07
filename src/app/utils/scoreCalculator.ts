export type StackScore = {
  id: string;
  nome: string;
  tecnologias: string[];
  score: Record<string, number | undefined>;
};

type Respostas = {
  [key: string]: string | string[];
};

type Pesos = Record<string, number>; // complexidade, custo, etc

export function calcularMelhorStack(
  stacks: StackScore[],
  respostas: Respostas,
  pesos?: Pesos
): StackScore | null {
  let melhorStack: StackScore | null = null;
  let maiorPontuacao = -Infinity;

  stacks.forEach((stack) => {
    let pontuacao = 0;

    Object.keys(respostas).forEach((criterio) => {
      const resposta = respostas[criterio];

      const peso = pesos?.[criterio.toLowerCase()] ?? 1;

      if (Array.isArray(resposta)) {
        resposta.forEach((res) => {
          const chave = normalizarChave(res);
          pontuacao += (stack.score[chave] ?? 0) * peso;
        });
      } else {
        const chave = normalizarChave(resposta);
        pontuacao += (stack.score[chave] ?? 0) * peso;
      }
    });

    if (pontuacao > maiorPontuacao) {
      maiorPontuacao = pontuacao;
      melhorStack = stack;
    }
  });

  return melhorStack;
}

function normalizarChave(valor: string): string {
  return valor.trim().toLowerCase().replace(/[^a-z0-9]/g, ""); // remove espaços e pontuação
}
