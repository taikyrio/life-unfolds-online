import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Skull, DollarSign, ShieldCheck, AlertTriangle, Users, Crown, Briefcase,
    Brain, Zap, Barbell, Eye, Handshake, Lock, Unlock, Scale, Hammer,
    Laptop, Building, UserSecret, Run, Hospital, University, ShieldAlert, ShieldOff,
    Gavel, LogOut, TrendingUp, TrendingDown, UserPlus, Anchor, MessageSquare,
    BookOpen, Landmark, Recycle, AlertOctagon, MapPin, Cog, UserCog, GitFork, ShieldQuestion
} from 'lucide-react';

// --- DATA DEFINITIONS (Expanded for BitLife feel) ---

// Define a more detailed Character interface for this DLC's needs
interface Character {
    id: string;
    name: string;
    age: number;
    health: number; // 0-100
    happiness: number; // 0-100
    smarts: number; // 0-100
    looks: number; // 0-100
    stress: number; // 0-100, new
    money: number;
    job: {
        id: string;
        title: string;
        type: 'criminal_career';
        income: number;
    } | null;
    skills: {
        stealth: number; // 0-100
        strength: number; // 0-100
        hacking: number; // 0-100
        charisma: number; // 0-100
        streetSmarts: number; // 0-100, new
        interrogation: number; // 0-100, new
    };
    criminalRecord: Array<{ crime: string; conviction: string; sentenceYears: number; timeServed: number; yearConvicted: number }>;
    notoriety: number; // 0-100
    heat: number; // 0-100
    prisonSentence: number; // Years remaining
    timeInPrison: number; // Years served in current sentence
    isInPrisonGang: boolean; // new
    prisonGangRole?: string; // new
    currentOrganization: {
        id: string;
        name: string;
        type: string;
        role: string;
        reputation: number; // 0-100
        loyalty?: number; // 0-100 Character's loyalty to this org
    } | null;
    inventory: Array<{
        id: string;
        name: string;
        type: 'weapon' | 'tool' | 'vehicle' | 'document' | 'contraband' | 'luxury' | 'info';
        quantity: number;
        value?: number;
        description?: string;
    }>;
    isUndercover?: boolean;
    currentLocationContext?: string; // e.g. "Low-security prison wing", "Affluent suburb"
}

interface CriminalDLCProps {
    character: Character;
    onCareerAction: (actionType: string, data?: any) => void;
}


// SKILLS
const SKILL_DEFINITIONS = [
    { id: 'stealth', name: 'Stealth', icon: <UserSecret className="h-4 w-4 mr-2" />, description: "Sneaking, evasion, and subtlety." },
    { id: 'strength', name: 'Strength', icon: <Barbell className="h-4 w-4 mr-2" />, description: "Physical power and intimidation." },
    { id: 'hacking', name: 'Hacking', icon: <Laptop className="h-4 w-4 mr-2" />, description: "Digital intrusion and data manipulation." },
    { id: 'charisma', name: 'Charisma', icon: <Handshake className="h-4 w-4 mr-2" />, description: "Influence, negotiation, and deception." },
    { id: 'streetSmarts', name: 'Street Smarts', icon: <MapPin className="h-4 w-4 mr-2" />, description: "Navigating the underworld, spotting opportunities and dangers." },
    { id: 'interrogation', name: 'Interrogation', icon: <ShieldQuestion className="h-4 w-4 mr-2" />, description: "Extracting information through questioning or pressure." },
];

// PETTY CRIMES
const PETTY_CRIMES = [
    { id: 'pickpocket', name: 'Pickpocket', icon: <Eye className="h-4 w-4" />, description: 'Lift wallets from unsuspecting targets.', skillCheck: { skill: 'stealth', difficulty: 20 }, minReward: 50, maxReward: 200, heatGain: 1, notorietyGain: 1, arrestChance: 10, injuryChance: 5, skillXP: { stealth: 5 } },
    { id: 'shoplift', name: 'Shoplift', icon: <Zap className="h-4 w-4" />, description: 'Steal goods from a local store.', skillCheck: { skill: 'stealth', difficulty: 30 }, minReward: 100, maxReward: 500, heatGain: 2, notorietyGain: 2, arrestChance: 15, injuryChance: 2, skillXP: { stealth: 7 } },
    { id: 'burglary_residential', name: 'Burgle a House', icon: <Lock className="h-4 w-4" />, description: 'Break into a home for valuables.', skillCheck: { skill: 'stealth', difficulty: 40 }, minReward: 500, maxReward: 2000, heatGain: 5, notorietyGain: 3, arrestChance: 25, injuryChance: 10, toolRequired: 'lockpicks', skillXP: { stealth: 10 } },
    { id: 'mugging', name: 'Mug Someone', icon: <Skull className="h-4 w-4" />, description: 'Rob someone on the street.', skillCheck: { skill: 'strength', difficulty: 30 }, minReward: 200, maxReward: 800, heatGain: 3, notorietyGain: 2, arrestChance: 20, injuryChance: 15, weaponRecommended: 'melee', skillXP: { strength: 7 } },
    { id: 'vandalism', name: 'Vandalism', icon: <Hammer className="h-4 w-4" />, description: 'Deface public or private property.', skillCheck: null, minReward: 0, maxReward: 50, heatGain: 1, notorietyGain: 1, arrestChance: 5, injuryChance: 1, skillXP: {} },
    { id: 'scam_call', name: 'Phishing Scam', icon: <Laptop className="h-4 w-4" />, description: 'Trick people into revealing sensitive info.', skillCheck: { skill: 'hacking', difficulty: 25 }, minReward: 100, maxReward: 1000, heatGain: 2, notorietyGain: 2, arrestChance: 10, injuryChance: 0, skillXP: { hacking: 5, charisma: 3 } },
    { id: 'sell_drugs_street', name: 'Street Drug Dealing', icon: <TrendingUp className="h-4 w-4" />, description: 'Sell illicit substances on the streets.', skillCheck: { skill: 'streetSmarts', difficulty: 30 }, minReward: 300, maxReward: 1500, heatGain: 4, notorietyGain: 3, arrestChance: 20, injuryChance: 10, skillXP: { streetSmarts: 7, charisma: 2 } },
];

