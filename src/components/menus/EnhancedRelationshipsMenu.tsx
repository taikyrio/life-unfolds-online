
import React, { useState } from 'react';
import { X, Heart, Users, MessageCircle, Gift } from 'lucide-react';
import { Character, FamilyMember } from '../../types/game';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface EnhancedRelationshipsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  onRelationshipAction: (action: string, data?: any) => void;
}

export const EnhancedRelationshipsMenu: React.FC<EnhancedRelationshipsMenuProps> = ({
  isOpen,
  onClose,
  character,
  onRelationshipAction
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'family' | 'friends' | 'romantic' | 'professional'>('all');
  const [selectedPerson, setSelectedPerson] = useState<FamilyMember | null>(null);

  const categorizeRelationships = () => {
    const family = character.familyMembers.filter(m => 
      ['father', 'mother', 'sibling', 'child', 'grandparent', 'stepfather', 'stepmother', 'stepsibling', 'stepchild', 'grandchild', 'aunt', 'uncle', 'cousin'].includes(m.relationship)
    );
    
    const romantic = character.familyMembers.filter(m => 
      ['lover', 'spouse', 'ex'].includes(m.relationship)
    );
    
    const friends = character.familyMembers.filter(m => 
      ['friend', 'best_friend', 'acquaintance'].includes(m.relationship)
    );
    
    const professional = character.familyMembers.filter(m => 
      ['coworker'].includes(m.relationship)
    );

    return { family, romantic, friends, professional };
  };

  const getRelationshipIcon = (relationship: string) => {
    const icons: Record<string, string> = {
      father: '👨', mother: '👩', sibling: '👫', child: '👶',
      spouse: '💑', lover: '💕', ex: '💔',
      friend: '👥', best_friend: '⭐', acquaintance: '🤝',
      coworker: '💼', grandparent: '👴', aunt: '👩‍🦳', uncle: '👨‍🦳'
    };
    return icons[relationship] || '👤';
  };

  const getRelationshipColor = (quality: number) => {
    if (quality >= 80) return 'text-green-600 bg-green-50';
    if (quality >= 60) return 'text-blue-600 bg-blue-50';
    if (quality >= 40) return 'text-yellow-600 bg-yellow-50';
    if (quality >= 20) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const { family, romantic, friends, professional } = categorizeRelationships();

  const getFilteredRelationships = () => {
    switch (selectedCategory) {
      case 'family': return family;
      case 'romantic': return romantic;
      case 'friends': return friends;
      case 'professional': return professional;
      default: return character.familyMembers;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {selectedPerson ? selectedPerson.name : 'Relationships'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {selectedPerson ? `${selectedPerson.relationship} • Age ${selectedPerson.age}` : `${character.familyMembers.length} relationships`}
            </p>
          </div>
          <button
            onClick={selectedPerson ? () => setSelectedPerson(null) : onClose}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          {!selectedPerson ? (
            <div className="p-6">
              {/* Category Filter */}
              <div className="flex gap-2 mb-6 overflow-x-auto">
                {[
                  { id: 'all', label: 'All', count: character.familyMembers.length },
                  { id: 'family', label: 'Family', count: family.length },
                  { id: 'romantic', label: 'Love', count: romantic.length },
                  { id: 'friends', label: 'Friends', count: friends.length },
                  { id: 'professional', label: 'Work', count: professional.length }
                ].map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id as typeof selectedCategory)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>

              {/* Relationships List */}
              <div className="space-y-3">
                {getFilteredRelationships().map(person => (
                  <Card 
                    key={person.id} 
                    className={`cursor-pointer hover:shadow-md transition-all ${!person.alive ? 'opacity-50' : ''}`}
                    onClick={() => setSelectedPerson(person)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">
                          {getRelationshipIcon(person.relationship)}
                          {!person.alive && '💀'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{person.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${getRelationshipColor(person.relationshipQuality)}`}>
                              {person.relationshipQuality}%
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 capitalize">{person.relationship.replace('_', ' ')}</p>
                          <div className="mt-2">
                            <Progress value={person.relationshipQuality} className="h-2" />
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          Age {person.age}
                          {person.health < 100 && (
                            <div className="text-red-500">❤️ {person.health}%</div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {getFilteredRelationships().length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No relationships in this category</p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => onRelationshipAction('find_love')}
                    className="flex items-center gap-2"
                    disabled={character.age < 16}
                  >
                    <Heart className="h-4 w-4" />
                    Find Love
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onRelationshipAction('make_friends')}
                    className="flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Make Friends
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Individual Relationship View */
            <div className="p-6">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">
                      {getRelationshipIcon(selectedPerson.relationship)}
                      {!selectedPerson.alive && '💀'}
                    </div>
                    <h2 className="text-2xl font-bold">{selectedPerson.name}</h2>
                    <p className="text-gray-600 capitalize">{selectedPerson.relationship.replace('_', ' ')}</p>
                    {!selectedPerson.alive && (
                      <p className="text-red-500 font-medium">Deceased</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Relationship Quality</span>
                        <span>{selectedPerson.relationshipQuality}%</span>
                      </div>
                      <Progress value={selectedPerson.relationshipQuality} className="h-3" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="font-medium">Age</div>
                        <div>{selectedPerson.age}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="font-medium">Health</div>
                        <div>{selectedPerson.health}%</div>
                      </div>
                      {selectedPerson.job && (
                        <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                          <div className="font-medium">Job</div>
                          <div>{selectedPerson.job}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interaction Options */}
              {selectedPerson.alive && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Interactions</h3>
                  <div className="grid gap-2">
                    <Button
                      variant="outline"
                      onClick={() => onRelationshipAction('compliment', selectedPerson)}
                      className="justify-start"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Compliment
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => onRelationshipAction('give_gift', selectedPerson)}
                      className="justify-start"
                      disabled={character.wealth < 10}
                    >
                      <Gift className="h-4 w-4 mr-2" />
                      Give Gift ($10)
                    </Button>
                    {(selectedPerson.relationship === 'lover' || selectedPerson.relationship === 'spouse') && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => onRelationshipAction('date_night', selectedPerson)}
                          className="justify-start"
                          disabled={character.wealth < 50}
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Date Night ($50)
                        </Button>
                        {selectedPerson.relationship === 'lover' && (
                          <Button
                            onClick={() => onRelationshipAction('propose', selectedPerson)}
                            disabled={character.wealth < 500}
                          >
                            💍 Propose ($500)
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};
