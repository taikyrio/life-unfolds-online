
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Character } from '../../types/game';
import { Badge } from '../ui/badge';
import { Heart, Users, MessageCircle } from 'lucide-react';

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
                      {relationship.relationship === 'spouse' && '💕'}
                      {!['father', 'mother', 'sibling', 'spouse'].includes(relationship.relationship) && '👤'}
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
