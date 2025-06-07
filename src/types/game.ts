
// Re-export all types from the focused type files
export * from './core';
export * from './relationships';
export * from './education';
export * from './legal';
export * from './health';
export * from './social';
export * from './gameState';
export * from './finance';
export * from './career';

// Re-export character types with renamed conflicting exports
export { 
  Character, 
  MusicArtist, 
  MusicRecord, 
  MusicTour, 
  MusicCareer,
  CharacterEventTracker as EventTracker
} from './character';
