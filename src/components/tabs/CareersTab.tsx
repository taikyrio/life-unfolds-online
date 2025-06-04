
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pb-24">
      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-4 shadow-lg">
            <span className="text-2xl">💼</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Career Center
          </h1>
          <p className="text-gray-600 text-lg">Build your professional future</p>
        </div>
        
        <CareerSystem 
          character={character} 
          onCareerAction={onCareerAction}
        />
      </div>
    </div>
  );
};
