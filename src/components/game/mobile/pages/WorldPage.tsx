
import React from 'react';
import { Character } from '../../../../types/game';
import { AssetsMenu } from '../../../menus/AssetsMenu';
import { ArrowLeft, Globe, Home, Car, Briefcase, TrendingUp } from 'lucide-react';

interface WorldPageProps {
  character: Character;
  onClose: () => void;
}

export const WorldPage: React.FC<WorldPageProps> = ({
  character,
  onClose
}) => {
  const netWorth = character.wealth || 0;
  const hasAssets = character.assets && character.assets.length > 0;
  const assetCount = character.assets?.length || 0;

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
            <h1 className="text-2xl font-bold text-white">World</h1>
            <p className="text-white/70 text-sm">Explore assets, investments, and opportunities</p>
          </div>
          <div className="w-10 h-10" /> {/* Spacer for centering */}
        </div>

        {/* Wealth Overview */}
        <div className="bg-black/20 backdrop-blur-xl rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Net Worth</span>
            </div>
            <span className="text-2xl font-bold text-white">${netWorth}k</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <Home className="w-6 h-6 mx-auto mb-1 text-blue-400" />
              <div className="text-sm font-bold text-white">0</div>
              <div className="text-xs text-white/60">Properties</div>
            </div>
            <div className="text-center">
              <Car className="w-6 h-6 mx-auto mb-1 text-purple-400" />
              <div className="text-sm font-bold text-white">0</div>
              <div className="text-xs text-white/60">Vehicles</div>
            </div>
            <div className="text-center">
              <Briefcase className="w-6 h-6 mx-auto mb-1 text-orange-400" />
              <div className="text-sm font-bold text-white">{assetCount}</div>
              <div className="text-xs text-white/60">Assets</div>
            </div>
          </div>
        </div>

        {/* Financial Status */}
        <div className="bg-black/20 backdrop-blur-xl rounded-xl p-3 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Financial Status</div>
              <div className="text-white/60 text-sm">
                {netWorth > 1000 ? 'Wealthy' : 
                 netWorth > 500 ? 'Well-off' : 
                 netWorth > 100 ? 'Comfortable' : 
                 netWorth > 50 ? 'Getting by' : 'Struggling'}
              </div>
            </div>
            <Globe className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Assets Content */}
      <div className="flex-1 overflow-y-auto">
        <AssetsMenu
          character={character}
          onClose={onClose}
          isOpen={true}
        />
      </div>
    </div>
  );
};
