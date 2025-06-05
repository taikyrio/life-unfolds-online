import React from 'react';
import { Character } from '../types/character';
import { Activity } from '../types/activities';
import { processActivityAction } from './activityActions';

interface ActivityActionHandlerProps {
  character: Character;
  activity: Activity;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
  onReturnToLife?: () => void;
  onGoToPrison?: () => void;
}

export const ActivityActionHandler: React.FC<ActivityActionHandlerProps> = ({
  character,
  activity,
  onCharacterUpdate,
  onEvent,
  onReturnToLife,
  onGoToPrison
}) => {
  const handleActivityAction = () => {
    const result = processActivityAction(character, activity);

    onCharacterUpdate(result.character);
    onEvent(result.message);

    if (result.shouldGoToPrison && onGoToPrison) {
      setTimeout(() => {
        onGoToPrison();
      }, 2000);
    } else if (result.shouldReturnToLife && onReturnToLife) {
      setTimeout(() => {
        onReturnToLife();
      }, 2000);
    }
  };

  const isCrime = Boolean(activity.consequences?.arrestChance);
  const isUnderage = isCrime && character.age < 18;

  return (
    <button
      onClick={handleActivityAction}
      disabled={isUnderage}
      className={`w-full px-4 py-2 rounded-lg transition-colors ${
        isUnderage 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : isCrime 
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
    >
      {isUnderage ? `${activity.name} (Age 18+ Required)` : activity.name}
      {isCrime && !isUnderage && (
        <span className="block text-xs opacity-80">
          {activity.consequences?.arrestChance}% arrest chance
        </span>
      )}
    </button>
  );
};

const getActivityEvent = (action: string, character: Character) => {
  // Simple activity event check - can be expanded later
  return null;
};

export const handleActivityAction = (
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

  // Check if this activity has a special event
  const activityEvent = getActivityEvent(action, character);

  if (activityEvent) {
    // Set the event in game state to show the event overlay
    onGameStateChange({
      ...gameState,
      character: updatedCharacter,
      currentEvent: activityEvent
    });
    return;
  }

  // Handle basic activities with story-driven feedback
  switch (action) {
    // Early childhood activities (1-5 years)
    case 'play_toys':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 10);
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 2);
      if (character.age <= 3) {
        message = 'You spent hours playing with your favorite toys, giggling as you made them dance and talk. Your imagination ran wild!';
      } else {
        message = 'You built an amazing castle with your blocks and created stories about brave knights. Playing felt magical!';
      }
      break;

    case 'watch_cartoons':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 8);
      message = character.age <= 5 ? 
        'You watched colorful cartoons and laughed at the funny characters on screen!' :
        'You enjoyed your favorite animated shows and learned about friendship and adventure.';
      break;

    case 'peek_a_boo':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 15);
      message = 'You played peek-a-boo and burst into giggles every time someone appeared! It was the best game ever!';
      break;

    // Mind & Body activities
    case 'read_books':
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 8);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 5);
      if (character.age <= 8) {
        message = 'You read picture books and learned new words. The stories took you to magical places!';
      } else {
        message = 'You dove into fascinating books, expanding your knowledge and imagination with every page.';
      }
      break;

    case 'study_harder':
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 12);
      updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 5);
      message = 'You put in extra study time and felt your knowledge growing, though it was tiring work.';
      break;

    case 'meditation':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 10);
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 5);
      message = 'You found peace in meditation, clearing your mind and feeling more centered.';
      break;

    case 'gym':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 15);
      updatedCharacter.looks = Math.min(100, updatedCharacter.looks + 8);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 30);
      message = 'You had an intense workout session, building strength and feeling great about your progress!';
      break;

    case 'yoga':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 10);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 8);
      message = 'You practiced yoga poses and felt your flexibility and inner peace improve.';
      break;

    case 'martial_arts':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 12);
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 5);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 50);
      message = 'You learned martial arts techniques, building discipline, strength, and self-defense skills.';
      break;

    // Social activities
    case 'playground':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 12);
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 8);
      message = 'You had a blast at the playground, running around and making new friends on the swings and slides!';
      break;

    case 'make_friends':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 15);
      message = 'You met someone new and hit it off immediately. You exchanged contacts and made plans to hang out!';
      break;

    case 'hang_friends':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 10);
      message = 'You spent quality time with your friends, sharing laughs and creating wonderful memories together.';
      break;

    // Entertainment activities
    case 'movie':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 12);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 15);
      message = 'You watched an entertaining movie and enjoyed escaping into the story for a few hours.';
      break;

    case 'video_games':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 15);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 20);
      message = 'You had an epic gaming session, achieving new high scores and having a blast!';
      break;

    case 'shopping':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 15);
      updatedCharacter.looks = Math.min(100, updatedCharacter.looks + 5);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 100);
      message = 'You went shopping and treated yourself to some nice new things that made you feel great!';
      break;

    // Criminal activities
    case 'pickpocket':
      const pickpocketSuccess = Math.random() > 0.3;
      if (pickpocketSuccess) {
        const stolenAmount = Math.floor(Math.random() * 200) + 50;
        updatedCharacter.wealth += stolenAmount;
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 10);
        message = `You successfully pickpocketed $${stolenAmount} without being noticed. Your heart was racing!`;
      } else {
        updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 20);
        message = 'You were caught trying to pickpocket someone! Security escorted you away and you felt embarrassed.';
      }
      break;

    case 'shoplift':
      const shopliftSuccess = Math.random() > 0.4;
      if (shopliftSuccess) {
        const itemValue = Math.floor(Math.random() * 150) + 25;
        updatedCharacter.wealth += itemValue;
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 8);
        message = `You successfully shoplifted items worth $${itemValue}. You got away clean but felt nervous.`;
      } else {
        updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 25);
        message = 'Store security caught you shoplifting! You were banned from the store and felt ashamed.';
      }
      break;

    default:
      message = `You tried to ${action.replace('_', ' ')} but nothing interesting happened.`;
      break;
  }

  // Add the activity message to age history for life story logging
  if (message) {
    const currentEvents = ageHistory[updatedCharacter.age] || [];
    setAgeHistory({
      ...ageHistory,
      [updatedCharacter.age]: [...currentEvents, message]
    });
  }

  // Update the game state with the new character
  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};