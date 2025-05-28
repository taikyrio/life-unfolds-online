
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
    // Entry Level Jobs
    {
      id: 'fast_food',
      title: 'Fast Food Worker',
      company: 'Quick Burger',
      salary: 22,
      requirements: { age: 14, education: 'None' },
      description: 'Part-time work in food service'
    },
    {
      id: 'retail_worker',
      title: 'Retail Associate',
      company: 'Local Store',
      salary: 25,
      requirements: { age: 16, education: 'None' },
      description: 'Customer service and sales'
    },
    {
      id: 'janitor',
      title: 'Janitor',
      company: 'CleanCorp',
      salary: 28,
      requirements: { age: 18, education: 'None' },
      description: 'Facility maintenance and cleaning'
    },
    {
      id: 'factory_worker',
      title: 'Factory Worker',
      company: 'Manufacturing Inc.',
      salary: 32,
      requirements: { age: 18, education: 'High School' },
      description: 'Assembly line production work'
    },
    // Skilled Jobs
    {
      id: 'electrician',
      title: 'Electrician',
      company: 'Power Solutions',
      salary: 55,
      requirements: { age: 20, education: 'Trade School' },
      description: 'Electrical systems installation and repair'
    },
    {
      id: 'paramedic',
      title: 'Paramedic',
      company: 'Emergency Services',
      salary: 48,
      requirements: { age: 21, education: 'Associate Degree' },
      description: 'Emergency medical services'
    },
    {
      id: 'police_officer',
      title: 'Police Officer',
      company: 'Police Department',
      salary: 52,
      requirements: { age: 21, education: 'Associate Degree' },
      description: 'Law enforcement and public safety'
    },
    // Professional Jobs
    {
      id: 'teacher',
      title: 'Teacher',
      company: 'Local School',
      salary: 48,
      requirements: { age: 22, education: 'Bachelor Degree' },
      description: 'Educate the next generation'
    },
    {
      id: 'nurse',
      title: 'Nurse',
      company: 'City Hospital',
      salary: 65,
      requirements: { age: 22, education: 'Bachelor Degree' },
      description: 'Patient care and medical support'
    },
    {
      id: 'accountant',
      title: 'Accountant',
      company: 'Finance Firm',
      salary: 58,
      requirements: { age: 22, education: 'Bachelor Degree' },
      description: 'Financial record keeping and analysis'
    },
    {
      id: 'engineer',
      title: 'Engineer',
      company: 'Tech Solutions',
      salary: 75,
      requirements: { age: 22, education: 'Bachelor Degree' },
      description: 'Design and build technical solutions'
    },
    // Corporate Jobs
    {
      id: 'marketing_manager',
      title: 'Marketing Manager',
      company: 'Corporate Inc.',
      salary: 85,
      requirements: { age: 25, education: 'Bachelor Degree' },
      description: 'Develop marketing strategies'
    },
    {
      id: 'it_manager',
      title: 'IT Manager',
      company: 'Tech Corp',
      salary: 95,
      requirements: { age: 26, education: 'Bachelor Degree' },
      description: 'Manage technology infrastructure'
    },
    // High-End Jobs
    {
      id: 'doctor',
      title: 'Doctor',
      company: 'City Hospital',
      salary: 185,
      requirements: { age: 26, education: 'Medical Degree' },
      description: 'Diagnose and treat patients'
    },
    {
      id: 'lawyer',
      title: 'Lawyer',
      company: 'Law Firm',
      salary: 125,
      requirements: { age: 25, education: 'Law Degree' },
      description: 'Represent clients in legal matters'
    },
    {
      id: 'investment_banker',
      title: 'Investment Banker',
      company: 'Wall Street Bank',
      salary: 145,
      requirements: { age: 24, education: 'MBA' },
      description: 'High-stakes financial planning'
    },
    {
      id: 'surgeon',
      title: 'Surgeon',
      company: 'Medical Center',
      salary: 250,
      requirements: { age: 30, education: 'Medical Degree' },
      description: 'Perform complex surgical procedures'
    },
    // Creative Jobs
    {
      id: 'artist',
      title: 'Artist',
      company: 'Art Studio',
      salary: 35,
      requirements: { age: 18, education: 'High School' },
      description: 'Create visual art and designs'
    },
    {
      id: 'musician',
      title: 'Musician',
      company: 'Record Label',
      salary: 28,
      requirements: { age: 16, education: 'None' },
      description: 'Perform and create music'
    },
    {
      id: 'writer',
      title: 'Writer',
      company: 'Publishing House',
      salary: 42,
      requirements: { age: 20, education: 'Bachelor Degree' },
      description: 'Create written content and stories'
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
