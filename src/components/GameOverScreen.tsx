
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Character } from '../types/game';
import { getStatEmoji } from '../utils/gameUtils';

interface GameOverScreenProps {
  character: Character;
  reason?: string;
  onRestart: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  character, 
  reason, 
  onRestart 
}) => {
  const getLifeSummary = () => {
    const averageStats = (character.health + character.happiness + character.relationships) / 3;
    
    if (averageStats >= 80) return "You lived an extraordinary life! 🌟";
    if (averageStats >= 60) return "You lived a good life! 😊";
    if (averageStats >= 40) return "You lived an average life. 😐";
    return "Life was challenging, but you made it through. 💪";
  };

  const getEmoji = () => {
    if (character.age >= 100) return "🎉";
    if (character.health <= 0) return "💔";
    return "⭐";
  };

  return (
    <div className="min-h-screen bg-game-bg flex items-center justify-center p-4 font-nunito">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">{getEmoji()}</div>
          <CardTitle className="text-2xl font-bold text-game-text mb-2">
            Game Over
          </CardTitle>
          <p className="text-lg text-gray-600">
            {reason}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-game-text mb-4">
              Life Summary for {character.name}
            </h3>
            <p className="text-lg mb-4">{getLifeSummary()}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-game-text">
                  {getStatEmoji('health', character.health)} Health
                </div>
                <div className="text-xl font-bold">{character.health}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-game-text">
                  {getStatEmoji('happiness', character.happiness)} Happiness
                </div>
                <div className="text-xl font-bold">{character.happiness}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-game-text">
                  {getStatEmoji('wealth', character.wealth)} Wealth
                </div>
                <div className="text-xl font-bold">${character.wealth}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-game-text">
                  {getStatEmoji('relationships', character.relationships)} Love
                </div>
                <div className="text-xl font-bold">{character.relationships}</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <div className="text-sm text-gray-600">Final Age</div>
              <div className="text-2xl font-bold text-primary">{character.age} years</div>
            </div>
          </div>
          
          <Button 
            onClick={onRestart}
            className="w-full py-3 text-lg font-semibold bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105"
          >
            🔄 Start New Life
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
