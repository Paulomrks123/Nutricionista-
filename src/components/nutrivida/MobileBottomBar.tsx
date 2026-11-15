import { MapPin, MessageCircle } from 'lucide-react';
import { GOOGLE_MAPS_URL, buildWhatsAppUrl } from '@/data/catalog';

export function MobileBottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.1] bg-[#090b10]/95 px-3 py-2 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-2.5">
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir localização no Google Maps"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-lg border border-white/[0.14] bg-[#141822] px-3.5 text-sm font-medium text-[#f3f4f6] transition-colors duration-150 hover:border-[#d4af37]"
        >
          <MapPin className="h-4 w-4 text-[#d4af37]" aria-hidden="true" />
          <span>Mapa</span>
        </a>

        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#d4af37] px-4 text-sm font-semibold text-[#090b10] transition-colors duration-150 hover:bg-[#e2c155]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span>Agendar no WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
