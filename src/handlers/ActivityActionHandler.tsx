

import { Character, GameState } from '../types/game';
import { FamilyMember } from '../types/relationships';

export const handleActivityAction = (
  character: Character,
  activityId: string,
  activityData: any,
  updateHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (state: GameState) => void,
  gameState: GameState,
  toast: any
) => {
  console.log('Activity action:', activityId, activityData);
  
  let updatedCharacter = { ...character };
  let eventMessage = '';
  let statChanges = {};

  switch (activityId) {
    case 'ask_out':
      const askOutResult = handleAskOut(updatedCharacter);
      updatedCharacter = askOutResult.character;
      eventMessage = askOutResult.message;
      statChanges = askOutResult.statChanges;
      break;

    case 'read_books':
      const readResult = handleReadBooks(updatedCharacter);
      updatedCharacter = readResult.character;
      eventMessage = readResult.message;
      statChanges = readResult.statChanges;
      break;

    case 'gym':
      const gymResult = handleGym(updatedCharacter);
      updatedCharacter = gymResult.character;
      eventMessage = gymResult.message;
      statChanges = gymResult.statChanges;
      break;

    case 'make_friends':
      const friendsResult = handleMakeFriends(updatedCharacter);
      updatedCharacter = friendsResult.character;
      eventMessage = friendsResult.message;
      statChanges = friendsResult.statChanges;
      break;

    case 'find_love':
      const loveResult = handleFindLove(updatedCharacter);
      updatedCharacter = loveResult.character;
      eventMessage = loveResult.message;
      statChanges = loveResult.statChanges;
      break;

    case 'meditation':
      const meditationResult = handleMeditation(updatedCharacter);
      updatedCharacter = meditationResult.character;
      eventMessage = meditationResult.message;
      statChanges = meditationResult.statChanges;
      break;

    case 'party':
      const partyResult = handleParty(updatedCharacter);
      updatedCharacter = partyResult.character;
      eventMessage = partyResult.message;
      statChanges = partyResult.statChanges;
      break;

    case 'coding_practice':
      const codingResult = handleCoding(updatedCharacter);
      updatedCharacter = codingResult.character;
      eventMessage = codingResult.message;
      statChanges = codingResult.statChanges;
      break;

    case 'music_lessons':
      const musicResult = handleMusicLessons(updatedCharacter);
      updatedCharacter = musicResult.character;
      eventMessage = musicResult.message;
      statChanges = musicResult.statChanges;
      break;

    case 'pickpocket':
      const crimeResult = handleCrime(updatedCharacter, 'pickpocket');
      updatedCharacter = crimeResult.character;
      eventMessage = crimeResult.message;
      statChanges = crimeResult.statChanges;
      break;

    default:
      const defaultResult = handleGenericActivity(updatedCharacter, activityId);
      updatedCharacter = defaultResult.character;
      eventMessage = defaultResult.message;
      statChanges = defaultResult.statChanges;
      break;
  }

  // Add event to life history
  if (eventMessage) {
    const currentHistory = gameState.ageHistory || {};
    const ageEvents = currentHistory[character.age] || [];
    const updatedAgeEvents = [...ageEvents, eventMessage];
    const newHistory = {
      ...currentHistory,
      [character.age]: updatedAgeEvents
    };
    
    updateHistory(newHistory);

    // Update game state
    onGameStateChange({
      ...gameState,
      character: updatedCharacter,
      ageHistory: newHistory
    });
  }

  // Show toast with result
  toast({
    title: "Activity Complete",
    description: eventMessage,
  });
};

