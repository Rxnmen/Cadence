import React, { createContext, useContext, useState } from 'react';
import { SYNTHETIC_PATIENTS, CLINIC_KPIS } from '../data/syntheticPatients';
import { Patient } from '../types/patient';

export type ActiveView = 
  | 'dashboard' 
  | 'patients' 
  | 'insights' 
  | 'alerts' 
  | 'analytics' 
  | 'assistant' 
  | 'data-sources' 
  | 'reports' 
  | 'settings';

export type DateFilter = 'today' | '7d' | '30d' | 'custom';

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

interface AppContextType {
  isAuthenticated: boolean;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  dateFilter: DateFilter;
  setDateFilter: (filter: DateFilter) => void;
  patients: Patient[];
  selectedPatient: Patient;
  setSelectedPatientId: (id: string) => void;
  investigatingPatient: Patient | null;
  openDetective: (patientId?: string) => void;
  closeDetective: () => void;
  alerts: AlertItem[];
  triageAlert: (alertId: string, newStatus: AlertItem['status']) => void;
  loginDemo: () => void;
  logout: () => void;
  kpis: typeof CLINIC_KPIS;
}

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    patientId: 'pt-1042',
    patientName: 'A. Rao',
    patientCode: 'PT-1042',
    medicationName: 'Medication A (20 mg daily)',
    riskScore: 72,
    severity: 'Moderate',
    primarySignal: 'Consecutive 8-day & 12-day refill delays + symptom flare',
    timestamp: '2 hours ago',
    status: 'pending',
    alternativeHypothesis: 'Dosage modification trial (20mg → 10mg) on April 20',
  },
  {
    id: 'alt-2',
    patientId: 'pt-2089',
    patientName: 'M. Chen',
    patientCode: 'PT-2089',
    medicationName: 'Medication B (10 mg daily)',
    riskScore: 84,
    severity: 'High',
    primarySignal: '16-day refill delay + CGM glucose excursion to 212 mg/dL',
    timestamp: '4 hours ago',
    status: 'pending',
    alternativeHypothesis: 'Insurance prior authorization hold in pharmacy portal',
  },
  {
    id: 'alt-3',
    patientId: 'pt-5503',
    patientName: 'D. Patel',
    patientCode: 'PT-5503',
    medicationName: 'Medication E (Controller 250/50 mcg)',
    riskScore: 76,
    severity: 'Moderate',
    primarySignal: 'Controller 11-day gap + 3x rescue inhaler over-utilization',
    timestamp: 'Yesterday',
    status: 'pending',
    alternativeHypothesis: 'Seasonal peak pollen exacerbation',
  },
  {
    id: 'alt-4',
    patientId: 'pt-3104',
    patientName: 'S. Williams',
    patientCode: 'PT-3104',
    medicationName: 'Medication C (5 mg BID)',
    riskScore: 68,
    severity: 'Moderate',
    primarySignal: '9-day anticoagulant refill gap + smartwatch irregular rhythm alert',
    timestamp: '2 days ago',
    status: 'reviewed',
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Start in demo mode by default
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [dateFilter, setDateFilter] = useState<DateFilter>('7d');
  const [patients] = useState<Patient[]>(SYNTHETIC_PATIENTS);
  const [selectedPatientId, setSelectedPatientIdState] = useState<string>('pt-1042');
  const [investigatingPatientId, setInvestigatingPatientId] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];
  const investigatingPatient = investigatingPatientId
    ? patients.find((p) => p.id === investigatingPatientId) || null
    : null;

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

  const loginDemo = () => {
    setIsAuthenticated(true);
    setActiveView('dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        activeView,
        setActiveView,
        dateFilter,
        setDateFilter,
        patients,
        selectedPatient,
        setSelectedPatientId,
        investigatingPatient,
        openDetective,
        closeDetective,
        alerts,
        triageAlert,
        loginDemo,
        logout,
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
