import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KpiCards } from '../dashboard/KpiCards';
import { PatientCard } from '../dashboard/PatientCard';
import { RadialScore } from '../common/RadialScore';
import { UncertaintyDisclaimer } from '../common/UncertaintyDisclaimer';
import { TiltCard } from '../common/TiltCard';
import {
  Users,
  Search,
  Filter,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Activity,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { patients, openDetective, setSelectedPatientId, setActiveView, selectedPatient } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPatients = patients.filter((p) => {
    if (filterCategory === 'high' && p.riskCategory !== 'High Priority') return false;
    if (filterCategory === 'moderate' && p.riskCategory !== 'Moderate Concern') return false;
    if (filterCategory === 'improving' && p.riskCategory !== 'Improving') return false;
    if (
      searchQuery &&
      !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.code.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.condition.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Top Welcome / Orientation Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/85 p-6 shadow-2xs card-elevation-2 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-sky-400/10 via-teal-400/5 to-transparent rounded-full pointer-events-none" />

        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
              Clinical Command Center
            </h2>
            <span className="text-[11px] font-bold px-3 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs">
              Active Cohort: 128 Patients
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl font-normal leading-relaxed">
            Cadence evaluates Routinely Available Multimodal Signals (RAMS) to identify temporal irregularities before acute decompensation occurs.
          </p>
        </div>

        <div className="flex items-center gap-2.5 relative z-10 self-start md:self-auto">
          <button
            onClick={() => openDetective('pt-1042')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer group"
          >
            <Search className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            <span>Launch Adherence Detective</span>
          </button>
        </div>
      </div>

      {/* Top 5 KPI Cards with 3D Tilt & Micro Sparklines */}
      <KpiCards />

      {/* Uncertainty Safeguard Notice */}
      <UncertaintyDisclaimer />

      {/* Two-Column Grid: Patients Requiring Attention + Radial Cohort Risk Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Patients Requiring Attention */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Patients Requiring Attention
                </h3>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
                  {patients.filter((p) => p.riskScore >= 65).length} Flagged
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Patients with multimodal patterns that may warrant supportive clinical review.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center flex-wrap gap-1.5 text-xs">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1 rounded-xl transition-all font-bold cursor-pointer ${
                  filterCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
                }`}
              >
                All ({patients.length})
              </button>
              <button
                onClick={() => setFilterCategory('high')}
                className={`px-3 py-1 rounded-xl transition-all font-bold cursor-pointer ${
                  filterCategory === 'high'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50'
                }`}
              >
                High Priority
              </button>
              <button
                onClick={() => setFilterCategory('moderate')}
                className={`px-3 py-1 rounded-xl transition-all font-bold cursor-pointer ${
                  filterCategory === 'moderate'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-amber-800 border border-amber-200 hover:bg-amber-50'
                }`}
              >
                Moderate Concern
              </button>
              <button
                onClick={() => setFilterCategory('improving')}
                className={`px-3 py-1 rounded-xl transition-all font-bold cursor-pointer ${
                  filterCategory === 'improving'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                Improving
              </button>
            </div>
          </div>

          {/* Patient Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onInvestigate={(id) => openDetective(id)}
                onSelect={(id) => {
                  setSelectedPatientId(id);
                  setActiveView('patients');
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Selected Patient Adherence Risk Score & Signal Breakdown */}
        <div className="space-y-4">
          <TiltCard
            maxTilt={4}
            glareOpacity={0.12}
            className="bg-white rounded-2xl border border-slate-200/85 p-6 shadow-2xs card-elevation-2 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Focus Patient Risk Score
                </span>
                <h4 className="text-sm font-extrabold text-slate-900">
                  {selectedPatient.name} ({selectedPatient.code})
                </h4>
              </div>

              <button
                onClick={() => openDetective(selectedPatient.id)}
                className="text-xs text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1 group cursor-pointer"
              >
                <span>Deep Dive</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Radial Score Component */}
            <RadialScore
              score={selectedPatient.riskScore}
              category={selectedPatient.riskCategory}
              contributingSignals={selectedPatient.contributingSignals}
              size="lg"
            />
          </TiltCard>

          {/* Practice Analytics Snapshot Card */}
          <div className="bg-white rounded-2xl border border-slate-200/85 p-5 shadow-2xs card-elevation-hover space-y-3.5 text-xs">
            <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Practice Multimodal Signal Prevalence</span>
            </h4>

            <div className="space-y-2.5 text-slate-600">
              <div className="flex justify-between items-center">
                <span className="font-medium">Pharmacy Refill Gaps (&gt;7d)</span>
                <span className="font-extrabold text-slate-900 font-mono">14 patients (10.9%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-600 h-full rounded-full" style={{ width: '10.9%' }} />
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Symptom Spikes Following Gaps</span>
                <span className="font-extrabold text-slate-900 font-mono">9 patients (7.0%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full rounded-full" style={{ width: '7.0%' }} />
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Confounders (e.g. Dosage Change)</span>
                <span className="font-extrabold text-amber-700 font-mono">6 patients (4.6%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '4.6%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
