import React from 'react';
import { useApp } from '../../context/AppContext';
import { TiltCard } from '../common/TiltCard';
import {
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  PieChart,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { kpis, theme } = useApp();
  const isDark = theme === 'dark';

  const therapeuticClasses = [
    { name: 'Cardiovascular (ACEi, ARB, Statins)', patients: 54, avgRefillInterval: '32.4 days', adherenceRate: '88%', concernRate: '11%', score: 88 },
    { name: 'Endocrine & Metabolic (SGLT2i, GLP-1, Metformin)', patients: 38, avgRefillInterval: '34.8 days', adherenceRate: '82%', concernRate: '16%', score: 82 },
    { name: 'Pulmonology (ICS / LABA Inhalers)', patients: 21, avgRefillInterval: '38.2 days', adherenceRate: '74%', concernRate: '22%', score: 74 },
    { name: 'Rheumatology / Immunology (DMARDs, Biologics)', patients: 15, avgRefillInterval: '29.8 days', adherenceRate: '92%', concernRate: '6%', score: 92 },
  ];

  const signalContributions = [
    { name: 'Pharmacy Dispense Gaps', count: 14, percent: 34, color: 'from-sky-500 to-cyan-400' },
    { name: 'Symptom Trajectory Flares', count: 11, percent: 27, color: 'from-teal-500 to-emerald-400' },
    { name: 'Biomarker Excursions (BP, HbA1c)', count: 8, percent: 20, color: 'from-amber-500 to-orange-400' },
    { name: 'Wearable Inactivity Divergence', count: 5, percent: 12, color: 'from-indigo-500 to-violet-400' },
    { name: 'Historical Recurrence Patterns', count: 3, percent: 7, color: 'from-purple-500 to-fuchsia-400' },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className={`relative overflow-hidden p-6 rounded-2xl border transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80'
      } shadow-2xs`}>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-xs ${
                isDark ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-sky-500/10 border-sky-500/20 text-sky-600'
              }`}>
                <BarChart3 className="w-4.5 h-4.5" />
              </div>
              <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Cohort Adherence Intelligence & Population Analytics
              </h2>
            </div>
            <p className={`text-xs mt-1.5 max-w-2xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Aggregated multimodal pattern discovery across Dr. Maya Sharma's 128 monitored patients. Identifies therapeutic vulnerabilities before clinical decompensation occurs.
            </p>
          </div>

          <div className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border self-start sm:self-auto shadow-2xs ${
            isDark ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60' : 'text-emerald-800 bg-emerald-50 border-emerald-200'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Real-time Telemetry Synced</span>
          </div>
        </div>
      </div>

      {/* Cohort 3D Tilt Distribution Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <TiltCard className={`p-5 rounded-2xl border shadow-2xs space-y-2 transition-colors ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white/90 border-slate-200/80 text-slate-900'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Cohort Persistence
            </span>
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
              isDark ? 'bg-emerald-950/60 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
            }`}>
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>84.6%</div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-500 font-semibold pt-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
            <span>+3.2% vs previous quarter</span>
          </div>
        </TiltCard>

        <TiltCard className={`p-5 rounded-2xl border shadow-2xs space-y-2 transition-colors ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white/90 border-slate-200/80 text-slate-900'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Average Refill Gap
            </span>
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
              isDark ? 'bg-cyan-950/60 text-cyan-400' : 'bg-sky-50 text-sky-600'
            }`}>
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            4.1 <span className="text-lg font-normal text-slate-400">days</span>
          </div>
          <div className="text-[11px] text-slate-400 font-medium pt-1">
            Across 128 active prescriptions
          </div>
        </TiltCard>

        <TiltCard className={`p-5 rounded-2xl border shadow-2xs space-y-2 transition-colors ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white/90 border-slate-200/80 text-slate-900'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Confounders Discovered
            </span>
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
              isDark ? 'bg-amber-950/60 text-amber-400' : 'bg-amber-50 text-amber-600'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-500 tracking-tight">
            6 <span className="text-lg font-normal text-slate-400">patients</span>
          </div>
          <div className="text-[11px] text-amber-400 font-medium pt-1">
            Dosage change or supply surplus
          </div>
        </TiltCard>

        <TiltCard className={`p-5 rounded-2xl border shadow-2xs space-y-2 transition-colors ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white/90 border-slate-200/80 text-slate-900'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Preventative Visits
            </span>
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
              isDark ? 'bg-teal-950/60 text-teal-400' : 'bg-teal-50 text-teal-600'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-teal-400 tracking-tight">
            18 <span className="text-lg font-normal text-slate-400">resolved</span>
          </div>
          <div className="text-[11px] text-teal-400 font-medium pt-1">
            Care coordination check-ins
          </div>
        </TiltCard>
      </div>

      {/* Therapeutic Classes Breakdown */}
      <div className={`rounded-2xl border p-6 shadow-2xs space-y-4 transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80'
      }`}>
        <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-sky-50 text-sky-600'
            }`}>
              <Layers className="w-4 h-4" />
            </div>
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Therapeutic Specialty & Drug Class Adherence Persistence
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">128 Patients Tracked</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b text-[10px] uppercase font-bold ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-400'}`}>
                <th className="py-3 px-3">Therapeutic Specialty</th>
                <th className="py-3 px-3">Patients Enrolled</th>
                <th className="py-3 px-3">Average Refill Interval</th>
                <th className="py-3 px-3">Adherence Persistence</th>
                <th className="py-3 px-3">Pattern Requiring Review</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
              {therapeuticClasses.map((cls, idx) => (
                <tr key={idx} className={`transition-colors group ${isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/80'}`}>
                  <td className={`py-3.5 px-3 font-semibold flex items-center gap-2 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    <span>{cls.name}</span>
                  </td>
                  <td className={`py-3.5 px-3 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{cls.patients} patients</td>
                  <td className={`py-3.5 px-3 font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{cls.avgRefillInterval}</td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-16 h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: cls.adherenceRate }}
                        />
                      </div>
                      <span className="font-bold text-emerald-500 font-mono">{cls.adherenceRate}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      isDark ? 'bg-amber-950/60 text-amber-400 border-amber-800/60' : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {cls.concernRate}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multimodal Signal Contribution Share */}
      <div className={`rounded-2xl border p-6 shadow-2xs space-y-4 transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80'
      }`}>
        <div className={`flex items-center justify-between pb-3 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              isDark ? 'bg-teal-500/10 text-teal-400' : 'bg-teal-50 text-teal-600'
            }`}>
              <Activity className="w-4 h-4" />
            </div>
            <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Contributing Signal Prevalence Across Flagged Patients
            </h3>
          </div>
          <span className="text-xs text-slate-400">Total Flagged: 41 Signals</span>
        </div>

        <div className="space-y-4 pt-1">
          {signalContributions.map((sig, idx) => (
            <div key={idx} className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{sig.name}</span>
                <span className="font-mono text-slate-400 font-medium">
                  {sig.count} patients <strong className={isDark ? 'text-white' : 'text-slate-800'}>({sig.percent}%)</strong>
                </span>
              </div>
              <div className={`w-full h-2.5 rounded-full overflow-hidden p-0.5 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${sig.color} transition-all duration-500 shadow-xs`}
                  style={{ width: `${sig.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
