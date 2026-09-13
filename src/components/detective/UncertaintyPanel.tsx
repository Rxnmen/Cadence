import React from 'react';
import { ConfidenceLevel } from '../../types/patient';
import {
  ShieldAlert,
  HelpCircle,
  PlusCircle,
  MinusCircle,
  Gauge,
  Sparkles,
} from 'lucide-react';

interface UncertaintyPanelProps {
  confidence: ConfidenceLevel;
  confidenceScore?: number; // e.g. 64%
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
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-sky-600" />
            <h3 className="text-base font-bold text-slate-900">
              How confident are we?
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Explicit quantification of confidence and sensitivity boundaries to prevent premature clinical assumptions.
          </p>
        </div>

        <span className="text-[11px] font-semibold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200/80 self-start sm:self-auto">
          Confidence Level: {confidence} ({confidenceScore}%)
        </span>
      </div>

      {/* Main Confidence Readout */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">
            Current Assessment Confidence: {confidence}
          </span>
          <span className="text-xs font-mono text-slate-500 font-medium">
            Index: {confidenceScore} / 100
          </span>
        </div>

        {/* Confidence Progress Bar */}
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-sky-600 rounded-full transition-all duration-700"
            style={{ width: `${confidenceScore}%` }}
          />
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">
          Several independent signals point toward a potential adherence concern, but the available routinely collected observational data <strong>cannot confirm missed doses</strong>.
        </p>
      </div>

      {/* Two Columns: What Increases vs Reduces Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
        {/* What would increase confidence */}
        <div className="p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-200/70 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900">
            <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>What would increase confidence?</span>
          </div>

          <ul className="space-y-1.5 text-slate-700">
            {increases.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What could reduce confidence */}
        <div className="p-3.5 bg-sky-50/40 rounded-xl border border-sky-200/70 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-sky-950">
            <MinusCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>What could reduce confidence?</span>
          </div>

          <ul className="space-y-1.5 text-slate-700">
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
