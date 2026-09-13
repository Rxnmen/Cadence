export interface DoctorProfile {
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
  hospital: string;
  npi: string;
  department: string;
  specialty?: string;
  clinicAffiliation?: string;
}

export interface ImagingScan {
  id: string;
  title: string;
  type: 'xray' | 'mri' | 'ct' | 'echo';
  patientId: string;
  patientName: string;
  date: string;
  bodyPart: string;
  imageUrl?: string;
  description: string;
  defaultFindings: {
    diagnosis: string;
    confidence: number;
    observations: string[];
    recommendations: string[];
    severity: 'Normal / Clear' | 'Mild' | 'Moderate' | 'Critical';
    boundingZones?: { label: string; x: number; y: number; width: number; height: number }[];
  };
}

export interface DrugInfo {
  id: string;
  name: string;
  generic: string;
  category: string;
  commonDose: string;
  indication: string;
}

export interface DrugInteractionAlert {
  drugs: string[];
  severity: 'Major' | 'Moderate' | 'Minor' | 'Safe / No Interaction';
  mechanism: string;
  clinicalRisk: string;
  management: string;
}

export interface AiAssessmentResult {
  patientId: string;
  patientName: string;
  timestamp: string;
  riskScore: number;
  riskCategory: 'High' | 'Moderate' | 'Low';
  confidencePercentage: number;
  keyDrivers: { signal: string; impact: string; percentage: number }[];
  vitalTrajectory: {
    bpTrend: string;
    hrTrend: string;
    spo2Trend: string;
  };
  recommendedActions: string[];
  rationale: string;
}
