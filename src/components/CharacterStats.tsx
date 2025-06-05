import React from 'react';
import { AlertTriangle, TrendingDown } from 'lucide-react';

interface CharacterStatsProps {
  character: {
    happiness: number;
    health: number;
    smarts: number;
    looks: number;
    money?: number;
    wealth?: number;
  };
}

const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

const getFinancialStatus = (amount: number): { status: string, color: string } => {
  if (amount <= 0) {
    return { status: 'Broke', color: 'red' };
  } else if (amount < 1000) {
    return { status: 'Poor', color: 'orange' };
  } else if (amount < 10000) {
    return { status: 'Middle Class', color: 'green' };
  } else if (amount < 100000) {
    return { status: 'Upper Middle Class', color: 'blue' };
  } else {
    return { status: 'Rich', color: 'purple' };
  }
};


export const CharacterStats: React.FC<CharacterStatsProps> = ({ character }) => {
  const getStatEmoji = (statName: string, value: number) => {
    switch (statName) {
      case 'Happiness':
        if (value >= 80) return '😊';
        if (value >= 60) return '🙂';
        if (value >= 40) return '😐';
        if (value >= 20) return '😟';
        return '😢';

      case 'Health':
        if (value >= 80) return '💪';
        if (value >= 60) return '❤️';
        if (value >= 40) return '🤒';
        if (value >= 20) return '🤢';
        return '💀';

      case 'Smarts':
        if (value >= 80) return '🧠';
        if (value >= 60) return '📚';
        if (value >= 40) return '🤔';
        if (value >= 20) return '😵‍💫';
        return '🤯';

      case 'Looks':
        if (value >= 80) return '💎';
        if (value >= 60) return '✨';
        if (value >= 40) return '😊';
        if (value >= 20) return '😬';
        return '🙈';

      default:
        return '❓';
    }
  };

  const getStatColor = (statName: string, value: number) => {
    if (value >= 70) return '#4CAF50'; // Green
    if (value >= 50) return '#FF9800'; // Orange
    if (value >= 30) return '#FF5722'; // Red-Orange
    return '#F44336'; // Red
  };

  const stats = [
    { 
      name: 'Happiness', 
      value: character.happiness, 
      emoji: getStatEmoji('Happiness', character.happiness),
      color: getStatColor('Happiness', character.happiness)
    },
    { 
      name: 'Health', 
      value: character.health, 
      emoji: getStatEmoji('Health', character.health),
      color: getStatColor('Health', character.health)
    },
    { 
      name: 'Smarts', 
      value: character.smarts, 
      emoji: getStatEmoji('Smarts', character.smarts),
      color: getStatColor('Smarts', character.smarts)
    },
    { 
      name: 'Looks', 
      value: character.looks, 
      emoji: getStatEmoji('Looks', character.looks),
      color: getStatColor('Looks', character.looks)
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 mx-4 rounded-lg shadow-sm">
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 w-24">
              {stat.value < 30 && (
                <AlertTriangle size={12} className="text-red-500 animate-pulse" />
              )}
              {stat.value < 15 && (
                <TrendingDown size={12} className="text-red-600" />
              )}
              <span className="text-lg">{stat.emoji}</span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{stat.name}</span>
            </div>

            <div className="flex-1 flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${Math.max(stat.value, 0)}%`,
                    backgroundColor: stat.color
                  }}
                />
              </div>
              <span className={`text-xs font-bold w-8 text-right ${
                stat.value < 30 ? 'text-red-600' : 
                stat.value < 50 ? 'text-orange-600' : 
                'text-gray-800 dark:text-gray-200'
              }`}>
                {stat.value}%
              </span>
            </div>
          </div>
        ))}
         <div className="text-center">
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {formatMoney(character.money || character.wealth || 0)}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300">
            {getFinancialStatus(character.money || character.wealth || 0).status}
          </div>
        </div>
      </div>
    </div>
  );
};