import { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { SHORT_BRAND, buildWhatsAppUrl } from '@/data/catalog';

const NAV_LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#diferenciais', label: 'Método' },
  { href: '#processo', label: 'Atendimento' },
  { href: '#contato', label: 'Localização' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#090b10]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#topo"
          className="whitespace-nowrap shrink-0 text-lg font-extrabold tracking-tight text-[#f3f4f6] transition-colors duration-150 hover:text-[#d4af37]"
        >
          {SHORT_BRAND}
        </a>

        {/* Zone 2: 4 concise single-line text links */}
        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 text-sm font-medium text-[#f3f4f6]/80 underline-offset-8 transition-colors duration-150 hover:text-[#f3f4f6] hover:underline hover:decoration-[#d4af37]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex min-h-[44px] items-center justify-center whitespace-nowrap shrink-0 rounded-lg bg-[#d4af37] px-5 py-2.5 text-sm font-semibold text-[#090b10] transition-colors duration-150 hover:bg-[#e2c155]"
          >
            Agendar WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.08] bg-[#141822] text-[#f3f4f6] transition-colors duration-150 hover:border-[#d4af37]/50 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="h-[1.5px] origin-left bg-[#d4af37]"
      />

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Menu móvel"
          className="border-t border-white/[0.08] bg-[#090b10] px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-[15px] font-medium text-[#f3f4f6]/90 transition-colors duration-150 hover:bg-[#141822] hover:text-[#d4af37]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg bg-[#d4af37] px-4 py-2.5 text-[15px] font-semibold text-[#090b10]"
            >
              Agendar pelo WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
