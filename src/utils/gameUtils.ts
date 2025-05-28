import { Character, FamilyMember, ZodiacSign } from '../types/game';
import { getZodiacSign, getZodiacEffects } from '../services/zodiacService';

const nationalities = ['American', 'British', 'Canadian', 'Australian', 'German', 'French', 'Japanese', 'Brazilian'];
const birthplaces = ['New York', 'London', 'Toronto', 'Sydney', 'Berlin', 'Paris', 'Tokyo', 'São Paulo'];

const firstNames = [
  'Alex', 'Jordan', 'Casey', 'Riley', 'Morgan', 'Avery', 'Quinn', 'Taylor',
  'Sam', 'Blake', 'Cameron', 'Devon', 'Finley', 'Harper', 'Hayden', 'Jamie',
  'Charlie', 'Sage', 'River', 'Phoenix', 'Rowan', 'Emery', 'Reese', 'Drew',
  'Mason', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia',
  'James', 'Isabella', 'Benjamin', 'Charlotte', 'Lucas', 'Amelia', 'Henry'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson'
];

// Comprehensive job categories with realistic salaries
const jobCategories = {
  entrylevel: [
    { title: 'Fast Food Worker', salary: 22, minAge: 14, education: 'None' },
    { title: 'Retail Associate', salary: 25, minAge: 16, education: 'None' },
    { title: 'Janitor', salary: 28, minAge: 18, education: 'None' },
    { title: 'Factory Worker', salary: 32, minAge: 18, education: 'High School' },
    { title: 'Receptionist', salary: 30, minAge: 18, education: 'High School' }
  ],
  skilled: [
    { title: 'Electrician', salary: 55, minAge: 20, education: 'Trade School' },
    { title: 'Plumber', salary: 58, minAge: 20, education: 'Trade School' },
    { title: 'Mechanic', salary: 45, minAge: 20, education: 'Trade School' },
    { title: 'Paramedic', salary: 48, minAge: 21, education: 'Associate Degree' },
    { title: 'Police Officer', salary: 52, minAge: 21, education: 'Associate Degree' }
  ],
  professional: [
    { title: 'Teacher', salary: 48, minAge: 22, education: 'Bachelor Degree' },
    { title: 'Nurse', salary: 65, minAge: 22, education: 'Bachelor Degree' },
    { title: 'Accountant', salary: 58, minAge: 22, education: 'Bachelor Degree' },
    { title: 'Engineer', salary: 75, minAge: 22, education: 'Bachelor Degree' },
    { title: 'Social Worker', salary: 45, minAge: 22, education: 'Bachelor Degree' }
  ],
  corporate: [
    { title: 'Marketing Manager', salary: 85, minAge: 25, education: 'Bachelor Degree' },
    { title: 'Business Analyst', salary: 78, minAge: 24, education: 'Bachelor Degree' },
    { title: 'IT Manager', salary: 95, minAge: 26, education: 'Bachelor Degree' },
    { title: 'Sales Director', salary: 105, minAge: 28, education: 'Bachelor Degree' },
    { title: 'Operations Manager', salary: 88, minAge: 27, education: 'Bachelor Degree' }
  ],
  highend: [
    { title: 'Doctor', salary: 185, minAge: 26, education: 'Medical Degree' },
    { title: 'Lawyer', salary: 125, minAge: 25, education: 'Law Degree' },
    { title: 'Investment Banker', salary: 145, minAge: 24, education: 'MBA' },
    { title: 'Software Architect', salary: 135, minAge: 28, education: 'Master Degree' },
    { title: 'Surgeon', salary: 250, minAge: 30, education: 'Medical Degree' }
  ],
  creative: [
    { title: 'Artist', salary: 35, minAge: 18, education: 'High School' },
    { title: 'Musician', salary: 28, minAge: 16, education: 'None' },
    { title: 'Writer', salary: 42, minAge: 20, education: 'Bachelor Degree' },
    { title: 'Actor', salary: 45, minAge: 18, education: 'None' },
    { title: 'Photographer', salary: 38, minAge: 20, education: 'Associate Degree' }
  ]
};

