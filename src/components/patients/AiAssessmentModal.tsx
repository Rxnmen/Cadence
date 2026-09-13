import React, { useState } from 'react';
import { useApp, AssessmentModalState } from '../../context/AppContext';
import {
  X,
  Sparkles,
  Brain,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Activity,
  ArrowRight,
  Printer,
  Check,
  Zap,
  TrendingUp,
} from 'lucide-react';

interface AiAssessmentModalProps {
  assessmentState: AssessmentModalState;
  onClose: () => void;
}

export const AiAssessmentModal: React.FC<AiAssessmentModalProps> = ({
  assessmentState,
  onClose,
}) => {
  const { theme } = useApp();
  const { patient, status, stepText, progress, result } = assessmentState;

  const [acknowledged, setAcknowledged] = useState<boolean>(false);

  const isAnalyzing = status === 'analyzing';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-[#0f172a] border-slate-700/80 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-6 border-b flex items-center justify-between ${
          theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/70'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight">Cadence AI Assessment</h2>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  theme === 'dark'
                    ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/80'
                    : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                }`}>
                  Core v3.0
                </span>
              </div>
              <span className="text-xs text-slate-400">
                Patient: <strong className={theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}>{patient.name}</strong> ({patient.patientId || patient.code})
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              theme === 'dark' ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            }`}
            title="Close Assessment"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* SIMULATED LOADING STATE */}
          {isAnalyzing && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                {/* Pulsing ring */}
                <div className="w-24 h-24 rounded-full bg-cyan-500/10 border-2 border-cyan-500/40 animate-ping" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-cyan-500/30 animate-pulse">
                    <Sparkles className="w-8 h-8" />
                  </div>
                </div>
              </div>

              <div className="space-y-2 max-w-md">
                <h3 className="text-base font-bold tracking-tight">
                  Analyzing Multimodal Clinical Signals
                </h3>
                <p className="text-xs text-cyan-400 font-mono animate-pulse">
                  {stepText}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-sm bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 rounded-full transition-all duration-300 shadow-sm shadow-cyan-400"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-[11px] text-slate-500">
                Ingesting tele-BP, pharmacy dispense claims, SpO2, and EHR records...
              </span>
            </div>
          )}

          {/* COMPLETED ASSESSMENT REPORT */}
          {!isAnalyzing && result && (
            <div className="space-y-6 animate-in fade-in">
              {/* Score & Confidence Header Card */}
              <div className={`p-5 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                result.riskScore >= 75
                  ? 'bg-rose-950/20 border-rose-800/40'
                  : result.riskScore >= 50
                  ? 'bg-amber-950/20 border-amber-800/40'
                  : 'bg-emerald-950/20 border-emerald-800/40'
              }`}>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Calculated Decompensation Risk Index
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl sm:text-4xl font-black font-mono ${
                      result.riskScore >= 75
                        ? 'text-rose-400'
                        : result.riskScore >= 50
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}>
                      {result.riskScore}
                    </span>
                    <span className="text-sm text-slate-400 font-mono">/100</span>
                    <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      result.riskScore >= 75
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : result.riskScore >= 50
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {result.riskCategory} Risk
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Confidence: <strong className="text-cyan-400">{result.confidencePercentage}%</strong> (Multi-Signal Cross-Validated)
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[11px] font-mono text-slate-400">{result.timestamp}</div>
                  <div className="text-[10px] text-emerald-400 font-semibold flex items-center justify-end gap-1 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> High Clinical Specificity
                  </div>
                </div>
              </div>

              {/* Key Risk Drivers */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Primary Contributing Signals & Weights</span>
                </h4>

                <div className="space-y-2">
                  {result.keyDrivers.map((driver, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border space-y-1.5 ${
                        theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold">{driver.signal}</span>
                        <span className="font-mono text-cyan-400 font-bold">{driver.percentage}% weight</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 rounded-full"
                          style={{ width: `${driver.percentage * 2}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400">{driver.impact}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vital Signs Trajectory */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Observed Hemodynamic Status</span>
                </h4>

                <div className="grid grid-cols-3 gap-3">
                  <div className={`p-3 rounded-xl border text-center ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[10px] text-slate-400 uppercase block">BP Trend</span>
                    <span className="font-mono text-xs font-bold text-cyan-400">{result.vitalTrajectory.bpTrend}</span>
                  </div>
                  <div className={`p-3 rounded-xl border text-center ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[10px] text-slate-400 uppercase block">HR Telemetry</span>
                    <span className="font-mono text-xs font-bold text-rose-400">{result.vitalTrajectory.hrTrend}</span>
                  </div>
                  <div className={`p-3 rounded-xl border text-center ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[10px] text-slate-400 uppercase block">Pulse Oximetry</span>
                    <span className="font-mono text-xs font-bold text-teal-400">{result.vitalTrajectory.spo2Trend}</span>
                  </div>
                </div>
              </div>

              {/* Recommended Clinician Interventions */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Recommended Supportive Interventions</span>
                </h4>

                <div className="space-y-2">
                  {result.recommendedActions.map((action, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                        theme === 'dark' ? 'bg-slate-900/50 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                        {idx + 1}
                      </span>
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Non-Punitive Notice */}
              <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-[11px] text-slate-300 leading-relaxed">
                <strong>Cadence Clinical Notice:</strong> This report is generated to assist diagnostic decision-making. It evaluates potential medication irregularity and hemodynamic drift without punitive assumptions.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-5 border-t flex items-center justify-between gap-3 ${
          theme === 'dark' ? 'border-slate-800 bg-slate-900/80' : 'border-slate-100 bg-slate-50'
        }`}>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            Close
          </button>

          {!isAnalyzing && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Report</span>
              </button>

              <button
                onClick={() => {
                  setAcknowledged(true);
                  setTimeout(() => onClose(), 800);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{acknowledged ? 'Acknowledged' : 'Acknowledge & Save'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
