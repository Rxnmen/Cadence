import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Pill,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
  Activity,
  Calendar,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  X,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { MedicationStatus } from '../../types/supabase';

export const SupabaseAdherenceSection: React.FC = () => {
  const {
    theme,
    userMedications,
    medicationLogs,
    userSymptoms,
    adherenceMetrics,
    addUserMedication,
    deleteUserMedication,
    logDose,
    addUserSymptom,
    isDataLoading,
    isSupabaseReady,
    supabaseUser,
  } = useApp();

  const [isAddMedOpen, setIsAddMedOpen] = useState<boolean>(false);
  const [isAddSymptomOpen, setIsAddSymptomOpen] = useState<boolean>(false);

  // Medication Form State
  const [medName, setMedName] = useState<string>('');
  const [medDosage, setMedDosage] = useState<string>('');
  const [medFrequency, setMedFrequency] = useState<string>('Once daily');
  const [medStartDate, setMedStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [medEndDate, setMedEndDate] = useState<string>('');
  const [medError, setMedError] = useState<string | null>(null);
  const [isSubmittingMed, setIsSubmittingMed] = useState<boolean>(false);

  // Symptom Form State
  const [symptomText, setSymptomText] = useState<string>('');
  const [symptomSeverity, setSymptomSeverity] = useState<number>(3);
  const [symptomError, setSymptomError] = useState<string | null>(null);
  const [isSubmittingSymptom, setIsSubmittingSymptom] = useState<boolean>(false);

  // Feedback Notification
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleAddMedicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMedError(null);

    if (!medName.trim()) {
      setMedError('Medication name is required');
      return;
    }
    if (!medDosage.trim()) {
      setMedError('Dosage strength is required (e.g. 10 mg)');
      return;
    }

    setIsSubmittingMed(true);
    const result = await addUserMedication({
      name: medName.trim(),
      dosage: medDosage.trim(),
      frequency: medFrequency.trim(),
      start_date: medStartDate || undefined,
      end_date: medEndDate || undefined,
    });
    setIsSubmittingMed(false);

    if (result.error) {
      setMedError(result.error);
    } else {
      setMedName('');
      setMedDosage('');
      setMedFrequency('Once daily');
      setMedEndDate('');
      setIsAddMedOpen(false);
      showNotice('Medication added successfully to your database!');
    }
  };

  const handleAddSymptomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSymptomError(null);

    if (!symptomText.trim()) {
      setSymptomError('Please describe the symptom');
      return;
    }

    setIsSubmittingSymptom(true);
    const result = await addUserSymptom(symptomText.trim(), symptomSeverity);
    setIsSubmittingSymptom(false);

    if (result.error) {
      setSymptomError(result.error);
    } else {
      setSymptomText('');
      setSymptomSeverity(3);
      setIsAddSymptomOpen(false);
      showNotice('Symptom entry logged with severity ' + symptomSeverity + '/10');
    }
  };

  const handleLogDose = async (medId: string, status: MedicationStatus) => {
    const result = await logDose(medId, status);
    if (result.error) {
      showNotice(result.error);
    } else {
      showNotice(`Dose marked as ${status.toUpperCase()}! Adherence score updated.`);
    }
  };

  const handleDeleteMedication = async (medId: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    const result = await deleteUserMedication(medId);
    if (result.error) {
      showNotice(result.error);
    } else {
      showNotice(`${name} removed from your regimen.`);
    }
  };

  // Find latest log for a medication
  const getLatestLogForMed = (medId: string, medName?: string) => {
    return medicationLogs.find(
      (l) =>
        l.medication_id === medId ||
        (medName && l.medication?.name?.toLowerCase() === medName.toLowerCase())
    );
  };

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {actionNotice && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-fade-in shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{actionNotice}</span>
        </div>
      )}

      {/* Main Section Card */}
      <div
        className={`p-6 rounded-3xl border backdrop-blur-md transition-all duration-300 relative overflow-hidden ${
          theme === 'dark'
            ? 'bg-slate-900/80 border-slate-800/90 text-slate-100 shadow-xl'
            : 'bg-white/90 border-slate-200/90 text-slate-900 shadow-sm'
        }`}
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full pointer-events-none" />

        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/70 dark:border-slate-800/70 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400 flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5" />
                Live Patient Regimen & Dose Tracker
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                {isSupabaseReady && supabaseUser ? 'SUPABASE RLS CONNECTED' : 'LOCAL CLINICAL STORE'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">
              Personal Pharmacotherapy & Transparent Adherence Engine
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
              Doses taken vs. expected are calculated dynamically using Row Level Security to protect patient privacy.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsAddSymptomOpen(true)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-teal-300 border-slate-700'
                  : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-teal-400" />
              <span>Log Symptom</span>
            </button>

            <button
              onClick={() => setIsAddMedOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Medication</span>
            </button>
          </div>
        </div>

        {/* Live Adherence & Dose Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 relative z-10">
          {/* Tile 1: Adherence Percentage */}
          <div
            className={`p-4 rounded-2xl border ${
              theme === 'dark' ? 'bg-slate-800/50 border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Adherence Percentage
            </span>
            <div className="text-2xl font-black text-cyan-400 font-mono flex items-baseline gap-1">
              {adherenceMetrics.percentage !== null ? `${adherenceMetrics.percentage}%` : 'N/A'}
              {adherenceMetrics.percentage !== null && (
                <span className="text-[10px] font-sans font-semibold text-slate-400">
                  ({adherenceMetrics.takenCount}/{adherenceMetrics.expectedCount} doses)
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Formula: (Taken / Expected) × 100
            </span>
          </div>

          {/* Tile 2: Active Medications */}
          <div
            className={`p-4 rounded-2xl border ${
              theme === 'dark' ? 'bg-slate-800/50 border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Active Prescriptions
            </span>
            <div className="text-2xl font-black text-indigo-400 font-mono">
              {userMedications.length}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              User-specific verified records
            </span>
          </div>

          {/* Tile 3: Dose Breakdown */}
          <div
            className={`p-4 rounded-2xl border ${
              theme === 'dark' ? 'bg-slate-800/50 border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Doses Logged
            </span>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="font-mono text-lg">{adherenceMetrics.takenCount}</span> Taken
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {adherenceMetrics.missedCount} Missed • {adherenceMetrics.lateCount} Late
            </span>
          </div>

          {/* Tile 4: Self-Reported Symptoms */}
          <div
            className={`p-4 rounded-2xl border ${
              theme === 'dark' ? 'bg-slate-800/50 border-slate-700/80' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Symptom Records
            </span>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {userSymptoms.length}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Multimodal signal correlation
            </span>
          </div>
        </div>

        {/* User Medications Regimen List */}
        <div className="mt-6 space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>My Prescriptions & Direct Adherence Controls</span>
            </h3>
            <span className="text-[11px] text-slate-400">
              {userMedications.length} total regimen{userMedications.length === 1 ? '' : 's'}
            </span>
          </div>

          {userMedications.length === 0 ? (
            <div
              className={`p-8 rounded-2xl border text-center space-y-3 ${
                theme === 'dark'
                  ? 'bg-slate-800/30 border-slate-800 text-slate-400'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <Pill className="w-8 h-8 text-cyan-400 mx-auto opacity-70" />
              <div className="text-xs font-semibold">
                No medications recorded yet in your Supabase database.
              </div>
              <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                Add your first medication to begin tracking scheduled doses, recording symptom flares, and calculating live adherence.
              </p>
              <button
                onClick={() => setIsAddMedOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm cursor-pointer"
              >
                + Add Medication
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {userMedications.map((med) => {
                const latestLog = getLatestLogForMed(med.id, med.name);

                return (
                  <div
                    key={med.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                      theme === 'dark'
                        ? 'bg-slate-800/60 border-slate-700/80 hover:border-cyan-500/40'
                        : 'bg-white border-slate-200 hover:border-sky-300'
                    }`}
                  >
                    {/* Top Row: Name, Dosage, Delete */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-100 dark:text-white">
                            {med.name}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-semibold">
                            {med.dosage}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Schedule: <strong className="text-slate-300">{med.frequency}</strong>
                        </div>
                        {med.start_date && (
                          <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Started {med.start_date}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteMedication(med.id, med.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Delete Medication"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom Row: Status Badge & Adherence Actions */}
                    <div className="pt-2 border-t border-slate-700/50 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="text-[11px] text-slate-400">
                        {latestLog ? (
                          <span className="flex items-center gap-1">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                latestLog.status === 'taken'
                                  ? 'bg-emerald-400'
                                  : latestLog.status === 'late'
                                  ? 'bg-amber-400'
                                  : latestLog.status === 'skipped'
                                  ? 'bg-slate-400'
                                  : 'bg-rose-500'
                              }`}
                            />
                            <span>
                              Last dose: <strong className="uppercase">{latestLog.status}</strong>{' '}
                              ({new Date(latestLog.created_at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })})
                            </span>
                          </span>
                        ) : (
                          <span className="text-slate-500">No dose logged today</span>
                        )}
                      </div>

                      {/* Dose Action Buttons */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => handleLogDose(med.id, 'taken')}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                          title="Mark Dose Taken"
                        >
                          <Check className="w-3 h-3" />
                          <span>Taken</span>
                        </button>

                        <button
                          onClick={() => handleLogDose(med.id, 'late')}
                          className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-all cursor-pointer active:scale-95"
                          title="Mark as Late Dose"
                        >
                          Late
                        </button>

                        <button
                          onClick={() => handleLogDose(med.id, 'missed')}
                          className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-all cursor-pointer active:scale-95"
                          title="Record Missed Dose"
                        >
                          Missed
                        </button>

                        <button
                          onClick={() => handleLogDose(med.id, 'skipped')}
                          className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-slate-700/60 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-all cursor-pointer active:scale-95"
                          title="Record Clinically Skipped Dose"
                        >
                          Skip
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Symptoms History Preview */}
        {userSymptoms.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-700/60 dark:border-slate-800/70">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-teal-400" />
                <span>Recent Logged Symptoms</span>
              </span>
              <span className="text-[11px] text-slate-400">
                {userSymptoms.length} recorded
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {userSymptoms.slice(0, 3).map((symp) => (
                <div
                  key={symp.id}
                  className={`p-3 rounded-xl border text-xs ${
                    theme === 'dark'
                      ? 'bg-slate-800/40 border-slate-700/60'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-slate-200 truncate">{symp.symptom}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                        symp.severity >= 7
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : symp.severity >= 4
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                      }`}
                    >
                      Severity: {symp.severity}/10
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Logged: {new Date(symp.recorded_at).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: Add Medication Modal */}
      {isAddMedOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-lg rounded-3xl border p-6 shadow-2xl space-y-5 ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/70">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Pill className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Add Prescription Medication</h3>
                  <p className="text-xs text-slate-400">
                    Saves to the Supabase <code className="text-cyan-400">medications</code> table under your user account.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddMedOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {medError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{medError}</span>
              </div>
            )}

            <form onSubmit={handleAddMedicationSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Medication Name *
                </label>
                <input
                  type="text"
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  placeholder="e.g. Atorvastatin or Lisinopril"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 border ${
                    theme === 'dark'
                      ? 'bg-slate-800 border-slate-700 text-white focus:ring-cyan-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-sky-500'
                  }`}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Dosage Strength *
                  </label>
                  <input
                    type="text"
                    value={medDosage}
                    onChange={(e) => setMedDosage(e.target.value)}
                    placeholder="e.g. 20 mg or 500 mg"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 border ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-white focus:ring-cyan-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-sky-500'
                    }`}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Frequency *
                  </label>
                  <input
                    type="text"
                    value={medFrequency}
                    onChange={(e) => setMedFrequency(e.target.value)}
                    placeholder="e.g. Once daily at night"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 border ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-white focus:ring-cyan-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-sky-500'
                    }`}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={medStartDate}
                    onChange={(e) => setMedStartDate(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 border ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-white focus:ring-cyan-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-sky-500'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={medEndDate}
                    onChange={(e) => setMedEndDate(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 border ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-white focus:ring-cyan-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-sky-500'
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/70">
                <button
                  type="button"
                  onClick={() => setIsAddMedOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingMed}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/25 cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingMed ? 'Saving to Database...' : 'Save Medication'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Record Symptom Modal */}
      {isAddSymptomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl space-y-5 ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/70">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Record Patient Symptom</h3>
                  <p className="text-xs text-slate-400">
                    Saves to the Supabase <code className="text-teal-400">symptoms</code> table.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddSymptomOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {symptomError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{symptomError}</span>
              </div>
            )}

            <form onSubmit={handleAddSymptomSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Symptom Description *
                </label>
                <input
                  type="text"
                  value={symptomText}
                  onChange={(e) => setSymptomText(e.target.value)}
                  placeholder="e.g. Mild headache, dizziness, nausea..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 border ${
                    theme === 'dark'
                      ? 'bg-slate-800 border-slate-700 text-white focus:ring-teal-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-teal-500'
                  }`}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Severity Rating (1 to 10)
                  </label>
                  <span className="text-xs font-mono font-bold text-teal-400">
                    {symptomSeverity} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={symptomSeverity}
                  onChange={(e) => setSymptomSeverity(parseInt(e.target.value, 10))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1 (Mild)</span>
                  <span>5 (Moderate)</span>
                  <span>10 (Severe)</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/70">
                <button
                  type="button"
                  onClick={() => setIsAddSymptomOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingSymptom}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingSymptom ? 'Saving...' : 'Record Symptom'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
