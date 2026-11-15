import { useRef, useState } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  ArrowUpRight,
  Clock,
  Expand,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import {
  BUSINESS_NAME,
  DIFFERENTIALS,
  GALLERY_ITEMS,
  GOOGLE_MAPS_URL,
  HERO_IMAGE,
  METHOD_IMAGE,
  PROCESS_STEPS,
  SERVICES_CATALOG,
  ServiceCategory,
  ServiceItem,
  buildWhatsAppUrl,
  WHATSAPP_DISPLAY,
} from '@/data/catalog';
import { Header } from './Header';
import { ResilientImage } from './ResilientImage';
import { SpotlightCard } from './SpotlightCard';
import { InteractivePlanner } from './InteractivePlanner';
import { ServiceModal } from './ServiceModal';
import { GalleryLightbox } from './GalleryLightbox';
import { ContactForm } from './ContactForm';
import { MobileBottomBar } from './MobileBottomBar';
import { AmbientLayer, CinematicIntro, CinematicMarquee } from './CinematicLayer';

const CATEGORIES: ServiceCategory[] = ['Todos', 'Nutrição', 'Massoterapia', 'Integrado'];

export function NutrividaApp() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('Todos');
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const heroSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });
  const heroMediaY = useTransform(heroScrollProgress, [0, 1], [0, shouldReduceMotion ? 0 : 32]);
  const heroMediaScale = useTransform(
    heroScrollProgress,
    [0, 1],
    [1, shouldReduceMotion ? 1 : 1.04],
  );

  const filteredServices =
    selectedCategory === 'Todos'
      ? SERVICES_CATALOG
      : SERVICES_CATALOG.filter((item) => item.category === selectedCategory);

  const openLightboxBySrc = (src: string) => {
    const foundIndex = GALLERY_ITEMS.findIndex((item) => item.src === src);
    setLightboxIndex(foundIndex >= 0 ? foundIndex : 0);
  };

  const revealProps = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <MotionConfig reducedMotion="user">
      <div id="topo" className="relative min-h-screen bg-transparent pb-20 text-[#f3f4f6] md:pb-0">
        <CinematicIntro />
        <AmbientLayer />
        <Header />

        <main className="relative z-10">
          {/* 1. Hero de Alto Impacto com Profundidade Perceptiva */}
          <section
            ref={heroSectionRef}
            className="architectural-grid relative overflow-hidden border-b border-white/[0.08]"
          >
            {/* Atmospheric lighting layers */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-36 right-[-8%] h-[520px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.11)_0%,rgba(9,11,16,0)_70%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090b10] to-transparent"
            />

            <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-20">
              <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
                <motion.div
                  {...revealProps(0)}
                  className="flex flex-col justify-between gap-8 lg:col-span-6"
                >
                  <div className="space-y-6">
                    <p className="text-sm font-medium tracking-wide text-[#d4af37]">
                      Nutrição Clínica · Massoterapia Terapêutica
                    </p>

                    <h1
                      className="cine-headline text-balance font-extrabold tracking-tight"
                      style={{ fontSize: 'clamp(2.25rem, 4.1vw, 3.65rem)', lineHeight: 1.06 }}
                    >
                      Cuidado alimentar e alívio corporal com precisão clínica.
                    </h1>

                    <p className="max-w-xl text-[16px] leading-relaxed text-[#f3f4f6]/80">
                      Na <strong className="font-semibold text-[#f3f4f6]">{BUSINESS_NAME}</strong>,
                      você encontra planos nutricionais aplicáveis à rotina real e sessões de
                      massoterapia direcionadas para tensão muscular, postura e recuperação física.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <a
                        href={buildWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg bg-[#d4af37] px-6 py-3 text-[15px] font-semibold text-[#090b10] shadow-[0_0_32px_-8px_rgba(212,175,55,0.55)] transition-all duration-150 hover:bg-[#e2c155]"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        <span>Agendar pelo WhatsApp</span>
                      </a>

                      <a
                        href="#servicos"
                        className="surface-specular inline-flex min-h-[48px] items-center justify-center rounded-lg border border-white/[0.12] bg-[#141822]/90 px-6 py-3 text-[15px] font-medium text-[#f3f4f6] backdrop-blur-md transition-colors duration-150 hover:border-[#d4af37]/50 hover:text-[#d4af37]"
                      >
                        Explorar atendimentos
                      </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#f3f4f6]/65">
                      <span>Atendimento com agendamento prévio</span>
                      <span aria-hidden="true">·</span>
                      <a
                        href={GOOGLE_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#f3f4f6]/85 underline decoration-white/25 underline-offset-4 transition-colors duration-150 hover:text-[#d4af37] hover:decoration-[#d4af37]"
                      >
                        <MapPin className="h-3.5 w-3.5 text-[#d4af37]" aria-hidden="true" />
                        <span>Ver localização no Google Maps</span>
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  {...revealProps(0.08)}
                  className="relative flex flex-col lg:col-span-6"
                >
                  <div className="surface-specular group relative flex-1 overflow-hidden rounded-xl border border-white/[0.1] bg-[#141822] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)]">
                    <motion.div
                      style={{ y: heroMediaY, scale: heroMediaScale }}
                      className="h-full w-full"
                    >
                      <ResilientImage
                        src={HERO_IMAGE.src}
                        alt={HERO_IMAGE.alt}
                        fallbackTitle={BUSINESS_NAME}
                        onClick={() => openLightboxBySrc(HERO_IMAGE.src)}
                        className="h-72 w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-96 lg:h-full"
                      />
                    </motion.div>

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090b10]/90 via-black/20 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                      <div className="rounded-lg border border-white/[0.08] bg-[#090b10]/75 px-4 py-3 backdrop-blur-md">
                        <p className="text-xs font-medium text-[#d4af37]">Espaço Nutrivida</p>
                        <p className="mt-0.5 text-sm font-medium text-[#f3f4f6]">
                          Consultório e sala terapêutica preparados para atendimento exclusivo
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => openLightboxBySrc(HERO_IMAGE.src)}
                        aria-label="Abrir galeria de fotos do espaço"
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#090b10]/85 text-[#f3f4f6] backdrop-blur-md transition-colors duration-150 hover:border-[#d4af37] hover:text-[#d4af37]"
                      >
                        <Expand className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Full-width verified operational strip */}
              <div className="mt-12 grid gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-[#f3f4f6]/55">Localização</p>
                  <p className="text-[15px] font-semibold text-[#f3f4f6]">
                    Região Comercial · Acesso pelo Google Maps
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-[#f3f4f6]/55">Horários</p>
                  <p className="text-[15px] font-semibold text-[#f3f4f6]">
                    Atendimento com agendamento prévio
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-[#f3f4f6]/55">Valores e Pagamento</p>
                  <p className="text-[15px] font-semibold text-[#f3f4f6]">
                    Tabela completa informada via WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Apresentação dos Principais Produtos e Serviços */}
          <CinematicMarquee />

          <section id="servicos" className="border-b border-white/[0.08] py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <motion.div
                {...revealProps(0)}
                className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
              >
                <div className="max-w-2xl space-y-3">
                  <p className="text-sm font-medium text-[#d4af37]">Catálogo de Atendimentos</p>
                  <h2 className="text-balance text-3xl font-bold tracking-tight text-[#f3f4f6] sm:text-4xl">
                    Serviços em nutrição e massoterapia
                  </h2>
                  <p className="text-[15px] leading-relaxed text-[#f3f4f6]/75">
                    Clique em qualquer atendimento para explorar os detalhes completos ou iniciar uma
                    consulta direta de valores e horários pelo WhatsApp.
                  </p>
                </div>

                {/* Animated shared-layout segmented filter bar */}
                <div
                  role="tablist"
                  aria-label="Filtrar serviços por área"
                  className="inline-flex flex-wrap gap-1 rounded-lg border border-white/[0.08] bg-[#141822] p-1.5"
                >
                  {CATEGORIES.map((category) => {
                    const active = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedCategory(category)}
                        className={`relative min-h-[40px] whitespace-nowrap shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                          active ? 'text-[#090b10] font-semibold' : 'text-[#f3f4f6]/75 hover:text-[#f3f4f6]'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="active-category-pill"
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 rounded-md bg-[#d4af37]"
                          />
                        )}
                        <span className="relative z-10">{category}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {filteredServices.map((service) => (
                    <motion.article
                      layout
                      key={service.id}
                      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <SpotlightCard className="group flex h-full flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#111827]">
                          <ResilientImage
                            src={service.image}
                            alt={service.imageAlt}
                            fallbackTitle={service.title}
                            onClick={() => setActiveService(service)}
                            className="h-full w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141822] via-black/15 to-transparent" />

                          <button
                            type="button"
                            onClick={() => openLightboxBySrc(service.image)}
                            aria-label={`Ampliar foto de ${service.title}`}
                            className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-[#090b10]/80 text-[#f3f4f6] backdrop-blur-md transition-colors duration-150 hover:border-[#d4af37] hover:text-[#d4af37]"
                          >
                            <Expand className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-7">
                          <div className="space-y-3">
                            {/* Unboxed metadata with typographic separators */}
                            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#f3f4f6]/60">
                              <span className="tabular-nums text-[#d4af37]">{service.code}</span>
                              <span aria-hidden="true">·</span>
                              <span>{service.category}</span>
                              <span aria-hidden="true">·</span>
                              <span>{service.durationLabel}</span>
                            </div>

                            <h3 className="text-xl font-bold tracking-tight text-[#f3f4f6]">
                              <button
                                type="button"
                                onClick={() => setActiveService(service)}
                                className="text-left transition-colors duration-150 hover:text-[#d4af37]"
                              >
                                {service.title}
                              </button>
                            </h3>

                            <p className="text-[15px] leading-relaxed text-[#f3f4f6]/80">
                              {service.shortDescription}
                            </p>

                            <p className="border-t border-white/[0.08] pt-3 text-sm leading-relaxed text-[#f3f4f6]/65">
                              {service.anticipationNote}
                            </p>
                          </div>

                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <a
                              href={buildWhatsAppUrl(service.title)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#d4af37] px-4 py-2.5 text-sm font-semibold text-[#090b10] transition-colors duration-150 hover:bg-[#e2c155]"
                            >
                              <span>Consultar Valores no WhatsApp</span>
                              <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                            </a>

                            <button
                              type="button"
                              onClick={() => setActiveService(service)}
                              className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap shrink-0 rounded-lg border border-white/[0.12] px-4 py-2.5 text-sm font-medium text-[#f3f4f6] transition-colors duration-150 hover:border-[#d4af37]/50 hover:text-[#d4af37]"
                            >
                              Ver detalhes
                            </button>
                          </div>
                        </div>
                      </SpotlightCard>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          {/* Interactive Session & Nutrition Configurator */}
          <InteractivePlanner />

          {/* 3. Diferenciais Reais e Métodos de Trabalho */}
          <section id="diferenciais" className="border-b border-white/[0.08] py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <motion.div {...revealProps(0)} className="lg:col-span-5">
                  <div className="surface-specular group relative overflow-hidden rounded-xl border border-white/[0.1] bg-[#141822]">
                    <ResilientImage
                      src={METHOD_IMAGE.src}
                      alt={METHOD_IMAGE.alt}
                      fallbackTitle="Método de atendimento Nutrivida"
                      onClick={() => openLightboxBySrc(METHOD_IMAGE.src)}
                      className="aspect-[4/3] w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-[1.02] lg:aspect-[3/4]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090b10]/85 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-sm font-medium text-[#f3f4f6]">
                        Atendimento individualizado com foco prático na sua rotina
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div {...revealProps(0.08)} className="space-y-8 lg:col-span-7">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[#d4af37]">Como Trabalhamos</p>
                    <h2 className="text-balance text-3xl font-bold tracking-tight text-[#f3f4f6] sm:text-4xl">
                      Nutrição e massoterapia alinhadas às necessidades do seu dia a dia
                    </h2>
                    <p className="text-[15px] leading-relaxed text-[#f3f4f6]/75">
                      Estruturamos cada atendimento para resolver demandas concretas da rotina —
                      organização alimentar acessível, alívio de sobrecarga muscular e recuperação
                      física consistente.
                    </p>
                  </div>

                  <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                    {DIFFERENTIALS.map((item) => (
                      <div key={item.number} className="py-6 first:pt-5 last:pb-5">
                        <div className="flex items-start gap-4">
                          <span className="tabular-nums pt-0.5 text-sm font-bold text-[#d4af37]">
                            {item.number}.
                          </span>
                          <div className="space-y-1.5">
                            <h3 className="text-lg font-bold text-[#f3f4f6]">{item.title}</h3>
                            <p className="text-[15px] leading-relaxed text-[#f3f4f6]/80">
                              {item.description}
                            </p>
                            <p className="text-sm text-[#f3f4f6]/60">{item.detail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 4. Processo de Atendimento e Como Contratar */}
          <section id="processo" className="border-b border-white/[0.08] py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <motion.div {...revealProps(0)} className="max-w-2xl space-y-3">
                <p className="text-sm font-medium text-[#d4af37]">Agendamento Simples</p>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-[#f3f4f6] sm:text-4xl">
                  Como agendar sua consulta ou sessão
                </h2>
                <p className="text-[15px] leading-relaxed text-[#f3f4f6]/75">
                  Clique em cada etapa abaixo para visualizar os detalhes do fluxo até o seu
                  atendimento presencial.
                </p>
              </motion.div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {PROCESS_STEPS.map((step, index) => {
                  const isActive = index === activeStepIndex;
                  return (
                    <motion.button
                      key={step.step}
                      type="button"
                      onClick={() => setActiveStepIndex(index)}
                      onMouseEnter={() => setActiveStepIndex(index)}
                      aria-pressed={isActive}
                      {...revealProps(index * 0.05)}
                      className={`surface-specular flex flex-col justify-between gap-5 rounded-xl border p-6 text-left transition-colors duration-200 ${
                        isActive
                          ? 'border-[#d4af37]/60 bg-[#141822]'
                          : 'border-white/[0.08] bg-[#141822]/70 hover:border-white/20'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span
                            className={`tabular-nums text-2xl font-extrabold transition-colors duration-150 ${
                              isActive ? 'text-[#d4af37]' : 'text-[#f3f4f6]/45'
                            }`}
                          >
                            {step.step}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold leading-snug text-[#f3f4f6]">
                          {step.title}
                        </h3>
                        <p className="text-[15px] leading-relaxed text-[#f3f4f6]/75">
                          {step.description}
                        </p>
                      </div>

                      <p className="border-t border-white/[0.08] pt-3 text-xs font-medium text-[#f3f4f6]/65">
                        {step.actionHint}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 5. Localização, Horários e Canais Oficiais de Atendimento */}
          <section id="contato" className="border-b border-white/[0.08] py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <motion.div {...revealProps(0)} className="space-y-6 lg:col-span-5">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[#d4af37]">Canais Oficiais</p>
                    <h2 className="text-balance text-3xl font-bold tracking-tight text-[#f3f4f6]">
                      Localização, horários e atendimento direto
                    </h2>
                    <p className="text-[15px] leading-relaxed text-[#f3f4f6]/75">
                      Acesse nossa localização verificada no Google Maps ou fale diretamente com a
                      equipe para confirmar horários e tabela completa de valores.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <SpotlightCard className="p-5">
                      <div className="flex items-start gap-3.5">
                        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#d4af37]" aria-hidden="true" />
                        <div className="space-y-2">
                          <h3 className="text-base font-semibold text-[#f3f4f6]">
                            Endereço e Rota no Google Maps
                          </h3>
                          <p className="text-[15px] text-[#f3f4f6]/75">
                            {BUSINESS_NAME} — Região Comercial.
                          </p>
                          <a
                            href={GOOGLE_MAPS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-[#d4af37] underline-offset-4 hover:underline"
                          >
                            <span>Abrir rota no Google Maps</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </SpotlightCard>

                    <SpotlightCard className="p-5">
                      <div className="flex items-start gap-3.5">
                        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#d4af37]" aria-hidden="true" />
                        <div className="space-y-1.5">
                          <h3 className="text-base font-semibold text-[#f3f4f6]">
                            Horários de Atendimento
                          </h3>
                          <p className="text-[15px] leading-relaxed text-[#f3f4f6]/75">
                            Atendimento com agendamento prévio. Consulte os horários disponíveis na
                            semana diretamente pelo WhatsApp.
                          </p>
                        </div>
                      </div>
                    </SpotlightCard>

                    <SpotlightCard className="p-5">
                      <div className="flex items-start gap-3.5">
                        <MessageCircle
                          className="mt-0.5 h-5 w-5 shrink-0 text-[#d4af37]"
                          aria-hidden="true"
                        />
                        <div className="space-y-2">
                          <h3 className="text-base font-semibold text-[#f3f4f6]">
                            WhatsApp Oficial de Atendimento
                          </h3>
                          <p className="text-[15px] text-[#f3f4f6]/75">
                            Solicite tabela completa de valores, formas de pagamento aceitas e
                            encaixes disponíveis.
                          </p>
                          <p className="text-base font-semibold tracking-wide text-[#f3f4f6]">
                            {WHATSAPP_DISPLAY}
                          </p>
                          <a
                            href={buildWhatsAppUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#d4af37]/40 bg-[#090b10] px-4 py-2 text-sm font-semibold text-[#d4af37] transition-colors duration-150 hover:bg-[#d4af37] hover:text-[#090b10]"
                          >
                            <span>Solicitar Tabela Completa</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </SpotlightCard>
                  </div>
                </motion.div>

                <motion.div {...revealProps(0.08)} className="lg:col-span-7">
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </section>

          {/* 6. Chamada para Ação clara para WhatsApp ou Orçamento */}
          <section className="relative overflow-hidden py-16 lg:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.09)_0%,rgba(9,11,16,0)_65%)]"
            />
            <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
              <motion.div {...revealProps(0)} className="space-y-6">
                <p className="text-sm font-medium text-[#d4af37]">
                  Atendimento Personalizado
                </p>

                <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[#f3f4f6] sm:text-4xl">
                  Pronto para agendar seu horário ou tirar dúvidas sobre nossos atendimentos?
                </h2>

                <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-[#f3f4f6]/75">
                  Converse diretamente com a equipe da Nutrivida Nutrição e Massoterapia no
                  WhatsApp para receber os valores atualizados e reservar o melhor horário.
                </p>

                <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#d4af37] px-7 py-3.5 text-[15px] font-semibold text-[#090b10] shadow-[0_0_32px_-8px_rgba(212,175,55,0.55)] transition-colors duration-150 hover:bg-[#e2c155] sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Iniciar conversa no WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setLightboxIndex(0)}
                    className="surface-specular inline-flex min-h-[48px] w-full items-center justify-center rounded-lg border border-white/[0.12] bg-[#141822] px-6 py-3.5 text-[15px] font-medium text-[#f3f4f6] transition-colors duration-150 hover:border-[#d4af37]/50 hover:text-[#d4af37] sm:w-auto"
                  >
                    Ver galeria do espaço
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/[0.08] bg-[#090b10] py-10">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6">
            <div className="space-y-1">
              <p className="text-base font-bold text-[#f3f4f6]">{BUSINESS_NAME}</p>
              <p className="text-sm text-[#f3f4f6]/60">
                Nutrição Clínica e Massoterapia Terapêutica · Atendimento com agendamento prévio
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[#f3f4f6]/70">
              <a href="#servicos" className="hover:text-[#d4af37]">
                Serviços
              </a>
              <a href="#diferenciais" className="hover:text-[#d4af37]">
                Método
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d4af37]"
              >
                Google Maps
              </a>
              <span className="text-[#f3f4f6]/45">© {new Date().getFullYear()} Nutrivida</span>
            </div>
          </div>
        </footer>

        <MobileBottomBar />

        <ServiceModal
          service={activeService}
          onClose={() => setActiveService(null)}
          onOpenGallery={(src) => {
            setActiveService(null);
            openLightboxBySrc(src);
          }}
        />

        <GalleryLightbox
          activeIndex={lightboxIndex}
          onChangeIndex={(idx) => setLightboxIndex(idx)}
          onClose={() => setLightboxIndex(null)}
        />
      </div>
    </MotionConfig>
  );
}
