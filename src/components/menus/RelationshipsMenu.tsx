
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Character } from '../../types/game';
import { Badge } from '../ui/badge';
import { Heart, Users, MessageCircle, Search } from 'lucide-react';

interface RelationshipsMenuProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
}

export const RelationshipsMenu: React.FC<RelationshipsMenuProps> = ({
  character,
  onCharacterUpdate,
  onEvent
}) => {
  // Ensure familyMembers is always an array
  const familyMembers = Array.isArray(character.familyMembers) ? character.familyMembers : [];

  const handleFindLove = () => {
    if (character.age < 16) {
      onEvent("You're too young to look for serious relationships!");
      return;
    }

    if (familyMembers.some(member => member.relationship === 'lover' || member.relationship === 'spouse')) {
      onEvent("You're already in a relationship!");
      return;
    }

    // 70% chance of success
    const success = Math.random() > 0.3;
    
    if (success) {
      const newPartner = {
        id: `partner_${Date.now()}`,
        name: generateRandomName(),
        relationship: 'lover' as const,
        age: character.age + Math.floor(Math.random() * 10) - 5,
        alive: true,
        health: 80 + Math.floor(Math.random() * 20),
        relationshipQuality: 60 + Math.floor(Math.random() * 30),
        personality: {
          kindness: Math.floor(Math.random() * 100),
          loyalty: Math.floor(Math.random() * 100),
          intelligence: Math.floor(Math.random() * 100),
          humor: Math.floor(Math.random() * 100),
          ambition: Math.floor(Math.random() * 100),
          stability: Math.floor(Math.random() * 100),
          generosity: Math.floor(Math.random() * 100)
        },
        currentMood: 'happy' as const
      };

      const updatedCharacter = {
        ...character,
        familyMembers: [...familyMembers, newPartner],
        relationshipStatus: 'dating' as const,
        happiness: Math.min(100, character.happiness + 15)
      };

      onCharacterUpdate(updatedCharacter);
      onEvent(`You met ${newPartner.name} and hit it off! You're now dating! 💕`);
    } else {
      onEvent("You didn't find anyone special this time. Maybe try again later!");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          💝 Relationships
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Your social connections
        </p>
      </div>

      {/* Find Love Action */}
      {character.age >= 16 && !familyMembers.some(member => member.relationship === 'lover' || member.relationship === 'spouse') && (
        <Card className="glass border-white/20 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
          <CardContent className="p-4">
            <Button
              onClick={handleFindLove}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Search size={18} />
              Find Love 💕
            </Button>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              Look for someone special to share your life with
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {familyMembers.length > 0 ? (
          familyMembers.map((relationship, index) => (
            <Card key={relationship.id || index} className="glass border-white/20">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {relationship.relationship === 'father' && '👨‍🦳'}
                      {relationship.relationship === 'mother' && '👩‍🦳'}
                      {relationship.relationship === 'sibling' && '👫'}
                      {relationship.relationship === 'spouse' && '💍'}
                      {relationship.relationship === 'lover' && '💕'}
                      {!['father', 'mother', 'sibling', 'spouse', 'lover'].includes(relationship.relationship) && '👤'}
                    </span>
                    <div>
                      <h3 className="font-medium text-sm">{relationship.name}</h3>
                      <p className="text-xs text-gray-600 capitalize">{relationship.relationship}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    ❤️ {relationship.relationshipQuality || 50}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="glass border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">👥</div>
              <p className="text-sm text-gray-500">No relationships yet</p>
              <p className="text-xs text-gray-400 mt-1">Start socializing to build connections!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Helper function to generate random names
const generateRandomName = (): string => {
  const firstNames = [
    'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
    'Sam', 'Blake', 'Cameron', 'Jamie', 'Sage', 'River', 'Phoenix', 'Rowan',
    'Eden', 'Hayden', 'Peyton', 'Emerson', 'Parker', 'Reese', 'Skyler', 'Drew'
  ];
  
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};
