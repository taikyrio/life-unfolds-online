
import React from 'react';
import { Music, Users, RadioIcon, Award, Star } from 'lucide-react';
import { Artist } from '../../types/music';

interface MusicDashboardProps {
  artists: Artist[];
}

export const MusicDashboard: React.FC<MusicDashboardProps> = ({ artists }) => {
  const totalFans = artists.reduce((sum, artist) => sum + artist.fans, 0);
  const totalRecords = artists.reduce((sum, artist) => sum + artist.records.length, 0);
  const totalTours = artists.reduce((sum, artist) => sum + artist.tours.length, 0);

  const getMusicLevel = () => {
    if (totalFans < 1000) return 'Bedroom Producer';
    if (totalFans < 10000) return 'Local Artist';
    if (totalFans < 100000) return 'Rising Star';
    if (totalFans < 1000000) return 'Popular Artist';
    if (totalFans < 10000000) return 'Major Artist';
    return 'Global Superstar';
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center">
          <Music className="h-8 w-8 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Music Industry Dashboard
          </h1>
          <p className="text-gray-600">Manage your music career and artists</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center border border-purple-200">
          <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <div className="text-sm text-purple-600 mb-1">Total Fans</div>
          <div className="text-lg font-bold text-purple-800">{totalFans.toLocaleString()}</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 text-center border border-blue-200">
          <RadioIcon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <div className="text-sm text-blue-600 mb-1">Artists</div>
          <div className="text-lg font-bold text-blue-800">{artists.length}</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center border border-green-200">
          <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-sm text-green-600 mb-1">Records</div>
          <div className="text-lg font-bold text-green-800">{totalRecords}</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 text-center border border-yellow-200">
          <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
          <div className="text-sm text-yellow-600 mb-1">Level</div>
          <div className="text-xs font-bold text-yellow-800">{getMusicLevel()}</div>
        </div>
      </div>
    </div>
  );
};
