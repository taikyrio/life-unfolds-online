

import { useState } from 'react';
import { GameState } from '../types/game';

interface UseGameStateProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
}

export function useGameState({ gameState, onGameStateChange }: UseGameStateProps) {
  const [ageHistory, setAgeHistory] = useState<Record<number, string[]>>({});
  const [showEventOverlay, setShowEventOverlay] = useState(false);

  return {
    ageHistory,
    setAgeHistory,
    showEventOverlay,
    setShowEventOverlay
  };
}

