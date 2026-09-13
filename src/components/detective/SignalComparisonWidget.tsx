import React, { useState } from 'react';
import { Check, ShieldAlert, Sparkles, Layers, ArrowRight } from 'lucide-react';

export const SignalComparisonWidget: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<number>(3);

  const tiers = [
    {
      level: 1,
      title: 'If we only look at Refill Claims',
      concern: 'Mild Concern',
      concernColor: 'bg-sky-50 text-sky-800 border-sky-200/90',
      signalsIncluded: ['Pharmacy Refill Claims'],
      confidence: 'Low Confidence (25%)',
      gaugeWidth: '28%',
      quote:
        'A refill delay in isolation is often just administrative noise, early stocking, or travel reserve.',
      riskScoreDisplay: '38 / 100',
    },
    {
      level: 2,
      title: 'Refill + Patient-Reported Symptoms',
      concern: 'Moderate Concern',
      concernColor: 'bg-amber-50 text-amber-800 border-amber-200/90',
      signalsIncluded: ['Pharmacy Refill Claims', 'Patient Symptom Flare-ups'],
      confidence: 'Moderate Confidence (55%)',
      gaugeWidth: '60%',
      quote:
        'When dyspnea and fatigue spikes coincide temporally with the projected supply exhaustion date, the likelihood of clinical impact rises.',
      riskScoreDisplay: '58 / 100',
    },
    {
      level: 3,
      title: 'Refill + Symptoms + Biomarkers + History',
      concern: 'Actionable Clinical Concern',
      concernColor: 'bg-rose-50 text-rose-700 border-rose-200/90',
      signalsIncluded: [
        'Pharmacy Refill Claims',
        'Patient Symptom Flare-ups',
        'Ambulatory BP Excursions',
        'Historical Pattern Recurrence',
      ],
      confidence: 'High Confidence (82%)',
      gaugeWidth: '85%',
      quote:
        'Independent biological and behavioral streams converge simultaneously. The temporal pattern strongly suggests irregular dosing rather than random noise.',
      riskScoreDisplay: '72 / 100',
    },
  ];

  const currentTier = tiers.find((t) => t.level === activeLevel) || tiers[2];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/85 p-5 sm:p-6 shadow-2xs card-elevation-2 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-2xs">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Single Signal vs. Multimodal Convergence
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-800 border border-purple-200">
              Core Thesis
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare diagnostic certainty when evaluating isolated data points versus connected multimodal patterns.
          </p>
        </div>

        <span className="text-[11px] font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 self-start sm:self-auto shadow-2xs">
          “Don't rely on one signal. Connect the clues.”
        </span>
      </div>

      {/* 3 Step-Up Stage Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {tiers.map((t) => (
          <button
            key={t.level}
            onClick={() => setActiveLevel(t.level)}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeLevel === t.level
                ? 'bg-sky-50/80 border-sky-400 ring-2 ring-sky-300/50 shadow-xs'
                : 'bg-white border-slate-200/85 hover:border-slate-300 hover:bg-slate-50/80 shadow-2xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Tier {t.level}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${t.concernColor}`}
              >
                {t.concern}
              </span>
            </div>
            <h4 className="font-bold text-xs text-slate-900 leading-snug">
              {t.title}
            </h4>
          </button>
        ))}
      </div>

      {/* Dynamic Detail Panel */}
      <div className="p-5 bg-slate-50/90 rounded-2xl border border-slate-200/90 space-y-4 shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              Confidence & Risk Index with {currentTier.signalsIncluded.length} Independent Streams:
            </span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {currentTier.signalsIncluded.map((sig, i) => (
                <span
                  key={i}
                  className="text-[11px] font-semibold px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg flex items-center gap-1.5 shadow-2xs"
                >
                  <Check className="w-3.5 h-3.5 text-sky-600" />
                  {sig}
                </span>
              ))}
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xl font-extrabold text-slate-900 font-mono">
              {currentTier.riskScoreDisplay}
            </span>
            <span className="text-[11px] text-slate-500 font-semibold block">
              {currentTier.confidence}
            </span>
          </div>
        </div>

        {/* Confidence Gauge Bar */}
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-teal-500 to-amber-500 transition-all duration-700 rounded-full"
            style={{ width: currentTier.gaugeWidth }}
          />
        </div>

        {/* Clinical Rationale Note */}
        <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 text-xs text-slate-700 leading-relaxed italic shadow-2xs">
          “{currentTier.quote}”
        </div>
      </div>

      {/* Hackathon Thesis Callout */}
      <div className="p-3.5 bg-gradient-to-r from-sky-50/90 to-teal-50/80 border border-sky-200/80 rounded-xl flex items-center gap-2.5 text-xs text-sky-950 shadow-2xs">
        <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
        <span className="leading-snug">
          <strong>Cadence Multi-Signal Advantage:</strong> We never rely on a single isolated metric. Confidence scales only when independent, routinely available clinical signals align along the temporal axis.
        </span>
      </div>
    </div>
  );
};
