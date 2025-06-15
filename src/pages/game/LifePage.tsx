
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Character, GameState } from '../../types/game';
import { LifePage as LifePageComponent } from '../../components/game/mobile/pages/LifePage';
import { MobileNavigation } from '../../components/game/mobile/MobileNavigation';
import { EventOverlay } from '../../components/EventOverlay';
import useGameLogic from '../../hooks/useGameLogic';

const GameLifePage: React.FC = () => {
  const [, setLocation] = useLocation();
  
  // Initialize game state - in a real app, this would come from a global state manager
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('gameState');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert Sets and Maps back from their serialized form
      if (parsed.eventTracker) {
        parsed.eventTracker.triggeredEvents = new Set(parsed.eventTracker.triggeredEvents || []);
        parsed.eventTracker.eventCooldowns = new Map(parsed.eventTracker.eventCooldowns || []);
      }
      return parsed;
    }
    
    return {
      character: {
        id: '1',
        name: 'Alex Smith',
        gender: 'male' as const,
        age: 18,
        health: 100,
        happiness: 80,
        smarts: 75,
        looks: 70,
        wealth: 5,
        relationships: 60,
        achievements: [],
        assets: [],
        children: [],
        fame: 0,
        familyMembers: [],
        lifeEvents: [],
        personalityTraits: {
          kindness: 70,
          intelligence: 75,
          humor: 65,
          ambition: 80,
          honesty: 75,
          empathy: 70,
          creativity: 60,
          confidence: 65,
          patience: 55,
          loyalty: 80,
          analytical: 70,
          adventurous: 60,
          cautious: 50
        }
      },
      currentEvent: null,
      gameStarted: true,
      gameOver: false,
      eventHistory: [],
      achievements: [],
      eventTracker: {
        triggeredEvents: new Set(),
        lastEventAge: 0,
        eventCooldowns: new Map(),
        choiceHistory: []
      }
    };
  });

  const {
    ageHistory,
    showEventOverlay,
    setShowEventOverlay,
    ageUp,
    handleChoice
  } = useGameLogic({ gameState, onGameStateChange: setGameState });

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      ...gameState,
      eventTracker: {
        ...gameState.eventTracker,
        triggeredEvents: Array.from(gameState.eventTracker.triggeredEvents),
        eventCooldowns: Array.from(gameState.eventTracker.eventCooldowns.entries())
      }
    };
    localStorage.setItem('gameState', JSON.stringify(stateToSave));
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

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-hidden">
        <LifePageComponent
          character={gameState.character}
          ageHistory={ageHistory}
          onAgeUp={ageUp}
        />
      </div>

      <MobileNavigation
        currentPage="life"
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

export default GameLifePage;
