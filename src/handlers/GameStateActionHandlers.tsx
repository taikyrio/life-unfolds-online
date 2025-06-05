// Re-export all handlers from their dedicated files
export { handleAgeUp } from './AgeUpHandler';
export { handleHealthAction } from './HealthActionHandler';
export { handleLifestyleAction } from './LifestyleActionHandler';
export { handleMoneyAction } from './MoneyActionHandler';
export { handleDeath, handleEmigrate, handleSurrender } from './GameOverHandler';