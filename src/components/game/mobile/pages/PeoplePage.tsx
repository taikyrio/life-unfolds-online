
import React, { useState } from 'react';
import { Character, GameState, FamilyMember } from '../../../../types/game';
import { ArrowLeft, Users, Heart, MessageCircle, Search } from 'lucide-react';
import { InteractiveRelationshipCard } from '../InteractiveRelationshipCard';
import { RelationshipDiscovery } from '../RelationshipDiscovery';
import { RelationshipTabs } from '../RelationshipTabs';
import { executeRelationshipAction, generateNewRelationship } from '../../../../utils/relationshipActions';
import { useToast } from '@/hooks/use-toast';

interface PeoplePageProps {
  character: Character;
  gameState: GameState;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
  onClose: () => void;
}

export const PeoplePage: React.FC<PeoplePageProps> = ({
  character,
  gameState,
  onCharacterUpdate,
  onEvent,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  // Ensure familyMembers is always an array
  const familyMembers = Array.isArray(character.familyMembers) ? character.familyMembers : [];
  
  const relationshipCount = familyMembers.length;
  const friendsCount = familyMembers.filter(member => ['friend', 'bestfriend', 'acquaintance'].includes(member.relationship)).length;
  const familyCount = familyMembers.filter(member => ['father', 'mother', 'sibling', 'child', 'spouse', 'grandparent'].includes(member.relationship)).length;

  const getFilteredRelationships = () => {
    switch (activeTab) {
      case 'family':
        return familyMembers.filter(r => ['father', 'mother', 'sibling', 'child', 'spouse', 'grandparent', 'cousin'].includes(r.relationship));
      case 'romance':
        return familyMembers.filter(r => ['spouse', 'lover', 'ex'].includes(r.relationship));
      case 'friends':
        return familyMembers.filter(r => ['friend', 'bestfriend', 'acquaintance'].includes(r.relationship));
      case 'work':
        return familyMembers.filter(r => ['coworker', 'boss', 'employee'].includes(r.relationship));
      default:
        return familyMembers;
    }
  };

  const handleRelationshipAction = (actionId: string, memberId: string) => {
    const member = familyMembers.find(m => m.id === memberId);
    if (!member) return;

    const result = executeRelationshipAction(character, member, actionId);
    
    if (result.success) {
      // Update character stats
      const updatedCharacter = { ...character };
      
      // Apply character effects
      if (result.characterEffects.happiness) {
        updatedCharacter.happiness = Math.max(0, Math.min(100, updatedCharacter.happiness + result.characterEffects.happiness));
      }
      if (result.characterEffects.wealth) {
        updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth + result.characterEffects.wealth);
      }
      if (result.characterEffects.health) {
        updatedCharacter.health = Math.max(0, Math.min(100, updatedCharacter.health + result.characterEffects.health));
      }
      if (result.characterEffects.relationships) {
        updatedCharacter.relationships = Math.max(0, Math.min(100, updatedCharacter.relationships + result.characterEffects.relationships));
      }

      // Update relationship quality
      const memberIndex = updatedCharacter.familyMembers.findIndex(m => m.id === memberId);
      if (memberIndex !== -1) {
        updatedCharacter.familyMembers[memberIndex].relationshipQuality = result.newRelationshipQuality;
      }

      onCharacterUpdate(updatedCharacter);
      onEvent(result.message);
      
      toast({
        title: "Interaction Complete",
        description: result.message,
      });
    } else {
      toast({
        title: "Action Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const handleDiscoveryAction = (method: string) => {
    const newRelationship = generateNewRelationship(method, character.age);
    
    if (newRelationship) {
      const updatedCharacter = {
        ...character,
        familyMembers: [...familyMembers, newRelationship],
        happiness: Math.min(100, character.happiness + 5),
        relationships: Math.min(100, character.relationships + 3)
      };

      onCharacterUpdate(updatedCharacter);
      onEvent(`You met ${newRelationship.name} through ${method.replace('_', ' ')}!`);
      
      toast({
        title: "New Connection!",
        description: `You met ${newRelationship.name}!`,
      });
    } else {
      toast({
        title: "No Luck",
        description: "You didn't meet anyone new this time. Try again later!",
      });
    }
  };

  const filteredRelationships = getFilteredRelationships();

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden animate-slide-in-bottom">
      {/* Header with back button */}
      <div className="px-4 pt-12 pb-4 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-200 touch-target"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-white">People</h1>
            <p className="text-white/70 text-xs sm:text-sm">Your social network & relationships</p>
          </div>
          <div className="w-10 h-10" /> {/* Spacer for centering */}
        </div>

        {/* Relationship Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-2 sm:p-3 border border-white/10 text-center">
            <Users className="w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1 text-blue-400" />
            <div className="text-sm sm:text-lg font-bold text-white">{relationshipCount}</div>
            <div className="text-xs text-white/60">Total</div>
          </div>
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-2 sm:p-3 border border-white/10 text-center">
            <Heart className="w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1 text-red-400" />
            <div className="text-sm sm:text-lg font-bold text-white">{familyCount}</div>
            <div className="text-xs text-white/60">Family</div>
          </div>
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-2 sm:p-3 border border-white/10 text-center">
            <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-1 text-green-400" />
            <div className="text-sm sm:text-lg font-bold text-white">{friendsCount}</div>
            <div className="text-xs text-white/60">Friends</div>
          </div>
        </div>

        {/* Social Level */}
        <div className="bg-black/20 backdrop-blur-xl rounded-xl p-3 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium text-sm">Social Level</div>
              <div className="text-white/60 text-xs">Based on relationship quality</div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold text-sm">{character.relationships}/100</div>
              <div className="w-16 h-2 bg-black/40 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${character.relationships}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto mobile-scroll px-4 pb-32">
        {/* Relationship Discovery */}
        <RelationshipDiscovery
          characterAge={character.age}
          onDiscoverAction={handleDiscoveryAction}
        />

        {/* Relationship Tabs */}
        <RelationshipTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          relationships={familyMembers}
        />

        {/* Relationships List */}
        <div className="space-y-3">
          {filteredRelationships.length > 0 ? (
            filteredRelationships.map((member) => (
              <InteractiveRelationshipCard
                key={member.id}
                member={member}
                onAction={handleRelationshipAction}
                characterAge={character.age}
              />
            ))
          ) : (
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-white font-semibold mb-2">
                {activeTab === 'all' ? 'No relationships yet' : `No ${activeTab} connections`}
              </h3>
              <p className="text-white/60 text-sm mb-4">
                {activeTab === 'all' 
                  ? 'Start meeting people to build your social network!' 
                  : `Use the "Meet New People" section above to find ${activeTab} connections!`
                }
              </p>
              <Search className="w-8 h-8 mx-auto text-white/40" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
