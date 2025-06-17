
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Character, LifeEvent, GameEvent } from '../types/core';
import { GameEngine } from '../core/GameEngine';
import { SaveManager } from '../core/SaveManager';

interface GameState {
  character: Character | null;
  currentEvent: GameEvent | null;
  isGameStarted: boolean;
  isLoading: boolean;
  saveSlots: any[];
}

interface GameContextType {
  state: GameState;
  actions: {
    startNewGame: (character: Partial<Character>) => void;
    ageUp: () => void;
    makeChoice: (choiceId: string) => void;
    saveGame: (slot: number) => void;
    loadGame: (slot: number) => void;
    resetGame: () => void;
  };
}

const GameContext = createContext<GameContextType | null>(null);

type GameAction = 
  | { type: 'START_GAME'; payload: Character }
  | { type: 'AGE_UP'; payload: { character: Character; event?: GameEvent } }
  | { type: 'SET_EVENT'; payload: GameEvent | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET_GAME' };

const initialState: GameState = {
  character: null,
  currentEvent: null,
  isGameStarted: false,
  isLoading: false,
  saveSlots: []
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        character: action.payload,
        isGameStarted: true,
        currentEvent: null
      };
    case 'AGE_UP':
      return {
        ...state,
        character: action.payload.character,
        currentEvent: action.payload.event || null
      };
    case 'SET_EVENT':
      return {
        ...state,
        currentEvent: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'RESET_GAME':
      return {
        ...initialState
      };
    default:
      return state;
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const gameEngine = new GameEngine();
  const saveManager = new SaveManager();

  const actions = {
    startNewGame: (characterData: Partial<Character>) => {
      const character = gameEngine.createCharacter(characterData);
      dispatch({ type: 'START_GAME', payload: character });
    },

    ageUp: () => {
      if (!state.character) return;
      
      const result = gameEngine.ageUp(state.character);
      dispatch({ 
        type: 'AGE_UP', 
        payload: { 
          character: result.character, 
          event: result.event 
        } 
      });
    },

    makeChoice: (choiceId: string) => {
      if (!state.character || !state.currentEvent) return;
      
      const updatedCharacter = gameEngine.processChoice(
        state.character, 
        state.currentEvent, 
        choiceId
      );
      
      dispatch({ 
        type: 'AGE_UP', 
        payload: { character: updatedCharacter } 
      });
      dispatch({ type: 'SET_EVENT', payload: null });
    },

    saveGame: (slot: number) => {
      if (state.character) {
        saveManager.saveGame(state.character, slot);
      }
    },

    loadGame: (slot: number) => {
      const character = saveManager.loadGame(slot);
      if (character) {
        dispatch({ type: 'START_GAME', payload: character });
      }
    },

    resetGame: () => {
      dispatch({ type: 'RESET_GAME' });
    }
  };

  return (
    <GameContext.Provider value={{ state, actions }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
