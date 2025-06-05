
import React, { useState } from 'react';
import { Character, FamilyMember, RelationshipAction } from '../types/game';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, MessageCircle, Gift, ArrowLeft, Phone, Coffee, 
  Home, Smile, Frown, AlertTriangle, X, Check, DollarSign, 
  ChevronRight, Users, Star, Zap, Clock, MapPin
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

  // Categorize family members
  const categorizeMembers = () => {
    const categories = {
      family: character.familyMembers.filter(m => 
        ['father', 'mother', 'stepfather', 'stepmother', 'sibling', 'stepsibling', 
         'halfsibling', 'child', 'stepchild', 'adoptedchild', 'grandparent', 'grandchild'].includes(m.relationship)
      ),
      romantic: character.familyMembers.filter(m => 
        ['spouse', 'lover', 'affair', 'ex'].includes(m.relationship)
      ),
      social: character.familyMembers.filter(m => 
        ['friend', 'bestfriend', 'acquaintance', 'coworker', 'boss', 'employee', 
         'classmate', 'teacher', 'neighbor'].includes(m.relationship)
      ),
      other: character.familyMembers.filter(m => 
        ['enemy', 'rival', 'stranger'].includes(m.relationship)
      )
    };
    return categories;
  };

  const getPersonIcon = (relationship: string) => {
    const icons = {
      father: '👨‍💼', mother: '👩‍💼', stepfather: '👨‍💼', stepmother: '👩‍💼',
      sibling: '👫', stepsibling: '👫', halfsibling: '👫',
      child: '👶', stepchild: '👶', adoptedchild: '👶',
      grandparent: '👴', grandchild: '👶',
      spouse: '💍', lover: '💕', ex: '💔', affair: '🔥',
      friend: '👥', bestfriend: '⭐', acquaintance: '👋',
      enemy: '⚔️', rival: '🏆',
      coworker: '💼', boss: '👔', employee: '👷',
      classmate: '🎓', teacher: '📚',
      neighbor: '🏘️', stranger: '❓'
    };
    return icons[relationship as keyof typeof icons] || '👤';
  };

  const getRelationshipGradient = (level: number) => {
    if (level >= 80) return 'from-emerald-400 to-green-500';
    if (level >= 60) return 'from-blue-400 to-cyan-500';
    if (level >= 40) return 'from-yellow-400 to-orange-500';
    if (level >= 20) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-pink-500';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      family: 'from-purple-500 to-indigo-600',
      romantic: 'from-pink-500 to-rose-600', 
      social: 'from-blue-500 to-cyan-600',
      other: 'from-gray-500 to-slate-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-slate-600';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      family: '👨‍👩‍👧‍👦',
      romantic: '💕',
      social: '👥',
      other: '🌐'
    };
    return icons[category as keyof typeof icons] || '👤';
  };

  const getContextualActions = (member: FamilyMember): RelationshipAction[] => {
    const baseActions = relationshipManager.getAvailableActions(member.relationship);
    const characterAge = character.age;
    const memberAge = member.age || 30;

    return baseActions.filter(action => {
      if (action.minAge && characterAge < action.minAge) return false;
      if (action.maxAge && characterAge > action.maxAge) return false;
      if (characterAge < 16) {
        return ['compliment', 'hug', 'spend_time', 'ask_for_money'].includes(action.id);
      }
      if (characterAge < 25) {
        if (action.id === 'propose' && member.relationshipStats?.relationshipLevel < 80) return false;
      }
      if (member.relationship === 'child' && memberAge < 10) {
        return ['hug', 'spend_time', 'compliment'].includes(action.id);
      }
      if (member.relationship === 'child' && memberAge >= 10) {
        return ['compliment', 'hug', 'spend_time', 'argue', 'ignore'].includes(action.id);
      }
      return true;
    }).slice(0, 8);
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
      const updatedCharacter = { ...character };

      if (result.effects.wealth !== undefined) {
        updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth + result.effects.wealth);
      }
      if (result.effects.happiness !== undefined) {
        updatedCharacter.happiness = Math.max(0, Math.min(100, updatedCharacter.happiness + result.effects.happiness));
      }
      if (result.effects.relationshipStatus) {
        updatedCharacter.relationshipStatus = result.effects.relationshipStatus;
      }

      const memberIndex = updatedCharacter.familyMembers.findIndex(m => m.id === selectedMember.id);
      if (memberIndex !== -1) {
        updatedCharacter.familyMembers[memberIndex] = { 
          ...updatedCharacter.familyMembers[memberIndex],
          ...selectedMember 
        };
      }

      onCharacterUpdate(updatedCharacter);
      onEvent(result.message);
      setSelectedMember(updatedCharacter.familyMembers.find(m => m.id === selectedMember.id) || null);
    }

    setShowActionConfirm(false);
    setSelectedAction(null);
  };

  const canAffordAction = (action: RelationshipAction) => {
    return !action.cost || character.wealth >= action.cost;
  };

  // Modern iOS 19-style character card
  const renderCharacterCard = (member: FamilyMember) => {
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

    const relationshipLevel = stats.relationshipLevel;
    const gradientClass = getRelationshipGradient(relationshipLevel);

    return (
      <div 
        key={member.id} 
        className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] cursor-pointer mb-4"
        onClick={() => handleCharacterTap(member)}
      >
        {/* Subtle gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
        
        <div className="relative p-6">
          <div className="flex items-center space-x-4">
            {/* Enhanced Avatar with glow effect */}
            <div className="relative">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white text-2xl shadow-lg`}>
                {getPersonIcon(member.relationship)}
              </div>
              {/* Status indicator */}
              <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${
                !member.alive ? 'bg-gray-400' : 
                member.isEstranged ? 'bg-red-400' : 
                relationshipLevel >= 80 ? 'bg-green-400' : 
                relationshipLevel >= 60 ? 'bg-blue-400' : 
                'bg-yellow-400'
              } border-2 border-white shadow-sm`} />
            </div>

            {/* Member Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-bold text-xl text-gray-900 truncate">{member.name}</h3>
                {member.age && (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-1">
                    {member.age}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-gray-600 capitalize">
                  {member.relationship.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                {!member.alive && <Badge variant="destructive" className="text-xs rounded-full">💀</Badge>}
                {member.isEstranged && <Badge variant="destructive" className="text-xs rounded-full">Estranged</Badge>}
              </div>

              {/* Modern relationship meter */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">Connection</span>
                  <span className="text-xs font-bold text-gray-700">{relationshipLevel}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${gradientClass} transition-all duration-700 ease-out`}
                    style={{ width: `${relationshipLevel}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Action indicator */}
            <div className="flex flex-col items-center space-y-2">
              <ChevronRight className="text-gray-400 w-6 h-6 group-hover:text-gray-600 transition-colors" />
              {stats.lastInteraction && (
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Recent</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Category section renderer with modern styling
  const renderCategorySection = (title: string, members: FamilyMember[], category: string) => {
    if (members.length === 0) return null;

    const gradientClass = getCategoryColor(category);
    const icon = getCategoryIcon(category);

    return (
      <div className="mb-8">
        {/* Modern category header */}
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${gradientClass} p-6 mb-4 shadow-lg`}>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />
          <div className="relative flex items-center justify-center space-x-3">
            <span className="text-3xl">{icon}</span>
            <h2 className="text-2xl font-bold text-white tracking-wide">{title}</h2>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 rounded-full">
              {members.length}
            </Badge>
          </div>
        </div>
        
        {/* Members list */}
        <div className="space-y-0">
          {members.map(renderCharacterCard)}
        </div>
      </div>
    );
  };

  // Enhanced interaction menu with iOS 19 styling
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

    const gradientClass = getRelationshipGradient(stats.relationshipLevel);

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-gray-100 z-50 flex flex-col">
        {/* Enhanced header with gradient */}
        <div className={`relative overflow-hidden bg-gradient-to-r ${gradientClass} shadow-xl`}>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />
          <div className="relative p-6 pt-12">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedMember(null)}
                className="text-white hover:bg-white/20 p-3 rounded-2xl transition-all duration-200"
              >
                <ArrowLeft size={22} />
              </Button>
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">
                  {getPersonIcon(selectedMember.relationship)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedMember.name}</h2>
                  <p className="text-white/80 font-medium capitalize">
                    {selectedMember.relationship.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Enhanced relationship status card */}
            <Card className="overflow-hidden bg-white/80 backdrop-blur-xl border-white/20 shadow-lg rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Connection Details</h3>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-pink-500" />
                    <span className="text-lg font-bold text-gray-700">{stats.relationshipLevel}%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Bond</span>
                      <span className="text-sm font-bold text-gray-700">{stats.relationshipLevel}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${gradientClass} transition-all duration-500`}
                        style={{ width: `${stats.relationshipLevel}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Trust</span>
                      <span className="text-sm font-bold text-gray-700">{stats.trust}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 transition-all duration-500"
                        style={{ width: `${stats.trust}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Last interaction */}
                {stats.interactionHistory && stats.interactionHistory.length > 0 && (
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">Last Interaction</span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {stats.interactionHistory[stats.interactionHistory.length - 1]?.description || 'No recent interactions'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced actions grid */}
            {selectedMember.alive && !selectedMember.isBlocked && (
              <Card className="overflow-hidden bg-white/80 backdrop-blur-xl border-white/20 shadow-lg rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {availableActions.map((action) => {
                      const canUse = canAffordAction(action);
                      return (
                        <Button
                          key={action.id}
                          variant="outline"
                          className={`group relative overflow-hidden h-24 flex flex-col items-center justify-center space-y-2 text-sm rounded-2xl border-2 transition-all duration-300 ${
                            !canUse 
                              ? 'opacity-40 cursor-not-allowed border-gray-200 bg-gray-50' 
                              : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 hover:scale-105 active:scale-95'
                          }`}
                          disabled={!canUse}
                          onClick={() => handleActionSelect(action)}
                        >
                          {canUse && (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          )}
                          <div className="relative z-10 flex flex-col items-center space-y-2">
                            <div className="text-2xl">{action.emoji}</div>
                            <div className="font-semibold text-center leading-tight">{action.name}</div>
                            {action.cost && (
                              <div className="text-xs text-gray-500 font-medium">${action.cost}</div>
                            )}
                            {action.riskLevel === 'high' && (
                              <AlertTriangle size={14} className="text-amber-500" />
                            )}
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Memorial card for deceased */}
            {!selectedMember.alive && (
              <Card className="overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 shadow-lg rounded-3xl">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-6">🕊️</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">In Loving Memory</h3>
                  <p className="text-gray-600 text-lg">{selectedMember.name}</p>
                  <p className="text-gray-500 text-sm mt-2">Forever in our hearts</p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  };

  // Enhanced action confirmation modal
  const renderActionConfirmation = () => {
    if (!showActionConfirm || !selectedAction || !selectedMember) return null;

    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-white/20">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
              {selectedAction.emoji}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedAction.name}</h3>
            <p className="text-gray-600 font-medium mb-2">with {selectedMember.name}</p>
            <p className="text-sm text-gray-500 leading-relaxed">{selectedAction.description}</p>

            {selectedAction.cost && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
                <div className="flex items-center justify-center space-x-2 text-blue-700">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold">Cost: ${selectedAction.cost}</span>
                </div>
              </div>
            )}

            {selectedAction.riskLevel === 'high' && (
              <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
                <div className="flex items-center justify-center space-x-2 text-amber-700">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">This action may have unpredictable results!</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowActionConfirm(false)}
              className="flex-1 h-14 rounded-2xl border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200"
            >
              <X size={18} className="mr-2" />
              <span className="font-semibold">Cancel</span>
            </Button>
            <Button
              onClick={handleActionConfirm}
              className={`flex-1 h-14 rounded-2xl font-semibold transition-all duration-200 ${
                selectedAction.riskLevel === 'high' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
              } text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95`}
            >
              <Check size={18} className="mr-2" />
              <span>Confirm</span>
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

  const categories = categorizeMembers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern header with glassmorphism */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="p-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Connections
              </h1>
            </div>
            <p className="text-gray-600 font-medium">
              Your relationship network • {character.familyMembers.length} people
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="p-6 pb-24">
          {/* Categories */}
          {renderCategorySection("Family", categories.family, "family")}
          {renderCategorySection("Romance", categories.romantic, "romantic")}
          {renderCategorySection("Social Circle", categories.social, "social")}
          {renderCategorySection("Others", categories.other, "other")}

          {/* Enhanced empty state */}
          {character.familyMembers.length === 0 && (
            <div className="text-center py-16 px-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">Your Story Begins</h3>
              <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
                Build meaningful connections and relationships as you navigate through life's journey.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {renderActionConfirmation()}
    </div>
  );
};
