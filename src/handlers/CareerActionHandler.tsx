import { Character } from '../../types/game';

export const handleCareerAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any
) => {
  let updatedCharacter = { ...character };
  let message = '';
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  switch (action) {
    case 'criminal_operation':
      if (data) {
        const operation = data;
        const successChance = 100 - operation.arrestChance;
        const isSuccessful = Math.random() * 100 < successChance;

        if (isSuccessful) {
          const reward = Math.floor(Math.random() * (operation.maxReward - operation.minReward + 1)) + operation.minReward;
          updatedCharacter.wealth += reward;

          const currentNotoriety = updatedCharacter.flags?.find(f => f.startsWith('notoriety:'))?.split(':')[1] || '0';
          const newNotoriety = Math.min(100, parseInt(currentNotoriety) + operation.notorietyGain);
          updatedCharacter.flags = updatedCharacter.flags?.filter(f => !f.startsWith('notoriety:')) || [];
          updatedCharacter.flags.push(`notoriety:${newNotoriety}`);

          message = `${operation.name} successful! You earned $${reward}k and gained ${operation.notorietyGain} notoriety.`;
        } else {
          updatedCharacter.criminalRecord = {
            arrests: 1,
            convictions: 0,
            prisonTime: 0,
            crimes: [operation.name],
            notoriety: 10
          };
          updatedCharacter.health = Math.max(0, updatedCharacter.health - 20);
          updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 30);
          message = `${operation.name} failed! You were arrested and now have a criminal record.`;
        }
      }
      break;

    case 'murder':
      if (data?.target) {
        const murderChance = 70;
        const isSuccessful = Math.random() * 100 < murderChance;

        if (isSuccessful) {
          if (data.target === 'family_member' && updatedCharacter.familyMembers.length > 0) {
            const familyIndex = Math.floor(Math.random() * updatedCharacter.familyMembers.length);
            const victim = updatedCharacter.familyMembers[familyIndex];
            updatedCharacter.familyMembers[familyIndex].alive = false;
            updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 50);
            message = `You murdered ${victim.name}. The guilt weighs heavily on you.`;
          } else if (data.target === 'stranger') {
            updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 30);
            message = 'You murdered a stranger. The deed is done, but at what cost?';
          }

          const currentNotoriety = updatedCharacter.flags?.find(f => f.startsWith('notoriety:'))?.split(':')[1] || '0';
          const newNotoriety = Math.min(100, parseInt(currentNotoriety) + 30);
          updatedCharacter.flags = updatedCharacter.flags?.filter(f => !f.startsWith('notoriety:')) || [];
          updatedCharacter.flags.push(`notoriety:${newNotoriety}`);
        } else {
          updatedCharacter.criminalRecord = {
            arrests: 1,
            convictions: 0,
            prisonTime: 0,
            crimes: ['Murder attempt'],
            notoriety: 20
          };
          message = 'Murder attempt failed! You were caught and arrested.';
        }
      }
      break;

    case 'coding_practice':
      if (updatedCharacter.age >= 8) {
        const currentCoding = updatedCharacter.flags?.find(f => f.startsWith('coding:'))?.split(':')[1] || '0';
        const newCoding = Math.min(100, parseInt(currentCoding) + 5);
        updatedCharacter.flags = updatedCharacter.flags?.filter(f => !f.startsWith('coding:')) || [];
        updatedCharacter.flags.push(`coding:${newCoding}`);
        updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 3);
        message = `You practiced coding and improved your skills! Coding skill: ${newCoding}/100`;
      }
      break;

    case 'cybercrime':
      if (data && updatedCharacter.age >= 14) {
        const codingSkill = parseInt(updatedCharacter.flags?.find(f => f.startsWith('coding:'))?.split(':')[1] || '0');
        const successChance = Math.min(90, codingSkill * 0.8);
        const isSuccessful = Math.random() * 100 < successChance;

        if (isSuccessful) {
          const reward = Math.floor(codingSkill * 2 + Math.random() * 50);
          updatedCharacter.wealth += reward;

          const currentNotoriety = updatedCharacter.flags?.find(f => f.startsWith('notoriety:'))?.split(':')[1] || '0';
          const newNotoriety = Math.min(100, parseInt(currentNotoriety) + 10);
          updatedCharacter.flags = updatedCharacter.flags?.filter(f => !f.startsWith('notoriety:')) || [];
          updatedCharacter.flags.push(`notoriety:${newNotoriety}`);

          message = `${data.name} successful! You earned $${reward}k through cybercrime.`;
        } else {
          updatedCharacter.criminalRecord = {
            arrests: 1,
            convictions: 0,
            prisonTime: 0,
            crimes: [data.name],
            notoriety: 15
          };
          message = `${data.name} failed! Your digital footprint was traced back to you.`;
        }
      }
      break;

    case 'join_criminal_career':
      if (data?.id) {
        updatedCharacter.job = data.name;
        updatedCharacter.salary = data.baseSalary;
        updatedCharacter.jobLevel = 1;
        message = `You joined the ${data.name} career path!`;
      }
      break;

    case 'apply':
      if (data?.careerId) {
        const careers = {
          'retail': { name: 'Retail Worker', salary: 25 },
          'food_service': { name: 'Food Service Worker', salary: 22 },
          'mechanic': { name: 'Mechanic', salary: 45 },
          'teacher': { name: 'Teacher', salary: 48 },
          'nurse': { name: 'Nurse', salary: 65 },
          'engineer': { name: 'Engineer', salary: 75 },
          'doctor': { name: 'Doctor', salary: 185 },
          'lawyer': { name: 'Lawyer', salary: 125 }
        };

        const career = careers[data.careerId as keyof typeof careers];
        if (career) {
          updatedCharacter.job = career.name;
          updatedCharacter.salary = career.salary;
          updatedCharacter.jobLevel = 1;
          message = `Got hired as a ${career.name}!`;
        }
      }
      break;

    case 'promote':
      if (updatedCharacter.job && updatedCharacter.jobLevel && updatedCharacter.jobLevel < 10) {
        updatedCharacter.jobLevel += 1;
        updatedCharacter.salary = Math.floor((updatedCharacter.salary || 0) * 1.15);
        message = `Promoted to Level ${updatedCharacter.jobLevel}!`;
      }
      break;

    case 'quit':
      updatedCharacter.job = undefined;
      updatedCharacter.salary = 0;
      updatedCharacter.jobLevel = 0;
      message = 'You quit your job.';
      break;
        // Music Career Actions
        case 'music_practice':
          handleMusicPractice();
          break;
        case 'music_write_song':
          handleMusicWriteSong();
          break;
        case 'music_release_single':
          handleMusicReleaseSingle();
          break;
        case 'music_release_album':
          handleMusicReleaseAlbum();
          break;
        case 'music_perform':
          handleMusicPerform();
          break;
        case 'music_promote':
          handleMusicPromote();
          break;
        // New Music Actions
        case 'music_create_artist':
            handleMusicCreateArtist();
            break;
        case 'music_create_record':
            handleMusicCreateRecord();
            break;
        case 'music_go_on_tour':
            handleMusicGoOnTour();
            break;
        case 'music_disband':
            handleMusicDisband();
            break;
        case 'music_reunion':
            handleMusicReunion();
            break;
        case 'music_get_studio_time':
            handleMusicGetStudioTime();
            break;
        default:
          console.log('Unknown career action:', action);
      }


  if (message) {
    ageEvents.push(message);
    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = ageEvents;
    setAgeHistory(newAgeHistory);

    toast({
      title: "Career Update",
      description: message,
    });
  }

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};

  const handleMusicPractice = () => {
    const smartsGain = Math.random() * 5 + 2;
    const happinessGain = Math.random() * 10 + 5;

    const updateCharacter = (updater: any) => {
      onGameStateChange(prevState => ({
        ...prevState,
        character: updater(prevState.character)
      }));
    };

    const showEvent = (event: any) => {
      toast({
        title: event.title,
        description: event.description
      });
    }

    updateCharacter(prev => ({
      ...prev,
      smarts: Math.min(100, prev.smarts + smartsGain),
      happiness: Math.min(100, prev.happiness + happinessGain),
      musicCareer: {
        ...(prev.musicCareer || {}),
        reputation: Math.min(100, ((prev.musicCareer && prev.musicCareer.reputation) || 0) + Math.random() * 3 + 1)
      }
    }));

    showEvent({
      title: '🎵 Music Practice',
      description: `You spent hours practicing your instrument. Your skills improved significantly!`,
      type: 'positive',
      effects: [
        `+${smartsGain.toFixed(1)} Smarts`,
        `+${happinessGain.toFixed(1)} Happiness`,
        '+2 Music Reputation'
      ]
    });
  };

  const handleMusicWriteSong = () => {
    const creativityBonus = Math.random() * 10 + 5;
    const songQuality = Math.random() * 100;

    const updateCharacter = (updater: any) => {
      onGameStateChange(prevState => ({
        ...prevState,
        character: updater(prevState.character)
      }));
    };

    const showEvent = (event: any) => {
      toast({
        title: event.title,
        description: event.description
      });
    }

    updateCharacter(prev => ({
      ...prev,
      smarts: Math.min(100, prev.smarts + creativityBonus * 0.3),
      musicCareer: {
        ...(prev.musicCareer || {}),
        reputation: Math.min(100, ((prev.musicCareer && prev.musicCareer.reputation) || 0) + Math.random() * 5 + 2)
      }
    }));

    showEvent({
      title: '✍️ Song Writing',
      description: `You wrote a new song! ${songQuality > 70 ? 'It sounds amazing!' : songQuality > 40 ? 'It has potential.' : 'It needs more work.'}`,
      type: 'positive',
      effects: [
        `+${creativityBonus.toFixed(1)} Creativity`,
        '+3 Music Reputation'
      ]
    });
  };

  const handleMusicReleaseSingle = () => {
    const fanGain = Math.random() * 1000 + 500;
    const earnings = Math.random() * 5000 + 2000;
    const sales = Math.random() * 10000 + 5000;
    const rating = (Math.random() * 4 + 6).toFixed(1);

     const updateCharacter = (updater: any) => {
      onGameStateChange(prevState => ({
        ...prevState,
        character: updater(prevState.character)
      }));
    };

    const showEvent = (event: any) => {
      toast({
        title: event.title,
        description: event.description
      });
    }

    updateCharacter(prev => ({
      ...prev,
      wealth: (prev.wealth || 0) + earnings,
      musicCareer: {
        ...(prev.musicCareer || {}),
        fans: ((prev.musicCareer && prev.musicCareer.fans) || 0) + fanGain,
        singles: ((prev.musicCareer && prev.musicCareer.singles) || 0) + 1,
        earnings: ((prev.musicCareer && prev.musicCareer.earnings) || 0) + earnings,
        lastRelease: {
          title: `Single #${((prev.musicCareer && prev.musicCareer.singles) || 0) + 1}`,
          type: 'Single',
          sales: Math.floor(sales),
          rating: rating,
          year: new Date().getFullYear()
        }
      }
    }));

    showEvent({
      title: '🎵 Single Released!',
      description: `Your new single is out! It gained ${Math.floor(fanGain)} new fans and earned $${Math.floor(earnings)}.`,
      type: 'positive',
      effects: [
        `+${Math.floor(fanGain)} Fans`,
        `+$${Math.floor(earnings)} Earnings`,
        `${Math.floor(sales)} copies sold`,
        `${rating}/10 rating`
      ]
    });
  };

  const handleMusicReleaseAlbum = () => {
    const fanGain = Math.random() * 5000 + 2000;
    const earnings = Math.random() * 25000 + 10000;
    const sales = Math.random() * 50000 + 20000;
    const rating = (Math.random() * 3 + 7).toFixed(1);

    const updateCharacter = (updater: any) => {
      onGameStateChange(prevState => ({
        ...prevState,
        character: updater(prevState.character)
      }));
    };

    const showEvent = (event: any) => {
      toast({
        title: event.title,
        description: event.description
      });
    }

    updateCharacter(prev => ({
      ...prev,
      wealth: (prev.wealth || 0) + earnings,
      musicCareer: {
        ...(prev.musicCareer || {}),
        fans: ((prev.musicCareer && prev.musicCareer.fans) || 0) + fanGain,
        albums: ((prev.musicCareer && prev.musicCareer.albums) || 0) + 1,
        earnings: ((prev.musicCareer && prev.musicCareer.earnings) || 0) + earnings,
        reputation: Math.min(100, ((prev.musicCareer && prev.musicCareer.reputation) || 0) + Math.random() * 10 + 5),
        lastRelease: {
          title: `Album #${((prev.musicCareer && prev.musicCareer.albums) || 0) + 1}`,
          type: 'Album',
          sales: Math.floor(sales),
          rating: rating,
          year: new Date().getFullYear()
        }
      }
    }));

    showEvent({
      title: '💿 Album Released!',
      description: `Your debut album is a success! It gained ${Math.floor(fanGain)} new fans and earned $${Math.floor(earnings)}.`,
      type: 'major',
      effects: [
        `+${Math.floor(fanGain)} Fans`,
        `+$${Math.floor(earnings)} Earnings`,
        `${Math.floor(sales)} copies sold`,
        `${rating}/10 rating`,
        '+7 Reputation'
      ]
    });
  };

  const handleMusicPerform = () => {
    const fanGain = Math.random() * 2000 + 1000;
    const earnings = Math.random() * 8000 + 3000;
    const performanceQuality = Math.random() * 100;

    const updateCharacter = (updater: any) => {
      onGameStateChange(prevState => ({
        ...prevState,
        character: updater(prevState.character)
      }));
    };

    const showEvent = (event: any) => {
      toast({
        title: event.title,
        description: event.description
      });
    }
    updateCharacter(prev => ({
      ...prev,
      wealth: (prev.wealth || 0) + earnings,
      happiness: Math.min(100, prev.happiness + 15),
      musicCareer: {
        ...(prev.musicCareer || {}),
        fans: ((prev.musicCareer && prev.musicCareer.fans) || 0) + fanGain,
        earnings: ((prev.musicCareer && prev.musicCareer.earnings) || 0) + earnings,
        reputation: Math.min(100, ((prev.musicCareer && prev.musicCareer.reputation) || 0) + Math.random() * 8 + 3)
      }
    }));

    showEvent({
      title: '🎤 Live Performance!',
      description: `You performed live! ${performanceQuality > 70 ? 'The crowd went wild!' : performanceQuality > 40 ? 'The audience loved it!' : 'It was a good show!'}`,
      type: 'positive',
      effects: [
        `+${Math.floor(fanGain)} Fans`,
        `+$${Math.floor(earnings)} Earnings`,
        '+15 Happiness',
        '+5 Reputation'
      ]
    });
  };

  const handleMusicPromote = () => {
    const cost = 1000;
    const fanGain = Math.random() * 3000 + 1500;

    const updateCharacter = (updater: any) => {
      onGameStateChange(prevState => ({
        ...prevState,
        character: updater(prevState.character)
      }));
    };

    const showEvent = (event: any) => {
      toast({
        title: event.title,
        description: event.description
      });
    }

    updateCharacter(prev => ({
      ...prev,
      wealth: (prev.wealth || 0) - cost,
      musicCareer: {
        ...(prev.musicCareer || {}),
        fans: ((prev.musicCareer && prev.musicCareer.fans) || 0) + fanGain,
        reputation: Math.min(100, ((prev.musicCareer && prev.musicCareer.reputation) || 0) + Math.random() * 5 + 2)
      }
    }));

    showEvent({
      title: '📢 Music Promotion',
      description: `You invested in promoting your music across social media and radio. Your fanbase grew significantly!`,
      type: 'positive',
      effects: [
        `-$${cost} Investment`,
        `+${Math.floor(fanGain)} Fans`,
        '+3 Reputation'
      ]
    });
  };

  const handleMusicCreateArtist = () => {
    if (!data?.artist) return;

    const updateCharacter = (updater: any) => {
      onGameStateChange(prevState => ({
        ...prevState,
        character: updater(prevState.character)
      }));
    };

    const showEvent = (event: any) => {
      toast({
        title: event.title,
        description: event.description
      });
    };

    updateCharacter(prev => ({
      ...prev,
      musicCareer: {
        ...(prev.musicCareer || {}),
        artists: [...(prev.musicCareer?.artists || []), data.artist],
        studioSlots: prev.musicCareer?.studioSlots || 2,
        hasMoreStudioTime: prev.musicCareer?.hasMoreStudioTime || false
      }
    }));

    showEvent({
      title: '🎤 Artist Created!',
      description: `You created ${data.artist.name}, a ${data.artist.genre} ${data.artist.members > 1 ? 'band' : 'solo artist'}!`,
      type: 'positive'
    });
  };

  const handleMusicCreateRecord = () => {
    if (!data?.artistId || !data?.record) return;

    const updateCharacter = (updater: any) => {
      onGameStateChange(prevState => ({
        ...prevState,
        character: updater(prevState.character)
      }));
    };

    const showEvent = (event: any) => {
      toast({
        title: event.title,
        description: event.description
      });
    };

    updateCharacter(prev => ({
      ...prev,
      musicCareer: {
        ...(prev.musicCareer || {}),
        artists: (prev.musicCareer?.artists || []).map(artist => 
          artist.id === data.artistId 
            ? { ...artist, records: [...artist.records, data.record] }
            : artist
        )
      }
    }));

    showEvent({
      title: '🎵 Record in Production!',
      description: `Started production on "${data.record.name}" with ${data.record.tracks} tracks. Will be ready in ${data.record.productionTime} year${data.record.productionTime > 1 ? 's' : ''}!`,
      type: 'positive'
    });
  };

  const handleMusicGoOnTour = () => {
    if (!data?.artistId) return;

    const earnings = Math.random() * 50000 + 25000;
    const fansGained = Math.random() * 5000 + 2000;

    const updateCharacter = (updater: any) => {
      onGameStateChange(prevState => ({
        ...prevState,
        character: updater(prevState.character)
      }));
    };

    const showEvent = (event: any) => {
      toast({
        title: event.title,
        description: event.description
      });
    };

    const tour = {
      id: Date.now().toString(),
      name: `Tour ${new Date().getFullYear()}`,
      year: new Date().getFullYear(),
      earnings: Math.floor(earnings),
      fansGained: Math.floor(fansGained)
    };

    updateCharacter(prev => ({
      ...prev,
      wealth: (prev.wealth || 0) + earnings,
      happiness: Math.min(100, prev.happiness + 20),
      musicCareer: {
        ...(prev.musicCareer || {}),
        earnings: ((prev.musicCareer && prev.musicCareer.earnings) || 0) + earnings,
        artists: (prev.musicCareer?.artists || []).map(artist => 
          artist.id === data.artistId 
            ? { 
                ...artist, 
                fans: artist.fans + Math.floor(fansGained),
                tours: [...artist.tours, tour]
              }
            : artist
        )
      }
    }));

    showEvent({
      title: '🎤 Tour Complete!',
      description: `The tour was a huge success! Gained ${Math.floor(fansGained)} fans and earned $${Math.floor(earnings)}.`,
      type: 'major',
      effects: [
        `+${Math.floor(fansGained)} Fans`,
        `+$${Math.floor(earnings)} Earnings`,
        '+20 Happiness'
      ]
    });
  };

  const handleMusicDisband = () => {
    if (!data?.artistId) return;

    const updateCharacter = (updater: any) => {
      onGameStateChange(prevState => ({
        ...prevState,
        character: updater(prevState.character)
      }));
    };

    const showEvent = (event: any) => {
      toast({
        title: event.title,
        description: event.description
      });
    };

    updateCharacter(prev => ({
      ...prev,
      happiness: Math.max(0, prev.happiness - 15),
      musicCareer: {
        ...(prev.musicCareer || {}),
        artists: (prev.musicCareer?.artists || []).map(artist => 
          artist.id === data.artistId 
            ? { ...artist, disbanded: true }
            : artist
        )
      }
    }));

    showEvent({
      title: '💔 Band Disbanded',
      description: 'The band has split up. You can always plan a reunion later!',
      type: 'negative'
    });
  };

  const handleMusicReunion = () => {
    if (!data?.artistId) return;

    const cost = 10000;
    const fanBoost = Math.random() * 3000 + 1000;

    const updateCharacter = (updater: any) => {
      onGameStateChange(prevState => ({
        ...prevState,
        character: updater(prevState.character)
      }));
    };

    const showEvent = (event: any) => {
      toast({
        title: event.title,
        description: event.description
      });
    };

    updateCharacter(prev => ({
      ...prev,
      wealth: (prev.wealth || 0) - cost,
      happiness: Math.min(100, prev.happiness + 25),
      musicCareer: {
        ...(prev.musicCareer || {}),
        artists: (prev.musicCareer?.artists || []).map(artist => 
          artist.id === data.artistId 
            ? { 
                ...artist, 
                disbanded: false,
                fans: artist.fans + Math.floor(fanBoost)
              }
            : artist
        )
      }
    }));

    showEvent({
      title: '🎉 Reunion Success!',
      description: `The band is back together! The reunion generated massive hype and gained ${Math.floor(fanBoost)} new fans.`,
      type: 'major',
      effects: [
        `-$${cost} Reunion Cost`,
        `+${Math.floor(fanBoost)} Fans`,
        '+25 Happiness'
      ]
    });
  };

  const handleMusicGetStudioTime = () => {
    const cost = 50000;

    const updateCharacter = (updater: any) => {
      onGameStateChange(prevState => ({
        ...prevState,
        character: updater(prevState.character)
      }));
    };

    const showEvent = (event: any) => {
      toast({
        title: event.title,
        description: event.description
      });
    };

    updateCharacter(prev => ({
      ...prev,
      wealth: (prev.wealth || 0) - cost,
      musicCareer: {
        ...(prev.musicCareer || {}),
        studioSlots: 4,
        hasMoreStudioTime: true
      }
    }));

    showEvent({
      title: '🏢 Studio Upgraded!',
      description: 'You now have access to more studio time! You can produce up to 4 records simultaneously.',
      type: 'positive',
      effects: [
        `-$${cost} Investment`,
        'Studio slots: 2 → 4'
      ]
    });
  };