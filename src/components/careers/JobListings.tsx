import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Star, GraduationCap, Brain } from 'lucide-react';
import { Character } from '../../types/game';
import { Career } from '../../data/careers/types';

interface JobListingsProps {
  character: Character;
  careerTracks: Career[];
  isEligible: (career: Career) => boolean;
  onCareerAction: (action: string, data?: any) => void;
}

export const JobListings: React.FC<JobListingsProps> = ({
  character,
  careerTracks,
  isEligible,
  onCareerAction
}) => {
  const eligibleCareers = careerTracks.filter(career => isEligible(career));
  const ineligibleCareers = careerTracks.filter(career => !isEligible(career));

  const CareerCard = ({ career, eligible }: { career: Career; eligible: boolean }) => (
    <div className={`
      bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg
      transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
      ${!eligible ? 'opacity-60' : ''}
    `}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800 mb-2">{career.name}</h3>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-1.5 text-sm">
              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-3 w-3 text-green-600" />
              </div>
              <span className="text-gray-600">${Math.floor(career.levels[0]?.salary / 1000)}k</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="h-3 w-3 text-yellow-600" />
              </div>
              <span className="text-gray-600">Level {career.levels.length}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-gray-600">{career.requirements.education || 'None'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                <Brain className="h-3 w-3 text-purple-600" />
              </div>
              <span className="text-gray-600">{career.requirements.stats?.smarts || career.levels[0]?.requirements?.stats?.smarts || 0}+</span>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={() => onCareerAction('apply', { careerId: career.id })}
        disabled={character.job === career.name || !eligible}
        className={`
          w-full rounded-xl font-semibold py-3 transition-all duration-200
          ${character.job === career.name 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
            : eligible
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:scale-105'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }
        `}
      >
        {character.job === career.name ? 'Current Job' : eligible ? 'Apply' : 'Requirements Not Met'}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {eligibleCareers.length > 0 && (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Star className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Available Opportunities</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {eligibleCareers.map(career => (
              <CareerCard key={career.id} career={career} eligible={true} />
            ))}
          </div>
        </div>
      )}

      {ineligibleCareers.length > 0 && (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
              <Star className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-600">Future Opportunities</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ineligibleCareers.map(career => (
              <CareerCard key={career.id} career={career} eligible={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};