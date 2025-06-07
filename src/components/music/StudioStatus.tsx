
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface StudioStatusProps {
  studioSlots: number;
  activeProductions: number;
  hasMoreStudioTime: boolean;
  characterMoney: number;
  onGetStudioTime: () => void;
}

export const StudioStatus: React.FC<StudioStatusProps> = ({
  studioSlots,
  activeProductions,
  hasMoreStudioTime,
  characterMoney,
  onGetStudioTime
}) => {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Studio Status</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          <span className="text-gray-700">
            Production Slots: {activeProductions}/{studioSlots}
          </span>
        </div>
        {!hasMoreStudioTime && (
          <Button
            onClick={onGetStudioTime}
            disabled={characterMoney < 50000}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl"
          >
            Get More Studio Time ($50k)
          </Button>
        )}
      </div>
    </div>
  );
};
