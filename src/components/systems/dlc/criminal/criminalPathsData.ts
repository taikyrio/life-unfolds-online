
import { Crown, Globe, Laptop, Shield } from 'lucide-react';

export const criminalPaths = {
  mafia: {
    id: 'mafia',
    name: 'Mafia',
    icon: Crown,
    description: 'Traditional organized crime family',
    color: 'from-red-600 to-red-800',
    careers: [
      {
        id: 'mafia_associate',
        name: 'Mafia Associate',
        description: 'Entry level family member',
        requirements: { age: 18, notoriety: 20 },
        salary: 45,
        riskLevel: 'Medium'
      },
      {
        id: 'mafia_soldier',
        name: 'Mafia Soldier',
        description: 'Made member of the family',
        requirements: { age: 25, notoriety: 40 },
        salary: 85,
        riskLevel: 'High'
      },
      {
        id: 'mafia_capo',
        name: 'Mafia Capo',
        description: 'Lead soldiers and operations',
        requirements: { age: 30, notoriety: 60 },
        salary: 150,
        riskLevel: 'Very High'
      },
      {
        id: 'mafia_underboss',
        name: 'Mafia Underboss',
        description: 'Second in command',
        requirements: { age: 35, notoriety: 80 },
        salary: 250,
        riskLevel: 'Extreme'
      },
      {
        id: 'mafia_boss',
        name: 'Mafia Boss',
        description: 'Head of the crime family',
        requirements: { age: 40, notoriety: 95 },
        salary: 500,
        riskLevel: 'Extreme'
      }
    ]
  },
  cartel: {
    id: 'cartel',
    name: 'Drug Cartel',
    icon: Globe,
    description: 'International drug trafficking organization',
    color: 'from-orange-600 to-orange-800',
    careers: [
      {
        id: 'cartel_runner',
        name: 'Drug Runner',
        description: 'Transport drugs across borders',
        requirements: { age: 16, notoriety: 15 },
        salary: 40,
        riskLevel: 'High'
      },
      {
        id: 'cartel_dealer',
        name: 'Drug Dealer',
        description: 'Sell drugs on the street',
        requirements: { age: 18, notoriety: 30 },
        salary: 65,
        riskLevel: 'High'
      },
      {
        id: 'cartel_lieutenant',
        name: 'Cartel Lieutenant',
        description: 'Manage territory and operations',
        requirements: { age: 25, notoriety: 50 },
        salary: 120,
        riskLevel: 'Very High'
      },
      {
        id: 'cartel_boss',
        name: 'Cartel Boss',
        description: 'Lead the cartel operations',
        requirements: { age: 35, notoriety: 80 },
        salary: 300,
        riskLevel: 'Extreme'
      }
    ]
  },
  cybercrime: {
    id: 'cybercrime',
    name: 'Cybercrime',
    icon: Laptop,
    description: 'High-tech digital criminal operations',
    color: 'from-blue-600 to-purple-800',
    careers: [
      {
        id: 'script_kiddie',
        name: 'Script Kiddie',
        description: 'Use basic hacking tools',
        requirements: { age: 13, notoriety: 5, coding: 20 },
        salary: 25,
        riskLevel: 'Low'
      },
      {
        id: 'hacker',
        name: 'Hacker',
        description: 'Break into computer systems',
        requirements: { age: 16, notoriety: 20, coding: 50 },
        salary: 70,
        riskLevel: 'Medium'
      },
      {
        id: 'black_hat',
        name: 'Black Hat Hacker',
        description: 'Advanced malicious hacking',
        requirements: { age: 20, notoriety: 40, coding: 75 },
        salary: 150,
        riskLevel: 'High'
      },
      {
        id: 'cyber_kingpin',
        name: 'Cyber Crime Kingpin',
        description: 'Lead cybercriminal operations',
        requirements: { age: 30, notoriety: 70, coding: 90 },
        salary: 400,
        riskLevel: 'Very High'
      }
    ]
  },
  gang: {
    id: 'gang',
    name: 'Street Gang',
    icon: Shield,
    description: 'Local street-level criminal organization',
    color: 'from-gray-600 to-gray-800',
    careers: [
      {
        id: 'gang_member',
        name: 'Gang Member',
        description: 'Basic gang activities',
        requirements: { age: 14, notoriety: 10 },
        salary: 20,
        riskLevel: 'Medium'
      },
      {
        id: 'gang_enforcer',
        name: 'Gang Enforcer',
        description: 'Enforce gang rules and territory',
        requirements: { age: 18, notoriety: 25 },
        salary: 45,
        riskLevel: 'High'
      },
      {
        id: 'gang_lieutenant',
        name: 'Gang Lieutenant',
        description: 'Second in command of local crew',
        requirements: { age: 22, notoriety: 45 },
        salary: 80,
        riskLevel: 'Very High'
      },
      {
        id: 'gang_leader',
        name: 'Gang Leader',
        description: 'Lead the entire gang',
        requirements: { age: 25, notoriety: 65 },
        salary: 150,
        riskLevel: 'Extreme'
      }
    ]
  }
};
