
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Character, LifeEvent } from '../types/game';
import { CharacterStats } from './CharacterStats';
import { EventCard } from './EventCard';
import { getLifeStage } from '../utils/gameUtils';

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
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6">
        <CharacterStats character={character} />
        
        <Card>
          <CardContent className="p-4">
            <Button 
              onClick={onAgeUp}
              className="w-full py-3 text-lg font-semibold bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105"
              disabled={!!currentEvent}
            >
              🎂 Age Up (+1 Year)
            </Button>
          </CardContent>
        </Card>
      </div>

      <div>
        {currentEvent ? (
          <EventCard 
            event={currentEvent}
            onChoice={onChoice}
          />
        ) : (
          <Card className="animate-fade-in">
            <CardContent className="p-6 text-center">
              <div className="text-6xl mb-4">😴</div>
              <h3 className="text-xl font-semibold text-game-text mb-2">
                Peaceful Times
              </h3>
              <p className="text-gray-600">
                Nothing exciting is happening right now. Age up to continue your journey through life!
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-game-text flex items-center gap-2">
              📖 Life Journal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="max-h-80 overflow-y-auto space-y-2">
              {eventHistory.length > 0 ? (
                eventHistory.map((event, index) => (
                  <div 
                    key={index} 
                    className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 border-l-4 border-primary/30"
                  >
                    {event}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">
                  Your life story will appear here...
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
