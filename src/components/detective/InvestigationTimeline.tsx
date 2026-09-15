import React, { useState } from 'react';
import { TimelineEvent } from '../../types/patient';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  AlertTriangle,
  Activity,
  HeartPulse,
  Watch,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { ConfidenceBadge } from '../common/RiskBadge';

interface InvestigationTimelineProps {
  timeline: TimelineEvent[];
}

export const InvestigationTimeline: React.FC<InvestigationTimelineProps> = ({ timeline = [] }) => {
  const { theme } = useApp();
  const safeTimeline = timeline && timeline.length > 0 ? timeline : [];
  const [selectedEventId, setSelectedEventId] = useState<string>(
    safeTimeline.find((t) => t.isIrregularity)?.id || safeTimeline[0]?.id || ''
  );

  const selectedEvent = safeTimeline.find((t) => t.id === selectedEventId) || safeTimeline[0] || null;

  const getEventIcon = (type: TimelineEvent['iconType'], isIrregular?: boolean) => {
    const iconClass = isIrregular ? 'text-amber-400' : 'text-cyan-400';
    switch (type) {
      case 'prescription':
        return <FileText className={`w-4 h-4 ${iconClass}`} />;
      case 'refill':
        return <AlertTriangle className={`w-4 h-4 ${iconClass}`} />;
      case 'symptom':
        return <Activity className={`w-4 h-4 ${iconClass}`} />;
      case 'clinical':
        return <HeartPulse className={`w-4 h-4 ${iconClass}`} />;
      case 'wearable':
        return <Watch className={`w-4 h-4 ${iconClass}`} />;
      case 'pattern':
      default:
        return <Sparkles className={`w-4 h-4 ${iconClass}`} />;
    }
  };

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
              theme === 'dark' ? 'bg-cyan-950/60 border-cyan-800/60 text-cyan-400' : 'bg-sky-50 border-sky-200 text-sky-600'
            }`}>
              <Layers className="w-4 h-4" />
            </div>
            <h3 className={`text-base font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Multimodal Investigation Timeline
            </h3>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
              theme === 'dark' ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60' : 'bg-sky-50 text-sky-700 border-sky-200'
            }`}>
              Interactive Milestones
            </span>
          </div>
          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Chronological convergence of pharmacy dispense events, patient symptom surges, and tele-BP changes.
          </p>
        </div>

        <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-xl border self-start sm:self-auto shadow-2xs ${
          theme === 'dark'
            ? 'text-cyan-300 bg-cyan-950/40 border-cyan-800/60'
            : 'text-sky-700 bg-sky-50/80 border-sky-200/80'
        }`}>
          Click milestone to inspect evidence
        </span>
      </div>

      {/* Horizontal Interactive Timeline Scroll Track */}
      {safeTimeline.length === 0 ? (
        <div className={`p-8 text-center rounded-2xl border border-dashed text-xs ${
          theme === 'dark'
            ? 'bg-slate-950/40 border-slate-800 text-slate-400'
            : 'bg-slate-50/80 border-slate-200 text-slate-500'
        }`}>
          No anomalous multi-signal timeline events detected for this patient. Baseline telemetry and pharmacy dispense intervals are within normal clinical thresholds.
        </div>
      ) : (
        <div className="relative overflow-x-auto pb-4 pt-3">
          {/* Continuous Guide Line */}
          <div className={`absolute top-8 left-8 right-8 h-0.5 -z-0 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-slate-800 via-cyan-900 to-amber-900'
              : 'bg-gradient-to-r from-slate-200 via-sky-200 to-amber-200'
          }`} />

          <div className="flex items-start justify-between min-w-[760px] gap-3 px-2">
            {safeTimeline.map((event) => {
              const isSelected = event.id === selectedEventId;
              return (
                <button
                  key={event.id}
                  onClick={() => setSelectedEventId(event.id)}
                  className="flex flex-col items-center group relative cursor-pointer focus:outline-none flex-1 transition-all"
                >
                  {/* Milestone Node */}
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 relative z-10 ${
                      isSelected
                        ? 'bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-110'
                        : event.isIrregularity
                        ? theme === 'dark'
                          ? 'bg-amber-950/60 text-amber-400 border-amber-600/70 group-hover:border-amber-400 group-hover:scale-105 shadow-2xs'
                          : 'bg-amber-50 text-amber-700 border-amber-300 group-hover:border-amber-400 group-hover:scale-105 shadow-2xs'
                        : theme === 'dark'
                        ? 'bg-slate-800 text-slate-300 border-slate-700 group-hover:border-cyan-500 group-hover:scale-105 shadow-2xs'
                        : 'bg-white text-slate-600 border-slate-300/80 group-hover:border-sky-400 group-hover:scale-105 shadow-2xs'
                    }`}
                  >
                    {getEventIcon(event.iconType, event.isIrregularity)}

                    {/* Pulsing Alert Indicator */}
                    {event.isIrregularity && !isSelected && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-slate-900 shadow-xs animate-pulse" />
                    )}
                  </div>

                  {/* Date & Title */}
                  <div className="text-center mt-3 w-24">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block">
                      {event.displayDate}
                    </span>
                    <span
                      className={`text-[11px] font-semibold leading-snug block truncate mt-0.5 ${
                        isSelected
                          ? 'text-cyan-400 font-bold'
                          : event.isIrregularity
                          ? 'text-amber-400'
                          : theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}
                      title={event.title}
                    >
                      {event.title}
                    </span>
                  </div>

                  {/* Selected Direction Indicator */}
                  {isSelected && (
                    <div className="w-2 h-2 bg-cyan-500 rotate-45 mt-2 -mb-2 shadow-xs" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Event Deep-Dive Panel */}
      {selectedEvent && (
        <div className={`p-5 rounded-2xl border space-y-3.5 shadow-2xs animate-fadeIn ${
          theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/90 border-slate-200/90'
        }`}>
          <div className={`flex flex-wrap items-center justify-between gap-3 pb-3 border-b ${
            theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
          }`}>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-bold px-2.5 py-1 border rounded-lg shadow-2xs ${
                theme === 'dark' ? 'bg-slate-800 border-slate-700 text-cyan-300' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                {selectedEvent.displayDate}
              </span>
              <span className={`text-sm font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {selectedEvent.title}
              </span>
              {selectedEvent.isIrregularity && (
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs flex items-center gap-1 ${
                  theme === 'dark'
                    ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  Irregularity Flagged
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Stream Source: <strong className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>{selectedEvent.source}</strong>
              </span>
              <ConfidenceBadge level={selectedEvent.confidence} />
            </div>
          </div>

          {/* Expected vs Observed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            <div className={`p-3.5 rounded-xl border shadow-2xs ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Expected Clinical Baseline
              </span>
              <span className={`font-semibold text-xs ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                {selectedEvent.expectedValue}
              </span>
            </div>

            <div className={`p-3.5 rounded-xl border shadow-2xs ${
              theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                Observed Healthcare Signal
              </span>
              <span className={`font-extrabold text-xs ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {selectedEvent.observedValue}
              </span>
            </div>
          </div>

          {/* Clinical Interpretation */}
          <div className={`p-3.5 rounded-xl border text-xs ${
            theme === 'dark' ? 'bg-cyan-950/30 border-cyan-800/50' : 'bg-sky-50/70 border-sky-200/80'
          }`}>
            <span className={`font-bold block mb-1 ${theme === 'dark' ? 'text-cyan-300' : 'text-sky-950'}`}>
              Clinical Context & Causality Interpretation:
            </span>
            <p className={`leading-relaxed font-normal ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              {selectedEvent.interpretation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
