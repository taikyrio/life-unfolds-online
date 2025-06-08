import { Character, GameState } from '../../types/game';

export const handleMusicCareer = (
  character: Character,
  action: string,
  data?: any,
  ageHistory?: Record<number, string[]>,
  setAgeHistory?: React.Dispatch<React.SetStateAction<Record<number, string[]>>>,
  onGameStateChange?: (newState: any) => void,
  gameState?: any,
  toast?: any
) => {
  let updatedCharacter = { ...character };

  switch (action) {
    case 'music_create_artist':
      if (data?.artist) {
        if (!updatedCharacter.musicCareer) {
          updatedCharacter.musicCareer = {
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
        }
        updatedCharacter.musicCareer.artists = [
          ...(updatedCharacter.musicCareer.artists || []),
          data.artist
        ];
        toast?.({
          title: "Music Career",
          description: `Created new artist: ${data.artist.name}`,
        });
      }
      break;

    case 'music_create_record':
      if (data?.artistId && data?.record && updatedCharacter.musicCareer) {
        const artistIndex = updatedCharacter.musicCareer.artists.findIndex(a => a.id === data.artistId);
        if (artistIndex !== -1) {
          updatedCharacter.musicCareer.artists[artistIndex].records.push(data.record);
          toast?.({
            title: "Music Career",
            description: `Started production on "${data.record.name}"`,
          });
        }
      }
      break;

    case 'music_complete_record':
      if (data?.artistId && data?.recordId && updatedCharacter.musicCareer) {
        const artistIndex = updatedCharacter.musicCareer.artists.findIndex(a => a.id === data.artistId);
        if (artistIndex !== -1) {
          const recordIndex = updatedCharacter.musicCareer.artists[artistIndex].records.findIndex(r => r.id === data.recordId);
          if (recordIndex !== -1) {
            const record = updatedCharacter.musicCareer.artists[artistIndex].records[recordIndex];
            record.inProduction = false;

            // Calculate sales based on character stats and randomness
            const baseSlales = Math.floor(Math.random() * 100000) + 10000;
            const smartsBonus = (character.smarts / 100) * 50000;
            const fameBonus = (character.fame / 100) * 100000;

            record.sales = Math.floor(baseSlales + smartsBonus + fameBonus);
            record.earnings = record.sales * 0.5; // $0.50 per sale

            // Update career stats
            updatedCharacter.musicCareer.albums += 1;
            updatedCharacter.musicCareer.earnings += record.earnings;
            updatedCharacter.wealth = (updatedCharacter.wealth || 0) + record.earnings;

            toast?.({
              title: "Music Career",
              description: `"${record.name}" was released! Sold ${record.sales.toLocaleString()} copies and earned $${record.earnings.toLocaleString()}`,
            });
          }
        }
      }
      break;

    case 'music_get_studio_time':
      if (updatedCharacter.musicCareer && (updatedCharacter.wealth || 0) >= 50) {
        updatedCharacter.wealth = (updatedCharacter.wealth || 0) - 50;
        updatedCharacter.musicCareer.studioSlots += 2;
        updatedCharacter.musicCareer.hasMoreStudioTime = true;
        toast?.({
          title: "Music Career",
          description: 'Purchased more studio time! You can now produce more records simultaneously.',
        });
      }
      break;

    case 'music_disband':
      if (data?.artistId && updatedCharacter.musicCareer) {
        const artistIndex = updatedCharacter.musicCareer.artists.findIndex(a => a.id === data.artistId);
        if (artistIndex !== -1) {
          updatedCharacter.musicCareer.artists[artistIndex].disbanded = true;
          toast?.({
            title: "Music Career",
            description: `${updatedCharacter.musicCareer.artists[artistIndex].name} has been disbanded.`,
          });
        }
      }
      break;

    case 'music_reunion':
      if (data?.artistId && updatedCharacter.musicCareer) {
        const artistIndex = updatedCharacter.musicCareer.artists.findIndex(a => a.id === data.artistId);
        if (artistIndex !== -1) {
          updatedCharacter.musicCareer.artists[artistIndex].disbanded = false;
          toast?.({
            title: "Music Career",
            description: `${updatedCharacter.musicCareer.artists[artistIndex].name} has reunited!`,
          });
        }
      }
      break;

    default:
      return;
  }

  if (onGameStateChange && gameState) {
    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });
  }
};