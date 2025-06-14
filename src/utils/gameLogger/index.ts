
export { GameLogger } from './gameLogger';
export { StorageManager } from './storage';
export { EventManager } from './eventManager';
export { CharacterManager } from './characterManager';
export type { LifeEvent, GameLog } from './types';

// Create and export the singleton instance
export const gameLogger = new GameLogger();

// Initialize from localStorage on app start
gameLogger.loadFromLocalStorage();
