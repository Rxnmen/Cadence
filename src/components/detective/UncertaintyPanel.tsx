import React from 'react';
import { ConfidenceLevel } from '../../types/patient';
import {
  Gauge,
  PlusCircle,
  MinusCircle,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface UncertaintyPanelProps {
  confidence: ConfidenceLevel;
  confidenceScore?: number;
  increases: string[];
  reduces: string[];
}

export const UncertaintyPanel: React.FC<UncertaintyPanelProps> = ({
  confidence,
  confidenceScore = 64,
  increases = [],
  reduces = [],
}) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const safeIncreases =
    increases && increases.length > 0
      ? increases
      : [
          'Concordant pharmacy claims and refill cadence verification',
          'Multi-day ambulatory telemonitoring blood pressure confirmation',
          'Direct supportive patient follow-up and care coordinator review',
        ];

  const safeReduces =
    reduces && reduces.length > 0
      ? reduces
      : [
          'Recent documented dosage modification or physician titration order',
          'Surplus medication or split-dose administration from previous fill',
          'Regional distributor pharmacy backorder or insurance barrier',
        ];

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 shadow-2xs card-elevation-2 space-y-5 transition-colors ${
        isDark ? 'bg-[#131d2e] border-slate-700/80' : 'bg-white border-slate-200/85'
      }`}
    >
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        <div>
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-2xs ${
                isDark
                  ? 'bg-sky-950/60 border border-sky-800/80 text-sky-400'
                  : 'bg-sky-50 border border-sky-200 text-sky-600'
              }`}
            >
              <Gauge className="w-4 h-4" />
            </div>
            <h3
              className={`text-base font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              How confident are we?
            </h3>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Explicit quantification of confidence and sensitivity boundaries to prevent premature clinical assumptions.
          </p>
        </div>

        <span
          className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border self-start sm:self-auto shadow-2xs ${
            isDark
              ? 'text-sky-300 bg-sky-950/60 border-sky-800/80'
              : 'text-sky-900 bg-sky-50/80 border-sky-200/80'
          }`}
        >
          Assessment Confidence: {confidence} ({confidenceScore}%)
        </span>
      </div>

      {/* Main Confidence Readout */}
      <div
        className={`p-4.5 rounded-2xl border space-y-3 shadow-inner ${
          isDark
            ? 'bg-slate-900/60 border-slate-800/90'
            : 'bg-slate-50/90 border-slate-200/90'
        }`}
      >
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Confidence Index: {confidence}
          </span>
          <span
            className={`text-xs font-mono font-bold ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {confidenceScore} / 100
          </span>
        </div>

        {/* Confidence Progress Bar */}
        <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-sky-600 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
            style={{ width: `${confidenceScore}%` }}
          />
        </div>

        <p
          className={`text-xs leading-relaxed font-normal ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          Several independent signals point toward a potential adherence concern, but available observational data <strong>cannot confirm missed doses</strong>.
        </p>
      </div>

      {/* Two Columns: Factors that Increase vs Reduce Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
        {/* What would increase confidence */}
        <div
          className={`p-4 rounded-2xl border space-y-2.5 shadow-2xs ${
            isDark
              ? 'bg-emerald-950/25 border-emerald-800/60'
              : 'bg-emerald-50/50 border-emerald-200/80'
          }`}
        >
          <div
            className={`flex items-center gap-2 font-bold ${
              isDark ? 'text-emerald-300' : 'text-emerald-950'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-500" />
            <span>What would increase confidence?</span>
          </div>

          <ul className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {safeIncreases.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What could reduce confidence */}
        <div
          className={`p-4 rounded-2xl border space-y-2.5 shadow-2xs ${
            isDark
              ? 'bg-sky-950/25 border-sky-800/60'
              : 'bg-sky-50/50 border-sky-200/80'
          }`}
        >
          <div
            className={`flex items-center gap-2 font-bold ${
              isDark ? 'text-sky-300' : 'text-sky-950'
            }`}
          >
            <MinusCircle className="w-4 h-4 text-sky-500" />
            <span>What could reduce confidence?</span>
          </div>

          <ul className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {safeReduces.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
