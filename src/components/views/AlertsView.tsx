import React, { useState } from 'react';
import { useApp, AlertItem } from '../../context/AppContext';
import { TiltCard } from '../common/TiltCard';
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  Check,
  Calendar,
  Building2,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Filter,
  CheckCheck,
  Activity,
  ChevronRight,
} from 'lucide-react';

export const AlertsView: React.FC = () => {
  const { alerts, triageAlert, openDetective } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed'>('all');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const filteredAlerts = alerts.filter((a) => {
    if (filter === 'pending') return a.status === 'pending';
    if (filter === 'reviewed') return a.status === 'reviewed';
    return true;
  });

  const pendingCount = alerts.filter((a) => a.status === 'pending').length;
  const reviewedCount = alerts.filter((a) => a.status === 'reviewed').length;

  const handleAction = (alertId: string, actionName: string, newStatus: AlertItem['status']) => {
    triageAlert(alertId, newStatus);
    setFeedbackToast(`Action logged: ${actionName}`);
    setTimeout(() => setFeedbackToast(null), 2500);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Toast */}
      {feedbackToast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2.5 border border-slate-700/60 animate-in fade-in slide-in-from-top-3">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center justify-center shadow-xs">
                <Bell className="w-4.5 h-4.5" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Clinical Triage & Alert Queue
              </h2>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 shadow-2xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                {pendingCount} Pending Review
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1.5 max-w-2xl leading-relaxed">
              Algorithmic flags generated from temporal multi-signal coherence across authorized patient records. Prioritized to prevent adverse outcomes without punitive assumptions.
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 text-xs self-start lg:self-center shadow-inner">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Alerts ({alerts.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === 'pending'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Pending</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${filter === 'pending' ? 'bg-rose-600 text-white' : 'bg-rose-100 text-rose-700'}`}>
                {pendingCount}
              </span>
            </button>
            <button
              onClick={() => setFilter('reviewed')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                filter === 'reviewed'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Reviewed</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${filter === 'reviewed' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                {reviewedCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200">
              <CheckCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Alerts in Selected Queue</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              All flagged adherence patterns in this view have been resolved or acknowledged.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isPending = alert.status === 'pending';
            const isHigh = alert.severity === 'High';

            return (
              <div
                key={alert.id}
                className={`relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isPending && isHigh
                    ? 'border-rose-300 shadow-sm shadow-rose-100/50 ring-1 ring-rose-200/50 hover:border-rose-400'
                    : isPending
                    ? 'border-amber-300 shadow-sm shadow-amber-100/50 ring-1 ring-amber-200/50 hover:border-amber-400'
                    : 'border-slate-200/90 hover:border-slate-300 shadow-2xs opacity-90'
                }`}
              >
                {/* Visual Status Strip Indicator */}
                <div
                  className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                    isHigh && isPending
                      ? 'bg-rose-500'
                      : isPending
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                />

                <div className="p-5 pl-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    {/* Top Row: Severity, Patient, Timestamp */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                          isHigh
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {isHigh ? (
                          <AlertCircle className="w-3 h-3 text-rose-600" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{alert.severity} Priority</span>
                      </span>

                      <span className="font-bold text-sm text-slate-900 tracking-tight">
                        {alert.patientName}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                        {alert.patientCode}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        • {alert.medicationName}
                      </span>

                      <span className="text-[11px] text-slate-400 flex items-center gap-1 ml-auto md:ml-2">
                        <Clock className="w-3 h-3" /> {alert.timestamp}
                      </span>
                    </div>

                    {/* Flagged Signal Lead */}
                    <div className="text-xs text-slate-800 font-semibold leading-relaxed flex items-center gap-2 pt-0.5">
                      <Activity className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>Flagged Signal: <span className="font-medium text-slate-700">{alert.primarySignal}</span></span>
                    </div>

                    {/* Confounder Notice */}
                    {alert.alternativeHypothesis && (
                      <div className="text-[11px] text-amber-950 bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 flex items-start gap-2 shadow-2xs">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-900 font-bold">Detected Confounder:</strong>{' '}
                          <span className="text-amber-900/90">{alert.alternativeHypothesis}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Score & Status Badge */}
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <div
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs ${
                        isHigh
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      <span className="text-[10px] uppercase text-slate-400 font-medium">Risk Index</span>
                      <span className="font-mono text-sm font-extrabold">{alert.riskScore}</span>
                      <span className="text-[10px] text-slate-400">/100</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <span>Status:</span>
                      <span
                        className={`font-semibold capitalize px-2 py-0.5 rounded-md ${
                          isPending
                            ? 'text-amber-700 bg-amber-50'
                            : 'text-emerald-700 bg-emerald-50'
                        }`}
                      >
                        {alert.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Triage Actions Toolbar */}
                <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                  <button
                    onClick={() => openDetective(alert.patientId)}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1.5 py-1 px-2 -ml-2 rounded-lg hover:bg-sky-50/80 transition-colors group cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span>Investigate Evidence in Detective Mode</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() =>
                        handleAction(
                          alert.id,
                          'Scheduled Care Coordination Call',
                          'reviewed'
                        )
                      }
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 text-xs font-semibold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer hover:border-slate-300"
                    >
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>Schedule Check-in</span>
                    </button>

                    <button
                      onClick={() =>
                        handleAction(
                          alert.id,
                          'Requested Pharmacy Dispense Verification',
                          'reviewed'
                        )
                      }
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 text-xs font-semibold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer hover:border-slate-300"
                    >
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Verify with Pharmacy</span>
                    </button>

                    {isPending && (
                      <button
                        onClick={() => handleAction(alert.id, 'Alert Acknowledged', 'reviewed')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Acknowledge</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
