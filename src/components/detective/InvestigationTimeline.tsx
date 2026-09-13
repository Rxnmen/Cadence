import React, { useState } from 'react';
import { TimelineEvent } from '../../types/patient';
import {
  FileText,
  AlertTriangle,
  Activity,
  HeartPulse,
  Watch,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { ConfidenceBadge } from '../common/RiskBadge';

interface InvestigationTimelineProps {
  timeline: TimelineEvent[];
}

export const InvestigationTimeline: React.FC<InvestigationTimelineProps> = ({ timeline }) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(
    timeline.find((t) => t.isIrregularity)?.id || timeline[0].id
  );

  const selectedEvent = timeline.find((t) => t.id === selectedEventId) || timeline[0];

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
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-600" />
            <span>Multimodal Investigation Timeline</span>
          </h3>
          <p className="text-xs text-slate-500">
            Temporal alignment of pharmacy dispense claims, reported symptoms, and clinical markers.
          </p>
        </div>
        <span className="text-[11px] font-medium text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200/70 self-start sm:self-auto">
          Interactive: Click any milestone to inspect evidence
        </span>
      </div>

      {/* Horizontal Interactive Timeline Scroll Track */}
      <div className="relative overflow-x-auto pb-4 pt-2">
        {/* Continuous Connecting Line */}
        <div className="absolute top-7 left-8 right-8 h-0.5 bg-slate-200 -z-0" />

        <div className="flex items-start justify-between min-w-[720px] gap-3 px-2">
          {timeline.map((event, index) => {
            const isSelected = event.id === selectedEventId;
            return (
              <button
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className="flex flex-col items-center group relative cursor-pointer focus:outline-none flex-1"
              >
                {/* Milestone Node Badge */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all relative z-10 ${
                    isSelected
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md scale-110'
                      : event.isIrregularity
                      ? 'bg-amber-50 text-amber-700 border-amber-300 group-hover:border-amber-400 group-hover:scale-105'
                      : 'bg-white text-slate-600 border-slate-300 group-hover:border-sky-400 group-hover:scale-105'
                  }`}
                >
                  {getEventIcon(
                    event.iconType,
                    isSelected ? false : event.isIrregularity
                  )}

                  {event.isIrregularity && !isSelected && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white" />
                  )}
                </div>

                {/* Date & Title */}
                <div className="text-center mt-2.5 w-24">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight block">
                    {event.displayDate}
                  </span>
                  <span
                    className={`text-[11px] font-medium leading-tight block truncate mt-0.5 ${
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

                {/* Selected Indicator Arrow */}
                {isSelected && (
                  <div className="w-2 h-2 bg-sky-600 rotate-45 mt-1.5 -mb-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Event Deep-Dive Panel */}
      {selectedEvent && (
        <div className="mt-4 p-4 bg-slate-50/90 rounded-xl border border-slate-200/90 space-y-3 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700">
                {selectedEvent.displayDate}
              </span>
              <span className="text-sm font-bold text-slate-900">
                {selectedEvent.title}
              </span>
              {selectedEvent.isIrregularity && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  ⚠️ Irregularity Identified
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">
                Source: <strong className="text-slate-700">{selectedEvent.source}</strong>
              </span>
              <ConfidenceBadge level={selectedEvent.confidence} />
            </div>
          </div>

          {/* Expected vs Observed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Expected Clinical Baseline
              </span>
              <span className="font-semibold text-slate-800">
                {selectedEvent.expectedValue}
              </span>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 block mb-1">
                Observed Healthcare Signal
              </span>
              <span className="font-semibold text-slate-900">
                {selectedEvent.observedValue}
              </span>
            </div>
          </div>

          {/* Clinical Interpretation */}
          <div className="p-3 bg-sky-50/60 rounded-lg border border-sky-100 text-xs">
            <span className="font-semibold text-sky-950 block mb-0.5">
              Clinical Context & Signal Interpretation:
            </span>
            <p className="text-slate-700 leading-relaxed">
              {selectedEvent.interpretation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
