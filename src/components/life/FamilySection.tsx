
import React from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FamilySectionProps {
  character: Character;
}

export const FamilySection: React.FC<FamilySectionProps> = ({ character }) => {
  return (
    <Card className="glass-card border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          👨‍👩‍👧‍👦 Family
          <Badge variant="secondary" className="ml-auto">
            {character.familyMembers?.length || 0} members
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {character.familyMembers?.slice(0, 3).map((member, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm">👤</span>
                <span className="font-medium text-sm">{member.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">{member.relationship}</Badge>
            </div>
          )) || (
            <p className="text-gray-500 text-sm">No family members yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
