import React from 'react';
import { useApp, ActiveView } from '../../context/AppContext';
import {
  Users,
  Bot,
  BarChart3,
  Settings,
  Search,
  Bell,
  FileText,
  Database,
  X,
  Atom,
  Activity,
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { activeView, setActiveView, openDetective, alerts, theme } = useApp();
  const pendingAlerts = alerts.filter((a) => a.status === 'pending').length;

  if (!isOpen) return null;

  const primaryItems: { id: ActiveView; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Command Center', icon: Activity, badge: 'Live' },
    { id: 'patients', label: 'Patient Management', icon: Users, badge: '7' },
    { id: 'ai-assistants', label: 'AI Medical Assistants', icon: Bot, badge: 'Active' },
    { id: 'analytics', label: 'Diagnostics & Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ];

  const secondaryItems: { id: ActiveView; label: string; icon: React.FC<{ className?: string }>; action?: () => void }[] = [
    { id: 'insights', label: 'Adherence Detective', icon: Search, action: () => openDetective('pt-1042') },
    { id: 'alerts', label: 'Clinical Alerts', icon: Bell },
    { id: 'reports', label: 'Reports & Dossiers', icon: FileText },
    { id: 'data-sources', label: 'Data Feeds', icon: Database },
  ];

  return (
    <div
      className="fixed inset-0 z-50 md:hidden bg-slate-950/70 backdrop-blur-sm flex"
      onClick={onClose}
    >
      <div
        className={`w-4/5 max-w-xs h-full shadow-2xl flex flex-col p-5 transition-colors ${
          theme === 'dark' ? 'bg-[#090d16] text-slate-100 border-r border-slate-800' : 'bg-white text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between pb-4 border-b ${
          theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white">
              <Atom className="w-5 h-5" />
            </div>
            <span className="font-black text-sm tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              CADENCE
            </span>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg cursor-pointer ${
              theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 py-4 space-y-4 overflow-y-auto">
          <div className="space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 px-2 pb-1">
              Core Navigation
            </div>
            {primaryItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-sky-50 text-sky-800 border border-sky-200 font-bold'
                      : theme === 'dark'
                      ? 'text-slate-300 hover:bg-slate-900'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-cyan-500" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className={`space-y-1 border-t pt-3 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
            <div className={`text-[10px] uppercase font-bold px-2 pb-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Clinical Intelligence
            </div>
            {secondaryItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      setActiveView(item.id);
                    }
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium cursor-pointer ${
                    isActive
                      ? 'text-cyan-400 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
