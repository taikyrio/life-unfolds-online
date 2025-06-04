
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Character } from '../../../types/game';
import { MusicArtist, MusicRecord, Tour } from '../../../types/career';
import { Music, Users, Disc3, MapPin, BarChart3, X } from 'lucide-react';

interface MusicianDLCProps {
  character: Character;
  onCareerAction: (action: string, data?: any) => void;
}

export const MusicianDLC: React.FC<MusicianDLCProps> = ({ 
  character, 
  onCareerAction 
}) => {
  const [showCreateArtist, setShowCreateArtist] = useState(false);
  const [showCreateRecord, setShowCreateRecord] = useState(false);
  const [showTourPlanning, setShowTourPlanning] = useState(false);
  const [showArtistStats, setShowArtistStats] = useState(false);

  // Mock data - in real implementation this would come from character
  const artists: MusicArtist[] = character.musicArtists || [];
  const selectedArtist = artists[0];

  const musicGenres = [
    'Pop', 'Rock', 'Hip-Hop', 'R&B', 'Country', 'Electronic', 'Jazz', 'Classical'
  ];

  const CreateArtistModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md glass border-white/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-white">Create Artist</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowCreateArtist(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-white/90 block mb-2">Artist Name</label>
            <Input placeholder="Enter artist name" className="bg-white/10 border-white/20 text-white" />
          </div>
          <div>
            <label className="text-sm text-white/90 block mb-2">Genre</label>
            <Select>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {musicGenres.map(genre => (
                  <SelectItem key={genre} value={genre.toLowerCase()}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-white/90 block mb-2">Band Members (1-7)</label>
            <Input type="number" min="1" max="7" defaultValue="1" className="bg-white/10 border-white/20 text-white" />
          </div>
          <Button 
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            onClick={() => {
              onCareerAction('create_artist');
              setShowCreateArtist(false);
            }}
          >
            Create Artist
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const CreateRecordModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md glass border-white/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-white">Create Record</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowCreateRecord(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-white/90 block mb-2">Record Name</label>
            <Input placeholder="Enter record name" className="bg-white/10 border-white/20 text-white" />
          </div>
          <div>
            <label className="text-sm text-white/90 block mb-2">Number of Tracks (1-16)</label>
            <Input type="number" min="1" max="16" defaultValue="8" className="bg-white/10 border-white/20 text-white" />
          </div>
          <div>
            <label className="text-sm text-white/90 block mb-2">Production Time (1-5 years)</label>
            <Input type="number" min="1" max="5" defaultValue="1" className="bg-white/10 border-white/20 text-white" />
          </div>
          <Button 
            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            onClick={() => {
              onCareerAction('create_record');
              setShowCreateRecord(false);
            }}
          >
            Start Production
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  if (showArtistStats && selectedArtist) {
    return (
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          onClick={() => setShowArtistStats(false)}
          className="mb-4 text-white"
        >
          ← Back to Dashboard
        </Button>
        
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {selectedArtist.name} - Artist Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-400">{selectedArtist.fans.toLocaleString()}</div>
                <div className="text-sm text-white/70">Total Fans</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-400">{selectedArtist.records.length}</div>
                <div className="text-sm text-white/70">Records Released</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-400">{selectedArtist.totalRecordsSold.toLocaleString()}</div>
                <div className="text-sm text-white/70">Records Sold</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-400">${selectedArtist.totalEarnings.toLocaleString()}</div>
                <div className="text-sm text-white/70">Total Earnings</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Artist Selection */}
      {artists.length > 0 && (
        <Card className="glass border-white/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className="text-white/90 text-sm">The artist to interact with</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white/10 rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{selectedArtist?.name || 'Me'}</span>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {selectedArtist?.genre || 'Solo'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Actions */}
      <div className="space-y-3">
        <Button
          className="w-full h-12 bg-white/10 hover:bg-white/20 border border-white/20 text-white justify-start"
          onClick={() => setShowCreateArtist(true)}
        >
          <Music className="h-5 w-5 mr-3 text-blue-400" />
          Create Artist
        </Button>

        <Button
          className="w-full h-12 bg-white/10 hover:bg-white/20 border border-white/20 text-white justify-start"
          onClick={() => setShowCreateRecord(true)}
          disabled={artists.length === 0}
        >
          <Disc3 className="h-5 w-5 mr-3 text-green-400" />
          Create Record
        </Button>

        <Button
          className="w-full h-12 bg-gray-600 hover:bg-gray-700 border border-gray-500 text-white justify-start"
          disabled={!selectedArtist || selectedArtist.records.length === 0}
          onClick={() => setShowTourPlanning(true)}
        >
          <MapPin className="h-5 w-5 mr-3 text-orange-400" />
          Go On Tour
        </Button>

        <Button
          className="w-full h-12 bg-white/10 hover:bg-white/20 border border-white/20 text-white justify-start"
          onClick={() => setShowArtistStats(true)}
          disabled={!selectedArtist}
        >
          <BarChart3 className="h-5 w-5 mr-3 text-purple-400" />
          View Artist Stats
        </Button>

        <Button
          className="w-full h-12 bg-red-600/80 hover:bg-red-700 border border-red-500 text-white justify-start"
          disabled={!selectedArtist || !selectedArtist.isActive}
        >
          <Users className="h-5 w-5 mr-3 text-red-300" />
          Disband
        </Button>

        <Button
          className="w-full h-12 bg-blue-600/80 hover:bg-blue-700 border border-blue-500 text-white justify-start"
          disabled={!selectedArtist || selectedArtist.isActive}
        >
          <Music className="h-5 w-5 mr-3 text-blue-300" />
          Reunion
        </Button>
      </div>

      <Button
        className="w-full mt-6 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300"
        onClick={() => onCareerAction('close_music_dashboard')}
      >
        <X className="h-4 w-4 mr-2" />
        Close Music Dashboard
      </Button>

      {/* Modals */}
      {showCreateArtist && <CreateArtistModal />}
      {showCreateRecord && <CreateRecordModal />}
    </div>
  );
};
