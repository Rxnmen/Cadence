import React, { useState, useEffect } from 'react';
import { useApp, DateFilter } from '../../context/AppContext';
import { CommandPalette } from '../common/CommandPalette';
import {
  Search,
  SlidersHorizontal,
  Command,
  Sun,
  Moon,
  LogOut,
  Atom,
  ShieldCheck,
  Bell,
  Sparkles,
  User,
} from 'lucide-react';

interface TopbarProps {
  onOpenMobileMenu?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileMenu }) => {
  const {
    doctor,
    logout,
    theme,
    toggleTheme,
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

  return (
    <>
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      <header className={`sticky top-0 z-30 px-4 sm:px-6 py-3 backdrop-blur-md border-b transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#090d16]/90 border-slate-800/90 text-slate-100'
          : 'bg-white/90 border-slate-200/90 text-slate-900'
      }`}>
        <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
          {/* Left: Mobile Toggle + Anti-Gravity AI Platform Branding */}
          <div className="flex items-center gap-3">
            {onOpenMobileMenu && (
              <button
                onClick={onOpenMobileMenu}
                className={`md:hidden p-2 rounded-xl border transition-colors cursor-pointer ${
                  theme === 'dark'
                    ? 'border-slate-800 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                aria-label="Open Navigation"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            )}

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 animate-float-slow">
                <Atom className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">
                    Anti-Gravity
                  </span>
                  <span className={`text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.2 rounded border ${
                    theme === 'dark'
                      ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60'
                      : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                  }`}>
                    AI Health
                  </span>
                </div>
                <span className={`text-[10px] block leading-none ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Clinical Decision Platform
                </span>
              </div>
            </div>
          </div>

          {/* Center/Right: Quick Search + Theme Toggle + Doctor Avatar & Info + Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Command Palette Trigger (Cmd+K) */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer shadow-2xs ${
                theme === 'dark'
                  ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border-slate-200'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-cyan-500" />
              <span>Search patients or actions...</span>
              <kbd className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                theme === 'dark'
                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                  : 'bg-white text-slate-500 border-slate-200'
              }`}>
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>

            {/* Dark/Light Mode Toggle Switch (Requirement) */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
                theme === 'dark'
                  ? 'bg-slate-900/90 text-amber-300 border-slate-800 hover:bg-slate-800'
                  : 'bg-slate-50 text-indigo-700 border-slate-200 hover:bg-slate-100'
              }`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Alerts Quick Counter */}
            <button
              onClick={() => setActiveView('alerts')}
              className={`relative p-2 rounded-xl border transition-colors cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Clinical Alerts"
            >
              <Bell className="w-4 h-4" />
              {pendingAlerts > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {pendingAlerts}
                </span>
              )}
            </button>

            {/* Doctor Profile Details & Avatar (Requirement) */}
            <div className={`flex items-center gap-2.5 pl-2 py-1 pr-3 rounded-2xl border transition-all ${
              theme === 'dark'
                ? 'bg-slate-900/80 border-slate-800/90'
                : 'bg-slate-50 border-slate-200/90'
            }`}>
              <div className="relative">
                <img
                  src={doctor.avatarUrl}
                  alt={doctor.name}
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-cyan-500/40"
                  onError={(e) => {
                    // Fallback to avatar icon
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
              </div>

              <div className="hidden sm:block text-left leading-tight">
                <div className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
                  {doctor.name}
                </div>
                <span className="text-[10px] text-cyan-400 font-medium block">
                  Attending Clinician
                </span>
              </div>
            </div>

            {/* Logout Button (Requirement) */}
            <button
              onClick={logout}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer active:scale-95 ${
                theme === 'dark'
                  ? 'bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border-rose-800/60'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
              }`}
              title="Sign Out of Anti-Gravity Platform"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
