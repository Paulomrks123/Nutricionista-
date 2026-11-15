import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl, WHATSAPP_DISPLAY, BUSINESS_ADDRESS, BUSINESS_HOURS, GOOGLE_MAPS_URL } from '@/data/catalog';

describe('Nutrivida contact', () => {
  it('routes appointment requests to +55 61 98658-0143', () => {
    const url = new URL(buildWhatsAppUrl('Massoterapia', 'Turno: Tarde'));
    expect(url.hostname).toBe('wa.me');
    expect(url.pathname).toBe('/5561986580143');
    expect(WHATSAPP_DISPLAY).toBe('+55 61 98658-0143');
    expect(url.searchParams.get('text')).toContain('Massoterapia');
    expect(url.searchParams.get('text')).toContain('Turno: Tarde');
  });
  it('uses the verified Gama clinic address and specific Maps listing', () => {
    expect(BUSINESS_ADDRESS).toBe('St. Central, projeção nº 01 — Gama, Brasília — DF, CEP 72405-526');
    expect(new URL(GOOGLE_MAPS_URL).searchParams.get('query_place_id')).toBe('ChIJhY24N7iBWZMRvj3sukyvaZs');
  });
  it('keeps weekdays open from 08:00 to 17:00', () => {
    expect(BUSINESS_HOURS[0]).toEqual({ days: 'Segunda a sexta', opens: '08:00', closes: '17:00' });
  });
  it('keeps Saturday open from 08:00 to 12:00', () => {
    expect(BUSINESS_HOURS[1]).toEqual({ days: 'Sábado', opens: '08:00', closes: '12:00' });
  });
  it('keeps Sunday closed', () => {
    expect(BUSINESS_HOURS[2]).toEqual({ days: 'Domingo', opens: null, closes: null });
  });
});