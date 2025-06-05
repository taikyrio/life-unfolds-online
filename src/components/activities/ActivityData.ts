
export interface Activity {
  id: string;
  name: string;
  emoji: string;
  description?: string;
  minAge: number;
  maxAge?: number;
  minWealth?: number;
  requiresPartner?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard' | 'extreme';
  category?: string;
}

export interface ActivityCategory {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  activities: Activity[];
  unlockAge: number;
}

export const getActivityCategories = (): ActivityCategory[] => {
  return [
    {
      id: 'mind_body',
      title: 'Mind & Body',
      description: 'Develop yourself physically and mentally',
      emoji: '🧠',
      gradient: 'from-blue-500 to-purple-600',
      unlockAge: 1,
      activities: [
        { id: 'play_toys', name: 'Play with Toys', emoji: '🧸', description: 'Have fun with toys and develop creativity', minAge: 1, maxAge: 8 },
        { id: 'watch_cartoons', name: 'Watch Cartoons', emoji: '📺', description: 'Enjoy animated shows', minAge: 2, maxAge: 12 },
        { id: 'read_books', name: 'Read Books', emoji: '📚', description: 'Expand your knowledge and imagination', minAge: 4 },
        { id: 'study_harder', name: 'Study Extra', emoji: '📖', description: 'Put in extra effort at school', minAge: 6 },
        { id: 'meditation', name: 'Meditate', emoji: '🧘', description: 'Find inner peace and reduce stress', minAge: 10 },
        { id: 'gym', name: 'Go to Gym', emoji: '🏋️', description: 'Build strength and stay healthy', minAge: 14, minWealth: 30 },
        { id: 'yoga', name: 'Practice Yoga', emoji: '🤸', description: 'Improve flexibility and mindfulness', minAge: 12 },
        { id: 'martial_arts', name: 'Learn Martial Arts', emoji: '🥋', description: 'Master self-defense techniques', minAge: 6, minWealth: 50 },
        { id: 'therapy', name: 'Go to Therapy', emoji: '🛋️', description: 'Work on mental health', minAge: 16, minWealth: 100 },
        { id: 'plastic_surgery', name: 'Plastic Surgery', emoji: '💉', description: 'Enhance your appearance', minAge: 18, minWealth: 5000, difficulty: 'medium' }
      ]
    },
    {
      id: 'social',
      title: 'Social Life',
      description: 'Connect with friends and family',
      emoji: '👥',
      gradient: 'from-pink-500 to-rose-600',
      unlockAge: 3,
      activities: [
        { id: 'peek_a_boo', name: 'Play Peek-a-Boo', emoji: '👶', description: 'Simple fun with family', minAge: 1, maxAge: 4 },
        { id: 'playground', name: 'Go to Playground', emoji: '🛝', description: 'Play with other children', minAge: 3, maxAge: 12 },
        { id: 'make_friends', name: 'Make Friends', emoji: '🤝', description: 'Build new friendships', minAge: 5 },
        { id: 'hang_friends', name: 'Hang with Friends', emoji: '🎈', description: 'Spend quality time together', minAge: 6 },
        { id: 'join_club', name: 'Join School Club', emoji: '🎭', description: 'Participate in extracurricular activities', minAge: 13 },
        { id: 'volunteer', name: 'Volunteer', emoji: '🤲', description: 'Help your community', minAge: 14 },
        { id: 'party', name: 'Go to Party', emoji: '🎉', description: 'Have fun but watch your health', minAge: 16 },
        { id: 'networking', name: 'Network', emoji: '🤵', description: 'Build professional connections', minAge: 18, minWealth: 100 }
      ]
    },
    {
      id: 'romance',
      title: 'Love & Romance',
      description: 'Find love and build relationships',
      emoji: '💕',
      gradient: 'from-red-500 to-pink-600',
      unlockAge: 13,
      activities: [
        { id: 'ask_out', name: 'Ask Someone Out', emoji: '🌹', description: 'Take the first step in romance', minAge: 13 },
        { id: 'school_dance', name: 'School Dance', emoji: '💃', description: 'Dance the night away', minAge: 14 },
        { id: 'find_love', name: 'Find Love', emoji: '💖', description: 'Look for your soulmate', minAge: 16 },
        { id: 'date_night', name: 'Date Night', emoji: '🍽️', description: 'Romantic evening out', minAge: 16, minWealth: 50, requiresPartner: true },
        { id: 'hookup', name: 'Hook Up', emoji: '😘', description: 'Casual romantic encounter', minAge: 18 },
        { id: 'propose', name: 'Propose', emoji: '💍', description: 'Pop the question', minAge: 18, minWealth: 1000, requiresPartner: true },
        { id: 'honeymoon', name: 'Honeymoon', emoji: '🏝️', description: 'Romantic getaway', minAge: 18, minWealth: 2000, requiresPartner: true }
      ]
    },
    {
      id: 'entertainment',
      title: 'Entertainment',
      description: 'Have fun and relax',
      emoji: '🎮',
      gradient: 'from-green-500 to-teal-600',
      unlockAge: 5,
      activities: [
        { id: 'movie', name: 'Watch Movie', emoji: '🎬', description: 'Enjoy the latest films', minAge: 5, minWealth: 15 },
        { id: 'video_games', name: 'Play Video Games', emoji: '🎮', description: 'Gaming session', minAge: 6, minWealth: 20 },
        { id: 'amusement_park', name: 'Amusement Park', emoji: '🎢', description: 'Thrilling rides and fun', minAge: 8, minWealth: 75 },
        { id: 'concert', name: 'Go to Concert', emoji: '🎵', description: 'Live music experience', minAge: 12, minWealth: 50 },
        { id: 'shopping', name: 'Go Shopping', emoji: '🛍️', description: 'Retail therapy', minAge: 12, minWealth: 100 },
        { id: 'spa_day', name: 'Spa Day', emoji: '🧖', description: 'Relax and pamper yourself', minAge: 16, minWealth: 200 },
        { id: 'vacation', name: 'Take Vacation', emoji: '✈️', description: 'Travel to new places', minAge: 18, minWealth: 1000 }
      ]
    },
    {
      id: 'sports',
      title: 'Sports & Fitness',
      description: 'Stay active and competitive',
      emoji: '⚽',
      gradient: 'from-orange-500 to-red-600',
      unlockAge: 6,
      activities: [
        { id: 'sports_team', name: 'Join Sports Team', emoji: '🏆', description: 'Compete with your school team', minAge: 6 },
        { id: 'swimming', name: 'Go Swimming', emoji: '🏊', description: 'Great cardio workout', minAge: 8, minWealth: 25 },
        { id: 'running', name: 'Go Running', emoji: '🏃', description: 'Build endurance', minAge: 10 },
        { id: 'cycling', name: 'Go Cycling', emoji: '🚴', description: 'Explore on two wheels', minAge: 12, minWealth: 50 },
        { id: 'rock_climbing', name: 'Rock Climbing', emoji: '🧗', description: 'Challenge yourself vertically', minAge: 14, minWealth: 100 },
        { id: 'skydiving', name: 'Skydiving', emoji: '🪂', description: 'Ultimate adrenaline rush', minAge: 18, minWealth: 500, difficulty: 'extreme' }
      ]
    },
    {
      id: 'creative',
      title: 'Creative Arts',
      description: 'Express your artistic side',
      emoji: '🎨',
      gradient: 'from-purple-500 to-indigo-600',
      unlockAge: 4,
      activities: [
        { id: 'drawing', name: 'Draw Pictures', emoji: '🖍️', description: 'Create beautiful artwork', minAge: 4 },
        { id: 'music_lessons', name: 'Music Lessons', emoji: '🎹', description: 'Learn to play instruments', minAge: 6, minWealth: 50 },
        { id: 'dance_class', name: 'Dance Class', emoji: '💃', description: 'Learn choreography', minAge: 6, minWealth: 40 },
        { id: 'painting', name: 'Painting', emoji: '🎨', description: 'Express yourself with colors', minAge: 8, minWealth: 30 },
        { id: 'photography', name: 'Photography', emoji: '📸', description: 'Capture beautiful moments', minAge: 12, minWealth: 200 },
        { id: 'writing', name: 'Creative Writing', emoji: '✍️', description: 'Tell your stories', minAge: 10 },
        { id: 'acting', name: 'Acting Classes', emoji: '🎭', description: 'Develop dramatic skills', minAge: 12, minWealth: 75 }
      ]
    },
    {
      id: 'technology',
      title: 'Technology',
      description: 'Explore the digital world',
      emoji: '💻',
      gradient: 'from-cyan-500 to-blue-600',
      unlockAge: 8,
      activities: [
        { id: 'coding_practice', name: 'Learn Coding', emoji: '👨‍💻', description: 'Master programming skills', minAge: 8 },
        { id: 'app_development', name: 'Develop Apps', emoji: '📱', description: 'Create mobile applications', minAge: 14 },
        { id: 'website_design', name: 'Web Design', emoji: '🌐', description: 'Build websites', minAge: 12 },
        { id: 'gaming_stream', name: 'Stream Gaming', emoji: '📺', description: 'Share your gaming with the world', minAge: 16, minWealth: 500 },
        { id: 'tech_startup', name: 'Start Tech Company', emoji: '🚀', description: 'Launch your own business', minAge: 18, minWealth: 10000, difficulty: 'extreme' }
      ]
    },
    {
      id: 'adult_entertainment',
      title: 'Adult Entertainment',
      description: 'Adult-only activities',
      emoji: '🍸',
      gradient: 'from-amber-500 to-orange-600',
      unlockAge: 21,
      activities: [
        { id: 'bar', name: 'Go to Bar', emoji: '🍺', description: 'Enjoy drinks with friends', minAge: 21, minWealth: 50 },
        { id: 'casino', name: 'Visit Casino', emoji: '🎰', description: 'Try your luck gambling', minAge: 21, minWealth: 100 },
        { id: 'nightclub', name: 'Nightclub', emoji: '🕺', description: 'Dance the night away', minAge: 21, minWealth: 75 },
        { id: 'wine_tasting', name: 'Wine Tasting', emoji: '🍷', description: 'Sophisticated evening', minAge: 21, minWealth: 150 }
      ]
    },
    {
      id: 'crime',
      title: 'Criminal Activities',
      description: 'Live dangerously (high risk)',
      emoji: '😈',
      gradient: 'from-red-600 to-gray-800',
      unlockAge: 12,
      activities: [
        { id: 'pickpocket', name: 'Pickpocket', emoji: '👛', description: 'Steal from unsuspecting victims', minAge: 12, difficulty: 'easy' },
        { id: 'shoplift', name: 'Shoplift', emoji: '🛒', description: 'Take items without paying', minAge: 14, difficulty: 'easy' },
        { id: 'vandalism', name: 'Vandalism', emoji: '🎨', description: 'Damage public property', minAge: 14, difficulty: 'easy' },
        { id: 'car_theft', name: 'Steal Car', emoji: '🚗', description: 'Take someone else\'s vehicle', minAge: 16, difficulty: 'medium' },
        { id: 'burglary', name: 'Burglary', emoji: '🏠', description: 'Break into homes', minAge: 16, difficulty: 'medium' },
        { id: 'drug_dealing', name: 'Deal Drugs', emoji: '💊', description: 'Sell illegal substances', minAge: 18, difficulty: 'hard' },
        { id: 'bank_robbery', name: 'Rob Bank', emoji: '🏦', description: 'High-stakes heist', minAge: 21, difficulty: 'extreme' },
        { id: 'murder', name: 'Commit Murder', emoji: '🔪', description: 'The ultimate crime', minAge: 18, difficulty: 'extreme' }
      ]
    }
  ];
};
