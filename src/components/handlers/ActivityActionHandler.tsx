
import { Character } from '../../types/game';

const getActivityEvent = (action: string, character: Character) => {
  // Simple activity event check - can be expanded later
  return null;
};

export const handleActivityAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: { age: number; events: string[] }[],
  setAgeHistory: (history: { age: number; events: string[] }[]) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any
) => {
  let updatedCharacter = { ...character };
  let message = '';
  const existingEntry = ageHistory.find(entry => entry.age === updatedCharacter.age);
  let ageEvents = existingEntry ? existingEntry.events : [];

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
      if (character.age <= 2) {
        message = 'You watched colorful cartoons with big eyes, clapping your hands at the funny sounds and bright colors!';
      } else {
        message = 'You laughed out loud at your favorite cartoon characters and learned some new words from the songs!';
      }
      break;

    case 'nap':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 10);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 5);
      if (character.age <= 2) {
        message = 'You curled up with your favorite blanket and had the most peaceful nap, dreaming of fluffy clouds.';
      } else {
        message = 'Even though you tried to stay awake, you dozed off and woke up feeling refreshed and ready to play!';
      }
      break;

    case 'crawl_explore':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 5);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 8);
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 3);
      message = 'You crawled around the house, discovering new corners and textures. Everything felt like an adventure!';
      break;

    case 'babble_talk':
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 5);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 6);
      if (character.age <= 2) {
        message = 'You made lots of adorable sounds like "ba-ba" and "ma-ma," and everyone smiled when they heard you!';
      } else {
        message = 'You practiced saying new words and even tried to tell a story. Your family was so proud of your progress!';
      }
      break;

    case 'peek_a_boo':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 12);
      updatedCharacter.relationships = Math.min(100, updatedCharacter.relationships + 5);
      message = 'You played peek-a-boo and burst into giggles every time someone appeared! It was the best game ever!';
      break;

    case 'stack_blocks':
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 6);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 7);
      message = 'You carefully stacked colorful blocks into a tall tower, then knocked it down with glee! Building was so much fun!';
      break;

    case 'finger_paint':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 10);
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 3);
      message = 'You got paint all over your hands and created a beautiful (messy) masterpiece! Art time was the best time!';
      break;

    case 'listen_stories':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 8);
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 4);
      message = 'You listened with wide eyes as someone read you a magical story about brave animals and faraway lands!';
      break;

    // School age and older activities
    case 'study_harder':
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 8);
      updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 3);
      if (character.age <= 10) {
        message = 'You focused really hard on your picture books and practicing your letters. Your teacher would be so proud!';
      } else if (character.age <= 15) {
        message = 'You spent extra time on your homework and discovered something fascinating in your textbooks!';
      } else {
        message = 'You pushed through challenging material and felt your understanding deepen with each page you studied.';
      }
      break;

    case 'workout':
    case 'gym':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 10);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 5);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 20);
      if (character.age <= 15) {
        message = 'You ran around the playground and did jumping jacks until you were out of breath but smiling!';
      } else {
        message = 'You pushed yourself through an intense workout, feeling your muscles work and your endurance improve!';
      }
      break;

    case 'socialize':
    case 'hang_friends':
      updatedCharacter.relationships = Math.min(100, (updatedCharacter.relationships || 0) + 12);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 10);
      if (character.age <= 10) {
        message = 'You made a new friend at the playground and played games together until it was time to go home!';
      } else if (character.age <= 17) {
        message = 'You hung out with your friends, sharing jokes and secrets that made you feel understood and happy!';
      } else {
        message = 'You had meaningful conversations with friends over coffee, strengthening bonds that will last a lifetime.';
      }
      break;

    case 'meditation':
    case 'meditate':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 15);
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 5);
      if (character.age <= 15) {
        message = 'You sat quietly and focused on your breathing, feeling calm and peaceful like a still pond.';
      } else {
        message = 'You found inner peace through meditation, letting go of stress and embracing the present moment.';
      }
      break;

    case 'party':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 8);
      updatedCharacter.health = Math.max(0, updatedCharacter.health - 3);
      updatedCharacter.relationships = Math.min(100, (updatedCharacter.relationships || 0) + 5);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 40);
      if (character.age <= 17) {
        message = 'You danced, laughed, and celebrated with friends at an amazing party that you\'ll remember forever!';
      } else {
        message = 'You partied hard, made new connections, and had an unforgettable night out on the town!';
      }
      break;

    case 'volunteer':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 8);
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 3);
      updatedCharacter.relationships = Math.min(100, (updatedCharacter.relationships || 0) + 10);
      if (character.age <= 15) {
        message = 'You helped clean up the local park and felt proud knowing you made your community a better place!';
      } else {
        message = 'You spent time helping others and discovered that giving back brought you more joy than you expected.';
      }
      break;

    case 'movie':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 6);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 15);
      if (character.age <= 10) {
        message = 'You watched an exciting movie with popcorn, cheering for the heroes and hiding during scary parts!';
      } else {
        message = 'You enjoyed a captivating film that transported you to another world for a few magical hours.';
      }
      break;

    case 'shopping':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 7);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 50);
      if (character.age <= 15) {
        message = 'You picked out some cool new clothes and felt excited to show them off to your friends!';
      } else {
        message = 'You treated yourself to something special and enjoyed the satisfaction of finding exactly what you wanted.';
      }
      break;

    default:
      // Generic activity handler with contextual feedback
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 5);
      if (character.age <= 5) {
        message = `You had such a fun time doing ${action.replace('_', ' ')}! It made you giggle and feel happy!`;
      } else if (character.age <= 15) {
        message = `You enjoyed ${action.replace('_', ' ')} and felt accomplished when you finished!`;
      } else {
        message = `You completed ${action.replace('_', ' ')} and felt satisfied with your progress.`;
      }
      break;
  }

  if (message) {
    ageEvents.push(message);
    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = ageEvents;
    setAgeHistory(newAgeHistory);

    toast({
      title: "Activity Complete",
      description: message,
    });
  }

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};
