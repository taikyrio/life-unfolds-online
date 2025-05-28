
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Character } from '../types/game';
import { Badge } from '@/components/ui/badge';

interface CareersTabProps {
  character: Character;
  onJobApplication: (jobId: string) => void;
}

export const CareersTab: React.FC<CareersTabProps> = ({ character, onJobApplication }) => {
  const jobListings = [
    {
      id: 'retail_worker',
      title: 'Retail Worker',
      company: 'Local Store',
      salary: 25,
      requirements: { age: 16, education: 'High School' },
      description: 'Entry-level position in retail'
    },
    {
      id: 'fast_food',
      title: 'Fast Food Worker',
      company: 'Quick Burger',
      salary: 20,
      requirements: { age: 14, education: 'Elementary School' },
      description: 'Part-time work in food service'
    },
    {
      id: 'office_assistant',
      title: 'Office Assistant',
      company: 'Corporate Inc.',
      salary: 35,
      requirements: { age: 18, education: 'High School' },
      description: 'Administrative support role'
    },
    {
      id: 'teacher',
      title: 'Teacher',
      company: 'Local School',
      salary: 50,
      requirements: { age: 22, education: 'University Degree' },
      description: 'Educate the next generation'
    },
    {
      id: 'doctor',
      title: 'Doctor',
      company: 'City Hospital',
      salary: 120,
      requirements: { age: 26, education: 'Medical Degree' },
      description: 'Heal the sick and injured'
    },
    {
      id: 'lawyer',
      title: 'Lawyer',
      company: 'Law Firm',
      salary: 100,
      requirements: { age: 25, education: 'Law Degree' },
      description: 'Represent clients in legal matters'
    }
  ];

  const isEligible = (job: typeof jobListings[0]) => {
    return character.age >= job.requirements.age && 
           (job.requirements.education === 'Elementary School' || 
            character.education.includes(job.requirements.education.split(' ')[0]));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-game-text mb-2">Career Center</h2>
        <p className="text-gray-600">Find your perfect job</p>
      </div>

      {character.job && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Current Employment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{character.job}</h3>
                <p className="text-gray-600">Salary: ${character.salary}k/year</p>
                <p className="text-sm text-gray-500">Job Level: {character.jobLevel}</p>
              </div>
              <Button variant="outline" onClick={() => onJobApplication('quit')}>
                Quit Job
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {jobListings.map((job) => {
          const eligible = isEligible(job);
          return (
            <Card key={job.id} className={!eligible ? 'opacity-50' : ''}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{job.title}</h3>
                      {eligible && <Badge variant="secondary">Eligible</Badge>}
                    </div>
                    <p className="text-gray-600 mb-1">{job.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{job.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-medium text-green-600">${job.salary}k/year</span>
                      <span className="text-gray-500">Min Age: {job.requirements.age}</span>
                      <span className="text-gray-500">Education: {job.requirements.education}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => onJobApplication(job.id)}
                    disabled={!eligible || character.job === job.title}
                    className="ml-4"
                  >
                    {character.job === job.title ? 'Current Job' : 'Apply'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
