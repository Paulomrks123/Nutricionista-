import { Button } from '@/components/ui/button';
import { FormEvent, useState } from 'react';
import { ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { SERVICES_CATALOG, buildWhatsAppUrl } from '@/data/catalog';

interface FormState {
  name: string;
  phone: string;
  service: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  phone: '',
  service: 'Avaliação Nutricional e Plano Alimentar',
  message: '',
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = 'Informe seu nome para identificação no atendimento.';
    }

    const digitsOnly = form.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      nextErrors.phone = 'Informe um telefone ou WhatsApp válido com DDD.';
    }

    if (form.message.trim().length < 6) {
      nextErrors.message = 'Descreva brevemente o serviço ou dúvida desejada.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmittedData({ ...form });
    setErrors({});
  };

  const handleReset = () => {
    setSubmittedData(null);
    setForm(INITIAL_STATE);
  };

  if (submittedData) {
    const whatsappHref = buildWhatsAppUrl(
      submittedData.service,
      `Nome: ${submittedData.name} | Contato: ${submittedData.phone} | Mensagem: ${submittedData.message}`,
    );

    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col justify-between gap-6 rounded-lg border border-border/[0.08] bg-card p-6 sm:p-8"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
            <h3 className="text-xl font-bold text-foreground">Sua mensagem está pronta!</h3>
          </div>
          <p className="text-[15px] leading-relaxed text-foreground/80">
            Obrigado, {submittedData.name}. Seus dados sobre{' '}
            <span className="font-semibold text-foreground">{submittedData.service}</span> estão prontos para envio. Para consultar sobre valores e horários disponíveis, envie sua
            solicitação diretamente para o nosso WhatsApp:
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="metallic"><a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary"
          >
            <span>Enviar agora pelo WhatsApp</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a></Button>
          <Button variant="editorial"
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border/[0.12] px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors duration-150 hover:border-border/30 hover:text-foreground"
          >
            Enviar outra mensagem
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-lg border border-border/[0.08] bg-card p-6 sm:p-8"
    >
      <div className="space-y-1">
        <h3 className="text-xl font-bold tracking-normal text-foreground">
          Solicite horários ou tabela de valores
        </h3>
        <p className="text-[15px] text-foreground/70">
          Conte-nos sobre o cuidado que você procura.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="block text-sm font-medium text-foreground/90">
            Nome completo
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Como gostaria de ser chamado(a)"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            className="min-h-[44px] w-full rounded-lg border border-border/[0.12] bg-background px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-foreground/35 transition-colors duration-150 focus:border-primary focus:outline-none"
          />
          {errors.name && (
            <p id="error-name" className="flex items-center gap-1.5 text-xs text-destructive">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground/90">
            Telefone / WhatsApp
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="(00) 00000-0000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'error-phone' : undefined}
            className="min-h-[44px] w-full rounded-lg border border-border/[0.12] bg-background px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-foreground/35 transition-colors duration-150 focus:border-primary focus:outline-none"
          />
          {errors.phone && (
            <p id="error-phone" className="flex items-center gap-1.5 text-xs text-destructive">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-service" className="block text-sm font-medium text-foreground/90">
          Serviço de interesse
        </label>
        <select
          id="contact-service"
          name="service"
          value={form.service}
          onChange={(e) => setForm((prev) => ({ ...prev, service: e.target.value }))}
          className="min-h-[44px] w-full rounded-lg border border-border/[0.12] bg-background px-3.5 py-2.5 text-[15px] text-foreground transition-colors duration-150 focus:border-primary focus:outline-none"
        >
          {SERVICES_CATALOG.map((service) => (
            <option key={service.id} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Dúvida geral / Outras informações">Dúvida geral / Outras informações</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="block text-sm font-medium text-foreground/90">
          Mensagem ou preferência de turno
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={3}
          value={form.message}
          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          placeholder="Informe seu objetivo ou melhor turno para atendimento (manhã, tarde ou noite)."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message' : undefined}
          className="w-full rounded-lg border border-border/[0.12] bg-background px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-foreground/35 transition-colors duration-150 focus:border-primary focus:outline-none"
        />
        {errors.message && (
          <p id="error-message" className="flex items-center gap-1.5 text-xs text-destructive">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      <Button variant="editorial"
        type="submit"
        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary"
      >
        Enviar solicitação de contato
      </Button>
    </form>
  );
}
