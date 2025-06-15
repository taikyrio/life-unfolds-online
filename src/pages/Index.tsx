
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import SplashScreen from "../components/SplashScreen";
import { generateRandomName } from "../utils/gameUtils";
import { createCharacter } from "../utils/characterUtils";
import { GameState } from "../types/game";

const Index = () => {
  const [, setLocation] = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const [hasExistingGame, setHasExistingGame] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gameState');
    setHasExistingGame(!!saved);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const startNewGame = () => {
    // Generate random character
    const randomName = generateRandomName();
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomDay = Math.floor(Math.random() * 28) + 1;
    
    const newCharacter = createCharacter(randomName, randomMonth, randomDay);
    
    // Create initial game state
    const initialGameState: GameState = {
      character: newCharacter,
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
    
    // Save to localStorage
    const stateToSave = {
      ...initialGameState,
      eventTracker: {
        ...initialGameState.eventTracker,
        triggeredEvents: Array.from(initialGameState.eventTracker.triggeredEvents),
        eventCooldowns: Array.from(initialGameState.eventTracker.eventCooldowns.entries())
      }
    };
    
    localStorage.setItem('gameState', JSON.stringify(stateToSave));
    setLocation('/game/life');
  };

  const continueGame = () => {
    setLocation('/game/life');
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/20 backdrop-blur-xl border-white/10 text-white rounded-3xl p-8 border">
        <div className="text-center pb-6">
          <div className="text-6xl mb-4">🎭</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Life Unfolds
          </h1>
          <p className="text-white/70 mt-2">
            Live your virtual life, make choices, and see how your story unfolds
          </p>
        </div>
        
        <div className="space-y-4">
          {hasExistingGame ? (
            <>
              <button 
                onClick={continueGame}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 text-lg rounded-2xl font-medium transition-all duration-200 hover:scale-105"
              >
                Continue Game
              </button>
              
              <button 
                onClick={startNewGame}
                className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl border transition-all duration-200 hover:scale-105"
              >
                Start New Game
              </button>
            </>
          ) : (
            <button 
              onClick={startNewGame}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg rounded-2xl font-medium transition-all duration-200 hover:scale-105"
            >
              Start New Life
            </button>
          )}
          
          <div className="text-center text-sm text-white/50 pt-4">
            <p>Your choices shape your virtual destiny</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
