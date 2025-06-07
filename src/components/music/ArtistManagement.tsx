
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Users, Award } from 'lucide-react';
import { Artist } from '../../types/music';

interface ArtistManagementProps {
  artists: Artist[];
  selectedArtist: string | null;
  onSelectArtist: (artistId: string) => void;
  onCreateArtist: (artist: Omit<Artist, 'id' | 'fans' | 'records' | 'tours' | 'disbanded'>) => void;
}

export const ArtistManagement: React.FC<ArtistManagementProps> = ({
  artists,
  selectedArtist,
  onSelectArtist,
  onCreateArtist
}) => {
  const [showCreateArtist, setShowCreateArtist] = useState(false);
  const [newArtist, setNewArtist] = useState({
    name: '',
    genre: '',
    members: 1
  });

  const genres = [
    'Pop', 'Rock', 'Hip-Hop', 'R&B', 'Country', 'Electronic', 'Jazz', 
    'Classical', 'Folk', 'Reggae', 'Punk', 'Metal', 'Blues', 'Alternative'
  ];

  const handleCreateArtist = () => {
    if (!newArtist.name || !newArtist.genre) return;
    
    onCreateArtist(newArtist);
    setNewArtist({ name: '', genre: '', members: 1 });
    setShowCreateArtist(false);
  };

  const handleMembersChange = (value: string) => {
    const memberCount = parseInt(value) || 1;
    setNewArtist({ ...newArtist, members: memberCount });
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Your Artists</h2>
        <Button
          onClick={() => setShowCreateArtist(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Artist
        </Button>
      </div>

      {artists.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No artists created yet. Create your first artist to start your music career!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {artists.map(artist => (
            <Card key={artist.id} className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
              selectedArtist === artist.id ? 'ring-2 ring-purple-500' : ''
            } ${artist.disbanded ? 'opacity-60' : ''}`}
              onClick={() => onSelectArtist(artist.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{artist.name}</span>
                  {artist.disbanded && <Badge variant="secondary">Disbanded</Badge>}
                </CardTitle>
                <p className="text-sm text-gray-600">{artist.genre} • {artist.members} members</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="text-gray-500">Fans</div>
                    <div className="font-bold">{artist.fans.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Records</div>
                    <div className="font-bold">{artist.records.length}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Tours</div>
                    <div className="font-bold">{artist.tours.length}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Artist Modal */}
      {showCreateArtist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Create New Artist</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Artist Name</label>
                <Input
                  value={newArtist.name}
                  onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
                  placeholder="Enter artist name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Genre</label>
                <Select value={newArtist.genre} onValueChange={(value) => setNewArtist({ ...newArtist, genre: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Members (1-7)</label>
                <Input
                  type="number"
                  min="1"
                  max="7"
                  value={newArtist.members}
                  onChange={(e) => handleMembersChange(e.target.value)}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateArtist} className="flex-1">Create Artist</Button>
                <Button variant="outline" onClick={() => setShowCreateArtist(false)} className="flex-1">Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
