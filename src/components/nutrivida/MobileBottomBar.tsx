import { Button } from '@/components/ui/button';
import { MapPin, MessageCircle } from 'lucide-react';
import { GOOGLE_MAPS_URL, buildWhatsAppUrl } from '@/data/catalog';

export function MobileBottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/[0.1] bg-background/95 px-3 py-2 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-2.5">
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir localização no Google Maps"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border/[0.14] bg-card px-3.5 text-sm font-medium text-foreground transition-colors duration-150 hover:border-primary"
        >
          <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Mapa</span>
        </a>

        <Button asChild variant="metallic"><a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span>Agendar no WhatsApp</span>
        </a></Button>
      </div>
    </div>
  );
}
