import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Brain,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Zap,
  Activity,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Atom,
  Radio,
  Pill,
  Scan,
  Database,
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login, signUp, loginDemo, theme, toggleTheme, isSupabaseReady } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [doctorName, setDoctorName] = useState<string>('Dr. Rajesh Sharma');
  const [email, setEmail] = useState<string>('dr.rajesh.sharma@cadence-health.ai');
  const [password, setPassword] = useState<string>('clinicalSecret123!');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const validate = (): boolean => {
    const errs: { name?: string; email?: string; password?: string } = {};

    if (authMode === 'signup') {
      if (!doctorName.trim()) {
        errs.name = "Full name is required";
      } else if (doctorName.trim().length < 3) {
        errs.name = 'Name must be at least 3 characters';
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please enter a valid clinical email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!validate()) return;

    setIsLoading(true);

    try {
      if (authMode === 'signup') {
        const result = await signUp(email.trim(), password, doctorName.trim());
        if (result.error) {
          setAuthError(result.error);
        }
      } else {
        const result = await login(email.trim(), password);
        if (result.error) {
          setAuthError(result.error);
        }
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication request failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginDemo();
    }, 400);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#090d16] text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col lg:flex-row relative overflow-hidden transition-colors duration-300`}>
      {/* Background Ambient Glow Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/15 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-indigo-500/15 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      {/* Floating Theme Toggle Switch (Top Right) */}
      <div className="absolute top-5 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all shadow-md cursor-pointer border ${
            theme === 'dark'
              ? 'bg-slate-900/80 text-amber-300 border-slate-700/80 hover:bg-slate-800'
              : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
          title="Toggle Light / Dark Theme"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Left Showcase Column */}
      <div className={`lg:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r relative z-10 ${
        theme === 'dark' ? 'border-slate-800/80 bg-slate-950/40' : 'border-slate-200/80 bg-white/40'
      }`}>
        <div className="space-y-8 max-w-2xl">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 animate-float-slow">
              <Atom className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">
                  CANDACE
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  theme === 'dark'
                    ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/80'
                    : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                }`}>
                  v3.0 SUPABASE
                </span>
              </div>
              <span className={`text-xs font-semibold tracking-wider uppercase block ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Medication-Adherence Monitoring System
              </span>
            </div>
          </div>

          {/* Mission Headline */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Multi-Signal Confounder Intelligence & Adherence Tracking</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Don't just look at one missed dose.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">
                Connect the clues.
              </span>
            </h1>
            <p className={`text-sm sm:text-base leading-relaxed ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Candace continuously monitors medication schedules, dose timing irregularities, symptom reports, and clinical indicators with end-to-end Supabase security and Row Level Security.
            </p>
          </div>

          {/* 3 Core Capability Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            <div className={`p-4 rounded-2xl border backdrop-blur-md transition-all ${
              theme === 'dark' ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/80 border-slate-200/80'
            }`}>
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2.5">
                <Pill className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs">Real-Time Regimens</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Personalized dose logging: taken, missed, late, and skipped.
              </div>
            </div>

            <div className={`p-4 rounded-2xl border backdrop-blur-md transition-all ${
              theme === 'dark' ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/80 border-slate-200/80'
            }`}>
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-2.5">
                <Activity className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs">Symptom Tracking</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Correlate self-reported symptom flares with refill intervals.
              </div>
            </div>

            <div className={`p-4 rounded-2xl border backdrop-blur-md transition-all ${
              theme === 'dark' ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/80 border-slate-200/80'
            }`}>
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-2.5">
                <Database className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs">Supabase RLS Protected</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Strict Row Level Security ensures users only see their own data.
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Disclaimer */}
        <div className="pt-8 text-xs text-slate-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Candace Clinical AI • Decision-Support Framework for Authorized Healthcare Providers</span>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="lg:w-5/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10">
        <div className="max-w-md w-full mx-auto space-y-6">
          {/* Header Title */}
          <div className="space-y-2 text-center lg:text-left">
            <h2 className={`text-2xl font-bold tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              {authMode === 'login' ? 'Clinician Authentication' : 'Create Clinician Account'}
            </h2>
            <p className={`text-xs leading-relaxed ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {authMode === 'login'
                ? 'Sign in to access your verified medication cohort, dose logs, and AI assistants.'
                : 'Register a new clinical account connected to your secure Supabase database.'}
            </p>
          </div>

          {/* Authentication Card */}
          <div className={`p-7 rounded-3xl border transition-all shadow-xl ${
            theme === 'dark'
              ? 'bg-slate-900/90 border-slate-800 shadow-cyan-950/20'
              : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}>
            {/* Mode Switch Tabs */}
            <div className={`p-1 rounded-xl flex items-center mb-5 border ${
              theme === 'dark' ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthError(null);
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setAuthError(null);
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Supabase Status Banner */}
            {!isSupabaseReady && (
              <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="leading-tight">
                  <span className="font-bold block mb-0.5">Supabase Environment Setup:</span>
                  Provide <code className="text-amber-300 font-mono text-[10px]">VITE_SUPABASE_URL</code> & <code className="text-amber-300 font-mono text-[10px]">VITE_SUPABASE_ANON_KEY</code> in <code className="text-amber-300 font-mono text-[10px]">.env.local</code>. Active with resilient local store.
                </div>
              </div>
            )}

            {/* Global Auth Error Alert */}
            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Doctor's Full Name Input (shown in signup mode) */}
              {authMode === 'signup' && (
                <div className="space-y-1.5">
                  <label className={`block text-xs font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Doctor's Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={doctorName}
                      onChange={(e) => {
                        setDoctorName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="e.g. Dr. Rajesh Sharma"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold transition-all focus:outline-none focus:ring-2 ${
                        errors.name
                          ? 'border-rose-500 ring-rose-500/20 bg-rose-500/5'
                          : theme === 'dark'
                          ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500'
                      } border`}
                    />
                  </div>
                  {errors.name && (
                    <span className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </span>
                  )}
                </div>
              )}

              {/* Email Address Input */}
              <div className="space-y-1.5">
                <label className={`block text-xs font-bold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Clinical Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="dr.rajesh.sharma@cadence-health.ai"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold transition-all focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-rose-500 ring-rose-500/20 bg-rose-500/5'
                        : theme === 'dark'
                        ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500'
                    } border`}
                  />
                </div>
                {errors.email && (
                  <span className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className={`block text-xs font-bold uppercase tracking-wider ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Clinical Access Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    placeholder="Enter at least 6 characters"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs font-semibold transition-all focus:outline-none focus:ring-2 ${
                      errors.password
                        ? 'border-rose-500 ring-rose-500/20 bg-rose-500/5'
                        : theme === 'dark'
                        ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500'
                    } border`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connecting to Candace Core...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {authMode === 'login'
                        ? 'Sign In / Access Dashboard'
                        : 'Create Account & Access Dashboard'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`} />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
                <span className={`px-2 ${theme === 'dark' ? 'bg-slate-900 text-slate-500' : 'bg-white text-slate-400'}`}>
                  Or Instant Demo Access
                </span>
              </div>
            </div>

            {/* Quick Demo Login */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-800/80 hover:bg-slate-800 text-cyan-300 border-slate-700/80'
                  : 'bg-slate-50 hover:bg-slate-100 text-sky-700 border-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>⚡ One-Click Demo (Dr. Rajesh Sharma)</span>
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-500">
            Protected by Candace Supabase Row Level Security • 256-Bit TLS
          </div>
        </div>
      </div>
    </div>
  );
};
