
export interface LegalStatus {
  currentCases: LegalCase[];
  prisonTime: number;
  totalArrestsCount: number;
  lawyerName?: string;
  onProbation: boolean;
  probationMonths: number;
  courtDates: CourtDate[];
}

export interface LegalCase {
  id: string;
  type: 'criminal' | 'civil' | 'traffic';
  charge: string;
  severity: 'misdemeanor' | 'felony' | 'infraction';
  status: 'pending' | 'trial' | 'settled' | 'dismissed';
  fineAmount?: number;
  prisonSentence?: number;
  dateCreated: string;
}

export interface CourtDate {
  id: string;
  caseId: string;
  date: string;
  type: 'hearing' | 'trial' | 'sentencing';
  result?: 'guilty' | 'not_guilty' | 'mistrial' | 'plea_deal';
}
