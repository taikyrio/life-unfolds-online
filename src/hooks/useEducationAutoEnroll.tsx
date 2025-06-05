
import { useEffect } from 'react';
import { Character } from '../types/game';
import { processEducationAction } from '../handlers/education/EducationActionProcessor';
import { shouldAutoEnroll } from '../utils/educationHelpers';

export const useEducationAutoEnroll = (
  character: Character,
  onCharacterUpdate: (character: Character) => void,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void
) => {
  useEffect(() => {
    // Check if character needs enrollment
    const needsEnrollment = shouldAutoEnroll(character);

    if (needsEnrollment) {
      const result = processEducationAction(
        character,
        'enroll',
        {
          stageId: needsEnrollment.stageId,
          schoolId: needsEnrollment.schoolId
        },
        ageHistory,
        setAgeHistory
      );

      if (result.character !== character) {
        onCharacterUpdate(result.character);
      }
    } else if (character.education?.currentStage) {
      // If enrolled, advance the year automatically
      const result = processEducationAction(
        character,
        'advance_year',
        {},
        ageHistory,
        setAgeHistory
      );

      if (result.character !== character) {
        onCharacterUpdate(result.character);
      }
    }
  }, [character.age]);
};
