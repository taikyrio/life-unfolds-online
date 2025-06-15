
import React from 'react';
import { Character } from '../../../../types/game';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
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
            <h1 className="text-2xl font-bold text-white">Life Story</h1>
            <p className="text-white/70 text-sm">{character.name} • Age {character.age}</p>
          </div>
          
          <Button
            onClick={onAgeUp}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full w-14 h-14 p-0 shadow-2xl border-2 border-white/20"
          >
            <Plus size={24} strokeWidth={3} />
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 px-4 pb-32 overflow-y-auto">
        <Accordion type="multiple" className="space-y-4" defaultValue={[`age-${character.age}`]}>
          {lifeEvents.map((yearData, index) => (
            <AccordionItem 
              key={`age-${yearData.age}-${index}`} 
              value={`age-${yearData.age}`}
              className="border-0"
            >
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:bg-black/30 hover:scale-[1.02]">
                <AccordionTrigger className="px-4 py-4 hover:no-underline [&[data-state=open]>div>div:last-child]:rotate-180">
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
                              Now
                            </span>
                          )}
                        </div>
                        <div className="text-white/60 text-sm">{yearData.year}</div>
                      </div>
                    </div>
                    <div className="text-white/50 text-2xl transition-transform duration-200">
                      ⌄
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
