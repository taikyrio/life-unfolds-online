
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Character } from '../../types/game';
import { Heart, Activity, Shield, Pill, Stethoscope, Hospital, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { medicalProcedures, healthInsurancePlans, calculateInsuranceCoverage, performMedicalProcedure } from '../../systems/enhancedHealthSystem';
import { useToast } from '@/hooks/use-toast';

interface HealthTabProps {
  character: Character;
  onHealthAction: (action: string, data?: any) => void;
}

export const HealthTab: React.FC<HealthTabProps> = ({ 
  character, 
  onHealthAction 
}) => {
  const [selectedProcedure, setSelectedProcedure] = useState<any>(null);
  const [showProcedureDialog, setShowProcedureDialog] = useState(false);
  const { toast } = useToast();

  const getHealthStatus = (health: number) => {
    if (health >= 80) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50', icon: '💪' };
    if (health >= 60) return { status: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: '❤️' };
    if (health >= 40) return { status: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: '🤒' };
    if (health >= 20) return { status: 'Poor', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: '🤢' };
    return { status: 'Critical', color: 'text-red-600', bgColor: 'bg-red-50', icon: '🆘' };
  };

  const healthStatus = getHealthStatus(character.health);
  const currentInsurance = character.healthInsurance?.active ? character.healthInsurance : null;

  const handleProcedure = (procedure: any) => {
    const result = performMedicalProcedure(character, procedure, currentInsurance);
    
    onHealthAction('medical_procedure', {
      procedure,
      result,
      effects: result.effects
    });

    toast({
      title: result.success ? "Procedure Successful" : "Procedure Complications",
      description: result.result,
      variant: result.success ? "default" : "destructive",
    });

    setShowProcedureDialog(false);
  };

  const handleInsuranceEnroll = (plan: any) => {
    if (character.wealth < plan.monthlyPremium * 12) {
      toast({
        title: "Insufficient Funds",
        description: `You need $${(plan.monthlyPremium * 12).toLocaleString()} for annual insurance premium.`,
        variant: "destructive",
      });
      return;
    }

    onHealthAction('enroll_insurance', { plan });
    toast({
      title: "Insurance Enrolled",
      description: `Successfully enrolled in ${plan.provider} health insurance.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-24">
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Hospital className="h-8 w-8 text-blue-600" />
            Advanced Health Center
          </h1>
          <p className="text-gray-600">Comprehensive healthcare and wellness management</p>
        </div>

        {/* Health Overview */}
        <Card className={`mb-6 border-2 ${healthStatus.bgColor}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              Health Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{healthStatus.icon}</span>
                <div>
                  <span className={`font-bold text-xl ${healthStatus.color}`}>
                    {healthStatus.status}
                  </span>
                  <p className="text-sm text-gray-600">Overall Health Score</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {character.health}/100
              </Badge>
            </div>
            <Progress value={character.health} className="h-4" />
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="font-semibold text-gray-700">Age</div>
                <div className="text-lg font-bold text-blue-600">{character.age}</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="font-semibold text-gray-700">Fitness Level</div>
                <div className="text-lg font-bold text-green-600">{character.looks}%</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <div className="font-semibold text-gray-700">Mental Health</div>
                <div className="text-lg font-bold text-purple-600">{character.happiness}%</div>
              </div>
            </div>

            {/* Insurance Status */}
            <div className="mt-4 p-3 bg-white rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Insurance Status</span>
                </div>
                {currentInsurance ? (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {currentInsurance.provider}
                  </Badge>
                ) : (
                  <Badge variant="destructive">Uninsured</Badge>
                )}
              </div>
              {currentInsurance && (
                <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-2">
                  <div>Monthly Premium: ${currentInsurance.monthlyPremium}</div>
                  <div>Coverage: {currentInsurance.coveragePercentage}%</div>
                  <div>Deductible: ${currentInsurance.deductible.toLocaleString()}</div>
                  <div>Max Coverage: ${currentInsurance.maxCoverage.toLocaleString()}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Health Center Tabs */}
        <Tabs defaultValue="procedures" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="procedures">Medical Procedures</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
          </TabsList>

          {/* Medical Procedures Tab */}
          <TabsContent value="procedures">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-blue-500" />
                  Available Medical Procedures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {medicalProcedures.map((procedure) => {
                  const coverage = calculateInsuranceCoverage(procedure, currentInsurance);
                  const canAfford = character.wealth >= coverage.outOfPocket;
                  const meetsRequirements = !procedure.requirements || 
                    (!procedure.requirements.minAge || character.age >= procedure.requirements.minAge) &&
                    (!procedure.requirements.maxAge || character.age <= procedure.requirements.maxAge) &&
                    (!procedure.requirements.minHealth || character.health >= procedure.requirements.minHealth) &&
                    (!procedure.requirements.insurance || currentInsurance);

                  return (
                    <div key={procedure.id} className="p-4 border rounded-lg bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{procedure.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{procedure.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant={procedure.riskLevel === 'low' ? 'default' : 
                                          procedure.riskLevel === 'medium' ? 'secondary' : 'destructive'}>
                              {procedure.riskLevel} risk
                            </Badge>
                            <span className="text-green-600">+{procedure.healthImprovement} Health</span>
                            <span className="text-blue-600">+{procedure.happinessImpact} Happiness</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            ${coverage.outOfPocket.toLocaleString()}
                          </div>
                          {coverage.covered > 0 && (
                            <div className="text-sm text-green-600">
                              Insurance covers: ${coverage.covered.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{procedure.successRate}% success rate</span>
                          {procedure.recoveryTime > 0 && (
                            <>
                              <Clock className="h-4 w-4 text-orange-500" />
                              <span>{procedure.recoveryTime} weeks recovery</span>
                            </>
                          )}
                        </div>

                        <Dialog open={showProcedureDialog && selectedProcedure?.id === procedure.id} 
                               onOpenChange={(open) => {
                                 setShowProcedureDialog(open);
                                 if (!open) setSelectedProcedure(null);
                               }}>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => setSelectedProcedure(procedure)}
                              disabled={!canAfford || !meetsRequirements}
                              variant={canAfford && meetsRequirements ? "default" : "outline"}
                            >
                              {!meetsRequirements ? "Requirements Not Met" :
                               !canAfford ? "Cannot Afford" : "Schedule Procedure"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirm Medical Procedure</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to proceed with {procedure.name}?
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold mb-2">Procedure Details</h4>
                                <div className="space-y-2 text-sm">
                                  <div>Success Rate: {procedure.successRate}%</div>
                                  <div>Health Improvement: +{procedure.healthImprovement}</div>
                                  <div>Recovery Time: {procedure.recoveryTime} weeks</div>
                                  <div>Total Cost: ${coverage.outOfPocket.toLocaleString()}</div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setShowProcedureDialog(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={() => handleProcedure(procedure)}>
                                  Proceed with Procedure
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>

                      {!meetsRequirements && procedure.requirements && (
                        <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-600">
                          <AlertTriangle className="h-4 w-4 inline mr-1" />
                          Requirements: 
                          {procedure.requirements.minAge && ` Age ${procedure.requirements.minAge}+`}
                          {procedure.requirements.minHealth && ` Health ${procedure.requirements.minHealth}+`}
                          {procedure.requirements.insurance && ` Insurance Required`}
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insurance Tab */}
          <TabsContent value="insurance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Health Insurance Plans
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {healthInsurancePlans.map((plan) => (
                  <div key={plan.provider} className="p-4 border rounded-lg bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{plan.provider}</h3>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                          <div>Monthly Premium: ${plan.monthlyPremium}</div>
                          <div>Coverage: {plan.coveragePercentage}%</div>
                          <div>Deductible: ${plan.deductible.toLocaleString()}</div>
                          <div>Max Coverage: ${plan.maxCoverage.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-blue-600">
                          ${(plan.monthlyPremium * 12).toLocaleString()}/year
                        </div>
                        {currentInsurance?.provider === plan.provider ? (
                          <Badge variant="default" className="mt-2">Current Plan</Badge>
                        ) : (
                          <Button
                            onClick={() => handleInsuranceEnroll(plan)}
                            disabled={character.wealth < plan.monthlyPremium * 12}
                            className="mt-2"
                          >
                            {character.wealth < plan.monthlyPremium * 12 ? "Cannot Afford" : "Enroll"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wellness Tab */}
          <TabsContent value="wellness">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  Wellness Programs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={() => onHealthAction('exercise')}>
                  <Activity className="h-4 w-4 mr-2" />
                  Regular Exercise Program (Free)
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onHealthAction('diet')}
                  disabled={character.wealth < 50}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Nutrition Counseling ($50)
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onHealthAction('meditation')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Meditation & Mindfulness (Free)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Emergency Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">24/7 Emergency Hotline</h3>
                  <p className="text-red-700 text-sm mb-3">
                    For life-threatening emergencies, call immediately.
                  </p>
                  <Button variant="destructive" className="w-full" size="lg">
                    <Hospital className="h-4 w-4 mr-2" />
                    Call Emergency Services
                  </Button>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-2">Urgent Care</h3>
                  <p className="text-orange-700 text-sm mb-3">
                    For non-life threatening urgent medical needs.
                  </p>
                  <Button variant="outline" className="w-full" disabled={character.wealth < 200}>
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Visit Urgent Care ($200)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
