import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Skull, DollarSign, ShieldCheck, AlertTriangle, Users, Crown, Briefcase,
    Brain, Zap, Barbell, Eye, Handshake, Lock, Unlock, Scale, Hammer,
    Laptop, Building, UserSecret, Run, Hospital, University, ShieldAlert, ShieldOff,
    Gavel, LogOut, TrendingUp, TrendingDown, UserPlus, Anchor
} from 'lucide-react';

// Define a more detailed Character interface for this DLC's needs
// In a real app, this would likely come from a shared types definition
interface Character {
    id: string;
    name: string;
    age: number;
    health: number; // 0-100
    happiness: number; // 0-100
    smarts: number; // 0-100
    looks: number; // 0-100
    money: number;
    job: {
        id: string; // e.g., 'pickpocket', 'mafia_soldier'
        title: string; // e.g., "Pickpocket", "Mafia Soldier"
        type: 'criminal_career'; // To distinguish from legitimate jobs
        income: number; // per year or event
    } | null;
    skills: {
        stealth: number; // 0-100
        strength: number; // 0-100
        hacking: number; // 0-100
        charisma: number; // 0-100
    };
    criminalRecord: Array<{ crime: string; conviction: string; sentenceYears: number; timeServed: number; yearConvicted: number }>;
    notoriety: number; // 0-100, general criminal fame
    heat: number; // 0-100, police attention
    prisonSentence: number; // Years remaining
    timeInPrison: number; // Years served in current sentence
    currentOrganization: {
        id: string;
        name: string;
        type: string; // 'gang', 'mafia', 'cartel', 'hacker_group', 'fraud_ring'
        role: string; // 'Member', 'Enforcer', 'Leader', etc.
        reputation: number; // 0-100
    } | null;
    inventory: Array<{ id: string; name: string; type: 'weapon' | 'tool' | 'vehicle' | 'document' }>;
    isUndercover?: boolean; // For potential police informant storyline
}

interface CriminalDLCProps {
    character: Character;
    onCareerAction: (actionType: string, data?: any) => void; // Callback to game logic
    // Example: onCareerAction('attempt_crime', { crimeId: 'pickpocket' })
    // Example: onCareerAction('join_career', { careerId: 'street_thug_1' })
    // Example: onCareerAction('prison_action', { prisonActionId: 'attempt_escape' })
}

// --- DATA DEFINITIONS (Expanded for BitLife feel) ---

// SKILLS
const SKILL_DEFINITIONS = [
    { id: 'stealth', name: 'Stealth', icon: <UserSecret className="h-4 w-4 mr-2" />, description: "Sneaking, evasion, and subtlety." },
    { id: 'strength', name: 'Strength', icon: <Barbell className="h-4 w-4 mr-2" />, description: "Physical power and intimidation." },
    { id: 'hacking', name: 'Hacking', icon: <Laptop className="h-4 w-4 mr-2" />, description: "Digital intrusion and data manipulation." },
    { id: 'charisma', name: 'Charisma', icon: <Handshake className="h-4 w-4 mr-2" />, description: "Influence, negotiation, and deception." },
];