const getRandomJob = (age: number, education: string = 'None'): { title: string; salary: number } => {
  const allJobs = Object.values(jobCategories).flat();
  const eligibleJobs = allJobs.filter(job => 
    age >= job.minAge && 
    (job.education === 'None' || education.includes(job.education.split(' ')[0]))
  );
  
  if (eligibleJobs.length === 0) {
    return { title: 'Unemployed', salary: 0 };
  }
  
  return eligibleJobs[Math.floor(Math.random() * eligibleJobs.length)];
};

export const generateRandomName = (): string => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

export const generateFamilyMember = (relationship: string, baseAge: number): FamilyMember => {
  let age;
  switch (relationship) {
    case 'father':
    case 'mother':
      age = baseAge + Math.floor(Math.random() * 20) + 20;
      break;
    case 'sibling':
      age = baseAge + Math.floor(Math.random() * 10) - 5;
      if (age < 0) age = Math.abs(age);
      break;
    case 'grandparent':
      age = baseAge + Math.floor(Math.random() * 30) + 45;
      break;
    default:
      age = baseAge;
  }

  const finalAge = Math.max(1, age);
  let job: string | undefined = undefined;
  let salary = 0;

  // Assign jobs based on age and relationship
  if (finalAge >= 16 && finalAge <= 70 && Math.random() > 0.2) {
    let education = 'None';
    if (finalAge >= 18 && Math.random() > 0.3) education = 'High School';
    if (finalAge >= 22 && Math.random() > 0.5) education = 'Bachelor Degree';
    if (finalAge >= 25 && Math.random() > 0.8) education = 'Master Degree';
    
    const jobInfo = getRandomJob(finalAge, education);
    job = jobInfo.title;
    salary = jobInfo.salary;
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: generateRandomName(),
    relationship: relationship as any,
    age: finalAge,
    alive: Math.random() > (relationship === 'grandparent' ? 0.3 : 0.1),
    health: Math.floor(Math.random() * 40) + 60,
    relationshipQuality: Math.floor(Math.random() * 30) + 70,
    job,
    salary
  };
}

export const generateNewRelationships = (character: Character): FamilyMember[] => {
  const newRelationships: FamilyMember[] = [];
  
  // Generate new friends based on age and activities
  if (character.age >= 5 && Math.random() > 0.7) {
    const friendAge = character.age + Math.floor(Math.random() * 6) - 3; // ±3 years
    const finalAge = Math.max(1, friendAge);
    let job: string | undefined = undefined;
    let salary = 0;

    // Friends can have jobs too
    if (finalAge >= 16 && Math.random() > 0.3) {
      const jobInfo = getRandomJob(finalAge, finalAge >= 22 ? 'Bachelor Degree' : 'High School');
      job = jobInfo.title;
      salary = jobInfo.salary;
    }

    newRelationships.push({
      id: Math.random().toString(36).substr(2, 9),
      name: generateRandomName(),
      relationship: 'friend' as any,
      age: finalAge,
      alive: true,
      health: Math.floor(Math.random() * 30) + 70,
      relationshipQuality: Math.floor(Math.random() * 40) + 60,
      job,
      salary
    });
  }
  
  // Generate coworkers when getting a job
  if (character.job && character.age >= 16 && Math.random() > 0.8) {
    const coworkerAge = character.age + Math.floor(Math.random() * 20) - 10; // ±10 years
    const finalAge = Math.max(18, coworkerAge);
    
    newRelationships.push({
      id: Math.random().toString(36).substr(2, 9),
      name: generateRandomName(),
      relationship: 'coworker' as any,
      age: finalAge,
      alive: true,
      health: Math.floor(Math.random() * 30) + 70,
      relationshipQuality: Math.floor(Math.random() * 30) + 50,
      job: character.job,
      salary: character.salary + Math.floor(Math.random() * 20) - 10 // Similar salary range
    });
  }
  
  return newRelationships;
};

