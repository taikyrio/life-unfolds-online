
import { LifeEvent } from '../../types/game';
import { expandedChildhoodEvents } from './expandedChildhoodEvents';
import { expandedSchoolEvents } from './expandedSchoolEvents';
import { expandedCollegeEvents } from './expandedCollegeEvents';
import { expandedAdultEvents } from './expandedAdultEvents';
import { expandedSeniorEvents } from './expandedSeniorEvents';

export const expandedLifeEvents: LifeEvent[] = [
  ...expandedChildhoodEvents,
  ...expandedSchoolEvents,
  ...expandedCollegeEvents,
  ...expandedAdultEvents,
  ...expandedSeniorEvents
];

// Export individual arrays for direct access
export {
  expandedChildhoodEvents,
  expandedSchoolEvents,
  expandedCollegeEvents,
  expandedAdultEvents,
  expandedSeniorEvents
};
