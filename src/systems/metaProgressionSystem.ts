import { Character } from '../types/character';
import { Achievement, LifeKarma, Legacy, ChallengeMode, MetaProgressionState, KarmaEvent, StartingBonus } from '../types/metaProgression';

export class MetaProgressionSystem {
  private static instance: MetaProgressionSystem;
  
  static getInstance(): MetaProgressionSystem {
    if (!MetaProgressionSystem.instance) {
      MetaProgressionSystem.instance = new MetaProgressionSystem();
    }
    return MetaProgressionSystem.instance;
  }

  private achievements: Achievement[] = [
    {
      id: 'first_steps',
      name: 'First Steps',
      description: 'Take your first steps in life',
      emoji: '👶',
      category: 'life',
      tier: 'bronze',
      requirements: [{ type: 'age', value: 1 }],
      rewards: [{ type: 'karma', value: 5, description: 'Beginning of a journey' }],
      hidden: false,
      unlocked: false
    },
    {
      id: 'centenarian',
      name: 'Centenarian',
      description: 'Live to be 100 years old',
      emoji: '🎂',
      category: 'life',
      tier: 'legendary',
      requirements: [{ type: 'age', value: 100, operator: '>=' }],
      rewards: [
        { type: 'karma', value: 100, description: 'Incredible longevity' },
        { type: 'unlock', value: 'longevity_gene', description: 'Unlock longevity genes for future generations' }
      ],
      hidden: false,
      unlocked: false
    },
    {
      id: 'millionaire',
      name: 'Millionaire',
      description: 'Accumulate $1,000,000',
      emoji: '💰',
      category: 'wealth',
      tier: 'gold',
      requirements: [{ type: 'wealth', value: 1000, operator: '>=' }],
      rewards: [
        { type: 'karma', value: 25, description: 'Financial success' },
        { type: 'starting_advantage', value: 'wealthy_family', description: 'Start with wealthy family background' }
      ],
      hidden: false,
      unlocked: false
    },
    {
      id: 'genius',
      name: 'Genius',
      description: 'Reach 100 intelligence',
      emoji: '🧠',
      category: 'education',
      tier: 'gold',
      requirements: [{ type: 'stat', target: 'smarts', value: 100, operator: '>=' }],
      rewards: [
        { type: 'karma', value: 30, description: 'Intellectual achievement' },
        { type: 'bonus_stat', value: 'smarts+10', description: 'Start with +10 intelligence' }
      ],
      hidden: false,
      unlocked: false
    },
    {
      id: 'social_butterfly',
      name: 'Social Butterfly',
      description: 'Maintain 10+ close relationships',
      emoji: '🦋',
      category: 'relationship',
      tier: 'silver',
      requirements: [{ type: 'relationship', value: 10, operator: '>=' }],
      rewards: [
        { type: 'karma', value: 20, description: 'Strong social connections' },
        { type: 'bonus_stat', value: 'relationships+5', description: 'Start with +5 relationship skills' }
      ],
      hidden: false,
      unlocked: false
    }
  ];

  private challengeModes: ChallengeMode[] = [
    {
      id: 'rags_to_riches',
      name: 'Rags to Riches',
      description: 'Start with minimal wealth and become a millionaire',
      emoji: '💎',
      difficulty: 'hard',
      modifiers: [
        { type: 'starting_condition', target: 'wealth', value: 10, description: 'Start with only $10k' },
        { type: 'stat_multiplier', target: 'wealth_gain', value: 0.5, description: '50% slower wealth gain' }
      ],
      goals: [
        { id: 'reach_million', description: 'Reach $1,000,000', requirement: { type: 'wealth', value: 1000, operator: '>=' }, completed: false }
      ],
      rewards: [
        { type: 'karma', value: 50, description: 'Overcame adversity' },
        { type: 'unlock', value: 'entrepreneur_genes', description: 'Unlock entrepreneurial traits' }
      ],
      unlocked: true
    },
    {
      id: 'social_hermit',
      name: 'Lone Wolf',
      description: 'Live a successful life with minimal social connections',
      emoji: '🐺',
      difficulty: 'hard',
      modifiers: [
        { type: 'restriction', target: 'max_relationships', value: 3, description: 'Maximum 3 relationships' },
        { type: 'stat_multiplier', target: 'happiness_from_relationships', value: 0.3, description: 'Less happiness from relationships' }
      ],
      goals: [
        { id: 'reach_success', description: 'Reach 80+ in all stats except relationships', requirement: { type: 'stat', value: 80, operator: '>=' }, completed: false }
      ],
      rewards: [
        { type: 'karma', value: 40, description: 'Self-reliance mastery' },
        { type: 'unlock', value: 'independent_spirit', description: 'Unlock independent personality trait' }
      ],
      unlocked: false
    },
    {
      id: 'perfect_life',
      name: 'Perfect Life',
      description: 'Achieve 90+ in all stats by age 50',
      emoji: '🌟',
      difficulty: 'nightmare',
      modifiers: [
        { type: 'event_probability', target: 'negative_events', value: 1.5, description: '50% more negative events' }
      ],
      goals: [
        { id: 'all_stats_90', description: 'All stats above 90 by age 50', requirement: { type: 'stat', value: 90, operator: '>=' }, completed: false }
      ],
      rewards: [
        { type: 'karma', value: 100, description: 'Life mastery achieved' },
        { type: 'unlock', value: 'perfect_genes', description: 'Unlock perfect genetic traits' }
      ],
      unlocked: false
    }
  ];

