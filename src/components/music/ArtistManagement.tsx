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

    // Show success toast notification
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('show-toast', {
        detail: {
          title: "Artist Created!",
          description: `${newArtist.name} has been successfully created in the ${newArtist.genre} genre.`,
          type: "success"
        }
      });
      window.dispatchEvent(event);
    }
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

      {/* Create Artist Modal - Full Screen */}
      {showCreateArtist && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" onClick={(e) => e.target === e.currentTarget && setShowCreateArtist(false)}>
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Header - Fixed */}
            <div className="flex items-center justify-between p-8 pb-6 border-b border-gray-200">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Create New Artist</h3>
              <button 
                onClick={() => setShowCreateArtist(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-8 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium mb-3 text-gray-700">Artist Name</label>
                    <Input
                      value={newArtist.name}
                      onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
                      placeholder="Enter artist name"
                      className="text-lg p-4 h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium mb-3 text-gray-700">Genre</label>
                    <Select value={newArtist.genre} onValueChange={(value) => setNewArtist({ ...newArtist, genre: value })}>
                      <SelectTrigger className="text-lg p-4 h-12">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map(genre => (
                          <SelectItem key={genre} value={genre} className="text-lg">{genre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-lg font-medium mb-3 text-gray-700">Members (1-7)</label>
                    <Input
                      type="number"
                      min="1"
                      max="7"
                      value={newArtist.members}
                      onChange={(e) => handleMembersChange(e.target.value)}
                      className="text-lg p-4 h-12"
                    />
                  </div>
                </div>

                {/* Right Column - Create Button */}
                <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold mb-2 text-purple-800">Ready to Create?</h4>
                    <p className="text-gray-600">Fill in the details and create your artist</p>
                  </div>
                  <Button 
                    onClick={handleCreateArtist} 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl py-6 h-16 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg"
                    disabled={!newArtist.name?.trim() || !newArtist.genre}
                  >
                    {!newArtist.name?.trim() || !newArtist.genre ? 'Fill in all fields' : 'Create Artist'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom Cancel Button - Fixed */}
            <div className="p-8 pt-6 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateArtist(false)} 
                className="w-full text-lg py-3 h-12 border-2"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};