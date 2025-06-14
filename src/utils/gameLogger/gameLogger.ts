
import { LifeEvent, GameLog } from './types';
import { StorageManager } from './storage';
import { EventManager } from './eventManager';
import { CharacterManager } from './characterManager';

export class GameLogger {
  private logs: Map<string, GameLog> = new Map();
  private currentCharacterId: string | null = null;

  constructor() {
    // Bind methods to ensure correct 'this' context
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    this.loadFromLocalStorage = this.loadFromLocalStorage.bind(this);
    this.loadFromLocalStorage();
  }

  initializeCharacter(characterId: string, name: string, birthYear: number): void {
    CharacterManager.initializeCharacter(this.logs, characterId, name, birthYear);
    this.currentCharacterId = characterId;
    this.saveToLocalStorage();
  }

  logEvent(event: Omit<LifeEvent, 'id' | 'timestamp'>): void {
    const loggedEvent = EventManager.logEvent(this.logs, this.currentCharacterId, event);
    if (loggedEvent) {
      this.saveToLocalStorage();
    }
  }

  getEventsByAge(age: number): LifeEvent[] {
    return EventManager.getEventsByAge(this.logs, this.currentCharacterId, age);
  }

  getEventsByCategory(category: LifeEvent['category']): LifeEvent[] {
    return EventManager.getEventsByCategory(this.logs, this.currentCharacterId, category);
  }

  saveAgeHistory(ageHistory: Record<number, string[]>): void {
    CharacterManager.saveAgeHistory(this.logs, this.currentCharacterId, ageHistory);
    this.saveToLocalStorage();
  }

  loadAgeHistory(): Record<number, string[]> {
    return CharacterManager.loadAgeHistory(this.logs, this.currentCharacterId);
  }

  loadCharacter(characterId: string): void {
    this.currentCharacterId = characterId;
    this.loadFromLocalStorage();
  }

  getCurrentCharacterId(): string | null {
    return this.currentCharacterId;
  }

  getAllEvents(): LifeEvent[] {
    return EventManager.getAllEvents(this.logs, this.currentCharacterId);
  }

  getLifeSummary(): { [key: number]: string[] } {
    return CharacterManager.getLifeSummary(this.logs, this.currentCharacterId);
  }

  exportLog(): string {
    if (!this.currentCharacterId) return '';

    const log = this.logs.get(this.currentCharacterId);
    if (!log) return '';

    return JSON.stringify(log, null, 2);
  }

  importLog(jsonData: string): boolean {
    try {
      const log: GameLog = JSON.parse(jsonData);
      this.logs.set(log.characterId, log);
      this.currentCharacterId = log.characterId;
      this.saveToLocalStorage();
      return true;
    } catch (error) {
      console.error('Failed to import log:', error);
      return false;
    }
  }

  private saveToLocalStorage(): void {
    StorageManager.saveToLocalStorage(this.logs);
  }

  loadFromLocalStorage(): void {
    this.logs = StorageManager.loadFromLocalStorage();
  }

  clearLogs(): void {
    this.logs.clear();
    this.currentCharacterId = null;
    StorageManager.clearLogs();
  }

  getCharacterLogs(): GameLog[] {
    return CharacterManager.getCharacterLogs(this.logs);
  }
}
