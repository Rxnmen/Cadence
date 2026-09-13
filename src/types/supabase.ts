export interface SupabaseMedication {
  id: string;
  user_id: string;
  name: string;
  dosage: string;
  frequency: string;
  start_date?: string | null;
  end_date?: string | null;
  created_at: string;
}

export type MedicationStatus = 'taken' | 'missed' | 'late' | 'skipped';

export interface SupabaseMedicationLog {
  id: string;
  user_id: string;
  medication_id: string;
  scheduled_time: string;
  taken_time?: string | null;
  status: MedicationStatus;
  created_at: string;
  medication?: SupabaseMedication;
}

export interface SupabaseSymptom {
  id: string;
  user_id: string;
  symptom: string;
  severity: number;
  recorded_at: string;
}

export interface SupabaseAdherenceScore {
  id: string;
  user_id: string;
  medication_id?: string | null;
  score: number;
  period: string;
  calculated_at: string;
}