const handleAskOut = (character: Character) => {
  const success = Math.random() < (character.looks / 100 * 0.6 + character.happiness / 100 * 0.4);
  
  if (success) {
    // Create new girlfriend/boyfriend
    const partnerNames = character.gender === 'male' 
      ? ['Emma', 'Olivia', 'Sophia', 'Isabella', 'Ava', 'Mia', 'Charlotte', 'Abigail']
      : ['Liam', 'Noah', 'William', 'James', 'Logan', 'Benjamin', 'Mason', 'Elijah'];
    
    const partnerName = partnerNames[Math.floor(Math.random() * partnerNames.length)];
    
    const newPartner: FamilyMember = {
      id: `partner_${Date.now()}`,
      name: partnerName,
      relationship: character.gender === 'male' ? 'girlfriend' : 'boyfriend',
      age: character.age + Math.floor(Math.random() * 4) - 2,
      alive: true,
      health: Math.floor(Math.random() * 30) + 70,
      relationshipStats: {
        relationshipLevel: Math.floor(Math.random() * 30) + 50,
        trust: Math.floor(Math.random() * 40) + 40,
        communication: Math.floor(Math.random() * 40) + 40,
        intimacy: Math.floor(Math.random() * 20) + 10,
        conflictResolution: Math.floor(Math.random() * 40) + 30,
        sharedInterests: Math.floor(Math.random() * 50) + 30,
        timeSpentTogether: 0,
        lastInteraction: new Date().toISOString(),
        interactionHistory: [],
        respect: Math.floor(Math.random() * 40) + 40
      },
      relationshipQuality: Math.floor(Math.random() * 30) + 50,
      personality: {
        kindness: Math.floor(Math.random() * 60) + 20,
        loyalty: Math.floor(Math.random() * 60) + 20,
        intelligence: Math.floor(Math.random() * 60) + 20,
        humor: Math.floor(Math.random() * 60) + 20,
        ambition: Math.floor(Math.random() * 60) + 20,
        stability: Math.floor(Math.random() * 60) + 20,
        generosity: Math.floor(Math.random() * 60) + 20
      },
      currentMood: 'happy'
    };

    const updatedCharacter = {
      ...character,
      familyMembers: [...character.familyMembers, newPartner],
      happiness: Math.min(100, character.happiness + 15),
      relationships: Math.min(100, character.relationships + 10)
    };

    return {
      character: updatedCharacter,
      message: `You asked ${partnerName} out and they said yes! You're now in a relationship.`,
      statChanges: { happiness: 15, relationships: 10 }
    };
  } else {
    const updatedCharacter = {
      ...character,
      happiness: Math.max(0, character.happiness - 10)
    };

    return {
      character: updatedCharacter,
      message: "Your attempt to ask someone out was unsuccessful. You feel a bit disappointed.",
      statChanges: { happiness: -10 }
    };
  }
};

const handleReadBooks = (character: Character) => {
  const smartsGain = Math.floor(Math.random() * 8) + 2;
  const updatedCharacter = {
    ...character,
    smarts: Math.min(100, character.smarts + smartsGain),
    happiness: Math.min(100, character.happiness + 3)
  };

  const books = ['a mystery novel', 'a science fiction book', 'a biography', 'a self-help book', 'a classic novel'];
  const book = books[Math.floor(Math.random() * books.length)];

  return {
    character: updatedCharacter,
    message: `You spent time reading ${book}. Your knowledge expanded and you feel more intelligent.`,
    statChanges: { smarts: smartsGain, happiness: 3 }
  };
};

const handleGym = (character: Character) => {
  const healthGain = Math.floor(Math.random() * 10) + 5;
  const looksGain = Math.floor(Math.random() * 5) + 1;
  
  const updatedCharacter = {
    ...character,
    health: Math.min(100, character.health + healthGain),
    looks: Math.min(100, character.looks + looksGain),
    wealth: Math.max(0, character.wealth - 30)
  };

  return {
    character: updatedCharacter,
    message: "You had a great workout at the gym. You feel stronger and more confident about your appearance.",
    statChanges: { health: healthGain, looks: looksGain, wealth: -30 }
  };
};

