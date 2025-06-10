
import { LifeEvent } from '../../types/game';

export const expandedCollegeEvents: LifeEvent[] = [
  {
    id: 'college_party',
    title: 'Wild College Party',
    description: 'You\'re invited to the biggest party of the semester.',
    emoji: '🎉',
    category: 'social',
    age: 20,
    minAge: 18,
    maxAge: 25,
    requirements: { education: 'College' },
    choices: [
      {
        id: 'party_hard',
        text: 'Party until dawn',
        effects: {
          happiness: 25,
          relationships: 15,
          health: -15,
          smarts: -5
        },
        emoji: '🍻',
        consequences: ['You had an amazing time but failed your midterm exam.']
      },
      {
        id: 'designated_driver',
        text: 'Be the designated driver',
        effects: {
          relationships: 20,
          happiness: 5,
          health: 5
        },
        emoji: '🚗',
        consequences: ['Everyone respected your responsibility and safety.']
      },
      {
        id: 'study_instead',
        text: 'Stay home and study',
        effects: {
          smarts: 15,
          happiness: -10,
          relationships: -5
        },
        emoji: '📚',
        consequences: ['You aced your exam but missed out on social connections.']
      }
    ]
  },
  {
    id: 'job_interview',
    title: 'Important Job Interview',
    description: 'You have an interview for your dream job.',
    emoji: '💼',
    category: 'career',
    age: 22,
    minAge: 18,
    maxAge: 35,
    choices: [
      {
        id: 'honest_approach',
        text: 'Be completely honest',
        effects: {
          happiness: 10,
          relationships: 10,
          wealth: 15000
        },
        emoji: '😊',
        consequences: ['Your honesty impressed them and you got the job!']
      },
      {
        id: 'embellish_resume',
        text: 'Embellish your qualifications',
        effects: {
          wealth: 25000,
          happiness: -5
        },
        emoji: '🎭',
        consequences: ['You got the job but constantly worry about being found out.']
      }
    ]
  }
];
