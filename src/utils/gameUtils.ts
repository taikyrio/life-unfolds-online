
export const generateRandomName = (): string => {
  const firstNames = [
    'Alex', 'Blake', 'Casey', 'Drew', 'Emery', 'Finley', 'Grey', 'Harper',
    'Indigo', 'Jordan', 'Kai', 'Logan', 'Morgan', 'Nova', 'Ocean', 'Parker',
    'Quinn', 'River', 'Sage', 'Taylor', 'Urban', 'Vale', 'Winter', 'Xen',
    'Yuki', 'Zen', 'Avery', 'Cameron', 'Dallas', 'Eden', 'Francis', 'Gabriel'
  ];
  
  const lastNames = [
    'Anderson', 'Brown', 'Davis', 'Garcia', 'Johnson', 'Jones', 'Miller',
    'Moore', 'Rodriguez', 'Smith', 'Taylor', 'Thompson', 'White', 'Williams',
    'Wilson', 'Clark', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young',
    'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker'
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
};

export const getLifeStage = (age: number): string => {
  if (age < 2) return 'Baby';
  if (age < 4) return 'Toddler';
  if (age < 13) return 'Child';
  if (age < 18) return 'Teen';
  if (age < 30) return 'Young Adult';
  if (age < 50) return 'Adult';
  if (age < 65) return 'Middle-aged';
  return 'Senior';
};

export const calculateStatInfluence = (stat: number): number => {
  return (stat - 50) / 100; // -0.5 to +0.5 influence
};