// MAJOR HEISTS
const MAJOR_HEISTS = [
    { id: 'bank_robbery', name: 'Bank Robbery', icon: <Landmark className="h-4 w-4" />, description: 'Execute a classic bank heist.', skillCheck: [{ skill: 'stealth', difficulty: 70 }, { skill: 'strength', difficulty: 60 }, { skill: 'charisma', difficulty: 50 }], minReward: 50000, maxReward: 250000, heatGain: 20, notorietyGain: 15, arrestChance: 60, injuryChance: 30, crewRecommended: 3, planningRequired: true, skillXP: { stealth: 20, strength: 15, charisma: 10, streetSmarts: 10 } },
    { id: 'art_gallery_heist', name: 'Art Gallery Heist', icon: <University className="h-4 w-4" />, description: 'Steal priceless art under heavy security.', skillCheck: [{ skill: 'stealth', difficulty: 80 }, { skill: 'hacking', difficulty: 70 }], minReward: 100000, maxReward: 1000000, heatGain: 25, notorietyGain: 20, arrestChance: 50, injuryChance: 20, crewRecommended: 2, planningRequired: true, skillXP: { stealth: 25, hacking: 20, smarts: 15 } },
    { id: 'casino_vault', name: 'Casino Vault Breach', icon: <Crown className="h-4 w-4" />, description: 'Crack a high-security casino vault.', skillCheck: [{ skill: 'hacking', difficulty: 85 }, { skill: 'stealth', difficulty: 75 }, { skill: 'charisma', difficulty: 60 }], minReward: 200000, maxReward: 2000000, heatGain: 30, notorietyGain: 25, arrestChance: 65, injuryChance: 25, crewRecommended: 4, planningRequired: true, skillXP: { hacking: 25, stealth: 20, charisma: 15, smarts: 10 } },
    { id: 'data_center_raid', name: 'Data Center Raid', icon: <Laptop className="h-4 w-4" />, description: 'Infiltrate a secure data center to steal valuable information.', skillCheck: [{ skill: 'hacking', difficulty: 90 }, { skill: 'stealth', difficulty: 80 }], minReward: 150000, maxReward: 1500000, heatGain: 28, notorietyGain: 22, arrestChance: 60, injuryChance: 15, crewRecommended: 3, planningRequired: true, skillXP: { hacking: 30, stealth: 25, smarts: 20 } },
];

// CRIMINAL CAREERS
const CRIMINAL_CAREERS_DATA = {
    street_hustler: {
        name: 'Street Hustler Path', icon: <Users className="h-5 w-5" />,
        levels: [
            { id: 'street_thug_1', name: 'Petty Thief', description: 'Start with small-time theft.', income: 10000, risk: 'Low', req: { age: 16, skills: { streetSmarts: 10 } }, unlocks: ['street_thug_2'], actions: [{id: 'extort_locals', name: 'Extort Locals', effectDescription: "Demand 'protection' money from local businesses."}] },
            { id: 'street_thug_2', name: 'Seasoned Burglar', description: 'Move on to breaking and entering.', income: 25000, risk: 'Medium', req: { age: 18, skills: { stealth: 30, streetSmarts: 20 }, notoriety: 10, previousJob: 'street_thug_1' }, unlocks: ['street_thug_3'], actions: [{id: 'target_affluent_home', name: 'Target Affluent Home', effectDescription: "Scope out and burgle wealthier residences."}] },
            { id: 'street_thug_3', name: 'Crew Leader', description: 'Organize small-scale heists.', income: 60000, risk: 'Medium', req: { age: 22, skills: { charisma: 40, strength: 30, streetSmarts: 40 }, notoriety: 30, previousJob: 'street_thug_2' }, unlocks: ['gang_member_1'], actions: [{id: 'recruit_thugs', name: 'Recruit Thugs'}, {id: 'plan_store_robbery', name: 'Plan Store Robbery', effectDescription: "Coordinate a robbery on a high-value store."}] },
        ]
    },
    organized_crime: {
        name: 'Organized Crime Path (Mafia/Cartel)', icon: <Briefcase className="h-5 w-5" />,
        levels: [
            { id: 'mafia_associate_1', name: 'Mafia Associate', description: 'Become an earner for a family.', income: 50000, risk: 'High', req: { age: 21, skills: { charisma: 50, strength: 40, streetSmarts: 30 }, notoriety: 40 }, unlocks: ['mafia_associate_2'], actions: [{id: 'collect_protection_money', name: 'Collect Protection Money', effectDescription: "Enforce the family's 'tax' on businesses."}] },
            { id: 'mafia_associate_2', name: 'Made Member / Soldado', description: 'A sworn member of the organization.', income: 120000, risk: 'Very High', req: { age: 25, skills: { strength: 60, charisma: 60, interrogation: 30 }, notoriety: 60, previousJob: 'mafia_associate_1' }, unlocks: ['mafia_associate_3'], actions: [{id: 'enforce_territory', name: 'Enforce Territory'}, {id: 'eliminate_rival', name: 'Eliminate Rival', effectDescription: "Remove a competitor, permanently."}]},
            { id: 'mafia_associate_3', name: 'Capo / Lieutenant', description: 'Lead a crew within the organization.', income: 300000, risk: 'Extreme', req: { age: 30, skills: { charisma: 80, strength: 70, streetSmarts: 60, interrogation: 50 }, notoriety: 80, previousJob: 'mafia_associate_2' }, unlocks: [], actions: [{id: 'manage_racket', name: 'Manage Racket'}, {id: 'order_hit', name: 'Order Hit', effectDescription: "Sanction an execution."}] },
        ]
    },
    cyber_crime: {
        name: 'Cybercrime Syndicate', icon: <Laptop className="h-5 w-5" />,
        levels: [
            { id: 'cyber_crime_1', name: 'Script Kiddie', description: 'Basic hacking and online scams.', income: 30000, risk: 'Low', req: { age: 16, skills: { hacking: 30, smarts: 40 } }, unlocks: ['cyber_crime_2'], actions: [{id: 'ddos_attack_small', name: 'DDoS Attack Small Site', effectDescription: "Overload a minor website for disruption or extortion."}] },
            { id: 'cyber_crime_2', name: 'Black Hat Hacker', description: 'Breach systems for data or profit.', income: 90000, risk: 'Medium', req: { age: 20, skills: { hacking: 60, smarts: 60 }, notoriety: 20, previousJob: 'cyber_crime_1' }, unlocks: ['cyber_crime_3'], actions: [{id: 'steal_credit_cards', name: 'Steal Credit Card Data', effectDescription: "Compromise databases to acquire financial information."}] },
            { id: 'cyber_crime_3', name: 'Dark Web Kingpin', description: 'Run a major online criminal enterprise.', income: 400000, risk: 'High', req: { age: 28, skills: { hacking: 85, charisma: 50, smarts: 75 }, notoriety: 70, previousJob: 'cyber_crime_2' }, unlocks: [], actions: [{id: 'run_dark_market', name: 'Run Dark Market'}, {id: 'launder_crypto', name: 'Launder Cryptocurrency', effectDescription: "Obscure the origins of large sums of digital currency."}] },
        ]
    }
};

