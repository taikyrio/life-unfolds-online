
import { Character, GameEvent, LifeEvent, EventChoice, Consequence } from '../types/core';
import { EventSystem } from './EventSystem';
import { generateRandomName } from '../utils/nameGenerator';

export class GameEngine {
  private eventSystem: EventSystem;

  constructor() {
    this.eventSystem = new EventSystem();
  }

  createCharacter(data: Partial<Character>): Character {
    const defaultCharacter: Character = {
      id: `char_${Date.now()}`,
      name: data.name || generateRandomName(),
      age: 0,
      gender: data.gender || 'male',
      health: this.randomStat(70, 100),
      happiness: this.randomStat(60, 90),
      smarts: this.randomStat(40, 80),
      looks: this.randomStat(40, 80),
      money: 0,
      relationshipStatus: 'single',
      education: 'none',
      lifeEvents: [],
      achievements: [],
      personality: {
        kindness: this.randomStat(20, 80),
        creativity: this.randomStat(20, 80),
        discipline: this.randomStat(20, 80),
        patience: this.randomStat(20, 80),
        humor: this.randomStat(20, 80),
        ambition: this.randomStat(20, 80),
        empathy: this.randomStat(20, 80),
        confidence: this.randomStat(20, 80),
      },
      birthCountry: 'United States',
      family: this.generateInitialFamily(),
      relationships: []
    };

    return { ...defaultCharacter, ...data };
  }

  ageUp(character: Character): { character: Character; event?: GameEvent } {
    const newCharacter = { ...character };
    newCharacter.age += 1;

    // Natural stat changes with age
    this.applyAgeEffects(newCharacter);

    // Check for random events
    const event = this.eventSystem.getRandomEvent(newCharacter);

    // Add birthday event
    const birthdayEvent: LifeEvent = {
      id: `birthday_${newCharacter.age}`,
      title: `Turned ${newCharacter.age}`,
      description: `You celebrated your ${newCharacter.age}${this.getOrdinalSuffix(newCharacter.age)} birthday!`,
      age: newCharacter.age,
      category: 'random',
      icon: '🎂',
      impact: { happiness: Math.floor(Math.random() * 10) + 5 },
      timestamp: Date.now()
    };

    newCharacter.lifeEvents.push(birthdayEvent);
    newCharacter.happiness = Math.min(100, newCharacter.happiness + birthdayEvent.impact.happiness!);

    return { character: newCharacter, event };
  }

  processChoice(character: Character, event: GameEvent, choiceId: string): Character {
    const choice = event.choices.find(c => c.id === choiceId);
    if (!choice) return character;

    const newCharacter = { ...character };

    // Apply consequences
    choice.consequences.forEach(consequence => {
      this.applyConsequence(newCharacter, consequence);
    });

    // Add life event
    const lifeEvent: LifeEvent = {
      id: `event_${Date.now()}`,
      title: event.title,
      description: choice.text,
      age: character.age,
      category: event.category,
      icon: '📝',
      impact: {},
      timestamp: Date.now()
    };

    newCharacter.lifeEvents.push(lifeEvent);

    return newCharacter;
  }

  private randomStat(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private applyAgeEffects(character: Character): void {
    // Health gradually decreases with age
    if (character.age > 30) {
      character.health = Math.max(0, character.health - Math.floor(Math.random() * 3));
    }

    // Looks peak around 25-30, then gradually decrease
    if (character.age > 30) {
      character.looks = Math.max(0, character.looks - Math.floor(Math.random() * 2));
    }

    // Smarts can increase with life experience
    if (character.age > 18 && Math.random() < 0.3) {
      character.smarts = Math.min(100, character.smarts + 1);
    }
  }

  private applyConsequence(character: Character, consequence: Consequence): void {
    switch (consequence.type) {
      case 'stat':
        if (consequence.target && typeof consequence.change === 'number') {
          const currentValue = (character as any)[consequence.target] || 0;
          (character as any)[consequence.target] = Math.max(0, Math.min(100, currentValue + consequence.change));
        }
        break;
      case 'money':
        if (typeof consequence.change === 'number') {
          character.money = Math.max(0, character.money + consequence.change);
        }
        break;
    }
  }

  private generateInitialFamily() {
    return [
      {
        id: 'mother',
        name: generateRandomName(),
        relationship: 'Mother',
        age: Math.floor(Math.random() * 20) + 25,
        alive: true,
        relationshipQuality: Math.floor(Math.random() * 40) + 60
      },
      {
        id: 'father',
        name: generateRandomName(),
        relationship: 'Father',
        age: Math.floor(Math.random() * 20) + 25,
        alive: true,
        relationshipQuality: Math.floor(Math.random() * 40) + 60
      }
    ];
  }

  private getOrdinalSuffix(num: number): string {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  }
}
