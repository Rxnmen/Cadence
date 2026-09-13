import React, { createContext, useContext, useState, useEffect } from 'react';
import { ANTIGRAVITY_PATIENTS } from '../data/antigravityData';
import { CLINIC_KPIS } from '../data/syntheticPatients';
import { Patient } from '../types/patient';
import { DoctorProfile, AiAssessmentResult } from '../types/antigravity';

export type ActiveView = 
  | 'patients'
  | 'ai-assistants'
  | 'analytics'
  | 'settings'
  | 'dashboard' 
  | 'insights' 
  | 'alerts' 
  | 'assistant' 
  | 'data-sources' 
  | 'reports';

export type RiskFilterType = 'all' | 'high' | 'moderate' | 'low';
export type DateFilter = 'today' | '7d' | '30d' | 'custom';
export type ThemeMode = 'dark' | 'light';

export interface AlertItem {
  id: string;
  patientId: string;
  patientName: string;
  patientCode: string;
  medicationName: string;
  riskScore: number;
  severity: 'High' | 'Moderate' | 'Low';
  primarySignal: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'escalated' | 'resolved';
  alternativeHypothesis?: string;
}

export interface AssessmentModalState {
  patient: Patient;
  status: 'idle' | 'analyzing' | 'completed';
  stepText: string;
  progress: number;
  result?: AiAssessmentResult;
}

interface AppContextType {
  // Theme
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;

  // Authentication & Doctor Profile
  isAuthenticated: boolean;
  doctor: DoctorProfile;
  login: (name: string, email: string) => void;
  loginDemo: () => void;
  logout: () => void;

  // Navigation
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  dateFilter: DateFilter;
  setDateFilter: (filter: DateFilter) => void;

