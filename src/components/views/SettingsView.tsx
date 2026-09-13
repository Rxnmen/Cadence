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
  const { logout } = useApp();
  const [riskThreshold, setRiskThreshold] = useState<number>(65);
  const [enforceNonPunitiveLanguage, setEnforceNonPunitiveLanguage] = useState<boolean>(true);
  const [enableWearableStream, setEnableWearableStream] = useState<boolean>(true);
  const [enableAlternativeEngine, setEnableAlternativeEngine] = useState<boolean>(true);
  const [savedToast, setSavedToast] = useState<boolean>(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

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
      <div className="relative overflow-hidden bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 flex items-center justify-center shadow-xs">
            <Settings className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Platform Settings & Clinical Governance
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure decision-support thresholds, ethical AI language safeguards, and simulation controls.
            </p>
          </div>
        </div>
      </div>

      {/* Clinician Profile */}
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Active Clinician Credentials & NPI
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Active Session
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Physician Name
            </span>
            <span className="text-sm font-bold text-slate-900 block">
              Dr. Maya Sharma, MD
            </span>
            <span className="text-slate-500 text-[11px] block">Cardiology & Internal Medicine</span>
          </div>

          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              National Provider ID (NPI)
            </span>
            <span className="text-sm font-mono font-bold text-slate-900 block">
              8829104812
            </span>
            <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified via NPPES
            </span>
          </div>

          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Practice Affiliation
            </span>
            <span className="text-sm font-bold text-slate-900 block">
              Metropolitan Heart & Health
            </span>
            <span className="text-slate-500 text-[11px] block">Clinic ID: MHH-WEST-3</span>
          </div>
        </div>
      </div>

      {/* Ethical AI & Language Safeguards */}
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Ethical AI Safeguards & Tone Enforcement
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
            Mandatory Protocol
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-start gap-3.5 p-4 bg-slate-50/80 rounded-xl border border-slate-200/90 cursor-pointer hover:border-slate-300 transition-colors group">
            <div className="relative inline-flex items-center mt-0.5 cursor-pointer">
              <input
                type="checkbox"
                checked={enforceNonPunitiveLanguage}
                onChange={(e) => setEnforceNonPunitiveLanguage(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600" />
            </div>
            <div className="space-y-1 flex-1">
              <span className="font-bold text-slate-900 block group-hover:text-teal-900 transition-colors">
                Enforce Non-Punitive Medical Language
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Restricts terminology across all AI assistants, summaries, and dossiers. Prohibits “Patient is non-compliant”; enforces “Possible adherence concern” or “Pattern requiring supportive clinical review”.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3.5 p-4 bg-slate-50/80 rounded-xl border border-slate-200/90 cursor-pointer hover:border-slate-300 transition-colors group">
            <div className="relative inline-flex items-center mt-0.5 cursor-pointer">
              <input
                type="checkbox"
                checked={enableAlternativeEngine}
                onChange={(e) => setEnableAlternativeEngine(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600" />
            </div>
            <div className="space-y-1 flex-1">
              <span className="font-bold text-slate-900 block group-hover:text-teal-900 transition-colors">
                Alternative Explanation & Confounder Engine
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Automatically cross-checks EHR prescription titration notes, hospital starter packs, supply surpluses, and pharmacy stock delays before elevating risk index.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Threshold Sliders */}
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Clinical Alert Sensitivity Threshold
            </h3>
          </div>
          <span className="text-xs text-slate-500">Cohort Rule Engine</span>
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex justify-between items-center">
            <span className="text-slate-700 font-semibold">
              Flag for Clinical Triage when Risk Index exceeds:
            </span>
            <span className="font-bold text-sm text-sky-700 font-mono bg-sky-50 px-3 py-1 rounded-xl border border-sky-200">
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
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-medium pt-1">
            <span>40 (High Sensitivity — Early Detection)</span>
            <span className="text-sky-700 font-semibold">65 (Balanced Standard)</span>
            <span>85 (Conservative — High Specificity)</span>
          </div>
        </div>

        <div className="pt-5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-slate-900 hover:bg-sky-600 active:scale-95 text-white font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Save Clinical Preferences
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80 font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>End Clinical Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
