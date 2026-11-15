import { motion, useReducedMotion } from 'motion/react';

export function BotanicalSignature({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 160 180" fill="none" aria-hidden="true" className={`botanical-signature ${className}`}>
      <motion.path d="M80 165V90C80 50 112 24 142 18C144 58 128 93 80 105C32 93 16 58 18 18C48 24 80 50 80 90" initial={reduce ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.8, ease: 'easeInOut' }} />
      <motion.path d="M80 105L127 39M80 105L33 39" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: reduce ? 0 : 0.7 }} />
      <motion.circle cx="80" cy="165" r="3" initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ delay: reduce ? 0 : 1.6 }} />
    </svg>
  );
}

export function CinematicMarquee() {
  const words = ['Nutrição clínica', 'Massoterapia terapêutica', 'Recuperação', 'Equilíbrio'];
  return <div className="cine-marquee" aria-hidden="true"><div className="cine-marquee-track">{[...words, ...words, ...words, ...words].map((word, i) => <span key={i}>{word}<span className="marquee-separator">↗</span></span>)}</div></div>;
}
