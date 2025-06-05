import { LifeEvent } from '../types/game';

export const lifeEvents: LifeEvent[] = [
  {
    id: 'first_steps',
    title: '👣 First Steps',
    description: 'You took your first steps and started exploring the world.',
    effects: { happiness: 10, health: 5 },
    flags: ['milestone_first_steps'],
    consequences: ['Increased mobility']
  },
  {
    id: 'first_words',
    title: '🗣️ First Words',
    description: 'You said your first words and began communicating.',
    effects: { happiness: 10, smarts: 5 },
    flags: ['milestone_first_words'],
    consequences: ['Improved communication skills']
  },
  {
    id: 'first_day_school',
    title: '🏫 First Day of School',
    description: 'You started school and met new friends.',
    effects: { happiness: 15, smarts: 10, relationships: 5 },
    flags: ['milestone_first_day_school'],
    consequences: ['Started education journey']
  },
  {
    id: 'family_vacation',
    title: '🏖️ Family Vacation',
    description: 'Your family went on an amazing vacation together.',
    effects: { happiness: 15, wealth: -500, relationships: 10 },
    flags: ['family_vacation'],
    consequences: ['Created wonderful family memories']
  },
  {
    id: 'inheritance',
    title: '💰 Inheritance',
    description: 'A distant relative left you money in their will.',
    effects: { wealth: 50000, happiness: 10 },
    flags: ['inheritance_received'],
    consequences: ['Received unexpected windfall']
  },
  {
    id: 'work_promotion',
    title: '📈 Work Promotion',
    description: 'Your hard work paid off with a promotion!',
    effects: { happiness: 20, wealth: 5000, fame: 5, salary: 10000, jobLevel: 1 },
    flags: ['promoted'],
    consequences: ['Advanced in career']
  },
  {
    id: 'work_raise',
    title: '💵 Salary Raise',
    description: 'You received a well-deserved raise at work.',
    effects: { happiness: 15, wealth: 2000, salary: 5000, jobLevel: 1 },
    flags: ['salary_increase'],
    consequences: ['Increased earning potential']
  },
  {
    id: 'arrested_petty_crime',
    title: '🚔 Arrested for Petty Crime',
    description: 'You were caught committing a minor crime and arrested.',
    effects: { 
      happiness: -20, 
      wealth: -1000, 
      criminalRecord: { 
        arrests: 1, 
        convictions: 0,
        prisonTime: 0,
        crimes: ['Petty Crime'], 
        notoriety: 5,
        totalSentence: 0,
        currentlyIncarcerated: false
      } 
    },
    flags: ['criminal_record'],
    consequences: ['Criminal record established']
  },
  {
    id: 'arrested_major_crime',
    title: '🚨 Arrested for Major Crime',
    description: 'You were caught committing a serious crime.',
    effects: { 
      happiness: -30, 
      wealth: -5000, 
      criminalRecord: { 
        arrests: 1, 
        convictions: 1, 
        prisonTime: 0,
        crimes: ['Major Crime'], 
        notoriety: 15,
        totalSentence: 0,
        currentlyIncarcerated: false
      } 
    },
    flags: ['serious_criminal'],
    consequences: ['Serious criminal record']
  },
  {
    id: 'prison_sentence',
    title: '⛓️ Prison Sentence',
    description: 'You were sentenced to prison for your crimes.',
    effects: { 
      happiness: -40, 
      health: -20, 
      criminalRecord: { 
        arrests: 0,
        convictions: 1, 
        prisonTime: 2, 
        crimes: ['Felony'], 
        notoriety: 20,
        totalSentence: 2,
        currentlyIncarcerated: true
      } 
    },
    flags: ['imprisoned'],
    consequences: ['Served prison time']
  },
  {
    id: 'gang_involvement',
    title: '🔫 Gang Involvement',
    description: 'You became involved with a criminal organization.',
    effects: { 
      wealth: 10000, 
      happiness: -10, 
      criminalRecord: { 
        arrests: 0,
        convictions: 0,
        prisonTime: 0,
        crimes: ['Gang Activity'], 
        notoriety: 25,
        totalSentence: 0,
        currentlyIncarcerated: false
      } 
    },
    flags: ['gang_member'],
    consequences: ['Joined criminal organization']
  }
];

export const getRandomEvent = (character: any, eventTracker: any) => {
  const availableEvents = lifeEvents.filter(event => {
    if (eventTracker.triggeredEvents.has(event.id)) return false;
    if (event.oneTime && character.flags?.includes(event.id)) return false;
    return true;
  });

  if (availableEvents.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableEvents.length);
  const selectedEvent = availableEvents[randomIndex];
  
  eventTracker.triggeredEvents.add(selectedEvent.id);
  
  return selectedEvent;
};
