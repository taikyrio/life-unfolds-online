
export interface StatBalancingRules {
  correlations: Record<string, { positive: string[]; negative: string[] }>;
  caps: Record<string, { min: number; max: number }>;
  dependencies: Record<string, string[]>;
}

export const statBalancingRules: StatBalancingRules = {
  correlations: {
    health: {
      positive: ['happiness', 'looks'],
      negative: []
    },
    happiness: {
      positive: ['relationships', 'wealth'],
      negative: ['notoriety']
    },
    smarts: {
      positive: ['wealth'],
      negative: []
    },
    looks: {
      positive: ['relationships', 'fame'],
      negative: []
    },
    wealth: {
      positive: ['happiness'],
      negative: []
    },
    relationships: {
      positive: ['happiness'],
      negative: ['notoriety']
    }
  },
  caps: {
    health: { min: 0, max: 100 },
    happiness: { min: 0, max: 100 },
    smarts: { min: 0, max: 100 },
    looks: { min: 0, max: 100 },
    wealth: { min: 0, max: 100 },
    relationships: { min: 0, max: 100 },
    fame: { min: 0, max: 100 },
    notoriety: { min: 0, max: 100 }
  },
  dependencies: {
    wealth: ['smarts', 'relationships'],
    fame: ['looks', 'relationships'],
    happiness: ['health', 'relationships']
  }
};

export const applyStatBalancing = (character: any): any => {
  const balanced = { ...character };
  
  // Apply correlations (subtle influences)
  Object.entries(statBalancingRules.correlations).forEach(([stat, correlations]) => {
    const currentValue = balanced[stat] || 0;
    
    correlations.positive.forEach(positiveStat => {
      const positiveValue = balanced[positiveStat] || 0;
      if (positiveValue > 80 && currentValue < 80) {
        balanced[stat] = Math.min(100, currentValue + 1);
      }
    });
    
    correlations.negative.forEach(negativeStat => {
      const negativeValue = balanced[negativeStat] || 0;
      if (negativeValue > 80 && currentValue > 20) {
        balanced[stat] = Math.max(0, currentValue - 1);
      }
    });
  });
  
  // Apply caps
  Object.entries(statBalancingRules.caps).forEach(([stat, caps]) => {
    if (balanced[stat] !== undefined) {
      balanced[stat] = Math.max(caps.min, Math.min(caps.max, balanced[stat]));
    }
  });
  
  return balanced;
};

export const getStatRecommendations = (character: any): string[] => {
  const recommendations: string[] = [];
  
  // Check for dangerous stat combinations
  if (character.health < 30 && character.happiness < 30) {
    recommendations.push("Your low health and happiness are creating a dangerous spiral. Focus on self-care.");
  }
  
  if (character.smarts < 30 && character.wealth < 30 && character.age > 25) {
    recommendations.push("Consider investing in education to improve your career prospects.");
  }
  
  if (character.relationships < 30 && character.happiness < 50) {
    recommendations.push("Building stronger relationships could significantly improve your happiness.");
  }
  
  if (character.notoriety > 70) {
    recommendations.push("Your high notoriety is affecting your relationships and happiness. Consider changing your ways.");
  }
  
  return recommendations;
};
