import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ANTIGRAVITY_PATIENTS } from '../data/antigravityData';
import { CLINIC_KPIS } from '../data/syntheticPatients';
import { Patient } from '../types/patient';
import { DoctorProfile, AiAssessmentResult } from '../types/antigravity';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  SupabaseMedication,
  SupabaseMedicationLog,
  SupabaseSymptom,
  MedicationStatus,
} from '../types/supabase';
import {
  calculateAdherencePercentage,
  AdherenceMetrics,
  collectActiveSignals,
  SignalItem,
} from '../services/signals';
import { User, Session } from '@supabase/supabase-js';

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

  // Authentication & Supabase Doctor Profile
  isAuthenticated: boolean;
  doctor: DoctorProfile;
  supabaseUser: User | null;
  supabaseSession: Session | null;
  isSupabaseReady: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error?: string }>;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  loginDemo: () => void;
  logout: () => Promise<void>;

  // Navigation
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  dateFilter: DateFilter;
  setDateFilter: (filter: DateFilter) => void;

  // Supabase Real Database State for Authenticated User
  userMedications: SupabaseMedication[];
  medicationLogs: SupabaseMedicationLog[];
  userSymptoms: SupabaseSymptom[];
  adherenceMetrics: AdherenceMetrics;
  activeSignals: SignalItem[];
  isDataLoading: boolean;

  // Supabase Real Database Operations
  addUserMedication: (med: {
    name: string;
    dosage: string;
    frequency: string;
    start_date?: string;
    end_date?: string;
  }) => Promise<{ error?: string }>;
  updateUserMedication: (
    id: string,
    updates: Partial<SupabaseMedication>
  ) => Promise<{ error?: string }>;
  deleteUserMedication: (id: string) => Promise<{ error?: string }>;
  logDose: (
    medicationId: string,
    status: MedicationStatus,
    scheduledTime?: string,
    takenTime?: string
  ) => Promise<{ error?: string }>;
  addUserSymptom: (symptom: string, severity: number) => Promise<{ error?: string }>;
  refreshData: () => Promise<void>;

  // Clinical Cohort Patients Management
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
  name: 'Dr. Rajesh Sharma, MD',
  email: 'dr.rajesh.sharma@cadence-health.ai',
  avatarUrl:
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
  role: 'Chief Medical Officer & Attending Physician',
  hospital: 'Apollo Indraprastha Specialty Hospital',
  npi: '8829104812',
  department: 'Internal Medicine & Cardiovascular Care',
  specialty: 'Cardiology & Internal Medicine',
  clinicAffiliation: 'All India Institute of Medical Sciences (AIIMS) Affiliate Network',
};

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    patientId: 'pt-1042',
    patientName: 'Sunita Deshmukh',
    patientCode: 'CAD-1042',
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
    patientName: 'Vikram Malhotra',
    patientCode: 'CAD-2089',
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
    patientName: 'Kavita Sundaram',
    patientCode: 'CAD-5503',
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
    patientName: 'Devendra Patel',
    patientCode: 'CAD-4412',
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
  // Theme state: persist to localStorage
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('cadence_theme') || localStorage.getItem('antigravity_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('cadence_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  // Supabase Auth & Session State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [supabaseSession, setSupabaseSession] = useState<Session | null>(null);
  const [isSupabaseReady] = useState<boolean>(isSupabaseConfigured());
  const [doctor, setDoctor] = useState<DoctorProfile>(DEFAULT_DOCTOR);

  // Real Supabase User Data
  const [userMedications, setUserMedications] = useState<SupabaseMedication[]>([]);
  const [medicationLogs, setMedicationLogs] = useState<SupabaseMedicationLog[]>([]);
  const [userSymptoms, setUserSymptoms] = useState<SupabaseSymptom[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  // Local fallback storage for demo / unconfigured mode
  const [localMeds, setLocalMeds] = useState<SupabaseMedication[]>(() => {
    const saved = localStorage.getItem('candace_local_meds');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // pass
      }
    }
    return [
      {
        id: 'med-demo-1',
        user_id: 'demo-user',
        name: 'Lisinopril',
        dosage: '10 mg',
        frequency: 'Once daily (morning)',
        start_date: '2026-01-15',
        end_date: null,
        created_at: new Date().toISOString(),
      },
      {
        id: 'med-demo-2',
        user_id: 'demo-user',
        name: 'Metformin HCl',
        dosage: '500 mg',
        frequency: 'Twice daily with meals',
        start_date: '2026-02-01',
        end_date: null,
        created_at: new Date().toISOString(),
      },
    ];
  });

  const [localLogs, setLocalLogs] = useState<SupabaseMedicationLog[]>(() => {
    const saved = localStorage.getItem('candace_local_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // pass
      }
    }
    return [
      {
        id: 'log-demo-1',
        user_id: 'demo-user',
        medication_id: 'med-demo-1',
        scheduled_time: new Date(Date.now() - 86400000).toISOString(),
        taken_time: new Date(Date.now() - 86400000 + 1200000).toISOString(),
        status: 'taken',
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'log-demo-2',
        user_id: 'demo-user',
        medication_id: 'med-demo-1',
        scheduled_time: new Date().toISOString(),
        taken_time: new Date().toISOString(),
        status: 'taken',
        created_at: new Date().toISOString(),
      },
    ];
  });

  const [localSymptoms, setLocalSymptoms] = useState<SupabaseSymptom[]>(() => {
    const saved = localStorage.getItem('candace_local_symptoms');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // pass
      }
    }
    return [
      {
        id: 'symp-demo-1',
        user_id: 'demo-user',
        symptom: 'Mild dizziness after morning dose',
        severity: 3,
        recorded_at: new Date(Date.now() - 3600000).toISOString(),
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('candace_local_meds', JSON.stringify(localMeds));
  }, [localMeds]);

  useEffect(() => {
    localStorage.setItem('candace_local_logs', JSON.stringify(localLogs));
  }, [localLogs]);

  useEffect(() => {
    localStorage.setItem('candace_local_symptoms', JSON.stringify(localSymptoms));
  }, [localSymptoms]);

  // Real-time Adherence calculation:
  // adherence percentage = (number of doses taken / number of doses expected) * 100
  const activeLogs = isSupabaseReady && supabaseUser ? medicationLogs : localLogs;
  const adherenceMetrics = calculateAdherencePercentage(activeLogs);

  // Collect Multi-Signal Timeline
  const activeSignals = collectActiveSignals({
    logs: activeLogs,
    symptoms: isSupabaseReady && supabaseUser ? userSymptoms : localSymptoms,
  });

  // Fetch real data from Supabase for the authenticated user
  const fetchSupabaseData = useCallback(async (userId: string) => {
    if (!isSupabaseReady) return;
    setIsDataLoading(true);
    try {
      // 1. Fetch Medications
      const { data: medsData, error: medsError } = await supabase
        .from('medications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (medsError) throw medsError;
      setUserMedications(medsData || []);

      // 2. Fetch Medication Logs
      const { data: logsData, error: logsError } = await supabase
        .from('medication_logs')
        .select('*, medication:medications(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (logsError) throw logsError;
      setMedicationLogs(logsData || []);

      // 3. Fetch Symptoms
      const { data: symptomsData, error: symptomsError } = await supabase
        .from('symptoms')
        .select('*')
        .eq('user_id', userId)
        .order('recorded_at', { ascending: false });

      if (symptomsError) throw symptomsError;
      setUserSymptoms(symptomsData || []);
    } catch (err) {
      console.warn('Supabase data query failed or tables not created yet:', err);
    } finally {
      setIsDataLoading(false);
    }
  }, [isSupabaseReady]);

  // Supabase Auth Listener & Persistent Session
  useEffect(() => {
    if (!isSupabaseReady) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSupabaseSession(session);
        setSupabaseUser(session.user);
        setIsAuthenticated(true);
        const name =
          session.user.user_metadata?.full_name ||
          session.user.email?.split('@')[0] ||
          'Dr. Clinical User';
        setDoctor((prev) => ({
          ...prev,
          name,
          email: session.user.email || prev.email,
        }));
        fetchSupabaseData(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseSession(session);
      setSupabaseUser(session?.user || null);
      if (session) {
        setIsAuthenticated(true);
        const name =
          session.user.user_metadata?.full_name ||
          session.user.email?.split('@')[0] ||
          'Dr. Clinical User';
        setDoctor((prev) => ({
          ...prev,
          name,
          email: session.user.email || prev.email,
        }));
        fetchSupabaseData(session.user.id);
      } else {
        setIsAuthenticated(false);
        setUserMedications([]);
        setMedicationLogs([]);
        setUserSymptoms([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isSupabaseReady, fetchSupabaseData]);

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

    setTimeout(() => {
      setAssessmentModal((prev) =>
        prev
          ? {
              ...prev,
              stepText: 'Synthesizing Candace Decompensation Matrix & recommendations...',
              progress: 88,
            }
          : null
      );
    }, 1200);

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

  // Supabase Authentication Methods
  const signUp = async (
    email: string,
    password: string,
    fullName?: string
  ): Promise<{ error?: string }> => {
    if (!isSupabaseReady) {
      // Demo fallback
      setDoctor({
        ...DEFAULT_DOCTOR,
        name: fullName || 'Dr. Registered User',
        email,
      });
      setIsAuthenticated(true);
      return {};
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) return { error: error.message };

      if (data.session) {
        setSupabaseSession(data.session);
        setSupabaseUser(data.user);
        setIsAuthenticated(true);
        if (data.user) {
          fetchSupabaseData(data.user.id);
        }
      }
      return {};
    } catch (err: any) {
      return { error: err.message || 'Signup failed' };
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ error?: string }> => {
    if (!isSupabaseReady) {
      // Demo fallback
      setDoctor({
        ...DEFAULT_DOCTOR,
        email,
      });
      setIsAuthenticated(true);
      return {};
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error: error.message };

      if (data.session) {
        setSupabaseSession(data.session);
        setSupabaseUser(data.user);
        setIsAuthenticated(true);
        if (data.user) {
          fetchSupabaseData(data.user.id);
        }
      }
      return {};
    } catch (err: any) {
      return { error: err.message || 'Login failed' };
    }
  };

  const loginDemo = () => {
    setDoctor(DEFAULT_DOCTOR);
    setIsAuthenticated(true);
    setActiveView('patients');
  };

  const logout = async () => {
    if (isSupabaseReady && supabaseUser) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Error signing out of Supabase:', err);
      }
    }
    setSupabaseSession(null);
    setSupabaseUser(null);
    setIsAuthenticated(false);
    setUserMedications([]);
    setMedicationLogs([]);
    setUserSymptoms([]);
    setDetailsModalPatient(null);
    setAssessmentModal(null);
  };

  // Real Database Operations for Medications
  const addUserMedication = async (med: {
    name: string;
    dosage: string;
    frequency: string;
    start_date?: string;
    end_date?: string;
  }): Promise<{ error?: string }> => {
    if (isSupabaseReady && supabaseUser) {
      try {
        const { data, error } = await supabase
          .from('medications')
          .insert({
            user_id: supabaseUser.id,
            name: med.name.trim(),
            dosage: med.dosage.trim(),
            frequency: med.frequency.trim(),
            start_date: med.start_date || new Date().toISOString().split('T')[0],
            end_date: med.end_date || null,
          })
          .select()
          .single();

        if (error) throw error;
        if (data) {
          setUserMedications((prev) => [data, ...prev]);
        }
        return {};
      } catch (err: any) {
        return { error: err.message || 'Failed to add medication to Supabase' };
      }
    } else {
      // Local fallback
      const newMed: SupabaseMedication = {
        id: `med-${Date.now()}`,
        user_id: 'demo-user',
        name: med.name.trim(),
        dosage: med.dosage.trim(),
        frequency: med.frequency.trim(),
        start_date: med.start_date || new Date().toISOString().split('T')[0],
        end_date: med.end_date || null,
        created_at: new Date().toISOString(),
      };
      setLocalMeds((prev) => [newMed, ...prev]);
      return {};
    }
  };

  const updateUserMedication = async (
    id: string,
    updates: Partial<SupabaseMedication>
  ): Promise<{ error?: string }> => {
    if (isSupabaseReady && supabaseUser) {
      try {
        const { error } = await supabase
          .from('medications')
          .update(updates)
          .eq('id', id)
          .eq('user_id', supabaseUser.id);

        if (error) throw error;
        setUserMedications((prev) =>
          prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
        );
        return {};
      } catch (err: any) {
        return { error: err.message || 'Failed to update medication' };
      }
    } else {
      setLocalMeds((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
      );
      return {};
    }
  };

  const deleteUserMedication = async (id: string): Promise<{ error?: string }> => {
    if (isSupabaseReady && supabaseUser) {
      try {
        const { error } = await supabase
          .from('medications')
          .delete()
          .eq('id', id)
          .eq('user_id', supabaseUser.id);

        if (error) throw error;
        setUserMedications((prev) => prev.filter((m) => m.id !== id));
        setMedicationLogs((prev) => prev.filter((l) => l.medication_id !== id));
        return {};
      } catch (err: any) {
        return { error: err.message || 'Failed to delete medication' };
      }
    } else {
      setLocalMeds((prev) => prev.filter((m) => m.id !== id));
      setLocalLogs((prev) => prev.filter((l) => l.medication_id !== id));
      return {};
    }
  };

  // Real Database Operations for Medication Logs (Taken / Missed / Late / Skipped)
  const logDose = async (
    medicationId: string,
    status: MedicationStatus,
    scheduledTime?: string,
    takenTime?: string
  ): Promise<{ error?: string }> => {
    const scheduled = scheduledTime || new Date().toISOString();
    const taken =
      status === 'taken' || status === 'late'
        ? takenTime || new Date().toISOString()
        : null;

    if (isSupabaseReady && supabaseUser) {
      try {
        const { data, error } = await supabase
          .from('medication_logs')
          .insert({
            user_id: supabaseUser.id,
            medication_id: medicationId,
            scheduled_time: scheduled,
            taken_time: taken,
            status,
          })
          .select('*, medication:medications(*)')
          .single();

        if (error) throw error;
        if (data) {
          setMedicationLogs((prev) => [data, ...prev]);

          // Save calculated adherence score to adherence_scores table
          const updatedLogs = [data, ...medicationLogs];
          const newAdherence = calculateAdherencePercentage(updatedLogs);
          if (newAdherence.percentage !== null) {
            await supabase.from('adherence_scores').insert({
              user_id: supabaseUser.id,
              medication_id: medicationId,
              score: newAdherence.percentage,
              period: '30d',
            });
          }
        }
        return {};
      } catch (err: any) {
        return { error: err.message || 'Failed to log medication dose' };
      }
    } else {
      // Local fallback
      const newLog: SupabaseMedicationLog = {
        id: `log-${Date.now()}`,
        user_id: 'demo-user',
        medication_id: medicationId,
        scheduled_time: scheduled,
        taken_time: taken,
        status,
        created_at: new Date().toISOString(),
      };
      setLocalLogs((prev) => [newLog, ...prev]);
      return {};
    }
  };

  // Real Database Operations for Symptoms
  const addUserSymptom = async (
    symptom: string,
    severity: number
  ): Promise<{ error?: string }> => {
    if (isSupabaseReady && supabaseUser) {
      try {
        const { data, error } = await supabase
          .from('symptoms')
          .insert({
            user_id: supabaseUser.id,
            symptom: symptom.trim(),
            severity,
          })
          .select()
          .single();

        if (error) throw error;
        if (data) {
          setUserSymptoms((prev) => [data, ...prev]);
        }
        return {};
      } catch (err: any) {
        return { error: err.message || 'Failed to record symptom' };
      }
    } else {
      const newSymptom: SupabaseSymptom = {
        id: `symp-${Date.now()}`,
        user_id: 'demo-user',
        symptom: symptom.trim(),
        severity,
        recorded_at: new Date().toISOString(),
      };
      setLocalSymptoms((prev) => [newSymptom, ...prev]);
      return {};
    }
  };

  const refreshData = async () => {
    if (isSupabaseReady && supabaseUser) {
      await fetchSupabaseData(supabaseUser.id);
    }
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

  const effectiveMeds = isSupabaseReady && supabaseUser ? userMedications : localMeds;
  const effectiveSymptoms = isSupabaseReady && supabaseUser ? userSymptoms : localSymptoms;

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isAuthenticated,
        doctor,
        supabaseUser,
        supabaseSession,
        isSupabaseReady,
        signUp,
        login,
        loginDemo,
        logout,
        activeView,
        setActiveView,
        dateFilter,
        setDateFilter,
        userMedications: effectiveMeds,
        medicationLogs: activeLogs,
        userSymptoms: effectiveSymptoms,
        adherenceMetrics,
        activeSignals,
        isDataLoading,
        addUserMedication,
        updateUserMedication,
        deleteUserMedication,
        logDose,
        addUserSymptom,
        refreshData,
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
