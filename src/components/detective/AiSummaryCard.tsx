import React, { useState } from 'react';
import {
  Bot,
  RefreshCw,
  Copy,
  Check,
  FilePlus,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AiSummaryCardProps {
  initialSummary: string;
  patientName: string;
}

export const AiSummaryCard: React.FC<AiSummaryCardProps> = ({
  initialSummary,
  patientName,
}) => {
  const { setActiveView, theme } = useApp();
  const isDark = theme === 'dark';
  const [summary, setSummary] = useState<string>(initialSummary);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [addedToReport, setAddedToReport] = useState<boolean>(false);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setSummary(
        `Observational analysis for ${patientName}: Initial 8-week medication persistence was consistent with expected 30-day refills and stable vitals. Over the subsequent 6 weeks, consecutive dispense intervals expanded to 38 and 42 days, closely followed by reported dyspnea elevations and systolic BP excursions to 146 mmHg. Notably, a cardiology note on April 20 documented a dosage modification trial (20mg to 10mg) that represents a credible alternative contributor to the observed timeline. In summary, data indicates a potential adherence irregularity balanced with a recent regimen adjustment, warranting supportive clinical discussion.`
      );
      setIsRegenerating(false);
    }, 550);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToReport = () => {
    setAddedToReport(true);
    setTimeout(() => {
      setAddedToReport(false);
      setActiveView('reports');
    }, 900);
  };

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
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-2xs ${
              isDark
                ? 'bg-teal-950/60 border border-teal-800/80 text-teal-400'
                : 'bg-teal-50 border border-teal-200 text-teal-600'
            }`}
          >
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3
              className={`text-base font-bold tracking-tight flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <span>AI-Generated Clinical Summary</span>
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border shadow-2xs ${
                  isDark
                    ? 'bg-teal-950/70 text-teal-300 border-teal-800'
                    : 'bg-teal-50 text-teal-800 border-teal-200'
                }`}
              >
                Decision Support
              </span>
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Synthesized from longitudinal claims, symptom reports, and electronic vitals.
            </p>
          </div>
        </div>

        <span
          className={`text-[11px] font-semibold flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 rounded-lg border ${
            isDark
              ? 'text-slate-300 bg-slate-800/80 border-slate-700'
              : 'text-slate-500 bg-slate-50 border-slate-200/70'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
          <span>Non-punitive tone verified</span>
        </span>
      </div>

      {/* Summary Box with Iridescent Frame */}
      <div
        className={`p-5 rounded-2xl border relative overflow-hidden shadow-inner ${
          isDark
            ? 'bg-gradient-to-br from-slate-900/90 to-sky-950/20 border-slate-800/90'
            : 'bg-gradient-to-br from-slate-50 to-sky-50/20 border-slate-200/90'
        }`}
      >
        <p
          className={`text-xs leading-relaxed font-normal ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          } ${isRegenerating ? 'opacity-30 filter blur-xs transition-all' : ''}`}
        >
          “{summary}”
        </p>

        {isRegenerating && (
          <div
            className={`absolute inset-0 flex items-center justify-center gap-2.5 text-xs font-bold backdrop-blur-xs ${
              isDark ? 'text-sky-300 bg-slate-950/85' : 'text-sky-800 bg-white/85'
            }`}
          >
            <RefreshCw className="w-4 h-4 animate-spin text-sky-500" />
            <span>Correlating multimodal evidence vectors...</span>
          </div>
        )}
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 flex items-center gap-1.5 shadow-2xs cursor-pointer btn-press-3d ${
              isDark
                ? 'text-slate-200 bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                : 'text-slate-700 bg-white border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin text-sky-500' : ''}`} />
            <span>Regenerate Note</span>
          </button>

          <button
            onClick={handleCopy}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 flex items-center gap-1.5 shadow-2xs cursor-pointer btn-press-3d ${
              isDark
                ? 'text-slate-200 bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                : 'text-slate-700 bg-white border-slate-200/90 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-400 font-bold">Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className={`w-3.5 h-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>

        <button
          onClick={handleAddToReport}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-all duration-150 flex items-center gap-1.5 shadow-xs hover:shadow btn-press-3d cursor-pointer"
        >
          {addedToReport ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added! Navigating...</span>
            </>
          ) : (
            <>
              <FilePlus className="w-3.5 h-3.5" />
              <span>Add to Clinical Report</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
