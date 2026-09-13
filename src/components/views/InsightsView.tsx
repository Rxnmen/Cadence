import React from 'react';
import { useApp } from '../../context/AppContext';
import { InvestigationTimeline } from '../detective/InvestigationTimeline';
import { WhatChangedCard } from '../detective/WhatChangedCard';
import { PersonalBaselineGrid } from '../detective/PersonalBaselineGrid';
import { SignalCorrelationGraph } from '../detective/SignalCorrelationGraph';
import { SignalComparisonWidget } from '../detective/SignalComparisonWidget';
import { AlternativeExplanationEngine } from '../detective/AlternativeExplanationEngine';
import { UncertaintyPanel } from '../detective/UncertaintyPanel';
import { AiSummaryCard } from '../detective/AiSummaryCard';
import { RiskBadge, ConfidenceBadge } from '../common/RiskBadge';
import {
  Search,
  Pill,
  Sparkles,
  ShieldAlert,
  ArrowLeft,
  Share2,
  FileText,
  User,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export const InsightsView: React.FC = () => {
  const { selectedPatient, setSelectedPatientId, patients, setActiveView } = useApp();

  return (
    <div className="space-y-6 pb-20">
      {/* Top Breadcrumb & Patient Diagnostic Header */}
      <div className="bg-white rounded-2xl border border-slate-200/85 p-6 shadow-2xs card-elevation-2 space-y-5 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setActiveView('dashboard')}
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 transition-colors border border-slate-200/80 shadow-2xs cursor-pointer"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  Signature Feature
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-medium">Diagnostic Decision Support Cockpit</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2 mt-0.5">
                <span>Adherence Detective</span>
              </h2>
            </div>
          </div>

          {/* Quick Patient Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
              Investigating:
            </span>
            <select
              value={selectedPatient.id}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200/90 rounded-xl px-3.5 py-2 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer shadow-2xs"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.code}) — {p.primaryMedication.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Patient Profile Diagnostic Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-50 via-sky-50/20 to-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white font-extrabold text-lg flex items-center justify-center shadow-xs shrink-0">
              {selectedPatient.initials}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  {selectedPatient.name}
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-white border border-slate-200 rounded-md text-slate-600 shadow-2xs">
                  {selectedPatient.code}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Age {selectedPatient.age} • {selectedPatient.condition}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 mt-1.5 font-medium">
                <Pill className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span className="font-extrabold text-slate-900">
                  {selectedPatient.primaryMedication.name}
                </span>
                <span>— {selectedPatient.primaryMedication.dosage} once daily ({selectedPatient.primaryMedication.frequency})</span>
              </div>
            </div>
          </div>

          {/* Risk Score & Confidence Metrics */}
          <div className="flex items-center flex-wrap gap-4 self-end lg:self-auto">
            <div className="text-right">
              <span className="text-xs font-extrabold text-slate-900 block font-mono">
                Risk Index: {selectedPatient.riskScore} / 100
              </span>
              <RiskBadge category={selectedPatient.riskCategory} size="sm" />
            </div>

            <div className="h-10 w-px bg-slate-200 hidden sm:block" />

            <div className="text-right">
              <span className="text-xs font-extrabold text-slate-900 block">
                Assessment Confidence
              </span>
              <ConfidenceBadge level={selectedPatient.confidence} />
            </div>
          </div>
        </div>

        {/* Cautious Decision Support Disclaimer */}
        <div className="p-4 bg-sky-50/80 border border-sky-200/80 rounded-xl text-xs text-sky-950 flex items-start gap-3 shadow-2xs">
          <ShieldAlert className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-medium">
            “Multiple routinely available signals show deviations from the patient's expected treatment pattern.{' '}
            <strong>This does not confirm missed medication.</strong> Cadence connects clues across independent streams to support clinicians in conducting informed, empathetic check-ins.”
          </p>
        </div>
      </div>

      {/* Feature 1: Multimodal Investigation Timeline */}
      <InvestigationTimeline timeline={selectedPatient.timeline} />

      {/* Feature 2: What Changed? (Personal Baseline Comparison) */}
      <WhatChangedCard baseline={selectedPatient.baseline} />

      {/* Feature 3: Personal Baseline Grid (Individualized 6-Month Norms) */}
      <PersonalBaselineGrid patientName={selectedPatient.name} />

      {/* Feature 4: Multi-Signal Correlation Topology Canvas */}
      <SignalCorrelationGraph />

      {/* Feature 5: Single Signal vs. Combined Signals Progression */}
      <SignalComparisonWidget />

      {/* Feature 6: Alternative Explanation & Confounder Engine */}
      <AlternativeExplanationEngine
        explanations={selectedPatient.alternativeExplanations}
      />

      {/* Feature 7 & 8: Uncertainty Panel & AI Clinical Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UncertaintyPanel
          confidence={selectedPatient.confidence}
          increases={selectedPatient.confidenceFactors?.increases || []}
          reduces={selectedPatient.confidenceFactors?.reduces || []}
        />
        <AiSummaryCard
          initialSummary={selectedPatient.aiSummary}
          patientName={selectedPatient.name}
        />
      </div>
    </div>
  );
};
