
import React, { useState } from 'react';
import { GameBoard } from '@/components/GameBoard';
import { GameState, Character } from '@/types/game';
import { createCharacter } from '@/utils/gameUtils';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const character = createCharacter();
    return {
      character,
      currentEvent: null,
      gameStarted: false,
      gameOver: false,
      eventHistory: [],
      achievements: [],
      eventTracker: {
        triggeredEvents: new Set(),
        lastEventAge: 0,
        eventCooldowns: new Map()
      }
    };
  });

  return <GameBoard gameState={gameState} onGameStateChange={setGameState} />;
};

export default Index;
