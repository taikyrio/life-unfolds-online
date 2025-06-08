import React, { useState, useEffect } from 'react';
import { Character } from '../../types/character';
import { Artist, Record, MusicCareer } from '../../types/music';
import { MusicDashboard } from '../../components/music/MusicDashboard';
import { ArtistManagement } from '../../components/music/ArtistManagement';
import { RecordProduction } from '../../components/music/RecordProduction';
import { ArtistActions } from '../../components/music/ArtistActions';
import { StudioStatus } from '../../components/music/StudioStatus';

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

      <StudioStatus
        studioSlots={musicCareer.studioSlots}
        activeProductions={getActiveProductions()}
        hasMoreStudioTime={musicCareer.hasMoreStudioTime}
        characterMoney={character.money || 0}
        onGetStudioTime={() => onCareerAction('music_get_studio_time')}
      />

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
        characterMoney={character.money || 0}
        onTour={(artistId) => onCareerAction('music_go_on_tour', { artistId })}
        onDisband={(artistId) => onCareerAction('music_disband', { artistId })}
        onReunion={(artistId) => onCareerAction('music_reunion', { artistId })}
        onPractice={() => onCareerAction('music_practice')}
        onPromote={() => onCareerAction('music_promote')}
      />
    </div>
  );
};