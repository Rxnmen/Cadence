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
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Radio,
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
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-600 flex items-center justify-center shadow-xs">
                <Database className="w-4.5 h-4.5" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Routinely Available Healthcare Signal Connectors
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1.5 max-w-2xl leading-relaxed">
              Cadence passively ingests routinely generated healthcare signals from existing clinical infrastructure without requiring new manual documentation workflows.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 self-start lg:self-center shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All 5 Clinical Ingestion Pipelines Active</span>
          </div>
        </div>
      </div>

      {/* Telemetry Overview Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Feeds</span>
          <div className="text-2xl font-extrabold text-slate-900">5 / 5 Feeds</div>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 100% Stream Health
          </span>
        </div>

        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Signals Ingested</span>
          <div className="text-2xl font-extrabold text-slate-900">55,070 pts</div>
          <span className="text-[11px] text-slate-500">Past 24 hours</span>
        </div>

        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Mean Ingestion Latency</span>
          <div className="text-2xl font-extrabold text-slate-900">161 ms</div>
          <span className="text-[11px] text-emerald-700 font-semibold">Sub-second coherence</span>
        </div>

        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Security & Encryption</span>
          <div className="text-2xl font-extrabold text-slate-900">AES-256</div>
          <span className="text-[11px] text-sky-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-sky-600" /> HIPAA & HL7 FHIR
          </span>
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
              className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-50 to-teal-50 border border-sky-100 flex items-center justify-center text-sky-700 shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm text-slate-900 tracking-tight">{source.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                      {source.protocol}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Connected</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {source.description}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 flex-wrap">
                    <span>Last Synced: <strong className="text-slate-700 font-medium">{source.lastSync}</strong></span>
                    <span>• Latency: <strong className="text-slate-700 font-mono">{source.latency}</strong></span>
                    <span>• Ingested Volume: <strong className="text-slate-700 font-medium">{source.recordsCount}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => testConnection(source.id)}
                  disabled={isTesting}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 active:scale-95 text-slate-700 border border-slate-200/90 hover:border-slate-300 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-sky-600' : 'text-slate-400'}`} />
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
