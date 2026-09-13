import React from 'react';
import { useApp, DateFilter } from '../../context/AppContext';
import {
  Calendar,
  Search,
  Sparkles,
  ShieldAlert,
  Bell,
  SlidersHorizontal,
} from 'lucide-react';

interface TopbarProps {
  onOpenMobileMenu?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileMenu }) => {
  const {
    dateFilter,
    setDateFilter,
    patients,
    setSelectedPatientId,
    openDetective,
    activeView,
    alerts,
    setActiveView,
  } = useApp();

  const pendingAlerts = alerts.filter((a) => a.status === 'pending').length;

  const dateOptions: { id: DateFilter; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 sticky top-0 z-20 shadow-2xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: View Greeting / Context */}
        <div className="flex items-center gap-3">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}

          <div>
            <h1 className="text-base md:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Good evening, Dr. Sharma</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-200">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                Live Monitoring
              </span>
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Here’s what changed across your patients since your last review.
            </p>
          </div>
        </div>

        {/* Right Controls: Date Selector + Search + Demo Indicator */}
        <div className="flex items-center flex-wrap gap-2.5 justify-end">
          {/* Date Selector Segmented Control */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium text-slate-600">
            {dateOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setDateFilter(opt.id)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                  dateFilter === opt.id
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Quick Patient Switcher Select */}
          <div className="relative">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  openDetective(e.target.value);
                }
              }}
              defaultValue=""
              className="text-xs bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 pr-7 text-slate-700 font-medium hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer shadow-2xs"
            >
              <option value="" disabled>
                Select Patient...
              </option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.code}) — {p.riskCategory}
                </option>
              ))}
            </select>
          </div>

          {/* Alerts Bell */}
          <button
            onClick={() => setActiveView('alerts')}
            className="relative p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
            title="View clinical alerts"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            {pendingAlerts > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {pendingAlerts}
              </span>
            )}
          </button>

          {/* Synthetic Demo Banner Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200/80 rounded-lg">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-semibold">Demo Mode:</span>
            <span className="text-amber-700">Synthetic Data</span>
          </div>
        </div>
      </div>
    </header>
  );
};
