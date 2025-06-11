
import React from 'react';
import { Character } from '../../types/game';
import { ComprehensiveEducationSystem } from '../../systems/ComprehensiveEducationSystem';

interface EducationTabProps {
  character: Character;
  onEducationAction: (action: string, data?: any) => void;
}

export const EducationTab: React.FC<EducationTabProps> = ({ 
  character, 
  onEducationAction 
}) => {
  return (
    <div className="h-full bg-white overflow-hidden">
      <div className="h-full overflow-y-auto px-4 py-4">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Education Center</h1>
          <p className="text-sm text-gray-600">Shape your future through learning</p>
          
          {character.education?.currentStage && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-500">Current GPA</p>
              <p className="text-lg font-bold text-blue-600">
                {character.education.gpa.toFixed(2)}
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
