
import { Character } from '../types/game';

export const handleMoneyAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any
) => {
  let updatedCharacter = { ...character };
  let message = '';
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  switch (action) {
    case 'invest':
      const investAmount = data?.amount || 100;
      if (updatedCharacter.wealth >= investAmount) {
        updatedCharacter.wealth -= investAmount;
        const return_rate = Math.random() * 0.2 + 0.05; // 5-25% return
        const profit = Math.floor(investAmount * return_rate);
        updatedCharacter.wealth += investAmount + profit;
        message = `You invested $${investAmount}k and earned $${profit}k profit!`;
      } else {
        message = 'You don\'t have enough money to invest.';
      }
      break;
    case 'gamble':
      const betAmount = data?.amount || 50;
      if (updatedCharacter.wealth >= betAmount) {
        updatedCharacter.wealth -= betAmount;
        if (Math.random() < 0.4) { // 40% chance to win
          const winnings = betAmount * 2;
          updatedCharacter.wealth += winnings;
          message = `You won $${winnings}k gambling!`;
        } else {
          message = `You lost $${betAmount}k gambling.`;
        }
      } else {
        message = 'You don\'t have enough money to gamble.';
      }
      break;
    default:
      message = `You completed ${action} money activity.`;
      break;
  }

  if (message) {
    ageEvents.push(message);
    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = ageEvents;
    setAgeHistory(newAgeHistory);

    toast({
      title: "Money Update",
      description: message,
    });
  }

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};
