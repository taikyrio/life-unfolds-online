
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, TrendingUp, Clock } from 'lucide-react';
import { Character } from '../../types/game';

interface CurrentJobCardProps {
  character: Character;
  getCurrentSalary: () => number;
  getPromotionRequirements: () => { smartsRequired: number; yearsRequired: number } | null;
  onCareerAction: (action: string, data?: any) => void;
}

export const CurrentJobCard: React.FC<CurrentJobCardProps> = ({
  character,
  getCurrentSalary,
  getPromotionRequirements,
  onCareerAction
}) => {
  if (!character.job) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Briefcase className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Currently Unemployed</h3>
        <p className="text-gray-500">Look for job opportunities below</p>
      </div>
    );
  }

  const promotionReqs = getPromotionRequirements();

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
          <Briefcase className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">{character.job}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              Level {character.jobLevel}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💰</span>
            <span className="font-semibold text-green-800">Annual Salary</span>
          </div>
          <p className="text-2xl font-bold text-green-700">${getCurrentSalary()}k</p>
        </div>

        {promotionReqs && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Next Promotion</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Smarts Required:</span>
                <span className="font-medium text-blue-800">{promotionReqs.smartsRequired}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Years Experience:</span>
                <span className="font-medium text-blue-800">{promotionReqs.yearsRequired}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={() => onCareerAction('work_hard')}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-semibold py-6 transition-all duration-200 hover:scale-105"
          >
            Work Hard
          </Button>
          <Button
            onClick={() => onCareerAction('quit')}
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-red-200 text-red-600 hover:bg-red-50 rounded-2xl px-6 py-6 transition-all duration-200"
          >
            Quit Job
          </Button>
        </div>
      </div>
    </div>
  );
};
