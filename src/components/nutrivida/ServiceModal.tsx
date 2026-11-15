import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ArrowUpRight, Maximize2, Check } from 'lucide-react';
import { ServiceItem, buildWhatsAppUrl } from '@/data/catalog';
import { ResilientImage } from './ResilientImage';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenGallery: (imageSrc: string) => void;
}

export function ServiceModal({ service, onClose, onOpenGallery }: ServiceModalProps) {
  useEffect(() => {
    if (!service) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 p-4 backdrop-blur-md"
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
            className="surface-specular relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-white/[0.12] bg-[#141822] text-[#f3f4f6] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#111827]">
              <ResilientImage
                src={service.image}
                alt={service.imageAlt}
                fallbackTitle={service.title}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141822] via-black/25 to-transparent" />

              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar detalhes do serviço"
                className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-[#090b10]/85 text-[#f3f4f6] transition-colors duration-150 hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                <X className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => onOpenGallery(service.image)}
                aria-label="Ampliar imagem na galeria"
                className="absolute bottom-4 right-4 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/15 bg-[#090b10]/85 px-3.5 py-2 text-xs font-medium text-[#f3f4f6] transition-colors duration-150 hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
                <span>Ampliar foto</span>
              </button>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#f3f4f6]/65">
                  <span>{service.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{service.durationLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{service.bookingLabel}</span>
                </div>
                <h3
                  id="service-modal-title"
                  className="text-2xl font-bold tracking-tight text-[#f3f4f6]"
                >
                  {service.title}
                </h3>
              </div>

              <p className="text-[15px] leading-relaxed text-[#f3f4f6]/85">
                {service.fullDescription}
              </p>

              <div className="space-y-3 border-t border-white/[0.08] pt-5">
                <h4 className="text-sm font-semibold text-[#f3f4f6]">
                  O que está incluído no atendimento
                </h4>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {service.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[15px] leading-snug text-[#f3f4f6]/80"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-white/[0.08] bg-[#090b10]/70 p-4">
                <p className="text-sm leading-relaxed text-[#f3f4f6]/80">
                  {service.anticipationNote}
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href={buildWhatsAppUrl(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#090b10] transition-colors duration-150 hover:bg-[#e2c155]"
                >
                  <span>Consultar Valores no WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/[0.12] px-5 py-2.5 text-sm font-medium text-[#f3f4f6]/80 transition-colors duration-150 hover:border-white/30 hover:text-[#f3f4f6]"
                >
                  Voltar aos serviços
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
