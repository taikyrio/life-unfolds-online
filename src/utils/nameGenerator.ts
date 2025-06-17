
const firstNames = {
  male: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Christopher'],
  female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'],
  other: ['Alex', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Avery', 'Quinn', 'Sage', 'River', 'Phoenix']
};

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

export function generateRandomName(gender?: 'male' | 'female' | 'other'): string {
  const genderKey = gender || (Math.random() > 0.5 ? 'male' : 'female');
  const firstName = firstNames[genderKey][Math.floor(Math.random() * firstNames[genderKey].length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}