// Function to find love/dating
export const findLove = (character: Character): { success: boolean; partner?: FamilyMember; message: string } => {
  if (character.relationshipStatus !== 'single') {
    return { success: false, message: 'You are already in a relationship!' };
  }

  const ageRange = character.age >= 18 ? 8 : 3; // Realistic age range
  const partnerAge = character.age + Math.floor(Math.random() * ageRange * 2) - ageRange;
  const finalAge = Math.max(character.age >= 18 ? 18 : 16, partnerAge);
  
  // Success depends on looks, relationships stats, happiness, and luck
  const attractiveness = character.looks / 100;
  const social = character.relationships / 100;
  const charm = character.happiness / 100;
  const successChance = (attractiveness * 0.4 + social * 0.3 + charm * 0.2 + Math.random() * 0.1);
  
  if (successChance > 0.6) {
    let job: string | undefined = undefined;
    let salary = 0;

    // Potential partners can have jobs based on age and education
    if (finalAge >= 16 && Math.random() > 0.2) {
      let education = 'None';
      if (finalAge >= 18) education = 'High School';
      if (finalAge >= 22 && Math.random() > 0.4) education = 'Bachelor Degree';
      if (finalAge >= 25 && Math.random() > 0.7) education = 'Master Degree';
      
      const jobInfo = getRandomJob(finalAge, education);
      job = jobInfo.title;
      salary = jobInfo.salary;
    }

    const partner: FamilyMember = {
      id: Math.random().toString(36).substr(2, 9),
      name: generateRandomName(),
      relationship: 'lover' as any,
      age: finalAge,
      alive: true,
      health: Math.floor(Math.random() * 30) + 70,
      relationshipQuality: Math.floor(Math.random() * 30) + 70,
      job,
      salary
    };
    
    return { 
      success: true, 
      partner, 
      message: `💕 You met ${partner.name} (${finalAge}) and there's definitely chemistry! ${partner.job ? `They work as a ${partner.job} earning $${partner.salary}k/year.` : 'They\'re currently looking for work.'} You're now dating!` 
    };
  } else {
    const failureMessages = [
      'You went on a few dates but didn\'t feel a connection.',
      'You matched with someone online but they ghosted you.',
      'You met someone interesting but they\'re not ready for a relationship.',
      'You had a nice conversation with someone at a coffee shop, but no spark.',
      'Your friend tried to set you up, but it was awkward.',
      'You went to a singles event but didn\'t meet anyone compatible.'
    ];
    return { 
      success: false, 
      message: failureMessages[Math.floor(Math.random() * failureMessages.length)] 
    };
  }
};

// Function for intimate activities
export const intimateActivity = (character: Character, useProtection: boolean): { success: boolean; pregnant?: boolean; message: string; partner?: FamilyMember } => {
  const partner = character.familyMembers.find(m => m.relationship === 'lover' && m.alive);
  if (!partner) {
    return { success: false, message: 'You need to be in a relationship first!' };
  }

  // Relationship quality affects experience
  const relationshipBonus = Math.floor(partner.relationshipQuality / 10);
  const happinessGain = 15 + relationshipBonus;
  const relationshipGain = 10 + Math.floor(relationshipBonus / 2);

  // Pregnancy chances
  const basePregnancyChance = useProtection ? 0.2 : 0.6;
  const isPregnant = Math.random() < basePregnancyChance;

  const messages = [
    `You and ${partner.name} shared an intimate moment together.`,
    `You had a romantic evening with ${partner.name}.`,
    `You and ${partner.name} expressed your love for each other.`
  ];

  let message = messages[Math.floor(Math.random() * messages.length)];
  if (isPregnant) {
    message += ` 🤰 ${partner.name} became pregnant!`;
  }

  return {
    success: true,
    pregnant: isPregnant,
    message,
    partner: {
      ...partner,
      relationshipQuality: Math.min(100, partner.relationshipQuality + relationshipGain)
    }
  };
};

