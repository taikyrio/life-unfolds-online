
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
export type { 
  Character, 
  MusicTour,
  CharacterEventTracker as EventTracker
} from './character';

// Re-export music types
export type {
  MusicCareer,
  Artist as MusicArtist,
  Record as MusicRecord,
  Album as MusicAlbum
} from './music';

// Re-export asset types
export type { Asset } from './assets';
