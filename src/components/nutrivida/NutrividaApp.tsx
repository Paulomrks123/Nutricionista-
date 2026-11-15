import { useSafeReducedMotion } from '@/hooks/use-safe-reduced-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
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
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
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
import { CinematicMarquee } from './CinematicLayer';
import { Hero } from './Hero';

const MotionButton = motion.create(Button);

const CATEGORIES: ServiceCategory[] = ['Todos', 'Nutrição', 'Massoterapia', 'Integrado'];

export function NutrividaApp() {
  const shouldReduceMotion = useSafeReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('Todos');
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

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
      <div id="topo" className="nutrivida-app relative min-h-screen bg-background pb-20 text-foreground md:pb-0">
        <Header />

        <main className="relative z-10">
          <Hero onOpenGallery={() => openLightboxBySrc(HERO_IMAGE.src)} />

          {/* 2. Apresentação dos Principais Produtos e Serviços */}
          <CinematicMarquee />

          <section id="servicos" className="border-b border-border/[0.08] py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <motion.div
                {...revealProps(0)}
                className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
              >
                <div className="max-w-2xl space-y-3">
                  <p className="text-sm font-medium text-primary">Catálogo de Atendimentos</p>
                  <h2 className="text-balance text-3xl font-bold tracking-normal text-foreground sm:text-4xl">
                    Serviços em nutrição e massoterapia
                  </h2>
                  <p className="text-[15px] leading-relaxed text-foreground/75">
                    Planos alimentares e terapias manuais. Diferentes caminhos para um cuidado
                    que respeita o seu ritmo.
                  </p>
                </div>

                {/* Animated shared-layout segmented filter bar */}
                <div
                  role="tablist"
                  aria-label="Filtrar serviços por área"
                  className="inline-flex flex-wrap gap-1 rounded-lg border border-border/[0.08] bg-card p-1.5"
                >
                  {CATEGORIES.map((category) => {
                    const active = selectedCategory === category;
                    return (
                      <Button variant="editorial"
                        key={category}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedCategory(category)}
                        className={`relative min-h-[40px] whitespace-nowrap shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                          active ? 'text-primary-foreground font-semibold' : 'text-foreground/75 hover:text-foreground'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="active-category-pill"
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 rounded-md bg-primary"
                          />
                        )}
                        <span className="relative z-10">{category}</span>
                      </Button>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div layout className="service-grid mt-10 grid gap-6 md:grid-cols-2">
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
                      <SpotlightCard className="service-card group flex h-full flex-col">
                        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                          <ResilientImage
                            src={service.image}
                            alt={service.imageAlt}
                            fallbackTitle={service.title}
                            onClick={() => setActiveService(service)}
                            className="h-full w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-foreground/15 to-transparent" />

                          <Button variant="editorial"
                            type="button"
                            onClick={() => openLightboxBySrc(service.image)}
                            aria-label={`Ampliar foto de ${service.title}`}
                            className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border/15 bg-background/80 text-foreground backdrop-blur-md transition-colors duration-150 hover:border-primary hover:text-primary"
                          >
                            <Expand className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-7">
                          <div className="space-y-3">
                            {/* Unboxed metadata with typographic separators */}
                            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-foreground/60">
                              <span className="tabular-nums text-primary">{service.code}</span>
                              <span aria-hidden="true">·</span>
                              <span>{service.category}</span>
                              <span aria-hidden="true">·</span>
                              <span>{service.durationLabel}</span>
                            </div>

                            <h3 className="text-xl font-bold tracking-normal text-foreground">
                              <Button variant="editorial"
                                type="button"
                                onClick={() => setActiveService(service)}
                                className="text-left transition-colors duration-150 hover:text-primary"
                              >
                                {service.title}
                              </Button>
                            </h3>

                            <p className="text-[15px] leading-relaxed text-foreground/80">
                              {service.shortDescription}
                            </p>

                            <p className="border-t border-border/[0.08] pt-3 text-sm leading-relaxed text-foreground/65">
                              {service.anticipationNote}
                            </p>
                          </div>

                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Button asChild variant="metallic"><a
                              href={buildWhatsAppUrl(service.title)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary"
                            >
                              <span>Consultar Valores no WhatsApp</span>
                              <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                            </a></Button>

                            <Button variant="editorial"
                              type="button"
                              onClick={() => setActiveService(service)}
                              className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap shrink-0 rounded-lg border border-border/[0.12] px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-150 hover:border-primary/50 hover:text-primary"
                            >
                              Ver detalhes
                            </Button>
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
          <section id="diferenciais" className="border-b border-border/[0.08] py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <motion.div {...revealProps(0)} className="lg:col-span-5">
                  <div className="surface-specular group relative overflow-hidden rounded-lg border border-border/[0.1] bg-card">
                    <ResilientImage
                      src={METHOD_IMAGE.src}
                      alt={METHOD_IMAGE.alt}
                      fallbackTitle="Método de atendimento Nutrivida"
                      onClick={() => openLightboxBySrc(METHOD_IMAGE.src)}
                      className="aspect-[4/3] w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-[1.02] lg:aspect-[3/4]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-sm font-medium text-foreground">
                        Atendimento individualizado com foco prático na sua rotina
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div {...revealProps(0.08)} className="space-y-8 lg:col-span-7">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-primary">Como Trabalhamos</p>
                    <h2 className="text-balance text-3xl font-bold tracking-normal text-foreground sm:text-4xl">
                      Nutrição e massoterapia alinhadas às necessidades do seu dia a dia
                    </h2>
                    <p className="text-[15px] leading-relaxed text-foreground/75">
                      Estruturamos cada atendimento para resolver demandas concretas da rotina —
                      organização alimentar acessível, alívio de sobrecarga muscular e recuperação
                      física consistente.
                    </p>
                  </div>

                  <div className="divide-y divide-border/[0.08] border-y border-border/[0.08]">
                    {DIFFERENTIALS.map((item) => (
                      <div key={item.number} className="py-6 first:pt-5 last:pb-5">
                        <div className="flex items-start gap-4">
                          <span className="tabular-nums pt-0.5 text-sm font-bold text-primary">
                            {item.number}.
                          </span>
                          <div className="space-y-1.5">
                            <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                            <p className="text-[15px] leading-relaxed text-foreground/80">
                              {item.description}
                            </p>
                            <p className="text-sm text-foreground/60">{item.detail}</p>
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
          <section id="processo" className="border-b border-border/[0.08] py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <motion.div {...revealProps(0)} className="max-w-2xl space-y-3">
                <p className="text-sm font-medium text-primary">Agendamento Simples</p>
                <h2 className="text-balance text-3xl font-bold tracking-normal text-foreground sm:text-4xl">
                  Como agendar sua consulta ou sessão
                </h2>
                <p className="text-[15px] leading-relaxed text-foreground/75">
                  Clique em cada etapa abaixo para visualizar os detalhes do fluxo até o seu
                  atendimento presencial.
                </p>
              </motion.div>

              <div className="process-grid mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {PROCESS_STEPS.map((step, index) => {
                  const isActive = index === activeStepIndex;
                  return (
                    <MotionButton variant="editorial"
                      key={step.step}
                      type="button"
                      onClick={() => setActiveStepIndex(index)}
                      onMouseEnter={() => setActiveStepIndex(index)}
                      aria-pressed={isActive}
                      {...revealProps(index * 0.05)}
                      className={`surface-specular flex flex-col justify-between gap-5 rounded-lg border p-6 text-left transition-colors duration-200 ${
                        isActive
                          ? 'border-primary/60 bg-card'
                          : 'border-border/[0.08] bg-card/70 hover:border-border/20'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span
                            className={`tabular-nums text-2xl font-extrabold transition-colors duration-150 ${
                              isActive ? 'text-primary' : 'text-foreground/45'
                            }`}
                          >
                            {step.step}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold leading-snug text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-[15px] leading-relaxed text-foreground/75">
                          {step.description}
                        </p>
                      </div>

                      <p className="border-t border-border/[0.08] pt-3 text-xs font-medium text-foreground/65">
                        {step.actionHint}
                      </p>
                    </MotionButton>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 5. Localização, Horários e Canais Oficiais de Atendimento */}
          <section id="contato" className="border-b border-border/[0.08] py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <motion.div {...revealProps(0)} className="space-y-6 lg:col-span-5">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-primary">Canais Oficiais</p>
                    <h2 className="text-balance text-3xl font-bold tracking-normal text-foreground">
                      Localização, horários e atendimento direto
                    </h2>
                    <p className="text-[15px] leading-relaxed text-foreground/75">
                      Acesse nossa localização verificada no Google Maps ou fale diretamente com a
                      equipe para confirmar horários e tabela completa de valores.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <SpotlightCard className="p-5">
                      <div className="flex items-start gap-3.5">
                        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                        <div className="space-y-2">
                          <h3 className="text-base font-semibold text-foreground">
                            Endereço e Rota no Google Maps
                          </h3>
                          <p className="text-[15px] text-foreground/75">
                            {BUSINESS_ADDRESS}
                          </p>
                          <a
                            href={GOOGLE_MAPS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                          >
                            <span>Abrir rota no Google Maps</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </SpotlightCard>

                    <SpotlightCard className="p-5">
                      <div className="flex items-start gap-3.5">
                        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                        <div className="space-y-1.5">
                          <h3 className="text-base font-semibold text-foreground">
                            Horários de Atendimento
                          </h3>
                          <dl className="space-y-2 text-sm text-foreground/80">
                            {BUSINESS_HOURS.map((hours) => (
                              <div key={hours.days} className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                                <dt>{hours.days}</dt>
                                <dd className="tabular-nums font-semibold">{hours.opens && hours.closes ? `${hours.opens}–${hours.closes}` : 'Fechado'}</dd>
                              </div>
                            ))}
                          </dl>
                          <p className="text-sm leading-relaxed text-foreground/75">Atendimento com agendamento prévio. Confirme disponibilidade e horários em feriados pelo WhatsApp.</p>
                          <p className="text-xs text-muted-foreground">Horários informados no Google Maps.</p>
                        </div>
                      </div>
                    </SpotlightCard>

                    <SpotlightCard className="p-5">
                      <div className="flex items-start gap-3.5">
                        <MessageCircle
                          className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <div className="space-y-2">
                          <h3 className="text-base font-semibold text-foreground">
                            WhatsApp Oficial de Atendimento
                          </h3>
                          <p className="text-[15px] text-foreground/75">
                            Solicite tabela completa de valores, formas de pagamento aceitas e
                            encaixes disponíveis.
                          </p>
                          <p className="text-base font-semibold tracking-normal text-foreground">
                            {WHATSAPP_DISPLAY}
                          </p>
                          <Button asChild variant="metallic"><a
                            href={buildWhatsAppUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-primary/40 bg-background px-4 py-2 text-sm font-semibold text-primary transition-colors duration-150 hover:bg-primary hover:text-primary-foreground"
                          >
                            <span>Solicitar Tabela Completa</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </a></Button>
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
            <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
              <motion.div {...revealProps(0)} className="space-y-6">
                <p className="text-sm font-medium text-primary">
                  Atendimento Personalizado
                </p>

                <h2 className="text-balance text-3xl font-extrabold tracking-normal text-foreground sm:text-4xl">
                  Pronto para agendar seu horário ou tirar dúvidas sobre nossos atendimentos?
                </h2>

                <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-foreground/75">
                  Converse diretamente com a equipe da Nutrivida Nutrição e Massoterapia no
                  WhatsApp para receber os valores atualizados e reservar o melhor horário.
                </p>

                <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
                  <Button asChild variant="metallic"><a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-soft transition-colors duration-150 hover:bg-primary sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Iniciar conversa no WhatsApp</span>
                  </a></Button>

                  <Button variant="editorial"
                    type="button"
                    onClick={() => setLightboxIndex(0)}
                    className="surface-specular inline-flex min-h-[48px] w-full items-center justify-center rounded-lg border border-border/[0.12] bg-card px-6 py-3.5 text-[15px] font-medium text-foreground transition-colors duration-150 hover:border-primary/50 hover:text-primary sm:w-auto"
                  >
                    Ver galeria do espaço
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="border-t border-border/[0.08] bg-background py-10">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6">
            <div className="space-y-1">
              <p className="text-base font-bold text-foreground">{BUSINESS_NAME}</p>
              <p className="text-sm text-foreground/60">
                Nutrição Clínica e Massoterapia Terapêutica · Atendimento com agendamento prévio
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/70">
              <a href="#servicos" className="hover:text-primary">
                Serviços
              </a>
              <a href="#diferenciais" className="hover:text-primary">
                Método
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                Google Maps
              </a>
              <span className="text-foreground/45">© {new Date().getFullYear()} Nutrivida</span>
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
