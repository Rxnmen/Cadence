import React, { useState } from 'react';
import { useApp, ActiveView } from '../../context/AppContext';
import { CadenceLogo } from '../common/CadenceLogo';
import {
  LayoutDashboard,
  Users,
  Search,
  Bell,
  BarChart3,
  Bot,
  Database,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { activeView, setActiveView, alerts, logout, openDetective } = useApp();
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  const pendingAlertsCount = alerts.filter((a) => a.status === 'pending').length;

  const navItems: { id: ActiveView; label: string; icon: React.FC<{ className?: string }>; badge?: number | string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'insights', label: 'Adherence Insights', icon: Search, badge: 'Detective' },
    { id: 'alerts', label: 'Alerts Queue', icon: Bell, badge: pendingAlertsCount },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'assistant', label: 'AI Assistant', icon: Bot, badge: 'AI' },
    { id: 'data-sources', label: 'Data Sources', icon: Database },
    { id: 'reports', label: 'Reports & Dossier', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`w-64 bg-white/90 backdrop-blur-xl border-r border-slate-200/80 flex flex-col h-screen shrink-0 sticky top-0 select-none z-40 shadow-xs ${className}`}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <CadenceLogo size="md" showTagline={false} />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
          Clinical Platform
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'insights') {
                  openDetective('pt-1042');
                } else {
                  setActiveView(item.id);
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer group ${
                isActive
                  ? 'bg-sky-50/90 text-sky-900 border border-sky-200/90 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-700'
                  }`}
                />
                <span className="tracking-tight">{item.label}</span>
              </div>

              {/* Badges */}
              {item.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-tight shadow-2xs ${
                    item.id === 'insights'
                      ? 'bg-sky-100 text-sky-800 border border-sky-200'
                      : item.id === 'assistant'
                      ? 'bg-teal-100 text-teal-800 border border-teal-200'
                      : typeof item.badge === 'number' && item.badge > 0
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Quick Launch Card */}
        <div className="pt-4 px-1">
          <div className="p-3.5 bg-gradient-to-br from-sky-50 via-teal-50/40 to-transparent border border-sky-100 rounded-2xl space-y-2.5 shadow-2xs">
            <div className="flex items-center gap-2 text-sky-950 font-bold text-xs">
              <Activity className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
              <span>Adherence Detective</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Connect multiple routinely available healthcare clues for patient A. Rao.
            </p>
            <button
              onClick={() => openDetective('pt-1042')}
              className="w-full py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-bold rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3 h-3" />
              <span>Investigate PT-1042</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Clinician Profile Footer */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-50/60 relative">
        <div
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center justify-between p-2 rounded-xl hover:bg-white hover:shadow-xs border border-transparent hover:border-slate-200/80 cursor-pointer transition-all"
        >
          <div className="flex items-center gap-2.5">
            {/* Avatar with Luminous Online Beacon */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-600 via-teal-500 to-sky-700 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                MS
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full shadow-xs" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                Dr. Maya Sharma
              </span>
              <span className="text-[11px] text-slate-500 font-medium leading-tight">
                Healthcare Professional
              </span>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Profile Popover Menu */}
        {showProfileMenu && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 text-xs space-y-1 animate-fadeIn z-50">
            <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                Verified Clinical Access
              </div>
              <div className="text-slate-500 font-mono">NPI: 8829104812</div>
              <div className="text-emerald-700 font-semibold flex items-center gap-1.5 pt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Demo Sandbox Active
              </div>
            </div>

            <button
              onClick={() => {
                setShowProfileMenu(false);
                setActiveView('settings');
              }}
              className="w-full flex items-center gap-2 px-2.5 py-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors text-left font-medium cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <span>Practice Preferences</span>
            </button>

            <button
              onClick={() => {
                setShowProfileMenu(false);
                logout();
              }}
              className="w-full flex items-center gap-2 px-2.5 py-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left font-semibold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Sign Out of Practice</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
