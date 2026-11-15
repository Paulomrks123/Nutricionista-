import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowUpRight, Maximize2, Check } from 'lucide-react';
import { ServiceItem, buildWhatsAppUrl } from '@/data/catalog';
import { ResilientImage } from './ResilientImage';
import { useDialogFocus } from '@/hooks/use-dialog-focus';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenGallery: (imageSrc: string) => void;
}

export function ServiceModal({ service, onClose, onOpenGallery }: ServiceModalProps) {
  useDialogFocus(Boolean(service), 'service-modal-title');
  useEffect(() => {
    if (!service) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          key="service-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-overlay/82 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          onClick={onClose}
        >
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="surface-specular relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border/[0.12] bg-card text-foreground shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
              <ResilientImage
                src={service.image}
                alt={service.imageAlt}
                fallbackTitle={service.title}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-foreground/25 to-transparent" />

              <Button variant="editorial"
                type="button"
                onClick={onClose}
                aria-label="Fechar detalhes do serviço"
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border/15 bg-background/85 text-foreground transition-colors duration-150 hover:border-primary hover:text-primary"
              >
                <X className="h-5 w-5" />
              </Button>

              <Button variant="editorial"
                type="button"
                onClick={() => onOpenGallery(service.image)}
                aria-label="Ampliar imagem na galeria"
                className="absolute bottom-4 right-4 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border/15 bg-background/85 px-3.5 py-2 text-xs font-medium text-foreground transition-colors duration-150 hover:border-primary hover:text-primary"
              >
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
                <span>Ampliar foto</span>
              </Button>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-foreground/65">
                  <span>{service.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{service.durationLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{service.bookingLabel}</span>
                </div>
                <h3
                  id="service-modal-title"
                  className="text-2xl font-bold tracking-normal text-foreground"
                >
                  {service.title}
                </h3>
              </div>

              <p className="text-[15px] leading-relaxed text-foreground/85">
                {service.fullDescription}
              </p>

              <div className="space-y-3 border-t border-border/[0.08] pt-5">
                <h4 className="text-sm font-semibold text-foreground">
                  O que está incluído no atendimento
                </h4>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {service.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[15px] leading-snug text-foreground/80"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-border/[0.08] bg-background/70 p-4">
                <p className="text-sm leading-relaxed text-foreground/80">
                  {service.anticipationNote}
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <Button asChild variant="metallic"><a
                  href={buildWhatsAppUrl(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary"
                >
                  <span>Consultar Valores no WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a></Button>

                <Button variant="editorial"
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border/[0.12] px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors duration-150 hover:border-border/30 hover:text-foreground"
                >
                  Voltar aos serviços
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