// PETTY CRIMES (Repeatable, lower-stakes)
const PETTY_CRIMES = [
    { id: 'pickpocket', name: 'Pickpocket', icon: <Eye className="h-4 w-4" />, description: 'Lift wallets from unsuspecting targets.', skillCheck: { skill: 'stealth', difficulty: 20 }, minReward: 50, maxReward: 200, heatGain: 1, notorietyGain: 1, arrestChance: 10, injuryChance: 5 },
    { id: 'shoplift', name: 'Shoplift', icon: <Zap className="h-4 w-4" />, description: 'Steal goods from a local store.', skillCheck: { skill: 'stealth', difficulty: 30 }, minReward: 100, maxReward: 500, heatGain: 2, notorietyGain: 2, arrestChance: 15, injuryChance: 2 },
    { id: 'burglary_residential', name: 'Burgle a House', icon: <Lock className="h-4 w-4" />, description: 'Break into a home for valuables.', skillCheck: { skill: 'stealth', difficulty: 40 }, minReward: 500, maxReward: 2000, heatGain: 5, notorietyGain: 3, arrestChance: 25, injuryChance: 10, toolRequired: 'lockpicks' },
    { id: 'mugging', name: 'Mug Someone', icon: <Skull className="h-4 w-4" />, description: 'Rob someone on the street.', skillCheck: { skill: 'strength', difficulty: 30 }, minReward: 200, maxReward: 800, heatGain: 3, notorietyGain: 2, arrestChance: 20, injuryChance: 15, weaponRecommended: 'melee' },
    { id: 'vandalism', name: 'Vandalism', icon: <Hammer className="h-4 w-4" />, description: 'Deface public or private property.', skillCheck: null, minReward: 0, maxReward: 50, heatGain: 1, notorietyGain: 1, arrestChance: 5, injuryChance: 1 },
    { id: 'scam_call', name: 'Phishing Scam', icon: <Laptop className="h-4 w-4" />, description: 'Trick people into revealing sensitive info.', skillCheck: { skill: 'hacking', difficulty: 25 }, minReward: 100, maxReward: 1000, heatGain: 2, notorietyGain: 2, arrestChance: 10, injuryChance: 0 },
];

// MAJOR HEISTS (High-stakes, require more planning/resources - conceptual for now)
const MAJOR_HEISTS = [
    { id: 'bank_robbery', name: 'Bank Robbery', icon: <DollarSign className="h-4 w-4" />, description: 'Execute a classic bank heist.', skillCheck: [{ skill: 'stealth', difficulty: 70 }, { skill: 'strength', difficulty: 60 }, { skill: 'charisma', difficulty: 50 }], minReward: 50000, maxReward: 250000, heatGain: 20, notorietyGain: 15, arrestChance: 60, injuryChance: 30, crewRecommended: 3, planningRequired: true },
    { id: 'art_gallery_heist', name: 'Art Gallery Heist', icon: <University className="h-4 w-4" />, description: 'Steal priceless art under heavy security.', skillCheck: [{ skill: 'stealth', difficulty: 80 }, { skill: 'hacking', difficulty: 70 }], minReward: 100000, maxReward: 1000000, heatGain: 25, notorietyGain: 20, arrestChance: 50, injuryChance: 20, crewRecommended: 2, planningRequired: true },
    { id: 'casino_vault', name: 'Casino Vault Breach', icon: <Crown className="h-4 w-4" />, description: 'Crack a high-security casino vault.', skillCheck: [{ skill: 'hacking', difficulty: 85 }, { skill: 'stealth', difficulty: 75 }, { skill: 'charisma', difficulty: 60 }], minReward: 200000, maxReward: 2000000, heatGain: 30, notorietyGain: 25, arrestChance: 65, injuryChance: 25, crewRecommended: 4, planningRequired: true },
];

