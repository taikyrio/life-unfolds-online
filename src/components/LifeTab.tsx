
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Character, LifeEvent } from '../types/game';
import { CharacterStats } from './CharacterStats';
import { EventCard } from './EventCard';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LifeTabProps {
  character: Character;
  currentEvent: LifeEvent | null;
  onAgeUp: () => void;
  onChoice: (choiceId: string) => void;
  eventHistory: string[];
}

export const LifeTab: React.FC<LifeTabProps> = ({
  character,
  currentEvent,
  onAgeUp,
  onChoice,
  eventHistory
}) => {
  return (
    <div className="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-3">
      <div className="space-y-4 lg:space-y-6 order-2 lg:order-1">
        <CharacterStats character={character} />
        
        <Card>
          <CardContent className="p-3 sm:p-4">
            <Button 
              onClick={onAgeUp}
              className="w-full py-2 sm:py-3 text-sm sm:text-lg font-semibold bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105"
              disabled={!!currentEvent}
            >
              🎂 Age Up (+1 Year)
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="order-1 lg:order-2">
        {currentEvent ? (
          <EventCard 
            event={currentEvent}
            onChoice={onChoice}
          />
        ) : (
          <Card className="animate-fade-in">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-4xl sm:text-6xl mb-4">😴</div>
              <h3 className="text-lg sm:text-xl font-semibold text-game-text mb-2">
                Peaceful Times
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Nothing exciting is happening right now. Age up to continue your journey through life!
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="order-3">
        <Card className="animate-fade-in">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg font-bold text-game-text flex items-center gap-2">
              📖 Life Journal
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ScrollArea className="h-64 sm:h-80">
              <div className="space-y-2">
                {eventHistory.length > 0 ? (
                  eventHistory.map((event, index) => (
                    <div 
                      key={index} 
                      className="p-2 sm:p-3 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-700 border-l-4 border-primary/30"
                    >
                      {event}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs sm:text-sm text-center py-4">
                    Your life story will appear here...
                  </p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
