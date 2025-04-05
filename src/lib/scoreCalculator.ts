type Weight = {
    performance: number;
    cost: number;
    learningCurve: number;
    communitySupport: number;
    flexibility: number;
  };
  
  type Stack = {
    name: string;
    features: Weight;
  };
  
  type Preferences = {
    performance?: number;
    cost?: number;
    learningCurve?: number;
    communitySupport?: number;
    flexibility?: number;
  };
  
  export function calculateStackScore(stack: Stack, prefs: Preferences): number {
    const { features } = stack;
    const {
      performance = 1,
      cost = 1,
      learningCurve = 1,
      communitySupport = 1,
      flexibility = 1,
    } = prefs;
  
    return (
      features.performance * performance +
      features.cost * cost +
      features.learningCurve * learningCurve +
      features.communitySupport * communitySupport +
      features.flexibility * flexibility
    );
  }
  
  export function rankStacks(
    stacks: Stack[],
    prefs: Preferences
  ): { stack: Stack; score: number }[] {
    return stacks
      .map((stack) => ({
        stack,
        score: calculateStackScore(stack, prefs),
      }))
      .sort((a, b) => b.score - a.score);
  }
  