
import { GameLog } from './types';

export class StorageManager {
  private static readonly STORAGE_KEY = 'bitlife_game_logs';

  static saveToLocalStorage(logs: Map<string, GameLog>): void {
    try {
      const logsArray = Array.from(logs.entries());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logsArray));
    } catch (error) {
      console.error('Failed to save logs to localStorage:', error);
    }
  }

  static loadFromLocalStorage(): Map<string, GameLog> {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const logsArray: [string, GameLog][] = JSON.parse(saved);
        return new Map(logsArray);
      }
    } catch (error) {
      console.error('Failed to load logs from localStorage:', error);
    }
    return new Map();
  }

  static clearLogs(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