// Function to propose marriage
export const proposeMariage = (character: Character): { success: boolean; message: string; accepted?: boolean } => {
  const partner = character.familyMembers.find(m => m.relationship === 'lover' && m.alive);
  if (!partner) {
    return { success: false, message: 'You need to be dating someone first!' };
  }

  if (character.relationshipStatus !== 'dating') {
    return { success: false, message: 'You need to be in a dating relationship!' };
  }

  // Acceptance depends on relationship quality, age, and time together
  const relationshipQuality = partner.relationshipQuality;
  const ageFactors = character.age >= 25 ? 1.2 : character.age >= 21 ? 1.0 : 0.8;
  const acceptanceChance = (relationshipQuality / 100) * ageFactors;

  const accepted = Math.random() < acceptanceChance;

  if (accepted) {
    return {
      success: true,
      accepted: true,
      message: `💍 ${partner.name} said YES! You're now engaged! Start planning your wedding!`
    };
  } else {
    return {
      success: true,
      accepted: false,
      message: `💔 ${partner.name} said they need more time. Your relationship quality decreased.`
    };
  }
};

// Function to get married
export const getMarried = (character: Character): { success: boolean; message: string; weddingCost?: number } => {
  if (character.relationshipStatus !== 'engaged') {
    return { success: false, message: 'You need to be engaged first!' };
  }

  const partner = character.familyMembers.find(m => m.relationship === 'lover' && m.alive);
  if (!partner) {
    return { success: false, message: 'Your partner is missing!' };
  }

  // Wedding costs based on wealth
  const weddingCost = Math.floor(character.wealth * 0.1) + 100; // 10% of wealth + base cost

  if (character.wealth < weddingCost) {
    return { success: false, message: `You need at least $${weddingCost}k for a wedding!` };
  }

  return {
    success: true,
    message: `🎉 You and ${partner.name} got married! It was a beautiful ceremony.`,
    weddingCost
  };
};

// Function to have a baby
export const haveBaby = (character: Character, babyName: string): { success: boolean; baby?: FamilyMember; message: string } => {
  if (!babyName || babyName.trim().length === 0) {
    return { success: false, message: 'Please enter a name for your baby!' };
  }

  const partner = character.familyMembers.find(m => 
    (m.relationship === 'lover' || m.relationship === 'spouse') && m.alive
  );

  if (!partner) {
    return { success: false, message: 'You need a partner to have a baby!' };
  }

  // Create baby
  const baby: FamilyMember = {
    id: Math.random().toString(36).substr(2, 9),
    name: babyName.trim(),
    relationship: 'child' as any,
    age: 0,
    alive: true,
    health: Math.floor(Math.random() * 20) + 80, // Babies are generally healthy
    relationshipQuality: 100 // New babies have max relationship
  };

  return {
    success: true,
    baby,
    message: `🍼 ${babyName} was born! You and ${partner.name} are now proud parents!`
  };
};

// Function to give gifts
export const giveGift = (character: Character, partnerId: string, giftType: 'flowers' | 'jewelry' | 'expensive'): { success: boolean; message: string; cost: number; relationshipChange: number } => {
  const partner = character.familyMembers.find(m => m.id === partnerId);
  if (!partner) {
    return { success: false, message: 'Partner not found!', cost: 0, relationshipChange: 0 };
  }

  let cost = 0;
  let relationshipChange = 0;
  let giftName = '';

  switch (giftType) {
    case 'flowers':
      cost = 25;
      relationshipChange = 5;
      giftName = 'beautiful flowers';
      break;
    case 'jewelry':
      cost = 150;
      relationshipChange = 15;
      giftName = 'a lovely piece of jewelry';
      break;
    case 'expensive':
      cost = 500;
      relationshipChange = 25;
      giftName = 'an expensive luxury gift';
      break;
  }

  if (character.wealth < cost) {
    return { success: false, message: `You can't afford ${giftName} ($${cost}k)!`, cost: 0, relationshipChange: 0 };
  }

  return {
    success: true,
    message: `💝 You gave ${partner.name} ${giftName}! They loved it!`,
    cost,
    relationshipChange
  };
};

