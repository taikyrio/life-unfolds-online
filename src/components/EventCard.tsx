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
    <Card className="w-full max-w-md mx-auto animate-scale-in shadow-2xl border-2 border-gray-200">
      <CardHeader className="text-center pb-4 bg-gradient-to-b from-blue-50 to-white rounded-t-lg">
        <div className="text-5xl mb-3">{event.emoji}</div>
        <CardTitle className="text-xl font-bold text-gray-800 mb-2">
          {event.title}
        </CardTitle>
        <p className="text-gray-600 text-sm leading-relaxed">
          {event.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-2 p-4">
        {event.choices.map((choice) => (
          <Button
            key={choice.id}
            onClick={() => onChoice(choice.id)}
            variant="outline"
            className="w-full justify-start text-left h-auto py-4 px-4 hover:bg-blue-50 transition-all duration-200 border-gray-300 hover:border-blue-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="mr-3 text-xl">{choice.emoji}</span>
            <span className="text-sm font-medium text-gray-700">{choice.text}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};