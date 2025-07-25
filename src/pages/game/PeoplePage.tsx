
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Character, GameState } from '../../types/game';
import { PeoplePage as PeoplePageComponent } from '../../components/game/mobile/pages/PeoplePage';
import { MobileNavigation } from '../../components/game/mobile/MobileNavigation';
import { EventOverlay } from '../../components/EventOverlay';
import useGameLogic from '../../hooks/useGameLogic';

const GamePeoplePage: React.FC = () => {
  const [, setLocation] = useLocation();
  
  // Get game state from localStorage
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('gameState');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.eventTracker) {
        parsed.eventTracker.triggeredEvents = new Set(parsed.eventTracker.triggeredEvents || []);
        parsed.eventTracker.eventCooldowns = new Map(parsed.eventTracker.eventCooldowns || []);
      }
      return parsed;
    }
    // Redirect to home if no game state
    setLocation('/');
    return null;
  });

  const {
    showEventOverlay,
    setShowEventOverlay,
    handleChoice,
    handleCharacterUpdate,
    handleEvent
  } = useGameLogic({ gameState: gameState!, onGameStateChange: setGameState });

  useEffect(() => {
    if (gameState) {
      const stateToSave = {
        ...gameState,
        eventTracker: {
          ...gameState.eventTracker,
          triggeredEvents: Array.from(gameState.eventTracker.triggeredEvents),
          eventCooldowns: Array.from(gameState.eventTracker.eventCooldowns.entries())
        }
      };
      localStorage.setItem('gameState', JSON.stringify(stateToSave));
    }
  }, [gameState]);

  const handlePageChange = (page: 'life' | 'people' | 'world' | 'actions') => {
    switch (page) {
      case 'life':
        setLocation('/game/life');
        break;
      case 'people':
        setLocation('/game/people');
        break;
      case 'world':
        setLocation('/game/world');
        break;
      case 'actions':
        setLocation('/game/actions');
        break;
    }
  };

  if (!gameState) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-hidden">
        <PeoplePageComponent
          character={gameState.character}
          gameState={gameState}
          onCharacterUpdate={handleCharacterUpdate}
          onEvent={handleEvent}
          onClose={() => setLocation('/game/life')}
        />
      </div>

      <MobileNavigation
        currentPage="people"
        onPageChange={handlePageChange}
        character={gameState.character}
      />

      {showEventOverlay && gameState.currentEvent && (
        <EventOverlay
          event={gameState.currentEvent}
          onChoice={handleChoice}
          onClose={() => setShowEventOverlay(false)}
        />
      )}
    </div>
  );
};

export default GamePeoplePage;
