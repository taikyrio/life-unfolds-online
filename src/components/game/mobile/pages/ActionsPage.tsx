
import React from 'react';
import { Character } from '../../../../types/game';
import { ActivitiesMenu } from '../../../menus/ActivitiesMenu';
import { ArrowLeft, Zap, Target, Clock, TrendingUp } from 'lucide-react';

interface ActionsPageProps {
  character: Character;
  onActivity: (activityType: string, activityId: string | object) => void;
  onClose: () => void;
  onActivityComplete?: () => void;
}

export const ActionsPage: React.FC<ActionsPageProps> = ({
  character,
  onActivity,
  onClose,
  onActivityComplete
}) => {
  const getMotivationLevel = () => {
    const happiness = character.happiness;
    if (happiness > 80) return { level: 'High', color: 'text-green-400', description: 'Ready for anything!' };
    if (happiness > 60) return { level: 'Good', color: 'text-blue-400', description: 'Feeling motivated' };
    if (happiness > 40) return { level: 'Okay', color: 'text-yellow-400', description: 'Could be better' };
    return { level: 'Low', color: 'text-red-400', description: 'Need some motivation' };
  };

  const motivation = getMotivationLevel();

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden animate-slide-in-bottom">
      {/* Header with back button */}
      <div className="px-4 pt-12 pb-4 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-white">Menu</h1>
            <p className="text-white/70 text-sm">Choose what to do with your time</p>
          </div>
          <div className="w-10 h-10" /> {/* Spacer for centering */}
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Energy</span>
            </div>
            <div className="text-lg font-bold text-white">{character.health}%</div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-500"
                style={{ width: `${character.health}%` }}
              />
            </div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-3 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Motivation</span>
            </div>
            <div className={`text-lg font-bold ${motivation.color}`}>{motivation.level}</div>
            <div className="text-xs text-white/60">{motivation.description}</div>
          </div>
        </div>

        {/* Time & Age Reminder */}
        <div className="bg-black/20 backdrop-blur-xl rounded-xl p-3 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-white font-medium">Age {character.age}</div>
                <div className="text-white/60 text-sm">Make every year count</div>
              </div>
            </div>
            <div className="text-right">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-1" />
              <div className="text-xs text-white/60">Growth</div>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Content */}
      <div className="flex-1 overflow-y-auto">
        <ActivitiesMenu
          character={character}
          onActivity={onActivity}
          onClose={onClose}
          onActivityComplete={onActivityComplete}
          isOpen={true}
        />
      </div>
    </div>
  );
};
