
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
      requirements: { age: 14, education: 'None', smarts: 0, looks: 0 },
      description: 'Part-time work in food service'
    },
    {
      id: 'retail_worker',
      title: 'Retail Associate',
      company: 'Local Store',
      salary: 25,
      requirements: { age: 16, education: 'None', smarts: 0, looks: 0 },
      description: 'Customer service and sales'
    },
    {
      id: 'janitor',
      title: 'Janitor',
      company: 'CleanCorp',
      salary: 28,
      requirements: { age: 18, education: 'None', smarts: 0, looks: 0 },
      description: 'Facility maintenance and cleaning'
    },
    {
      id: 'factory_worker',
      title: 'Factory Worker',
      company: 'Manufacturing Inc.',
      salary: 32,
      requirements: { age: 18, education: 'High School', smarts: 0, looks: 0 },
      description: 'Assembly line production work'
    },
    // Skilled Jobs
    {
      id: 'electrician',
      title: 'Electrician',
      company: 'Power Solutions',
      salary: 55,
      requirements: { age: 20, education: 'Trade School', smarts: 0, looks: 0 },
      description: 'Electrical systems installation and repair'
    },
    {
      id: 'paramedic',
      title: 'Paramedic',
      company: 'Emergency Services',
      salary: 48,
      requirements: { age: 21, education: 'Associate Degree', smarts: 0, looks: 0 },
      description: 'Emergency medical services'
    },
    {
      id: 'police_officer',
      title: 'Police Officer',
      company: 'Police Department',
      salary: 52,
      requirements: { age: 21, education: 'Associate Degree', smarts: 0, looks: 0 },
      description: 'Law enforcement and public safety'
    },
    // Professional Jobs
    {
      id: 'teacher',
      title: 'Teacher',
      company: 'Local School',
      salary: 48,
      requirements: { age: 22, education: 'Bachelor Degree', smarts: 60, looks: 0 },
      description: 'Educate the next generation'
    },
    {
      id: 'nurse',
      title: 'Nurse',
      company: 'City Hospital',
      salary: 65,
      requirements: { age: 22, education: 'Bachelor Degree', smarts: 70, looks: 0 },
      description: 'Patient care and medical support'
    },
    {
      id: 'accountant',
      title: 'Accountant',
      company: 'Finance Firm',
      salary: 58,
      requirements: { age: 22, education: 'Bachelor Degree', smarts: 65, looks: 0 },
      description: 'Financial record keeping and analysis'
    },
    {
      id: 'engineer',
      title: 'Engineer',
      company: 'Tech Solutions',
      salary: 75,
      requirements: { age: 22, education: 'Bachelor Degree', smarts: 80, looks: 0 },
      description: 'Design and build technical solutions'
    },
    // Corporate Jobs
    {
      id: 'marketing_manager',
      title: 'Marketing Manager',
      company: 'Corporate Inc.',
      salary: 85,
      requirements: { age: 25, education: 'Bachelor Degree', smarts: 70, looks: 60 },
      description: 'Develop marketing strategies'
    },
    {
      id: 'it_manager',
      title: 'IT Manager',
      company: 'Tech Corp',
      salary: 95,
      requirements: { age: 26, education: 'Bachelor Degree', smarts: 85, looks: 0 },
      description: 'Manage technology infrastructure'
    },
    // High-End Jobs
    {
      id: 'doctor',
      title: 'Doctor',
      company: 'City Hospital',
      salary: 185,
      requirements: { age: 26, education: 'Medical Degree', smarts: 90, looks: 0 },
      description: 'Diagnose and treat patients'
    },
    {
      id: 'lawyer',
      title: 'Lawyer',
      company: 'Law Firm',
      salary: 125,
      requirements: { age: 25, education: 'Law Degree', smarts: 85, looks: 0 },
      description: 'Represent clients in legal matters'
    },
    {
      id: 'investment_banker',
      title: 'Investment Banker',
      company: 'Wall Street Bank',
      salary: 145,
      requirements: { age: 24, education: 'MBA', smarts: 88, looks: 0 },
      description: 'High-stakes financial planning'
    },
    {
      id: 'surgeon',
      title: 'Surgeon',
      company: 'Medical Center',
      salary: 250,
      requirements: { age: 30, education: 'Medical Degree', smarts: 95, looks: 0 },
      description: 'Perform complex surgical procedures'
    },
    // Creative Jobs
    {
      id: 'artist',
      title: 'Artist',
      company: 'Art Studio',
      salary: 35,
      requirements: { age: 18, education: 'High School', smarts: 0, looks: 50 },
      description: 'Create visual art and designs'
    },
    {
      id: 'musician',
      title: 'Musician',
      company: 'Record Label',
      salary: 28,
      requirements: { age: 16, education: 'None', smarts: 0, looks: 60 },
      description: 'Perform and create music'
    },
    {
      id: 'writer',
      title: 'Writer',
      company: 'Publishing House',
      salary: 42,
      requirements: { age: 20, education: 'Bachelor Degree', smarts: 75, looks: 0 },
      description: 'Create written content and stories'
    }
  ];

  const isEligible = (job: typeof jobListings[0]) => {
    const meetsAge = character.age >= job.requirements.age;
    const meetsEducation = job.requirements.education === 'None' || 
                          character.education.includes(job.requirements.education.split(' ')[0]);
    const meetsSmarts = job.requirements.smarts === 0 || character.smarts >= job.requirements.smarts;
    const meetsLooks = job.requirements.looks === 0 || character.looks >= job.requirements.looks;
    
    return meetsAge && meetsEducation && meetsSmarts && meetsLooks;
  };

  const getFailureReasons = (job: typeof jobListings[0]) => {
    const reasons = [];
    if (character.age < job.requirements.age) {
      reasons.push(`Need age ${job.requirements.age}+`);
    }
    if (job.requirements.education !== 'None' && !character.education.includes(job.requirements.education.split(' ')[0])) {
      reasons.push(`Need ${job.requirements.education}`);
    }
    if (job.requirements.smarts > 0 && character.smarts < job.requirements.smarts) {
      reasons.push(`Need ${job.requirements.smarts} smarts`);
    }
    if (job.requirements.looks > 0 && character.looks < job.requirements.looks) {
      reasons.push(`Need ${job.requirements.looks} looks`);
    }
    return reasons;
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
          const failureReasons = getFailureReasons(job);
          return (
            <Card key={job.id} className={!eligible ? 'opacity-60' : ''}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{job.title}</h3>
                      {eligible && <Badge variant="secondary" className="bg-green-100 text-green-800">Eligible</Badge>}
                      {!eligible && <Badge variant="secondary" className="bg-red-100 text-red-800">Not Eligible</Badge>}
                      {character.criminalRecord && <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Criminal Record</Badge>}
                    </div>
                    <p className="text-gray-600 mb-1">{job.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{job.description}</p>
                    <div className="flex items-center gap-4 text-sm mb-2">
                      <span className="font-medium text-green-600">${job.salary}k/year</span>
                      <span className="text-gray-500">Min Age: {job.requirements.age}</span>
                      <span className="text-gray-500">Education: {job.requirements.education}</span>
                      {job.requirements.smarts > 0 && (
                        <span className="text-gray-500">Smarts: {job.requirements.smarts}+</span>
                      )}
                      {job.requirements.looks > 0 && (
                        <span className="text-gray-500">Looks: {job.requirements.looks}+</span>
                      )}
                    </div>
                    {!eligible && failureReasons.length > 0 && (
                      <div className="text-sm text-red-600">
                        Missing: {failureReasons.join(', ')}
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => onJobApplication(job.id)}
                    disabled={!eligible || character.job === job.title}
                    className="ml-4"
                    variant={eligible ? "default" : "secondary"}
                  >
                    {character.job === job.title ? 'Current Job' : eligible ? 'Apply' : 'Not Eligible'}
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
