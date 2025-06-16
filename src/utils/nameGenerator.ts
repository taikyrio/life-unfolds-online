
// Helper function to generate random names
export const generateRandomName = (): string => {
  const firstNames = [
    'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
    'Sam', 'Blake', 'Cameron', 'Jamie', 'Sage', 'River', 'Phoenix', 'Rowan',
    'Eden', 'Hayden', 'Peyton', 'Emerson', 'Parker', 'Reese', 'Skyler', 'Drew'
  ];
  
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};
