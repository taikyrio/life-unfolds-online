
import React from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FamilySectionProps {
  character: Character;
}

const getRelationshipEmoji = (relationship: string) => {
  const emojis = {
    father: '👨‍🦳',
    mother: '👩‍🦳',
    stepfather: '👨‍🦱',
    stepmother: '👩‍🦱',
    sibling: '👫',
    stepsibling: '👭',
    halfsibling: '👬',
    child: '👶',
    stepchild: '🧒',
    adoptedchild: '👧',
    grandparent: '👴',
    grandchild: '👶',
    spouse: '💑',
    lover: '💕',
    ex: '💔',
    friend: '👋',
    bestfriend: '🤝',
    enemy: '😠',
    coworker: '👔',
    classmate: '🎓'
  };
  return emojis[relationship as keyof typeof emojis] || '👤';
};

const getRelationshipColor = (relationship: string) => {
  if (['father', 'mother', 'stepfather', 'stepmother'].includes(relationship)) return 'bg-blue-100 text-blue-800';
  if (['sibling', 'stepsibling', 'halfsibling'].includes(relationship)) return 'bg-green-100 text-green-800';
  if (['child', 'stepchild', 'adoptedchild'].includes(relationship)) return 'bg-yellow-100 text-yellow-800';
  if (['spouse', 'lover'].includes(relationship)) return 'bg-pink-100 text-pink-800';
  if (['grandparent', 'grandchild'].includes(relationship)) return 'bg-purple-100 text-purple-800';
  return 'bg-gray-100 text-gray-800';
};

export const FamilySection: React.FC<FamilySectionProps> = ({ character }) => {
  const familyMembers = character.familyMembers || [];
  
  // Group family members by relationship type for tree structure
  const parents = familyMembers.filter(m => ['father', 'mother', 'stepfather', 'stepmother'].includes(m.relationship));
  const siblings = familyMembers.filter(m => ['sibling', 'stepsibling', 'halfsibling'].includes(m.relationship));
  const children = familyMembers.filter(m => ['child', 'stepchild', 'adoptedchild'].includes(m.relationship));
  const partners = familyMembers.filter(m => ['spouse', 'lover'].includes(m.relationship));
  const grandparents = familyMembers.filter(m => m.relationship === 'grandparent');
  const others = familyMembers.filter(m => !['father', 'mother', 'stepfather', 'stepmother', 'sibling', 'stepsibling', 'halfsibling', 'child', 'stepchild', 'adoptedchild', 'spouse', 'lover', 'grandparent'].includes(m.relationship));

  const renderFamilyGroup = (title: string, members: typeof familyMembers, emoji: string) => {
    if (members.length === 0) return null;
    
    return (
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
          <span>{emoji}</span>
          {title} ({members.length})
        </h4>
        <div className="space-y-2">
          {members.map((member, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm">{getRelationshipEmoji(member.relationship)}</span>
                <div>
                  <span className="font-medium text-sm">{member.name}</span>
                  {member.age && (
                    <span className="text-xs text-gray-500 ml-1">({member.age})</span>
                  )}
                  {!member.alive && (
                    <span className="text-xs text-red-500 ml-1">(Deceased)</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={`text-xs ${getRelationshipColor(member.relationship)}`}>
                  {member.relationship}
                </Badge>
                {member.relationshipQuality !== undefined && (
                  <span className="text-xs text-gray-600">
                    {member.relationshipQuality}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="glass-card border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          🌳 Family Tree
          <Badge variant="secondary" className="ml-auto">
            {familyMembers.length} members
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {familyMembers.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">No family members yet</p>
        ) : (
          <div className="max-h-80 overflow-y-auto space-y-1">
            {renderFamilyGroup("Grandparents", grandparents, "👴")}
            {renderFamilyGroup("Parents", parents, "👨‍👩")}
            {renderFamilyGroup("Siblings", siblings, "👫")}
            {renderFamilyGroup("Partners", partners, "💕")}
            {renderFamilyGroup("Children", children, "👶")}
            {renderFamilyGroup("Others", others, "👥")}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
