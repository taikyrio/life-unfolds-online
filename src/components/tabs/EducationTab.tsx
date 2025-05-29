
import React from 'react';
import { Character } from '../../types/game';
import { EducationSystem } from '../systems/EducationSystem';

interface EducationTabProps {
  character: Character;
  onEducationAction: (action: string, data?: any) => void;
}

export const EducationTab: React.FC<EducationTabProps> = ({ 
  character, 
  onEducationAction 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 pb-24">
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            🎓 Education Center
          </h1>
          <p className="text-gray-600">Invest in your future through learning</p>
        </div>
        
        <EducationSystem 
          character={character} 
          onEducationAction={onEducationAction}
        />
      </div>
    </div>
  );
};
