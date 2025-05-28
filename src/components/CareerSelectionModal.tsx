
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Character } from '../types/game';
import { Badge } from '@/components/ui/badge';
import { Briefcase, GraduationCap, DollarSign, X } from 'lucide-react';

interface CareerOption {
  id: string;
  title: string;
  salary: number;
  requirements: {
    age: number;
    education?: string;
    smarts?: number;
    looks?: number;
  };
  description: string;
  emoji: string;
}

interface CareerSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  onSelectCareer: (careerId: string) => void;
}

export const CareerSelectionModal: React.FC<CareerSelectionModalProps> = ({
  isOpen,
  onClose,
  character,
  onSelectCareer
}) => {
  if (!isOpen) return null;

  const careerOptions: CareerOption[] = [
    {
      id: 'fast_food',
      title: 'Fast Food Worker',
      salary: 22,
      requirements: { age: 16 },
      description: 'Entry-level position in food service',
      emoji: '🍔'
    },
    {
      id: 'retail',
      title: 'Retail Associate',
      salary: 25,
      requirements: { age: 16 },
      description: 'Work in customer service and sales',
      emoji: '🛍️'
    },
    {
      id: 'office_assistant',
      title: 'Office Assistant',
      salary: 30,
      requirements: { age: 18, education: 'High' },
      description: 'Administrative support role',
      emoji: '📋'
    },
    {
      id: 'teacher',
      title: 'Teacher',
      salary: 48,
      requirements: { age: 22, education: 'Bachelor', smarts: 60 },
      description: 'Educate and inspire students',
      emoji: '👩‍🏫'
    },
    {
      id: 'nurse',
      title: 'Nurse',
      salary: 65,
      requirements: { age: 22, education: 'Bachelor', smarts: 70 },
      description: 'Healthcare professional',
      emoji: '👩‍⚕️'
    },
    {
      id: 'engineer',
      title: 'Engineer',
      salary: 75,
      requirements: { age: 22, education: 'Bachelor', smarts: 80 },
      description: 'Design and build solutions',
      emoji: '👷‍♂️'
    },
    {
      id: 'doctor',
      title: 'Doctor',
      salary: 185,
      requirements: { age: 26, education: 'Medical', smarts: 90 },
      description: 'Medical professional',
      emoji: '👨‍⚕️'
    },
    {
      id: 'lawyer',
      title: 'Lawyer',
      salary: 125,
      requirements: { age: 25, education: 'Law', smarts: 85 },
      description: 'Legal professional',
      emoji: '⚖️'
    }
  ];

  const getEligibleCareers = () => {
    return careerOptions.filter(career => {
      const meetsAge = character.age >= career.requirements.age;
      const meetsEducation = !career.requirements.education || 
        character.education.some(edu => edu.includes(career.requirements.education!));
      const meetsSmarts = !career.requirements.smarts || character.smarts >= career.requirements.smarts;
      const meetsLooks = !career.requirements.looks || character.looks >= career.requirements.looks;
      
      return meetsAge && meetsEducation && meetsSmarts && meetsLooks;
    });
  };

  const eligibleCareers = getEligibleCareers();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[80vh] animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Choose Your Career</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Select a career path that matches your qualifications:
          </p>
          
          <ScrollArea className="h-80">
            <div className="space-y-3">
              {eligibleCareers.map(career => (
                <div
                  key={career.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onSelectCareer(career.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{career.emoji}</span>
                      <div>
                        <h3 className="font-semibold text-sm">{career.title}</h3>
                        <p className="text-xs text-gray-600">{career.description}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      ${career.salary}k/year
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="outline" className="text-xs">
                      Age: {career.requirements.age}+
                    </Badge>
                    {career.requirements.education && (
                      <Badge variant="outline" className="text-xs">
                        {career.requirements.education}
                      </Badge>
                    )}
                    {career.requirements.smarts && (
                      <Badge variant="outline" className="text-xs">
                        Smarts: {career.requirements.smarts}+
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              
              {eligibleCareers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Briefcase className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No careers available yet.</p>
                  <p className="text-xs">Continue your education or improve your stats!</p>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Skip for Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
