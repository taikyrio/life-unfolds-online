
export const getActivityEvent = (activityId: string, character: any) => {
  const events: Record<string, any> = {
    casino: {
      id: `casino_${Date.now()}`,
      title: 'At the Casino',
      description: 'You walk into the bright, noisy casino. What\'s your game?',
      emoji: '🎰',
      choices: [
        {
          id: 'slots',
          text: 'Play the slots ($50)',
          effects: Math.random() > 0.7 ? { wealth: 200, happiness: 30 } : { wealth: -50, happiness: -10 },
          emoji: '🎰'
        },
        {
          id: 'blackjack',
          text: 'Try blackjack ($100)',
          effects: Math.random() > 0.5 ? { wealth: 150, happiness: 25 } : { wealth: -100, happiness: -15 },
          emoji: '🃏'
        },
        {
          id: 'leave',
          text: 'Leave (too risky)',
          effects: { happiness: -5 },
          emoji: '🚪'
        }
      ]
    },

    bar: {
      id: `bar_${Date.now()}`,
      title: 'At the Bar',
      description: 'You\'re at a lively bar. The atmosphere is electric!',
      emoji: '🍺',
      choices: [
        {
          id: 'drink_light',
          text: 'Have a few drinks',
          effects: { happiness: 20, health: -5, wealth: -30 },
          emoji: '🍻'
        },
        {
          id: 'drink_heavy',
          text: 'Party hard!',
          effects: { happiness: 35, health: -20, wealth: -60, relationships: 10 },
          emoji: '🍾'
        },
        {
          id: 'socialize',
          text: 'Just socialize',
          effects: { happiness: 15, relationships: 20 },
          emoji: '💬'
        }
      ]
    },

    date_night: {
      id: `date_${Date.now()}`,
      title: 'Date Night',
      description: 'You\'re on a romantic date with your partner. How do you want to spend the evening?',
      emoji: '🌹',
      choices: [
        {
          id: 'fancy_dinner',
          text: 'Fancy dinner ($100)',
          effects: { happiness: 30, relationships: 25, wealth: -100 },
          emoji: '🍽️'
        },
        {
          id: 'movie_date',
          text: 'Go to movies ($40)',
          effects: { happiness: 20, relationships: 15, wealth: -40 },
          emoji: '🎬'
        },
        {
          id: 'walk_park',
          text: 'Walk in the park (free)',
          effects: { happiness: 25, relationships: 20, health: 5 },
          emoji: '🌳'
        }
      ]
    }
  };

  return events[activityId] || null;
};