// CRIMINAL ORGANIZATIONS
const ORGANIZATION_TYPES = [
    { id: 'street_gang', name: 'Street Gang', icon: <Users className="h-4 w-4" />, description: 'Control turf, deal drugs, and engage in petty warfare.', joinNotorietyReq: 20, startNotorietyReq: 40, memberBenefits: ["Protection in territory", "Access to small arms", "Backup"], memberDuties: ["Pay weekly cut", "Participate in turf wars", "Recruit new members"] },
    { id: 'mafia_family', name: 'Mafia Family', icon: <Briefcase className="h-4 w-4" />, description: 'A traditional organized crime syndicate.', joinNotorietyReq: 50, startNotorietyReq: 80, memberBenefits: ["Significant influence", "Access to better resources", "Legal aid (sometimes)"], memberDuties: ["Earn for the family", "Maintain Omertà (code of silence)", "Show absolute loyalty"] },
    { id: 'hacker_collective', name: 'Hacker Collective', icon: <Laptop className="h-4 w-4" />, description: 'Decentralized group of cybercriminals.', joinNotorietyReq: 40, skillReq: { hacking: 60, smarts: 50 }, startNotorietyReq: 70, memberBenefits: ["Shared tools & exploits", "Anonymity support", "Access to large-scale jobs"], memberDuties: ["Contribute new exploits", "Share profits from joint operations", "Maintain digital security"] },
];

// ORGANIZATION INTERACTIONS (if part of an organization)
const ORGANIZATION_INTERACTIONS = [
    { id: 'pay_dues', name: 'Pay Dues/Tribute', icon: <DollarSign className="h-4 w-4" />, description: 'Contribute your share to the organization.', cost: 'variable', effect: 'Improves standing and loyalty.', requiresMembership: true },
    { id: 'request_mission', name: 'Request a Mission', icon: <Briefcase className="h-4 w-4" />, description: 'Ask for a specific task or job from superiors.', effect: 'May lead to income, risk, and reputation changes.', requiresMembership: true },
    { id: 'request_backup', name: 'Request Backup', icon: <Users className="h-4 w-4" />, description: 'Call for support from fellow members.', risk: 'Medium', effect: 'Can help in tough situations, but may owe a favor.', requiresMembership: true },
    { id: 'report_activity', name: 'Report Intelligence', icon: <Eye className="h-4 w-4" />, description: 'Share useful information with the organization.', effect: 'Can improve standing or uncover opportunities.', requiresMembership: true },
    { id: 'challenge_authority', name: 'Challenge for Higher Role', icon: <TrendingUp className="h-4 w-4" />, description: 'Attempt to usurp a superior or gain more power.', risk: 'Very High', skillCheck: ['charisma', 'strength', 'streetSmarts'], requiresMembership: true },
    { id: 'leave_organization', name: 'Leave Organization', icon: <LogOut className="h-4 w-4" />, description: 'Attempt to sever ties. Highly dangerous.', risk: 'Extreme', requiresMembership: true },
];

// PRISON ACTIONS
const PRISON_ACTIONS = [
    { id: 'serve_time_quietly', name: 'Serve Time Quietly', description: 'Keep your head down and do your time.', effect: 'Reduces sentence, low risk. Small stress increase.', icon: <LogOut className="h-4 w-4" /> },
    { id: 'prison_job', name: 'Work Prison Job', description: 'Earn a pittance. Can alleviate boredom.', effect: 'Small income, may improve parole chances. Reduces stress slightly.', icon: <Hammer className="h-4 w-4" />, wage: 20, skillImprovement: { strength: 1 } },
    { id: 'study_law', name: 'Study Law Books', description: 'Educate yourself on legal matters.', effect: 'Improves Smarts. May help with appeals.', icon: <BookOpen className="h-4 w-4" />, timeCost: 'significant', skillImprovement: { smarts: 2 } },
    { id: 'workout_yard', name: 'Workout in Yard', description: 'Build strength and toughness.', effect: 'Improves Strength. May attract attention.', icon: <Barbell className="h-4 w-4" />, skillImprovement: { strength: 2 } },
    { id: 'join_prison_gang', name: 'Join Prison Gang', description: 'Seek protection and power within prison walls.', effect: 'Offers protection, access to contraband, but involves dangerous obligations.', icon: <Users className="h-4 w-4" />, risk: 'High', requires: { notoriety: 30, strength: 40 } },
    { id: 'start_riot', name: 'Start a Riot', description: 'Cause chaos in the prison.', effect: 'High risk, can reduce sentence or backfire badly (more time, solitary).', icon: <Zap className="h-4 w-4" />, skillCheck: { skill: 'charisma', difficulty: 70 }, notorietyGain: 10, heatGain: 5 },
    { id: 'appeal_sentence', name: 'Appeal Sentence', description: 'Try to get your sentence reduced or overturned.', effect: 'Requires money for lawyer. Chance of success based on smarts, evidence, lawyer quality.', icon: <Scale className="h-4 w-4" />, lawyerCost: 5000 },
    { id: 'attempt_escape', name: 'Attempt Escape', description: 'Make a break for freedom.', effect: 'Extremely high risk, severe consequences if caught (more time, max security).', icon: <Run className="h-4 w-4" />, skillChecks: [{ skill: 'stealth', difficulty: 80 }, { skill: 'smarts', difficulty: 70 }] },
    { id: 'bribe_guard', name: 'Bribe Guard', description: 'Pay off a guard for favors or contraband.', effect: 'Requires money, risk of exposure and punishment for both.', icon: <DollarSign className="h-4 w-4" />, cost: 1000, skillCheck: { skill: 'charisma', difficulty: 50 } },
    { id: 'request_parole', name: 'Request Parole Hearing', description: 'Plead your case for early release.', effect: 'Success depends on time served, behavior, smarts, and criminal record.', icon: <Gavel className="h-4 w-4" />, requires: { portionOfSentenceServed: 0.5 } }
];

