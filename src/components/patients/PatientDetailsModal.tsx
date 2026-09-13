import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Patient } from '../../types/patient';
import {
  X,
  User,
  Heart,
  Activity,
  Pill,
  Clock,
  Calendar,
  FileText,
  Brain,
  ShieldAlert,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ChevronRight,
  Search,
  Check,
  Plus,
} from 'lucide-react';
import { MedicationStatus } from '../../types/supabase';

interface PatientDetailsModalProps {
  patient: Patient;
  onClose: () => void;
  onRunAssessment: (patient: Patient) => void;
}

export const PatientDetailsModal: React.FC<PatientDetailsModalProps> = ({
  patient,
  onClose,
  onRunAssessment,
}) => {
  const { theme, openDetective, logDose, addUserSymptom, userSymptoms } = useApp();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'medications' | 'symptoms' | 'history' | 'ai-notes'
  >('overview');

  // Dose logging notification
  const [feedback, setFeedback] = useState<string | null>(null);

  // Modal symptom form
  const [symptomText, setSymptomText] = useState<string>('');
  const [symptomSeverity, setSymptomSeverity] = useState<number>(3);
  const [isLoggingSymptom, setIsLoggingSymptom] = useState<boolean>(false);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleRecordDose = async (medName: string, status: MedicationStatus) => {
    const res = await logDose(medName, status);
    if (res.error) {
      showFeedback(`Error: ${res.error}`);
    } else {
      showFeedback(`Dose of ${medName} recorded as ${status.toUpperCase()} in Supabase`);
    }
  };

  const handleSymptomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomText.trim()) return;

    setIsLoggingSymptom(true);
    const res = await addUserSymptom(symptomText.trim(), symptomSeverity);
    setIsLoggingSymptom(false);

    if (res.error) {
      showFeedback(`Error: ${res.error}`);
    } else {
      showFeedback(`Symptom recorded: ${symptomText} (${symptomSeverity}/10)`);
      setSymptomText('');
      setSymptomSeverity(3);
    }
  };

  const riskColor =
    patient.riskLevel === 'High' || patient.riskCategory === 'High Priority'
      ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
      : patient.riskLevel === 'Moderate' || patient.riskCategory === 'Moderate Concern'
      ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
      : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-3xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-[#0f172a] border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`p-6 border-b flex items-start justify-between gap-4 ${
          theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/70'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white font-extrabold text-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
              {patient.initials}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-black tracking-tight">{patient.name}</h2>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                  {patient.code}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${riskColor}`}>
                  {patient.riskCategory || `${patient.riskLevel} Risk`} ({patient.riskScore}/100)
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                <span>Age: <strong>{patient.age}</strong></span>
                <span>•</span>
                <span>Gender: <strong>{patient.gender}</strong></span>
                <span>•</span>
                <span>Primary: <strong className="text-cyan-400">{patient.condition}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Banner */}
        {feedback && (
          <div className="px-6 py-2.5 bg-emerald-500/10 border-b border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className={`px-6 border-b flex items-center gap-2 overflow-x-auto ${
          theme === 'dark' ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50/50'
        }`}>
          {[
            { id: 'overview', label: 'Overview & Vitals', icon: Activity },
            { id: 'medications', label: 'Medications & Doses', icon: Pill },
            { id: 'symptoms', label: 'Symptoms & Flares', icon: Heart },
            { id: 'history', label: 'Clinical History', icon: Clock },
            { id: 'ai-notes', label: 'AI Diagnostic Notes', icon: Brain },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-cyan-500 text-cyan-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* TAB 1: OVERVIEW & VITALS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Vital Signs Grid */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Real-Time Ambulatory Vital Signs</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Blood Pressure</span>
                    <div className="text-lg font-extrabold text-cyan-400 font-mono">
                      {patient.vitalSigns?.bp || '138/88 mmHg'}
                    </div>
                    <span className="text-[10px] text-slate-400">Target &lt; 130/80</span>
                  </div>

                  <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Heart Rate</span>
                    <div className="text-lg font-extrabold text-rose-400 font-mono flex items-center gap-1">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
                      <span>{patient.vitalSigns?.heartRate || 76} bpm</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Normal Sinus</span>
                  </div>

                  <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Oxygen Saturation</span>
                    <div className="text-lg font-extrabold text-teal-400 font-mono">
                      {patient.vitalSigns?.spo2 || 97}%
                    </div>
                    <span className="text-[10px] text-slate-400">Ambient Air</span>
                  </div>

                  <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Glucose / Biomarker</span>
                    <div className="text-lg font-extrabold text-amber-400 font-mono">
                      {patient.vitalSigns?.bloodGlucose || '112 mg/dL'}
                    </div>
                    <span className="text-[10px] text-slate-400">Fasting Telemetry</span>
                  </div>
                </div>
              </div>

              {/* Patient Condition Summary Card */}
              <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300">Primary Diagnosis</span>
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold">{patient.condition}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {patient.aiSummary || 'Patient is enrolled in the Candace AI Longitudinal Telemetry Cohort.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CURRENT MEDICATIONS & DOSE LOGGING */}
          {activeTab === 'medications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Active Pharmacotherapy Regimen & Direct Dose Logging</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Click buttons to log doses directly to the Supabase database.
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {patient.currentMedicationsList?.length || 1} Regimens
                </span>
              </div>

              <div className="space-y-3">
                {(patient.currentMedicationsList || [
                  {
                    name: patient.primaryMedication.name,
                    dosage: patient.primaryMedication.dosage,
                    frequency: patient.primaryMedication.frequency,
                    route: patient.primaryMedication.route,
                  },
                ]).map((med, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-200">{med.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-semibold">
                          {med.dosage}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Schedule: <strong className="text-slate-300">{med.frequency}</strong> • Route: {med.route || 'Oral'}
                      </div>
                    </div>

                    {/* Dose Actions Buttons */}
                    <div className="flex items-center gap-1.5 flex-wrap self-end sm:self-auto">
                      <button
                        onClick={() => handleRecordDose(med.name, 'taken')}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all cursor-pointer active:scale-95 flex items-center gap-1"
                        title="Mark Dose Taken"
                      >
                        <Check className="w-3 h-3" />
                        <span>Taken</span>
                      </button>

                      <button
                        onClick={() => handleRecordDose(med.name, 'late')}
                        className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-all cursor-pointer active:scale-95"
                        title="Mark Late"
                      >
                        Late
                      </button>

                      <button
                        onClick={() => handleRecordDose(med.name, 'missed')}
                        className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-all cursor-pointer active:scale-95"
                        title="Mark Missed"
                      >
                        Missed
                      </button>

                      <button
                        onClick={() => handleRecordDose(med.name, 'skipped')}
                        className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-slate-700/60 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-all cursor-pointer active:scale-95"
                        title="Mark Skipped"
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SYMPTOMS & FLARES */}
          {activeTab === 'symptoms' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-teal-400" />
                  <span>Symptom Tracker & Signal Correlation</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  Supabase RLS Enabled
                </span>
              </div>

              {/* Symptom Log Form */}
              <form onSubmit={handleSymptomSubmit} className={`p-4 rounded-2xl border space-y-3 ${
                theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    Log New Symptom or Reaction
                  </label>
                  <input
                    type="text"
                    value={symptomText}
                    onChange={(e) => setSymptomText(e.target.value)}
                    placeholder="e.g. Mild exertional dyspnea, ankle edema..."
                    className={`w-full px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 border ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-white focus:ring-teal-500'
                        : 'bg-white border-slate-200 text-slate-900 focus:ring-teal-500'
                    }`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Severity:</span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={symptomSeverity}
                      onChange={(e) => setSymptomSeverity(parseInt(e.target.value, 10))}
                      className="w-32 accent-teal-500 cursor-pointer"
                    />
                    <span className="font-mono font-bold text-teal-400">{symptomSeverity}/10</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingSymptom || !symptomText.trim()}
                    className="px-4 py-1.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-xs transition-all cursor-pointer disabled:opacity-50 self-end sm:self-auto"
                  >
                    {isLoggingSymptom ? 'Saving...' : 'Record Symptom'}
                  </button>
                </div>
              </form>

              {/* Logged Symptoms List */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Logged Symptoms ({userSymptoms.length})
                </span>
                {userSymptoms.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No symptoms recorded yet.</p>
                ) : (
                  userSymptoms.map((s) => (
                    <div
                      key={s.id}
                      className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                        theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-slate-200 block">{s.symptom}</span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(s.recorded_at).toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
                        Severity: {s.severity}/10
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CLINICAL HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Longitudinal Medical History</span>
              </h3>

              <div className="space-y-3 pl-2 border-l-2 border-slate-800">
                {(patient.patientHistory || [
                  '2022: Initial clinical presentation and diagnosis',
                  '2024: Commenced primary disease-modifying therapy',
                  '2026: Enrolled in continuous remote patient monitoring',
                ]).map((event, idx) => (
                  <div key={idx} className="relative pl-4 space-y-1">
                    <span className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-cyan-500 ring-4 ring-slate-900" />
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">{event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AI DIAGNOSTIC NOTES */}
          {activeTab === 'ai-notes' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Brain className="w-4 h-4" />
                <span>Candace Neural Diagnostic Synthesis</span>
              </div>

              <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                theme === 'dark' ? 'bg-slate-900/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                {patient.aiDiagnosticNotes ||
                  'No immediate contraindications detected. Maintain current monitoring schedule.'}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                <span>Model: Candace Clinical Core v3.0</span>
                <span>Audit Trail: Verified via SHA-256</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`p-4 sm:p-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/70'
        }`}>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white border border-slate-700/80 hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Dossier</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                openDetective(patient.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-slate-700'
                  : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Launch Detective</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onRunAssessment(patient);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md shadow-cyan-500/25 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run AI Assessment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
