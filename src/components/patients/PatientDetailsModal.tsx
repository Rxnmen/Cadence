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
} from 'lucide-react';

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
  const { theme } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'medications' | 'history' | 'ai-notes'>('overview');

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
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white text-base font-bold shadow-lg shadow-cyan-500/20 shrink-0">
              {patient.initials || patient.name.slice(0, 2).toUpperCase()}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-lg font-bold tracking-tight">{patient.name}</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-cyan-400 font-bold border border-slate-700">
                  {patient.patientId || patient.code}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${riskColor}`}>
                  {patient.riskLevel || 'Moderate'} Risk
                </span>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-3 flex-wrap">
                <span>{patient.age} yrs • {patient.gender}</span>
                <span>•</span>
                <span className="text-cyan-400 font-medium">{patient.condition}</span>
                <span>•</span>
                <span>Last Visit: <strong className={theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}>{patient.lastVisitDate || 'May 2026'}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              theme === 'dark' ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
            title="Close Modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className={`px-6 pt-3 border-b flex items-center gap-2 overflow-x-auto ${
          theme === 'dark' ? 'border-slate-800 bg-slate-900/30' : 'border-slate-100 bg-slate-50/30'
        }`}>
          {[
            { id: 'overview', label: 'Vitals & Overview', icon: Activity },
            { id: 'medications', label: 'Medications', icon: Pill },
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
                  {patient.aiSummary || 'Patient is enrolled in the Cadence AI Longitudinal Telemetry Cohort.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CURRENT MEDICATIONS */}
          {activeTab === 'medications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Active Pharmacotherapy Regimen</span>
                </h3>
                <span className="text-[10px] text-slate-400">
                  {patient.currentMedicationsList?.length || 1} Prescriptions
                </span>
              </div>

              <div className="space-y-2.5">
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
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
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

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CLINICAL HISTORY */}
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

          {/* TAB 4: AI DIAGNOSTIC NOTES */}
          {activeTab === 'ai-notes' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                <Brain className="w-4 h-4" />
                <span>Cadence Neural Diagnostic Synthesis</span>
              </div>

              <div className={`p-5 rounded-2xl border space-y-3 ${
                theme === 'dark' ? 'bg-cyan-950/20 border-cyan-800/40 text-slate-200' : 'bg-cyan-50/50 border-cyan-200 text-slate-800'
              }`}>
                <p className="text-xs leading-relaxed font-medium">
                  {patient.aiDiagnosticNotes || patient.aiSummary}
                </p>

                <div className="pt-3 border-t border-cyan-900/40 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Confidence Rating: <strong className="text-cyan-400">98.4% (Multi-Signal Verified)</strong></span>
                  <span>Model: Cadence Clinical Core v3.0</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className={`p-5 border-t flex flex-wrap items-center justify-between gap-3 ${
          theme === 'dark' ? 'border-slate-800 bg-slate-900/80' : 'border-slate-100 bg-slate-50'
        }`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onRunAssessment(patient);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
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
