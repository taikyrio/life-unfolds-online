import { Character } from '../types/character';
import { ConsequenceChain, ConsequenceTracker, ReputationSystem, RelationshipMemory, PendingConsequence } from '../types/consequences';

export class ConsequenceSystem {
  private static instance: ConsequenceSystem;

  static getInstance(): ConsequenceSystem {
    if (!ConsequenceSystem.instance) {
      ConsequenceSystem.instance = new ConsequenceSystem();
    }
    return ConsequenceSystem.instance;
  }

  private consequenceChains: ConsequenceChain[] = [
    {
      id: 'academic_success_chain',
      triggerEventId: 'good_grades',
      conditions: [
        { type: 'stat', target: 'smarts', operator: '>', value: 80 }
      ],
      effects: [
        { type: 'reputation_change', target: 'academic', value: 10, description: 'Your academic reputation improved' }
      ],
      delay: 1,
      probability: 0.7,
      severity: 'minor'
    },
    {
      id: 'family_betrayal_chain',
      triggerEventId: 'family_conflict',
      conditions: [
        { type: 'relationship', target: 'family', operator: '<', value: 30 }
      ],
      effects: [
        { type: 'event_trigger', target: 'family_estrangement', value: 1, description: 'Your family relationships deteriorated further' }
      ],
      delay: 2,
      probability: 0.4,
      severity: 'major'
    },
    {
      id: 'reputation_spiral',
      triggerEventId: 'public_embarrassment',
      conditions: [
        { type: 'reputation', target: 'social', operator: '<', value: 40 }
      ],
      effects: [
        { type: 'reputation_change', target: 'professional', value: -15, description: 'Your professional reputation suffered' }
      ],
      delay: 1,
      probability: 0.6,
      severity: 'moderate'
    }
  ];

  initializeConsequenceTracker(): ConsequenceTracker {
    return {
      pendingChains: [],
      reputationHistory: [],
      memoryBank: {}
    };
  }

  initializeReputationSystem(): ReputationSystem {
    return {
      academic: 50,
      professional: 50,
      social: 50,
      family: 60,
      romantic: 50,
      criminal: 0,
      community: 50,
      online: 50
    };
  }

  addRelationshipMemory(
    tracker: ConsequenceTracker,
    relationshipId: string,
    eventId: string,
    description: string,
    impact: number,
    tags: string[] = []
  ): void {
    if (!tracker.memoryBank[relationshipId]) {
      tracker.memoryBank[relationshipId] = [];
    }

    const memory: RelationshipMemory = {
      eventId,
      description,
      impact,
      timestamp: new Date().toISOString(),
      tags,
      fadeRate: Math.abs(impact) / 100 // stronger memories fade slower
    };

    tracker.memoryBank[relationshipId].push(memory);

    // Keep only the last 20 memories per relationship
    if (tracker.memoryBank[relationshipId].length > 20) {
      tracker.memoryBank[relationshipId] = tracker.memoryBank[relationshipId].slice(-20);
    }
  }

  processConsequences(character: Character, eventId: string): void {
    if (!character.consequenceTracker) {
      character.consequenceTracker = this.initializeConsequenceTracker();
    }

    if (!character.reputation) {
      character.reputation = this.initializeReputationSystem() as any;
    }

    // Check for new consequence chains
    this.consequenceChains.forEach(chain => {
      if (chain.triggerEventId === eventId && Math.random() < chain.probability) {
        if (this.checkConditions(character, chain.conditions)) {
          this.queueConsequence(character.consequenceTracker!, chain, character.age);
        }
      }
    });

    // Process pending consequences
    this.processPendingConsequences(character);

    // Fade relationship memories
    this.fadeRelationshipMemories(character.consequenceTracker!);
  }

  private checkConditions(character: Character, conditions: any[]): boolean {
    return conditions.every(condition => {
      switch (condition.type) {
        case 'stat':
          const statValue = (character as any)[condition.target];
          return this.compareValues(statValue, condition.operator, condition.value);
        case 'age':
          return this.compareValues(character.age, condition.operator, condition.value);
        case 'reputation':
          const repValue = (character.reputation as any)?.[condition.target] || 50;
          return this.compareValues(repValue, condition.operator, condition.value);
        default:
          return true;
      }
    });
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

  private queueConsequence(tracker: ConsequenceTracker, chain: ConsequenceChain, currentAge: number): void {
    const pending: PendingConsequence = {
      id: `${chain.id}_${Date.now()}`,
      chainId: chain.id,
      triggerAge: currentAge + chain.delay,
      description: `Consequence of ${chain.triggerEventId}`,
      effects: chain.effects
    };

    tracker.pendingChains.push(pending);
  }

  private processPendingConsequences(character: Character): void {
    const tracker = character.consequenceTracker!;
    const toProcess = tracker.pendingChains.filter(p => p.triggerAge <= character.age);
    
    toProcess.forEach(pending => {
      this.applyConsequenceEffects(character, pending.effects);
    });

    // Remove processed consequences
    tracker.pendingChains = tracker.pendingChains.filter(p => p.triggerAge > character.age);
  }

  private applyConsequenceEffects(character: Character, effects: any[]): void {
    effects.forEach(effect => {
      switch (effect.type) {
        case 'stat_change':
          const currentValue = (character as any)[effect.target] || 0;
          (character as any)[effect.target] = Math.max(0, Math.min(100, currentValue + effect.value));
          break;
        case 'reputation_change':
          if (character.reputation) {
            const currentRep = (character.reputation as any)[effect.target] || 50;
            (character.reputation as any)[effect.target] = Math.max(0, Math.min(100, currentRep + effect.value));
          }
          break;
        case 'event_trigger':
          // Add to life events
          if (!character.lifeEvents) character.lifeEvents = [];
          character.lifeEvents.push(`🔗 ${effect.description}`);
          break;
      }
    });
  }

  private fadeRelationshipMemories(tracker: ConsequenceTracker): void {
    Object.keys(tracker.memoryBank).forEach(relationshipId => {
      tracker.memoryBank[relationshipId] = tracker.memoryBank[relationshipId].map(memory => ({
        ...memory,
        impact: memory.impact * (1 - memory.fadeRate * 0.1) // Fade by 10% of fade rate per age
      })).filter(memory => Math.abs(memory.impact) > 1); // Remove very faded memories
    });
  }

  getRelationshipMemoryScore(tracker: ConsequenceTracker, relationshipId: string): number {
    const memories = tracker.memoryBank[relationshipId] || [];
    return memories.reduce((total, memory) => total + memory.impact, 0);
  }

  getReputationModifier(reputation: ReputationSystem, area: keyof ReputationSystem): number {
    const score = reputation[area];
    if (score >= 80) return 20; // Excellent reputation
    if (score >= 60) return 10; // Good reputation
    if (score >= 40) return 0;  // Neutral reputation
    if (score >= 20) return -10; // Poor reputation
    return -20; // Terrible reputation
  }
}

export const consequenceSystem = ConsequenceSystem.getInstance();
