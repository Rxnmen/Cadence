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
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { selectedPatient, patients, setSelectedPatientId } = useApp();
  const [reportDate] = useState<string>('May 9, 2026');
  const [includeTimeline, setIncludeTimeline] = useState<boolean>(true);
  const [includeConfounders, setIncludeConfounders] = useState<boolean>(true);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Controls Bar (hidden during print) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Clinical Adherence Decision-Support Dossier
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Formal, printable summary report for patient chart inclusion or multidisciplinary care conferences.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={selectedPatient.id}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                Report for: {p.name} ({p.code})
              </option>
            ))}
          </select>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Formal Printable Document Canvas */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md max-w-4xl mx-auto text-slate-900 space-y-6 print:border-none print:shadow-none print:p-0">
        {/* Document Letterhead */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-5">
          <CadenceLogo size="md" showTagline={true} />
          <div className="text-right text-xs text-slate-500 space-y-0.5">
            <div className="font-bold text-slate-900 text-sm">Clinical Decision-Support Report</div>
            <div>Date Generated: {reportDate}</div>
            <div>Reviewed By: Dr. Maya Sharma, MD (NPI: 8829104812)</div>
          </div>
        </div>

        {/* Patient Demographics Box */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Patient Name</span>
            <span className="font-bold text-slate-900 text-sm">{selectedPatient.name}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Medical Record ID</span>
            <span className="font-mono font-semibold text-slate-800">{selectedPatient.code}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Age & Gender</span>
            <span className="font-semibold text-slate-800">{selectedPatient.age} yrs • {selectedPatient.gender}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Condition</span>
            <span className="font-semibold text-slate-800">{selectedPatient.condition}</span>
          </div>
        </div>

        {/* Primary Medication Profile */}
        <div className="space-y-2 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1">
            Primary Target Medication
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-sky-50/50 rounded-xl border border-sky-100">
            <div>
              <span className="text-[10px] text-slate-500 block">Prescribed Drug</span>
              <span className="font-bold text-slate-900">{selectedPatient.primaryMedication.name} ({selectedPatient.primaryMedication.dosage})</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Schedule & Frequency</span>
              <span className="font-semibold text-slate-800">{selectedPatient.primaryMedication.frequency}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Prescribing Provider</span>
              <span className="font-semibold text-slate-800">{selectedPatient.primaryMedication.prescribingProvider}</span>
            </div>
          </div>
        </div>

        {/* Adherence Intelligence Assessment */}
        <div className="space-y-2 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1">
            Algorithmic Pattern Evaluation
          </h3>

          <div className="flex items-center justify-between p-3 bg-amber-50/60 rounded-xl border border-amber-200/80">
            <div>
              <span className="font-bold text-slate-900 text-sm block">
                Overall Risk Index: {selectedPatient.riskScore} / 100 ({selectedPatient.riskCategory})
              </span>
              <span className="text-slate-600 text-[11px]">
                Confidence Level: {selectedPatient.confidence} • Based on {selectedPatient.signalsCount} correlated streams
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed italic">
            “{selectedPatient.aiSummary}”
          </div>
        </div>

        {/* What Changed Baseline Summary */}
        <div className="space-y-2 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1">
            Baseline vs. Current Observational Period
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedPatient.baseline.map((b, i) => (
              <div key={i} className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>{b.metricName}</span>
                  <span className="text-amber-700 font-bold">{b.deltaText}</span>
                </div>
                <div className="text-slate-500 text-[11px]">
                  Norm: {b.normalBaseline} ➔ Observed: {b.currentObserved}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative Confounding Explanations */}
        {selectedPatient.alternativeExplanations.length > 0 && (
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-200 pb-1">
              Alternative Explanations & Confounders
            </h3>

            <div className="space-y-2">
              {selectedPatient.alternativeExplanations.slice(0, 2).map((exp, i) => (
                <div key={i} className="p-3 bg-amber-50/40 border border-amber-200/60 rounded-xl">
                  <span className="font-bold text-amber-950 block">{exp.hypothesis}</span>
                  <p className="text-slate-700 text-[11px] leading-snug mt-0.5">{exp.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clinician Attestation & Non-Punitive Notice */}
        <div className="pt-6 border-t-2 border-slate-200 space-y-4 text-xs">
          <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-xl text-sky-950 text-[11px] leading-relaxed">
            <strong>Clinical Notice:</strong> This Cadence summary is generated for diagnostic decision-support only. It does not establish non-compliance and does not replace medical judgment. All clinical actions require direct provider-patient communication.
          </div>

          <div className="flex items-end justify-between pt-4">
            <div className="space-y-1">
              <div className="w-48 border-b border-slate-400" />
              <span className="text-[10px] text-slate-400 block">Attending Clinician Signature</span>
              <span className="font-bold text-slate-900">Dr. Maya Sharma, MD</span>
            </div>

            <div className="text-right text-[10px] text-slate-400">
              Cadence Adherence Intelligence Engine • Build 2.4-Demo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
