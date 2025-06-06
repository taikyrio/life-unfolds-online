
import { LifeEvent } from '../../types/game';

export const expandedCollegeEvents: LifeEvent[] = [
  {
    id: 'college_party',
    title: 'Wild College Party',
    description: 'You\'re invited to the biggest party of the semester.',
    emoji: '🎉',
    category: 'social',
    minAge: 18,
    maxAge: 25,
    requirements: { education: 'College' },
    choices: [
      {
        id: 'party_hard',
        text: 'Party until dawn',
        effects: [
          { type: 'stat', target: 'happiness', value: 25 },
          { type: 'stat', target: 'relationships', value: 15 },
          { type: 'stat', target: 'health', value: -15 },
          { type: 'stat', target: 'smarts', value: -5 }
        ],
        emoji: '🍻',
        consequences: ['You had an amazing time but failed your midterm exam.']
      },
      {
        id: 'designated_driver',
        text: 'Be the designated driver',
        effects: [
          { type: 'stat', target: 'relationships', value: 20 },
          { type: 'stat', target: 'happiness', value: 5 },
          { type: 'stat', target: 'health', value: 5 }
        ],
        emoji: '🚗',
        consequences: ['Everyone respected your responsibility and safety.']
      },
      {
        id: 'study_instead',
        text: 'Stay home and study',
        effects: [
          { type: 'stat', target: 'smarts', value: 15 },
          { type: 'stat', target: 'happiness', value: -10 },
          { type: 'stat', target: 'relationships', value: -5 }
        ],
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
    minAge: 18,
    maxAge: 35,
    choices: [
      {
        id: 'honest_approach',
        text: 'Be completely honest',
        effects: [
          { type: 'stat', target: 'happiness', value: 10 },
          { type: 'stat', target: 'relationships', value: 10 },
          { type: 'money', value: 15 }
        ],
        emoji: '😊',
        consequences: ['Your honesty impressed them and you got the job!']
      },
      {
        id: 'embellish_resume',
        text: 'Embellish your qualifications',
        effects: [
          { type: 'money', value: 25 },
          { type: 'stat', target: 'happiness', value: -5 }
        ],
        emoji: '🎭',
        consequences: ['You got the job but constantly worry about being found out.']
      }
    ]
  }
];
