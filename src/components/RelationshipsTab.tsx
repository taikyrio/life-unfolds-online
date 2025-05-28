
import React, { useState } from 'react';
import { Character, FamilyMember } from '../types/game';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Gift, Frown, Clock, Sword } from 'lucide-react';

interface RelationshipsTabProps {
  character: Character;
}

interface RelationshipAction {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

export const RelationshipsTab: React.FC<RelationshipsTabProps> = ({ character }) => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const getRelationshipEmoji = (relationship: string) => {
    const emojis = {
      father: '👨‍👦',
      mother: '👩‍👧',
      sibling: '👫',
      child: '👶',
      spouse: '💑',
      grandparent: '👴'
    };
    return emojis[relationship as keyof typeof emojis] || '👤';
  };

  const getRelationshipColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    if (value >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getRelationshipLevel = (value: number) => {
    if (value >= 90) return 'Excellent';
    if (value >= 70) return 'Good';
    if (value >= 50) return 'Okay';
    if (value >= 30) return 'Poor';
    return 'Terrible';
  };

  const relationshipActions: RelationshipAction[] = [
    {
      id: 'compliment',
      name: 'Compliment',
      icon: <Heart size={16} className="text-pink-500" />,
      color: 'bg-pink-50 text-pink-700'
    },
    {
      id: 'conversation',
      name: 'Conversation',
      icon: <MessageCircle size={16} className="text-blue-500" />,
      color: 'bg-blue-50 text-blue-700'
    },
    {
      id: 'gift',
      name: 'Gift',
      icon: <Gift size={16} className="text-green-500" />,
      color: 'bg-green-50 text-green-700'
    },
    {
      id: 'spend_time',
      name: 'Spend Time',
      icon: <Clock size={16} className="text-purple-500" />,
      color: 'bg-purple-50 text-purple-700'
    },
    {
      id: 'insult',
      name: 'Insult',
      icon: <Frown size={16} className="text-orange-500" />,
      color: 'bg-orange-50 text-orange-700'
    },
    {
      id: 'assault',
      name: 'Assault',
      icon: <Sword size={16} className="text-red-500" />,
      color: 'bg-red-50 text-red-700'
    }
  ];

  const handleAction = (actionId: string, member: FamilyMember) => {
    // This would integrate with the game's action system
    console.log(`${actionId} action performed on ${member.name}`);
    setSelectedMember(null);
  };

  const familyCategories = [
    {
      title: 'Parents',
      members: character.familyMembers?.filter(m => m.relationship === 'father' || m.relationship === 'mother') || []
    },
    {
      title: 'Siblings',
      members: character.familyMembers?.filter(m => m.relationship === 'sibling') || []
    },
    {
      title: 'Grandparents',
      members: character.familyMembers?.filter(m => m.relationship === 'grandparent') || []
    },
    {
      title: 'Children',
      members: character.familyMembers?.filter(m => m.relationship === 'child') || []
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="p-4 space-y-4">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Relationships</h2>
          <p className="text-sm text-gray-600">
            Maintain your relationships with family and friends
          </p>
        </div>

        {/* Family Categories */}
        {familyCategories.map((category) => (
          category.members.length > 0 && (
            <div key={category.title} className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700 px-2">{category.title}</h3>
              {category.members.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getRelationshipEmoji(member.relationship)}</span>
                        <div>
                          <h4 className="font-semibold text-gray-800">{member.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">
                            {member.relationship} • Age {member.age}
                          </p>
                          {member.job && (
                            <p className="text-xs text-gray-500">{member.job}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${member.alive ? 'text-gray-800' : 'text-gray-400'}`}>
                          {member.alive ? 'Alive' : 'Deceased'}
                        </div>
                        <div className="text-xs text-gray-500">
                          Health: {member.health}%
                        </div>
                      </div>
                    </div>

                    {/* Relationship Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {getRelationshipLevel(member.relationshipQuality)}
                        </span>
                        <span className="text-sm text-gray-600">
                          {member.relationshipQuality}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${getRelationshipColor(member.relationshipQuality)} transition-all duration-300`}
                          style={{ width: `${member.relationshipQuality}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {member.alive && (
                      <div className="grid grid-cols-3 gap-2">
                        {relationshipActions.slice(0, 6).map((action) => (
                          <Button
                            key={action.id}
                            variant="outline"
                            size="sm"
                            onClick={() => handleAction(action.id, member)}
                            className={`${action.color} border-0 text-xs py-1 h-auto`}
                          >
                            <div className="flex flex-col items-center space-y-1">
                              {action.icon}
                              <span>{action.name}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        ))}

        {/* Partners Section */}
        {character.relationshipStatus !== 'single' && character.partnerName && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700 px-2">Partner</h3>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💕</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{character.partnerName}</h4>
                    <p className="text-sm text-gray-600 capitalize">{character.relationshipStatus}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Children Section */}
        {character.children && character.children.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700 px-2">Children</h3>
            {character.children.map((child, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">👶</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{child}</h4>
                      <p className="text-sm text-gray-600">Your child</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pets Section */}
        {character.pets && character.pets.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700 px-2">Pets</h3>
            {character.pets.map((pet, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🐾</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{pet.name}</h4>
                      <p className="text-sm text-gray-600">
                        {pet.type} • Age {pet.age} • Health {pet.health}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {(!character.familyMembers || character.familyMembers.length === 0) && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Family Members</h3>
            <p className="text-gray-600">
              Your family relationships will appear here as you progress through life.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
