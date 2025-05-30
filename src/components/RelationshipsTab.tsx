import React, { useState } from 'react';
import { Character, FamilyMember, RelationshipAction } from '../types/game';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, MessageCircle, Gift, ArrowLeft, Phone, Coffee, 
  Home, Smile, Frown, AlertTriangle, X, Check, DollarSign
} from 'lucide-react';
import { relationshipManager, executeRelationshipAction } from '../systems/relationshipSystem';

interface RelationshipsTabProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
}

export const RelationshipsTab: React.FC<RelationshipsTabProps> = ({ 
  character, 
  onCharacterUpdate, 
  onEvent 
}) => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [selectedAction, setSelectedAction] = useState<RelationshipAction | null>(null);
  const [showActionConfirm, setShowActionConfirm] = useState(false);

  const getRelationshipEmoji = (relationship: string) => {
    const emojis = {
      father: '👨‍👦', mother: '👩‍👧', stepfather: '👨‍👦', stepmother: '👩‍👧',
      sibling: '👫', stepsibling: '👫', halfsibling: '👫',
      child: '👶', stepchild: '👶', adoptedchild: '👶',
      grandparent: '👴', grandchild: '👶',
      spouse: '💑', lover: '💕', ex: '💔', affair: '💋',
      friend: '👥', bestfriend: '🤝', acquaintance: '👋',
      enemy: '😠', rival: '⚔️',
      coworker: '🏢', boss: '👔', employee: '👷',
      classmate: '🎓', teacher: '👩‍🏫',
      neighbor: '🏠', stranger: '❓'
    };
    return emojis[relationship as keyof typeof emojis] || '👤';
  };

  const getRelationshipColor = (level: number) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-lime-500';
    if (level >= 40) return 'bg-yellow-500';
    if (level >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getMoodEmoji = (mood: string) => {
    const moods = {
      happy: '😊', sad: '😢', angry: '😠', neutral: '😐', excited: '🤩', stressed: '😰'
    };
    return moods[mood as keyof typeof moods] || '😐';
  };

  const getContextualActions = (member: FamilyMember): RelationshipAction[] => {
    const baseActions = relationshipManager.getAvailableActions(member.relationship);
    const characterAge = character.age;
    const memberAge = member.age || 30;

    // Filter actions based on context and life stage
    return baseActions.filter(action => {
      // Age restrictions
      if (action.minAge && characterAge < action.minAge) return false;
      if (action.maxAge && characterAge > action.maxAge) return false;

      // Life stage contextual filtering
      if (characterAge < 16) {
        // Child - limited actions
        return ['compliment', 'hug', 'spend_time', 'ask_for_money'].includes(action.id);
      }

      if (characterAge < 25) {
        // Young adult - no proposing unless in love
        if (action.id === 'propose' && member.relationshipStats?.relationshipLevel < 80) return false;
      }

      // Special contextual rules
      if (member.relationship === 'child' && memberAge < 10) {
        return ['hug', 'spend_time', 'compliment'].includes(action.id);
      }

      if (member.relationship === 'child' && memberAge >= 10) {
        return ['compliment', 'hug', 'spend_time', 'argue', 'ignore'].includes(action.id);
      }

      return true;
    }).slice(0, 8); // Limit to 8 actions for mobile
  };

  const handleCharacterTap = (member: FamilyMember) => {
    setSelectedMember(member);
  };

  const handleActionSelect = (action: RelationshipAction) => {
    if (action.cost && character.wealth < action.cost) {
      onEvent(`You can't afford this action (costs $${action.cost})`);
      return;
    }

    setSelectedAction(action);
    setShowActionConfirm(true);
  };

  const handleActionConfirm = () => {
    if (selectedAction && selectedMember) {
      const result = executeRelationshipAction(character, selectedMember.id, selectedAction.id);

      // Apply effects to character
      if (result.effects.wealth !== undefined) {
        character.wealth = Math.max(0, character.wealth + result.effects.wealth);
      }
      if (result.effects.happiness !== undefined) {
        character.happiness = Math.max(0, Math.min(100, character.happiness + result.effects.happiness));
      }
      if (result.effects.relationshipStatus) {
        character.relationshipStatus = result.effects.relationshipStatus;
      }

      onCharacterUpdate(character);
      onEvent(result.message);
    }

    setShowActionConfirm(false);
    setSelectedAction(null);
  };

  const canAffordAction = (action: RelationshipAction) => {
    return !action.cost || character.wealth >= action.cost;
  };

  // Mobile-optimized character card
  const renderCharacterCard = (member: FamilyMember) => {
    // Ensure member exists and has required properties
    if (!member) return null;

    const stats = member.relationshipStats || {
      relationshipLevel: 50,
      trust: 50,
      respect: 50,
      love: 0,
      fear: 0,
      lastInteraction: '',
      interactionHistory: []
    };

    // Ensure personality exists with default values
    const personality = member.personality || {
      kindness: 50,
      loyalty: 50,
      intelligence: 50,
      humor: 50,
      ambition: 50,
      stability: 50,
      generosity: 50
    };

    const relationshipLevel = stats.relationshipLevel;

    return (
      <Card 
        key={member.id} 
        className="mb-4 overflow-hidden shadow-md border-l-4 active:scale-95 transition-all duration-200 cursor-pointer"
        style={{ borderLeftColor: getRelationshipColor(relationshipLevel).replace('bg-', '#') }}
        onClick={() => handleCharacterTap(member)}
      >
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            {/* Character Icon & Mood */}
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-1">{getRelationshipEmoji(member.relationship)}</div>
              <div className="text-lg">{getMoodEmoji(member.currentMood || 'neutral')}</div>
            </div>

            {/* Character Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                {!member.alive && <Badge variant="secondary" className="text-xs">💀</Badge>}
                {member.isEstranged && <Badge variant="destructive" className="text-xs">Estranged</Badge>}
              </div>

              <p className="text-sm text-gray-600 capitalize mb-2">
                {member.relationship.replace(/([A-Z])/g, ' $1').trim()} • Age {member.age || 'Unknown'}
              </p>

              {/* Relationship Level Bar */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-700">Relationship</span>
                  <span className="text-xs text-gray-500">{relationshipLevel}%</span>
                </div>
                <Progress value={relationshipLevel} className="h-2" />
              </div>

              {/* Quick Status */}
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <span>💪 {member.health || 100}%</span>
                <span>💖 {stats.trust}%</span>
                {member.job && <span>💼 {member.job}</span>}
              </div>
            </div>

            {/* Tap Indicator */}
            <div className="text-gray-400">
              <div className="text-xl">👆</div>
              <div className="text-xs text-center">Tap</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Mobile-optimized interaction menu
  const renderInteractionMenu = () => {
    if (!selectedMember) return null;

    const availableActions = getContextualActions(selectedMember);
    const stats = selectedMember.relationshipStats || {
      relationshipLevel: 50,
      trust: 50,
      respect: 50,
      love: 0,
      fear: 0,
      lastInteraction: '',
      interactionHistory: []
    };

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedMember(null)}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex items-center space-x-3 flex-1">
              <div className="text-3xl">{getRelationshipEmoji(selectedMember.relationship)}</div>
              <div>
                <h2 className="text-xl font-bold">{selectedMember.name}</h2>
                <p className="text-sm opacity-90 capitalize">
                  {selectedMember.relationship.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            </div>
            <div className="text-2xl">{getMoodEmoji(selectedMember.currentMood || 'neutral')}</div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            {/* Relationship Status */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-gray-800">Relationship Status</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Relationship</div>
                    <div className="flex items-center space-x-2">
                      <Progress value={stats.relationshipLevel} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{stats.relationshipLevel}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Trust</div>
                    <div className="flex items-center space-x-2">
                      <Progress value={stats.trust} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{stats.trust}%</span>
                    </div>
                  </div>
                </div>

                {/* Last Interaction */}
                {stats.interactionHistory && stats.interactionHistory.length > 0 && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Last Interaction</div>
                    <div className="text-sm text-gray-800">
                      {stats.interactionHistory[stats.interactionHistory.length - 1]?.description || 'No recent interactions'}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions Grid */}
            {selectedMember.alive && !selectedMember.isBlocked && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">What would you like to do?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {availableActions.map((action) => {
                    const canUse = canAffordAction(action);
                    return (
                      <Button
                        key={action.id}
                        variant="outline"
                        className={`h-20 flex flex-col items-center justify-center space-y-1 text-xs active:scale-95 transition-all ${
                          !canUse ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
                        }`}
                        disabled={!canUse}
                        onClick={() => handleActionSelect(action)}
                      >
                        <div className="text-xl">{action.emoji}</div>
                        <div className="font-medium text-center">{action.name}</div>
                        {action.cost && (
                          <div className="text-xs text-gray-500">${action.cost}</div>
                        )}
                        {action.riskLevel === 'high' && (
                          <AlertTriangle size={12} className="text-red-500" />
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Deceased Notice */}
            {!selectedMember.alive && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🕊️</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">In Loving Memory</h3>
                <p className="text-gray-600">{selectedMember.name} is no longer with us</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  };

  // Action confirmation modal
  const renderActionConfirmation = () => {
    if (!showActionConfirm || !selectedAction || !selectedMember) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
          <div className="text-center mb-4">
            <div className="text-4xl mb-3">{selectedAction.emoji}</div>
            <h3 className="text-lg font-semibold mb-1">{selectedAction.name}</h3>
            <p className="text-sm text-gray-600 mb-2">with {selectedMember.name}</p>
            <p className="text-xs text-gray-500">{selectedAction.description}</p>

            {selectedAction.cost && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
                💰 Cost: ${selectedAction.cost}
              </div>
            )}

            {selectedAction.riskLevel === 'high' && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                ⚠️ This action may have unpredictable results!
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowActionConfirm(false)}
              className="flex-1 h-12"
            >
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleActionConfirm}
              className={`flex-1 h-12 ${selectedAction.riskLevel === 'high' ? 'bg-red-500 hover:bg-red-600' : ''}`}
            >
              <Check size={16} className="mr-2" />
              Confirm
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  if (selectedMember) {
    return (
      <>
        {renderInteractionMenu()}
        {renderActionConfirmation()}
      </>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="p-4">
        {/* Header */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">👥 Your Relationships</h2>
          <p className="text-sm text-gray-600 mb-4">
            Tap on any person to interact with them
          </p>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{character.familyMembers.length}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {character.familyMembers.filter(m => m.alive).length}
                </div>
                <div className="text-xs text-gray-600">Living</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-600">
                  {character.familyMembers.filter(m => 
                    ['spouse', 'lover'].includes(m.relationship)
                  ).length}
                </div>
                <div className="text-xs text-gray-600">Romantic</div>
              </div>
            </div>
          </div>
        </div>

        {/* Character List */}
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-3">
            {character.familyMembers.length > 0 ? (
              character.familyMembers.map(renderCharacterCard)
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Relationships Yet</h3>
                <p className="text-gray-600 max-w-sm mx-auto text-sm">
                  Your relationships will appear here as you meet people and build connections throughout your life.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {renderActionConfirmation()}
    </div>
  );
};