import React, { useState, useEffect } from 'react';
import { useApp, DateFilter } from '../../context/AppContext';
import { CommandPalette } from '../common/CommandPalette';
import {
  Calendar,
  Search,
  Sparkles,
  ShieldAlert,
  Bell,
  SlidersHorizontal,
  Command,
  Activity,
  CheckCircle2,
} from 'lucide-react';

interface TopbarProps {
  onOpenMobileMenu?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileMenu }) => {
  const {
    dateFilter,
    setDateFilter,
    patients,
    openDetective,
    alerts,
    setActiveView,
  } = useApp();

  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const pendingAlerts = alerts.filter((a) => a.status === 'pending').length;

  // Global keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const dateOptions: { id: DateFilter; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <>
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      <header className="sticky top-0 z-30 px-5 sm:px-8 py-3.5 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 max-w-7xl mx-auto">
          {/* Left Greeting & Practice Status */}
          <div className="flex items-center gap-3">
            {onOpenMobileMenu && (
              <button
                onClick={onOpenMobileMenu}
                className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Good evening, Dr. Sharma</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200/80 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Telemetry Sync
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Here’s what changed across your authorized cohort since your last review.
              </p>
            </div>
          </div>

          {/* Right Controls: Quick Command Palette Trigger + Date Selector + Alerts */}
          <div className="flex items-center flex-wrap gap-2.5 justify-end">
            {/* Raycast/Linear Command Palette Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100/80 text-slate-500 hover:text-slate-800 border border-slate-200/90 rounded-xl text-xs font-medium transition-all shadow-2xs cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-sky-600" />
              <span className="hidden sm:inline">Search patients or actions...</span>
              <span className="sm:hidden">Search...</span>
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.2 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-400">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>

            {/* Date Segmented Control */}
            <div className="inline-flex p-1 bg-slate-100/80 backdrop-blur-xs rounded-xl border border-slate-200/80 text-xs font-medium text-slate-600 shadow-inner">
              {dateOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDateFilter(opt.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                    dateFilter === opt.id
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Patient Switcher Dropdown */}
            <div className="relative hidden lg:block">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    openDetective(e.target.value);
                  }
                }}
                defaultValue=""
                className="text-xs bg-white border border-slate-200/90 rounded-xl px-3 py-1.5 pr-7 text-slate-700 font-semibold hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer shadow-2xs"
              >
                <option value="" disabled>
                  Switch Focus Patient...
                </option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.code}) — {p.riskScore}/100
                  </option>
                ))}
              </select>
            </div>

            {/* Alerts Trigger Bell */}
            <button
              onClick={() => setActiveView('alerts')}
              className="relative p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 transition-colors shadow-2xs cursor-pointer"
              title="View clinical alerts"
            >
              <Bell className="w-4 h-4" />
              {pendingAlerts > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs animate-pulse">
                  {pendingAlerts}
                </span>
              )}
            </button>

            {/* Synthetic Data Sandbox Pill */}
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] px-2.5 py-1 bg-amber-50/80 text-amber-900 border border-amber-200/80 rounded-xl shadow-2xs font-medium">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Synthetic Sandbox</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
