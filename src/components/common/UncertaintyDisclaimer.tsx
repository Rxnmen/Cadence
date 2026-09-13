import React from 'react';
import { Info } from 'lucide-react';

interface UncertaintyDisclaimerProps {
  customText?: string;
  className?: string;
  compact?: boolean;
}

export const UncertaintyDisclaimer: React.FC<UncertaintyDisclaimerProps> = ({
  customText,
  className = '',
  compact = false,
}) => {
  if (compact) {
    return (
      <div
        className={`flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50/80 px-2.5 py-1.5 rounded-md border border-slate-200/60 ${className}`}
      >
        <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" />
        <span>
          {customText ||
            'Clinical Decision Support — Does not confirm missed medication. All insights require clinical judgment.'}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`p-3.5 bg-sky-50/70 border border-sky-200/70 rounded-xl text-xs text-sky-900 flex items-start gap-2.5 ${className}`}
    >
      <Info className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
      <div className="space-y-0.5">
        <div className="font-semibold text-sky-950 flex items-center gap-1.5">
          <span>Clinical Decision-Support Safeguard</span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-sky-100/90 text-sky-800 border border-sky-300/60">
            Simulated Demo
          </span>
        </div>
        <p className="text-sky-800 leading-relaxed">
          {customText ||
            'Multiple routine signals suggest patterns that may warrant clinical review. Cadence does not accuse patients or prove missed doses. Always consider potential confounding factors such as prescription adjustments or pharmacy supply limits.'}
        </p>
      </div>
    </div>
  );
};
