import React, { useState } from 'react';
import { useApp, ActiveView } from '../../context/AppContext';
import {
  Users,
  Bot,
  BarChart3,
  Settings,
  Atom,
  Sparkles,
  ShieldCheck,
  Search,
  Bell,
  FileText,
  Database,
  ChevronRight,
  Activity,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '', onItemClick }) => {
  const { activeView, setActiveView, patients, alerts, theme, doctor, openDetective } = useApp();

  const highRiskCount = patients.filter((p) => p.riskLevel === 'High' || p.riskCategory === 'High Priority').length;
  const pendingAlertsCount = alerts.filter((a) => a.status === 'pending').length;

  // The 4 Primary Tabs required by user specification
  const primaryTabs: {
    id: ActiveView;
    label: string;
    description: string;
    icon: React.FC<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    {
      id: 'patients',
      label: 'Patient Management',
      description: 'Queue & risk triage',
      icon: Users,
      badge: `${patients.length} Total`,
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    },
    {
      id: 'ai-assistants',
      label: 'AI Medical Assistants',
      description: 'Chat, Scans & Interactions',
      icon: Bot,
      badge: '3 Copilots',
      badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    },
    {
      id: 'analytics',
      label: 'Diagnostics & Analytics',
      description: 'Cohort vitals & telemetry',
      icon: BarChart3,
      badge: '99.4% Acc',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Preferences & AI rules',
      icon: Settings,
    },
  ];

  // Secondary Clinical Intelligence Tools
  const secondaryTools: {
    id: ActiveView;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: string | number;
    action?: () => void;
  }[] = [
    {
      id: 'insights',
      label: 'Adherence Detective',
      icon: Search,
      badge: 'Deep Dive',
      action: () => openDetective('pt-1042'),
    },
    {
      id: 'alerts',
      label: 'Triage Alerts',
      icon: Bell,
      badge: pendingAlertsCount > 0 ? pendingAlertsCount : undefined,
    },
    {
      id: 'reports',
      label: 'Clinical Dossiers',
      icon: FileText,
    },
    {
      id: 'data-sources',
      label: 'Signal Connectors',
      icon: Database,
      badge: '5 Active',
    },
  ];

  const handleSelect = (id: ActiveView, customAction?: () => void) => {
    if (customAction) {
      customAction();
    } else {
      setActiveView(id);
    }
    if (onItemClick) onItemClick();
  };

  return (
    <aside
      className={`w-72 flex flex-col h-screen shrink-0 sticky top-0 select-none z-40 transition-colors duration-300 border-r ${
        theme === 'dark'
          ? 'bg-[#090d16]/95 border-slate-800/80 text-slate-100'
          : 'bg-white/95 border-slate-200/90 text-slate-900'
      } ${className}`}
    >
      {/* Brand Header */}
      <div className={`p-5 border-b flex items-center justify-between ${
        theme === 'dark' ? 'border-slate-800/80' : 'border-slate-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 animate-float-slow">
            <Atom className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-sm tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 block">
              ANTI-GRAVITY
            </span>
            <span className={`text-[10px] uppercase font-bold tracking-widest block ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              AI Health System
            </span>
          </div>
        </div>

        <div className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 border ${
          theme === 'dark'
            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Navigation Body */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {/* Core Navigation Section */}
        <div className="space-y-1.5">
          <div className={`px-3 text-[10px] font-extrabold uppercase tracking-widest ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Core Navigation
          </div>

          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleSelect(tab.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer group ${
                  isActive
                    ? theme === 'dark'
                      ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 text-cyan-300 border border-cyan-700/50 shadow-sm shadow-cyan-950/50'
                      : 'bg-gradient-to-r from-cyan-50 to-sky-50 text-sky-900 border border-sky-200 shadow-sm'
                    : theme === 'dark'
                    ? 'text-slate-300 hover:bg-slate-900/60 hover:text-white border border-transparent'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-sky-600 text-white shadow-xs'
                        : theme === 'dark'
                        ? 'bg-slate-800/80 text-slate-400 group-hover:text-cyan-400'
                        : 'bg-slate-100 text-slate-500 group-hover:text-sky-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-xs">{tab.label}</div>
                    <div className={`text-[10px] font-normal ${
                      isActive
                        ? theme === 'dark' ? 'text-cyan-400/80' : 'text-sky-700'
                        : 'text-slate-400'
                    }`}>
                      {tab.description}
                    </div>
                  </div>
                </div>

                {tab.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      tab.badgeColor || (theme === 'dark' ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200')
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Specialized Intelligence Cockpits */}
        <div className="space-y-1">
          <div className={`px-3 text-[10px] font-extrabold uppercase tracking-widest ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Intelligence Suites
          </div>

          {secondaryTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeView === tool.id;

            return (
              <button
                key={tool.id}
                onClick={() => handleSelect(tool.id, tool.action)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? theme === 'dark'
                      ? 'bg-slate-800 text-cyan-400 font-bold'
                      : 'bg-slate-100 text-slate-900 font-bold'
                    : theme === 'dark'
                    ? 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{tool.label}</span>
                </div>

                {tool.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    {tool.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Clinician Bottom Card */}
      <div className={`p-4 border-t ${
        theme === 'dark' ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-100 bg-slate-50/70'
      }`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={doctor.avatarUrl}
              alt={doctor.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-cyan-500/30"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
          </div>

          <div className="overflow-hidden text-left flex-1">
            <div className={`text-xs font-bold truncate ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>
              {doctor.name}
            </div>
            <div className="text-[10px] text-cyan-400 truncate">
              NPI: {doctor.npi}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
