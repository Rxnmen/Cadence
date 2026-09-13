-- ==============================================================================
-- Candace Medication-Adherence Monitoring System - Supabase Schema
-- ==============================================================================
-- Run this SQL in your Supabase Project: Dashboard -> SQL Editor -> New Query
-- Enables Row Level Security (RLS) and ensures users can only access their own data.
-- ==============================================================================

-- 1. Enable pgcrypto / uuid-ossp extension for UUID generation if not already active
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- TABLE 1: medications
-- Stores prescription and medication regimens for each authenticated user
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index on user_id for fast retrieval of a user's medications
CREATE INDEX IF NOT EXISTS idx_medications_user_id ON public.medications(user_id);

-- Enable Row Level Security
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for medications
CREATE POLICY "Users can view own medications"
    ON public.medications
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own medications"
    ON public.medications
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own medications"
    ON public.medications
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own medications"
    ON public.medications
    FOR DELETE
    USING (auth.uid() = user_id);

-- ==============================================================================
-- TABLE 2: medication_logs
-- Tracks each dose occurrence (taken, missed, late, skipped)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.medication_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    medication_id UUID NOT NULL REFERENCES public.medications(id) ON DELETE CASCADE,
    scheduled_time TIMESTAMPTZ NOT NULL,
    taken_time TIMESTAMPTZ,
    status TEXT NOT NULL CHECK (status IN ('taken', 'missed', 'late', 'skipped')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for medication_logs
CREATE INDEX IF NOT EXISTS idx_medication_logs_user_id ON public.medication_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_medication_logs_medication_id ON public.medication_logs(medication_id);
CREATE INDEX IF NOT EXISTS idx_medication_logs_created_at ON public.medication_logs(created_at);

-- Enable Row Level Security
ALTER TABLE public.medication_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for medication_logs
CREATE POLICY "Users can view own medication logs"
    ON public.medication_logs
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own medication logs"
    ON public.medication_logs
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own medication logs"
    ON public.medication_logs
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own medication logs"
    ON public.medication_logs
    FOR DELETE
    USING (auth.uid() = user_id);

-- ==============================================================================
-- TABLE 3: symptoms
-- Tracks patient symptom entries and reported severity (1 - 10)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.symptoms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    symptom TEXT NOT NULL,
    severity INTEGER NOT NULL CHECK (severity >= 1 AND severity <= 10),
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index on user_id for symptoms
CREATE INDEX IF NOT EXISTS idx_symptoms_user_id ON public.symptoms(user_id);
CREATE INDEX IF NOT EXISTS idx_symptoms_recorded_at ON public.symptoms(recorded_at);

-- Enable Row Level Security
ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;

-- RLS Policies for symptoms
CREATE POLICY "Users can view own symptoms"
    ON public.symptoms
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own symptoms"
    ON public.symptoms
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own symptoms"
    ON public.symptoms
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own symptoms"
    ON public.symptoms
    FOR DELETE
    USING (auth.uid() = user_id);

-- ==============================================================================
-- TABLE 4: adherence_scores
-- Stores calculated adherence percentages and time periods
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.adherence_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    medication_id UUID REFERENCES public.medications(id) ON DELETE CASCADE,
    score NUMERIC NOT NULL,
    period TEXT NOT NULL,
    calculated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for adherence_scores
CREATE INDEX IF NOT EXISTS idx_adherence_scores_user_id ON public.adherence_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_adherence_scores_medication_id ON public.adherence_scores(medication_id);

-- Enable Row Level Security
ALTER TABLE public.adherence_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for adherence_scores
CREATE POLICY "Users can view own adherence scores"
    ON public.adherence_scores
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own adherence scores"
    ON public.adherence_scores
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own adherence scores"
    ON public.adherence_scores
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own adherence scores"
    ON public.adherence_scores
    FOR DELETE
    USING (auth.uid() = user_id);
