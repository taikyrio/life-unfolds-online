

import { GameState } from '../types/game';
import { gameLogger } from '../utils/gameLogger';

export const handleAgeUp = (gameState: GameState, ageHistory?: Record<number, string[]>, setAgeHistory?: (history: Record<number, string[]>) => void): GameState => {
  const updatedCharacter = { ...gameState.character };
  updatedCharacter.age = updatedCharacter.age + 1;
  
  const newEvents: string[] = [];
  
  // Process music career records during age up
  if (updatedCharacter.musicCareer?.artists) {
    updatedCharacter.musicCareer.artists.forEach(artist => {
      artist.records.forEach(record => {
        if (record.inProduction && record.createdAtAge) {
          const completionAge = record.createdAtAge + record.productionTime;
          
          if (updatedCharacter.age >= completionAge) {
            // Release the record
            record.inProduction = false;
            
            // Generate sales and earnings
            const baseSales = Math.floor(Math.random() * 5000) + 500;
            const smartsBonus = Math.floor(updatedCharacter.smarts / 10);
            const fansBonus = Math.floor(artist.fans / 50);
            
            record.sales = baseSales * Math.max(1, smartsBonus + fansBonus);
            record.earnings = record.sales * (Math.random() * 10 + 3);
            
            // Add to character money
            updatedCharacter.money = (updatedCharacter.money || 0) + record.earnings;
            
            // Increase artist fans
            const newFans = Math.floor(record.sales / 5) + Math.floor(Math.random() * 100) + 50;
            artist.fans += newFans;
            
            // Update music career stats
            updatedCharacter.musicCareer!.albums += 1;
            updatedCharacter.musicCareer!.totalEarnings += record.earnings;
            updatedCharacter.musicCareer!.fans = Math.max(updatedCharacter.musicCareer!.fans, artist.fans);
            
            // Add to events for life story
            const eventMessage = `"${record.name}" by ${artist.name} was released! Sold ${record.sales.toLocaleString()} copies, earned $${Math.floor(record.earnings).toLocaleString()}, and gained ${newFans.toLocaleString()} fans!`;
            newEvents.push(eventMessage);
            
            // Log to game logger
            gameLogger.logEvent({
              age: updatedCharacter.age,
              year: (updatedCharacter.birthYear || 2000) + updatedCharacter.age,
              event: eventMessage,
              category: 'career',
              impact: {
                money: record.earnings,
                happiness: 10
              }
            });
          }
        }
      });
    });
  }
  
  // Always ensure this age has an entry in age history
  if (ageHistory && setAgeHistory) {
    const currentEvents = ageHistory[updatedCharacter.age] || [];
    
    // If no new events, add a default aging event
    if (newEvents.length === 0) {
      newEvents.push(`🎂 You celebrated your ${updatedCharacter.age}th birthday!`);
    }
    
    const updatedAgeHistory = {
      ...ageHistory,
      [updatedCharacter.age]: [...currentEvents, ...newEvents]
    };
    setAgeHistory(updatedAgeHistory);
  }

  return {
    ...gameState,
    character: updatedCharacter
  };
};

