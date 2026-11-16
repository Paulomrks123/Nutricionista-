import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl } from '@/data/catalog';

const LINKS = [{ href: '#servicos', label: 'Serviços' }, { href: '#diferenciais', label: 'Método' }, { href: '#processo', label: 'Atendimento' }, { href: '#contato', label: 'Contato' }];
export function Header() {
  const [open, setOpen] = useState(false);
  const handleSectionNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute('href');
    if (!href?.startsWith('#')) return;
    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    setOpen(false);
    window.history.pushState(null, '', href);

    // Aguarda o painel móvel terminar de recolher antes de calcular a posição da seção.
    window.setTimeout(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }, open ? 350 : 0);
  };
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 32 });
  return <header className="clinic-header"><div className="header-inner">
    <a href="#topo" className="brand-wordmark" aria-label="Nutrivida início"><svg viewBox="0 0 32 36" fill="none" aria-hidden="true"><path d="M16 33V19C16 10 24 4 29 3C30 13 27 20 16 23C5 20 2 13 3 3C8 4 16 10 16 19M16 23L25 8M16 23L7 8" /></svg><span>Nutrivida<small>Nutrição & massoterapia</small></span></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{LINKS.map(link => <a key={link.href} href={link.href} onClick={handleSectionNavigation}>{link.label}</a>)}</nav>
    <Button asChild variant="metallic" className="header-cta"><a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">Agendar<ArrowUpRight /></a></Button>
    <button type="button" className="mobile-menu-button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X /> : <Menu />}</button>
  </div><motion.div className="scroll-progress" style={{ scaleX }} />
  <AnimatePresence>{open && <motion.nav id="mobile-navigation" aria-label="Menu móvel" className="mobile-nav" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><div className="mobile-nav-inner">{LINKS.map(link => <a key={link.href} href={link.href} onClick={handleSectionNavigation}>{link.label}<ArrowUpRight size={16} /></a>)}</div></motion.nav>}</AnimatePresence>
  </header>;
}
