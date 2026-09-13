import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  User,
  LayoutDashboard,
  ShieldAlert,
  BarChart3,
  Bot,
  Database,
  FileText,
  Settings,
  ArrowRight,
  Sparkles,
  Command,
  X,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { patients, setActiveView, openDetective, setSelectedPatientId } = useApp();
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Command items
  const patientItems = patients.map((p) => ({
    id: `p-${p.id}`,
    category: 'Patients',
    title: `${p.name} (${p.code})`,
    subtitle: `${p.condition} • ${p.primaryMedication.name} • Risk: ${p.riskScore}/100`,
    icon: User,
    action: () => {
      openDetective(p.id);
      onClose();
    },
  }));

  const navItems = [
    { id: 'n-dash', category: 'Navigation', title: 'Command Dashboard', subtitle: 'View clinical KPIs and flagged attention queue', icon: LayoutDashboard, action: () => { setActiveView('dashboard'); onClose(); } },
    { id: 'n-detective', category: 'Navigation', title: 'Adherence Detective', subtitle: 'Launch multi-signal causal investigation cockpit', icon: Search, action: () => { openDetective('pt-1042'); onClose(); } },
    { id: 'n-alerts', category: 'Navigation', title: 'Clinical Alerts Queue', subtitle: 'Review and triage pending medication alerts', icon: ShieldAlert, action: () => { setActiveView('alerts'); onClose(); } },
    { id: 'n-analytics', category: 'Navigation', title: 'Population Analytics', subtitle: 'Cohort adherence and therapeutic class metrics', icon: BarChart3, action: () => { setActiveView('analytics'); onClose(); } },
    { id: 'n-assistant', category: 'Navigation', title: 'Cadence Clinical AI Assistant', subtitle: 'Ask questions about patient patterns and baseline', icon: Bot, action: () => { setActiveView('assistant'); onClose(); } },
    { id: 'n-datasources', category: 'Navigation', title: 'Healthcare Signal Feeds', subtitle: 'Check Surescripts, Epic FHIR, and HealthKit sync status', icon: Database, action: () => { setActiveView('data-sources'); onClose(); } },
    { id: 'n-reports', category: 'Navigation', title: 'Generate Clinical Dossier', subtitle: 'Print or export formal clinical decision-support report', icon: FileText, action: () => { setActiveView('reports'); onClose(); } },
    { id: 'n-settings', category: 'Navigation', title: 'Practice Settings & Governance', subtitle: 'Configure risk thresholds and ethical tone enforcement', icon: Settings, action: () => { setActiveView('settings'); onClose(); } },
  ];

  const allItems = [...patientItems, ...navItems];

  const filteredItems = allItems.filter((item) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(filteredItems.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(filteredItems.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-950/45 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden text-slate-900 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200/80 bg-slate-50/50">
          <Search className="w-5 h-5 text-sky-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search patients, investigations, views, or actions..."
            className="w-full text-sm bg-transparent placeholder-slate-400 text-slate-900 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded-md">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching patients or navigation actions found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs transition-all ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'hover:bg-slate-100/70 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs">{item.title}</span>
                        <span
                          className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded ${
                            isSelected
                              ? 'bg-sky-700 text-sky-100'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <span
                        className={`text-[11px] truncate block ${
                          isSelected ? 'text-sky-100' : 'text-slate-500'
                        }`}
                      >
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'translate-x-0.5 text-white' : 'opacity-0'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>Navigation: <kbd className="px-1 py-0.2 bg-white border border-slate-200 rounded text-[9px]">↑</kbd> <kbd className="px-1 py-0.2 bg-white border border-slate-200 rounded text-[9px]">↓</kbd></span>
            <span>Select: <kbd className="px-1 py-0.2 bg-white border border-slate-200 rounded text-[9px]">↵</kbd></span>
          </div>
          <span>Cadence Intelligence Quick Dispatch</span>
        </div>
      </div>
    </div>
  );
};
