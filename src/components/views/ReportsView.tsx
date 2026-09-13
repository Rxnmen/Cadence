import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CadenceLogo } from '../common/CadenceLogo';
import {
  FileText,
  Printer,
  Download,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Pill,
  Clock,
  Sparkles,
  Info,
  ChevronDown,
  Activity,
  AlertTriangle,
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { selectedPatient, patients, setSelectedPatientId } = useApp();
  const [reportDate] = useState<string>('May 9, 2026');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Controls Bar (hidden during print) */}
      <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 flex items-center justify-center shadow-xs">
              <FileText className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Clinical Adherence Decision-Support Dossier
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Formal, printable summary dossier formatted for electronic health record (EHR) chart inclusion or multidisciplinary care team conferences.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <select
              value={selectedPatient.id}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer shadow-2xs appearance-none"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  Dossier: {p.name} ({p.code})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-slate-900 hover:bg-sky-600 active:scale-95 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Formal Printable Document Canvas */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-lg max-w-4xl mx-auto text-slate-900 space-y-7 print:border-none print:shadow-none print:p-0">
        {/* Document Letterhead */}
        <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6">
          <CadenceLogo size="md" showTagline={true} />
          <div className="text-right text-xs text-slate-500 space-y-1">
            <div className="font-mono text-[11px] font-bold text-sky-700 uppercase tracking-wider">
              Clinical Decision-Support Document
            </div>
            <div className="font-bold text-slate-900 text-sm">Case Reference: CAD-{selectedPatient.code}-2026</div>
            <div>Date of Analysis: <strong className="text-slate-800 font-medium">{reportDate}</strong></div>
            <div>Reviewing Clinician: <strong className="text-slate-800">Dr. Maya Sharma, MD</strong> (NPI: 8829104812)</div>
          </div>
        </div>

        {/* Patient Demographics Box */}
        <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Patient Full Name</span>
            <span className="font-bold text-slate-900 text-sm">{selectedPatient.name}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Medical Record ID</span>
            <span className="font-mono font-bold text-slate-800">{selectedPatient.code}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Demographics</span>
            <span className="font-semibold text-slate-800">{selectedPatient.age} yrs • {selectedPatient.gender}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Primary Clinical Diagnosis</span>
            <span className="font-semibold text-slate-800">{selectedPatient.condition}</span>
          </div>
        </div>

        {/* Primary Medication Profile */}
        <div className="space-y-2.5 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
            <Pill className="w-3.5 h-3.5 text-sky-600" />
            <span>Target Pharmacotherapy Under Review</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-sky-50/40 rounded-xl border border-sky-100">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Prescribed Compound & Dosage</span>
              <span className="font-bold text-slate-900 text-sm">{selectedPatient.primaryMedication.name} ({selectedPatient.primaryMedication.dosage})</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Dosing Schedule</span>
              <span className="font-semibold text-slate-800 text-sm">{selectedPatient.primaryMedication.frequency}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Attending Provider of Record</span>
              <span className="font-semibold text-slate-800 text-sm">{selectedPatient.primaryMedication.prescribingProvider}</span>
            </div>
          </div>
        </div>

        {/* Adherence Intelligence Assessment */}
        <div className="space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-sky-600" />
            <span>Algorithmic Multi-Signal Coherence Assessment</span>
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">
                  Calculated Risk Index: {selectedPatient.riskScore} / 100
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 uppercase">
                  {selectedPatient.riskCategory}
                </span>
              </div>
              <span className="text-slate-600 text-[11px] block mt-0.5">
                Confidence Rating: <strong className="text-slate-800">{selectedPatient.confidence}</strong> • Ingested across {selectedPatient.signalsCount} correlated signal streams
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 text-slate-800 leading-relaxed italic text-xs sm:text-[13px]">
            “{selectedPatient.aiSummary}”
          </div>
        </div>

        {/* What Changed Baseline Summary */}
        <div className="space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1.5">
            Personal Baseline vs. Current Observational Period
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedPatient.baseline.map((b, i) => (
              <div key={i} className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1 shadow-2xs">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-slate-900">{b.metricName}</span>
                  <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px] font-mono">
                    {b.deltaText}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px]">
                  Personal Baseline: <strong className="text-slate-700">{b.normalBaseline}</strong> ➔ Current Observed: <strong className="text-slate-900">{b.currentObserved}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative Confounding Explanations */}
        {selectedPatient.alternativeExplanations.length > 0 && (
          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Confounder & Alternative Hypothesis Evaluation</span>
            </h3>

            <div className="space-y-2.5">
              {selectedPatient.alternativeExplanations.slice(0, 2).map((exp, i) => (
                <div key={i} className="p-3.5 bg-amber-50/40 border border-amber-200/60 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-950 text-xs">{exp.hypothesis}</span>
                    <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                      Evidence: {exp.evidenceScore}%
                    </span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed mt-1">{exp.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clinician Attestation & Non-Punitive Notice */}
        <div className="pt-6 border-t-2 border-slate-200 space-y-5 text-xs">
          <div className="p-3.5 bg-sky-50/70 border border-sky-200 rounded-xl text-sky-950 text-[11px] leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <strong>Non-Punitive Medical Notice:</strong> This Cadence dossier is algorithmically generated for diagnostic decision-support only. It does not establish intentional non-compliance and does not replace medical judgment. All clinical care decisions must be verified through supportive provider-patient dialogue.
            </div>
          </div>

          <div className="flex items-end justify-between pt-4">
            <div className="space-y-1.5">
              <div className="w-56 border-b border-slate-400" />
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Attending Clinician Attestation & Signature</span>
              <span className="font-bold text-slate-900 text-sm">Dr. Maya Sharma, MD</span>
            </div>

            <div className="text-right text-[10px] text-slate-400 font-mono">
              Cadence Adherence Intelligence Engine • Build 2.4-Demo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
