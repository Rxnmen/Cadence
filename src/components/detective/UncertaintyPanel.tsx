import React from 'react';
import { ConfidenceLevel } from '../../types/patient';
import {
  Gauge,
  PlusCircle,
  MinusCircle,
  ShieldCheck,
  Info,
} from 'lucide-react';

interface UncertaintyPanelProps {
  confidence: ConfidenceLevel;
  confidenceScore?: number;
  increases: string[];
  reduces: string[];
}

export const UncertaintyPanel: React.FC<UncertaintyPanelProps> = ({
  confidence,
  confidenceScore = 64,
  increases,
  reduces,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/85 p-5 sm:p-6 shadow-2xs card-elevation-2 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-2xs">
              <Gauge className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              How confident are we?
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Explicit quantification of confidence and sensitivity boundaries to prevent premature clinical assumptions.
          </p>
        </div>

        <span className="text-[11px] font-bold text-sky-900 bg-sky-50/80 px-3 py-1.5 rounded-xl border border-sky-200/80 self-start sm:self-auto shadow-2xs">
          Assessment Confidence: {confidence} ({confidenceScore}%)
        </span>
      </div>

      {/* Main Confidence Readout */}
      <div className="p-4.5 bg-slate-50/90 rounded-2xl border border-slate-200/90 space-y-3 shadow-inner">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">
            Confidence Index: {confidence}
          </span>
          <span className="text-xs font-mono text-slate-600 font-bold">
            {confidenceScore} / 100
          </span>
        </div>

        {/* Confidence Progress Bar */}
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-sky-600 rounded-full transition-all duration-1000"
            style={{ width: `${confidenceScore}%` }}
          />
        </div>

        <p className="text-xs text-slate-700 leading-relaxed font-normal">
          Several independent signals point toward a potential adherence concern, but available observational data <strong>cannot confirm missed doses</strong>.
        </p>
      </div>

      {/* Two Columns: Factors that Increase vs Reduce Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
        {/* What would increase confidence */}
        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-2.5 shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-emerald-950">
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>What would increase confidence?</span>
          </div>

          <ul className="space-y-2 text-slate-700">
            {increases.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What could reduce confidence */}
        <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-200/80 space-y-2.5 shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-sky-950">
            <MinusCircle className="w-4 h-4 text-sky-600" />
            <span>What could reduce confidence?</span>
          </div>

          <ul className="space-y-2 text-slate-700">
            {reduces.map((item, idx) => (
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
