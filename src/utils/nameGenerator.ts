
const firstNames = {
  male: [
    'Aaron', 'Adam', 'Adrian', 'Alan', 'Albert', 'Alex', 'Andrew', 'Anthony', 'Antonio',
    'Arthur', 'Benjamin', 'Bernard', 'Bobby', 'Brandon', 'Brian', 'Bruce', 'Carl',
    'Charles', 'Christopher', 'Daniel', 'David', 'Dennis', 'Donald', 'Douglas',
    'Edward', 'Eric', 'Eugene', 'Frank', 'Gary', 'George', 'Gregory', 'Harold',
    'Henry', 'Jack', 'Jacob', 'James', 'Jason', 'Jeffrey', 'Jerry', 'Jesse',
    'John', 'Jonathan', 'Jordan', 'Jose', 'Joseph', 'Joshua', 'Juan', 'Justin',
    'Keith', 'Kenneth', 'Kevin', 'Larry', 'Lawrence', 'Louis', 'Mark', 'Matthew',
    'Michael', 'Nicholas', 'Noah', 'Patrick', 'Paul', 'Peter', 'Philip', 'Ralph',
    'Raymond', 'Richard', 'Robert', 'Roger', 'Ronald', 'Roy', 'Russell', 'Ryan',
    'Samuel', 'Scott', 'Sean', 'Stephen', 'Steven', 'Thomas', 'Timothy', 'Victor',
    'Walter', 'Wayne', 'William', 'Willie'
  ],
  female: [
    'Amy', 'Angela', 'Anna', 'Annie', 'Ashley', 'Barbara', 'Betty', 'Brenda',
    'Carol', 'Carolyn', 'Catherine', 'Christine', 'Cynthia', 'Deborah', 'Debra',
    'Denise', 'Diana', 'Diane', 'Donna', 'Doris', 'Dorothy', 'Elizabeth', 'Emily',
    'Emma', 'Frances', 'Gloria', 'Grace', 'Helen', 'Janet', 'Janice', 'Jean',
    'Jennifer', 'Jessica', 'Joan', 'Joyce', 'Judith', 'Judy', 'Julia', 'Julie',
    'Karen', 'Katherine', 'Kathleen', 'Kathryn', 'Kelly', 'Kimberly', 'Laura',
    'Linda', 'Lisa', 'Lois', 'Louise', 'Margaret', 'Maria', 'Marie', 'Marilyn',
    'Martha', 'Mary', 'Megan', 'Michelle', 'Nancy', 'Nicole', 'Olivia', 'Pamela',
    'Patricia', 'Paula', 'Rachel', 'Rebecca', 'Rose', 'Ruth', 'Sandra', 'Sarah',
    'Sharon', 'Shirley', 'Stephanie', 'Susan', 'Teresa', 'Theresa', 'Virginia',
    'Wanda'
  ],
  other: [
    'Alex', 'Avery', 'Blake', 'Cameron', 'Charlie', 'Dakota', 'Drew', 'Emery',
    'Finley', 'Hayden', 'Hunter', 'Jamie', 'Jordan', 'Kai', 'Logan', 'Morgan',
    'Parker', 'Quinn', 'Reese', 'Riley', 'River', 'Rowan', 'Sage', 'Sam',
    'Skyler', 'Taylor', 'Tyler'
  ]
};

const lastNames = [
  'Adams', 'Allen', 'Anderson', 'Baker', 'Brown', 'Campbell', 'Carter', 'Clark',
  'Collins', 'Cook', 'Cooper', 'Davis', 'Edwards', 'Evans', 'Garcia', 'Gonzalez',
  'Green', 'Hall', 'Harris', 'Hill', 'Jackson', 'Johnson', 'Jones', 'King',
  'Lee', 'Lewis', 'Lopez', 'Martin', 'Martinez', 'Miller', 'Mitchell', 'Moore',
  'Nelson', 'Parker', 'Perez', 'Phillips', 'Robinson', 'Rodriguez', 'Smith',
  'Taylor', 'Thomas', 'Thompson', 'Turner', 'Walker', 'White', 'Williams',
  'Wilson', 'Wright', 'Young'
];

export function generateRandomName(gender?: 'male' | 'female' | 'other'): string {
  const selectedGender = gender || (Math.random() > 0.5 ? 'male' : 'female');
  const firstName = firstNames[selectedGender][Math.floor(Math.random() * firstNames[selectedGender].length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
}
