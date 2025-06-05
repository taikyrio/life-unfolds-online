
import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Clock } from 'lucide-react';
import { Character, MusicArtist, MusicRecord, MusicCareer } from '../../../types/character';

interface MusicianDLCProps {
  character: Character;
  onCareerAction: (action: string, data?: any) => void;
}

export const MusicianDLC: React.FC<MusicianDLCProps> = ({ 
  character, 
  onCareerAction 
}) => {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  // Age restriction check
  if (character.age < 10) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Music Career Locked</h2>
        <p className="text-gray-600 mb-4">
          You need to be at least 10 years old to start your music career.
        </p>
        <p className="text-gray-500">
          Current age: {character.age} years old
        </p>
      </div>
    );
  }

  const musicCareer: MusicCareer = character.musicCareer || {
    level: 0,
    fans: 0,
    albums: 0,
    singles: 0,
    reputation: 0,
    currentProject: null,
    lastRelease: null,
    earnings: 0,
    artists: [],
    studioSlots: 2,
    hasMoreStudioTime: false
  };

  const artists: MusicArtist[] = musicCareer.artists || [];
  const selectedArtistData = artists.find(a => a.id === selectedArtist);

  const getActiveProductions = () => {
    return artists.reduce((count, artist) => 
      count + artist.records.filter(r => r.inProduction).length, 0
    );
  };

  const canCreateRecord = () => {
    return getActiveProductions() < musicCareer.studioSlots;
  };

  const handleCreateArtist = (artistData: Omit<MusicArtist, 'id' | 'fans' | 'records' | 'tours' | 'disbanded'>) => {
    const artist: MusicArtist = {
      id: Date.now().toString(),
      name: artistData.name,
      genre: artistData.genre,
      members: artistData.members,
      fans: 0,
      records: [],
      tours: [],
      disbanded: false
    };

    onCareerAction('music_create_artist', { artist });
  };

  const handleCreateRecord = (artistId: string, recordData: Omit<MusicRecord, 'id' | 'releaseDate' | 'sales' | 'certified' | 'inProduction' | 'earnings'>) => {
    const record: MusicRecord = {
      id: Date.now().toString(),
      name: recordData.name,
      tracks: recordData.tracks,
      productionTime: recordData.productionTime,
      releaseDate: new Date(Date.now() + recordData.productionTime * 365 * 24 * 60 * 60 * 1000),
      sales: 0,
      certified: false,
      inProduction: true,
      earnings: 0
    };

    onCareerAction('music_create_record', { artistId, record });
  };

  // Check for completed records and trigger life story events
  useEffect(() => {
    const currentDate = new Date();
    artists.forEach(artist => {
      artist.records.forEach(record => {
        if (record.inProduction && new Date(record.releaseDate) <= currentDate) {
          // Record should be released
          onCareerAction('music_complete_record', { 
            artistId: artist.id, 
            recordId: record.id,
            characterAge: character.age
          });
        }
      });
    });
  }, [character.age, artists, onCareerAction]);

  return (
    <div className="space-y-6">
      {/* Music Dashboard */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Music Dashboard</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{musicCareer.fans}</div>
            <div className="text-sm text-gray-600">Total Fans</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{artists.length}</div>
            <div className="text-sm text-gray-600">Artists</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{musicCareer.albums}</div>
            <div className="text-sm text-gray-600">Albums</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">${musicCareer.earnings}</div>
            <div className="text-sm text-gray-600">Earnings</div>
          </div>
        </div>
      </div>

      {/* Studio Status */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Studio Status</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="text-gray-700">
              Production Slots: {getActiveProductions()}/{musicCareer.studioSlots}
            </span>
          </div>
          {!musicCareer.hasMoreStudioTime && (
            <Button
              onClick={() => onCareerAction('music_get_studio_time')}
              disabled={(character.wealth || 0) < 50}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl"
            >
              Get More Studio Time ($50k)
            </Button>
          )}
        </div>
      </div>

      {/* Artist Management */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Artist Management</h2>
        
        {artists.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No artists created yet</p>
            <Button
              onClick={() => handleCreateArtist({
                name: `Artist ${Date.now()}`,
                genre: 'Pop',
                members: 1
              })}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl"
            >
              Create Your First Artist
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {artists.map((artist) => (
              <div key={artist.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{artist.name}</h3>
                    <p className="text-sm text-gray-600">{artist.genre} • {artist.members} members</p>
                    <p className="text-sm text-blue-600">{artist.fans} fans</p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      variant={selectedArtist === artist.id ? "default" : "outline"}
                      onClick={() => setSelectedArtist(artist.id)}
                    >
                      Select
                    </Button>
                    {artist.disbanded ? (
                      <Button
                        size="sm"
                        onClick={() => onCareerAction('music_reunion', { artistId: artist.id })}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Reunion
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onCareerAction('music_disband', { artistId: artist.id })}
                      >
                        Disband
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Record Production */}
      {selectedArtistData && !selectedArtistData.disbanded && (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Record Production</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Selected Artist: {selectedArtistData.name}</span>
              <Button
                onClick={() => handleCreateRecord(selectedArtistData.id, {
                  name: `Album ${Date.now()}`,
                  tracks: 12,
                  productionTime: 1
                })}
                disabled={!canCreateRecord()}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl"
              >
                Create Record
              </Button>
            </div>

            {selectedArtistData.records.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Records:</h3>
                {selectedArtistData.records.map((record) => (
                  <div key={record.id} className="p-3 border rounded bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{record.name}</span>
                        <span className="text-sm text-gray-600 ml-2">
                          {record.tracks} tracks
                        </span>
                      </div>
                      <div className="text-sm">
                        {record.inProduction ? (
                          <span className="text-orange-600">In Production</span>
                        ) : (
                          <span className="text-green-600">{record.sales} sales</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
