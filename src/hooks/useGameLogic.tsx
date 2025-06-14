
import { useToast } from '@/hooks/use-toast';
import { GameState } from '../types/game';
import { useGameState } from './useGameState';
import { useEducationAutoEnroll } from './useEducationAutoEnroll';
import { useGameActions } from './useGameActions';

interface UseGameLogicProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
}

export function useGameLogic({ gameState, onGameStateChange }: UseGameLogicProps) {
  const { toast } = useToast();

  const {
    ageHistory,
    setAgeHistory,
    showEventOverlay,
    setShowEventOverlay
  } = useGameState({ gameState, onGameStateChange });

  // Pass the required arguments to useEducationAutoEnroll
  useEducationAutoEnroll({
    gameState,
    onGameStateChange,
    ageHistory,
    setAgeHistory
  });

  const gameActions = useGameActions({
    gameState,
    onGameStateChange,
    ageHistory,
    setAgeHistory,
    toast
  });

  // Add missing handler methods as placeholders
  const handleCharacterUpdate = (character: any) => {
    onGameStateChange({
      ...gameState,
      character
    });
  };

  const handleEvent = (message: string) => {
    const newAgeHistory = { ...ageHistory };
    if (!newAgeHistory[gameState.character.age]) {
      newAgeHistory[gameState.character.age] = [];
    }
    newAgeHistory[gameState.character.age].push(message);
    setAgeHistory(newAgeHistory);
  };

  const handleCareerAction = (action: string, data?: any) => {
    // Placeholder for career actions
    console.log('Career action:', action, data);
  };

  const handleEducationAction = (action: string, data?: any) => {
    // Placeholder for education actions
    console.log('Education action:', action, data);
  };

  const handleHealthAction = (action: string, data?: any) => {
    // Placeholder for health actions
    console.log('Health action:', action, data);
  };

  const handleLifestyleAction = (action: string, data?: any) => {
    // Placeholder for lifestyle actions
    console.log('Lifestyle action:', action, data);
  };

  const handleRelationshipAction = (action: string, data?: any) => {
    // Placeholder for relationship actions
    console.log('Relationship action:', action, data);
  };

  return {
    ageHistory,
    showEventOverlay,
    setShowEventOverlay,
    ageUp: gameActions.handleAgeUp, // Rename to match expected interface
    handleChoice: gameActions.handleChoice,
    handleActivity: gameActions.handleActivity,
    handleCharacterUpdate,
    handleEvent,
    handleCareerAction,
    handleEducationAction,
    handleHealthAction,
    handleLifestyleAction,
    handleRelationshipAction,
    currentEvent: gameActions.currentEvent,
    setCurrentEvent: gameActions.setCurrentEvent
  };
}

export default useGameLogic;
