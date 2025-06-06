
import { Character, GameState } from '../../types/game';

export const processGameLogic = (character: Character): Character => {
  let updatedCharacter = { ...character };
  
  // Initialize missing properties if they don't exist
  if (!updatedCharacter.education) {
    updatedCharacter.education = {
      currentStage: null,
      currentSchool: null,
      currentYear: 0,
      gpa: 0,
      completedStages: [],
      achievements: [],
      testScores: [],
      disciplinaryActions: 0,
      dropouts: 0,
      levels: [],
      grades: []
    };
  }
  
  if (!updatedCharacter.familyMembers) {
    updatedCharacter.familyMembers = [];
  }
  
  if (!updatedCharacter.relationshipStatus) {
    updatedCharacter.relationshipStatus = 'single';
  }

  if (!updatedCharacter.lifeEvents) {
    updatedCharacter.lifeEvents = [];
  }
  
  return updatedCharacter;
};

export const validateCharacterData = (character: Character): boolean => {
  // Ensure required properties exist
  if (!character.id || !character.name) return false;
  if (typeof character.age !== 'number') return false;
  if (typeof character.health !== 'number') return false;
  if (typeof character.happiness !== 'number') return false;
  if (typeof character.smarts !== 'number') return false;
  if (typeof character.looks !== 'number') return false;
  if (typeof character.wealth !== 'number') return false;
  
  return true;
};

export const initializeCharacterDefaults = (character: Partial<Character>): Character => {
  return {
    id: character.id || 'default',
    name: character.name || 'Unknown',
    gender: character.gender || 'female',
    age: character.age || 0,
    health: character.health || 100,
    happiness: character.happiness || 50,
    smarts: character.smarts || 50,
    looks: character.looks || 50,
    wealth: character.wealth || 100,
    relationships: character.relationships || 50,
    achievements: character.achievements || [],
    assets: character.assets || [],
    children: character.children || [],
    fame: character.fame || 0,
    familyMembers: character.familyMembers || [],
    lifeEvents: character.lifeEvents || [],
    education: character.education || {
      currentStage: null,
      currentSchool: null,
      currentYear: 0,
      gpa: 0,
      completedStages: [],
      achievements: [],
      testScores: [],
      disciplinaryActions: 0,
      dropouts: 0,
      levels: [],
      grades: []
    },
    relationshipStatus: character.relationshipStatus || 'single',
    ...character
  };
};

export const processAgeUp = (gameState: GameState): GameState => {
  const updatedCharacter = { ...gameState.character };
  updatedCharacter.age += 1;
  
  // Age-related stat changes
  if (updatedCharacter.age > 30) {
    updatedCharacter.health = Math.max(0, updatedCharacter.health - 1);
  }
  
  if (updatedCharacter.age > 50) {
    updatedCharacter.health = Math.max(0, updatedCharacter.health - 2);
    updatedCharacter.looks = Math.max(0, updatedCharacter.looks - 1);
  }
  
  // Death check
  if (updatedCharacter.health <= 0 || updatedCharacter.age >= 120) {
    return {
      ...gameState,
      character: updatedCharacter,
      gameOver: true,
      gameOverReason: updatedCharacter.health <= 0 ? 'Death by poor health' : 'Death by old age'
    };
  }
  
  return {
    ...gameState,
    character: updatedCharacter
  };
};

export const processChoice = (gameState: GameState, choiceId: string): GameState => {
  // Basic choice processing
  return gameState;
};