const handleMakeFriends = (character: Character) => {
  const success = Math.random() < 0.7;
  
  if (success) {
    const friendNames = ['Alex', 'Jordan', 'Casey', 'Riley', 'Taylor', 'Morgan', 'Avery', 'Quinn'];
    const friendName = friendNames[Math.floor(Math.random() * friendNames.length)];
    
    const newFriend: FamilyMember = {
      id: `friend_${Date.now()}`,
      name: friendName,
      relationship: 'friend',
      age: character.age + Math.floor(Math.random() * 6) - 3,
      alive: true,
      health: Math.floor(Math.random() * 30) + 70,
      relationshipStats: {
        relationshipLevel: Math.floor(Math.random() * 40) + 40,
        trust: Math.floor(Math.random() * 50) + 30,
        communication: Math.floor(Math.random() * 50) + 30,
        intimacy: 0,
        conflictResolution: Math.floor(Math.random() * 40) + 30,
        sharedInterests: Math.floor(Math.random() * 60) + 40,
        timeSpentTogether: 0,
        lastInteraction: new Date().toISOString(),
        interactionHistory: [],
        respect: Math.floor(Math.random() * 50) + 30
      },
      relationshipQuality: Math.floor(Math.random() * 40) + 40,
      personality: {
        kindness: Math.floor(Math.random() * 60) + 20,
        loyalty: Math.floor(Math.random() * 60) + 20,
        intelligence: Math.floor(Math.random() * 60) + 20,
        humor: Math.floor(Math.random() * 60) + 20,
        ambition: Math.floor(Math.random() * 60) + 20,
        stability: Math.floor(Math.random() * 60) + 20,
        generosity: Math.floor(Math.random() * 60) + 20
      },
      currentMood: 'friendly'
    };

    const updatedCharacter = {
      ...character,
      familyMembers: [...character.familyMembers, newFriend],
      happiness: Math.min(100, character.happiness + 10),
      relationships: Math.min(100, character.relationships + 8)
    };

    return {
      character: updatedCharacter,
      message: `You made a new friend named ${friendName}! You hit it off immediately and exchanged contact information.`,
      statChanges: { happiness: 10, relationships: 8 }
    };
  } else {
    return {
      character,
      message: "You tried to make new friends but didn't quite connect with anyone today. Maybe next time!",
      statChanges: {}
    };
  }
};

const handleFindLove = (character: Character) => {
  if (character.age < 16) {
    return {
      character,
      message: "You're still young for serious relationships. Focus on friendships for now.",
      statChanges: {}
    };
  }

  const success = Math.random() < (character.looks / 100 * 0.4 + character.happiness / 100 * 0.3 + character.relationships / 100 * 0.3);
  
  if (success) {
    return handleAskOut(character);
  } else {
    const updatedCharacter = {
      ...character,
      happiness: Math.max(0, character.happiness - 5)
    };

    return {
      character: updatedCharacter,
      message: "You went looking for love but didn't find the right person. Don't give up!",
      statChanges: { happiness: -5 }
    };
  }
};

const handleMeditation = (character: Character) => {
  const happinessGain = Math.floor(Math.random() * 12) + 8;
  const healthGain = Math.floor(Math.random() * 5) + 2;
  
  const updatedCharacter = {
    ...character,
    happiness: Math.min(100, character.happiness + happinessGain),
    health: Math.min(100, character.health + healthGain)
  };

  return {
    character: updatedCharacter,
    message: "You spent time in peaceful meditation. Your mind feels clearer and more at ease.",
    statChanges: { happiness: happinessGain, health: healthGain }
  };
};

const handleParty = (character: Character) => {
  const happinessGain = Math.floor(Math.random() * 15) + 10;
  const healthLoss = Math.floor(Math.random() * 8) + 2;
  const wealthLoss = Math.floor(Math.random() * 50) + 25;
  
  const updatedCharacter = {
    ...character,
    happiness: Math.min(100, character.happiness + happinessGain),
    health: Math.max(0, character.health - healthLoss),
    wealth: Math.max(0, character.wealth - wealthLoss)
  };

  return {
    character: updatedCharacter,
    message: "You had an amazing time at the party! You met lots of people but feel a bit tired and spent some money.",
    statChanges: { happiness: happinessGain, health: -healthLoss, wealth: -wealthLoss }
  };
};

const handleCoding = (character: Character) => {
  const smartsGain = Math.floor(Math.random() * 10) + 5;
  
  const updatedCharacter = {
    ...character,
    smarts: Math.min(100, character.smarts + smartsGain),
    happiness: Math.min(100, character.happiness + 5)
  };

  return {
    character: updatedCharacter,
    message: "You practiced coding and learned new programming concepts. Your technical skills are improving!",
    statChanges: { smarts: smartsGain, happiness: 5 }
  };
};

const handleMusicLessons = (character: Character) => {
  const happinessGain = Math.floor(Math.random() * 8) + 5;
  const smartsGain = Math.floor(Math.random() * 5) + 2;
  const wealthLoss = 50;
  
  const updatedCharacter = {
    ...character,
    happiness: Math.min(100, character.happiness + happinessGain),
    smarts: Math.min(100, character.smarts + smartsGain),
    wealth: Math.max(0, character.wealth - wealthLoss)
  };

  const instruments = ['piano', 'guitar', 'violin', 'drums', 'flute'];
  const instrument = instruments[Math.floor(Math.random() * instruments.length)];

  return {
    character: updatedCharacter,
    message: `You took ${instrument} lessons and learned some beautiful new pieces. Music brings joy to your life!`,
    statChanges: { happiness: happinessGain, smarts: smartsGain, wealth: -wealthLoss }
  };
};

