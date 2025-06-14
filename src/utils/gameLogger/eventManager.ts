import { LifeEvent, GameLog } from './types';

export class EventManager {
  static logEvent(
    logs: Map<string, GameLog>,
    currentCharacterId: string | null,
    event: Omit<LifeEvent, 'id' | 'timestamp'>
  ): LifeEvent | null {
    try {
      if (!currentCharacterId) return null;

      const log = logs.get(currentCharacterId);
      if (!log) return null;

      const fullEvent: LifeEvent = {
        ...event,
        id: `${currentCharacterId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now()
      };

      log.events.push(fullEvent);
      log.lastSaved = Date.now();

      // Keep only last 1000 events to prevent memory issues
      if (log.events.length > 1000) {
        log.events = log.events.slice(-1000);
      }

      return fullEvent;
    } catch (error) {
      console.error('Error logging event:', error);
      return null;
    }
  }

  static getEventsByAge(
    logs: Map<string, GameLog>,
    currentCharacterId: string | null,
    age: number
  ): LifeEvent[] {
    if (!currentCharacterId) return [];

    const log = logs.get(currentCharacterId);
    if (!log) return [];

    return log.events.filter(event => event.age === age);
  }

  static getEventsByCategory(
    logs: Map<string, GameLog>,
    currentCharacterId: string | null,
    category: LifeEvent['category']
  ): LifeEvent[] {
    if (!currentCharacterId) return [];

    const log = logs.get(currentCharacterId);
    if (!log) return [];

    return log.events.filter(event => event.category === category);
  }

  static getAllEvents(
    logs: Map<string, GameLog>,
    currentCharacterId: string | null
  ): LifeEvent[] {
    if (!currentCharacterId) return [];

    const log = logs.get(currentCharacterId);
    if (!log) return [];

    return [...log.events].sort((a, b) => b.age - a.age || b.timestamp - a.timestamp);
  }
}
