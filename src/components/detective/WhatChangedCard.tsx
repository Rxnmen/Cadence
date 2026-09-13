import React from 'react';
import { BaselineComparison } from '../../types/patient';
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  GitCompare,
  Sparkles,
} from 'lucide-react';

interface WhatChangedCardProps {
  baseline: BaselineComparison[];
}

export const WhatChangedCard: React.FC<WhatChangedCardProps> = ({ baseline }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">What Changed?</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200">
              Personalized Baseline
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Comparing the patient's current observational period directly against their personal historical baseline.
          </p>
        </div>

        <div className="text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 self-start sm:self-auto">
          Baseline window: <strong className="text-slate-800">Prior 6 Months</strong>
        </div>
      </div>

      {/* Baseline Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {baseline.map((item, idx) => {
          const isConcerning = item.status === 'concerning';
          const isBorderline = item.status === 'borderline';

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all hover:shadow-sm flex flex-col justify-between ${
                isConcerning
                  ? 'bg-amber-50/40 border-amber-200/90'
                  : isBorderline
                  ? 'bg-sky-50/30 border-sky-200/70'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div>
                {/* Metric Title & Category */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/90 border border-slate-200 text-slate-600">
                    {item.category}
                  </span>
                  {isConcerning && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-800">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      {item.deltaText}
                    </span>
                  )}
                </div>

                <div className="font-bold text-xs text-slate-900 mb-2">
                  {item.metricName}
                </div>

                {/* Before / After Transformation visual */}
                <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200/80 mb-2.5 shadow-2xs">
                  {/* Personal Baseline */}
                  <div className="text-left">
                    <span className="text-[10px] font-medium text-slate-400 block">
                      Historical Baseline
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      {item.normalBaseline}
                    </span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mx-1.5" />

                  {/* Current Period */}
                  <div className="text-right">
                    <span className="text-[10px] font-medium text-slate-400 block">
                      Current Period
                    </span>
                    <span
                      className={`text-xs font-bold ${
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
              <p className="text-[11px] text-slate-600 leading-snug pt-1 border-t border-slate-100">
                {item.explanation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
