
import React from 'react';
import { LifeEvent } from '../types/game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface EventOverlayProps {
  event: LifeEvent;
  character: { age: number; name: string };
  onChoice: (choiceId: string) => void;
  isVisible: boolean;
}

export const EventOverlay: React.FC<EventOverlayProps> = ({ 
  event, 
  character, 
  onChoice, 
  isVisible 
}) => {
  if (!isVisible) return null;

  const currentDate = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formatDate = () => {
    const month = monthNames[currentDate.getMonth()];
    const day = currentDate.getDate();
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' : 
                  day === 2 || day === 22 ? 'nd' : 
                  day === 3 || day === 23 ? 'rd' : 'th';
    return `${month} ${day}${suffix}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay with blur effect */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Event card */}
      <div className="relative w-full max-w-md mx-4 animate-in zoom-in-95 duration-300">
        <Card className="border-2 border-orange-500 shadow-2xl bg-gradient-to-b from-gray-800 to-gray-900 text-white">
          {/* Header with date */}
          <CardHeader className="text-center pb-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-t-lg">
            <div className="text-orange-200 text-sm font-medium mb-1">Current</div>
            <div className="flex items-center justify-center gap-2 text-white">
              <Calendar className="h-4 w-4" />
              <span className="text-lg font-bold">{formatDate()}</span>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Event emoji and title */}
            <div className="text-center space-y-3">
              <div className="text-4xl">{event.emoji}</div>
              <h2 className="text-xl font-bold text-white">{event.title}</h2>
            </div>

            {/* Event description */}
            <div className="text-center">
              <p className="text-gray-300 text-sm leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Choices */}
            <div className="space-y-3">
              {event.choices.map((choice, index) => (
                <Button
                  key={choice.id}
                  onClick={() => onChoice(choice.id)}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-4 bg-blue-600 hover:bg-blue-700 border-blue-500 hover:border-blue-400 text-white transition-all duration-200 transform hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 w-full">
                    {choice.emoji && (
                      <span className="text-lg flex-shrink-0">{choice.emoji}</span>
                    )}
                    <span className="text-sm font-medium flex-1">{choice.text}</span>
                  </div>
                </Button>
              ))}
            </div>

            {/* Surprise option (if available) */}
            {Math.random() > 0.7 && (
              <div className="text-center pt-2">
                <Button
                  onClick={() => {
                    // Pick a random choice for surprise
                    const randomChoice = event.choices[Math.floor(Math.random() * event.choices.length)];
                    onChoice(randomChoice.id);
                  }}
                  variant="ghost"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  🎲 Surprise me!
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
