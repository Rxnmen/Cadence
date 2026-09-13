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
    <div className="space-y-6 pb-16">
      {/* Top Breadcrumb & Patient Switcher Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('dashboard')}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 flex items-center gap-1">
                  <Search className="w-3.5 h-3.5" />
                  Signature Feature
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500">Diagnostic Decision Support</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Adherence Detective</span>
              </h2>
            </div>
          </div>

          {/* Patient Quick Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Investigating:
            </span>
            <select
              value={selectedPatient.id}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
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
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-sky-600 text-white font-bold text-base flex items-center justify-center shadow-xs shrink-0">
              {selectedPatient.initials}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-bold text-slate-900">
                  {selectedPatient.name}
                </span>
                <span className="text-xs font-mono font-medium px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-600">
                  {selectedPatient.code}
                </span>
                <span className="text-xs text-slate-500">
                  Age {selectedPatient.age} • {selectedPatient.condition}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                <Pill className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span className="font-semibold text-slate-800">
                  {selectedPatient.primaryMedication.name}
                </span>
                <span>— {selectedPatient.primaryMedication.dosage} once daily</span>
              </div>
            </div>
          </div>

          {/* Risk Score & Confidence Metrics */}
          <div className="flex items-center flex-wrap gap-3 self-end lg:self-auto">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-900 block">
                Current Risk: {selectedPatient.riskScore} / 100
              </span>
              <RiskBadge category={selectedPatient.riskCategory} size="sm" />
            </div>

            <div className="h-8 w-px bg-slate-200 hidden sm:block" />

            <div className="text-right">
              <span className="text-xs font-bold text-slate-900 block">
                Assessment Confidence
              </span>
              <ConfidenceBadge level={selectedPatient.confidence} />
            </div>
          </div>
        </div>

        {/* Cautious Decision Support Disclaimer */}
        <div className="p-3 bg-sky-50/80 border border-sky-200/80 rounded-xl text-xs text-sky-950 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            “Multiple routine signals show deviations from the patient's expected treatment pattern.{' '}
            <strong>This does not confirm missed medication.</strong> Connect the clues across streams to formulate a supportive clinical conversation.”
          </p>
        </div>
      </div>

      {/* Feature 1: Multimodal Investigation Timeline */}
      <InvestigationTimeline timeline={selectedPatient.timeline} />

      {/* Feature 2: What Changed? (Personal Baseline Transformation) */}
      <WhatChangedCard baseline={selectedPatient.baseline} />

      {/* Feature 3: Personal Baseline Grid (Personalized Norms vs Observed) */}
      <PersonalBaselineGrid patientName={selectedPatient.name} />

      {/* Feature 4: Multi-Signal Correlation Topology */}
      <SignalCorrelationGraph />

      {/* Feature 5: Single Signal vs Combined Signals */}
      <SignalComparisonWidget />

      {/* Feature 6: Alternative Explanation Engine */}
      <AlternativeExplanationEngine
        explanations={selectedPatient.alternativeExplanations}
      />

      {/* Feature 7 & 8: Uncertainty Panel & AI Clinical Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UncertaintyPanel
          confidence={selectedPatient.confidence}
          increases={selectedPatient.confidenceFactors.increases}
          reduces={selectedPatient.confidenceFactors.reduces}
        />
        <AiSummaryCard
          initialSummary={selectedPatient.aiSummary}
          patientName={selectedPatient.name}
        />
      </div>
    </div>
  );
};
