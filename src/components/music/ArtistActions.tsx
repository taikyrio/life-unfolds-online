
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Star, Music, TrendingUp } from 'lucide-react';
import { Artist } from '../../types/music';

interface ArtistActionsProps {
  selectedArtist: Artist | null;
  characterMoney: number;
  onTour: (artistId: string) => void;
  onDisband: (artistId: string) => void;
  onReunion: (artistId: string) => void;
  onPractice: () => void;
  onPromote: () => void;
}

export const ArtistActions: React.FC<ArtistActionsProps> = ({
  selectedArtist,
  characterMoney,
  onTour,
  onDisband,
  onReunion,
  onPractice,
  onPromote
}) => {
  if (!selectedArtist) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-6">General Actions</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            onClick={onPractice}
            className="h-auto p-4 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl"
          >
            <div className="flex items-center gap-3 w-full">
              <Music className="h-5 w-5" />
              <div className="text-left">
                <div className="font-bold">Practice Music</div>
                <div className="text-xs opacity-90">Improve your skills</div>
              </div>
            </div>
          </Button>

          <Button
            onClick={onPromote}
            disabled={characterMoney < 1000}
            className="h-auto p-4 bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-2xl"
          >
            <div className="flex items-center gap-3 w-full">
              <TrendingUp className="h-5 w-5" />
              <div className="text-left">
                <div className="font-bold">Promote Music</div>
                <div className="text-xs opacity-90">Costs $1,000</div>
              </div>
            </div>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Managing: {selectedArtist.name}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button
          onClick={() => onTour(selectedArtist.id)}
          disabled={selectedArtist.records.length === 0 || selectedArtist.disbanded}
          className="h-auto p-4 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl"
        >
          <div className="flex items-center gap-3 w-full">
            <Users className="h-5 w-5" />
            <div className="text-left">
              <div className="font-bold">Go On Tour</div>
              <div className="text-xs opacity-90">Requires records</div>
            </div>
          </div>
        </Button>

        {selectedArtist.disbanded ? (
          <Button
            onClick={() => onReunion(selectedArtist.id)}
            className="h-auto p-4 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl"
          >
            <div className="flex items-center gap-3 w-full">
              <Star className="h-5 w-5" />
              <div className="text-left">
                <div className="font-bold">Reunion</div>
                <div className="text-xs opacity-90">Reform the group</div>
              </div>
            </div>
          </Button>
        ) : (
          <Button
            onClick={() => onDisband(selectedArtist.id)}
            className="h-auto p-4 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl"
          >
            <div className="flex items-center gap-3 w-full">
              <Users className="h-5 w-5" />
              <div className="text-left">
                <div className="font-bold">Disband</div>
                <div className="text-xs opacity-90">End the group</div>
              </div>
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};
