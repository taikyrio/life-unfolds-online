
import React from 'react';
import { Character } from '../../types/game';
import { CareerSystem } from '../../systems/CareerSystem';

interface CareersTabProps {
  character: Character;
  onCareerAction: (action: string, data?: any) => void;
}

export const CareersTab: React.FC<CareersTabProps> = ({ 
  character, 
  onCareerAction 
}) => {
  return (
    <div className="h-full bg-white overflow-hidden">
      <div className="h-full overflow-y-auto px-4 py-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Career Center</h1>
          <p className="text-sm text-gray-600">Build your professional future</p>
        </div>
        
        <CareerSystem 
          character={character} 
          onCareerAction={onCareerAction}
        />
      </div>
    </div>
  );
};
