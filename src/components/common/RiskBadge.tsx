import React from 'react';
import { RiskCategory, ConfidenceLevel } from '../../types/patient';
import { AlertCircle, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

interface RiskBadgeProps {
  category: RiskCategory;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  category,
  size = 'md',
  showIcon = true,
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
  };

  switch (category) {
    case 'High Priority':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 ${sizeClasses[size]}`}
        >
          {showIcon && <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
          <span>Pattern Requiring Urgent Review</span>
        </span>
      );
    case 'Moderate Concern':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 ${sizeClasses[size]}`}
        >
          {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
          <span>Possible Adherence Concern</span>
        </span>
      );
    case 'Improving':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 ${sizeClasses[size]}`}
        >
          {showIcon && <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
          <span>Pattern Improving</span>
        </span>
      );
    case 'Stable / Low Concern':
    default:
      return (
        <span
          className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses[size]}`}
        >
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
          <span>Stable Pattern</span>
        </span>
      );
  }
};

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ level }) => {
  const styles = {
    High: 'bg-teal-50 text-teal-800 border-teal-200',
    Moderate: 'bg-sky-50 text-sky-800 border-sky-200',
    Low: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${styles[level]}`}
    >
      Confidence: {level}
    </span>
  );
};
