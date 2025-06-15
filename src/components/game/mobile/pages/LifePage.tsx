
import React from 'react';
import { Character } from '../../../../types/game';
import { Button } from '@/components/ui/button';
import { Plus, Heart, Brain, Zap, DollarSign, User } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface LifePageProps {
  character: Character;
  ageHistory: Record<number, string[]>;
  onAgeUp: () => void;
}

export const LifePage: React.FC<LifePageProps> = ({
  character,
  ageHistory,
  onAgeUp
}) => {
  const getCalendarYear = (age: number) => {
    const currentYear = new Date().getFullYear();
    return currentYear - character.age + age;
  };

  const stats = [
    { label: 'Health', value: character.health, color: 'from-red-500 to-pink-500', icon: Heart },
    { label: 'Happy', value: character.happiness, color: 'from-yellow-500 to-orange-500', icon: Zap },
    { label: 'Smart', value: character.smarts, color: 'from-blue-500 to-indigo-500', icon: Brain },
    { label: 'Looks', value: character.looks, color: 'from-purple-500 to-pink-500', icon: User },
    { label: 'Money', value: Math.min(character.wealth, 100), color: 'from-green-500 to-emerald-500', icon: DollarSign }
  ];

  const formatLifeEvents = () => {
    const events: Array<{ age: number; year: number; events: string[] }> = [];
    
    if (Object.keys(ageHistory).length === 0) {
      events.push({
        age: 0,
        year: getCalendarYear(0),
        events: [`👶 You were born as ${character.name}! Your journey begins...`]
      });
    }

    Object.entries(ageHistory)
      .sort(([ageA], [ageB]) => Number(ageB) - Number(ageA))
      .forEach(([age, ageEvents]) => {
        events.push({
          age: Number(age),
          year: getCalendarYear(Number(age)),
          events: ageEvents.length > 0 ? ageEvents : [`Nothing notable happened at age ${age}.`]
        });
      });

    return events;
  };

  const lifeEvents = formatLifeEvents();

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{character.name}</h1>
            <p className="text-white/70 text-sm">Age {character.age} • Living your best life</p>
          </div>
          
          <Button
            onClick={onAgeUp}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full w-14 h-14 p-0 shadow-2xl border-2 border-white/20"
          >
            <Plus size={24} strokeWidth={3} />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="relative mb-2">
                  <div className="w-12 h-12 mx-auto bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <Icon size={16} className="text-white/80" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-500 ease-out`}
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium text-white/80">{stat.label}</span>
                <div className="text-xs font-bold text-white">{stat.value}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Info */}
        <div className="bg-black/20 backdrop-blur-xl rounded-xl p-3 border border-white/10">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-white/60">Born:</span>
              <span className="text-white ml-2">{getCalendarYear(0)}</span>
            </div>
            <div>
              <span className="text-white/60">Wealth:</span>
              <span className="text-white ml-2">${character.wealth}k</span>
            </div>
          </div>
        </div>
      </div>

      {/* Life Timeline */}
      <div className="flex-1 px-4 pb-32 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white mb-2">Life Story</h2>
          <p className="text-white/60 text-sm">Your journey through life, year by year</p>
        </div>

        <Accordion type="multiple" className="space-y-4" defaultValue={[`age-${character.age}`]}>
          {lifeEvents.map((yearData, index) => (
            <AccordionItem 
              key={`age-${yearData.age}-${index}`} 
              value={`age-${yearData.age}`}
              className="border-0"
            >
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:bg-black/30 hover:scale-[1.02]">
                <AccordionTrigger className="px-4 py-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{yearData.age}</span>
                      </div>
                      <div className="text-left">
                        <div className="text-white font-semibold">
                          Age {yearData.age}
                          {yearData.age === character.age && (
                            <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-white/60 text-sm">{yearData.year}</div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-2">
                    {yearData.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <p className="text-white/90 text-sm leading-relaxed">{event}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