export const ageFamilyMembers = (familyMembers: FamilyMember[]): FamilyMember[] => {
  const agedMembers = familyMembers.map(member => {
    if (!member.alive) return member;

    const newAge = member.age + 1;
    let newHealth = member.health;
    let newRelationshipQuality = member.relationshipQuality;
    let isAlive: boolean = member.alive;
    let newJob = member.job;
    let newSalary = member.salary || 0;

    // Health deterioration with age
    if (newAge > 80) {
      newHealth = Math.max(0, newHealth - Math.floor(Math.random() * 8) - 2);
    } else if (newAge > 60) {
      newHealth = Math.max(0, newHealth - Math.floor(Math.random() * 5) - 1);
    } else if (newAge > 40) {
      newHealth = Math.max(0, newHealth - Math.floor(Math.random() * 3));
    } else if (newAge < 25) {
      // Young people can improve health
      newHealth = Math.min(100, newHealth + Math.floor(Math.random() * 2));
    }

    // Relationship quality naturally decays over time (family relationships are more stable)
    const isFamily = ['father', 'mother', 'sibling', 'grandparent', 'child'].includes(member.relationship);
    const relationshipDecay = isFamily ? 
      Math.floor(Math.random() * 2) + 1 : 
      Math.floor(Math.random() * 4) + 1;
    newRelationshipQuality = Math.max(0, newRelationshipQuality - relationshipDecay);

    // Career progression and job changes
    if (newAge === 16 && !newJob && Math.random() > 0.6) {
      // First job for teenagers
      const jobInfo = getRandomJob(newAge, 'None');
      newJob = jobInfo.title;
      newSalary = jobInfo.salary;
    } else if (newAge === 18 && (!newJob || newJob === 'Fast Food Worker') && Math.random() > 0.4) {
      // Better job after high school
      const jobInfo = getRandomJob(newAge, 'High School');
      newJob = jobInfo.title;
      newSalary = jobInfo.salary;
    } else if (newAge === 22 && Math.random() > 0.3) {
      // College graduate jobs
      const jobInfo = getRandomJob(newAge, 'Bachelor Degree');
      newJob = jobInfo.title;
      newSalary = jobInfo.salary;
    } else if (newJob && newAge < 65 && Math.random() > 0.85) {
      // Random job promotion/change
      newSalary = Math.min(300, newSalary + Math.floor(Math.random() * 15) + 5);
    } else if (newAge >= 65 && newJob && Math.random() > 0.6) {
      // Retirement
      newJob = undefined;
      newSalary = 0;
    }

    // Death probability based on age and health
    let deathProbability = 0;
    if (newAge > 90) {
      deathProbability = 0.25 + (newAge - 90) * 0.05;
    } else if (newAge > 80) {
      deathProbability = 0.15 + (newAge - 80) * 0.02;
    } else if (newAge > 70) {
      deathProbability = 0.05 + (newAge - 70) * 0.01;
    } else if (newAge > 60) {
      deathProbability = 0.02;
    } else if (newAge < 5) {
      deathProbability = 0.01; // Child mortality
    }

    // Health affects death probability
    if (newHealth < 10) {
      deathProbability += 0.2;
    } else if (newHealth < 20) {
      deathProbability += 0.1;
    } else if (newHealth < 50) {
      deathProbability += 0.05;
    }

    if (Math.random() < deathProbability) {
      isAlive = false;
      newJob = undefined;
      newSalary = 0;
    }

    return {
      ...member,
      age: newAge,
      health: newHealth,
      relationshipQuality: newRelationshipQuality,
      alive: isAlive,
      job: newJob,
      salary: newSalary
    };
  });

  return agedMembers;
};