// PRISON GANG ACTIONS (if character.isInPrisonGang)
const PRISON_GANG_ACTIONS = [
    { id: 'gang_task_smuggle', name: 'Smuggle Contraband', description: 'Move illicit items for the gang.', risk: 'Medium', reward: 'Respect, small cut', icon: <Zap className="h-4 w-4"/> },
    { id: 'gang_task_extort', name: 'Extort Inmate', description: 'Pressure another inmate for a "tax".', risk: 'Medium', skillCheck: {skill: 'strength', difficulty: 40}, icon: <DollarSign className="h-4 w-4"/> },
    { id: 'gang_task_fight_rival', name: 'Fight Rival Gang Member', description: 'Engage in violence for gang dominance.', risk: 'High', skillCheck: {skill: 'strength', difficulty: 60}, icon: <Barbell className="h-4 w-4"/>},
    { id: 'rise_in_ranks', name: 'Rise in Gang Ranks', description: 'Prove your loyalty and ruthlessness.', risk: 'Very High', icon: <TrendingUp className="h-4 w-4"/>},
    { id: 'leave_prison_gang', name: 'Leave Prison Gang', description: 'Attempt to cut ties. Extremely dangerous.', risk: 'Extreme', icon: <ShieldOff className="h-4 w-4"/>}
];

// FUGITIVE OPTIONS
const FUGITIVE_OPTIONS = [
    { id: 'lay_low_local', name: 'Lay Low Locally', description: 'Hide out in the current area to reduce immediate heat.', heatReduction: 15, cost: 1000, durationYears: 0.5, risk: 'Medium', discoveryChance: 20, icon: <UserSecret className="h-4 w-4" /> },
    { id: 'establish_safe_house', name: 'Establish Safe House', description: 'Set up a more permanent, hidden location.', heatReduction: 5, cost: 15000, durationYears: 'Permanent until found', risk: 'Low once established', icon: <Lock className="h-4 w-4" /> },
    { id: 'change_identity', name: 'Change Identity', description: 'Get new papers, new look, new life (locally).', heatReduction: 40, cost: 30000, requires: { notoriety: 50, smarts: 60 }, successChance: 70, icon: <ShieldOff className="h-4 w-4" /> },
    { id: 'flee_country', name: 'Flee the Country', description: 'Escape to a country with no extradition treaty.', heatReduction: 70, cost: 75000, requires: { money: 75000 }, nonExtraditionChance: 60, icon: <Anchor className="h-4 w-4" /> },
    { id: 'go_off_grid', name: 'Go Off-Grid', description: 'Disappear into the wilderness or an isolated community.', heatReduction: 60, cost: 5000, requires: { skills: { stealth: 50, streetSmarts: 40 } }, risk: 'High initial, Low if successful', icon: <Recycle className="h-4 w-4" /> },
    { id: 'witness_protection', name: 'Enter Witness Protection', description: 'Testify against former associates for a new life. EXTREMELY RISKY.', heatReduction: 100, cost: 0, requires: { notoriety: 70, organizationMember: true, majorCrimeKnowledge: true }, successChance: 30, icon: <ShieldAlert className="h-4 w-4" /> },
];

// GENERAL CRIMINAL INTERACTIONS
const GENERAL_INTERACTIONS = [
    { id: 'gather_intel', name: 'Gather Intel', icon: <Eye className="h-4 w-4" />, description: 'Scout targets, rivals, or opportunities.', skillCheck: { skill: 'streetSmarts', difficulty: 40 }, cost: 100, risk: 'Low', benefit: 'Gain valuable information item or temporary boost.' },
    { id: 'fence_goods', name: 'Fence Stolen Goods', icon: <Recycle className="h-4 w-4" />, description: 'Sell pilfered items through an underground contact.', requires: 'Stolen goods in inventory', payoutPercentage: 0.5, skillCheck: { skill: 'charisma', difficulty: 30 }, risk: 'Medium' },
    { id: 'bribe_official', name: 'Bribe an Official', icon: <Handshake className="h-4 w-4" />, description: 'Pay off police, judges, or politicians for favors.', costRange: [5000, 50000], skillCheck: { skill: 'charisma', difficulty: 70 }, risk: 'High', benefit: 'Reduce heat, drop charges, gain influence.' },
    { id: 'launder_money', name: 'Launder Money', icon: <DollarSign className="h-4 w-4" />, description: 'Clean dirty money through various schemes.', feePercentage: 0.2, skillCheck: { skill: 'hacking', difficulty: 60, orSkill: 'smarts', orDifficulty: 70 }, risk: 'Medium', requires: 'Significant illicit cash' },
    { id: 'recruit_accomplice', name: 'Recruit an Accomplice', icon: <UserPlus className="h-4 w-4" />, description: 'Find someone to help with a specific job.', skillCheck: { skill: 'charisma', difficulty: 50 }, cost: 'Share of loot or flat fee', risk: 'Medium', benefit: 'Assistance in crimes, can also betray.' },
    { id: 'intimidate_witness', name: 'Intimidate a Witness', icon: <AlertOctagon className="h-4 w-4" />, description: 'Scare off someone who might testify against you.', skillCheck: { skill: 'strength', difficulty: 60, orSkill: 'interrogation', orDifficulty: 50 }, risk: 'Very High', heatGain: 10 },
    { id: 'network_underworld', name: 'Network with Underworld Contacts', icon: <Users className="h-4 w-4" />, description: 'Spend time building connections.', cost: 500, skillCheck: { skill: 'charisma', difficulty: 30 }, benefit: 'Increase notoriety, find opportunities, make allies/enemies.' },
];


