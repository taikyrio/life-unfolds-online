import React from 'react';
import { LifeEvent } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface EventOverlayProps {
  event: LifeEvent;
  onChoice: (choiceId: string) => void;
  onClose: () => void;
  characterName?: string;
  characterAge?: number;
}

export const EventOverlay: React.FC<EventOverlayProps> = ({ 
  event, 
  onChoice, 
  onClose,
  characterName = "Player",
  characterAge = 0
}) => {
  const handleChoice = (choiceId: string) => {
    onChoice(choiceId);
    onClose();
  };

  const getLifeStage = (age: number) => {
    if (age <= 4) return "Baby";
    if (age <= 12) return "Child";
    if (age <= 17) return "Teen";
    if (age <= 25) return "Young Adult";
    if (age <= 50) return "Adult";
    return "Senior";
  };

  // Validate if event is appropriate for current age
  const isEventAppropriate = (event: LifeEvent, age: number) => {
    const lifeStage = getLifeStage(age);
    
    // Check for age-inappropriate content
    if (age < 13 && (event.title.toLowerCase().includes('job') || 
                     event.title.toLowerCase().includes('career') || 
                     event.title.toLowerCase().includes('marriage'))) {
      return false;
    }
    
    if (age > 18 && (event.title.toLowerCase().includes('playground') || 
                     event.title.toLowerCase().includes('school assignment'))) {
      return false;
    }
    
    return true;
  };

  // Don't render if event is inappropriate
  if (!isEventAppropriate(event, characterAge)) {
    onClose();
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full h-full bg-white flex flex-col relative">
        {/* Header with character info */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-2xl">
              👶
            </div>
            <div>
              <h1 className="text-xl font-bold">{characterName}</h1>
              <p className="text-orange-100 text-sm">{getLifeStage(characterAge)}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-orange-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Event Content */}
        <div className="flex-1 flex flex-col justify-center p-6 max-w-md mx-auto w-full">
          <Card className="border-2 border-gray-200 shadow-2xl">
            <CardHeader className="text-center pb-4 bg-gradient-to-b from-gray-50 to-white rounded-t-lg">
              <div className="text-4xl mb-3">{event.emoji}</div>
              <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                {event.title}
              </CardTitle>
              <p className="text-gray-600 text-sm leading-relaxed px-2">
                {event.description}
              </p>
            </CardHeader>

            <CardContent className="space-y-3 p-4">
              <p className="text-center text-gray-700 font-medium text-sm mb-4">
                What will you do?
              </p>

              {event.choices && event.choices.length > 0 ? (
                <>
                  {event.choices.map((choice, index) => (
                    <Button
                      key={choice.id}
                      onClick={() => handleChoice(choice.id)}
                      className="w-full justify-center text-center h-auto py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 rounded-md font-medium"
                    >
                      <span className="mr-2 text-lg">{choice.emoji}</span>
                      <span className="text-sm">{choice.text}</span>
                    </Button>
                  ))}

                  {/* Optional "Surprise me!" button */}
                  <Button
                    onClick={() => {
                      const randomChoice = event.choices[Math.floor(Math.random() * event.choices.length)];
                      handleChoice(randomChoice.id);
                    }}
                    variant="ghost"
                    className="w-full text-blue-500 hover:text-blue-600 text-sm py-2"
                  >
                    <span className="mr-1">🎲</span>
                    Surprise me!
                  </Button>
                </>
              ) : (
                <Button
                  onClick={onClose}
                  className="w-full justify-center text-center h-auto py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 rounded-md font-medium"
                >
                  <span className="mr-2 text-lg">✓</span>
                  <span className="text-sm">Continue</span>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer space */}
        <div className="h-20 bg-gray-50"></div>
      </div>
    </div>
  );
};