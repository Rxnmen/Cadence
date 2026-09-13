import React, { useState } from 'react';
import { RefillRecord } from '../../types/patient';
import {
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  BarChart3,
  Building2,
  ArrowUpRight,
} from 'lucide-react';

interface RefillsTabProps {
  refills: RefillRecord[];
}

export const RefillsTab: React.FC<RefillsTabProps> = ({ refills }) => {
  const [activeRefill, setActiveRefill] = useState<RefillRecord | null>(null);

  const totalRefills = refills.length;
  const delayedRefillsCount = refills.filter((r) => r.status === 'delayed').length;
  const totalObservedDays = refills.reduce((acc, r) => acc + r.actualIntervalDays, 0);
  const avgObservedInterval = Math.round(totalObservedDays / totalRefills) || 38;
  const longestDelay = Math.max(...refills.map((r) => r.delayDays), 0);
  const maxInterval = Math.max(...refills.map((r) => r.actualIntervalDays), 45);

  return (
    <div className="space-y-5">
      {/* Top Refill Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/85 shadow-2xs card-elevation-hover">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            Average Refill Interval
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {avgObservedInterval} days
            </span>
            <span className="text-xs text-slate-500 font-medium">
              (Target: 30d)
            </span>
          </div>
          <span className="text-[11px] text-amber-700 font-bold mt-1.5 block">
            +8 days longer than projected window
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/85 shadow-2xs card-elevation-hover">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            Delayed Dispense Events
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
              {delayedRefillsCount}
            </span>
            <span className="text-xs text-slate-500">of {totalRefills} tracked cycles</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1.5 block">
            {Math.round((delayedRefillsCount / totalRefills) * 100)}% cycle variance rate
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/85 shadow-2xs card-elevation-hover">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            Longest Recorded Delay
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-mono">
              {longestDelay} days
            </span>
            <span className="text-xs text-slate-500">beyond supply window</span>
          </div>
          <span className="text-[11px] text-rose-700 font-bold mt-1.5 block">
            Recorded in May 2026 cycle
          </span>
        </div>
      </div>

      {/* Interactive Bar Chart Card */}
      <div className="bg-white rounded-2xl border border-slate-200/85 p-5 sm:p-6 shadow-2xs card-elevation-2 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-2xs">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-slate-900 tracking-tight">
                Refill Interval History (Days Between Dispense Events)
              </h4>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Vertical bars indicate actual days between dispense claims. The dashed horizontal line indicates the 30-day supply target.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 font-medium">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-3 h-3 rounded bg-teal-500 shadow-xs" /> On-Time (≤31d)
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-3 h-3 rounded bg-amber-500 shadow-xs" /> Delayed Dispense
            </span>
          </div>
        </div>

        {/* Custom SVG Bar Chart */}
        <div className="relative pt-8 pb-3 px-6 bg-gradient-to-b from-slate-50/90 to-white rounded-2xl border border-slate-200/80 shadow-inner">
          {/* 30-day baseline marker rule */}
          <div
            className="absolute left-12 right-6 border-t-2 border-dashed border-sky-400 z-10 pointer-events-none flex items-center justify-end pr-3"
            style={{ bottom: `${(30 / maxInterval) * 165 + 45}px` }}
          >
            <span className="text-[10px] font-extrabold text-sky-800 bg-white px-2 py-0.5 rounded-md shadow-2xs border border-sky-200 -mt-6">
              Target Supply Window (30 Days)
            </span>
          </div>

          {/* Bars Container */}
          <div className="flex items-end justify-around h-56 pt-6 pb-8">
            {refills.map((refill, idx) => {
              const heightPercent = Math.min((refill.actualIntervalDays / maxInterval) * 100, 100);
              const isDelayed = refill.status === 'delayed';

              return (
                <div
                  key={idx}
                  onClick={() => setActiveRefill(refill)}
                  className="flex flex-col items-center group cursor-pointer relative"
                  style={{ width: `${100 / refills.length - 4}%`, maxWidth: '76px' }}
                >
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-30 bg-slate-900 text-white text-[10px] font-semibold py-1 px-2.5 rounded-lg shadow-lg pointer-events-none whitespace-nowrap">
                    {refill.actualIntervalDays} days ({refill.status})
                  </div>

                  {/* Value Above Bar */}
                  <span
                    className={`text-[11px] font-black mb-1.5 font-mono ${
                      isDelayed ? 'text-amber-700' : 'text-teal-700'
                    }`}
                  >
                    {refill.actualIntervalDays}d
                  </span>

                  {/* Bar */}
                  <div className="w-full bg-slate-100 rounded-t-xl h-44 flex items-end overflow-hidden border border-slate-200/60 shadow-inner">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-700 ${
                        isDelayed
                          ? 'bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 group-hover:brightness-110 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                          : 'bg-gradient-to-t from-teal-600 via-teal-500 to-teal-400 group-hover:brightness-110 shadow-[0_0_12px_rgba(13,148,136,0.3)]'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  {/* Month Label */}
                  <span className="text-xs font-bold text-slate-800 mt-2.5 text-center truncate w-full">
                    {refill.month}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
                    {refill.delayDays > 0 ? `+${refill.delayDays}d gap` : 'On schedule'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Refill Log Details Table */}
        <div className="overflow-x-auto">
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
                  <td className="py-3 px-3 font-bold text-slate-900">{refill.month}</td>
                  <td className="py-3 px-3 text-slate-600 font-medium">{refill.date}</td>
                  <td className="py-3 px-3 font-bold text-slate-900 font-mono">
                    {refill.actualIntervalDays} days
                  </td>
                  <td className="py-3 px-3">
                    {refill.delayDays > 0 ? (
                      <span className="font-bold text-amber-700">
                        +{refill.delayDays} days late
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-semibold">0 days (on time)</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        refill.status === 'delayed'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-teal-50 text-teal-800 border border-teal-200'
                      }`}
                    >
                      {refill.status === 'delayed' ? 'Delayed Dispense' : 'On Schedule'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 flex items-center gap-1.5 font-medium">
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
