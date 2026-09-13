import React from 'react';
import { useApp, ActiveView } from '../../context/AppContext';
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
  X,
} from 'lucide-react';
import { CadenceLogo } from '../common/CadenceLogo';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { activeView, setActiveView, openDetective, alerts } = useApp();
  const pendingAlerts = alerts.filter((a) => a.status === 'pending').length;

  if (!isOpen) return null;

  const items: { id: ActiveView; label: string; icon: React.FC<{ className?: string }>; badge?: string | number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'insights', label: 'Adherence Insights', icon: Search, badge: 'Detective' },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: pendingAlerts },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
    { id: 'data-sources', label: 'Data Sources', icon: Database },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden bg-slate-900/50 backdrop-blur-xs flex">
      <div className="w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col p-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <CadenceLogo size="sm" />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 py-4 space-y-1 overflow-y-auto">
          {items.map((item) => {
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
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium ${
                  isActive
                    ? 'bg-sky-50 text-sky-900 font-semibold border border-sky-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-sky-600" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