export const generateRandomStats = (): Omit<Character, 'name' | 'age' | 'year'> => {
  const nationalityIndex = Math.floor(Math.random() * nationalities.length);
  const birthMonth = Math.floor(Math.random() * 12) + 1;
  const birthDay = Math.floor(Math.random() * 28) + 1;
  const zodiacSign = getZodiacSign(birthMonth, birthDay);
  const zodiacEffects = getZodiacEffects(zodiacSign);
  
  // Generate family members
  const familyMembers: FamilyMember[] = [
    generateFamilyMember('father', 0),
    generateFamilyMember('mother', 0),
  ];
  
  // 70% chance of having siblings
  if (Math.random() > 0.3) {
    const siblingCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < siblingCount; i++) {
      familyMembers.push(generateFamilyMember('sibling', 0));
    }
  }
  
  // 80% chance of having at least one grandparent
  if (Math.random() > 0.2) {
    const grandparentCount = Math.floor(Math.random() * 4) + 1;
    for (let i = 0; i < grandparentCount; i++) {
      familyMembers.push(generateFamilyMember('grandparent', 0));
    }
  }

  const baseStats = {
    health: Math.floor(Math.random() * 30) + 70,
    happiness: Math.floor(Math.random() * 30) + 70,
    smarts: Math.floor(Math.random() * 30) + 70,
    looks: Math.floor(Math.random() * 30) + 70,
    wealth: Math.floor(Math.random() * 100) + 50,
    relationships: Math.floor(Math.random() * 30) + 70,
  };

  return {
    ...baseStats,
    health: clampStat(baseStats.health + (zodiacEffects.health || 0)),
    happiness: clampStat(baseStats.happiness + (zodiacEffects.happiness || 0)),
    smarts: clampStat(baseStats.smarts + (zodiacEffects.smarts || 0)),
    relationships: clampStat(baseStats.relationships + (zodiacEffects.relationships || 0)),
    wealth: Math.max(0, baseStats.wealth + (zodiacEffects.wealth || 0)),
    
    // Enhanced character info
    zodiacSign,
    birthMonth,
    birthDay,
    familyMembers,
    pets: [],
    
    // Career & Education
    jobLevel: 0,
    salary: 0,
    education: 'None',
    
    // Relationships
    relationshipStatus: 'single',
    children: [],
    
    // Life Status
    criminalRecord: false,
    fame: 0,
    nationality: nationalities[nationalityIndex],
    birthplace: birthplaces[nationalityIndex],
    
    // Birth circumstances
    birthWeight: Math.random() * 3 + 5.5, // 5.5-8.5 pounds
    birthComplications: Math.random() < 0.1, // 10% chance
    premature: Math.random() < 0.08, // 8% chance
  };
};

export const clampStat = (value: number, min: number = 0, max: number = 100): number => {
  return Math.max(min, Math.min(max, value));
};

