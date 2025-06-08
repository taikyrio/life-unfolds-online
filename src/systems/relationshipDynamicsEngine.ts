import { Character } from '../types/character';
import { FamilyMember } from '../types/relationships';

interface RelationshipMemory {
  id: string;
  memberId: string;
  eventType: 'positive' | 'negative' | 'neutral';
  description: string;
  impact: number;
  timestamp: Date;
  decayRate: number;
}

interface RelationshipMilestone {
  id: string;
  type: string;
  threshold: number;
  unlocks: string[];
  description: string;
}

interface ConflictScenario {
  id: string;
  title: string;
  description: string;
  triggers: {
    relationshipLevel: number;
    personalityClash: boolean;
    stressLevel: number;
  };
  resolutions: {
    id: string;
    text: string;
    requirements?: string[];
    effects: {
      relationship: number;
      trust: number;
      respect: number;
      happiness: number;
    };
  }[];
}

export class RelationshipDynamicsEngine {
  private memories: Map<string, RelationshipMemory[]> = new Map();
  private milestones: RelationshipMilestone[] = [];
  private conflicts: ConflictScenario[] = [];

  constructor() {
    this.initializeMilestones();
    this.initializeConflicts();
  }

  private initializeMilestones() {
    this.milestones = [
      {
        id: 'close_bond',
        type: 'friendship',
        threshold: 80,
        unlocks: ['deep_conversations', 'emotional_support', 'life_advice'],
        description: 'You have formed a close bond'
      },
      {
        id: 'best_friends',
        type: 'friendship',
        threshold: 95,
        unlocks: ['emergency_contact', 'financial_help', 'life_decisions'],
        description: 'You are best friends'
      },
      {
        id: 'romantic_interest',
        type: 'romance',
        threshold: 60,
        unlocks: ['dating', 'romantic_gestures', 'couple_activities'],
        description: 'Romantic feelings are developing'
      },
      {
        id: 'serious_relationship',
        type: 'romance',
        threshold: 85,
        unlocks: ['moving_in', 'meeting_family', 'future_planning'],
        description: 'You are in a serious relationship'
      },
      {
        id: 'family_respect',
        type: 'family',
        threshold: 75,
        unlocks: ['family_secrets', 'inheritance_discussions', 'major_decisions'],
        description: 'Your family deeply respects you'
      }
    ];
  }

  private initializeConflicts() {
    this.conflicts = [
      {
        id: 'financial_disagreement',
        title: 'Money Matters',
        description: 'You and your partner disagree about spending habits.',
        triggers: {
          relationshipLevel: 50,
          personalityClash: true,
          stressLevel: 60
        },
        resolutions: [
          {
            id: 'compromise',
            text: 'Find a middle ground',
            effects: { relationship: 5, trust: 10, respect: 5, happiness: 10 }
          },
          {
            id: 'your_way',
            text: 'Insist on your approach',
            effects: { relationship: -10, trust: -5, respect: -5, happiness: 5 }
          },
          {
            id: 'avoid_topic',
            text: 'Avoid discussing it',
            effects: { relationship: -5, trust: -10, respect: 0, happiness: -5 }
          }
        ]
      },
      {
        id: 'family_interference',
        title: 'Family Drama',
        description: 'A family member is interfering in your relationship.',
        triggers: {
          relationshipLevel: 40,
          personalityClash: false,
          stressLevel: 70
        },
        resolutions: [
          {
            id: 'set_boundaries',
            text: 'Set clear boundaries',
            requirements: ['assertiveness'],
            effects: { relationship: 15, trust: 5, respect: 20, happiness: 10 }
          },
          {
            id: 'family_meeting',
            text: 'Organize a family meeting',
            effects: { relationship: 10, trust: 10, respect: 10, happiness: 5 }
          },
          {
            id: 'ignore_problem',
            text: 'Hope it resolves itself',
            effects: { relationship: -15, trust: -10, respect: -5, happiness: -10 }
          }
        ]
      },
      {
        id: 'career_priority_clash',
        title: 'Work-Life Balance',
        description: 'Your career ambitions are affecting your relationships.',
        triggers: {
          relationshipLevel: 30,
          personalityClash: true,
          stressLevel: 80
        },
        resolutions: [
          {
            id: 'prioritize_relationship',
            text: 'Focus more on relationships',
            effects: { relationship: 20, trust: 15, respect: 5, happiness: 15 }
          },
          {
            id: 'prioritize_career',
            text: 'Career comes first',
            effects: { relationship: -20, trust: -10, respect: 10, happiness: -10 }
          },
          {
            id: 'find_balance',
            text: 'Try to balance both',
            requirements: ['time_management'],
            effects: { relationship: 10, trust: 10, respect: 15, happiness: 20 }
          }
        ]
      }
    ];
  }

