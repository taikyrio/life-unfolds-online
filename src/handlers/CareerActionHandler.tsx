

import { Character, GameState } from '../types/game';
import { Artist, Record as MusicRecord, MusicCareer } from '../types/music';

export const handleCareerAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: { [key: number]: string[] },
  setAgeHistory: React.Dispatch<React.SetStateAction<{ [key: number]: string[] }>>,
  onGameStateChange: (state: GameState) => void,
  gameState: GameState,
  toast: any
) => {
  console.log('Career action:', action, data);
  
  const updatedCharacter = { ...character };
  
  // Initialize music career if it doesn't exist
  if (!updatedCharacter.musicCareer) {
    updatedCharacter.musicCareer = {
      level: 0,
      fans: 0,
      albums: 0,
      singles: 0,
      reputation: 0,
      currentProject: null,
      lastRelease: null,
      earnings: 0,
      artists: [],
      studioSlots: 2,
      hasMoreStudioTime: false,
      artistName: '',
      genre: '',
      recordLabel: '',
      albumsSold: 0,
      tourRevenue: 0,
      fanBase: 0,
      currentAlbum: null,
      totalEarnings: 0,
      awards: [],
      isActive: true
    };
  }

  let eventMessage = '';

  switch (action) {
    case 'music_create_artist':
      if (data?.artist) {
        updatedCharacter.musicCareer.artists.push(data.artist);
        eventMessage = `Created new artist: ${data.artist.name}`;
      }
      break;

    case 'music_create_record':
      if (data?.artistId && data?.record) {
        const artist = updatedCharacter.musicCareer.artists.find(a => a.id === data.artistId);
        if (artist) {
          artist.records.push(data.record);
          eventMessage = `Started recording "${data.record.name}" with ${artist.name}`;
        }
      }
      break;

    case 'music_complete_record':
      if (data?.artistId && data?.recordId) {
        const artist = updatedCharacter.musicCareer.artists.find(a => a.id === data.artistId);
        if (artist) {
          const record = artist.records.find(r => r.id === data.recordId);
          if (record && record.inProduction) {
            record.inProduction = false;
            // Generate sales and earnings based on character stats and artist popularity
            const baseSales = Math.floor(Math.random() * 5000) + 500; // Base 500-5500 sales
            const smartsBonus = Math.floor(character.smarts / 10); // Up to 10x multiplier from smarts
            const fansBonus = Math.floor(artist.fans / 50); // Bonus from existing fans
            
            record.sales = baseSales * Math.max(1, smartsBonus + fansBonus);
            record.earnings = record.sales * (Math.random() * 10 + 3); // $3-13 per sale
            
            // Add to character money
            updatedCharacter.money = (updatedCharacter.money || 0) + record.earnings;
            
            // Increase artist fans significantly
            const newFans = Math.floor(record.sales / 5) + Math.floor(Math.random() * 100) + 50;
            artist.fans += newFans;
            
            // Update music career stats
            updatedCharacter.musicCareer.albums += 1;
            updatedCharacter.musicCareer.totalEarnings += record.earnings;
            updatedCharacter.musicCareer.fans = Math.max(updatedCharacter.musicCareer.fans, artist.fans);
            
            eventMessage = `"${record.name}" by ${artist.name} was released at age ${character.age}! Sold ${record.sales.toLocaleString()} copies, earned $${Math.floor(record.earnings).toLocaleString()}, and gained ${newFans.toLocaleString()} fans!`;
          }
        }
      }
      break;

    case 'music_go_on_tour':
      if (data?.artistId) {
        const artist = updatedCharacter.musicCareer.artists.find(a => a.id === data.artistId);
        if (artist && artist.fans > 0) {
          const tourEarnings = Math.floor(artist.fans * (Math.random() * 20 + 10)); // $10-30 per fan
          updatedCharacter.money = (updatedCharacter.money || 0) + tourEarnings;
          updatedCharacter.musicCareer.tourRevenue += tourEarnings;
          artist.fans += Math.floor(tourEarnings / 100); // Gain more fans from touring
          
          eventMessage = `${artist.name} went on tour and earned $${tourEarnings.toLocaleString()}!`;
        }
      }
      break;

    case 'music_practice':
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 2);
      eventMessage = 'You practiced music and improved your skills!';
      break;

    case 'music_get_studio_time':
      const studioTimeCost = 5000;
      if ((updatedCharacter.money || 0) >= studioTimeCost) {
        updatedCharacter.money = (updatedCharacter.money || 0) - studioTimeCost;
        updatedCharacter.musicCareer.studioSlots += 1;
        eventMessage = `Purchased additional studio time! Now have ${updatedCharacter.musicCareer.studioSlots} studio slots.`;
      } else {
        eventMessage = `Need $${studioTimeCost.toLocaleString()} to purchase more studio time.`;
      }
      break;

    default:
      eventMessage = `Career action: ${action}`;
      break;
  }

  // Add event to age history
  if (eventMessage) {
    const currentAge = character.age;
    const currentEvents = ageHistory[currentAge] || [];
    const newAgeHistory = {
      ...ageHistory,
      [currentAge]: [...currentEvents, eventMessage]
    };
    setAgeHistory(newAgeHistory);

    toast({
      title: "Music Career",
      description: eventMessage,
    });
  }

  // Update game state
  const newGameState = {
    ...gameState,
    character: updatedCharacter
  };
  
  onGameStateChange(newGameState);
};