export const applyStatEffects = (character: Character, effects: any): Character => {
  let updatedCharacter = { ...character };
  
  // Apply basic stat changes
  if (effects.health !== undefined) updatedCharacter.health = clampStat(character.health + effects.health);
  if (effects.happiness !== undefined) updatedCharacter.happiness = clampStat(character.happiness + effects.happiness);
  if (effects.smarts !== undefined) updatedCharacter.smarts = clampStat(character.smarts + effects.smarts);
  if (effects.looks !== undefined) updatedCharacter.looks = clampStat(character.looks + effects.looks);
  if (effects.wealth !== undefined) updatedCharacter.wealth = Math.max(0, character.wealth + effects.wealth);
  if (effects.relationships !== undefined) updatedCharacter.relationships = clampStat(character.relationships + effects.relationships);
  if (effects.fame !== undefined) updatedCharacter.fame = clampStat(character.fame + effects.fame, 0, 100);
  
  // Apply career changes
  if (effects.salary !== undefined) updatedCharacter.salary = Math.max(0, character.salary + effects.salary);
  if (effects.job !== undefined) updatedCharacter.job = effects.job;
  if (effects.jobLevel !== undefined) updatedCharacter.jobLevel = character.jobLevel + effects.jobLevel;
  if (effects.education !== undefined) updatedCharacter.education = effects.education;
  
  // Apply relationship changes
  if (effects.relationshipStatus !== undefined) updatedCharacter.relationshipStatus = effects.relationshipStatus;
  if (effects.partnerName !== undefined) updatedCharacter.partnerName = effects.partnerName;
  if (effects.children !== undefined) updatedCharacter.children = [...character.children, ...effects.children];
  
  // Apply legal status changes
  if (effects.criminalRecord !== undefined) updatedCharacter.criminalRecord = effects.criminalRecord;
  
  // Apply family member effects
  if (effects.familyMemberHealth || effects.familyMemberRelationship) {
    updatedCharacter.familyMembers = character.familyMembers.map(member => {
      let updatedMember = { ...member };
      
      if (effects.familyMemberHealth && effects.familyMemberHealth.id === member.id) {
        updatedMember.health = clampStat(member.health + effects.familyMemberHealth.change);
      }
      
      if (effects.familyMemberRelationship && effects.familyMemberRelationship.id === member.id) {
        updatedMember.relationshipQuality = clampStat(member.relationshipQuality + effects.familyMemberRelationship.change);
      }
      
      return updatedMember;
    });
  }
  
  return updatedCharacter;
};

export const getStatColor = (value: number): string => {
  if (value >= 80) return 'text-green-600';
  if (value >= 60) return 'text-yellow-600';
  if (value >= 40) return 'text-orange-600';
  return 'text-red-600';
};

export const getStatEmoji = (stat: string, value: number): string => {
  const emojis = {
    health: value >= 80 ? '💪' : value >= 60 ? '😊' : value >= 40 ? '😐' : '🤒',
    happiness: value >= 80 ? '😄' : value >= 60 ? '😊' : value >= 40 ? '😐' : '😢',
    smarts: value >= 80 ? '🧠' : value >= 60 ? '🤓' : value >= 40 ? '😐' : '🤪',
    looks: value >= 80 ? '😍' : value >= 60 ? '😊' : value >= 40 ? '😐' : '😵',
    wealth: value >= 200 ? '💰' : value >= 100 ? '💵' : value >= 50 ? '💳' : '🪙',
    relationships: value >= 80 ? '❤️' : value >= 60 ? '💛' : value >= 40 ? '🤝' : '💔',
    fame: value >= 80 ? '🌟' : value >= 60 ? '📺' : value >= 40 ? '📱' : '👤',
  };
  return emojis[stat as keyof typeof emojis] || '📊';
};

export const isGameOver = (character: Character): { gameOver: boolean; reason?: string } => {
  if (character.health <= 0) {
    return { gameOver: true, reason: 'Your health reached zero. You have passed away.' };
  }
  if (character.age >= 100) {
    return { gameOver: true, reason: 'You lived to be 100! What an incredible life journey!' };
  }
  return { gameOver: false };
};

export const getLifeStage = (age: number): string => {
  if (age < 2) return 'Baby';
  if (age < 13) return 'Child';
  if (age < 18) return 'Teenager';
  if (age < 65) return 'Adult';
  return 'Senior';
};

export const formatSalary = (salary: number): string => {
  if (salary === 0) return 'Unemployed';
  return `$${salary}k/year`;
};

export const getMonthName = (month: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1] || 'Unknown';
};
