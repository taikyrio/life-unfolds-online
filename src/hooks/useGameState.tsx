
import { useState, useEffect } from 'react';
import { GameState } from '../types/game';

interface UseGameStateProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
}

export function useGameState({ gameState, onGameStateChange }: UseGameStateProps) {
  const [ageHistory, setAgeHistory] = useState<Record<number, string[]>>({});
  const [showEventOverlay, setShowEventOverlay] = useState(false);

  useEffect(() => {
    if (!gameState.gameStarted) {
      onGameStateChange({
        ...gameState,
        gameStarted: true,
        character: gameState.character,
        eventTracker: {
          triggeredEvents: new Set(),
          lastEventAge: 0,
          eventCooldowns: new Map(),
          choiceHistory: []
        }
      });
    }
  }, [gameState, onGameStateChange]);

  useEffect(() => {
    setShowEventOverlay(!!gameState.currentEvent);
  }, [gameState.currentEvent]);

  // Ensure ageHistory is always an object
  useEffect(() => {
    if (Array.isArray(ageHistory)) {
      setAgeHistory({});
    }
  }, [ageHistory]);

  return {
    ageHistory,
    setAgeHistory,
    showEventOverlay,
    setShowEventOverlay
  };
}
