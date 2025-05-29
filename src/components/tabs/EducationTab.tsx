
import React from 'react';
import { Character } from '../../types/game';
import { ComprehensiveEducationSystem } from '../systems/ComprehensiveEducationSystem';

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎓 Education Center
          </h1>
          <p className="text-gray-600 text-lg">Shape your future through learning and growth</p>
          
          {character.education?.currentStage && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Current Academic Standing</p>
              <p className="text-2xl font-bold text-blue-600">
                {character.education.gpa.toFixed(2)} GPA
              </p>
            </div>
          )}
        </div>
        
        <ComprehensiveEducationSystem 
          character={character} 
          onEducationAction={onEducationAction}
        />
      </div>
    </div>
  );
};
