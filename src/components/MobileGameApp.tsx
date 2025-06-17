
import React from 'react';
import { useGame } from '../contexts/GameContext';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { GameScreen } from './screens/GameScreen';
import { EventScreen } from './screens/EventScreen';

export function MobileGameApp() {
  const { state } = useGame();

  if (!state.isGameStarted) {
    return <WelcomeScreen />;
  }

  if (state.currentEvent) {
    return <EventScreen />;
  }

  return <GameScreen />;
}
