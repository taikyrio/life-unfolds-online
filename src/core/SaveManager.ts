
import { Character } from '../types/core';

export class SaveManager {
  private readonly SAVE_KEY = 'life_game_saves';
  private readonly MAX_SAVES = 5;

  saveGame(character: Character, slot: number): void {
    try {
      const saves = this.getAllSaves();
      saves[slot] = {
        character,
        timestamp: Date.now(),
        version: '1.0.0'
      };
      
      localStorage.setItem(this.SAVE_KEY, JSON.stringify(saves));
    } catch (error) {
      console.error('Failed to save game:', error);
    }
  }

  loadGame(slot: number): Character | null {
    try {
      const saves = this.getAllSaves();
      const saveData = saves[slot];
      
      if (saveData && saveData.character) {
        return saveData.character;
      }
    } catch (error) {
      console.error('Failed to load game:', error);
    }
    
    return null;
  }

  getAllSaves(): any[] {
    try {
      const savedData = localStorage.getItem(this.SAVE_KEY);
      return savedData ? JSON.parse(savedData) : new Array(this.MAX_SAVES).fill(null);
    } catch {
      return new Array(this.MAX_SAVES).fill(null);
    }
  }

  deleteSave(slot: number): void {
    try {
      const saves = this.getAllSaves();
      saves[slot] = null;
      localStorage.setItem(this.SAVE_KEY, JSON.stringify(saves));
    } catch (error) {
      console.error('Failed to delete save:', error);
    }
  }

  exportSave(slot: number): string | null {
    const saveData = this.getAllSaves()[slot];
    if (saveData) {
      return JSON.stringify(saveData);
    }
    return null;
  }

  importSave(saveString: string, slot: number): boolean {
    try {
      const saveData = JSON.parse(saveString);
      if (saveData.character) {
        this.saveGame(saveData.character, slot);
        return true;
      }
    } catch (error) {
      console.error('Failed to import save:', error);
    }
    return false;
  }
}
