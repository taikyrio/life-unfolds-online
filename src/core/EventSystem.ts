
import { Character, GameEvent, EventCategory } from '../types/core';
import { gameEvents } from '../data/events';

export class EventSystem {
  private events: GameEvent[];

  constructor() {
    this.events = gameEvents;
  }

  getRandomEvent(character: Character): GameEvent | undefined {
    // Filter events based on character's age and conditions
    const availableEvents = this.events.filter(event => {
      // Check age range
      if (event.ageRange) {
        const [minAge, maxAge] = event.ageRange;
        if (character.age < minAge || character.age > maxAge) {
          return false;
        }
      }

      // Check conditions
      if (event.conditions) {
        return event.conditions.every(condition => {
          return this.checkCondition(character, condition);
        });
      }

      return true;
    });

    if (availableEvents.length === 0) return undefined;

    // Random selection with rarity consideration
    const totalWeight = availableEvents.reduce((sum, event) => sum + event.rarity, 0);
    let random = Math.random() * totalWeight;

    for (const event of availableEvents) {
      random -= event.rarity;
      if (random <= 0) {
        return event;
      }
    }

    return availableEvents[0];
  }

  private checkCondition(character: Character, condition: any): boolean {
    // Implement condition checking logic
    switch (condition.type) {
      case 'stat':
        const statValue = (character as any)[condition.target] || 0;
        return this.compareValues(statValue, condition.value, condition.operator);
      case 'age':
        return this.compareValues(character.age, condition.value, condition.operator);
      case 'money':
        return this.compareValues(character.money, condition.value, condition.operator);
      default:
        return true;
    }
  }

  private compareValues(a: number, b: number, operator: string): boolean {
    switch (operator) {
      case '>': return a > b;
      case '<': return a < b;
      case '=': return a === b;
      case '>=': return a >= b;
      case '<=': return a <= b;
      default: return true;
    }
  }
}
