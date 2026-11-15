import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

export function CinematicIntro() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="cine-intro"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.6em", filter: "blur(12px)" }}
            animate={{ opacity: 1, letterSpacing: "0.32em", filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="cine-intro-word"
          >
            NUTRIVIDA
          </motion.div>
          <motion.div
            className="cine-intro-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AmbientLayer() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });
  useEffect(() => {
    const m = (e: PointerEvent) => {
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);
    };
    window.addEventListener("pointermove", m);
    return () => window.removeEventListener("pointermove", m);
  }, [x, y]);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="cine-aurora cine-aurora-a" />
      <div className="cine-aurora cine-aurora-b" />
      <motion.div className="cine-cursor-glow" style={{ x: sx, y: sy }} />
      <div className="cine-grain" />
      <div className="cine-vignette" />
    </div>
  );
}

const WORDS = ["Nutrição clínica", "Massoterapia terapêutica", "Precisão", "Recuperação", "Equilíbrio", "Performance"];

export function CinematicMarquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="cine-marquee" aria-hidden="true">
      <div className="cine-marquee-track">
        {row.concat(row).map((w, i) => (
          <span key={i} className="cine-marquee-item">
            {w}
            <span className="cine-marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
