
import React, { useState } from 'react';
import { Character, FamilyMember } from '../types/game';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Gift, Calendar, Users, Clock, X, Check, AlertTriangle, Zap } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RelationshipsTabProps {
  character: Character;
}

interface RelationshipAction {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  dangerous?: boolean;
  cost?: number;
}

export const RelationshipsTab: React.FC<RelationshipsTabProps> = ({ character }) => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<RelationshipAction | null>(null);

  const getRelationshipEmoji = (relationship: string) => {
    const emojis = {
      father: '👨‍👦',
      mother: '👩‍👧',
      sibling: '👫',
      child: '👶',
      spouse: '💑',
      grandparent: '👴',
      stepfather: '👨‍👦',
      stepmother: '👩‍👧',
      stepsibling: '👫',
      stepchild: '👶',
      lover: '💕',
      ex: '💔',
      grandchild: '👶',
      friend: '👥',
      coworker: '🤝',
      classmate: '🎓'
    };
    return emojis[relationship as keyof typeof emojis] || '👤';
  };

  const getRelationshipColor = (value: number) => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 70) return 'bg-lime-500';
    if (value >= 50) return 'bg-yellow-500';
    if (value >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getRelationshipLevel = (value: number) => {
    if (value >= 90) return 'Excellent';
    if (value >= 70) return 'Good';
    if (value >= 50) return 'Okay';
    if (value >= 30) return 'Poor';
    return 'Terrible';
  };

  const getCompatibilityScore = (member: FamilyMember) => {
    // Calculate compatibility based on age difference, relationship quality, and shared interests
    const ageDiff = Math.abs(character.age - member.age);
    const ageCompatibility = Math.max(0, 100 - ageDiff * 2);
    const relationshipWeight = member.relationshipQuality;
    return Math.round((ageCompatibility + relationshipWeight) / 2);
  };

  const relationshipActions: RelationshipAction[] = [
    {
      id: 'compliment',
      name: 'Compliment',
      icon: <Heart size={16} className="text-pink-500" />,
      color: 'bg-pink-50 text-pink-700 border-pink-200',
      description: 'Say something nice to boost relationship'
    },
    {
      id: 'deep_conversation',
      name: 'Deep Talk',
      icon: <MessageCircle size={16} className="text-blue-500" />,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'Have a meaningful conversation'
    },
    {
      id: 'expensive_gift',
      name: 'Expensive Gift',
      icon: <Gift size={16} className="text-green-500" />,
      color: 'bg-green-50 text-green-700 border-green-200',
      description: 'Give a costly present to show you care',
      cost: 100
    },
    {
      id: 'quality_time',
      name: 'Quality Time',
      icon: <Clock size={16} className="text-purple-500" />,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'Spend meaningful time together'
    },
    {
      id: 'family_gathering',
      name: 'Family Event',
      icon: <Users size={16} className="text-indigo-500" />,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      description: 'Organize a family gathering',
      cost: 75
    },
    {
      id: 'surprise_visit',
      name: 'Surprise Visit',
      icon: <Zap size={16} className="text-yellow-500" />,
      color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      description: 'Drop by unexpectedly (risky!)',
      dangerous: true
    }
  ];

  const handleActionSelect = (action: RelationshipAction, member: FamilyMember) => {
    if (action.cost && character.wealth < action.cost) {
      return; // Can't afford it
    }
    setSelectedAction(action);
    setSelectedMember(member);
    setShowActionModal(true);
  };

  const handleActionConfirm = () => {
    if (selectedAction && selectedMember) {
      console.log(`${selectedAction.id} action performed on ${selectedMember.name}`);
      
      let relationshipChange = 0;
      
      switch (selectedAction.id) {
        case 'compliment':
          relationshipChange = Math.random() > 0.8 ? 15 : 5;
          break;
        case 'deep_conversation':
          relationshipChange = Math.random() > 0.7 ? 12 : 8;
          break;
        case 'expensive_gift':
          relationshipChange = Math.random() > 0.6 ? 20 : 10;
          break;
        case 'quality_time':
          relationshipChange = 15;
          break;
        case 'family_gathering':
          relationshipChange = 18;
          break;
        case 'surprise_visit':
          relationshipChange = Math.random() > 0.5 ? 25 : -10;
          break;
      }
      
      selectedMember.relationshipQuality = Math.max(0, Math.min(100, selectedMember.relationshipQuality + relationshipChange));
    }
    
    setShowActionModal(false);
    setSelectedAction(null);
    setSelectedMember(null);
  };

  const canAffordAction = (action: RelationshipAction) => {
    return !action.cost || character.wealth >= action.cost;
  };

  // Enhanced family categorization with extended family
  const familyCategories = [
    {
      title: 'Parents & Guardians',
      members: character.familyMembers?.filter(m => 
        ['father', 'mother', 'stepfather', 'stepmother'].includes(m.relationship)
      ) || []
    },
    {
      title: 'Siblings',
      members: character.familyMembers?.filter(m => 
        ['sibling', 'stepsibling'].includes(m.relationship)
      ) || []
    },
    {
      title: 'Grandparents',
      members: character.familyMembers?.filter(m => m.relationship === 'grandparent') || []
    },
    {
      title: 'Children',
      members: character.familyMembers?.filter(m => 
        ['child', 'stepchild'].includes(m.relationship)
      ) || []
    },
    {
      title: 'Friends & Social Circle',
      members: character.familyMembers?.filter(m => 
        ['friend', 'classmate'].includes(m.relationship)
      ) || []
    },
    {
      title: 'Professional Network',
      members: character.familyMembers?.filter(m => m.relationship === 'coworker') || []
    },
    {
      title: 'Past Relationships',
      members: character.familyMembers?.filter(m => m.relationship === 'ex') || []
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-4 space-y-4">
          <div className="text-center py-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Relationships & Social Life</h2>
            <p className="text-sm text-gray-600">
              Build and maintain meaningful connections
            </p>
            <div className="text-xs text-gray-500 mt-2 bg-blue-50 p-2 rounded-lg">
              💡 Strong relationships improve happiness and open new opportunities!
            </div>
          </div>

          {/* Current Partner Section */}
          {character.relationshipStatus !== 'single' && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700 px-2 flex items-center gap-2">
                💕 {character.relationshipStatus === 'married' ? 'Spouse' : 'Partner'}
              </h3>
              {character.familyMembers?.filter(m => 
                (m.relationship === 'lover' || m.relationship === 'spouse') && m.alive
              ).map((partner) => (
                <Card key={partner.id} className="shadow-md border-2 border-pink-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">
                          {character.relationshipStatus === 'married' ? '💑' : '💕'}
                        </span>
                        <div>
                          <h4 className="font-semibold text-gray-800">{partner.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">
                            {character.relationshipStatus} • Age {partner.age}
                          </p>
                          <div className="text-xs text-blue-600 mt-1">
                            Compatibility: {getCompatibilityScore(partner)}%
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">
                          Health: {partner.health}%
                        </div>
                        <div className={`text-sm font-medium px-2 py-1 rounded text-white ${getRelationshipColor(partner.relationshipQuality)}`}>
                          {partner.relationshipQuality}%
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {getRelationshipLevel(partner.relationshipQuality)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Relationship Quality
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getRelationshipColor(partner.relationshipQuality)} transition-all duration-500`}
                          style={{ width: `${partner.relationshipQuality}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {relationshipActions.slice(0, 4).map((action) => (
                        <Button
                          key={action.id}
                          variant="outline"
                          size="sm"
                          disabled={!canAffordAction(action)}
                          onClick={() => handleActionSelect(action, partner)}
                          className={`${action.color} border text-xs py-2 h-auto hover:opacity-80 transition-opacity ${!canAffordAction(action) ? 'opacity-50' : ''}`}
                        >
                          <div className="flex items-center space-x-1">
                            {action.icon}
                            <span>{action.name}</span>
                            {action.cost && <span className="text-xs">${action.cost}</span>}
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Family Categories */}
          {familyCategories.map((category) => (
            category.members.length > 0 && (
              <div key={category.title} className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 px-2 flex items-center gap-2">
                  {category.title}
                  <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    {category.members.length}
                  </span>
                </h3>
                {category.members.map((member) => (
                  <Card key={member.id} className="overflow-hidden shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getRelationshipEmoji(member.relationship)}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-800">{member.name}</h4>
                              {!member.alive && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Deceased</span>}
                            </div>
                            <p className="text-sm text-gray-600 capitalize">
                              {member.relationship} • Age {member.age}
                            </p>
                            {member.job && (
                              <p className="text-xs text-gray-500">
                                {member.job}
                                {member.salary ? ` • $${member.salary}k/year` : ''}
                              </p>
                            )}
                            {member.alive && (
                              <div className="text-xs text-blue-600 mt-1">
                                Compatibility: {getCompatibilityScore(member)}%
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500 mb-1">
                            Health: {member.health}%
                          </div>
                          <div className={`text-sm font-medium px-2 py-1 rounded text-white ${getRelationshipColor(member.relationshipQuality)}`}>
                            {member.relationshipQuality}%
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            {getRelationshipLevel(member.relationshipQuality)}
                          </span>
                          <span className="text-xs text-gray-500">
                            Relationship Quality
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getRelationshipColor(member.relationshipQuality)} transition-all duration-500`}
                            style={{ width: `${member.relationshipQuality}%` }}
                          />
                        </div>
                      </div>

                      {member.alive && (
                        <div className="grid grid-cols-2 gap-2">
                          {relationshipActions.slice(0, 4).map((action) => (
                            <Button
                              key={action.id}
                              variant="outline"
                              size="sm"
                              disabled={!canAffordAction(action)}
                              onClick={() => handleActionSelect(action, member)}
                              className={`${action.color} border text-xs py-2 h-auto hover:opacity-80 transition-opacity ${!canAffordAction(action) ? 'opacity-50' : ''}`}
                            >
                              <div className="flex items-center space-x-1">
                                {action.icon}
                                <span>{action.name}</span>
                                {action.cost && <span className="text-xs">${action.cost}</span>}
                                {action.dangerous && <AlertTriangle size={12} className="text-red-500" />}
                              </div>
                            </Button>
                          ))}
                        </div>
                      )}

                      {!member.alive && (
                        <div className="text-center py-2 text-gray-500 text-sm">
                          💐 May they rest in peace
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          ))}

          {/* Empty State */}
          {(!character.familyMembers || character.familyMembers.length === 0) && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Relationships Yet</h3>
              <p className="text-gray-600 max-w-sm mx-auto">
                Your relationships will appear here as you meet people and build connections throughout your life.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Action Confirmation Modal */}
      {showActionModal && selectedAction && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div className="mb-2">{selectedAction.icon}</div>
              <h3 className="text-lg font-semibold">{selectedAction.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                with {selectedMember.name}
              </p>
              <p className="text-xs text-gray-500">
                {selectedAction.description}
              </p>
              
              {selectedAction.cost && (
                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-blue-700 text-xs">
                  💰 Cost: ${selectedAction.cost}
                </div>
              )}
              
              {selectedAction.dangerous && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
                  ⚠️ This action may have unpredictable results!
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowActionModal(false)}
                className="flex-1"
              >
                <X size={16} className="mr-1" />
                Cancel
              </Button>
              <Button
                onClick={handleActionConfirm}
                disabled={!canAffordAction(selectedAction)}
                className={`flex-1 ${selectedAction.dangerous ? 'bg-red-500 hover:bg-red-600' : ''}`}
              >
                <Check size={16} className="mr-1" />
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
