
export interface MiniGame {
  id: string;
  name: string;
  description: string;
  category: 'skill' | 'career' | 'entertainment' | 'challenge';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  duration: number; // seconds
  requiredStats?: {
    [key: string]: number;
  };
  rewards: {
    stats?: { [key: string]: number };
    money?: number;
    experience?: number;
  };
  instructions: string;
  gameType: 'reflex' | 'puzzle' | 'memory' | 'strategy' | 'timing';
}

export interface MiniGameResult {
  score: number;
  maxScore: number;
  performance: 'poor' | 'average' | 'good' | 'excellent' | 'perfect';
  timeSpent: number;
  rewards: {
    stats?: { [key: string]: number };
    money?: number;
    experience?: number;
  };
}

export interface MiniGameSession {
  gameId: string;
  startTime: number;
  endTime?: number;
  score: number;
  isActive: boolean;
  targetScore?: number;
  currentRound: number;
  totalRounds: number;
}

export class MiniGameManager {
  private static instance: MiniGameManager;
  private activeSessions: Map<string, MiniGameSession> = new Map();

  static getInstance(): MiniGameManager {
    if (!MiniGameManager.instance) {
      MiniGameManager.instance = new MiniGameManager();
    }
    return MiniGameManager.instance;
  }

  startMiniGame(gameId: string, characterId: string): MiniGameSession {
    const game = this.getMiniGameById(gameId);
    if (!game) throw new Error('Mini-game not found');

    const session: MiniGameSession = {
      gameId,
      startTime: Date.now(),
      score: 0,
      isActive: true,
      currentRound: 1,
      totalRounds: this.calculateRounds(game)
    };

    this.activeSessions.set(characterId, session);
    return session;
  }

  private calculateRounds(game: MiniGame): number {
    switch (game.difficulty) {
      case 'easy': return 3;
      case 'medium': return 5;
      case 'hard': return 7;
      case 'expert': return 10;
      default: return 5;
    }
  }

  updateScore(characterId: string, points: number): void {
    const session = this.activeSessions.get(characterId);
    if (session && session.isActive) {
      session.score += points;
    }
  }

  completeMiniGame(characterId: string): MiniGameResult | null {
    const session = this.activeSessions.get(characterId);
    if (!session) return null;

    session.endTime = Date.now();
    session.isActive = false;

    const game = this.getMiniGameById(session.gameId);
    if (!game) return null;

    const maxScore = this.calculateMaxScore(game);
    const performance = this.calculatePerformance(session.score, maxScore);
    const timeSpent = (session.endTime - session.startTime) / 1000;

    const rewards = this.calculateRewards(game, performance, timeSpent);

    this.activeSessions.delete(characterId);

    return {
      score: session.score,
      maxScore,
      performance,
      timeSpent,
      rewards
    };
  }

  private calculateMaxScore(game: MiniGame): number {
    const baseScore = 100;
    const difficultyMultiplier = {
      'easy': 1,
      'medium': 1.5,
      'hard': 2,
      'expert': 3
    };
    return baseScore * difficultyMultiplier[game.difficulty];
  }

  private calculatePerformance(score: number, maxScore: number): MiniGameResult['performance'] {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 95) return 'perfect';
    if (percentage >= 80) return 'excellent';
    if (percentage >= 60) return 'good';
    if (percentage >= 40) return 'average';
    return 'poor';
  }

  private calculateRewards(game: MiniGame, performance: MiniGameResult['performance'], timeSpent: number): MiniGameResult['rewards'] {
    const baseRewards = { ...game.rewards };
    const performanceMultiplier = {
      'poor': 0.5,
      'average': 0.75,
      'good': 1,
      'excellent': 1.25,
      'perfect': 1.5
    };

    const multiplier = performanceMultiplier[performance];
    const timeBonus = timeSpent < game.duration ? 1.1 : 1;

    const finalRewards: MiniGameResult['rewards'] = {};

    if (baseRewards.stats) {
      finalRewards.stats = {};
      Object.entries(baseRewards.stats).forEach(([stat, value]) => {
        finalRewards.stats![stat] = Math.round(value * multiplier * timeBonus);
      });
    }

    if (baseRewards.money) {
      finalRewards.money = Math.round(baseRewards.money * multiplier * timeBonus);
    }

    if (baseRewards.experience) {
      finalRewards.experience = Math.round(baseRewards.experience * multiplier * timeBonus);
    }

    return finalRewards;
  }

  getMiniGameById(id: string): MiniGame | undefined {
    return miniGames.find(game => game.id === id);
  }

  getMiniGamesByCategory(category: MiniGame['category']): MiniGame[] {
    return miniGames.filter(game => game.category === category);
  }

  getActiveSession(characterId: string): MiniGameSession | undefined {
    return this.activeSessions.get(characterId);
  }
}