// CRIMINAL CAREERS (Hierarchical)
const CRIMINAL_CAREERS_DATA = {
    street_hustler: {
        name: 'Street Hustler Path', icon: <Users className="h-5 w-5" />,
        levels: [
            { id: 'street_thug_1', name: 'Petty Thief', description: 'Start with small-time theft.', income: 10000, risk: 'Low', req: { age: 16 }, unlocks: ['street_thug_2'], actions: [{id: 'extort_locals', name: 'Extort Locals'}] },
            { id: 'street_thug_2', name: 'Seasoned Burglar', description: 'Move on to breaking and entering.', income: 25000, risk: 'Medium', req: { age: 18, skills: { stealth: 30 }, notoriety: 10, previousJob: 'street_thug_1' }, unlocks: ['street_thug_3'], actions: [{id: 'target_affluent_home', name: 'Target Affluent Home'}] },
            { id: 'street_thug_3', name: 'Crew Leader', description: 'Organize small-scale heists.', income: 60000, risk: 'Medium', req: { age: 22, skills: { charisma: 40, strength: 30 }, notoriety: 30, previousJob: 'street_thug_2' }, unlocks: ['gang_member_1'], actions: [{id: 'recruit_thugs', name: 'Recruit Thugs'}, {id: 'plan_store_robbery', name: 'Plan Store Robbery'}] },
        ]
    },
    organized_crime: {
        name: 'Organized Crime Path (Mafia/Cartel)', icon: <Briefcase className="h-5 w-5" />,
        levels: [
            { id: 'mafia_associate_1', name: 'Mafia Associate', description: 'Become an earner for a family.', income: 50000, risk: 'High', req: { age: 21, skills: { charisma: 50, strength: 40 }, notoriety: 40 }, unlocks: ['mafia_associate_2'], actions: [{id: 'collect_protection_money', name: 'Collect Protection Money'}] },
            { id: 'mafia_associate_2', name: 'Made Member / Soldado', description: 'A sworn member of the organization.', income: 120000, risk: 'Very High', req: { age: 25, skills: { strength: 60, charisma: 60 }, notoriety: 60, previousJob: 'mafia_associate_1' }, unlocks: ['mafia_associate_3'], actions: [{id: 'enforce_territory', name: 'Enforce Territory'}, {id: 'eliminate_rival', name: 'Eliminate Rival'}]},
            { id: 'mafia_associate_3', name: 'Capo / Lieutenant', description: 'Lead a crew within the organization.', income: 300000, risk: 'Extreme', req: { age: 30, skills: { charisma: 80, strength: 70 }, notoriety: 80, previousJob: 'mafia_associate_2' }, unlocks: [], actions: [{id: 'manage_racket', name: 'Manage Racket'}, {id: 'order_hit', name: 'Order Hit'}] },
        ]
    },
    cyber_crime: {
        name: 'Cybercrime Syndicate', icon: <Laptop className="h-5 w-5" />,
        levels: [
            { id: 'cyber_crime_1', name: 'Script Kiddie', description: 'Basic hacking and online scams.', income: 30000, risk: 'Low', req: { age: 16, skills: { hacking: 30 } }, unlocks: ['cyber_crime_2'], actions: [{id: 'ddos_attack', name: 'DDoS Attack Small Site'}] },
            { id: 'cyber_crime_2', name: 'Black Hat Hacker', description: 'Breach systems for data or profit.', income: 90000, risk: 'Medium', req: { age: 20, skills: { hacking: 60 }, notoriety: 20, previousJob: 'cyber_crime_1' }, unlocks: ['cyber_crime_3'], actions: [{id: 'steal_credit_cards', name: 'Steal Credit Card Data'}] },
            { id: 'cyber_crime_3', name: 'Dark Web Kingpin', description: 'Run a major online criminal enterprise.', income: 400000, risk: 'High', req: { age: 28, skills: { hacking: 85, charisma: 50 }, notoriety: 70, previousJob: 'cyber_crime_2' }, unlocks: [], actions: [{id: 'run_dark_market', name: 'Run Dark Market'}, {id: 'launder_crypto', name: 'Launder Cryptocurrency'}] },
        ]
    },
    white_collar: {
        name: 'White-Collar Crime Ring', icon: <Building className="h-5 w-5" />,
        levels: [
            { id: 'white_collar_1', name: 'Inside Trader', description: 'Leverage confidential information.', income: 75000, risk: 'Medium', req: { age: 22, smarts: 70, skills: { charisma: 40 } }, unlocks: ['white_collar_2'], actions: [{id: 'get_insider_tip', name: 'Get Insider Tip'}] },
            { id: 'white_collar_2', name: 'Embezzler', description: 'Siphon funds from a company.', income: 200000, risk: 'High', req: { age: 28, smarts: 80, skills: { hacking: 50, charisma: 60 }, notoriety: 30, previousJob: 'white_collar_1' }, unlocks: ['white_collar_3'], actions: [{id: 'cook_the_books', name: 'Cook The Books'}] },
            { id: 'white_collar_3', name: 'Fraud Mastermind', description: 'Orchestrate large-scale financial fraud.', income: 750000, risk: 'Very High', req: { age: 35, smarts: 90, skills: { charisma: 80, hacking: 70 }, notoriety: 60, previousJob: 'white_collar_2' }, unlocks: [], actions: [{id: 'setup_shell_corp', name: 'Setup Shell Corporation'}, {id: 'evade_taxes_major', name: 'Evade Taxes (Major Scale)'}] },
        ]
    }
};

