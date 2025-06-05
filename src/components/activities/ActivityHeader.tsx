
import React from 'react';
import { Character } from '../../types/game';
import { ActivityCategory } from './ActivityData';
import { ChevronRight } from 'lucide-react';

interface ActivityHeaderProps {
  character: Character;
  selectedCategory?: ActivityCategory | null;
  onBack?: () => void;
}

export const ActivityHeader: React.FC<ActivityHeaderProps> = ({
  character,
  selectedCategory,
  onBack
}) => {
  if (selectedCategory) {
    return (
      <div className={`bg-gradient-to-r ${selectedCategory.gradient} p-6 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronRight size={16} className="rotate-180" />
            <span className="font-medium">Back</span>
          </button>
          <div className="text-center flex-1">
            <div className="text-3xl mb-1">{selectedCategory.emoji}</div>
            <h2 className="text-xl font-bold">{selectedCategory.title}</h2>
            <p className="text-white/80 text-sm">{selectedCategory.description}</p>
          </div>
          <div className="w-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      <div className="relative z-10 text-center">
        <div className="text-4xl mb-2">🎯</div>
        <h2 className="text-2xl font-bold">Activities</h2>
        <p className="text-white/80">Choose what to do with your time</p>
        <div className="flex items-center justify-center gap-4 mt-3 text-sm">
          <span className="flex items-center gap-1">
            🎂 Age {character.age}
          </span>
          <span className="flex items-center gap-1">
            💰 ${character.wealth.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
