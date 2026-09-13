import React, { useState } from 'react';
import { RefillRecord } from '../../types/patient';
import {
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  BarChart3,
  HelpCircle,
  Building2,
} from 'lucide-react';

interface RefillsTabProps {
  refills: RefillRecord[];
}

export const RefillsTab: React.FC<RefillsTabProps> = ({ refills }) => {
  const [activeRefill, setActiveRefill] = useState<RefillRecord | null>(null);

  // Statistics
  const totalRefills = refills.length;
  const delayedRefillsCount = refills.filter((r) => r.status === 'delayed').length;
  const totalObservedDays = refills.reduce((acc, r) => acc + r.actualIntervalDays, 0);
  const avgObservedInterval = Math.round(totalObservedDays / totalRefills) || 38;
  const longestDelay = Math.max(...refills.map((r) => r.delayDays), 0);

  // Max scale for SVG chart
  const maxInterval = Math.max(...refills.map((r) => r.actualIntervalDays), 45);

  return (
    <div className="space-y-4">
      {/* Top Refill Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            Average Refill Interval
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">
              {avgObservedInterval} days
            </span>
            <span className="text-xs text-slate-500 font-medium">
              (Expected: 30 days)
            </span>
          </div>
          <span className="text-[11px] text-amber-700 font-medium mt-1 block">
            +8 days longer than target cycle
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            Number of Delayed Refills
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-600">
              {delayedRefillsCount}
            </span>
            <span className="text-xs text-slate-500">of {totalRefills} tracked cycles</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {Math.round((delayedRefillsCount / totalRefills) * 100)}% cycle variance rate
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            Longest Recorded Delay
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-600">
              {longestDelay} days
            </span>
            <span className="text-xs text-slate-500">beyond supply window</span>
          </div>
          <span className="text-[11px] text-rose-700 font-medium mt-1 block">
            Occurred in May 2026 cycle
          </span>
        </div>
      </div>

      {/* Interactive Bar Chart */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-sky-600" />
              <span>Refill Interval History (Days Between Dispense Events)</span>
            </h4>
            <p className="text-xs text-slate-500">
              Bars indicate actual days between fills. The dashed horizontal line indicates the 30-day target baseline.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded bg-teal-500" /> On-Time (≤31d)
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded bg-amber-500" /> Delayed Refill
            </span>
          </div>
        </div>

        {/* Custom SVG Bar Chart */}
        <div className="relative pt-6 pb-2 px-4 bg-slate-50/60 rounded-xl border border-slate-200/70">
          {/* Target 30-day baseline rule */}
          <div
            className="absolute left-10 right-4 border-t-2 border-dashed border-sky-400 z-10 pointer-events-none flex items-center justify-end pr-2"
            style={{ bottom: `${(30 / maxInterval) * 160 + 35}px` }}
          >
            <span className="text-[10px] font-bold text-sky-700 bg-white px-1.5 py-0.5 rounded shadow-2xs -mt-5">
              Target Supply Window (30 Days)
            </span>
          </div>

          {/* Bars Container */}
          <div className="flex items-end justify-around h-52 pt-6 pb-8">
            {refills.map((refill, idx) => {
              const heightPercent = Math.min((refill.actualIntervalDays / maxInterval) * 100, 100);
              const isDelayed = refill.status === 'delayed';

              return (
                <div
                  key={idx}
                  onClick={() => setActiveRefill(refill)}
                  className="flex flex-col items-center group cursor-pointer relative"
                  style={{ width: `${100 / refills.length - 4}%`, maxWidth: '70px' }}
                >
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-30 bg-slate-900 text-white text-[10px] font-medium py-1 px-2 rounded shadow-md pointer-events-none whitespace-nowrap">
                    {refill.actualIntervalDays} days ({refill.status})
                  </div>

                  {/* Value Above Bar */}
                  <span
                    className={`text-[11px] font-bold mb-1.5 ${
                      isDelayed ? 'text-amber-700' : 'text-teal-700'
                    }`}
                  >
                    {refill.actualIntervalDays}d
                  </span>

                  {/* The Bar */}
                  <div className="w-full bg-slate-200/80 rounded-t-lg h-40 flex items-end overflow-hidden">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-700 ${
                        isDelayed
                          ? 'bg-gradient-to-t from-amber-600 to-amber-400 group-hover:brightness-110'
                          : 'bg-gradient-to-t from-teal-600 to-teal-400 group-hover:brightness-110'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  {/* Month Label */}
                  <span className="text-xs font-semibold text-slate-700 mt-2 text-center truncate w-full">
                    {refill.month}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {refill.delayDays > 0 ? `+${refill.delayDays}d gap` : 'On-time'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Refill Log Details Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold">
                <th className="py-2.5 px-3">Billing Month</th>
                <th className="py-2.5 px-3">Dispense Date</th>
                <th className="py-2.5 px-3">Actual Interval</th>
                <th className="py-2.5 px-3">Delay Gap</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Pharmacy Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {refills.map((refill, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{refill.month}</td>
                  <td className="py-2.5 px-3 text-slate-600">{refill.date}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-800">
                    {refill.actualIntervalDays} days
                  </td>
                  <td className="py-2.5 px-3">
                    {refill.delayDays > 0 ? (
                      <span className="font-semibold text-amber-700">
                        +{refill.delayDays} days late
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-medium">0 days (on schedule)</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        refill.status === 'delayed'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-teal-50 text-teal-800 border border-teal-200'
                      }`}
                    >
                      {refill.status === 'delayed' ? 'Delayed Dispense' : 'On Schedule'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{refill.pharmacyName}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
