import React from 'react';

interface CadenceLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  inverted?: boolean;
  className?: string;
}

export const CadenceLogo: React.FC<CadenceLogoProps> = ({
  size = 'md',
  showTagline = false,
  inverted = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Geometric Medical + Data + Pill Logo Mark */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Subtle Outer Data Orbital Ring */}
          <circle
            cx="24"
            cy="24"
            r="21"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            className={inverted ? 'text-teal-400/40' : 'text-sky-600/30'}
          />

          {/* Connected Network Nodes */}
          <circle cx="24" cy="5" r="2.5" className="fill-teal-500 animate-pulse" />
          <circle cx="43" cy="24" r="2.5" className="fill-sky-500" />
          <circle cx="24" cy="43" r="2.5" className="fill-indigo-500" />
          <circle cx="5" cy="24" r="2.5" className="fill-teal-500" />

          {/* Cross & Capsule Fusion Shape */}
          <g transform="rotate(45 24 24)">
            {/* Upper Capsule Half / Medical Cross Horizontal Beam */}
            <rect
              x="17"
              y="9"
              width="14"
              height="15"
              rx="7"
              className="fill-sky-600"
            />
            {/* Lower Capsule Half */}
            <rect
              x="17"
              y="24"
              width="14"
              height="15"
              rx="7"
              className="fill-teal-500"
            />
            {/* Divider Band */}
            <line
              x1="17"
              y1="24"
              x2="31"
              y2="24"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </g>

          {/* Central AI Data Convergence Pulse Core */}
          <circle cx="24" cy="24" r="4.5" fill="#ffffff" />
          <circle cx="24" cy="24" r="2.5" className="fill-sky-700" />

          {/* Subtle Corner Connection Vectors */}
          <path
            d="M24 14V11M24 37V34M14 24H11M37 24H34"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={inverted ? 'text-teal-300' : 'text-sky-600'}
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-semibold tracking-tight ${textSizes[size]} ${
              inverted ? 'text-white' : 'text-slate-900'
            }`}
          >
            Cadence
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200">
            Intelligence
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-xs font-normal tracking-normal -mt-0.5 ${
              inverted ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Connect the clues. Support better care.
          </span>
        )}
      </div>
    </div>
  );
};