  public updateRelationshipQuality(member: FamilyMember, interaction: {
    type: 'positive' | 'negative' | 'neutral';
    intensity: number;
    context: string;
  }): FamilyMember {
    // Create memory of this interaction
    const memory: RelationshipMemory = {
      id: `memory_${Date.now()}`,
      memberId: member.id,
      eventType: interaction.type,
      description: interaction.context,
      impact: interaction.intensity,
      timestamp: new Date(),
      decayRate: this.calculateDecayRate(interaction.type, interaction.intensity)
    };

    this.addMemory(member.id, memory);

    // Calculate relationship changes based on interaction and personality compatibility
    const compatibility = this.calculatePersonalityCompatibility(member);
    const baseChange = interaction.intensity * compatibility;

    const updatedMember = { ...member };
    
    // Update relationship stats based on interaction type
    switch (interaction.type) {
      case 'positive':
        updatedMember.relationshipStats.relationshipLevel = Math.min(100, 
          updatedMember.relationshipStats.relationshipLevel + baseChange);
        updatedMember.relationshipStats.trust = Math.min(100,
          updatedMember.relationshipStats.trust + baseChange * 0.8);
        updatedMember.relationshipStats.communication = Math.min(100,
          updatedMember.relationshipStats.communication + baseChange * 0.6);
        break;
      
      case 'negative':
        updatedMember.relationshipStats.relationshipLevel = Math.max(0,
          updatedMember.relationshipStats.relationshipLevel - baseChange);
        updatedMember.relationshipStats.trust = Math.max(0,
          updatedMember.relationshipStats.trust - baseChange * 1.2);
        updatedMember.relationshipStats.respect = Math.max(0,
          updatedMember.relationshipStats.respect - baseChange * 0.7);
        break;
    }

    // Update relationship quality
    updatedMember.relationshipQuality = this.calculateOverallQuality(updatedMember);
    
    // Update mood based on recent interactions
    updatedMember.currentMood = this.calculateMood(member.id);

    return updatedMember;
  }

  private calculatePersonalityCompatibility(member: FamilyMember): number {
    // Base compatibility - can be enhanced with character personality comparison
    let compatibility = 1.0;

    // Family members have higher base compatibility
    if (['mother', 'father', 'sibling'].includes(member.relationship)) {
      compatibility = 1.2;
    }

    // Romantic partners need higher compatibility for positive interactions
    if (['boyfriend', 'girlfriend', 'spouse'].includes(member.relationship)) {
      compatibility = this.calculateRomanticCompatibility(member);
    }

    return compatibility;
  }

  private calculateRomanticCompatibility(partner: FamilyMember): number {
    // Enhanced compatibility calculation for romantic relationships
    let baseCompatibility = 1.0;

    // Similar personality traits increase compatibility
    if (partner.personality) {
      const personalityScore = (
        partner.personality.kindness +
        partner.personality.loyalty +
        partner.personality.humor
      ) / 3;

      baseCompatibility = 0.8 + (personalityScore / 100) * 0.4;
    }

    return baseCompatibility;
  }

  private addMemory(memberId: string, memory: RelationshipMemory) {
    if (!this.memories.has(memberId)) {
      this.memories.set(memberId, []);
    }
    
    const memberMemories = this.memories.get(memberId)!;
    memberMemories.push(memory);

    // Keep only recent memories (last 20 interactions)
    if (memberMemories.length > 20) {
      memberMemories.shift();
    }
  }

  private calculateDecayRate(type: string, intensity: number): number {
    // Stronger interactions have slower decay
    const baseDecay = 0.02; // 2% per time unit
    const intensityModifier = Math.max(0.5, 1 - (intensity / 100));
    
    return baseDecay * intensityModifier;
  }

  private calculateOverallQuality(member: FamilyMember): number {
    const stats = member.relationshipStats;
    
    // Weighted average of relationship components
    const weights = {
      relationshipLevel: 0.3,
      trust: 0.25,
      respect: 0.2,
      communication: 0.15,
      conflictResolution: 0.1
    };

    return Math.round(
      stats.relationshipLevel * weights.relationshipLevel +
      stats.trust * weights.trust +
      stats.respect * weights.respect +
      stats.communication * weights.communication +
      stats.conflictResolution * weights.conflictResolution
    );
  }

  private calculateMood(memberId: string): string {
    const recentMemories = this.getRecentMemories(memberId, 5);
    
    if (recentMemories.length === 0) return 'neutral';

    const averageImpact = recentMemories.reduce((sum, memory) => {
      const multiplier = memory.eventType === 'positive' ? 1 : 
                       memory.eventType === 'negative' ? -1 : 0;
      return sum + (memory.impact * multiplier);
    }, 0) / recentMemories.length;

    if (averageImpact > 15) return 'very_happy';
    if (averageImpact > 5) return 'happy';
    if (averageImpact > -5) return 'neutral';
    if (averageImpact > -15) return 'upset';
    return 'angry';
  }

  private getRecentMemories(memberId: string, count: number): RelationshipMemory[] {
    const memories = this.memories.get(memberId) || [];
    return memories.slice(-count);
  }

  public generateRelationshipEvent(character: Character, member: FamilyMember): any | null {
    // Check for milestone achievements
    const milestone = this.checkMilestones(member);
    if (milestone) {
      return this.createMilestoneEvent(milestone, member);
    }

    // Check for potential conflicts
    const conflict = this.checkForConflicts(character, member);
    if (conflict) {
      return this.createConflictEvent(conflict, member);
    }

    // Generate contextual relationship events
    return this.generateContextualEvent(character, member);
  }

