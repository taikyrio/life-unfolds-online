
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { Character } from '../../types/game';
import { Artist, Record, MusicCareer } from '../../types/music';
import { MusicDashboard } from '../../components/music/MusicDashboard';
import { ArtistManagement } from '../../components/music/ArtistManagement';
import { RecordProduction } from '../../components/music/RecordProduction';
import { ArtistActions } from '../../components/music/ArtistActions';

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
    hasMoreStudioTime: false,
    artistName: '',
    genre: '',
    recordLabel: '',
    albumsSold: 0,
    tourRevenue: 0,
    fanBase: 0,
    currentAlbum: null,
    totalEarnings: 0,
    awards: [],
    isActive: true
  };

  const artists: Artist[] = musicCareer.artists || [];
  const selectedArtistData = artists.find(a => a.id === selectedArtist);

  const getActiveProductions = () => {
    return artists.reduce((count, artist) => 
      count + artist.records.filter(r => r.inProduction).length, 0
    );
  };

  const canCreateRecord = () => {
    return getActiveProductions() < musicCareer.studioSlots;
  };

  const handleCreateArtist = (artistData: Omit<Artist, 'id' | 'fans' | 'records' | 'tours' | 'disbanded'>) => {
    const artist: Artist = {
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

  const handleCreateRecord = (artistId: string, recordData: Omit<Record, 'id' | 'releaseDate' | 'sales' | 'certified' | 'inProduction' | 'earnings'>) => {
    const record: Record = {
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
      <MusicDashboard artists={artists} />

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
              disabled={character.money < 50000}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl"
            >
              Get More Studio Time ($50k)
            </Button>
          )}
        </div>
      </div>

      <ArtistManagement
        artists={artists}
        selectedArtist={selectedArtist}
        onSelectArtist={setSelectedArtist}
        onCreateArtist={handleCreateArtist}
      />

      {selectedArtistData && (
        <RecordProduction
          selectedArtist={selectedArtistData}
          studioSlots={musicCareer.studioSlots}
          activeProductions={getActiveProductions()}
          canCreateRecord={canCreateRecord()}
          onCreateRecord={handleCreateRecord}
        />
      )}

      <ArtistActions
        selectedArtist={selectedArtistData}
        characterMoney={character.money}
        onTour={(artistId) => onCareerAction('music_go_on_tour', { artistId })}
        onDisband={(artistId) => onCareerAction('music_disband', { artistId })}
        onReunion={(artistId) => onCareerAction('music_reunion', { artistId })}
        onPractice={() => onCareerAction('music_practice')}
        onPromote={() => onCareerAction('music_promote')}
      />
    </div>
  );
};
