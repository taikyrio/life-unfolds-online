
import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { GameHeader } from '../game/GameHeader';
import { StatsPanel } from '../game/StatsPanel';
import { AgeUpButton } from '../game/AgeUpButton';
import { BottomNavigation } from '../navigation/BottomNavigation';
import { LifeTimeline } from '../game/LifeTimeline';

export function GameScreen() {
  const { state } = useGame();

  if (!state.character) return null;

  return (
    <div className="min-h-screen bg-ios-background flex flex-col ios-safe-area-top">
      {/* Header */}
      <GameHeader character={state.character} />
      
      {/* Stats Panel */}
      <StatsPanel character={state.character} />
      
      {/* Main Content */}
      <div className="flex-1 px-4 pb-4">
        <LifeTimeline events={state.character.lifeEvents} />
      </div>
      
      {/* Age Up Button */}
      <div className="px-4 pb-4">
        <AgeUpButton />
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
