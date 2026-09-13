import React, { useState } from 'react';
import { AlternativeExplanation } from '../../types/patient';
import {
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Sparkles,
  Info,
  Sliders,
} from 'lucide-react';

interface AlternativeExplanationEngineProps {
  explanations: AlternativeExplanation[];
}

export const AlternativeExplanationEngine: React.FC<AlternativeExplanationEngineProps> = ({
  explanations,
}) => {
  const [selectedHypothesis, setSelectedHypothesis] = useState<string>(
    explanations.find((e) => e.isPrimaryCandidate)?.id || explanations[0]?.id || ''
  );

  const primaryCandidate = explanations.find((e) => e.isPrimaryCandidate);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">
              Could something else explain this pattern?
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cadence evaluates alternative confounding explanations before attributing patterns to medication-taking irregularity.
          </p>
        </div>

        <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/80 self-start sm:self-auto flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          Confounder Engine Active
        </span>
      </div>

      {/* Primary Alternative Banner */}
      {primaryCandidate && (
        <div className="p-4 bg-amber-50/70 border border-amber-200/90 rounded-xl mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                Alternative Explanation Detected:
              </span>
            </div>
            <span className="text-[11px] font-semibold text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200">
              Evidence Weight: {primaryCandidate.evidenceScore}%
            </span>
          </div>

          <p className="text-xs text-amber-900 leading-relaxed font-medium">
            “{primaryCandidate.detail}”
          </p>

          <div className="pt-2 border-t border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-amber-800">
            <span>
              <strong>Clinical Action:</strong> Verify whether patient was instructed to divide
              existing 20 mg tablets after the April 20 dosage change.
            </span>
            <span className="font-semibold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded">
              Confidence adjusted -18%
            </span>
          </div>
        </div>
      )}

      {/* Visual Weight Balance Bars */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-4 space-y-3">
        <div className="text-xs font-semibold text-slate-800 flex items-center justify-between">
          <span>Hypothesis Balance Meter</span>
          <span className="text-[10px] text-slate-500">Uncertainty Calibrated</span>
        </div>

        {/* Evidence for Concern Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Evidence for Adherence Irregularity
            </span>
            <span className="font-bold text-slate-900">72%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"
              style={{ width: '72%' }}
            />
          </div>
          <span className="text-[10px] text-slate-500 block font-mono">
            Refill cycle + symptom spike + tele-BP elevation
          </span>
        </div>

        {/* Evidence for Alternative Explanation Bar */}
        <div className="space-y-1 pt-2 border-t border-slate-200">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              Evidence for Alternative Explanation (Dosage Adjustment)
            </span>
            <span className="font-bold text-slate-900">68%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-sky-500 rounded-full"
              style={{ width: '68%' }}
            />
          </div>
          <span className="text-[10px] text-slate-500 block font-mono">
            Cardiology note on April 20 trial reduction to 10 mg
          </span>
        </div>
      </div>

      {/* Evaluated Confounder Hypotheses List */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-700 block">
          All Evaluated Confounding Hypotheses:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {explanations.map((exp) => {
            const isSelected = selectedHypothesis === exp.id;
            return (
              <div
                key={exp.id}
                onClick={() => setSelectedHypothesis(exp.id)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  exp.isPrimaryCandidate
                    ? 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-200'
                    : isSelected
                    ? 'bg-sky-50 border-sky-300'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        exp.status === 'detected'
                          ? 'bg-amber-500'
                          : exp.status === 'pending_verification'
                          ? 'bg-sky-400'
                          : 'bg-slate-300'
                      }`}
                    />
                    <span className="text-xs font-bold text-slate-900">
                      {exp.hypothesis}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                    {exp.evidenceScore}% weight
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                  {exp.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
