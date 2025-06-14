
import { Character } from '../types/character';
import { LifeEvent, EventChoice } from '../types/core';

export interface ChoiceConsequence {
  choiceId: string;
  eventId: string;
  age: number;
  impact: 'minor' | 'moderate' | 'major';
  category: string;
  description: string;
}

export interface FutureConsequence {
  id: string;
  triggerAge: number;
  probability: number;
  event: LifeEvent;
  triggerChoice: ChoiceConsequence;
}

export class DynamicConsequenceSystem {
  private static instance: DynamicConsequenceSystem;
  private choiceHistory: ChoiceConsequence[] = [];
  private pendingConsequences: FutureConsequence[] = [];

  static getInstance(): DynamicConsequenceSystem {
    if (!DynamicConsequenceSystem.instance) {
      DynamicConsequenceSystem.instance = new DynamicConsequenceSystem();
    }
    return DynamicConsequenceSystem.instance;
  }

  recordChoice(eventId: string, choiceId: string, character: Character, choice: EventChoice): void {
    const consequence: ChoiceConsequence = {
      choiceId,
      eventId,
      age: character.age,
      impact: this.determineImpact(choice),
      category: this.determineCategory(eventId),
      description: choice.text
    };

    this.choiceHistory.push(consequence);
    this.generateFutureConsequences(consequence, character);
  }

  private determineImpact(choice: EventChoice): 'minor' | 'moderate' | 'major' {
    const effects = choice.effects || {};
    const totalChange = Math.abs((effects.happiness || 0) + (effects.health || 0) + 
                                (effects.smarts || 0) + (effects.wealth || 0));
    
    if (totalChange > 30) return 'major';
    if (totalChange > 15) return 'moderate';
    return 'minor';
  }

  private determineCategory(eventId: string): string {
    if (eventId.includes('school') || eventId.includes('study')) return 'education';
    if (eventId.includes('work') || eventId.includes('job')) return 'career';
    if (eventId.includes('family') || eventId.includes('friend')) return 'relationships';
    if (eventId.includes('money') || eventId.includes('buy')) return 'financial';
    return 'general';
  }

  private generateFutureConsequences(choice: ChoiceConsequence, character: Character): void {
    // Academic consequences
    if (choice.category === 'education' && choice.impact === 'major') {
      if (choice.choiceId.includes('study_hard')) {
        this.pendingConsequences.push({
          id: `academic_recognition_${Date.now()}`,
          triggerAge: character.age + 2,
          probability: 0.7,
          event: {
            id: 'scholarship_offer',
            title: 'Scholarship Opportunity',
            description: 'Your academic excellence has caught attention! You\'ve been offered a scholarship.',
            age: character.age + 2,
            emoji: '🎓',
            choices: [
              {
                id: 'accept_scholarship',
                text: 'Accept the scholarship',
                emoji: '✅',
                effects: { happiness: 20, smarts: 10, wealth: 50 }
              },
              {
                id: 'decline_scholarship',
                text: 'Decline and focus on other opportunities',
                emoji: '❌',
                effects: { happiness: 5, wealth: 10 }
              }
            ]
          },
          triggerChoice: choice
        });
      }
    }

    // Social consequences
    if (choice.category === 'relationships' && choice.impact === 'major') {
      this.pendingConsequences.push({
        id: `social_reputation_${Date.now()}`,
        triggerAge: character.age + 1,
        probability: 0.6,
        event: {
          id: 'reputation_event',
          title: 'Your Reputation Precedes You',
          description: 'People have been talking about your recent actions.',
          age: character.age + 1,
          emoji: '💬',
          choices: [
            {
              id: 'embrace_reputation',
              text: 'Embrace your reputation',
              emoji: '😎',
              effects: { happiness: 15, relationships: 10 }
            },
            {
              id: 'try_to_change',
              text: 'Try to change people\'s minds',
              emoji: '🔄',
              effects: { happiness: 5, relationships: -5 }
            }
          ]
        },
        triggerChoice: choice
      });
    }
  }

  processAgeConsequences(character: Character): LifeEvent[] {
    const triggeredEvents: LifeEvent[] = [];
    const remainingConsequences: FutureConsequence[] = [];

    for (const consequence of this.pendingConsequences) {
      if (consequence.triggerAge <= character.age && Math.random() < consequence.probability) {
        triggeredEvents.push(consequence.event);
      } else if (consequence.triggerAge > character.age) {
        remainingConsequences.push(consequence);
      }
    }

    this.pendingConsequences = remainingConsequences;
    return triggeredEvents;
  }

  getChoiceHistory(): ChoiceConsequence[] {
    return [...this.choiceHistory];
  }

  getReputationModifier(category: string): number {
    const relevantChoices = this.choiceHistory.filter(choice => choice.category === category);
    const recentChoices = relevantChoices.filter(choice => choice.age > 0); // Last few years
    
    let modifier = 0;
    recentChoices.forEach(choice => {
      const impact = choice.impact === 'major' ? 3 : choice.impact === 'moderate' ? 2 : 1;
      modifier += impact;
    });

    return Math.min(modifier, 20); // Cap at +20
  }
}

export const dynamicConsequenceSystem = DynamicConsequenceSystem.getInstance();
