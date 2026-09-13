import React, { useState } from 'react';
import { useApp, AlertItem } from '../../context/AppContext';
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Clock,
  Search,
  Check,
  Calendar,
  MessageSquare,
  Building2,
  FileCheck,
  Sparkles,
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

  const handleAction = (alertId: string, actionName: string, newStatus: AlertItem['status']) => {
    triageAlert(alertId, newStatus);
    setFeedbackToast(`Action logged: ${actionName}`);
    setTimeout(() => setFeedbackToast(null), 2500);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Toast */}
      {feedbackToast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-sky-600" />
              <span>Clinical Triage & Alert Queue</span>
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              {alerts.filter((a) => a.status === 'pending').length} Pending Review
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Algorithmic flags generated from temporal multi-signal coherence across authorized patient records.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({alerts.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
              filter === 'pending'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('reviewed')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
              filter === 'reviewed'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            Reviewed
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3.5">
        {filteredAlerts.map((alert) => {
          const isPending = alert.status === 'pending';
          const isHigh = alert.severity === 'High';

          return (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl border transition-all bg-white hover:shadow-md ${
                isPending && isHigh
                  ? 'border-rose-300 ring-1 ring-rose-200/60'
                  : isPending
                  ? 'border-amber-300 ring-1 ring-amber-200/60'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isHigh
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {alert.severity} Priority
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">
                      {alert.patientName} ({alert.patientCode})
                    </h3>
                    <span className="text-xs text-slate-500">• {alert.medicationName}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto md:ml-2">
                      <Clock className="w-3 h-3" /> {alert.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 font-medium leading-relaxed">
                    Flagged Signal: {alert.primarySignal}
                  </p>

                  {alert.alternativeHypothesis && (
                    <div className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200/80 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Detected Confounder:</strong> {alert.alternativeHypothesis}
                      </span>
                    </div>
                  )}
                </div>

                {/* Score badge */}
                <div className="flex flex-col items-end shrink-0">
                  <div
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                      isHigh
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    Risk Index: {alert.riskScore}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    Status: <strong className="capitalize">{alert.status}</strong>
                  </span>
                </div>
              </div>

              {/* Triage Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => openDetective(alert.patientId)}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Investigate Evidence in Detective Mode</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleAction(
                        alert.id,
                        'Scheduled Care Coordination Call',
                        'reviewed'
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
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
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Verify with Pharmacy</span>
                  </button>

                  {isPending && (
                    <button
                      onClick={() => handleAction(alert.id, 'Alert Acknowledged', 'reviewed')}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Acknowledge</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
