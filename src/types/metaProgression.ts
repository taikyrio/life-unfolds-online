
export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'life' | 'career' | 'relationship' | 'wealth' | 'education' | 'special';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'legendary';
  requirements: AchievementRequirement[];
  rewards: AchievementReward[];
  hidden: boolean;
  unlocked: boolean;
  dateUnlocked?: string;
}

export interface AchievementRequirement {
  type: 'stat' | 'age' | 'event' | 'career' | 'wealth' | 'relationship' | 'education';
  target?: string;
  value: number | string;
  operator?: '>' | '<' | '=' | '>=' | '<=';
}

export interface AchievementReward {
  type: 'karma' | 'unlock' | 'bonus_stat' | 'starting_advantage';
  value: number | string;
  description: string;
}

export interface LifeKarma {
  totalKarma: number;
  karmaByCategory: {
    kindness: number;
    wisdom: number;
    success: number;
    relationships: number;
    creativity: number;
    resilience: number;
  };
  karmaHistory: KarmaEvent[];
}

export interface KarmaEvent {
  id: string;
  description: string;
  category: keyof LifeKarma['karmaByCategory'];
  amount: number;
  age: number;
  timestamp: string;
}

export interface Legacy {
  generation: number;
  totalKarma: number;
  unlockedFeatures: string[];
  familyAchievements: string[];
  startingBonuses: StartingBonus[];
  familyReputation: number;
  inheritedTraits: Record<string, number>;
}

export interface StartingBonus {
  id: string;
  name: string;
  description: string;
  effects: Record<string, number>;
  unlockRequirement: string;
}

export interface ChallengeMode {
  id: string;
  name: string;
  description: string;
  emoji: string;
  difficulty: 'easy' | 'normal' | 'hard' | 'extreme' | 'nightmare';
  modifiers: ChallengeModifier[];
  goals: ChallengeGoal[];
  rewards: AchievementReward[];
  unlocked: boolean;
}

export interface ChallengeModifier {
  type: 'stat_multiplier' | 'event_probability' | 'starting_condition' | 'restriction';
  target: string;
  value: number | string;
  description: string;
}

export interface ChallengeGoal {
  id: string;
  description: string;
  requirement: AchievementRequirement;
  completed: boolean;
}

export interface MetaProgressionState {
  achievements: Achievement[];
  lifeKarma: LifeKarma;
  legacy: Legacy;
  challengeModes: ChallengeMode[];
  currentChallengeMode?: string;
  totalLifetimePlays: number;
  bestStats: Record<string, number>;
}
