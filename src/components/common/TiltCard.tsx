import React, { useRef, useState, useCallback } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  maxTilt?: number; // max tilt angle in degrees, default 6
  glareOpacity?: number; // 0 to 1, default 0.12
  perspective?: number; // default 1000
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  onClick,
  maxTilt = 5,
  glareOpacity = 0.1,
  perspective = 1000,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{
    transform: string;
    transition: string;
    glarePos: { x: number; y: number; opacity: number };
  }>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
    glarePos: { x: 50, y: 50, opacity: 0 },
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position within card
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Normalized coordinates (-0.5 to 0.5)
      const xPercent = (mouseX / width) - 0.5;
      const yPercent = (mouseY / height) - 0.5;

      const rotateX = -(yPercent * maxTilt);
      const rotateY = xPercent * maxTilt;

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`,
        transition: 'transform 0.1s ease-out, box-shadow 0.2s ease-out',
        glarePos: {
          x: (mouseX / width) * 100,
          y: (mouseY / height) * 100,
          opacity: glareOpacity,
        },
      });
    },
    [maxTilt, glareOpacity, perspective]
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
      style={{
        transform: style.transform,
        transition: style.transition,
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden group ${className}`}
    >
      {/* Dynamic Cursor-Following Spotlight Glare */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-inherit"
        style={{
          opacity: style.glarePos.opacity,
          background: `radial-gradient(circle 350px at ${style.glarePos.x}% ${style.glarePos.y}%, rgba(2, 132, 199, 0.15), rgba(13, 148, 136, 0.08) 40%, transparent 70%)`,
        }}
      />

      {/* Card Content with subtle 3D lift */}
      <div style={{ transform: 'translateZ(10px)' }} className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
