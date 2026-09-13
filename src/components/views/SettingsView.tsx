import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  ShieldCheck,
  Bell,
  Sliders,
  RotateCcw,
  CheckCircle2,
  Lock,
  User,
  Sparkles,
  LogOut,
  Building2,
  Key,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { logout, doctor, theme } = useApp();
  const [riskThreshold, setRiskThreshold] = useState<number>(65);
  const [enforceNonPunitiveLanguage, setEnforceNonPunitiveLanguage] = useState<boolean>(true);
  const [enableWearableStream, setEnableWearableStream] = useState<boolean>(true);
  const [enableAlternativeEngine, setEnableAlternativeEngine] = useState<boolean>(true);
  const [savedToast, setSavedToast] = useState<boolean>(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 pb-16 max-w-4xl">
      {/* Toast */}
      {savedToast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2.5 border border-slate-700/60 animate-in fade-in slide-in-from-top-3">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <span>Clinical settings & governance preferences updated successfully.</span>
        </div>
      )}

      {/* Header Banner */}
      <div className={`relative overflow-hidden p-6 rounded-2xl border transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white/90 border-slate-200/80 text-slate-900'
      } shadow-2xs`}>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-xs">
            <Settings className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Platform Settings & Clinical Governance
            </h2>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Configure decision-support thresholds, ethical AI language safeguards, and simulation controls.
            </p>
          </div>
        </div>
      </div>

      {/* Clinician Profile */}
      <div className={`p-6 rounded-2xl border transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80'
      } shadow-2xs space-y-4`}>
        <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-sky-50 text-sky-600'}`}>
              <User className="w-4 h-4" />
            </div>
            <h3 className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
              Active Clinician Credentials & NPI
            </h3>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
            isDark ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}>
            <ShieldCheck className="w-3 h-3 text-emerald-500" /> Active Session
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className={`p-4 rounded-xl border space-y-1 ${
            isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50/80 border-slate-100 text-slate-700'
          }`}>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Physician Name
            </span>
            <span className={`text-sm font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {doctor.name}
            </span>
            <span className={`text-[11px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {doctor.specialty}
            </span>
          </div>

          <div className={`p-4 rounded-xl border space-y-1 ${
            isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50/80 border-slate-100 text-slate-700'
          }`}>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              National Provider ID (NPI)
            </span>
            <span className={`text-sm font-mono font-bold block ${isDark ? 'text-cyan-400' : 'text-slate-900'}`}>
              {doctor.npi}
            </span>
            <span className="text-emerald-500 font-semibold text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Verified via NPPES Registry
            </span>
          </div>

          <div className={`p-4 rounded-xl border space-y-1 ${
            isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50/80 border-slate-100 text-slate-700'
          }`}>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Practice Affiliation
            </span>
            <span className={`text-sm font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {doctor.clinicAffiliation}
            </span>
            <span className={`text-[11px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {doctor.email}
            </span>
          </div>
        </div>
      </div>

      {/* Ethical AI & Language Safeguards */}
      <div className={`p-6 rounded-2xl border transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80'
      } shadow-2xs space-y-4`}>
        <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? 'bg-teal-500/10 text-teal-400' : 'bg-teal-50 text-teal-600'}`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
              Ethical AI Safeguards & Tone Enforcement
            </h3>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
            isDark ? 'bg-teal-950/60 text-teal-400 border-teal-800/60' : 'bg-teal-50 text-teal-800 border-teal-200'
          }`}>
            Mandatory Protocol
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <label className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-colors group ${
            isDark ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700' : 'bg-slate-50/80 border-slate-200/90 hover:border-slate-300'
          }`}>
            <div className="relative inline-flex items-center mt-0.5 cursor-pointer">
              <input
                type="checkbox"
                checked={enforceNonPunitiveLanguage}
                onChange={(e) => setEnforceNonPunitiveLanguage(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500" />
            </div>
            <div className="space-y-1 flex-1">
              <span className={`font-bold block transition-colors ${isDark ? 'text-slate-200 group-hover:text-teal-300' : 'text-slate-900 group-hover:text-teal-900'}`}>
                Enforce Non-Punitive Medical Language
              </span>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Restricts terminology across all AI assistants, summaries, and dossiers. Prohibits “Patient is non-compliant”; enforces “Possible adherence concern” or “Pattern requiring supportive clinical review”.
              </p>
            </div>
          </label>

          <label className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-colors group ${
            isDark ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700' : 'bg-slate-50/80 border-slate-200/90 hover:border-slate-300'
          }`}>
            <div className="relative inline-flex items-center mt-0.5 cursor-pointer">
              <input
                type="checkbox"
                checked={enableAlternativeEngine}
                onChange={(e) => setEnableAlternativeEngine(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500" />
            </div>
            <div className="space-y-1 flex-1">
              <span className={`font-bold block transition-colors ${isDark ? 'text-slate-200 group-hover:text-teal-300' : 'text-slate-900 group-hover:text-teal-900'}`}>
                Alternative Explanation & Confounder Engine
              </span>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Automatically cross-checks EHR prescription titration notes, hospital starter packs, supply surpluses, and pharmacy stock delays before elevating risk index.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Threshold Sliders */}
      <div className={`p-6 rounded-2xl border transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80'
      } shadow-2xs space-y-4 text-xs`}>
        <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-sky-50 text-sky-600'}`}>
              <Sliders className="w-4 h-4" />
            </div>
            <h3 className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
              Clinical Alert Sensitivity Threshold
            </h3>
          </div>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Cohort Rule Engine</span>
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex justify-between items-center">
            <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Flag for Clinical Triage when Risk Index exceeds:
            </span>
            <span className={`font-bold text-sm font-mono px-3 py-1 rounded-xl border ${
              isDark ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60' : 'bg-sky-50 text-sky-700 border-sky-200'
            }`}>
              {riskThreshold} / 100
            </span>
          </div>

          <input
            type="range"
            min="40"
            max="85"
            step="5"
            value={riskThreshold}
            onChange={(e) => setRiskThreshold(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-medium pt-1">
            <span>40 (High Sensitivity — Early Detection)</span>
            <span className={isDark ? 'text-cyan-400 font-semibold' : 'text-sky-700 font-semibold'}>65 (Balanced Standard)</span>
            <span>85 (Conservative — High Specificity)</span>
          </div>
        </div>

        <div className={`pt-5 border-t flex items-center justify-between flex-wrap gap-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <button
            onClick={handleSave}
            className={`px-5 py-2.5 font-semibold rounded-xl shadow-xs transition-all cursor-pointer ${
              isDark
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-cyan-500/20'
                : 'bg-slate-900 hover:bg-sky-600 text-white'
            }`}
          >
            Save Clinical Preferences
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>End Clinical Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
