import React, { useState } from 'react';
import {
  Database,
  CheckCircle2,
  RefreshCw,
  Server,
  Building2,
  Activity,
  Watch,
  HeartPulse,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  type: string;
  protocol: string;
  status: 'connected' | 'syncing' | 'idle';
  lastSync: string;
  latency: string;
  recordsCount: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

export const DataSourcesView: React.FC = () => {
  const [sources, setSources] = useState<DataSource[]>([
    {
      id: 'ds-pharmacy',
      name: 'Surescripts National Pharmacy Network',
      type: 'Pharmacy Dispense Claims',
      protocol: 'NCPDP SCRIPT Standard v2017071',
      status: 'connected',
      lastSync: '4 minutes ago',
      latency: '142 ms',
      recordsCount: '1,420 claims',
      description: 'Real-time retail, community, and mail-order pharmacy dispense confirmations.',
      icon: Building2,
    },
    {
      id: 'ds-ehr',
      name: 'Epic / Cerner EHR Interoperability Gateway',
      type: 'Clinical Encounters & Orders',
      protocol: 'HL7 FHIR R4 API (US Core)',
      status: 'connected',
      lastSync: '12 minutes ago',
      latency: '98 ms',
      recordsCount: '3,890 resources',
      description: 'Medication administration records, clinical notes, and ambulatory encounter summaries.',
      icon: Server,
    },
    {
      id: 'ds-patient-app',
      name: 'Cadence Patient Companion App',
      type: 'Patient Reported Outcomes (PROs)',
      protocol: 'Secure Webhook REST API',
      status: 'connected',
      lastSync: '1 minute ago',
      latency: '45 ms',
      recordsCount: '920 logs',
      description: 'Patient-submitted daily symptom ratings, self-reported medication timing, and side effects.',
      icon: Activity,
    },
    {
      id: 'ds-wearables',
      name: 'Apple HealthKit & Sensor Hub',
      type: 'Passive Wearable Telemetry',
      protocol: 'OAuth2 Cloud Connector',
      status: 'connected',
      lastSync: '18 minutes ago',
      latency: '210 ms',
      recordsCount: '48,200 data points',
      description: 'Step counts, resting heart rate, sleep duration, and optical arrhythmia alerts.',
      icon: Watch,
    },
    {
      id: 'ds-labs',
      name: 'LabCorp & Quest Diagnostics Interface',
      type: 'Biomarkers & Laboratory Panels',
      protocol: 'HL7 v2.5.1 / FHIR DiagnosticReport',
      status: 'connected',
      lastSync: '1 hour ago',
      latency: '310 ms',
      recordsCount: '640 results',
      description: 'Longitudinal laboratory biomarkers including HbA1c, eGFR, BNP, and hs-CRP.',
      icon: HeartPulse,
    },
  ]);

  const [testingId, setTestingId] = useState<string | null>(null);

  const testConnection = (id: string) => {
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
    }, 800);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Routinely Available Healthcare Signal Connectors
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Cadence ingests routinely generated healthcare signals from existing clinical infrastructure without imposing new manual workflows.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>All 5 Healthcare Data Feeds Active</span>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="space-y-3.5">
        {sources.map((source) => {
          const Icon = source.icon;
          const isTesting = testingId === source.id;

          return (
            <div
              key={source.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm text-slate-900">{source.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {source.protocol}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Connected
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                    {source.description}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span>Last Synced: <strong className="text-slate-700">{source.lastSync}</strong></span>
                    <span>• Latency: <strong className="text-slate-700">{source.latency}</strong></span>
                    <span>• Ingested: <strong className="text-slate-700">{source.recordsCount}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => testConnection(source.id)}
                  disabled={isTesting}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-sky-600' : ''}`} />
                  <span>{isTesting ? 'Pinging Stream...' : 'Test Signal Feed'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