  private checkMilestones(member: FamilyMember): RelationshipMilestone | null {
    for (const milestone of this.milestones) {
      if (member.relationshipQuality >= milestone.threshold && 
          !member.achievedMilestones?.includes(milestone.id)) {
        return milestone;
      }
    }
    return null;
  }

  private checkForConflicts(character: Character, member: FamilyMember): ConflictScenario | null {
    const characterStress = this.calculateStressLevel(character);
    
    for (const conflict of this.conflicts) {
      if (member.relationshipQuality >= conflict.triggers.relationshipLevel &&
          characterStress >= conflict.triggers.stressLevel) {
        if (Math.random() < 0.3) { // 30% chance of conflict
          return conflict;
        }
      }
    }
    return null;
  }

  private calculateStressLevel(character: Character): number {
    // Calculate stress based on multiple factors
    let stress = 0;
    
    if (character.health < 50) stress += 30;
    if (character.happiness < 40) stress += 25;
    if (character.wealth < 20) stress += 20;
    if (character.job && character.jobPerformance && character.jobPerformance.performance < 50) stress += 15;
    
    return Math.min(100, stress);
  }

  private createMilestoneEvent(milestone: RelationshipMilestone, member: FamilyMember): any {
    return {
      id: `milestone_${milestone.id}`,
      title: `Relationship Milestone: ${milestone.description}`,
      description: `Your relationship with ${member.name} has reached a new level: ${milestone.description}`,
      type: 'relationship_milestone',
      member: member,
      choices: [
        {
          id: 'celebrate',
          text: 'Celebrate this milestone',
          effects: { happiness: 15, relationships: 10 }
        },
        {
          id: 'acknowledge',
          text: 'Acknowledge quietly',
          effects: { happiness: 8, relationships: 5 }
        }
      ]
    };
  }

  private createConflictEvent(conflict: ConflictScenario, member: FamilyMember): any {
    return {
      id: `conflict_${conflict.id}`,
      title: conflict.title,
      description: conflict.description.replace('{name}', member.name),
      type: 'relationship_conflict',
      member: member,
      choices: conflict.resolutions.map(resolution => ({
        id: resolution.id,
        text: resolution.text,
        effects: resolution.effects,
        requirements: resolution.requirements
      }))
    };
  }

  private generateContextualEvent(character: Character, member: FamilyMember): any | null {
    const events = this.getContextualEvents(character.age, member.relationship);
    
    if (events.length === 0) return null;
    
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    return {
      ...randomEvent,
      member: member,
      description: randomEvent.description.replace('{name}', member.name)
    };
  }

  private getContextualEvents(age: number, relationship: string): any[] {
    const events: any[] = [];

    // Age-specific events
    if (age < 18 && ['mother', 'father'].includes(relationship)) {
      events.push({
        id: 'parent_advice',
        title: 'Seeking Guidance',
        description: '{name} offers you advice about growing up.',
        choices: [
          {
            id: 'listen',
            text: 'Listen carefully',
            effects: { relationships: 10, smarts: 5, happiness: 5 }
          },
          {
            id: 'dismiss',
            text: 'Dismiss their advice',
            effects: { relationships: -5, happiness: 2 }
          }
        ]
      });
    }

    if (age >= 18 && ['boyfriend', 'girlfriend'].includes(relationship)) {
      events.push({
        id: 'future_talk',
        title: 'Talking About the Future',
        description: '{name} wants to discuss your future together.',
        choices: [
          {
            id: 'serious_talk',
            text: 'Have a serious conversation',
            effects: { relationships: 15, happiness: 10 }
          },
          {
            id: 'avoid_topic',
            text: 'Change the subject',
            effects: { relationships: -10, happiness: -5 }
          }
        ]
      });
    }

    return events;
  }

  public processRelationshipDecay(familyMembers: FamilyMember[]): FamilyMember[] {
    return familyMembers.map(member => {
      // Apply natural relationship decay if no recent interactions
      const lastInteraction = new Date(member.relationshipStats.lastInteraction);
      const daysSinceInteraction = (Date.now() - lastInteraction.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSinceInteraction > 30) { // If no interaction for 30+ days
        const decayRate = this.calculateRelationshipDecay(member.relationship);
        
        return {
          ...member,
          relationshipStats: {
            ...member.relationshipStats,
            relationshipLevel: Math.max(0, member.relationshipStats.relationshipLevel - decayRate),
            communication: Math.max(0, member.relationshipStats.communication - decayRate * 0.5)
          },
          relationshipQuality: Math.max(0, member.relationshipQuality - decayRate)
        };
      }
      
      return member;
    });
  }

  private calculateRelationshipDecay(relationship: string): number {
    // Different relationship types decay at different rates
    const decayRates = {
      'mother': 1,
      'father': 1,
      'sibling': 2,
      'friend': 5,
      'boyfriend': 8,
      'girlfriend': 8,
      'spouse': 3,
      'child': 1
    };

    return decayRates[relationship] || 3;
  }
}

export const relationshipEngine = new RelationshipDynamicsEngine();