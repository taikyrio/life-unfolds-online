
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Baby } from 'lucide-react';
import { Character } from '@/types/character';

interface BirthStoryProps {
  character: Character;
  onContinue: () => void;
}

const generateBirthStory = (character: Character) => {
  const countries = [
    { name: 'United States', locations: ['at City General Hospital', 'at Saint Mary\'s Medical Center', 'at Memorial Hospital', 'at home with a midwife', 'at Regional Medical Center'] },
    { name: 'Canada', locations: ['at Toronto General Hospital', 'at Vancouver Medical Center', 'at Montreal Children\'s Hospital', 'at home in Quebec', 'at Calgary Health Center'] },
    { name: 'United Kingdom', locations: ['at Royal London Hospital', 'at Birmingham Women\'s Hospital', 'at home in Manchester', 'at Edinburgh Royal Infirmary', 'at Cardiff Medical Center'] },
    { name: 'Australia', locations: ['at Sydney Hospital', 'at Melbourne Medical Center', 'at Brisbane Women\'s Hospital', 'at home in Perth', 'at Adelaide General Hospital'] },
    { name: 'Germany', locations: ['at Berlin Medical Center', 'at Munich Hospital', 'at Hamburg University Hospital', 'at home in Frankfurt', 'at Cologne General Hospital'] },
    { name: 'France', locations: ['at Paris Medical Center', 'at Lyon Hospital', 'at Marseille General Hospital', 'at home in Nice', 'at Toulouse Medical Center'] },
    { name: 'Japan', locations: ['at Tokyo Medical Center', 'at Osaka Hospital', 'at Kyoto General Hospital', 'at home in Yokohama', 'at Nagoya Medical Center'] },
    { name: 'Brazil', locations: ['at São Paulo Hospital', 'at Rio de Janeiro Medical Center', 'at Brasília General Hospital', 'at home in Salvador', 'at Fortaleza Medical Center'] }
  ];

  const motherNames = [
    'Sarah', 'Jennifer', 'Lisa', 'Michelle', 'Angela', 'Melissa', 'Brenda', 'Amy',
    'Anna', 'Rebecca', 'Virginia', 'Kathleen', 'Pamela', 'Martha', 'Debra', 'Rachel',
    'Emma', 'Sophie', 'Charlotte', 'Isabella', 'Olivia', 'Grace', 'Lily', 'Chloe'
  ];

  const fatherNames = [
    'Michael', 'Christopher', 'Matthew', 'Joshua', 'David', 'James', 'Daniel', 'Robert',
    'John', 'Joseph', 'Andrew', 'Ryan', 'Brandon', 'Jason', 'Justin', 'William',
    'Alexander', 'Benjamin', 'Lucas', 'Henry', 'Sebastian', 'Owen', 'Gabriel', 'Nathan'
  ];

  const parentJobs = [
    'teacher', 'doctor', 'engineer', 'nurse', 'lawyer', 'accountant', 'chef', 'artist',
    'mechanic', 'police officer', 'firefighter', 'pharmacist', 'architect', 'journalist',
    'software developer', 'business owner', 'retail manager', 'electrician', 'plumber',
    'construction worker', 'social worker', 'librarian', 'photographer', 'musician'
  ];

  const conceptionStories = [
    'after your parents had been trying to conceive for several months',
    'as a wonderful surprise during their honeymoon',
    'when your parents decided they were ready to start a family',
    'after your parents had been married for a few years',
    'as an unexpected but joyful surprise',
    'when your parents felt financially stable enough for a child',
    'after your parents moved into their new home',
    'during a romantic anniversary celebration'
  ];

  const circumstances = [
    'after a long labor',
    'during a beautiful sunrise',
    'on a snowy winter morning',
    'during a thunderstorm',
    'on a peaceful Sunday',
    'just before midnight',
    'during the early morning hours',
    'on a bright spring day',
    'during autumn leaves falling',
    'on New Year\'s Eve'
  ];

  const reactions = [
    'Your parents were overjoyed!',
    'Your mother cried tears of happiness.',
    'Your father couldn\'t stop smiling.',
    'The whole family was excited to meet you.',
    'Your parents had been trying for years.',
    'You were a wonderful surprise to your parents.',
    'Your grandparents flew in just to meet you.',
    'Your parents immediately called all their friends and family.'
  ];

  const weights = ['5 lbs 8 oz', '6 lbs 2 oz', '7 lbs 8 oz', '6 lbs 15 oz', '8 lbs 1 oz', '7 lbs 3 oz', '6 lbs 11 oz', '8 lbs 5 oz'];

  const selectedCountry = countries[Math.floor(Math.random() * countries.length)];
  const location = selectedCountry.locations[Math.floor(Math.random() * selectedCountry.locations.length)];
  const playerLastName = character.name.split(' ')[1] || 'Smith';
  const motherName = `${motherNames[Math.floor(Math.random() * motherNames.length)]} ${playerLastName}`;
  const fatherName = `${fatherNames[Math.floor(Math.random() * fatherNames.length)]} ${playerLastName}`;
  const motherJob = parentJobs[Math.floor(Math.random() * parentJobs.length)];
  const fatherJob = parentJobs[Math.floor(Math.random() * parentJobs.length)];
  const conceptionStory = conceptionStories[Math.floor(Math.random() * conceptionStories.length)];
  const circumstance = circumstances[Math.floor(Math.random() * circumstances.length)];
  const reaction = reactions[Math.floor(Math.random() * reactions.length)];
  const weight = weights[Math.floor(Math.random() * weights.length)];
  
  const pronoun = character.gender === 'male' ? 'He' : 'She';
  const article = character.gender === 'male' ? 'a baby boy' : 'a baby girl';

  return {
    location,
    country: selectedCountry.name,
    motherName,
    fatherName,
    motherJob,
    fatherJob,
    conceptionStory,
    circumstance,
    reaction,
    weight,
    pronoun,
    article
  };
};

export const BirthStory: React.FC<BirthStoryProps> = ({ character, onContinue }) => {
  const story = generateBirthStory(character);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white dark:bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold flex items-center justify-center gap-2 text-gray-900 dark:text-white">
            <Baby className="h-6 w-6 text-pink-500" />
            You Are Born!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4 text-center">
          <div className="text-6xl mb-4">
            {character.gender === 'male' ? '👶' : '👶'}
          </div>
          
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>{character.name}</strong> was born on {new Date(character.birthYear || new Date().getFullYear(), (character.birthMonth || 1) - 1, character.birthDay || 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} in <strong>{story.country}</strong> {story.location} {story.circumstance}.
            </p>
            
            <p>
              {story.pronoun} weighed {story.weight} and was perfectly healthy!
            </p>
            
            <p>
              Your mother, <strong>{story.motherName}</strong> (a {story.motherJob}), and your father, <strong>{story.fatherName}</strong> (a {story.fatherJob}), welcomed {story.article} into the world.
            </p>
            
            <p>
              You were conceived {story.conceptionStory}.
            </p>
            
            <p className="text-center italic">
              {story.reaction}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">Welcome to life!</span>
            </div>
          </div>

          <Button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
          >
            Continue Your Journey
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
