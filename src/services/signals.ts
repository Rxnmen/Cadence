import { SupabaseMedicationLog, SupabaseSymptom } from '../types/supabase';

// ==============================================================================
// 1. Transparent Adherence Score Calculation
// Formula: (number of doses taken / number of doses expected) * 100
// Handles cases where there is no data gracefully.
// ==============================================================================

export interface AdherenceMetrics {
  percentage: number | null; // null if no expected doses
  takenCount: number;
  expectedCount: number;
  missedCount: number;
  lateCount: number;
  skippedCount: number;
  hasData: boolean;
  statusText: string;
}

export const calculateAdherencePercentage = (
  logs: SupabaseMedicationLog[],
  customExpectedDoses?: number
): AdherenceMetrics => {
  const taken = logs.filter((l) => l.status === 'taken').length;
  const late = logs.filter((l) => l.status === 'late').length;
  const missed = logs.filter((l) => l.status === 'missed').length;
  const skipped = logs.filter((l) => l.status === 'skipped').length;

  // Taken count includes both on-time 'taken' and 'late' doses
  const successfulDoses = taken + late;

  // Expected doses: custom count or total logged dose events
  const totalLoggedEvents = logs.length;
  const expected = typeof customExpectedDoses === 'number' && customExpectedDoses > 0
    ? customExpectedDoses
    : totalLoggedEvents;

  if (expected === 0) {
    return {
      percentage: null,
      takenCount: 0,
      expectedCount: 0,
      missedCount: 0,
      lateCount: 0,
      skippedCount: 0,
      hasData: false,
      statusText: 'No doses recorded yet',
    };
  }

  const rawPercent = (successfulDoses / expected) * 100;
  const percentage = Math.min(100, Math.max(0, Math.round(rawPercent)));

  let statusText = 'Optimal Adherence';
  if (percentage < 70) {
    statusText = 'Adherence Needs Attention';
  } else if (percentage < 85) {
    statusText = 'Moderate Adherence';
  }

  return {
    percentage,
    takenCount: successfulDoses,
    expectedCount: expected,
    missedCount: missed,
    lateCount: late,
    skippedCount: skipped,
    hasData: true,
    statusText,
  };
};

// ==============================================================================
// 2. Candace Extensible Multi-Signal Architecture
// Designed to combine multiple signals without fabricating fake hardware or clinical data.
// ==============================================================================

export type SignalType =
  | 'medication_log'
  | 'refill_information'
  | 'prescription_change'
  | 'symptom'
  | 'follow_up_record'
  | 'wearable_activity';

export interface SignalItem {
  id: string;
  type: SignalType;
  timestamp: string;
  title: string;
  detail: string;
  severity?: 'low' | 'moderate' | 'high';
  isRealData: boolean;
  data?: Record<string, unknown>;
}

export interface SignalAdapter {
  type: SignalType;
  name: string;
  isImplemented: boolean;
  getSignals: (context: {
    logs?: SupabaseMedicationLog[];
    symptoms?: SupabaseSymptom[];
  }) => SignalItem[];
}

// Signal Adapter 1: Live Medication Logs
export const MedicationLogSignalAdapter: SignalAdapter = {
  type: 'medication_log',
  name: 'Medication Adherence Logs',
  isImplemented: true,
  getSignals: ({ logs = [] }) => {
    return logs.map((log) => {
      let severity: 'low' | 'moderate' | 'high' = 'low';
      if (log.status === 'missed') severity = 'high';
      if (log.status === 'late' || log.status === 'skipped') severity = 'moderate';

      return {
        id: `sig-log-${log.id}`,
        type: 'medication_log',
        timestamp: log.taken_time || log.scheduled_time || log.created_at,
        title: `Dose Marked ${log.status.toUpperCase()}`,
        detail: `Scheduled for ${new Date(log.scheduled_time).toLocaleString([], {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}`,
        severity,
        isRealData: true,
        data: { logId: log.id, status: log.status },
      };
    });
  },
};

// Signal Adapter 2: Live Patient Symptoms
export const SymptomSignalAdapter: SignalAdapter = {
  type: 'symptom',
  name: 'Self-Reported Symptoms',
  isImplemented: true,
  getSignals: ({ symptoms = [] }) => {
    return symptoms.map((s) => {
      let severity: 'low' | 'moderate' | 'high' = 'low';
      if (s.severity >= 7) severity = 'high';
      else if (s.severity >= 4) severity = 'moderate';

      return {
        id: `sig-symp-${s.id}`,
        type: 'symptom',
        timestamp: s.recorded_at,
        title: `Symptom Reported: ${s.symptom}`,
        detail: `Severity Rating: ${s.severity}/10`,
        severity,
        isRealData: true,
        data: { symptomId: s.id, severity: s.severity },
      };
    });
  },
};

// Signal Adapters 3 - 6: Extensible Stubs (Not implemented yet - No pretending)
export const RefillSignalAdapter: SignalAdapter = {
  type: 'refill_information',
  name: 'Pharmacy Claims & Refill Stream',
  isImplemented: false,
  getSignals: () => [],
};

export const PrescriptionChangeSignalAdapter: SignalAdapter = {
  type: 'prescription_change',
  name: 'Prescription & Dosage Titrations',
  isImplemented: false,
  getSignals: () => [],
};

export const FollowUpSignalAdapter: SignalAdapter = {
  type: 'follow_up_record',
  name: 'Clinic Follow-up & Discharge Summaries',
  isImplemented: false,
  getSignals: () => [],
};

export const WearableSignalAdapter: SignalAdapter = {
  type: 'wearable_activity',
  name: 'Wearable Biosensors & Activity Telemetry',
  isImplemented: false,
  getSignals: () => [],
};

// Consolidated Multi-Signal Collector
export const collectActiveSignals = (context: {
  logs: SupabaseMedicationLog[];
  symptoms: SupabaseSymptom[];
}): SignalItem[] => {
  const activeAdapters = [MedicationLogSignalAdapter, SymptomSignalAdapter];
  const allSignals: SignalItem[] = [];

  for (const adapter of activeAdapters) {
    if (adapter.isImplemented) {
      allSignals.push(...adapter.getSignals(context));
    }
  }

  // Sort chronologically descending
  return allSignals.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};
