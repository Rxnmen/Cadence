import React, { useState } from 'react';
import { TimelineEvent } from '../../types/patient';
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
  const safeTimeline = timeline && timeline.length > 0 ? timeline : [];
  const [selectedEventId, setSelectedEventId] = useState<string>(
    safeTimeline.find((t) => t.isIrregularity)?.id || safeTimeline[0]?.id || ''
  );

  const selectedEvent = safeTimeline.find((t) => t.id === selectedEventId) || safeTimeline[0] || null;

  const getEventIcon = (type: TimelineEvent['iconType'], isIrregular?: boolean) => {
    const iconClass = isIrregular ? 'text-amber-600' : 'text-sky-600';
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
    <div className="bg-white rounded-2xl border border-slate-200/85 p-5 sm:p-6 shadow-2xs card-elevation-2 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-2xs">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Multimodal Investigation Timeline
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
              Interactive 8 Milestones
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Chronological convergence of pharmacy dispense events, patient symptom surges, and tele-BP changes.
          </p>
        </div>

        <span className="text-[11px] font-semibold text-sky-700 bg-sky-50/80 px-3 py-1.5 rounded-xl border border-sky-200/80 self-start sm:self-auto shadow-2xs">
          Click milestone to inspect evidence
        </span>
      </div>

      {/* Horizontal Interactive Timeline Scroll Track */}
      {safeTimeline.length === 0 ? (
        <div className="p-8 text-center bg-slate-50/80 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-500">
          No anomalous multi-signal timeline events detected for this patient. Baseline telemetry and pharmacy dispense intervals are within normal clinical thresholds.
        </div>
      ) : (
        <div className="relative overflow-x-auto pb-4 pt-3">
          {/* Continuous Guide Line */}
          <div className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-slate-200 via-sky-200 to-amber-200 -z-0" />

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
                        ? 'bg-sky-600 text-white border-sky-400 shadow-[0_0_16px_rgba(2,132,199,0.4)] scale-110'
                        : event.isIrregularity
                        ? 'bg-amber-50 text-amber-700 border-amber-300 group-hover:border-amber-400 group-hover:scale-105 shadow-2xs'
                        : 'bg-white text-slate-600 border-slate-300/80 group-hover:border-sky-400 group-hover:scale-105 shadow-2xs'
                    }`}
                  >

                    {/* Pulsing Alert Indicator */}
                    {event.isIrregularity && !isSelected && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-xs animate-pulse" />
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
                          ? 'text-sky-700 font-bold'
                          : event.isIrregularity
                          ? 'text-amber-800'
                          : 'text-slate-700'
                      }`}
                      title={event.title}
                    >
                      {event.title}
                    </span>
                  </div>

                  {/* Selected Direction Indicator */}
                  {isSelected && (
                    <div className="w-2 h-2 bg-sky-600 rotate-45 mt-2 -mb-2 shadow-xs" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Event Deep-Dive Panel */}
      {selectedEvent && (
        <div className="p-5 bg-slate-50/90 rounded-2xl border border-slate-200/90 space-y-3.5 shadow-2xs animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-800 shadow-2xs">
                {selectedEvent.displayDate}
              </span>
              <span className="text-sm font-extrabold text-slate-900">
                {selectedEvent.title}
              </span>
              {selectedEvent.isIrregularity && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Irregularity Flagged
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Stream Source: <strong className="text-slate-800">{selectedEvent.source}</strong>
              </span>
              <ConfidenceBadge level={selectedEvent.confidence} />
            </div>
          </div>

          {/* Expected vs Observed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Expected Clinical Baseline
              </span>
              <span className="font-semibold text-slate-800 text-xs">
                {selectedEvent.expectedValue}
              </span>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 block mb-1">
                Observed Healthcare Signal
              </span>
              <span className="font-extrabold text-slate-900 text-xs">
                {selectedEvent.observedValue}
              </span>
            </div>
          </div>

          {/* Clinical Interpretation */}
          <div className="p-3.5 bg-sky-50/70 rounded-xl border border-sky-200/80 text-xs">
            <span className="font-bold text-sky-950 block mb-1">
              Clinical Context & Causality Interpretation:
            </span>
            <p className="text-slate-700 leading-relaxed font-normal">
              {selectedEvent.interpretation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
