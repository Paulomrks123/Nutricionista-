import { useSafeReducedMotion } from '@/hooks/use-safe-reduced-motion';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, Expand, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HERO_IMAGE, buildWhatsAppUrl } from '@/data/catalog';
import { BotanicalSignature } from './CinematicLayer';

export function Hero({ onOpenGallery }: { onOpenGallery: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 75]);
  return (
    <section ref={ref} className="clinic-hero">
      <motion.img src={HERO_IMAGE.src} alt={HERO_IMAGE.alt} className="hero-photo" style={{ y }} fetchPriority="high" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content">
        <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <p className="hero-eyebrow"><span />Nutrição clínica & massoterapia terapêutica</p>
          <h1>Nutrivida<span>O cuidado que<br />reencontra o equilíbrio.</span></h1>
          <p className="hero-description">Cuidado alimentar e alívio corporal com precisão clínica. Planos para sua rotina, atenção para o seu corpo.</p>
          <div className="hero-actions">
            <Button asChild variant="metallic"><a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle />Agendar pelo WhatsApp<ArrowUpRight /></a></Button>
            <Button asChild variant="editorial" className="hero-secondary"><a href="#servicos">Explorar atendimentos<ArrowDown /></a></Button>
          </div>
        </motion.div>
        <div className="hero-bottom"><a href="#servicos" className="hero-scroll"><ArrowDown size={18} /><span>Seu cuidado começa aqui</span></a><Button variant="editorial" onClick={onOpenGallery} className="hero-gallery" aria-label="Abrir galeria de fotos do espaço"><Expand />Espaço Nutrivida</Button></div>
      </div>
      <div className="hero-botanical"><div className="botanical-orbit" /><BotanicalSignature /><span>Alimentar. Aliviar. Equilibrar.</span></div>
    </section>
  );
}
