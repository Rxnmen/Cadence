import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, ShieldAlert, Sparkles, Layers, ArrowRight } from 'lucide-react';

export const SignalComparisonWidget: React.FC = () => {
  const { theme } = useApp();
  const [activeLevel, setActiveLevel] = useState<number>(3);

  const tiers = [
    {
      level: 1,
      title: 'If we only look at Refill Claims',
      concern: 'Mild Concern',
      concernColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
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
      concernColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
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
      concernColor: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
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
    <div className={`rounded-3xl border p-5 sm:p-6 shadow-sm space-y-5 transition-all duration-300 ${
      theme === 'dark'
        ? 'bg-slate-900/85 border-slate-800 text-slate-100 shadow-black/20'
        : 'bg-white border-slate-200/85 text-slate-900 shadow-2xs'
    }`}>
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
        theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shadow-2xs ${
              theme === 'dark' ? 'bg-indigo-950/60 border-indigo-800/60 text-indigo-400' : 'bg-purple-50 border-purple-200 text-purple-600'
            }`}>
              <Layers className="w-4 h-4" />
            </div>
            <h3 className={`text-base font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Single Signal vs. Multimodal Convergence
            </h3>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
              theme === 'dark' ? 'bg-indigo-950/60 text-indigo-300 border-indigo-800/60' : 'bg-purple-50 text-purple-800 border-purple-200'
            }`}>
              Core Thesis
            </span>
          </div>
          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Compare diagnostic certainty when evaluating isolated data points versus connected multimodal patterns.
          </p>
        </div>

        <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-xl border self-start sm:self-auto shadow-2xs ${
          theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200/80 text-slate-600'
        }`}>
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
                ? theme === 'dark'
                  ? 'bg-cyan-950/50 border-cyan-500/70 ring-2 ring-cyan-500/30 shadow-md text-white'
                  : 'bg-sky-50/80 border-sky-400 ring-2 ring-sky-300/50 shadow-xs text-slate-900'
                : theme === 'dark'
                ? 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800 text-slate-300'
                : 'bg-white border-slate-200/85 hover:border-slate-300 hover:bg-slate-50/80 shadow-2xs text-slate-900'
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
            <h4 className={`font-bold text-xs leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.title}
            </h4>
          </button>
        ))}
      </div>

      {/* Dynamic Detail Panel */}
      <div className={`p-5 rounded-2xl border space-y-4 shadow-inner ${
        theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/90 border-slate-200/90'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className={`text-xs font-bold block ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Confidence & Risk Index with {currentTier.signalsIncluded.length} Independent Streams:
            </span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {currentTier.signalsIncluded.map((sig, i) => (
                <span
                  key={i}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-2xs border ${
                    theme === 'dark'
                      ? 'bg-slate-800 border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  {sig}
                </span>
              ))}
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className={`text-xl font-black font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {currentTier.riskScoreDisplay}
            </span>
            <span className={`text-[11px] font-semibold block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              {currentTier.confidence}
            </span>
          </div>
        </div>

        {/* Confidence Gauge Bar */}
        <div className={`w-full h-2.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}>
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-500 to-amber-500 transition-all duration-700 rounded-full"
            style={{ width: currentTier.gaugeWidth }}
          />
        </div>

        {/* Clinical Rationale Note */}
        <div className={`p-3.5 rounded-xl border text-xs leading-relaxed italic shadow-2xs ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200/90 text-slate-700'
        }`}>
          “{currentTier.quote}”
        </div>
      </div>

      {/* Hackathon Thesis Callout */}
      <div className={`p-3.5 rounded-xl flex items-center gap-2.5 text-xs shadow-2xs border ${
        theme === 'dark'
          ? 'bg-cyan-950/40 border-cyan-800/60 text-cyan-200'
          : 'bg-gradient-to-r from-sky-50/90 to-teal-50/80 border-sky-200/80 text-sky-950'
      }`}>
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
        <span className="leading-snug">
          <strong>Cadence Multi-Signal Advantage:</strong> We never rely on a single isolated metric. Confidence scales only when independent, routinely available clinical signals align along the temporal axis.
        </span>
      </div>
    </div>
  );
};
