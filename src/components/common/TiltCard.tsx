import React, { useRef, useState, useCallback, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  maxTilt?: number; // max tilt angle in degrees, default 5
  glareOpacity?: number; // 0 to 1, default 0.12
  perspective?: number; // default 1000
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  onClick,
  maxTilt = 5,
  glareOpacity = 0.12,
  perspective = 1000,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [style, setStyle] = useState<{
    transform: string;
    transition: string;
    glarePos: { x: number; y: number; opacity: number };
  }>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
    glarePos: { x: 50, y: 50, opacity: 0 },
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position within card
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Normalized coordinates (-0.5 to 0.5)
      const xPercent = mouseX / width - 0.5;
      const yPercent = mouseY / height - 0.5;

      const rotateX = -(yPercent * maxTilt);
      const rotateY = xPercent * maxTilt;

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`,
        transition: 'transform 0.1s ease-out, box-shadow 0.2s ease-out',
        glarePos: {
          x: (mouseX / width) * 100,
          y: (mouseY / height) * 100,
          opacity: glareOpacity,
        },
      });
    },
    [maxTilt, glareOpacity, perspective, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease',
      glarePos: { x: 50, y: 50, opacity: 0 },
    });
  }, [perspective]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseLeave}
      style={{
        transform: prefersReducedMotion ? 'none' : style.transform,
        transition: style.transition,
        transformStyle: prefersReducedMotion ? 'flat' : 'preserve-3d',
      }}
      className={`relative overflow-hidden group ${className}`}
    >
      {/* Dynamic Cursor-Following Spotlight Glare */}
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-inherit"
          style={{
            opacity: style.glarePos.opacity,
            background: `radial-gradient(circle 380px at ${style.glarePos.x}% ${style.glarePos.y}%, rgba(6, 182, 212, 0.16), rgba(99, 102, 241, 0.08) 40%, transparent 70%)`,
          }}
        />
      )}

      {/* Card Content with subtle 3D lift */}
      <div
        style={{ transform: prefersReducedMotion ? 'none' : 'translateZ(10px)' }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </div>
    </div>
  );
};