// CRIMINAL ORGANIZATIONS
const ORGANIZATION_TYPES = [
    { id: 'street_gang', name: 'Street Gang', icon: <Users className="h-4 w-4" />, description: 'Control turf, deal drugs, and engage in petty warfare.', joinNotorietyReq: 20, startNotorietyReq: 40 },
    { id: 'mafia_family', name: 'Mafia Family', icon: <Briefcase className="h-4 w-4" />, description: 'A traditional organized crime syndicate focused on rackets, extortion, and influence.', joinNotorietyReq: 50, startNotorietyReq: 80 },
    { id: 'hacker_collective', name: 'Hacker Collective', icon: <Laptop className="h-4 w-4" />, description: 'A decentralized group of cybercriminals targeting corporations and governments.', joinNotorietyReq: 40, skillReq: { hacking: 60 }, startNotorietyReq: 70 },
    { id: 'fraud_ring', name: 'Corporate Fraud Ring', icon: <Building className="h-4 w-4" />, description: 'Exploit financial systems for massive illicit gains.', joinNotorietyReq: 60, skillReq: { smarts: 70 }, startNotorietyReq: 85 },
];

// PRISON ACTIONS
const PRISON_ACTIONS = [
    { id: 'serve_time', name: 'Serve Time Quietly', description: 'Keep your head down and do your time.', effect: 'Reduces sentence, low risk.', icon: <LogOut className="h-4 w-4" /> },
    { id: 'prison_job', name: 'Work Prison Job', description: 'Earn a small amount of money.', effect: 'Small income, may improve parole chances.', icon: <Hammer className="h-4 w-4" /> },
    { id: 'start_riot', name: 'Start a Riot', description: 'Cause chaos in the prison.', effect: 'High risk, can reduce sentence or backfire badly.', icon: <Zap className="h-4 w-4" /> },
    { id: 'appeal_sentence', name: 'Appeal Sentence', description: 'Try to get your sentence reduced or overturned.', effect: 'Requires money for lawyer, chance of success based on smarts/evidence.', icon: <Scale className="h-4 w-4" /> },
    { id: 'attempt_escape', name: 'Attempt Escape', description: 'Make a break for freedom.', effect: 'Extremely high risk, severe consequences if caught.', icon: <Run className="h-4 w-4" /> },
    { id: 'bribe_guard', name: 'Bribe Guard', description: 'Pay off a guard for favors or contraband.', effect: 'Requires money, risk of exposure.', icon: <DollarSign className="h-4 w-4" /> },
];

// FUGITIVE OPTIONS
const FUGITIVE_OPTIONS = [
    { id: 'lay_low', name: 'Lay Low', description: 'Disappear for a while to reduce heat.', heatReduction: 20, cost: 1000, durationYears: 1, icon: <UserSecret className="h-4 w-4" /> },
    { id: 'change_identity', name: 'Change Identity', description: 'Get new papers and a new look.', heatReduction: 50, cost: 25000, requires: { notoriety: 60 }, icon: <ShieldOff className="h-4 w-4" /> },
    { id: 'flee_country', name: 'Flee the Country', description: 'Escape to a non-extradition country.', heatReduction: 70, cost: 50000, requires: { money: 50000 }, icon: <Anchor className="h-4 w-4" /> },
    { id: 'witness_protection', name: 'Enter Witness Protection', description: 'Testify against former associates for a new life. EXTREMELY RISKY.', heatReduction: 100, cost: 0, requires: { notoriety: 70, organizationMember: true }, icon: <ShieldAlert className="h-4 w-4" /> },
];


