import React from 'react';
import { BaselineComparison } from '../../types/patient';
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  GitCompare,
  Sparkles,
} from 'lucide-react';

interface WhatChangedCardProps {
  baseline: BaselineComparison[];
}

export const WhatChangedCard: React.FC<WhatChangedCardProps> = ({ baseline = [] }) => {
  const safeBaseline = baseline && baseline.length > 0 ? baseline : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/85 p-5 sm:p-6 shadow-2xs card-elevation-2 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 shadow-2xs">
              <GitCompare className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              What Changed?
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs">
              Personalized Baseline
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Comparing the patient's current observational period directly against their verified personal historical norms.
          </p>
        </div>

        <div className="text-[11px] font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 self-start sm:self-auto shadow-2xs">
          Baseline Calibration: <strong className="text-slate-900">Prior 6 Months</strong>
        </div>
      </div>

      {/* Baseline Comparison Grid */}
      {safeBaseline.length === 0 ? (
        <div className="p-8 text-center bg-slate-50/80 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-500">
          All continuous telemetry metrics and dispense cadence match this patient's verified 6-month historical baseline.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {safeBaseline.map((item, idx) => {
          const isConcerning = item.status === 'concerning';
          const isBorderline = item.status === 'borderline';

          return (
            <div
              key={idx}
              className={`p-4.5 rounded-2xl border transition-all card-elevation-hover flex flex-col justify-between ${
                isConcerning
                  ? 'bg-gradient-to-b from-amber-50/50 to-amber-50/20 border-amber-200/90 shadow-2xs'
                  : isBorderline
                  ? 'bg-gradient-to-b from-sky-50/40 to-sky-50/10 border-sky-200/80 shadow-2xs'
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div>
                {/* Category & Delta Badge */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200/90 text-slate-600 shadow-2xs">
                    {item.category}
                  </span>
                  {isConcerning && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-200">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      {item.deltaText}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-xs text-slate-900 mb-3">
                  {item.metricName}
                </h4>

                {/* Before / After Transformation Box */}
                <div className="flex items-center justify-between bg-white/95 p-3 rounded-xl border border-slate-200/85 mb-3 shadow-2xs">
                  <div className="text-left">
                    <span className="text-[10px] font-medium text-slate-400 block">
                      Historical Norm
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {item.normalBaseline}
                    </span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-sky-500 shrink-0 mx-2" />

                  <div className="text-right">
                    <span className="text-[10px] font-medium text-slate-400 block">
                      Current Period
                    </span>
                    <span
                      className={`text-xs font-extrabold ${
                        isConcerning
                          ? 'text-amber-700'
                          : isBorderline
                          ? 'text-sky-700'
                          : 'text-emerald-700'
                      }`}
                    >
                      {item.currentObserved}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clinical Explanation */}
              <p className="text-[11px] text-slate-600 leading-snug pt-2 border-t border-slate-100/80">
                {item.explanation}
              </p>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};
