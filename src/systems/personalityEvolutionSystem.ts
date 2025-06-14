
import { Character, PersonalityTraits } from '../types/character';

export interface PersonalityEvent {
  trait: keyof PersonalityTraits;
  change: number;
  reason: string;
  age: number;
}

export class PersonalityEvolutionSystem {
  private static instance: PersonalityEvolutionSystem;
  private personalityHistory: PersonalityEvent[] = [];

  static getInstance(): PersonalityEvolutionSystem {
    if (!PersonalityEvolutionSystem.instance) {
      PersonalityEvolutionSystem.instance = new PersonalityEvolutionSystem();
    }
    return PersonalityEvolutionSystem.instance;
  }

  evolvePersonality(character: Character, eventId: string, choiceId: string): void {
    if (!character.personalityTraits) {
      character.personalityTraits = this.initializePersonality();
    }

    const changes = this.getPersonalityChanges(eventId, choiceId, character.age);
    
    changes.forEach(change => {
      const currentValue = character.personalityTraits![change.trait] || 50;
      const newValue = Math.max(0, Math.min(100, currentValue + change.change));
      character.personalityTraits![change.trait] = newValue;

      this.personalityHistory.push({
        trait: change.trait,
        change: change.change,
        reason: change.reason,
        age: character.age
      });
    });
  }

  private initializePersonality(): PersonalityTraits {
    return {
      kindness: 50 + Math.random() * 20 - 10,
      intelligence: 50 + Math.random() * 20 - 10,
      humor: 50 + Math.random() * 20 - 10,
      ambition: 50 + Math.random() * 20 - 10,
      honesty: 50 + Math.random() * 20 - 10,
      empathy: 50 + Math.random() * 20 - 10,
      creativity: 50 + Math.random() * 20 - 10,
      confidence: 50 + Math.random() * 20 - 10,
      patience: 50 + Math.random() * 20 - 10,
      loyalty: 50 + Math.random() * 20 - 10,
      analytical: 50 + Math.random() * 20 - 10,
      adventurous: 50 + Math.random() * 20 - 10,
      cautious: 50 + Math.random() * 20 - 10
    };
  }

  private getPersonalityChanges(eventId: string, choiceId: string, age: number): {
    trait: keyof PersonalityTraits;
    change: number;
    reason: string;
  }[] {
    const changes: {
      trait: keyof PersonalityTraits;
      change: number;
      reason: string;
    }[] = [];

    // Study-related personality changes
    if (eventId.includes('study') || eventId.includes('exam')) {
      if (choiceId.includes('hard') || choiceId.includes('intensive')) {
        changes.push({ trait: 'intelligence', change: 2, reason: 'Studied intensively' });
        changes.push({ trait: 'patience', change: 1, reason: 'Developed study discipline' });
      }
    }

    // Social interaction changes
    if (eventId.includes('party') || eventId.includes('social')) {
      if (choiceId.includes('participate') || choiceId.includes('join')) {
        changes.push({ trait: 'confidence', change: 3, reason: 'Social interaction' });
        changes.push({ trait: 'humor', change: 2, reason: 'Enjoyed social time' });
      } else if (choiceId.includes('avoid') || choiceId.includes('skip')) {
        changes.push({ trait: 'cautious', change: 2, reason: 'Avoided social risk' });
        changes.push({ trait: 'confidence', change: -1, reason: 'Missed social opportunity' });
      }
    }

    // Helping others
    if (choiceId.includes('help') || choiceId.includes('volunteer')) {
      changes.push({ trait: 'kindness', change: 4, reason: 'Helped others' });
      changes.push({ trait: 'empathy', change: 3, reason: 'Showed compassion' });
    }

    // Risk-taking behaviors
    if (choiceId.includes('risk') || choiceId.includes('adventure')) {
      changes.push({ trait: 'adventurous', change: 3, reason: 'Took risks' });
      changes.push({ trait: 'cautious', change: -2, reason: 'Embraced uncertainty' });
    }

    // Dishonest choices
    if (choiceId.includes('lie') || choiceId.includes('cheat')) {
      changes.push({ trait: 'honesty', change: -3, reason: 'Made dishonest choice' });
    }

    // Creative activities
    if (eventId.includes('art') || eventId.includes('creative') || choiceId.includes('creative')) {
      changes.push({ trait: 'creativity', change: 3, reason: 'Engaged in creative activity' });
    }

    // Age-based personality development
    if (age < 18) {
      // Teenagers develop more dramatic personality changes
      changes.forEach(change => change.change *= 1.5);
    } else if (age > 40) {
      // Adults have more stable personalities
      changes.forEach(change => change.change *= 0.7);
    }

    return changes;
  }

  getPersonalityDescription(character: Character): string {
    if (!character.personalityTraits) return "Personality still developing";

    const traits = character.personalityTraits;
    const descriptions: string[] = [];

    if (traits.kindness > 70) descriptions.push("very kind");
    if (traits.confidence > 70) descriptions.push("confident");
    if (traits.humor > 70) descriptions.push("funny");
    if (traits.intelligence > 70) descriptions.push("intelligent");
    if (traits.adventurous > 70) descriptions.push("adventurous");
    if (traits.creativity > 70) descriptions.push("creative");

    if (traits.cautious > 70) descriptions.push("cautious");
    if (traits.honesty > 80) descriptions.push("very honest");
    if (traits.empathy > 70) descriptions.push("empathetic");

    return descriptions.length > 0 ? descriptions.join(", ") : "balanced personality";
  }

  getPersonalityHistory(): PersonalityEvent[] {
    return [...this.personalityHistory];
  }
}

export const personalityEvolutionSystem = PersonalityEvolutionSystem.getInstance();