  // Patient Management
  patients: Patient[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  riskFilter: RiskFilterType;
  setRiskFilter: (filter: RiskFilterType) => void;
  filteredPatients: Patient[];

  // Modals
  detailsModalPatient: Patient | null;
  openPatientDetails: (patient: Patient) => void;
  closePatientDetails: () => void;
  
  assessmentModal: AssessmentModalState | null;
  runAiAssessment: (patient: Patient) => void;
  closeAssessmentModal: () => void;

  // Compatibility with Cadence deep views
  selectedPatient: Patient;
  setSelectedPatientId: (id: string) => void;
  investigatingPatient: Patient | null;
  openDetective: (patientId?: string) => void;
  closeDetective: () => void;
  alerts: AlertItem[];
  triageAlert: (alertId: string, newStatus: AlertItem['status']) => void;
  kpis: typeof CLINIC_KPIS;
}

const DEFAULT_DOCTOR: DoctorProfile = {
  name: 'Dr. Sarah Jenkins',
  email: 'sarah.jenkins@antigravity-health.ai',
  avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256',
  role: 'Attending Physician & Clinical Director',
  hospital: 'Metropolitan Academic Health System',
  npi: '1849204812',
  department: 'Internal Medicine & Cardiopulmonary Care',
};

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    patientId: 'pt-1042',
    patientName: 'Elena Rostova',
    patientCode: 'AG-1042',
    medicationName: 'Lisinopril (10 mg daily)',
    riskScore: 72,
    severity: 'Moderate',
    primarySignal: 'Consecutive 8-day & 12-day refill delays + mild exertional dyspnea',
    timestamp: '2 hours ago',
    status: 'pending',
    alternativeHypothesis: 'Dosage modification trial (20mg → 10mg) on April 20',
  },
  {
    id: 'alt-2',
    patientId: 'pt-2089',
    patientName: 'Marcus Vance',
    patientCode: 'AG-2089',
    medicationName: 'Empagliflozin (25 mg daily)',
    riskScore: 84,
    severity: 'High',
    primarySignal: '16-day refill delay + continuous glucose telemetry excursion to 212 mg/dL',
    timestamp: '4 hours ago',
    status: 'pending',
    alternativeHypothesis: 'Insurance prior authorization hold at pharmacy portal',
  },
  {
    id: 'alt-3',
    patientId: 'pt-5503',
    patientName: 'Amara Okafor',
    patientCode: 'AG-5503',
    medicationName: 'Advair Diskus (250/50 mcg)',
    riskScore: 78,
    severity: 'High',
    primarySignal: '11-day controller gap + 4x daily rescue inhaler over-reliance',
    timestamp: 'Yesterday',
    status: 'pending',
    alternativeHypothesis: 'Seasonal regional peak pollen exacerbation',
  },
  {
    id: 'alt-4',
    patientId: 'pt-4412',
    patientName: 'David K. Patel',
    patientCode: 'AG-4412',
    medicationName: 'Spironolactone (25 mg daily)',
    riskScore: 88,
    severity: 'High',
    primarySignal: 'Telemonitoring BP 162/102 mmHg + serum potassium excursion (5.4 mEq/L)',
    timestamp: 'Today',
    status: 'pending',
    alternativeHypothesis: 'Dietary sodium loading vs renal hemodynamics',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: default to 'dark' for futuristic anti-gravity look, persist to localStorage
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('antigravity_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  });

  // Apply theme class to document root element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('antigravity_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  // Requirement: The app MUST open directly on the Login Page by default!
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [doctor, setDoctor] = useState<DoctorProfile>(DEFAULT_DOCTOR);

  // Primary navigation tab
  const [activeView, setActiveView] = useState<ActiveView>('patients');
  const [dateFilter, setDateFilter] = useState<DateFilter>('7d');

  // Patients data
  const [patients] = useState<Patient[]>(ANTIGRAVITY_PATIENTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [riskFilter, setRiskFilter] = useState<RiskFilterType>('all');

  // Modals state
  const [detailsModalPatient, setDetailsModalPatient] = useState<Patient | null>(null);
  const [assessmentModal, setAssessmentModal] = useState<AssessmentModalState | null>(null);

  // Compatibility state
  const [selectedPatientId, setSelectedPatientIdState] = useState<string>('pt-1042');
  const [investigatingPatientId, setInvestigatingPatientId] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];
  const investigatingPatient = investigatingPatientId
    ? patients.find((p) => p.id === investigatingPatientId) || null
    : null;

  // Filtered patients calculation
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (patient.patientId && patient.patientId.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (riskFilter === 'all') return true;
    if (riskFilter === 'high') return patient.riskLevel === 'High' || patient.riskCategory === 'High Priority';
    if (riskFilter === 'moderate') return patient.riskLevel === 'Moderate' || patient.riskCategory === 'Moderate Concern';
    if (riskFilter === 'low') return patient.riskLevel === 'Low' || patient.riskCategory === 'Stable / Low Concern' || patient.riskCategory === 'Improving';
    return true;
  });

  const openPatientDetails = (patient: Patient) => {
    setDetailsModalPatient(patient);
  };

  const closePatientDetails = () => {
    setDetailsModalPatient(null);
  };

  const runAiAssessment = (patient: Patient) => {
    setAssessmentModal({
      patient,
      status: 'analyzing',
      stepText: 'Ingesting real-time clinical telemetry & vital signals...',
      progress: 20,
    });

    // Step 2
    setTimeout(() => {
      setAssessmentModal((prev) =>
        prev
          ? {
              ...prev,
              stepText: 'Correlating longitudinal multi-signal baseline & EHR modifications...',
              progress: 55,
            }
          : null
      );
    }, 600);

    // Step 3
    setTimeout(() => {
      setAssessmentModal((prev) =>
        prev
          ? {
              ...prev,
              stepText: 'Synthesizing Anti-Gravity Decompensation Matrix & recommendations...',
              progress: 88,
            }
          : null
      );
    }, 1200);

    // Step 4 (Done)
    setTimeout(() => {
      const riskCategory: 'High' | 'Moderate' | 'Low' =
        patient.riskScore >= 75 ? 'High' : patient.riskScore >= 50 ? 'Moderate' : 'Low';

      const result: AiAssessmentResult = {
        patientId: patient.code,
        patientName: patient.name,
        timestamp: 'Just now (Live Real-time AI Analysis)',
        riskScore: patient.riskScore,
        riskCategory,
        confidencePercentage: patient.riskScore > 80 ? 98.4 : 94.2,
        keyDrivers: [
          { signal: 'Vitals Deviation from 6mo Baseline', impact: '+14% Excursion', percentage: 35 },
          { signal: 'Prescription Refill Consistency', impact: 'Sub-therapeutic interval gap', percentage: 30 },
          { signal: 'Wearable Physiological Activity', impact: 'Ambulatory decline detected', percentage: 20 },
          { signal: 'Alternative Confounder Filter', impact: 'Titration record verified', percentage: 15 },
        ],
        vitalTrajectory: {
          bpTrend: patient.vitalSigns?.bp || '142/90 mmHg',
          hrTrend: `${patient.vitalSigns?.heartRate || 84} bpm (Normal Sinus)`,
          spo2Trend: `${patient.vitalSigns?.spo2 || 96}% ambient`,
        },
        recommendedActions: [
          'Schedule supportive care coordination consultation within 48–72 hours',
          'Review electronic pharmacy claims portal to verify dispense and co-pay barrier status',
          'Verify home tele-monitoring cuff calibration against clinical in-office mercury standard',
          'Evaluate whether April dosage titration requires supportive patient counseling',
        ],
        rationale:
          patient.aiDiagnosticNotes ||
          'Multimodal temporal signals show non-punitive divergence requiring clinical check-in.',
      };

      setAssessmentModal({
        patient,
        status: 'completed',
        stepText: 'Analysis Complete',
        progress: 100,
        result,
      });
    }, 1700);
  };

  const closeAssessmentModal = () => {
    setAssessmentModal(null);
  };

  const login = (name: string, email: string) => {
    setDoctor({
      ...DEFAULT_DOCTOR,
      name: name.trim() || DEFAULT_DOCTOR.name,
      email: email.trim() || DEFAULT_DOCTOR.email,
    });
    setIsAuthenticated(true);
    setActiveView('patients');
  };

  const loginDemo = () => {
    setDoctor(DEFAULT_DOCTOR);
    setIsAuthenticated(true);
    setActiveView('patients');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setDetailsModalPatient(null);
    setAssessmentModal(null);
  };

  const setSelectedPatientId = (id: string) => {
    setSelectedPatientIdState(id);
  };

  const openDetective = (patientId?: string) => {
    const targetId = patientId || selectedPatientId;
    setSelectedPatientIdState(targetId);
    setInvestigatingPatientId(targetId);
    setActiveView('insights');
  };

  const closeDetective = () => {
    setInvestigatingPatientId(null);
  };

  const triageAlert = (alertId: string, newStatus: AlertItem['status']) => {
    setAlerts((prev) =>
      prev.map((item) => (item.id === alertId ? { ...item, status: newStatus } : item))
    );
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isAuthenticated,
        doctor,
        login,
        loginDemo,
        logout,
        activeView,
        setActiveView,
        dateFilter,
        setDateFilter,
        patients,
        searchQuery,
        setSearchQuery,
        riskFilter,
        setRiskFilter,
        filteredPatients,
        detailsModalPatient,
        openPatientDetails,
        closePatientDetails,
        assessmentModal,
        runAiAssessment,
        closeAssessmentModal,
        selectedPatient,
        setSelectedPatientId,
        investigatingPatient,
        openDetective,
        closeDetective,
        alerts,
        triageAlert,
        kpis: CLINIC_KPIS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