  initializeMetaProgression(): MetaProgressionState {
    return {
      achievements: this.achievements.map(a => ({ ...a })),
      lifeKarma: {
        totalKarma: 0,
        karmaByCategory: {
          kindness: 0,
          wisdom: 0,
          success: 0,
          relationships: 0,
          creativity: 0,
          resilience: 0
        },
        karmaHistory: []
      },
      legacy: {
        generation: 1,
        totalKarma: 0,
        unlockedFeatures: [],
        familyAchievements: [],
        startingBonuses: [],
        familyReputation: 50,
        inheritedTraits: {}
      },
      challengeModes: this.challengeModes.map(c => ({ ...c })),
      totalLifetimePlays: 0,
      bestStats: {
        health: 0,
        happiness: 0,
        smarts: 0,
        looks: 0,
        wealth: 0,
        relationships: 0,
        fame: 0
      }
    };
  }

  checkAchievements(character: Character, metaState: MetaProgressionState): Achievement[] {
    const newlyUnlocked: Achievement[] = [];

    metaState.achievements.forEach(achievement => {
      if (achievement.unlocked) return;

      const meetsRequirements = achievement.requirements.every(req => {
        switch (req.type) {
          case 'stat':
            const statValue = (character as any)[req.target!] || 0;
            return this.compareValues(statValue, req.operator || '>=', req.value as number);
          case 'age':
            return this.compareValues(character.age, req.operator || '>=', req.value as number);
          case 'wealth':
            return this.compareValues(character.wealth, req.operator || '>=', req.value as number);
          case 'relationship':
            const relationshipCount = character.familyMembers?.length || 0;
            return this.compareValues(relationshipCount, req.operator || '>=', req.value as number);
          default:
            return false;
        }
      });

      if (meetsRequirements) {
        achievement.unlocked = true;
        achievement.dateUnlocked = new Date().toISOString();
        newlyUnlocked.push(achievement);
        
        // Apply rewards
        achievement.rewards.forEach(reward => {
          this.applyAchievementReward(reward, metaState, character);
        });
      }
    });

    return newlyUnlocked;
  }

  addKarma(character: Character, metaState: MetaProgressionState, category: keyof LifeKarma['karmaByCategory'], amount: number, description: string): void {
    const karmaEvent: KarmaEvent = {
      id: `karma_${Date.now()}`,
      description,
      category,
      amount,
      age: character.age,
      timestamp: new Date().toISOString()
    };

    metaState.lifeKarma.karmaByCategory[category] += amount;
    metaState.lifeKarma.totalKarma += amount;
    metaState.lifeKarma.karmaHistory.push(karmaEvent);

    // Keep only last 100 karma events
    if (metaState.lifeKarma.karmaHistory.length > 100) {
      metaState.lifeKarma.karmaHistory = metaState.lifeKarma.karmaHistory.slice(-100);
    }
  }

  calculateLegacyBonuses(metaState: MetaProgressionState): StartingBonus[] {
    const bonuses: StartingBonus[] = [];

    // Karma-based bonuses
    if (metaState.legacy.totalKarma >= 100) {
      bonuses.push({
        id: 'karma_boost',
        name: 'Karmic Blessing',
        description: 'Start with +5 to all stats',
        effects: { health: 5, happiness: 5, smarts: 5, looks: 5, wealth: 5, relationships: 5 },
        unlockRequirement: 'Accumulate 100 total karma'
      });
    }

    // Generation bonuses
    if (metaState.legacy.generation >= 3) {
      bonuses.push({
        id: 'family_legacy',
        name: 'Family Legacy',
        description: 'Start with wealthy family background',
        effects: { wealth: 20, relationships: 10 },
        unlockRequirement: 'Reach 3rd generation'
      });
    }

    return bonuses;
  }

  private compareValues(actual: number, operator: string, expected: number): boolean {
    switch (operator) {
      case '>': return actual > expected;
      case '<': return actual < expected;
      case '=': return actual === expected;
      case '>=': return actual >= expected;
      case '<=': return actual <= expected;
      default: return false;
    }
  }

  private applyAchievementReward(reward: any, metaState: MetaProgressionState, character: Character): void {
    switch (reward.type) {
      case 'karma':
        metaState.lifeKarma.totalKarma += reward.value;
        break;
      case 'unlock':
        if (!metaState.legacy.unlockedFeatures.includes(reward.value)) {
          metaState.legacy.unlockedFeatures.push(reward.value);
        }
        break;
      case 'starting_advantage':
        const bonus: StartingBonus = {
          id: reward.value,
          name: reward.value.replace('_', ' '),
          description: reward.description,
          effects: {},
          unlockRequirement: 'Achievement unlocked'
        };
        metaState.legacy.startingBonuses.push(bonus);
        break;
    }
  }

  unlockChallengeMode(metaState: MetaProgressionState, challengeId: string): boolean {
    const challenge = metaState.challengeModes.find(c => c.id === challengeId);
    if (challenge && !challenge.unlocked) {
      challenge.unlocked = true;
      return true;
    }
    return false;
  }

  applyChallengeModifiers(character: Character, challengeMode: ChallengeMode): Character {
    const modifiedCharacter = { ...character };

    challengeMode.modifiers.forEach(modifier => {
      switch (modifier.type) {
        case 'starting_condition':
          if (modifier.target === 'wealth') {
            modifiedCharacter.wealth = modifier.value as number;
          }
          break;
        case 'stat_multiplier':
          // These would be applied during gameplay, not at character creation
          break;
      }
    });

    return modifiedCharacter;
  }
}

export const metaProgressionSystem = MetaProgressionSystem.getInstance();
