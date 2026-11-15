import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_ITEMS } from '@/data/catalog';
import { ResilientImage } from './ResilientImage';

interface GalleryLightboxProps {
  activeIndex: number | null;
  onChangeIndex: (index: number) => void;
  onClose: () => void;
}

export function GalleryLightbox({
  activeIndex,
  onChangeIndex,
  onClose,
}: GalleryLightboxProps) {
  const total = GALLERY_ITEMS.length;

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        onChangeIndex((activeIndex + 1) % total);
      } else if (event.key === 'ArrowLeft') {
        onChangeIndex((activeIndex - 1 + total) % total);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, onChangeIndex, onClose, total]);

  const current = activeIndex !== null ? GALLERY_ITEMS[activeIndex] : null;
  const prevIndex = activeIndex !== null ? (activeIndex - 1 + total) % total : 0;
  const nextIndex = activeIndex !== null ? (activeIndex + 1) % total : 0;

  return (
    <AnimatePresence>
      {activeIndex !== null && current && (
        <motion.div
          key="gallery-lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/94 p-4 backdrop-blur-xl sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Galeria de imagens Nutrivida"
          onClick={onClose}
        >
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
            <span className="tabular-nums text-sm font-medium text-[#f3f4f6]/75">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar visualização ampliada"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-[#141822] text-[#f3f4f6] transition-colors duration-150 hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center gap-3 py-4 sm:gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => onChangeIndex(prevIndex)}
              aria-label="Foto anterior"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#141822] text-[#f3f4f6] transition-colors duration-150 hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="surface-specular flex max-h-[72vh] w-full flex-col overflow-hidden rounded-xl border border-white/[0.12] bg-[#141822]"
              >
                <ResilientImage
                  src={current.src}
                  alt={current.alt}
                  fallbackTitle={current.title}
                  className="max-h-[58vh] w-full object-cover"
                />
                <div className="border-t border-white/[0.08] p-4 sm:px-6 sm:py-4">
                  <p className="text-base font-semibold text-[#f3f4f6]">{current.title}</p>
                  <p className="mt-1 text-sm text-[#f3f4f6]/70">{current.caption}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => onChangeIndex(nextIndex)}
              aria-label="Próxima foto"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-[#141822] text-[#f3f4f6] transition-colors duration-150 hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div
            className="mx-auto flex w-full max-w-5xl items-center justify-center gap-2 overflow-x-auto pb-1"
            onClick={(e) => e.stopPropagation()}
          >
            {GALLERY_ITEMS.map((item, idx) => (
              <button
                key={item.src}
                type="button"
                onClick={() => onChangeIndex(idx)}
                aria-label={`Ver imagem ${idx + 1}: ${item.title}`}
                className={`h-12 w-16 shrink-0 overflow-hidden rounded-md border transition-opacity duration-150 ${
                  idx === activeIndex
                    ? 'border-[#d4af37] opacity-100'
                    : 'border-white/15 opacity-55 hover:opacity-90'
                }`}
              >
                <ResilientImage
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