export const CriminalDLC: React.FC<CriminalDLCProps> = ({ character, onCareerAction }) => {
    const [activeTab, setActiveTab] = useState('status');

    const getRiskColor = (risk: string | undefined) => {
        if (!risk) return 'text-gray-600 bg-gray-100';
        switch (risk.toLowerCase()) {
            case 'low': return 'text-green-600 bg-green-100';
            case 'medium': return 'text-yellow-600 bg-yellow-100';
            case 'high': return 'text-orange-600 bg-orange-100';
            case 'very high': return 'text-red-600 bg-red-100';
            case 'extreme': return 'text-purple-600 bg-purple-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const isCareerLevelEligible = (level: any) => {
        if (!level.req) return true;
        if (level.req.age && character.age < level.req.age) return false;
        if (level.req.smarts && character.smarts < level.req.smarts) return false;
        if (level.req.notoriety && character.notoriety < level.req.notoriety) return false;
        if (level.req.previousJob && character.job?.id !== level.req.previousJob) return false;
        if (level.req.skills) {
            for (const skillKey in level.req.skills) {
                if (character.skills[skillKey as keyof typeof character.skills] < level.req.skills[skillKey]) return false;
            }
        }
        // Could add check for specific items or org membership if careers require it
        return true;
    };
    
    const canAttemptCrime = (crime: any) => { // typeof PETTY_CRIMES[0] | typeof MAJOR_HEISTS[0]
        // Basic check, can be expanded (e.g., tool requirements, crew)
        if (crime.toolRequired && !character.inventory.find(item => item.id === crime.toolRequired && item.type === 'tool')) {
            // Could show a warning instead of disabling, or game logic handles it
        }
        return character.health > 20 && character.prisonSentence <= 0; // Basic health and not in prison
    };

    const canDoAction = (action: any) => {
        if (character.prisonSentence > 0 && !['prison', 'prison_gang'].includes(activeTab)) return false; // Most actions disabled in prison
        if (action.requires?.money && character.money < action.requires.money) return false;
        if (action.requires?.notoriety && character.notoriety < action.requires.notoriety) return false;
        if (action.requires?.smarts && character.smarts < action.requires.smarts) return false;
        if (action.requires?.organizationMember && !character.currentOrganization) return false;
        if (action.cost && typeof action.cost === 'number' && character.money < action.cost) return false;
        // TODO: more complex requirement checks (e.g. skills, inventory items)
        return true;
    }


    const renderTabs = () => {
        const tabs = [
            { id: 'status', label: 'Status', icon: <UserCog /> },
            { id: 'interactions', label: 'Interactions', icon: <MessageSquare /> },
            { id: 'petty_crimes', label: 'Petty Crimes', icon: <Zap /> },
            { id: 'major_heists', label: 'Major Heists', icon: <Landmark /> },
            { id: 'careers', label: 'Careers', icon: <Briefcase /> },
            { id: 'skills', label: 'Skills', icon: <Brain /> },
            { id: 'organization', label: 'Organization', icon: <Users /> },
        ];

        if (character.prisonSentence > 0) {
            tabs.push({ id: 'prison', label: 'Prison Life', icon: <Gavel /> });
            if(character.isInPrisonGang) {
                 tabs.push({ id: 'prison_gang', label: 'Prison Gang', icon: <GitFork /> });
            }
        } else if (character.heat > 70 || (character.criminalRecord.length > 0 && character.prisonSentence <=0 && character.heat > 50) ){ // Example condition for fugitive tab
             tabs.push({ id: 'fugitive', label: 'Fugitive', icon: <Run /> });
        }


        return (
            <div className="mb-4 flex space-x-1 bg-slate-100 p-1 rounded-lg overflow-x-auto">
                {tabs.map(tab => (
                    <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-shrink-0 ${activeTab === tab.id ? 'shadow-md' : ''}`}
                    >
                        {React.cloneElement(tab.icon, {className: "h-4 w-4 mr-2"})}
                        {tab.label}
                    </Button>
                ))}
            </div>
        );
    };

    const renderActionCard = (action: any, actionType: string, category: string) => (
        <div key={action.id} className="border border-slate-700 rounded-lg p-3 hover:bg-slate-700/50 transition-colors">
            <div className="flex justify-between items-start mb-1">
                <div>
                    <h3 className="font-medium text-slate-200 flex items-center">{action.icon && React.cloneElement(action.icon, {className: "mr-2 h-5 w-5"})} {action.name}</h3>
                    <p className="text-xs text-slate-400">{action.description}</p>
                </div>
                <Button
                    size="sm" variant="destructive"
                    onClick={() => onCareerAction(actionType, { actionId: action.id, category })}
                    disabled={!canDoAction(action) || (character.prisonSentence > 0 && category !== 'prison' && category !== 'prison_gang')}
                    className="bg-sky-600 hover:bg-sky-700 text-white whitespace-nowrap"
                >
                    {action.cost ? `Act ($${typeof action.cost === 'number' ? action.cost : 'Var'})` : 'Perform'}
                </Button>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                {action.risk && <span>Risk: <Badge variant="outline" className={getRiskColor(action.risk) + " px-1 py-0 text-xs"}>{action.risk}</Badge></span>}
                {action.heatGain && <span>🔥 +{action.heatGain} Heat</span>}
                {action.notorietyGain && <span>⭐ +{action.notorietyGain} Notoriety</span>}
                {action.skillCheck && <span>🎯 Skill: {action.skillCheck.skill} ({action.skillCheck.difficulty})</span>}
                {action.skillChecks && action.skillChecks.map((sc:any) => <span key={sc.skill}>🎯 {sc.skill} ({sc.difficulty})</span>)}
                {action.cost && <span>💰 Cost: {typeof action.cost === 'number' ? `$${action.cost}` : action.cost}</span>}
                {action.reward && <span>🎁 {action.reward}</span>}
                {action.effect && <span className="italic">Effect: {action.effect}</span>}
            </div>
        </div>
    );


    return (
        <div className="space-y-6 p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-lg shadow-xl">
            <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2 text-red-400">
                        <Skull className="h-7 w-7" /> Criminal Underworld
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        {character.currentLocationContext ? `${character.currentLocationContext} | ` : ''}
                        Manage your life of crime. Every choice has consequences.
                    </CardDescription>
                </CardHeader>
            </Card>

            {renderTabs()}

            {activeTab === 'status' && (
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader><CardTitle className="flex items-center"><UserCog className="mr-2 h-5 w-5 text-red-500"/>Criminal Profile</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div><label className="text-sm font-medium text-slate-400">Notoriety</label><Progress value={character.notoriety} className="h-3 mt-1 bg-slate-700 [&>div]:bg-red-500" /><span className="text-xs text-slate-500">{character.notoriety}/100</span></div>
                            <div><label className="text-sm font-medium text-slate-400">Heat Level</label><Progress value={character.heat} className="h-3 mt-1 bg-slate-700 [&>div]:bg-orange-500" /><span className="text-xs text-slate-500">{character.heat}/100</span></div>
                            <div><label className="text-sm font-medium text-slate-400">Stress</label><Progress value={character.stress} className="h-3 mt-1 bg-slate-700 [&>div]:bg-yellow-500" /><span className="text-xs text-slate-500">{character.stress}/100</span></div>
                        </div>
                        <p className="text-sm text-slate-300"><strong>Current Role:</strong> {character.job?.title || 'Unemployed (in crime)'}</p>
                        {character.currentOrganization && (
                            <p className="text-sm text-slate-300">
                                <strong>Organization:</strong> {character.currentOrganization.name} ({character.currentOrganization.type}) - <strong>Role:</strong> {character.currentOrganization.role}
                                {typeof character.currentOrganization.loyalty === 'number' && ` - Loyalty: ${character.currentOrganization.loyalty}/100`}
                            </p>
                        )}
                        {character.prisonSentence > 0 && (
                             <Badge className="bg-red-700 text-white p-2 text-sm">INCARCERATED: {character.prisonSentence} years remaining. Served: {character.timeInPrison} yrs.</Badge>
                         )}
                         {character.isInPrisonGang && (
                             <Badge className="bg-purple-600 text-white p-2 text-sm ml-2">PRISON GANG: {character.prisonGangRole || 'Member'}</Badge>
                         )}
                        {character.criminalRecord.length > 0 && (
                            <div className="mt-2 p-3 bg-red-900/30 border border-red-700 rounded-md">
                                <h4 className="font-semibold text-red-400">Criminal Record:</h4>
                                <ul className="list-disc list-inside text-xs text-slate-400 max-h-24 overflow-y-auto">
                                    {character.criminalRecord.map((rec, i) => <li key={i}>{rec.conviction} ({rec.sentenceYears} yrs) - Year {rec.yearConvicted} (Served {rec.timeServed} yrs)</li>)}
                                </ul>
                            </div>
                        )}
                        {character.inventory.length > 0 && (
                             <div className="mt-2 p-3 bg-slate-700/50 border border-slate-600 rounded-md">
                                <h4 className="font-semibold text-sky-400">Inventory Highlights:</h4>
                                <ul className="list-disc list-inside text-xs text-slate-400 max-h-24 overflow-y-auto">
                                    {character.inventory.slice(0,5).map((item, i) => <li key={i}>{item.name} (x{item.quantity}) - {item.type} {item.value ? `($${item.value} ea.)` : ''}</li>)}
                                    {character.inventory.length > 5 && <li>...and {character.inventory.length - 5} more items.</li>}
                                </ul>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {activeTab === 'interactions' && (
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader><CardTitle className="flex items-center"><MessageSquare className="mr-2 h-5 w-5 text-cyan-400"/>General Interactions</CardTitle></CardHeader>
                    <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                        {GENERAL_INTERACTIONS.map(action => renderActionCard(action, 'general_interaction', 'interactions'))}
                    </CardContent>
                </Card>
            )}

            {activeTab === 'petty_crimes' && (
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader><CardTitle className="flex items-center"><Zap className="mr-2 h-5 w-5 text-yellow-400"/>Petty Crimes</CardTitle></CardHeader>
                    <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                        {PETTY_CRIMES.map(crime => (
                            <div key={crime.id} className="border border-slate-700 rounded-lg p-3 hover:bg-slate-700/50 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <h3 className="font-medium text-slate-200 flex items-center">{crime.icon && React.cloneElement(crime.icon, {className: "mr-2 h-5 w-5"})} {crime.name}</h3>
                                        <p className="text-xs text-slate-400">{crime.description}</p>
                                    </div>
                                    <Button
                                        size="sm" variant="destructive"
                                        onClick={() => onCareerAction('attempt_crime', { crimeId: crime.id, crimeType: 'petty' })}
                                        disabled={!canAttemptCrime(crime) || character.prisonSentence > 0}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                    > Attempt </Button>
                                </div>
                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                                    <span>💰 ${crime.minReward}-${crime.maxReward}</span>
                                    <span>🔥 +{crime.heatGain} Heat</span>
                                    <span>⭐ +{crime.notorietyGain} Notoriety</span>
                                    <span>🚨 {crime.arrestChance}% Arrest</span>
                                    {crime.skillCheck && <span>🎯 Skill: {crime.skillCheck.skill} ({crime.skillCheck.difficulty})</span>}
                                    {crime.toolRequired && <span>🛠️ Needs: {crime.toolRequired}</span>}
                                    {crime.weaponRecommended && <span>🗡️ Rec: {crime.weaponRecommended}</span>}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
            
            {activeTab === 'major_heists' && (
                 <Card className="bg-slate-800 border-slate-700">
                    <CardHeader><CardTitle className="flex items-center"><Landmark className="mr-2 h-5 w-5 text-green-400"/>Major Heists</CardTitle></CardHeader>
                    <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                        {MAJOR_HEISTS.map(heist => (
                            <div key={heist.id} className="border border-slate-700 rounded-lg p-3 hover:bg-slate-700/50 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <h3 className="font-medium text-slate-200 flex items-center">{heist.icon && React.cloneElement(heist.icon, {className: "mr-2 h-5 w-5"})} {heist.name}</h3>
                                        <p className="text-xs text-slate-400">{heist.description}</p>
                                        {heist.planningRequired && <Badge variant="outline" className="text-xs mt-1 border-blue-500 text-blue-400">Planning Recommended</Badge>}
                                    </div>
                                    <Button
                                        size="sm" variant="destructive"
                                        onClick={() => onCareerAction('attempt_crime', { crimeId: heist.id, crimeType: 'major' })}
                                        disabled={!canAttemptCrime(heist) || character.prisonSentence > 0}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                    > Attempt Heist </Button>
                                </div>
                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                                    <span>💰 ${heist.minReward/1000}k-${heist.maxReward/1000}k</span>
                                    <span>🔥 +{heist.heatGain} Heat</span>
                                    <span>⭐ +{heist.notorietyGain} Notoriety</span>
                                    <span>🚨 {heist.arrestChance}% Arrest</span>
                                    {heist.crewRecommended && <span>👥 {heist.crewRecommended}+ Crew</span>}
                                    {/* Add display for multiple skill checks here if desired */}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {activeTab === 'careers' && !character.prisonSentence && (
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader><CardTitle className="flex items-center"><Briefcase className="mr-2 h-5 w-5 text-purple-400"/>Criminal Career Paths</CardTitle></CardHeader>
                    <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
                        {Object.entries(CRIMINAL_CAREERS_DATA).map(([pathId, pathData]) => (
                            <div key={pathId} className="border border-slate-700 rounded-lg p-3">
                                <h3 className="text-lg font-semibold text-purple-300 flex items-center mb-2">{pathData.icon} {pathData.name}</h3>
                                {pathData.levels.map(level => {
                                    const eligible = isCareerLevelEligible(level);
                                    const isCurrentJob = character.job?.id === level.id;
                                    return (
                                        <div key={level.id} className={`border-t border-slate-700/50 py-3 px-2 my-1 rounded ${!eligible && !isCurrentJob ? 'opacity-50' : 'hover:bg-slate-700/50'} transition-colors`}>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-medium text-slate-200">{level.name} <Badge className={getRiskColor(level.risk) + " ml-2"}>{level.risk} Risk</Badge></h4>
                                                    <p className="text-xs text-slate-400 mb-1">{level.description}</p>
                                                    <div className="text-xs text-slate-500">
                                                        Est. Income: ${level.income.toLocaleString()}/yr. Age: {level.req.age}+.
                                                        {level.req.smarts && ` Smarts: ${level.req.smarts}+.`}
                                                        {level.req.notoriety && ` Notoriety: ${level.req.notoriety}+.`}
                                                        {level.req.skills && Object.entries(level.req.skills).map(([s,v]) => ` ${SKILL_DEFINITIONS.find(sd => sd.id === s)?.name || s}: ${v}+.`)}
                                                        {level.req.previousJob && ` Req: ${CRIMINAL_CAREERS_DATA[pathId as keyof typeof CRIMINAL_CAREERS_DATA]?.levels.find(l=>l.id === level.req.previousJob)?.name || level.req.previousJob}.`}
                                                    </div>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    onClick={() => onCareerAction('join_career', { careerId: level.id })}
                                                    disabled={!eligible || isCurrentJob || character.prisonSentence > 0}
                                                    variant={isCurrentJob ? "secondary" : (eligible ? "default" : "outline")}
                                                    className={isCurrentJob ? "bg-slate-600" : (eligible ? "bg-purple-600 hover:bg-purple-700" : "border-slate-600 text-slate-500")}
                                                >
                                                    {isCurrentJob ? 'Current Role' : (eligible ? 'Take Role' : 'Locked')}
                                                </Button>
                                            </div>
                                            {isCurrentJob && level.actions && (
                                                <div className="mt-2 space-y-1 pl-4 border-l-2 border-purple-500">
                                                    <p className="text-xs font-semibold text-purple-300">Role Actions:</p>
                                                    {level.actions.map(action => (
                                                        <Button key={action.id} variant="link" size="sm" className="text-purple-400 hover:text-purple-200 p-0 h-auto text-xs block text-left" onClick={() => onCareerAction('career_action', { actionId: action.id, careerId: level.id })}>
                                                            {action.name} {action.effectDescription && <span className="text-slate-500 italic text-xxs">- {action.effectDescription}</span>}
                                                        </Button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
            
            {activeTab === 'skills' && (
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader><CardTitle className="flex items-center"><Brain className="mr-2 h-5 w-5 text-sky-400"/>Develop Skills</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {SKILL_DEFINITIONS.map(skillDef => (
                            <div key={skillDef.id} className="border border-slate-700 p-3 rounded-lg">
                                <div className="flex justify-between items-center mb-1">
                                    <div>
                                        <h4 className="font-medium text-slate-200 flex items-center">{skillDef.icon} {skillDef.name} ({character.skills[skillDef.id as keyof typeof character.skills]}/100)</h4>
                                        <p className="text-xs text-slate-400">{skillDef.description}</p>
                                    </div>
                                    <Button size="sm" variant="outline" className="border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white" onClick={() => onCareerAction('improve_skill', { skillId: skillDef.id })}
                                     disabled={character.prisonSentence > 0 && skillDef.id !== 'smarts' && skillDef.id !== 'strength'} // Example: only allow smarts/strength training in prison
                                    >
                                        Train ({/* Add cost or time indicator here */})
                                    </Button>
                                </div>
                                <Progress value={character.skills[skillDef.id as keyof typeof character.skills]} className="h-2 mt-1 bg-slate-700 [&>div]:bg-sky-500" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {activeTab === 'organization' && !character.prisonSentence && (
                 <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                        <CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5 text-teal-400"/>Criminal Organizations</CardTitle>
                        {character.currentOrganization && <CardDescription className="text-slate-400">You are a {character.currentOrganization.role} in {character.currentOrganization.name}.</CardDescription>}
                        {!character.currentOrganization && <CardDescription className="text-slate-400">Join or start an organization to expand your criminal enterprise.</CardDescription>}
                    </CardHeader>
                    <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
                        {character.currentOrganization ? (
                            <>
                                <div className="p-3 border border-slate-700 rounded-lg">
                                    <h4 className="font-semibold text-teal-300">Your Organization: {character.currentOrganization.name}</h4>
                                    <p className="text-sm text-slate-300">Type: {character.currentOrganization.type}</p>
                                    <p className="text-sm text-slate-300">Your Role: {character.currentOrganization.role}</p>
                                    <p className="text-sm text-slate-300">Reputation: {character.currentOrganization.reputation}/100</p>
                                    {typeof character.currentOrganization.loyalty === 'number' && <p className="text-sm text-slate-300">Your Loyalty: {character.currentOrganization.loyalty}/100</p>}
                                    {/* List benefits/duties */}
                                </div>
                                <h4 className="font-semibold text-teal-300 pt-2">Organization Actions:</h4>
                                {ORGANIZATION_INTERACTIONS.map(action => renderActionCard(action, 'organization_action', 'organization'))}
                            </>
                        ) : (
                            ORGANIZATION_TYPES.map(orgType => (
                                <div key={orgType.id} className="border border-slate-700 rounded-lg p-3 hover:bg-slate-700/50 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h3 className="font-medium text-slate-200 flex items-center">{orgType.icon && React.cloneElement(orgType.icon, {className: "mr-2 h-5 w-5"})} {orgType.name}</h3>
                                            <p className="text-xs text-slate-400 mb-1">{orgType.description}</p>
                                            <p className="text-xs text-slate-500">Join Req: Notoriety {orgType.joinNotorietyReq}+ {orgType.skillReq && `(${Object.keys(orgType.skillReq)[0]} ${Object.values(orgType.skillReq)[0]}+)`}</p>
                                            <p className="text-xs text-slate-500">Start Req: Notoriety {orgType.startNotorietyReq}+</p>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <Button size="sm" variant="outline" className="border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white" onClick={() => onCareerAction('join_organization', { orgTypeId: orgType.id })}
                                             disabled={character.notoriety < orgType.joinNotorietyReq || (orgType.skillReq && character.skills[Object.keys(orgType.skillReq)[0] as keyof typeof character.skills] < Object.values(orgType.skillReq)[0])}
                                            >Join</Button>
                                            <Button size="sm" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white" onClick={() => onCareerAction('start_organization', { orgTypeId: orgType.id })}
                                            disabled={character.notoriety < orgType.startNotorietyReq}
                                            >Start New</Button>
                                        </div>
                                    </div>
                                     <div className="mt-2 text-xs">
                                        <p className="text-slate-400">Benefits: <span className="text-slate-500">{orgType.memberBenefits.join(', ')}</span></p>
                                        <p className="text-slate-400">Duties: <span className="text-slate-500">{orgType.memberDuties.join(', ')}</span></p>
                                    </div>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            )}

            {activeTab === 'fugitive' && character.prisonSentence <= 0 && (
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader><CardTitle className="flex items-center"><Run className="mr-2 h-5 w-5 text-orange-400"/>Fugitive Options</CardTitle></CardHeader>
                    <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                        {FUGITIVE_OPTIONS.map(opt => renderActionCard(opt, 'fugitive_action', 'fugitive'))}
                    </CardContent>
                </Card>
            )}

            {activeTab === 'prison' && character.prisonSentence > 0 && (
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                        <CardTitle className="flex items-center"><Gavel className="mr-2 h-5 w-5 text-amber-400"/>Prison Life</CardTitle>
                        <CardDescription className="text-slate-400">Serving {character.prisonSentence} more years. Time served: {character.timeInPrison} years.</CardDescription>
                        {character.isInPrisonGang && <CardDescription className="text-slate-400">Affiliated with prison gang: {character.prisonGangRole || 'Member'}</CardDescription>}
                    </CardHeader>
                    <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                        {PRISON_ACTIONS.map(action => {
                            if (action.id === 'join_prison_gang' && character.isInPrisonGang) return null; // Don't show join if already in
                            return renderActionCard(action, 'prison_action', 'prison');
                        })}
                    </CardContent>
                </Card>
            )}
            {activeTab === 'prison_gang' && character.prisonSentence > 0 && character.isInPrisonGang && (
                 <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                        <CardTitle className="flex items-center"><GitFork className="mr-2 h-5 w-5 text-purple-400"/>Prison Gang Activities</CardTitle>
                        <CardDescription className="text-slate-400">Your role: {character.prisonGangRole || 'Member'}. Maintain your standing or try to rise.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                        {PRISON_GANG_ACTIONS.map(action => renderActionCard(action, 'prison_gang_action', 'prison_gang'))}
                    </CardContent>
                </Card>
            )}

        </div>
    );
};