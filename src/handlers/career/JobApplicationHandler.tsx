
import { Character, GameState } from '../../types/game';

export const handleJobApplication = (
  character: Character,
  action: string,
  data?: any,
  ageHistory?: Record<number, string[]>,
  setAgeHistory?: React.Dispatch<React.SetStateAction<Record<number, string[]>>>,
  onGameStateChange?: (newState: any) => void,
  gameState?: any,
  toast?: any
) => {
  let updatedCharacter = { ...character };

  switch (action) {
    case 'join_job':
      if (data?.job) {
        updatedCharacter.job = data.job.name;
        updatedCharacter.salary = data.job.salary;
        toast?.({
          title: "Career",
          description: `Started new job as a ${data.job.name} earning $${data.job.salary}`,
        });
      }
      break;

    case 'quit_job':
      updatedCharacter.job = undefined;
      updatedCharacter.salary = undefined;
      toast?.({
        title: "Career",
        description: 'You quit your job.',
      });
      break;

    case 'get_raise':
      if (data?.raise) {
        updatedCharacter.salary = (updatedCharacter.salary || 0) + data.raise;
        toast?.({
          title: "Career",
          description: `Received a raise of $${data.raise}!`,
        });
      }
      break;

    default:
      return;
  }

  if (onGameStateChange && gameState) {
    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });
  }
};
