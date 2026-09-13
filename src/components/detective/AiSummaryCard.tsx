import React, { useState } from 'react';
import {
  Bot,
  RefreshCw,
  Copy,
  Check,
  FilePlus,
  Sparkles,
  Info,
  Sliders,
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
    }, 600);
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
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>AI-Generated Clinical Summary</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-teal-50 text-teal-700 border border-teal-200">
                Decision Support
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Synthesized from longitudinal claims, symptom logs, and electronic vitals.
            </p>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 self-start sm:self-auto flex items-center gap-1">
          <Info className="w-3.5 h-3.5" />
          <span>Non-punitive clinical tone verified</span>
        </div>
      </div>

      {/* Summary Text Box */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 relative group">
        <p
          className={`text-xs text-slate-800 leading-relaxed font-normal ${
            isRegenerating ? 'opacity-40 filter blur-xs transition-all' : ''
          }`}
        >
          “{summary}”
        </p>

        {isRegenerating && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 text-xs font-semibold text-sky-700 bg-white/80 rounded-xl">
            <RefreshCw className="w-4 h-4 animate-spin text-sky-600" />
            Synthesizing clinical signals...
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied to Clipboard</span>
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
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 transition-all flex items-center gap-1.5 shadow-2xs hover:shadow"
        >
          {addedToReport ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added! Navigating...</span>
            </>
          ) : (
            <>
              <FilePlus className="w-3.5 h-3.5" />
              <span>Add to Report</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
