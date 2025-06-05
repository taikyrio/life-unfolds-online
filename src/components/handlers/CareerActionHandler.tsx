import React from 'react';
import { Character } from '../../types/game';

interface CareerActionHandlerProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
}

export const CareerActionHandler: React.FC<CareerActionHandlerProps> = ({
  character,
  onCharacterUpdate,
  onEvent
}) => {
  const handleCareerAction = (action: string, data?: any) => {
    let updatedCharacter = { ...character };

    switch (action) {
      case 'join_job':
        if (data?.job) {
          updatedCharacter.job = data.job.name;
          updatedCharacter.salary = data.job.salary;
          onEvent(`Started new job as a ${data.job.name} earning $${data.job.salary}`);
        }
        break;

      case 'quit_job':
        updatedCharacter.job = undefined;
        updatedCharacter.salary = undefined;
        onEvent('You quit your job.');
        break;

      case 'get_raise':
        if (data?.raise) {
          updatedCharacter.salary = (updatedCharacter.salary || 0) + data.raise;
          onEvent(`Received a raise of $${data.raise}!`);
        }
        break;

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
              hasMoreStudioTime: false
            };
          }
          updatedCharacter.musicCareer.artists = [
            ...(updatedCharacter.musicCareer.artists || []),
            data.artist
          ];
          onEvent(`Created new artist: ${data.artist.name}`);
        }
        break;

      case 'music_create_record':
        if (data?.artistId && data?.record && updatedCharacter.musicCareer) {
          const artistIndex = updatedCharacter.musicCareer.artists.findIndex(a => a.id === data.artistId);
          if (artistIndex !== -1) {
            updatedCharacter.musicCareer.artists[artistIndex].records.push(data.record);
            onEvent(`Started production on "${data.record.name}"`);
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
              
              onEvent(`"${record.name}" was released! Sold ${record.sales.toLocaleString()} copies and earned $${record.earnings.toLocaleString()}`);
            }
          }
        }
        break;

      case 'music_get_studio_time':
        if (updatedCharacter.musicCareer && (updatedCharacter.wealth || 0) >= 50) {
          updatedCharacter.wealth = (updatedCharacter.wealth || 0) - 50;
          updatedCharacter.musicCareer.studioSlots += 2;
          updatedCharacter.musicCareer.hasMoreStudioTime = true;
          onEvent('Purchased more studio time! You can now produce more records simultaneously.');
        }
        break;

      case 'music_disband':
        if (data?.artistId && updatedCharacter.musicCareer) {
          const artistIndex = updatedCharacter.musicCareer.artists.findIndex(a => a.id === data.artistId);
          if (artistIndex !== -1) {
            updatedCharacter.musicCareer.artists[artistIndex].disbanded = true;
            onEvent(`${updatedCharacter.musicCareer.artists[artistIndex].name} has been disbanded.`);
          }
        }
        break;

      case 'music_reunion':
        if (data?.artistId && updatedCharacter.musicCareer) {
          const artistIndex = updatedCharacter.musicCareer.artists.findIndex(a => a.id === data.artistId);
          if (artistIndex !== -1) {
            updatedCharacter.musicCareer.artists[artistIndex].disbanded = false;
            onEvent(`${updatedCharacter.musicCareer.artists[artistIndex].name} has reunited!`);
          }
        }
        break;

      default:
        return;
    }

    onCharacterUpdate(updatedCharacter);
  };

  return null;
};

export const handleCareerAction = (
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
    case 'join_job':
      if (data?.job) {
        updatedCharacter.job = data.job.name;
        updatedCharacter.salary = data.job.salary;
        toast?.({
          title: "Career",
          description: `Started new job as a ${data.job.name} earning $${data.job.salary}`,
        });
      }
      break;

    case 'quit_job':
      updatedCharacter.job = undefined;
      updatedCharacter.salary = undefined;
      toast?.({
        title: "Career",
        description: 'You quit your job.',
      });
      break;

    case 'get_raise':
      if (data?.raise) {
        updatedCharacter.salary = (updatedCharacter.salary || 0) + data.raise;
        toast?.({
          title: "Career",
          description: `Received a raise of $${data.raise}!`,
        });
      }
      break;

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
            hasMoreStudioTime: false
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
