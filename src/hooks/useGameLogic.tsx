
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

  return {
    ageHistory,
    showEventOverlay,
    setShowEventOverlay,
    ...gameActions
  };
}

export default useGameLogic;
