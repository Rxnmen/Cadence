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
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Clinical settings updated successfully.</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-sky-600" />
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Platform Settings & Clinical Governance
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Configure decision-support thresholds, ethical AI language safeguards, and simulation controls.
        </p>
      </div>

      {/* Clinician Profile */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <User className="w-4 h-4 text-sky-600" />
          <span>Active Clinician Profile</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Physician Name
            </span>
            <span className="text-sm font-bold text-slate-900 block">
              Dr. Maya Sharma, MD
            </span>
            <span className="text-slate-500 text-[11px]">Cardiology & Internal Medicine</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              National Provider ID (NPI)
            </span>
            <span className="text-sm font-mono font-bold text-slate-900 block">
              8829104812
            </span>
            <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Verified Provider
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Practice Affiliation
            </span>
            <span className="text-sm font-bold text-slate-900 block">
              Metropolitan Heart & Health
            </span>
            <span className="text-slate-500 text-[11px]">Clinic ID: MHH-WEST-3</span>
          </div>
        </div>
      </div>

      {/* Ethical AI & Language Safeguards */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Ethical AI Safeguards & Tone Enforcement
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
            Mandatory Protocol
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={enforceNonPunitiveLanguage}
              onChange={(e) => setEnforceNonPunitiveLanguage(e.target.checked)}
              className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
            />
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 block">
                Enforce Non-Punitive Medical Language
              </span>
              <p className="text-slate-600 text-[11px] leading-snug">
                Restricts terminology across all AI assistants and summaries. Never outputs “Patient is non-compliant”; mandates “Possible adherence concern” or “Pattern requiring clinical review”.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={enableAlternativeEngine}
              onChange={(e) => setEnableAlternativeEngine(e.target.checked)}
              className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
            />
            <div className="space-y-0.5">
              <span className="font-bold text-slate-900 block">
                Alternative Explanation & Confounder Engine
              </span>
              <p className="text-slate-600 text-[11px] leading-snug">
                Automatically scans EHR prescription modifications, supply surpluses, and pharmacy stock issues before elevating risk index.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Threshold Sliders */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Sliders className="w-4 h-4 text-sky-600" />
          <span>Clinical Alert Sensitivity Threshold</span>
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-700 font-semibold">
              Flag for Clinical Review when Risk Index exceeds:
            </span>
            <span className="font-bold text-sm text-sky-700 font-mono bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
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
            className="w-full accent-sky-600"
          />

          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>40 (High Sensitivity - More Flags)</span>
            <span>65 (Balanced Standard)</span>
            <span>85 (Conservative - Severe Only)</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-2xs transition-colors"
          >
            Save Clinical Preferences
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-semibold rounded-xl transition-colors"
          >
            End Clinical Session
          </button>
        </div>
      </div>
    </div>
  );
};
