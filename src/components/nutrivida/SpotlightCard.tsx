import { ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/** Calm surface card: no cursor-following glow, so touch devices never flash. */
export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  return (
    <div className={`spotlight-card relative overflow-hidden rounded-lg border border-border bg-card transition-colors duration-200 ${className}`}>
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
