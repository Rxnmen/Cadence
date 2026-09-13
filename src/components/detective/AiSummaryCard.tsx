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
  const { setActiveView } = useApp();
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
    <div className="bg-white rounded-2xl border border-slate-200/85 p-5 sm:p-6 shadow-2xs card-elevation-2 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 shadow-2xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>AI-Generated Clinical Summary</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs">
                Decision Support
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Synthesized from longitudinal claims, symptom reports, and electronic vitals.
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5 self-start sm:self-auto bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          <span>Non-punitive tone verified</span>
        </span>
      </div>

      {/* Summary Box with Iridescent Frame */}
      <div className="p-5 bg-gradient-to-br from-slate-50 to-sky-50/20 rounded-2xl border border-slate-200/90 relative overflow-hidden shadow-inner">
        <p
          className={`text-xs text-slate-800 leading-relaxed font-normal ${
            isRegenerating ? 'opacity-30 filter blur-xs transition-all' : ''
          }`}
        >
          “{summary}”
        </p>

        {isRegenerating && (
          <div className="absolute inset-0 flex items-center justify-center gap-2.5 text-xs font-bold text-sky-800 bg-white/85 backdrop-blur-xs">
            <RefreshCw className="w-4 h-4 animate-spin text-sky-600" />
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
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin text-sky-600' : ''}`} />
            <span>Regenerate Note</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>

        <button
          onClick={handleAddToReport}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 transition-all flex items-center gap-1.5 shadow-xs hover:shadow cursor-pointer"
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
