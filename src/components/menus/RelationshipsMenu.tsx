
import React from 'react';
import { Character } from '../../types/game';
import { X } from 'lucide-react';

interface RelationshipsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
}

export const RelationshipsMenu: React.FC<RelationshipsMenuProps> = ({
  isOpen,
  onClose,
  character,
  onActivity
}) => {
  if (!isOpen) return null;

  const relationshipActions = [
    { id: 'find_love', title: '💕 Find Love', category: 'social life' },
    { id: 'date_night', title: '🌹 Date Night', category: 'relationship' },
    { id: 'give_gift_flowers', title: '🌸 Give Flowers', category: 'relationship' },
    { id: 'intimate_protected', title: '😘 Be Intimate (Protected)', category: 'relationship' },
    { id: 'propose', title: '💍 Propose Marriage', category: 'relationship' },
    { id: 'plan_wedding', title: '👰 Plan Wedding', category: 'relationship' },
    { id: 'compliment_partner', title: '💬 Compliment Partner', category: 'relationship' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50">
      <div className="bg-white rounded-t-2xl w-full max-w-md max-h-[70vh] overflow-y-auto animate-slide-in-from-bottom">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Relationships</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-2">
          {relationshipActions.map((action) => (
            <button
              key={action.id}
              onClick={() => {
                onActivity(action.category, action.id);
                onClose();
              }}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="text-base font-medium">{action.title}</div>
            </button>
          ))}
        </div>
        
        {/* Family Members Section */}
        <div className="p-4 border-t">
          <h3 className="text-lg font-semibold mb-3">Family</h3>
          <div className="space-y-2">
            {character.familyMembers?.filter(member => member.alive).map((member) => (
              <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-gray-600 capitalize">{member.relationship} • Age {member.age}</div>
                </div>
                <div className="text-sm">
                  ❤️ {member.relationshipQuality || 50}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
