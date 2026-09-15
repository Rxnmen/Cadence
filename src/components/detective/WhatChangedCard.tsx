import React from 'react';
import { BaselineComparison } from '../../types/patient';
import { useApp } from '../../context/AppContext';
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
  const { theme } = useApp();
  const safeBaseline = baseline && baseline.length > 0 ? baseline : [];

  return (
    <div className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-5 transition-all duration-300 ${
      theme === 'dark'
        ? 'bg-slate-900/85 border-slate-800 text-slate-100 shadow-black/20'
        : 'bg-white border-slate-200/85 text-slate-900 shadow-2xs'
    }`}>
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
        theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shadow-2xs ${
              theme === 'dark' ? 'bg-teal-950/60 border-teal-800/60 text-teal-400' : 'bg-teal-50 border-teal-200 text-teal-600'
            }`}>
              <GitCompare className="w-4 h-4" />
            </div>
            <h3 className={`text-base font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              What Changed?
            </h3>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-2xs ${
              theme === 'dark' ? 'bg-teal-950/60 text-teal-300 border-teal-800/60' : 'bg-teal-50 text-teal-800 border-teal-200'
            }`}>
              Personalized Baseline
            </span>
          </div>
          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Comparing the patient's current observational period directly against their verified personal historical norms.
          </p>
        </div>

        <div className={`text-[11px] font-semibold px-3 py-1.5 rounded-xl border self-start sm:self-auto shadow-2xs ${
          theme === 'dark'
            ? 'bg-slate-800 border-slate-700 text-slate-300'
            : 'bg-slate-50 border-slate-200/80 text-slate-600'
        }`}>
          Baseline Calibration: <strong className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Prior 6 Months</strong>
        </div>
      </div>

      {/* Baseline Comparison Grid */}
      {safeBaseline.length === 0 ? (
        <div className={`p-8 text-center rounded-2xl border border-dashed text-xs ${
          theme === 'dark'
            ? 'bg-slate-950/40 border-slate-800 text-slate-400'
            : 'bg-slate-50/80 border-slate-200 text-slate-500'
        }`}>
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
                    ? theme === 'dark'
                      ? 'bg-amber-950/20 border-amber-800/50 shadow-2xs'
                      : 'bg-gradient-to-b from-amber-50/50 to-amber-50/20 border-amber-200/90 shadow-2xs'
                    : isBorderline
                    ? theme === 'dark'
                      ? 'bg-cyan-950/20 border-cyan-800/50 shadow-2xs'
                      : 'bg-gradient-to-b from-sky-50/40 to-sky-50/10 border-sky-200/80 shadow-2xs'
                    : theme === 'dark'
                    ? 'bg-slate-800/40 border-slate-800 shadow-2xs'
                    : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <div>
                  {/* Category & Delta Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border shadow-2xs ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-700 text-slate-400'
                        : 'bg-white border-slate-200/90 text-slate-600'
                    }`}>
                      {item.category}
                    </span>
                    {isConcerning && (
                      <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                        theme === 'dark'
                          ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                          : 'bg-amber-100/80 text-amber-800 border-amber-200'
                      }`}>
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        {item.deltaText}
                      </span>
                    )}
                  </div>

                  <h4 className={`font-bold text-xs mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {item.metricName}
                  </h4>

                  {/* Before / After Transformation Box */}
                  <div className={`flex items-center justify-between p-3 rounded-xl border mb-3 shadow-2xs ${
                    theme === 'dark'
                      ? 'bg-slate-950/70 border-slate-800'
                      : 'bg-white/95 border-slate-200/85'
                  }`}>
                    <div className="text-left">
                      <span className="text-[10px] font-medium text-slate-400 block">
                        Historical Norm
                      </span>
                      <span className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {item.normalBaseline}
                      </span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 mx-2" />

                    <div className="text-right">
                      <span className="text-[10px] font-medium text-slate-400 block">
                        Current Period
                      </span>
                      <span
                        className={`text-xs font-extrabold ${
                          isConcerning
                            ? 'text-amber-400'
                            : isBorderline
                            ? 'text-cyan-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {item.currentObserved}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Clinical Explanation */}
                <p className={`text-[11px] leading-snug pt-2 border-t ${
                  theme === 'dark'
                    ? 'border-slate-800 text-slate-400'
                    : 'border-slate-100/80 text-slate-600'
                }`}>
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
