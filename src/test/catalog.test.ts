import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl, WHATSAPP_DISPLAY } from '@/data/catalog';

describe('Nutrivida contact', () => {
  it('routes appointment requests to +55 61 98658-0143', () => {
    const url = new URL(buildWhatsAppUrl('Massoterapia', 'Turno: Tarde'));
    expect(url.hostname).toBe('wa.me');
    expect(url.pathname).toBe('/5561986580143');
    expect(WHATSAPP_DISPLAY).toBe('+55 61 98658-0143');
    expect(url.searchParams.get('text')).toContain('Massoterapia');
    expect(url.searchParams.get('text')).toContain('Turno: Tarde');
  });
});