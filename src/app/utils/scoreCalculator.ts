type StackScore = {
    id: string;
    nome: string;
    tecnologias: string[];
    score: Record<string, number>;
  };
  
  type Respostas = {
    [key: string]: string | string[];
  };
  
  export function calcularMelhorStack(
    stacks: StackScore[],
    respostas: Respostas
  ): StackScore | null {
    let melhorStack: StackScore | null = null;
    let maiorPontuacao = -Infinity;
  
    stacks.forEach((stack) => {
      let pontuacao = 0;
  
      Object.keys(respostas).forEach((criterio) => {
        const resposta = respostas[criterio];
  
        if (Array.isArray(resposta)) {
          resposta.forEach((res) => {
            pontuacao += stack.score[res.toLowerCase()] || 0;
          });
        } else {
          pontuacao += stack.score[resposta.toLowerCase()] || 0;
        }
      });
  
      if (pontuacao > maiorPontuacao) {
        maiorPontuacao = pontuacao;
        melhorStack = stack;
      }
    });
  
    return melhorStack;
  }
  