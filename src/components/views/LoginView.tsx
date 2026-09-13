import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CadenceLogo } from '../common/CadenceLogo';
import { TiltCard } from '../common/TiltCard';
import {
  FileText,
  Building2,
  Activity,
  Watch,
  HeartPulse,
  Brain,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  Mail,
  Zap,
  CheckCircle2,
  Layers,
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { loginDemo } = useApp();
  const [email, setEmail] = useState<string>('dr.sharma@metropolitan-health.org');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const pipelineSteps = [
    { label: 'Prescription Records', source: 'EHR Orders', icon: FileText, color: 'text-sky-400 bg-sky-950/80 border-sky-800' },
    { label: 'Pharmacy Dispense Claims', source: 'Surescripts Gateway', icon: Building2, color: 'text-teal-400 bg-teal-950/80 border-teal-800' },
    { label: 'Patient-Reported Symptoms', source: 'Care Mobile App', icon: Activity, color: 'text-amber-400 bg-amber-950/80 border-amber-800' },
    { label: 'Passive Wearable Sensors', source: 'HealthKit & Sensors', icon: Watch, color: 'text-indigo-400 bg-indigo-950/80 border-indigo-800' },
    { label: 'Biomarkers & Tele-BP', source: 'Home Telehealth', icon: HeartPulse, color: 'text-rose-400 bg-rose-950/80 border-rose-800' },
    { label: 'Multimodal Pattern Detection', source: 'Cadence Engine', icon: Brain, color: 'text-purple-400 bg-purple-950/80 border-purple-800' },
    { label: 'Clinical Decision Support', source: 'Physician Review', icon: Sparkles, color: 'text-emerald-400 bg-emerald-950/80 border-emerald-800' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row relative overflow-hidden">
      {/* Background Ambient Mesh & Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-600/15 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-[600px] h-[600px] bg-teal-600/15 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" />

      {/* Left Column: Brand Identity & Interactive Signal Pipeline */}
      <div className="lg:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 relative z-10">
        <div className="space-y-8 max-w-2xl">
          <CadenceLogo size="lg" showTagline={true} inverted={true} />

          <div className="space-y-4 pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-950/90 text-sky-300 border border-sky-800/80 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>AI-Powered Medication Adherence Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              “Don't just look at one missed signal.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                Connect the clues.”
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Cadence transforms routinely collected observational healthcare signals into proactive clinical decision support. Designed to uncover temporal patterns that suggest potential medication irregularities—without ever accusing patients.
            </p>
          </div>

          {/* Interactive Healthcare Signals Transformation Pipeline */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
              <span className="font-extrabold uppercase tracking-widest text-sky-400 text-[10px]">
                Multimodal Signal Convergence
              </span>
              <span className="text-slate-400 text-[11px]">7 routinely available signals correlated</span>
            </div>

            <div className="space-y-2 bg-slate-900/80 backdrop-blur-xl p-4.5 rounded-2xl border border-slate-800/90 shadow-2xl">
              {pipelineSteps.map((step, idx) => {
                const Icon = step.icon;
                const isLast = idx === pipelineSteps.length - 1;
                return (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/60 transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${step.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className={`text-xs font-bold block ${isLast ? 'text-emerald-400' : 'text-slate-200'}`}>
                          {step.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {step.source}
                        </span>
                      </div>
                    </div>

                    {isLast ? (
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 shadow-xs">
                        Decision Support
                      </span>
                    ) : (
                      <span className="text-slate-600 text-xs font-mono">↓</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ethical Safeguard Statement */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 text-xs text-slate-400 space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-slate-200 font-bold">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Ethical Clinical Decision-Support Safeguards</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Cadence does not accuse patients or confirm missed doses. Every prediction explicitly communicates uncertainty, weighs alternative explanations (e.g. dosage modification, supply limits), and shows the full evidence trail.
          </p>
        </div>
      </div>

      {/* Right Column: Provider Sign In & Instant Demo Access */}
      <div className="lg:w-5/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white text-slate-900 relative z-10">
        <div className="max-w-md mx-auto w-full space-y-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Hackathon Evaluation Sandbox</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Provider Portal Sign In
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Authorized clinical workstation authentication gateway.
            </p>
          </div>

          {/* Prominent Instant Demo Access Button */}
          <TiltCard
            maxTilt={4}
            glareOpacity={0.15}
            className="p-5 rounded-2xl bg-gradient-to-br from-sky-50 via-teal-50/60 to-white border-2 border-sky-300 space-y-3 shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-sky-950 flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-600" />
                Instant Hackathon Evaluation
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-600 text-white shadow-2xs">
                One-Click
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Launch directly into <strong>Dr. Maya Sharma’s</strong> clinical workspace with pre-seeded synthetic patient cohort and multi-signal telemetry.
            </p>
            <button
              onClick={loginDemo}
              className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>⚡ Enter Demo Mode (Instant Access)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </TiltCard>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] text-slate-400 uppercase tracking-widest font-bold">
              Or Provider Credentials
            </span>
          </div>

          {/* Standard Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginDemo();
            }}
            className="space-y-4 text-xs"
          >
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                Authorized Clinical Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none font-medium text-slate-800"
                  placeholder="name@health-system.org"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="font-bold text-slate-700">Password</label>
                <a href="#demo" onClick={(e) => { e.preventDefault(); loginDemo(); }} className="text-sky-600 hover:underline font-semibold text-[11px]">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none font-medium text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <span>Remember clinical workstation</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Sign In to Practice
            </button>
          </form>

          {/* Synthetic Data Notice */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 space-y-0.5 shadow-2xs">
            <div className="font-extrabold flex items-center gap-1.5">
              <span>Demo Environment</span>
            </div>
            <p className="text-amber-800 leading-snug font-medium">
              Patient data shown in this demo is synthetic and does not represent real individuals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