export const CriminalDLC: React.FC<CriminalDLCProps> = ({ character, onCareerAction }) => {
    const [activeTab, setActiveTab] = useState('status'); // status, petty_crimes, major_heists, careers, skills, organization, fugitive, prison

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
        return true;
    };
    
    const canAttemptCrime = (crime: typeof PETTY_CRIMES[0] | typeof MAJOR_HEISTS[0]) => {
        // Basic check, can be expanded (e.g., tool requirements, crew)
        if ((crime as any).toolRequired && !character.inventory.find(item => item.id === (crime as any).toolRequired && item.type === 'tool')) {
            return false; // Missing required tool
        }
        return character.health > 20 && character.prisonSentence <= 0; // Basic health and not in prison
    };

    const renderTabs = () => {
        const tabs = [
            { id: 'status', label: 'Status', icon: <Skull /> },
            { id: 'petty_crimes', label: 'Petty Crimes', icon: <Zap /> },
            { id: 'major_heists', label: 'Major Heists', icon: <DollarSign /> },
            { id: 'careers', label: 'Careers', icon: <Briefcase /> },
            { id: 'skills', label: 'Skills', icon: <Brain /> },
            { id: 'organization', label: 'Organizations', icon: <Users /> },
            { id: 'fugitive', label: 'Fugitive', icon: <Run /> }
        ];
        if (character.prisonSentence > 0) {
            tabs.push({ id: 'prison', label: 'Prison Life', icon: <Gavel /> });
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

    return (
        <div className="space-y-6 p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-lg shadow-xl">
            <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2 text-red-400">
                        <Skull className="h-7 w-7" /> Criminal Underworld
                    </CardTitle>
                    <CardDescription className="text-slate-400">Manage your life of crime. Every choice has consequences.</CardDescription>
                </CardHeader>
            </Card>

            {renderTabs()}

            {/* Status Tab */}
            {activeTab === 'status' && (
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader><CardTitle className="flex items-center"><Skull className="mr-2 h-5 w-5 text-red-500"/>Criminal Profile</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-slate-400">Notoriety</label>
                                <Progress value={character.notoriety} className="h-3 mt-1 bg-slate-700 [&>div]:bg-red-500" />
                                <span className="text-xs text-slate-500">{character.notoriety}/100 - Your reputation in the criminal world.</span>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-400">Heat Level</label>
                                <Progress value={character.heat} className="h-3 mt-1 bg-slate-700 [&>div]:bg-orange-500" />
                                <span className="text-xs text-slate-500">{character.heat}/100 - Police attention on you.</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-300"><strong>Current Role:</strong> {character.job?.title || 'Unemployed (in crime)'}</p>
                        {character.currentOrganization && (
                            <p className="text-sm text-slate-300">
                                <strong>Organization:</strong> {character.currentOrganization.name} ({character.currentOrganization.type}) - <strong>Role:</strong> {character.currentOrganization.role}
                            </p>
                        )}
                        {character.criminalRecord.length > 0 && (
                            <div className="mt-2 p-3 bg-red-900/30 border border-red-700 rounded-md">
                                <h4 className="font-semibold text-red-400">Criminal Record:</h4>
                                <ul className="list-disc list-inside text-xs text-slate-400 max-h-24 overflow-y-auto">
                                    {character.criminalRecord.map((rec, i) => <li key={i}>{rec.conviction} ({rec.sentenceYears} yrs) - Year {rec.yearConvicted}</li>)}
                                </ul>
                            </div>
                        )}
                         {character.prisonSentence > 0 && (
                             <Badge className="bg-red-600 text-white">Currently Incarcerated ({character.prisonSentence} years remaining)</Badge>
                         )}
                    </CardContent>
                </Card>
            )}

            {/* Petty Crimes Tab */}
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
                                        disabled={!canAttemptCrime(crime)}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        Attempt
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                                    <span>💰 ${crime.minReward}-${crime.maxReward}</span>
                                    <span>🔥 +{crime.heatGain} Heat</span>
                                    <span>⭐ +{crime.notorietyGain} Notoriety</span>
                                    <span>🚨 {crime.arrestChance}% Arrest</span>
                                    {crime.skillCheck && <span>🎯 Skill: {crime.skillCheck.skill} ({crime.skillCheck.difficulty})</span>}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
            
            {/* Major Heists Tab */}
            {activeTab === 'major_heists' && (
                 <Card className="bg-slate-800 border-slate-700">
                    <CardHeader><CardTitle className="flex items-center"><DollarSign className="mr-2 h-5 w-5 text-green-400"/>Major Heists</CardTitle></CardHeader>
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
                                        disabled={!canAttemptCrime(heist)}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        Attempt Heist
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                                    <span>💰 ${heist.minReward/1000}k-${heist.maxReward/1000}k</span>
                                    <span>🔥 +{heist.heatGain} Heat</span>
                                    <span>⭐ +{heist.notorietyGain} Notoriety</span>
                                    <span>🚨 {heist.arrestChance}% Arrest</span>
                                    {heist.crewRecommended && <span>👥 {heist.crewRecommended}+ Crew</span>}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Criminal Careers Tab */}
            {activeTab === 'careers' && (
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
                                                        {level.req.skills && Object.entries(level.req.skills).map(([s,v]) => ` ${s.charAt(0).toUpperCase() + s.slice(1)}: ${v}+.`)}
                                                        {level.req.previousJob && ` Requires: ${CRIMINAL_CAREERS_DATA[pathId]?.levels.find(l=>l.id === level.req.previousJob)?.name || level.req.previousJob}.`}
                                                    </div>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    onClick={() => onCareerAction('join_career', { careerId: level.id })}
                                                    disabled={!eligible || isCurrentJob}
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
                                                        <Button key={action.id} variant="link" size="sm" className="text-purple-400 hover:text-purple-200 p-0 h-auto text-xs" onClick={() => onCareerAction('career_action', { actionId: action.id, careerId: level.id })}>
                                                            {action.name}
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
            
            {/* Skills Tab */}
            {activeTab === 'skills' && (
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader><CardTitle className="flex items-center"><Brain className="mr-2 h-5 w-5 text-sky-400"/>Develop Skills</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {SKILL_DEFINITIONS.map(skillDef => (
                            <div key={skillDef.id} className="border border-slate-700 p-3 rounded-lg">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-medium text-slate-200 flex items-center">{skillDef.icon} {skillDef.name} ({character.skills[skillDef.id as keyof typeof character.skills]}/100)</h4>
                                    <Button size="sm" variant="outline" className="border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white" onClick={() => onCareerAction('improve_skill', { skillId: skillDef.id })}>
                                        Train <TrendingUp className="ml-1 h-3 w-3"/>
                                    </Button>
                                </div>
                                <Progress value={character.skills[skillDef.id as keyof typeof character.skills]} className="h-2 bg-slate-700 [&>div]:bg-sky-500" />
                                <p className="text-xs text-slate-400 mt-1">{skillDef.description}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Organization Tab */}
            {activeTab === 'organization' && (
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader><CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5 text-teal-400"/>Criminal Organizations</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {character.currentOrganization ? (
                            <div>
                                <h3 className="text-lg font-semibold text-teal-300">My Organization: {character.currentOrganization.name}</h3>
                                <p className="text-sm text-slate-400">Type: {character.currentOrganization.type}, Role: {character.currentOrganization.role}</p>
                                <p className="text-sm text-slate-400">Reputation: {character.currentOrganization.reputation}/100</p>
                                <div className="mt-3 space-y-2">
                                    <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => onCareerAction('organization_action', { orgAction: 'contribute' })}>Contribute to Org</Button>
                                    <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => onCareerAction('organization_action', { orgAction: 'request_backup' })}>Request Backup</Button>
                                    <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => onCareerAction('leave_organization')}>Leave Organization (Risky)</Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h4 className="font-medium text-slate-300 mb-2">Join an Organization:</h4>
                                {ORGANIZATION_TYPES.map(orgType => (
                                    <div key={orgType.id} className="border border-slate-700 p-3 rounded-lg hover:bg-slate-700/50">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h5 className="font-semibold text-teal-300 flex items-center">{orgType.icon} {orgType.name}</h5>
                                                <p className="text-xs text-slate-400">{orgType.description}</p>
                                                <p className="text-xs text-slate-500">Req: {orgType.joinNotorietyReq} Notoriety. {orgType.skillReq && `${Object.keys(orgType.skillReq)[0]}: ${Object.values(orgType.skillReq)[0]}`}</p>
                                            </div>
                                            <Button size="sm" className="bg-teal-500 hover:bg-teal-600" onClick={() => onCareerAction('join_organization', { orgTypeId: orgType.id })}
                                                disabled={character.notoriety < orgType.joinNotorietyReq || (orgType.skillReq && character.skills[Object.keys(orgType.skillReq)[0] as keyof typeof character.skills] < Object.values(orgType.skillReq)[0])}
                                            >
                                                Attempt to Join
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <h4 className="font-medium text-slate-300 mt-4 mb-2">Or Start Your Own:</h4>
                                {ORGANIZATION_TYPES.map(orgType => (
                                     <Button key={`start_${orgType.id}`} className="w-full mb-2 bg-blue-600 hover:bg-blue-700"
                                        onClick={() => onCareerAction('start_organization', { orgTypeId: orgType.id })}
                                        disabled={character.notoriety < orgType.startNotorietyReq || (orgType.skillReq && character.skills[Object.keys(orgType.skillReq)[0] as keyof typeof character.skills] < Object.values(orgType.skillReq)[0])}
                                    >
                                        <UserPlus className="mr-2 h-4 w-4"/> Start {orgType.name} (Req: {orgType.startNotorietyReq} Notoriety)
                                    </Button>
                                ))}
                            </>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Fugitive Options Tab */}
            {activeTab === 'fugitive' && (
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader><CardTitle className="flex items-center"><Run className="mr-2 h-5 w-5 text-yellow-300"/>Fugitive Options</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        {character.heat < 30 && <p className="text-sm text-slate-400">Your heat is low. No need for drastic measures... yet.</p>}
                        {FUGITIVE_OPTIONS.map(option => {
                            const meetsReqs = 
                                (!option.requires?.notoriety || character.notoriety >= option.requires.notoriety) &&
                                (!option.requires?.money || character.money >= option.requires.money) &&
                                (!option.requires?.organizationMember || !!character.currentOrganization);
                            const disabled = character.heat < 30 || !meetsReqs; // Example condition, can be more nuanced

                            return (
                            <div key={option.id} className={`border border-slate-700 p-3 rounded-lg ${disabled ? 'opacity-60' : 'hover:bg-slate-700/50'}`}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h5 className="font-semibold text-yellow-200 flex items-center">{option.icon} {option.name}</h5>
                                        <p className="text-xs text-slate-400">{option.description}</p>
                                        <p className="text-xs text-slate-500">
                                            Cost: ${option.cost.toLocaleString()}. Heat Reduction: ~{option.heatReduction}.
                                            {option.requires?.notoriety && ` Req Notoriety: ${option.requires.notoriety}.`}
                                            {option.requires?.money && ` Req Money: $${option.requires.money.toLocaleString()}.`}
                                        </p>
                                    </div>
                                    <Button size="sm" variant="warning" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900"
                                        onClick={() => onCareerAction('fugitive_action', { actionId: option.id })}
                                        disabled={disabled}
                                    >
                                        Attempt
                                    </Button>
                                </div>
                            </div>
                        )})}
                    </CardContent>
                </Card>
            )}

            {/* Prison Life Tab */}
            {activeTab === 'prison' && character.prisonSentence > 0 && (
                <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                        <CardTitle className="flex items-center"><Gavel className="mr-2 h-5 w-5 text-orange-400"/>Prison Life</CardTitle>
                        <CardDescription className="text-slate-400">Sentence: {character.prisonSentence} years remaining. Time Served: {character.timeInPrison} years.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {PRISON_ACTIONS.map(action => (
                            <div key={action.id} className="border border-slate-700 p-3 rounded-lg hover:bg-slate-700/50">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h5 className="font-semibold text-orange-300 flex items-center">{action.icon} {action.name}</h5>
                                        <p className="text-xs text-slate-400">{action.description}</p>
                                        <p className="text-xs text-slate-500 italic">{action.effect}</p>
                                    </div>
                                    <Button size="sm" variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white" onClick={() => onCareerAction('prison_action', { prisonActionId: action.id })}>
                                        Do It
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

// Example of how you might define App and use CriminalDLC (for testing/standalone)
// In a real app, Character data would come from your game's state management.
const App = () => {
    const [character, setCharacter] = useState<Character>({
        id: 'player1',
        name: 'John Doe',
        age: 25,
        health: 90,
        happiness: 60,
        smarts: 70,
        looks: 55,
        money: 5000,
        job: null,
        skills: { stealth: 20, strength: 30, hacking: 10, charisma: 25 },
        criminalRecord: [{ crime: 'Petty Theft', conviction: 'Shoplifting', sentenceYears: 1, timeServed: 1, yearConvicted: 22 }],
        notoriety: 5,
        heat: 2,
        prisonSentence: 0,
        timeInPrison: 0,
        currentOrganization: null,
        inventory: [{id: 'lockpicks', name: 'Lockpicks', type: 'tool'}]
    });

    const handleCareerAction = (actionType: string, data?: any) => {
        console.log("Action:", actionType, "Data:", data);
        // This is where you'd update the character state based on the action
        // For example, if actionType is 'attempt_crime' and it's successful:
        // setCharacter(prev => ({ ...prev, money: prev.money + reward, notoriety: prev.notoriety + notorietyGain, heat: prev.heat + heatGain }));
        // If arrested:
        // setCharacter(prev => ({ ...prev, prisonSentence: 5, criminalRecord: [...prev.criminalRecord, newConviction] }));

        // Mock updates for demonstration:
        if (actionType === 'improve_skill' && data.skillId) {
            setCharacter(prev => ({
                ...prev,
                skills: {
                    ...prev.skills,
                    [data.skillId]: Math.min(100, prev.skills[data.skillId as keyof typeof prev.skills] + 5)
                }
            }));
        }
        if (actionType === 'join_career' && data.careerId) {
             const path = Object.values(CRIMINAL_CAREERS_DATA).find(p => p.levels.find(l => l.id === data.careerId));
             const level = path?.levels.find(l => l.id === data.careerId);
             if (level) {
                setCharacter(prev => ({
                    ...prev,
                    job: { id: level.id, title: level.name, type: 'criminal_career', income: level.income }
                }));
             }
        }
        if (actionType === 'attempt_crime' && data.crimeId === 'pickpocket') {
            const success = Math.random() > 0.3; // 70% success
            if (success) {
                const earnings = 50 + Math.floor(Math.random() * 150);
                setCharacter(prev => ({
                    ...prev,
                    money: prev.money + earnings,
                    notoriety: Math.min(100, prev.notoriety + 1),
                    heat: Math.min(100, prev.heat + 1),
                }));
                alert(`Pickpocket successful! You got $${earnings}.`);
            } else {
                 const arrested = Math.random() > 0.8; // 20% arrest on fail
                 if (arrested) {
                    setCharacter(prev => ({
                        ...prev,
                        prisonSentence: 1,
                        heat: Math.min(100, prev.heat + 5),
                        criminalRecord: [...prev.criminalRecord, {crime: 'Pickpocketing', conviction: 'Attempted Theft', sentenceYears: 1, timeServed: 0, yearConvicted: prev.age}]
                    }));
                    alert('Pickpocket failed! You got arrested! Sentenced to 1 year.');
                 } else {
                    alert('Pickpocket failed! You got away.');
                 }
            }
        }
         if (actionType === 'prison_action' && data.prisonActionId === 'serve_time') {
            if (character.prisonSentence > 0) {
                setCharacter(prev => ({
                    ...prev,
                    prisonSentence: Math.max(0, prev.prisonSentence -1),
                    timeInPrison: prev.timeInPrison + 1,
                    age: prev.age +1 // Age up while serving time
                }));
                alert('One year served.');
            }
        }

    };
    
    // Simulate aging and other time-based effects (very basic)
    useEffect(() => {
        const timer = setInterval(() => {
            setCharacter(prev => ({
                ...prev,
                age: prev.age + 0.1, // Represents passage of time, adjust for game speed
                // heat: Math.max(0, prev.heat - 0.1) // Heat slowly decays
            }));
        }, 5000); // Every 5 seconds
        return () => clearInterval(timer);
    }, []);


    return (
        <div className="container mx-auto p-4 bg-slate-900 min-h-screen">
            <CriminalDLC character={{...character, age: Math.floor(character.age)}} onCareerAction={handleCareerAction} />
        </div>
    );
};

export default App; // Assuming this is the main export for a standalone page/test
// For integration, you'd export CriminalDLC:
// export default CriminalDLC;

