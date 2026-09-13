export type RiskCategory = 'High Priority' | 'Moderate Concern' | 'Improving' | 'Stable / Low Concern';

export type ConfidenceLevel = 'High' | 'Moderate' | 'Low';

export type SignalSource = 'Pharmacy' | 'Symptoms' | 'Clinical Data' | 'Wearables' | 'EHR / History';

export type SignalStrength = 'Strong' | 'Moderate' | 'Weak';

export interface ContributingSignal {
  id: string;
  name: string;
  category: SignalSource;
  weightPercentage: number;
  description: string;
  strength: SignalStrength;
  detectedDate: string;
  valueDescription: string;
}

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  route: string;
  prescribingProvider: string;
  startDate: string;
  indication: string;
  history: {
    date: string;
    dosage: string;
    note: string;
  }[];
}

export interface RefillRecord {
  month: string;
  date: string;
  expectedIntervalDays: number;
  actualIntervalDays: number;
  delayDays: number;
  status: 'on-time' | 'delayed' | 'early';
  pharmacyName: string;
  notes?: string;
}

export interface SymptomRecord {
  date: string;
  severityScore: number; // 1 to 10
  symptomName: string;
  associatedRefillEvent?: string;
  patientNotes: string;
}

export interface ClinicalMeasurement {
  date: string;
  metric: string;
  value: number;
  unit: string;
  baselineMin: number;
  baselineMax: number;
  status: 'within-range' | 'above-baseline' | 'below-baseline';
  interpretation: string;
}

export interface WearableMetric {
  date: string;
  steps: number;
  sleepHours: number;
  restingHeartRate: number;
  activityDeviationPercent: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  displayDate: string;
  title: string;
  source: SignalSource;
  expectedValue: string;
  observedValue: string;
  interpretation: string;
  confidence: ConfidenceLevel;
  iconType: 'prescription' | 'refill' | 'symptom' | 'clinical' | 'wearable' | 'pattern' | 'alert';
  isIrregularity?: boolean;
}

export interface BaselineComparison {
  metricName: string;
  category: SignalSource;
  normalBaseline: string;
  currentObserved: string;
  status: 'normal' | 'concerning' | 'borderline';
  deltaDirection: 'up' | 'down' | 'divergent' | 'stable';
  deltaText: string;
  explanation: string;
}

export interface AlternativeExplanation {
  id: string;
  hypothesis: string;
  status: 'detected' | 'unlikely' | 'pending_verification';
  evidenceScore: number;
  detail: string;
  clinicalImpact: string;
  isPrimaryCandidate?: boolean;
}

export interface Patient {
  id: string;
  code: string;
  initials: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  condition: string;
  primaryMedication: Medication;
  riskScore: number;
  riskCategory: RiskCategory;
  riskTrend: 'increasing' | 'stable' | 'decreasing';
  confidence: ConfidenceLevel;
  lastReviewed: string;
  signalsCount: number;
  contributingSignals: ContributingSignal[];
  timeline: TimelineEvent[];
  baseline: BaselineComparison[];
  alternativeExplanations: AlternativeExplanation[];
  refillHistory: RefillRecord[];
  symptomHistory: SymptomRecord[];
  clinicalMeasurements: ClinicalMeasurement[];
  wearablesData: WearableMetric[];
  aiSummary: string;
  confidenceFactors: {
    increases: string[];
    reduces: string[];
  };
}