export const miniGames: MiniGame[] = [
  {
    id: 'piano_practice',
    name: 'Piano Practice',
    description: 'Practice piano by hitting the right keys at the right time',
    category: 'skill',
    difficulty: 'medium',
    duration: 60,
    requiredStats: { smarts: 30 },
    rewards: {
      stats: { smarts: 5, happiness: 10 },
      experience: 20
    },
    instructions: 'Press the highlighted keys when they reach the bottom line',
    gameType: 'timing'
  },
  {
    id: 'surgery_game',
    name: 'Steady Hand Surgery',
    description: 'Perform delicate surgical procedures with precision',
    category: 'career',
    difficulty: 'hard',
    duration: 90,
    requiredStats: { smarts: 70, health: 60 },
    rewards: {
      stats: { smarts: 10, health: 5 },
      money: 500,
      experience: 50
    },
    instructions: 'Use steady movements to complete the surgical procedure',
    gameType: 'reflex'
  },
  {
    id: 'math_puzzle',
    name: 'Mathematical Reasoning',
    description: 'Solve complex mathematical problems quickly',
    category: 'skill',
    difficulty: 'medium',
    duration: 45,
    requiredStats: { smarts: 40 },
    rewards: {
      stats: { smarts: 8 },
      experience: 25
    },
    instructions: 'Solve the mathematical equations as quickly and accurately as possible',
    gameType: 'puzzle'
  },
  {
    id: 'memory_challenge',
    name: 'Memory Palace',
    description: 'Test and improve your memory with sequence challenges',
    category: 'skill',
    difficulty: 'easy',
    duration: 30,
    rewards: {
      stats: { smarts: 6, happiness: 5 },
      experience: 15
    },
    instructions: 'Remember and repeat the sequence of colors/numbers shown',
    gameType: 'memory'
  },
  {
    id: 'athletic_training',
    name: 'Athletic Training',
    description: 'Complete physical challenges to improve fitness',
    category: 'skill',
    difficulty: 'medium',
    duration: 75,
    requiredStats: { health: 50 },
    rewards: {
      stats: { health: 12, happiness: 8 },
      experience: 30
    },
    instructions: 'Complete the physical challenges within the time limit',
    gameType: 'reflex'
  },
  {
    id: 'cooking_challenge',
    name: 'Master Chef Challenge',
    description: 'Create delicious dishes by following recipes perfectly',
    category: 'career',
    difficulty: 'medium',
    duration: 60,
    rewards: {
      stats: { happiness: 15, smarts: 3 },
      money: 100,
      experience: 20
    },
    instructions: 'Follow the recipe steps in the correct order and timing',
    gameType: 'strategy'
  },
  {
    id: 'stock_trading',
    name: 'Stock Market Simulator',
    description: 'Make smart investment decisions in a simulated market',
    category: 'career',
    difficulty: 'hard',
    duration: 120,
    requiredStats: { smarts: 60 },
    rewards: {
      stats: { smarts: 8 },
      money: 1000,
      experience: 40
    },
    instructions: 'Buy and sell stocks at the right time to maximize profit',
    gameType: 'strategy'
  },
  {
    id: 'social_networking',
    name: 'Social Butterfly',
    description: 'Navigate social situations and build relationships',
    category: 'skill',
    difficulty: 'easy',
    duration: 40,
    rewards: {
      stats: { relationships: 10, happiness: 12 },
      experience: 18
    },
    instructions: 'Choose the right responses in social conversations',
    gameType: 'strategy'
  }
];

export const miniGameManager = MiniGameManager.getInstance();
