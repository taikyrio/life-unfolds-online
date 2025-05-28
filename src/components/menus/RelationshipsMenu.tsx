
import React, { useState } from 'react';
import { X, Heart, Gift, Users } from 'lucide-react';
import { Character } from '../../types/game';

interface RelationshipMenuProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
}

export const RelationshipsMenu: React.FC<RelationshipMenuProps> = ({
  isOpen,
  onClose,
  character,
  onActivity
}) => {
  const hasPartner = character.familyMembers.some(member => 
    (member.relationship === 'lover' || member.relationship === 'spouse') && member.alive
  );

  const hasLover = character.familyMembers.some(member => 
    member.relationship === 'lover' && member.alive
  );

  const isMarried = character.relationshipStatus === 'married';
  const isEngaged = character.relationshipStatus === 'engaged';

  const relationshipActions = [
    {
      id: 'find_love',
      title: 'Find Love',
      description: 'Look for someone special',
      emoji: '💕',
      available: !hasPartner && character.age >= 16,
      reason: hasPartner ? 'Already in a relationship' : character.age < 16 ? 'Too young' : null
    },
    {
      id: 'date_night',
      title: 'Date Night',
      description: 'Have a romantic evening with your partner',
      emoji: '🌹',
      available: hasPartner && character.age >= 16 && character.wealth >= 50,
      reason: !hasPartner ? 'Need a partner' : character.age < 16 ? 'Too young' : character.wealth < 50 ? 'Need $50' : null
    },
    {
      id: 'give_gift_flowers',
      title: 'Give Flowers',
      description: 'Give your partner beautiful flowers',
      emoji: '💐',
      available: hasPartner && character.wealth >= 25,
      reason: !hasPartner ? 'Need a partner' : character.wealth < 25 ? 'Need $25' : null
    },
    {
      id: 'give_gift_jewelry',
      title: 'Give Jewelry',
      description: 'Give your partner expensive jewelry',
      emoji: '💎',
      available: hasPartner && character.wealth >= 150,
      reason: !hasPartner ? 'Need a partner' : character.wealth < 150 ? 'Need $150' : null
    },
    {
      id: 'intimate_protected',
      title: 'Intimate Activity (Protected)',
      description: 'Have an intimate moment with protection',
      emoji: '😘',
      available: hasPartner && character.age >= 16,
      reason: !hasPartner ? 'Need a partner' : character.age < 16 ? 'Too young' : null
    },
    {
      id: 'intimate_unprotected',
      title: 'Intimate Activity (Unprotected)',
      description: 'Have an intimate moment without protection',
      emoji: '💕',
      available: hasPartner && character.age >= 16,
      reason: !hasPartner ? 'Need a partner' : character.age < 16 ? 'Too young' : null
    },
    {
      id: 'propose',
      title: 'Propose Marriage',
      description: 'Ask your partner to marry you',
      emoji: '💍',
      available: hasLover && character.age >= 18,
      reason: !hasLover ? 'Need a dating partner' : character.age < 18 ? 'Too young' : null
    },
    {
      id: 'plan_wedding',
      title: 'Get Married',
      description: 'Have a wedding ceremony',
      emoji: '👰',
      available: isEngaged && character.wealth >= 75,
      reason: !isEngaged ? 'Need to be engaged' : character.wealth < 75 ? 'Need $75 for wedding' : null
    },
    {
      id: 'compliment_partner',
      title: 'Compliment Partner',
      description: 'Say something nice to your partner',
      emoji: '💬',
      available: hasPartner,
      reason: !hasPartner ? 'Need a partner' : null
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl transform transition-transform duration-300 ease-out translate-y-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Relationships</h2>
            <p className="text-sm text-gray-600 mt-1">
              Age: {character.age} | Status: {character.relationshipStatus || 'Single'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-105"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="space-y-4">
            <p className="text-gray-600 text-sm mb-4">What would you like to do?</p>
            {relationshipActions.map((action) => (
              <div
                key={action.id}
                className={`p-5 rounded-2xl border-2 transition-all duration-200 ${
                  action.available 
                    ? 'bg-white border-gray-200 hover:border-pink-300 hover:shadow-lg cursor-pointer hover:scale-[1.02]' 
                    : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
                }`}
                onClick={() => action.available && onActivity('relationship', action.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`text-3xl ${action.available ? '' : 'grayscale'}`}>
                    {action.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-lg ${action.available ? 'text-gray-900' : 'text-gray-500'}`}>
                      {action.title}
                    </h3>
                    <p className={`text-sm mt-1 ${action.available ? 'text-gray-600' : 'text-gray-400'}`}>
                      {action.description}
                    </p>
                    
                    {/* Requirements not met */}
                    {!action.available && action.reason && (
                      <div className="mt-2 text-xs text-red-500 bg-red-50 px-3 py-1 rounded-full inline-block">
                        {action.reason}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
