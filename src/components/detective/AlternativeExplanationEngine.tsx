import React, { useState } from 'react';
import { AlternativeExplanation } from '../../types/patient';
import {
  Scale,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Info,
  Sliders,
  ShieldCheck,
} from 'lucide-react';

interface AlternativeExplanationEngineProps {
  explanations: AlternativeExplanation[];
}

export const AlternativeExplanationEngine: React.FC<AlternativeExplanationEngineProps> = ({
  explanations = [],
}) => {
  const safeExplanations = explanations && explanations.length > 0 ? explanations : [];
  const [selectedHypothesis, setSelectedHypothesis] = useState<string>(
    safeExplanations.find((e) => e.isPrimaryCandidate)?.id || safeExplanations[0]?.id || ''
  );

  const primaryCandidate = safeExplanations.find((e) => e.isPrimaryCandidate);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/85 p-5 sm:p-6 shadow-2xs card-elevation-2 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-2xs">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Could something else explain this pattern?
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
              Confounder Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Cadence evaluates alternative confounding hypotheses before attributing temporal patterns to medication-taking irregularity.
          </p>
        </div>

        <span className="text-[11px] font-bold text-amber-900 bg-amber-50/80 px-3 py-1.5 rounded-xl border border-amber-200/80 self-start sm:self-auto flex items-center gap-1.5 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Confounder Detection Active
        </span>
      </div>

      {/* Primary Alternative Banner */}
      {primaryCandidate && (
        <div className="p-4.5 bg-gradient-to-r from-amber-50/90 via-amber-50/60 to-transparent border border-amber-200/90 rounded-2xl space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <span className="text-xs font-extrabold text-amber-950 uppercase tracking-wider">
                Primary Alternative Explanation Detected:
              </span>
            </div>
            <span className="text-[11px] font-bold text-amber-800 bg-white px-2.5 py-0.5 rounded-md border border-amber-200 shadow-2xs">
              Evidence Weight: {primaryCandidate.evidenceScore}%
            </span>
          </div>

          <p className="text-xs text-amber-950 leading-relaxed font-semibold">
            “{primaryCandidate.detail}”
          </p>

          <div className="pt-2.5 border-t border-amber-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-amber-900">
            <span>
              <strong>Clinical Guidance:</strong> Check whether patient split remaining 20 mg tablets after the April 20 dosage change.
            </span>
            <span className="font-extrabold text-amber-950 bg-amber-100 px-2 py-0.5 rounded-md">
              Net Confidence Calibrated (-18%)
            </span>
          </div>
        </div>
      )}

      {/* Visual Weight Balance Meter */}
      <div className="p-4.5 bg-slate-50/90 rounded-2xl border border-slate-200/90 space-y-4 shadow-inner">
        <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-sky-600" />
            Hypothesis Balance Scale
          </span>
          <span className="text-[10px] text-slate-500 font-medium">Uncertainty Calibrated</span>
        </div>

        {/* Evidence for Concern Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-800 flex items-center gap-2 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.5)]" />
              Evidence for Adherence Irregularity
            </span>
            <span className="font-black text-slate-900 font-mono">72% Weight</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-700"
              style={{ width: '72%' }}
            />
          </div>
          <span className="text-[10px] text-slate-500 block font-mono">
            Dispense delay + symptom flare + tele-BP excursion
          </span>
        </div>

        {/* Evidence for Alternative Explanation Bar */}
        <div className="space-y-1.5 pt-2.5 border-t border-slate-200">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-800 flex items-center gap-2 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-[0_0_6px_rgba(13,148,136,0.5)]" />
              Evidence for Alternative Explanation (Dosage Adjustment)
            </span>
            <span className="font-black text-slate-900 font-mono">68% Weight</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-sky-500 rounded-full transition-all duration-700"
              style={{ width: '68%' }}
            />
          </div>
          <span className="text-[10px] text-slate-500 block font-mono">
            Documented cardiology titration note on April 20
          </span>
        </div>
      </div>

      {/* Evaluated Confounder Hypotheses Grid */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold text-slate-800 block">
          All Evaluated Confounder Hypotheses:
        </span>

        {safeExplanations.length === 0 ? (
          <div className="p-8 text-center bg-slate-50/80 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-500">
            No confounding clinical hypotheses detected. Observational telemetry and pharmacy claims reflect standard primary treatment response.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {safeExplanations.map((exp) => {
            const isSelected = selectedHypothesis === exp.id;
            return (
              <div
                key={exp.id}
                onClick={() => setSelectedHypothesis(exp.id)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  exp.isPrimaryCandidate
                    ? 'bg-amber-50/60 border-amber-300 ring-2 ring-amber-200/60 shadow-xs'
                    : isSelected
                    ? 'bg-sky-50/80 border-sky-300 ring-2 ring-sky-200/60 shadow-xs'
                    : 'bg-white border-slate-200/85 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        exp.status === 'detected'
                          ? 'bg-amber-500'
                          : exp.status === 'pending_verification'
                          ? 'bg-sky-400'
                          : 'bg-slate-300'
                      }`}
                    />
                    <h5 className="text-xs font-bold text-slate-900">
                      {exp.hypothesis}
                    </h5>
                  </div>

                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    {exp.evidenceScore}%
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-snug">
                  {exp.detail}
                </p>
              </div>
            );
          })}
        </div>
        )}
      </div>
    </div>
  );
};
