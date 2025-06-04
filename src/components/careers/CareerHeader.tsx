
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Skull, Trophy, Music } from 'lucide-react';

interface CareerHeaderProps {
  onSelectDLC: (dlc: string) => void;
}

export const CareerHeader: React.FC<CareerHeaderProps> = ({ onSelectDLC }) => {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Star className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Special Careers
        </h2>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Button
          variant="ghost"
          className="group h-auto p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200/50 hover:from-red-100 hover:to-red-150 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          onClick={() => onSelectDLC('criminal')}
        >
          <div className="flex items-center gap-4 w-full">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Skull className="h-6 w-6 text-white" />
            </div>
            <div className="text-left flex-1">
              <div className="font-bold text-red-800 text-lg">Criminal Empire</div>
              <div className="text-sm text-red-600/80">Build your criminal organization</div>
            </div>
          </div>
        </Button>
        
        <Button
          variant="ghost"
          className="group h-auto p-4 bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200/50 hover:from-yellow-100 hover:to-amber-150 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          onClick={() => onSelectDLC('fame')}
        >
          <div className="flex items-center gap-4 w-full">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div className="text-left flex-1">
              <div className="font-bold text-yellow-800 text-lg">Fame & Fortune</div>
              <div className="text-sm text-yellow-600/80">Become a celebrity influencer</div>
            </div>
          </div>
        </Button>

        <Button
          variant="ghost"
          className="group h-auto p-4 bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-200/50 hover:from-purple-100 hover:to-indigo-150 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          onClick={() => onSelectDLC('music')}
        >
          <div className="flex items-center gap-4 w-full">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Music className="h-6 w-6 text-white" />
            </div>
            <div className="text-left flex-1">
              <div className="font-bold text-purple-800 text-lg">Music Industry</div>
              <div className="text-sm text-purple-600/80">Become a world-famous musician</div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};
