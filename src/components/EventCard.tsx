
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LifeEvent } from '../types/game';

interface EventCardProps {
  event: LifeEvent;
  onChoice: (choiceId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onChoice }) => {
  return (
    <Card className="animate-scale-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-game-text flex items-center gap-3">
          <span className="text-3xl">{event.emoji}</span>
          {event.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 text-lg leading-relaxed">
          {event.description}
        </p>
        
        <div className="space-y-3">
          {event.choices.map((choice) => (
            <Button
              key={choice.id}
              onClick={() => onChoice(choice.id)}
              variant="outline"
              className="w-full p-4 h-auto text-left justify-start hover:bg-primary/5 hover:border-primary transition-all duration-300 hover:scale-102"
            >
              <div className="flex items-center gap-3 w-full">
                {choice.emoji && (
                  <span className="text-xl">{choice.emoji}</span>
                )}
                <span className="text-game-text font-medium">
                  {choice.text}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
