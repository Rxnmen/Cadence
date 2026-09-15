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
  const { selectedPatient, setSelectedPatientId, patients, setActiveView, theme } = useApp();

  return (
    <div className="space-y-6 pb-20">
      {/* Top Breadcrumb & Patient Diagnostic Header */}
      <div className={`rounded-3xl border p-6 shadow-sm space-y-5 relative overflow-hidden transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900/85 border-slate-800 text-slate-100 shadow-cyan-950/20'
          : 'bg-white/90 border-slate-200/85 text-slate-900 shadow-2xs'
      }`}>
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full filter blur-3xl pointer-events-none" />

        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
          theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer active:scale-95 ${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800 border-slate-700'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/80 border-slate-200/80'
              }`}
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  Signature Feature
                </span>
                <span className="text-slate-500">•</span>
                <span className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Diagnostic Decision Support Cockpit
                </span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2 mt-0.5 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                <span>Adherence Detective</span>
              </h2>
            </div>
          </div>

          {/* Quick Patient Switcher */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold hidden sm:inline ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Investigating:
            </span>
            <select
              value={selectedPatient.id}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className={`text-xs border rounded-xl px-3.5 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer shadow-2xs ${
                theme === 'dark'
                  ? 'bg-slate-800 border-slate-700 text-white'
                  : 'bg-slate-50 border-slate-200/90 text-slate-800'
              }`}
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
        <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl border shadow-2xs ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-slate-950/90 via-slate-900 to-slate-900 border-slate-800/90'
            : 'bg-gradient-to-r from-slate-50 via-sky-50/20 to-white border-slate-200/90'
        }`}>
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-cyan-500/20 shrink-0">
              {selectedPatient.initials}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`text-lg sm:text-xl font-black tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {selectedPatient.name}
                </h3>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 border rounded-md shadow-2xs ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-cyan-300'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}>
                  {selectedPatient.code}
                </span>
                <span className={`text-xs font-medium ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Age {selectedPatient.age} • {selectedPatient.condition}
                </span>
              </div>

              <div className={`flex items-center gap-2 text-xs mt-1.5 font-medium ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <Pill className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span className={`font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  {selectedPatient.primaryMedication.name}
                </span>
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
                  — {selectedPatient.primaryMedication.dosage} once daily ({selectedPatient.primaryMedication.frequency})
                </span>
              </div>
            </div>
          </div>

          {/* Risk Score & Confidence Metrics */}
          <div className="flex items-center flex-wrap gap-4 self-end lg:self-auto">
            <div className="text-right">
              <span className={`text-xs font-extrabold block font-mono ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Risk Index: {selectedPatient.riskScore} / 100
              </span>
              <RiskBadge category={selectedPatient.riskCategory} size="sm" />
            </div>

            <div className={`h-10 w-px hidden sm:block ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`} />

            <div className="text-right">
              <span className={`text-xs font-extrabold block ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Assessment Confidence
              </span>
              <ConfidenceBadge level={selectedPatient.confidence} />
            </div>
          </div>
        </div>

        {/* Cautious Decision Support Disclaimer */}
        <div className={`p-4 rounded-xl text-xs flex items-start gap-3 shadow-2xs border ${
          theme === 'dark'
            ? 'bg-cyan-950/40 border-cyan-800/60 text-cyan-200'
            : 'bg-sky-50/80 border-sky-200/80 text-sky-950'
        }`}>
          <ShieldAlert className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
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
