import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CadenceLogo } from '../common/CadenceLogo';
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
  CheckCircle2,
  Lock,
  Mail,
  Zap,
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { loginDemo } = useApp();
  const [email, setEmail] = useState<string>('dr.sharma@metropolitan-health.org');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const pipelineSteps = [
    { label: 'Prescription Records', source: 'EHR / Order History', icon: FileText, color: 'text-sky-600 bg-sky-50' },
    { label: 'Pharmacy Dispense Claims', source: 'Surescripts Switch', icon: Building2, color: 'text-teal-600 bg-teal-50' },
    { label: 'Patient-Reported Symptoms', source: 'Care Mobile App', icon: Activity, color: 'text-amber-600 bg-amber-50' },
    { label: 'Wearables & Passive Telemetry', source: 'HealthKit & Sensors', icon: Watch, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Clinical Biomarkers', source: 'Home Tele-BP & Labs', icon: HeartPulse, color: 'text-rose-600 bg-rose-50' },
    { label: 'Multimodal AI Pattern Detection', source: 'Cadence Engine', icon: Brain, color: 'text-purple-600 bg-purple-50' },
    { label: 'Actionable Clinical Decision Support', source: 'Physician Review', icon: Sparkles, color: 'text-emerald-600 bg-emerald-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col lg:flex-row">
      {/* Left Column: Brand Story & Signal Pipeline Graphic */}
      <div className="lg:w-7/12 p-8 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-600/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-600/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <CadenceLogo size="lg" showTagline={true} inverted={true} />

          <div className="space-y-3 max-w-xl pt-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              “Don't just look at one missed signal.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                Connect the clues.”
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Cadence is an AI-powered medication adherence intelligence and clinical decision-support platform. Designed for authorized healthcare professionals to evaluate routinely available healthcare signals and identify temporal patterns that may suggest medication-taking irregularities.
            </p>
          </div>

          {/* Abstract Healthcare Signals Transformation Pipeline */}
          <div className="pt-4 max-w-xl">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
              <span className="font-bold uppercase tracking-wider text-sky-400">
                Multimodal Signal Convergence
              </span>
              <span>7 routinely available signals correlated</span>
            </div>

            <div className="space-y-2 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-xs">
              {pipelineSteps.map((step, idx) => {
                const Icon = step.icon;
                const isLast = idx === pipelineSteps.length - 1;
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/60 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${step.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className={`text-xs font-semibold block ${isLast ? 'text-emerald-400' : 'text-slate-200'}`}>
                            {step.label}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {step.source}
                          </span>
                        </div>
                      </div>

                      {isLast ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          Verified Support
                        </span>
                      ) : (
                        <span className="text-slate-600 text-xs">↓</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ethical Safeguard Statement */}
        <div className="relative z-10 pt-8 mt-6 border-t border-slate-800/80 text-xs text-slate-400 space-y-1">
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Ethical Clinical Decision-Support Safeguards</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Cadence does not accuse patients or confirm missed doses. Every prediction explicitly communicates uncertainty, weighs alternative explanations (e.g. dosage modification, supply limits), and shows the full evidence trail.
          </p>
        </div>
      </div>

      {/* Right Column: Sign In & Demo Access */}
      <div className="lg:w-5/12 p-8 lg:p-14 flex flex-col justify-center bg-white text-slate-900">
        <div className="max-w-md mx-auto w-full space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Hackathon Prototype</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Clinician Portal Sign In
            </h2>
            <p className="text-xs text-slate-500">
              Authorized medical provider credential gateway.
            </p>
          </div>

          {/* Prominent Instant Demo Access Button */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-teal-50 border-2 border-sky-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sky-950 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-sky-600" />
                Instant Hackathon Evaluation
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-600 text-white">
                One-Click
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-snug">
              Launch directly into Dr. Maya Sharma's clinical command center with pre-seeded synthetic patients.
            </p>
            <button
              onClick={loginDemo}
              className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>⚡ Enter Demo Mode (Instant Access)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Or Provider Login
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
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">
                Authorized Clinical Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  placeholder="name@health-system.org"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="font-semibold text-slate-700">Password</label>
                <a href="#demo" onClick={(e) => { e.preventDefault(); loginDemo(); }} className="text-sky-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <span className="text-slate-600">Remember clinical session</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
            >
              Sign In to Practice
            </button>
          </form>

          {/* Synthetic Data Notice */}
          <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 space-y-0.5">
            <div className="font-bold flex items-center gap-1.5">
              <span>Demo Environment</span>
            </div>
            <p className="text-amber-800 leading-snug">
              Patient data shown in this demo is synthetic and does not represent real individuals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
