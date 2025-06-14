
import { GameLog } from './types';

export class CharacterManager {
  static initializeCharacter(
    logs: Map<string, GameLog>,
    characterId: string,
    name: string,
    birthYear: number
  ): GameLog {
    const log: GameLog = {
      characterId,
      characterName: name,
      birthYear,
      events: [],
      lastSaved: Date.now()
    };

    logs.set(characterId, log);
    return log;
  }

  static saveAgeHistory(
    logs: Map<string, GameLog>,
    currentCharacterId: string | null,
    ageHistory: Record<number, string[]>
  ): void {
    try {
      if (!currentCharacterId) return;

      const log = logs.get(currentCharacterId);
      if (!log) return;

      (log as any).ageHistory = ageHistory;
      log.lastSaved = Date.now();
    } catch (error) {
      console.error('Error saving age history:', error);
    }
  }

  static loadAgeHistory(
    logs: Map<string, GameLog>,
    currentCharacterId: string | null
  ): Record<number, string[]> {
    if (!currentCharacterId) return {};

    const log = logs.get(currentCharacterId);
    if (!log) return {};

    return (log as any).ageHistory || {};
  }

  static getLifeSummary(
    logs: Map<string, GameLog>,
    currentCharacterId: string | null
  ): { [key: number]: string[] } {
    if (!currentCharacterId) return {};

    const log = logs.get(currentCharacterId);
    if (!log) return {};

    const savedAgeHistory = CharacterManager.loadAgeHistory(logs, currentCharacterId);
    const summary: { [key: number]: string[] } = { ...savedAgeHistory };

    // Add logged events to summary
    log.events.forEach(event => {
      if (!summary[event.age]) {
        summary[event.age] = [];
      }
      // Avoid duplicates
      if (!summary[event.age].includes(event.event)) {
        summary[event.age].push(event.event);
      }
    });

    return summary;
  }

  static getCharacterLogs(logs: Map<string, GameLog>): GameLog[] {
    return Array.from(logs.values()).sort((a, b) => b.lastSaved - a.lastSaved);
  }
}
