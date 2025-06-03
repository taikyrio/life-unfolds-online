
// Re-export all types from the focused type files
export * from './character';
export * from './relationships';
export * from './education';
export * from './legal';
export * from './health';
export * from './social';
export * from './gameState';

// Legacy exports for backward compatibility
export type { Character } from './character';
export type { FamilyMember, RelationshipType, RelationshipStats } from './relationships';
export type { EducationRecord, CurrentEducation } from './education';
export type { LegalStatus, LegalCase } from './legal';
export type { HealthInsurance } from './health';
export type { SocialMediaAccount, RealEstateProperty } from './social';
export type { LifeEvent, Choice, StatEffects, EventTracker, GameState } from './gameState';
