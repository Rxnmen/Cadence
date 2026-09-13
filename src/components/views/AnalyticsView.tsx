import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Activity,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { kpis } = useApp();

  const therapeuticClasses = [
    { name: 'Cardiovascular (ACEi, ARB, Statins)', patients: 54, avgRefillInterval: '32.4 days', adherenceRate: '88%', concernRate: '11%' },
    { name: 'Endocrine & Metabolic (SGLT2i, GLP-1, Metformin)', patients: 38, avgRefillInterval: '34.8 days', adherenceRate: '82%', concernRate: '16%' },
    { name: 'Pulmonology (ICS / LABA Inhalers)', patients: 21, avgRefillInterval: '38.2 days', adherenceRate: '74%', concernRate: '22%' },
    { name: 'Rheumatology / Immunology (DMARDs, Biologics)', patients: 15, avgRefillInterval: '29.8 days', adherenceRate: '92%', concernRate: '6%' },
  ];

  const signalContributions = [
    { name: 'Pharmacy Dispense Gaps', count: 14, percent: 34, color: 'bg-sky-600' },
    { name: 'Symptom Trajectory Flares', count: 11, percent: 27, color: 'bg-teal-500' },
    { name: 'Biomarker Excursions (BP, HbA1c)', count: 8, percent: 20, color: 'bg-amber-500' },
    { name: 'Wearable Inactivity Divergence', count: 5, percent: 12, color: 'bg-indigo-500' },
    { name: 'Historical Recurrence', count: 3, percent: 7, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-sky-600" />
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Cohort Adherence Intelligence & Population Analytics
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Aggregated multimodal pattern discovery across Dr. Maya Sharma's 128 monitored patients.
        </p>
      </div>

      {/* Cohort Distribution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            Cohort Overall Persistence
          </span>
          <div className="text-2xl font-bold text-slate-900">84.6%</div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            +3.2% vs previous quarter
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            Average Refill Gap
          </span>
          <div className="text-2xl font-bold text-slate-900">4.1 days</div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Across active prescriptions
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            Confounders Discovered
          </span>
          <div className="text-2xl font-bold text-amber-600">6 patients</div>
          <span className="text-[11px] text-amber-800 font-medium mt-1 block">
            Dosage change or supply surplus
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            Preventative Interventions
          </span>
          <div className="text-2xl font-bold text-teal-600">18 resolved</div>
          <span className="text-[11px] text-teal-800 font-medium mt-1 block">
            Care coordination visits
          </span>
        </div>
      </div>

      {/* Therapeutic Classes Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-sky-600" />
          <span>Therapeutic Specialty & Drug Class Insights</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold">
                <th className="py-2.5 px-3">Therapeutic Specialty</th>
                <th className="py-2.5 px-3">Patients Enrolled</th>
                <th className="py-2.5 px-3">Average Refill Interval</th>
                <th className="py-2.5 px-3">Adherence Persistence</th>
                <th className="py-2.5 px-3">Pattern Requiring Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {therapeuticClasses.map((cls, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900">{cls.name}</td>
                  <td className="py-3 px-3 text-slate-600 font-medium">{cls.patients} patients</td>
                  <td className="py-3 px-3 text-slate-800">{cls.avgRefillInterval}</td>
                  <td className="py-3 px-3 font-bold text-emerald-700">{cls.adherenceRate}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
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
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Activity className="w-4 h-4 text-sky-600" />
          <span>Contributing Signal Prevalence Across All Flagged Patterns</span>
        </h3>

        <div className="space-y-3">
          {signalContributions.map((sig, idx) => (
            <div key={idx} className="space-y-1 text-xs">
              <div className="flex justify-between items-center text-slate-700">
                <span className="font-semibold">{sig.name}</span>
                <span className="font-mono text-slate-500">
                  {sig.count} patients ({sig.percent}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${sig.color}`}
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
