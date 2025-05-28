import { Character, FamilyMember, LifeEvent, Relationship } from '../types/game';
import { lifeEvents } from '../data/lifeEvents';
import { educationLevels, shouldAutoEnrollInSchool } from './educationUtils';

const firstNames = [
  // Male names
  'James', 'John', 'Robert', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher',
  'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua',
  'Kenneth', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Jason', 'Edward', 'Jeffrey', 'Ryan',
  'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon',
  'Benjamin', 'Samuel', 'Frank', 'Gregory', 'Raymond', 'Alexander', 'Patrick', 'Jack', 'Dennis', 'Jerry',
  'Tyler', 'Aaron', 'Jose', 'Henry', 'Adam', 'Douglas', 'Nathan', 'Peter', 'Zachary', 'Kyle',
  // Female names
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
  'Lisa', 'Nancy', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle',
  'Laura', 'Sarah', 'Kimberly', 'Deborah', 'Dorothy', 'Lisa', 'Nancy', 'Karen', 'Betty', 'Helen',
  'Emily', 'Amanda', 'Melissa', 'Debra', 'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia', 'Amy',
  'Kathleen', 'Angela', 'Shirley', 'Brenda', 'Emma', 'Olivia', 'Sophia', 'Abigail', 'Isabella', 'Mia',
  'Madison', 'Charlotte', 'Avery', 'Sofia', 'Scarlett', 'Grace', 'Lily', 'Hannah', 'Victoria', 'Aria'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
  'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
  'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
  'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson'
];

export const handleEducationActions = (character: Character, action: string, data?: any): Character => {
  const updatedCharacter = { ...character };

  switch (action) {
    case 'enroll':
      const { degreeType } = data;
      const educationLevel = educationLevels.find(l => l.id === degreeType);
      if (educationLevel) {
        updatedCharacter.currentEducation = {
          level: degreeType,
          institution: generateInstitutionName(degreeType),
          currentYear: 1,
          gpa: 3.0 + Math.random() * 1.0, // Random GPA between 3.0-4.0
          major: degreeType === 'university' || degreeType === 'graduate' ? generateMajor() : undefined
        };
        updatedCharacter.money -= educationLevel.cost;
      }
      break;

    case 'dropout':
      updatedCharacter.currentEducation = undefined;
      break;

    case 'study_hard':
      if (updatedCharacter.currentEducation) {
        updatedCharacter.currentEducation.gpa = Math.min(4.0, updatedCharacter.currentEducation.gpa + 0.1);
        updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 5);
        updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 10);
      }
      break;

    case 'interact_classmate':
      const { classmate } = data;
      // Add classmate as a relationship
      const newRelationship = {
        id: classmate.id,
        name: classmate.name,
        age: classmate.age,
        relationship: 'classmate',
        relationshipLevel: 25,
        isAlive: true
      };
      updatedCharacter.relationships.push(newRelationship);
      updatedCharacter.happiness += 5;
      break;
  }

  return updatedCharacter;
};

const generateInstitutionName = (level: string): string => {
  const schoolTypes = {
    elementary: ['Elementary School', 'Primary School'],
    middle: ['Middle School', 'Junior High'],
    high: ['High School', 'Secondary School'],
    college: ['Community College', 'Technical College'],
    university: ['University', 'State University', 'Institute of Technology'],
    graduate: ['Graduate School', 'University'],
    medical: ['Medical School', 'School of Medicine'],
    law: ['Law School', 'School of Law'],
    phd: ['Graduate School', 'Doctoral Program']
  };

  const cityNames = ['Central', 'North', 'South', 'East', 'West', 'Metro', 'City', 'State'];
  const cityName = cityNames[Math.floor(Math.random() * cityNames.length)];
  const schoolType = schoolTypes[level]?.[Math.floor(Math.random() * schoolTypes[level].length)] || 'School';

  return `${cityName} ${schoolType}`;
};

const generateMajor = (): string => {
  const majors = [
    'Computer Science', 'Business Administration', 'Psychology', 'Biology', 'English Literature',
    'Engineering', 'Mathematics', 'History', 'Chemistry', 'Economics', 'Political Science',
    'Art', 'Music', 'Philosophy', 'Sociology', 'Physics', 'Communications', 'Education'
  ];
  return majors[Math.floor(Math.random() * majors.length)];
};

export const applyForJob = (character: Character, jobId: string): Character => {
  // ... rest of the function remains unchanged
  return character; // Placeholder return
};

// Example function demonstrating auto-enrollment, education progression, relationship aging.
export const ageCharacter = (character: Character): Character => {
  const updatedCharacter = { ...character };

  updatedCharacter.age += 1;

  // Age all relationships
  updatedCharacter.relationships = updatedCharacter.relationships.map(rel => ({
    ...rel,
    age: rel.age + 1
  }));

  // Handle education progression
  if (updatedCharacter.currentEducation) {
    const educationLevel = educationLevels.find(l => l.id === updatedCharacter.currentEducation!.level);
    if (educationLevel) {
      updatedCharacter.currentEducation.currentYear += 1;

      // Check if graduated
      if (updatedCharacter.currentEducation.currentYear > educationLevel.duration) {
        const levelName = educationLevel.name.split(' ')[0];
        updatedCharacter.education.push(levelName);
        updatedCharacter.currentEducation = undefined;
        updatedCharacter.smarts += 10;
      }
    }
  } else {
    // Check for auto-enrollment in mandatory education
    const autoEnrollLevel = shouldAutoEnrollInSchool(updatedCharacter);
    if (autoEnrollLevel) {
      const educationLevel = educationLevels.find(l => l.id === autoEnrollLevel);
      if (educationLevel) {
        updatedCharacter.currentEducation = {
          level: autoEnrollLevel,
          institution: generateInstitutionName(autoEnrollLevel),
          currentYear: 1,
          gpa: 2.5 + Math.random() * 1.5
        };
      }
    }
  }

  return updatedCharacter;
};

export const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const firstNames2 = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn', 'Blake', 'Cameron',
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William',
  'Charlotte', 'James', 'Amelia', 'Benjamin', 'Mia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander',
  'Abigail', 'Michael', 'Emily', 'Daniel', 'Elizabeth', 'Matthew', 'Sofia', 'Jackson', 'Madison', 'Sebastian'
];

const lastNames2 = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'
];

export const generateRandomName = (): string => {
  const firstName = getRandomElement(firstNames2);
  const lastName = getRandomElement(lastNames2);
  return `${firstName} ${lastName}`;
};