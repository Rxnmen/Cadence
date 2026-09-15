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
import { useApp } from '../../context/AppContext';

interface AlternativeExplanationEngineProps {
  explanations: AlternativeExplanation[];
}

export const AlternativeExplanationEngine: React.FC<AlternativeExplanationEngineProps> = ({
  explanations = [],
}) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const safeExplanations = explanations && explanations.length > 0 ? explanations : [];
  const [selectedHypothesis, setSelectedHypothesis] = useState<string>(
    safeExplanations.find((e) => e.isPrimaryCandidate)?.id || safeExplanations[0]?.id || ''
  );

  const primaryCandidate = safeExplanations.find((e) => e.isPrimaryCandidate);

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 shadow-2xs card-elevation-2 space-y-5 transition-colors ${
        isDark ? 'bg-[#131d2e] border-slate-700/80' : 'bg-white border-slate-200/85'
      }`}
    >
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        <div>
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-2xs ${
                isDark
                  ? 'bg-amber-950/60 border border-amber-800/80 text-amber-400'
                  : 'bg-amber-50 border border-amber-200 text-amber-700'
              }`}
            >
              <Scale className="w-4 h-4" />
            </div>
            <h3
              className={`text-base font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Could something else explain this pattern?
            </h3>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                isDark
                  ? 'bg-amber-950/70 text-amber-300 border-amber-800'
                  : 'bg-amber-50 text-amber-900 border-amber-200'
              }`}
            >
              Confounder Engine
            </span>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Cadence evaluates alternative confounding hypotheses before attributing temporal patterns to medication-taking irregularity.
          </p>
        </div>

        <span
          className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border self-start sm:self-auto flex items-center gap-1.5 shadow-2xs ${
            isDark
              ? 'text-amber-300 bg-amber-950/60 border-amber-800/80'
              : 'text-amber-900 bg-amber-50/80 border-amber-200/80'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Confounder Detection Active
        </span>
      </div>

      {/* Primary Alternative Banner */}
      {primaryCandidate && (
        <div
          className={`p-4.5 rounded-2xl border space-y-2.5 shadow-2xs ${
            isDark
              ? 'bg-gradient-to-r from-amber-950/50 via-amber-900/20 to-transparent border-amber-700/60 text-amber-200'
              : 'bg-gradient-to-r from-amber-50/90 via-amber-50/60 to-transparent border-amber-200/90'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <span
                className={`text-xs font-extrabold uppercase tracking-wider ${
                  isDark ? 'text-amber-300' : 'text-amber-950'
                }`}
              >
                Primary Alternative Explanation Detected:
              </span>
            </div>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border shadow-2xs ${
                isDark
                  ? 'text-amber-200 bg-slate-900/80 border-amber-800/80'
                  : 'text-amber-800 bg-white border-amber-200'
              }`}
            >
              Evidence Weight: {primaryCandidate.evidenceScore}%
            </span>
          </div>

          <p
            className={`text-xs leading-relaxed font-semibold ${
              isDark ? 'text-amber-100' : 'text-amber-950'
            }`}
          >
            “{primaryCandidate.detail}”
          </p>

          <div
            className={`pt-2.5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] ${
              isDark
                ? 'border-amber-800/60 text-amber-300/90'
                : 'border-amber-200/70 text-amber-900'
            }`}
          >
            <span>
              <strong>Clinical Guidance:</strong> Check whether patient split remaining 20 mg tablets after the April 20 dosage change.
            </span>
            <span
              className={`font-extrabold px-2 py-0.5 rounded-md ${
                isDark
                  ? 'text-amber-200 bg-amber-900/80'
                  : 'text-amber-950 bg-amber-100'
              }`}
            >
              Net Confidence Calibrated (-18%)
            </span>
          </div>
        </div>
      )}

      {/* Visual Weight Balance Meter */}
      <div
        className={`p-4.5 rounded-2xl border space-y-4 shadow-inner ${
          isDark
            ? 'bg-slate-900/60 border-slate-800/90'
            : 'bg-slate-50/90 border-slate-200/90'
        }`}
      >
        <div
          className={`text-xs font-bold flex items-center justify-between ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-sky-500" />
            Hypothesis Balance Scale
          </span>
          <span className={`text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Uncertainty Calibrated
          </span>
        </div>

        {/* Evidence for Concern Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span
              className={`flex items-center gap-2 font-bold ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
              Evidence for Adherence Irregularity
            </span>
            <span className={`font-black font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
              72% Weight
            </span>
          </div>
          <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-700"
              style={{ width: '72%' }}
            />
          </div>
          <span className={`text-[10px] block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Dispense delay + symptom flare + tele-BP excursion
          </span>
        </div>

        {/* Evidence for Alternative Explanation Bar */}
        <div className={`space-y-1.5 pt-2.5 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex justify-between text-xs font-medium">
            <span
              className={`flex items-center gap-2 font-bold ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(13,148,136,0.6)]" />
              Evidence for Alternative Explanation (Dosage Adjustment)
            </span>
            <span className={`font-black font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
              68% Weight
            </span>
          </div>
          <div className={`w-full h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-sky-500 rounded-full transition-all duration-700"
              style={{ width: '68%' }}
            />
          </div>
          <span className={`text-[10px] block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Documented cardiology titration note on April 20
          </span>
        </div>
      </div>

      {/* Evaluated Confounder Hypotheses Grid */}
      <div className="space-y-2.5">
        <span
          className={`text-xs font-bold block ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          }`}
        >
          All Evaluated Confounder Hypotheses:
        </span>

        {safeExplanations.length === 0 ? (
          <div
            className={`p-8 text-center rounded-2xl border border-dashed text-xs ${
              isDark
                ? 'bg-slate-900/40 border-slate-800 text-slate-400'
                : 'bg-slate-50/80 border-slate-200 text-slate-500'
            }`}
          >
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
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 btn-press-3d ${
                    exp.isPrimaryCandidate
                      ? isDark
                        ? 'bg-amber-950/40 border-amber-600/70 ring-2 ring-amber-500/30 shadow-xs'
                        : 'bg-amber-50/60 border-amber-300 ring-2 ring-amber-200/60 shadow-xs'
                      : isSelected
                      ? isDark
                        ? 'bg-sky-950/50 border-sky-600/70 ring-2 ring-sky-500/30 shadow-xs'
                        : 'bg-sky-50/80 border-sky-300 ring-2 ring-sky-200/60 shadow-xs'
                      : isDark
                      ? 'bg-slate-850/70 bg-[#172236] border-slate-700/70 hover:border-slate-600 shadow-2xs'
                      : 'bg-white border-slate-200/85 hover:bg-slate-50 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          exp.status === 'detected'
                            ? 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]'
                            : exp.status === 'pending_verification'
                            ? 'bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.6)]'
                            : isDark ? 'bg-slate-600' : 'bg-slate-300'
                        }`}
                      />
                      <h5
                        className={`text-xs font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {exp.hypothesis}
                      </h5>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isDark ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {exp.evidenceScore}%
                    </span>
                  </div>

                  <p
                    className={`text-[11px] leading-snug ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
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
