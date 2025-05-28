
import React from 'react';
import { FamilyMember as FamilyMemberType } from '../types/game';
import { Card, CardContent } from '@/components/ui/card';
import { getStatColor } from '../utils/gameUtils';

interface FamilyMemberProps {
  member: FamilyMemberType;
  className?: string;
}

export const FamilyMember: React.FC<FamilyMemberProps> = ({ member, className = '' }) => {
  const getRelationshipEmoji = (relationship: string) => {
    const emojis = {
      father: '👨',
      mother: '👩',
      sibling: '👫',
      child: '👶',
      spouse: '💑',
      grandparent: '👴'
    };
    return emojis[relationship as keyof typeof emojis] || '👤';
  };

  const getHealthStatus = (health: number) => {
    if (health >= 80) return { text: 'Excellent', color: 'text-green-600' };
    if (health >= 60) return { text: 'Good', color: 'text-yellow-600' };
    if (health >= 40) return { text: 'Fair', color: 'text-orange-600' };
    return { text: 'Poor', color: 'text-red-600' };
  };

  const healthStatus = getHealthStatus(member.health);

  return (
    <Card className={`p-2 ${className}`}>
      <CardContent className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <span className="text-lg">{getRelationshipEmoji(member.relationship)}</span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm truncate">{member.name}</p>
              <p className="text-xs text-gray-600 capitalize">{member.relationship}, {member.age}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-xs ${member.alive ? healthStatus.color : 'text-gray-400'}`}>
              {member.alive ? healthStatus.text : 'Deceased'}
            </div>
            <div className={`text-xs ${getStatColor(member.relationshipQuality)}`}>
              {member.relationshipQuality}% Bond
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
