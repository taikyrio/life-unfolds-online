import { useState, useEffect } from 'react';
import { GameState } from '../types/game';
import { gameLogger } from '../utils/gameLogger';

interface UseGameStateProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
}

export function useGameState({ gameState, onGameStateChange }: UseGameStateProps) {
  const [ageHistory, setAgeHistory] = useState<Record<number, string[]>>({});
  const [showEventOverlay, setShowEventOverlay] = useState(false);

  // Load age history when character changes
  useEffect(() => {
    if (gameState.character?.id) {
      // Initialize character in logger if needed
      if (!gameLogger.getCurrentCharacterId() || gameLogger.getCurrentCharacterId() !== gameState.character.id) {
        gameLogger.initializeCharacter(
          gameState.character.id, 
          gameState.character.name, 
          gameState.character.birthYear || new Date().getFullYear() - gameState.character.age
        );
      }
      gameLogger.loadCharacter(gameState.character.id);
      const savedAgeHistory = gameLogger.loadAgeHistory();
      setAgeHistory(savedAgeHistory);
    }
  }, [gameState.character?.id]);

  // Save age history whenever it changes and log all events
  const updateAgeHistory = (newAgeHistory: Record<number, string[]>) => {
    setAgeHistory(newAgeHistory);
    if (gameState.character?.id) {
      // Ensure all ages from 0 to current age have entries
      const currentAge = gameState.character.age;
      const completeAgeHistory = { ...newAgeHistory };
      
      for (let age = 0; age <= currentAge; age++) {
        if (!completeAgeHistory[age]) {
          completeAgeHistory[age] = [];
          
          // Add a default event for missing ages
          if (age === 0) {
            completeAgeHistory[age].push('👶 You were born into this world!');
          } else {
            completeAgeHistory[age].push(`📅 You turned ${age} years old.`);
          }
        }
      }
      
      // Log all new events to gameLogger
      Object.entries(completeAgeHistory).forEach(([age, events]) => {
        const ageNum = Number(age);
        const existingEvents = gameLogger.getEventsByAge(ageNum);
        const existingEventTexts = existingEvents.map(e => e.event);
        
        events.forEach(event => {
          // Only log if this event hasn't been logged yet
          if (!existingEventTexts.includes(event)) {
            gameLogger.logEvent({
              age: ageNum,
              year: (gameState.character?.birthYear || new Date().getFullYear() - gameState.character?.age || 0) + ageNum,
              event: event,
              category: 'achievement' // Default category
            });
          }
        });
      });
      
      // Update state with complete age history
      if (JSON.stringify(completeAgeHistory) !== JSON.stringify(newAgeHistory)) {
        setAgeHistory(completeAgeHistory);
      }
      
      gameLogger.saveAgeHistory(completeAgeHistory);
    }
  };

  return {
    ageHistory,
    setAgeHistory: updateAgeHistory,
    showEventOverlay,
    setShowEventOverlay
  };
}