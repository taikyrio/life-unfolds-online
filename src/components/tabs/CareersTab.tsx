
import React from 'react';
import { Character } from '../../types/game';
import { CareerSystem } from '../systems/CareerSystem';

interface CareersTabProps {
  character: Character;
  onCareerAction: (action: string, data?: any) => void;
}

export const CareersTab: React.FC<CareersTabProps> = ({ 
  character, 
  onCareerAction 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-24">
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            💼 Career Center
          </h1>
          <p className="text-gray-600">Build your professional future</p>
        </div>
        
        <CareerSystem 
          character={character} 
          onCareerAction={onCareerAction}
        />
      </div>
    </div>
  );
};