const handleCrime = (character: Character, crimeType: string) => {
  const success = Math.random() < 0.6;
  const arrested = Math.random() < 0.2;
  
  const currentRecord = character.criminalRecord || {
    arrests: 0,
    convictions: 0,
    prisonTime: 0,
    crimes: [],
    notoriety: 0,
    totalSentence: 0,
    currentlyIncarcerated: false,
    charges: [],
    timeServed: 0,
    isIncarcerated: false
  };
  
  if (arrested) {
    const updatedCharacter = {
      ...character,
      happiness: Math.max(0, character.happiness - 20),
      health: Math.max(0, character.health - 10),
      criminalRecord: {
        ...currentRecord,
        arrests: currentRecord.arrests + 1,
        crimes: [...currentRecord.crimes, crimeType]
      }
    };

    return {
      character: updatedCharacter,
      message: `You attempted ${crimeType} but were caught by the police! You were arrested and your record was tarnished.`,
      statChanges: { happiness: -20, health: -10 }
    };
  } else if (success) {
    const moneyGain = Math.floor(Math.random() * 200) + 50;
    const updatedCharacter = {
      ...character,
      wealth: character.wealth + moneyGain,
      happiness: Math.max(0, character.happiness - 5),
      criminalRecord: {
        ...currentRecord,
        crimes: [...currentRecord.crimes, crimeType]
      }
    };

    return {
      character: updatedCharacter,
      message: `You successfully committed ${crimeType} and gained $${moneyGain}, but you feel guilty about it.`,
      statChanges: { wealth: moneyGain, happiness: -5 }
    };
  } else {
    const updatedCharacter = {
      ...character,
      happiness: Math.max(0, character.happiness - 10)
    };

    return {
      character: updatedCharacter,
      message: `Your attempt at ${crimeType} failed. You didn't gain anything but feel disappointed.`,
      statChanges: { happiness: -10 }
    };
  }
};

const handleGenericActivity = (character: Character, activityId: string) => {
  const happinessGain = Math.floor(Math.random() * 8) + 2;
  
  const updatedCharacter = {
    ...character,
    happiness: Math.min(100, character.happiness + happinessGain)
  };

  const activityNames: Record<string, string> = {
    'play_toys': 'playing with toys',
    'watch_cartoons': 'watching cartoons',
    'study_harder': 'studying extra hard',
    'yoga': 'practicing yoga',
    'martial_arts': 'learning martial arts',
    'therapy': 'going to therapy',
    'plastic_surgery': 'getting plastic surgery',
    'peek_a_boo': 'playing peek-a-boo',
    'playground': 'playing at the playground',
    'hang_friends': 'hanging out with friends',
    'join_club': 'joining a school club',
    'volunteer': 'volunteering in the community',
    'networking': 'networking with professionals',
    'school_dance': 'attending the school dance',
    'date_night': 'having a romantic date night',
    'hookup': 'having a casual encounter',
    'propose': 'proposing marriage',
    'honeymoon': 'going on honeymoon',
    'movie': 'watching a movie',
    'video_games': 'playing video games',
    'amusement_park': 'visiting an amusement park',
    'concert': 'attending a concert',
    'shopping': 'going shopping',
    'spa_day': 'having a spa day',
    'vacation': 'taking a vacation',
    'sports_team': 'joining a sports team',
    'swimming': 'going swimming',
    'running': 'going for a run',
    'cycling': 'going cycling',
    'rock_climbing': 'rock climbing',
    'skydiving': 'skydiving',
    'drawing': 'drawing pictures',
    'dance_class': 'taking dance classes',
    'painting': 'painting',
    'photography': 'taking photos',
    'writing': 'creative writing',
    'acting': 'taking acting classes',
    'app_development': 'developing mobile apps',
    'website_design': 'designing websites',
    'gaming_stream': 'streaming games online',
    'tech_startup': 'starting a tech company',
    'bar': 'going to a bar',
    'casino': 'visiting a casino',
    'nightclub': 'going to a nightclub',
    'wine_tasting': 'wine tasting'
  };

  const activityName = activityNames[activityId] || activityId.replace(/_/g, ' ');

  return {
    character: updatedCharacter,
    message: `You enjoyed ${activityName}. It was a pleasant experience that brightened your day.`,
    statChanges: { happiness: happinessGain }
  };
};

