export interface LifeEvent {
  id: string;
  age: number;
  year: number;
  event: string;
  category: 'education' | 'career' | 'relationship' | 'health' | 'finance' | 'crime' | 'family' | 'achievement' | 'decision';
  impact?: {
    happiness?: number;
    health?: number;
    smarts?: number;
    looks?: number;
    money?: number;
  };
  timestamp: number;
}

export interface GameLog {
  characterId: string;
  characterName: string;
  birthYear: number;
  events: LifeEvent[];
  ageHistory?: Record<number, string[]>;
  lastSaved: number;
}

class GameLogger {
  private logs: Map<string, GameLog> = new Map();
  private currentCharacterId: string | null = null;

  constructor() {
    // Bind methods to ensure correct 'this' context
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    this.loadFromLocalStorage = this.loadFromLocalStorage.bind(this);
    this.loadFromLocalStorage();
  }

  initializeCharacter(characterId: string, name: string, birthYear: number): void {
    const log: GameLog = {
      characterId,
      characterName: name,
      birthYear,
      events: [],
      lastSaved: Date.now()
    };

    this.logs.set(characterId, log);
    this.currentCharacterId = characterId;
    this.saveToLocalStorage();
  }

  logEvent(event: Omit<LifeEvent, 'id' | 'timestamp'>): void {
    try {
      if (!this.currentCharacterId) return;

      const log = this.logs.get(this.currentCharacterId);
      if (!log) return;

      const fullEvent: LifeEvent = {
        ...event,
        id: `${this.currentCharacterId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now()
      };

      log.events.push(fullEvent);
      log.lastSaved = Date.now();

      // Keep only last 1000 events to prevent memory issues
      if (log.events.length > 1000) {
        log.events = log.events.slice(-1000);
      }

      this.saveToLocalStorage();
    } catch (error) {
      console.error('Error logging event:', error);
    }
  }

  getEventsByAge(age: number): LifeEvent[] {
    if (!this.currentCharacterId) return [];

    const log = this.logs.get(this.currentCharacterId);
    if (!log) return [];

    return log.events.filter(event => event.age === age);
  }

  getEventsByCategory(category: LifeEvent['category']): LifeEvent[] {
    if (!this.currentCharacterId) return [];

    const log = this.logs.get(this.currentCharacterId);
    if (!log) return [];

    return log.events.filter(event => event.category === category);
  }

  saveAgeHistory(ageHistory: Record<number, string[]>): void {
    try {
      if (!this.currentCharacterId) return;

      const log = this.logs.get(this.currentCharacterId);
      if (!log) return;

      (log as any).ageHistory = ageHistory;
      log.lastSaved = Date.now();
      this.saveToLocalStorage();
    } catch (error) {
      console.error('Error saving age history:', error);
    }
  }

  loadAgeHistory(): Record<number, string[]> {
    if (!this.currentCharacterId) return {};

    const log = this.logs.get(this.currentCharacterId);
    if (!log) return {};

    return (log as any).ageHistory || {};
  }

  loadCharacter(characterId: string): void {
    this.currentCharacterId = characterId;
    this.loadFromLocalStorage();
  }

  getCurrentCharacterId(): string | null {
    return this.currentCharacterId;
  }

  getAllEvents(): LifeEvent[] {
    if (!this.currentCharacterId) return [];

    const log = this.logs.get(this.currentCharacterId);
    if (!log) return [];

    return [...log.events].sort((a, b) => b.age - a.age || b.timestamp - a.timestamp);
  }

  getLifeSummary(): { [key: number]: string[] } {
    const events = this.getAllEvents();
    const savedAgeHistory = this.loadAgeHistory();
    const summary: { [key: number]: string[] } = { ...savedAgeHistory };

    // Add logged events to summary
    events.forEach(event => {
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
    try {
      const logsArray = Array.from(this.logs.entries());
      localStorage.setItem('bitlife_game_logs', JSON.stringify(logsArray));
    } catch (error) {
      console.error('Failed to save logs to localStorage:', error);
    }
  }

  loadFromLocalStorage(): void {
    try {
      const saved = localStorage.getItem('bitlife_game_logs');
      if (saved) {
        const logsArray: [string, GameLog][] = JSON.parse(saved);
        this.logs = new Map(logsArray);
      }
    } catch (error) {
      console.error('Failed to load logs from localStorage:', error);
    }
  }

  clearLogs(): void {
    this.logs.clear();
    this.currentCharacterId = null;
    localStorage.removeItem('bitlife_game_logs');
  }

  getCharacterLogs(): GameLog[] {
    return Array.from(this.logs.values()).sort((a, b) => b.lastSaved - a.lastSaved);
  }
}

export const gameLogger = new GameLogger();

// Initialize from localStorage on app start
gameLogger.loadFromLocalStorage();