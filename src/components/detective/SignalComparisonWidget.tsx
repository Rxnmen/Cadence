import React, { useState } from 'react';
import { Check, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

export const SignalComparisonWidget: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<number>(3); // 1, 2, or 3

  const tiers = [
    {
      level: 1,
      title: 'If we only look at Refill Data',
      concern: 'Mild Concern',
      concernColor: 'bg-sky-50 text-sky-800 border-sky-200',
      signalsIncluded: ['Pharmacy Refill Claims'],
      confidence: 'Low Confidence (25%)',
      gaugeWidth: '28%',
      quote:
        'A refill delay in isolation is often just administrative noise, early stocking, or vacation supply.',
      riskScoreDisplay: '38 / 100',
    },
    {
      level: 2,
      title: 'Refill + Patient-Reported Symptoms',
      concern: 'Moderate Concern',
      concernColor: 'bg-amber-50 text-amber-800 border-amber-200',
      signalsIncluded: ['Pharmacy Refill Claims', 'Patient Symptom Flare-ups'],
      confidence: 'Moderate Confidence (55%)',
      gaugeWidth: '60%',
      quote:
        'When dyspnea and fatigue spikes coincide with the projected supply exhaustion date, the likelihood of clinical impact rises.',
      riskScoreDisplay: '58 / 100',
    },
    {
      level: 3,
      title: 'Refill + Symptoms + Clinical Biomarkers + History',
      concern: 'Higher Concern (Actionable)',
      concernColor: 'bg-rose-50 text-rose-700 border-rose-200',
      signalsIncluded: [
        'Pharmacy Refill Claims',
        'Patient Symptom Flare-ups',
        'Ambulatory BP Excursions',
        'Recurrent Historical Patterns',
      ],
      confidence: 'High Confidence (82%)',
      gaugeWidth: '85%',
      quote:
        'Independent biological and behavioral streams converge simultaneously. The temporal pattern strongly suggests irregular dosing rather than random variation.',
      riskScoreDisplay: '72 / 100',
    },
  ];

  const currentTier = tiers.find((t) => t.level === activeLevel) || tiers[2];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900">
              Single Signal vs. Multimodal Convergence
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
              Core Concept
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare clinical confidence when evaluating isolated events versus connected multimodal patterns.
          </p>
        </div>

        <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 self-start sm:self-auto">
          “Connect the clues. Don't rely on one signal.”
        </span>
      </div>

      {/* Tier Selector Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {tiers.map((t) => (
          <button
            key={t.level}
            onClick={() => setActiveLevel(t.level)}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              activeLevel === t.level
                ? 'bg-sky-50/70 border-sky-300 ring-2 ring-sky-200/80 shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Stage {t.level}
              </span>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${t.concernColor}`}
              >
                {t.concern}
              </span>
            </div>
            <h5 className="font-bold text-xs text-slate-900 leading-snug">
              {t.title}
            </h5>
          </button>
        ))}
      </div>

      {/* Dynamic Detail Panel */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              Confidence & Risk Index with {currentTier.signalsIncluded.length} Signal Streams
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {currentTier.signalsIncluded.map((sig, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md flex items-center gap-1"
                >
                  <Check className="w-3 h-3 text-sky-600" />
                  {sig}
                </span>
              ))}
            </div>
          </div>

          <div className="text-right">
            <span className="text-lg font-bold text-slate-900">
              {currentTier.riskScoreDisplay}
            </span>
            <span className="text-[11px] text-slate-500 block">
              {currentTier.confidence}
            </span>
          </div>
        </div>

        {/* Confidence Gauge Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-teal-500 to-amber-500 transition-all duration-500 rounded-full"
            style={{ width: currentTier.gaugeWidth }}
          />
        </div>

        {/* Clinical Rationale Note */}
        <div className="p-3 bg-white rounded-lg border border-slate-200/80 text-xs text-slate-700 leading-relaxed italic">
          “{currentTier.quote}”
        </div>
      </div>

      {/* Core Hackathon Thesis Callout */}
      <div className="mt-3 text-xs text-slate-600 bg-sky-50/50 p-2.5 rounded-lg border border-sky-100 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
        <span>
          <strong>Cadence Core Thesis:</strong> Cadence does not rely on a single signal.
          Confidence increases when independent routinely-available signals form a consistent
          temporal pattern.
        </span>
      </div>
    </div>
  );
};
