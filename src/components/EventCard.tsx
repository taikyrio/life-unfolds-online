
import React from 'react';
import { LifeEvent } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EventCardProps {
  event: LifeEvent;
  onChoice: (choiceId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onChoice }) => {
  return (
    <Card className="w-full animate-scale-in shadow-lg border border-gray-200">
      <CardHeader className="text-center pb-2 bg-gradient-to-b from-blue-50 to-white rounded-t-lg">
        <div className="text-3xl mb-1">{event.emoji}</div>
        <CardTitle className="text-sm font-bold text-gray-800 mb-1">
          {event.title}
        </CardTitle>
        <p className="text-gray-600 text-xs leading-relaxed">
          {event.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-1 p-2">
        {event.choices.map((choice) => (
          <Button
            key={choice.id}
            onClick={() => onChoice(choice.id)}
            variant="outline"
            className="w-full justify-start text-left h-auto py-2 px-3 hover:bg-blue-50 transition-all duration-200 border-gray-300 hover:border-blue-300"
          >
            <span className="mr-2 text-lg">{choice.emoji}</span>
            <span className="text-xs font-medium text-gray-700">{choice.text}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
