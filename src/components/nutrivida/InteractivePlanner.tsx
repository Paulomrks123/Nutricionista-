import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, SlidersHorizontal } from 'lucide-react';
import { buildWhatsAppUrl } from '@/data/catalog';
import { SpotlightCard } from './SpotlightCard';

interface GoalOption {
  id: string;
  label: string;
  serviceTitle: string;
  summary: string;
  preparation: string;
  deliverables: string[];
}

const GOALS: GoalOption[] = [
  {
    id: 'nutricao',
    label: 'Organizar alimentação e rotina',
    serviceTitle: 'Avaliação Nutricional e Plano Alimentar',
    summary:
      'Consulta clínica individualizada para estruturar refeições práticas compatíveis com seus horários, preferências e objetivos.',
    preparation:
      'Se possuir exames laboratoriais recentes, traga ou envie previamente pelo WhatsApp para enriquecer sua avaliação.',
    deliverables: [
      'Levantamento completo de hábitos e histórico alimentar',
      'Plano alimentar com substituições simples para o dia a dia',
      'Ajustes estratégicos conforme evolução e retorno',
    ],
  },
  {
    id: 'alivio',
    label: 'Aliviar tensão e dores musculares',
    serviceTitle: 'Massoterapia Terapêutica e Relaxante',
    summary:
      'Sessão direcionada aos principais pontos de sobrecarga muscular em cervical, ombros, costas e região lombar.',
    preparation:
      'Não exige preparo prévio; apenas informe no início da sessão as regiões com maior desconforto.',
    deliverables: [
      'Avaliação inicial rápida de pontos de tensão',
      'Manobras terapêuticas com pressão ajustada ao seu conforto',
      'Ambiente reservado com iluminação e temperatura controladas',
    ],
  },
  {
    id: 'recuperacao',
    label: 'Recuperação muscular e drenagem',
    serviceTitle: 'Liberação Miofascial e Drenagem Corporal',
    summary:
      'Técnica focada em mobilidade, redução de retenção de líquidos e recuperação física para quem pratica exercícios ou passa longas horas na mesma posição.',
    preparation:
      'Recomendamos hidratação adequada antes e após o atendimento para potencializar a resposta corporal.',
    deliverables: [
      'Liberação gradual de fáscia e grupos musculares sobrecarregados',
      'Estímulo rítmico para reduzir sensação de peso corporal',
      'Recomendações práticas de cuidado pós-sessão',
    ],
  },
  {
    id: 'integrado',
    label: 'Cuidado completo: Nutrição + Massoterapia',
    serviceTitle: 'Acompanhamento Integrado: Nutrição + Massoterapia',
    summary:
      'Atendimento coordenado que combina planejamento alimentar e sessões periódicas de massoterapia no mesmo endereço.',
    preparation:
      'Alinhamos os horários das duas frentes em uma única conversa pelo WhatsApp para otimizar sua agenda.',
    deliverables: [
      'Plano nutricional voltado à energia, saciedade e recuperação',
      'Sessões de massoterapia sincronizadas à sua rotina semanal',
      'Canal direto no WhatsApp para ajustes e remarcações',
    ],
  },
];

const WINDOWS = ['Manhã', 'Tarde', 'Noite', 'Horário flexível'] as const;
const INTENSITIES = [
  'Abordagem gradual e confortável',
  'Foco direto em resultado prático',
  'Quero orientação da equipe',
] as const;

export function InteractivePlanner() {
  const [selectedGoalId, setSelectedGoalId] = useState<string>('nutricao');
  const [selectedWindow, setSelectedWindow] = useState<(typeof WINDOWS)[number]>('Horário flexível');
  const [selectedApproach, setSelectedApproach] =
    useState<(typeof INTENSITIES)[number]>('Foco direto em resultado prático');

  const activeGoal = GOALS.find((goal) => goal.id === selectedGoalId) ?? GOALS[0];

  if (!activeGoal) return null;

  const customNote = `Objetivo principal: ${activeGoal.label} | Preferência de turno: ${selectedWindow} | Perfil: ${selectedApproach}`;
  const whatsappHref = buildWhatsAppUrl(activeGoal.serviceTitle, customNote);

  return (
    <section aria-labelledby="planner-heading" id="planejador" className="planner-section border-b border-border/[0.08] py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-medium text-primary">Direcionamento de Atendimento</p>
            <h2
              id="planner-heading"
              className="text-balance text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
            >
              Seu cuidado, no seu ritmo
            </h2>
            <p className="text-[15px] leading-relaxed text-foreground/75">
              Selecione seu objetivo e preferência de turno para visualizar o formato indicado e
              enviar a solicitação pronta diretamente para o WhatsApp da equipe.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-foreground/60">
            <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Pré-agendamento sem compromisso</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Controls Column */}
          <SpotlightCard className="p-6 sm:p-8 lg:col-span-7">
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">
                  1. Qual é a sua prioridade neste momento?
                </p>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {GOALS.map((goal) => {
                    const isSelected = goal.id === selectedGoalId;
                    return (
                      <Button variant="editorial"
                        key={goal.id}
                        type="button"
                        onClick={() => setSelectedGoalId(goal.id)}
                        aria-pressed={isSelected}
                        className={`relative flex min-h-[52px] items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-[15px] font-medium transition-colors duration-150 ${
                          isSelected
                            ? 'border-primary bg-primary/12 text-foreground'
                            : 'border-border/[0.08] bg-background/70 text-foreground/75 hover:border-border/25 hover:text-foreground'
                        }`}
                      >
                        <span>{goal.label}</span>
                        {isSelected && (
                          <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 border-t border-border/[0.08] pt-6">
                <p className="text-sm font-semibold text-foreground">
                  2. Preferência de turno para consulta ou sessão
                </p>
                <div className="flex flex-wrap gap-2">
                  {WINDOWS.map((win) => {
                    const isSelected = win === selectedWindow;
                    return (
                      <Button variant="editorial"
                        key={win}
                        type="button"
                        onClick={() => setSelectedWindow(win)}
                        aria-pressed={isSelected}
                        className={`min-h-[44px] rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                          isSelected
                            ? 'border-primary bg-primary font-semibold text-primary-foreground'
                            : 'border-border/[0.08] bg-background/70 text-foreground/75 hover:border-border/25 hover:text-foreground'
                        }`}
                      >
                        {win}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 border-t border-border/[0.08] pt-6">
                <p className="text-sm font-semibold text-foreground">
                  3. Estilo de acompanhamento preferido
                </p>
                <div className="flex flex-wrap gap-2">
                  {INTENSITIES.map((item) => {
                    const isSelected = item === selectedApproach;
                    return (
                      <Button variant="editorial"
                        key={item}
                        type="button"
                        onClick={() => setSelectedApproach(item)}
                        aria-pressed={isSelected}
                        className={`min-h-[44px] rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                          isSelected
                            ? 'border-primary bg-primary/15 text-primary'
                            : 'border-border/[0.08] bg-background/70 text-foreground/75 hover:border-border/25 hover:text-foreground'
                        }`}
                      >
                        {item}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Dynamic Preview Output Column */}
          <SpotlightCard className="p-6 sm:p-8 lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGoal.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full flex-col justify-between gap-6"
              >
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-primary">
                      Atendimento Recomendado · {selectedWindow}
                    </p>
                    <h3 className="text-xl font-bold tracking-normal text-foreground">
                      {activeGoal.serviceTitle}
                    </h3>
                  </div>

                  <p className="text-[15px] leading-relaxed text-foreground/80">
                    {activeGoal.summary}
                  </p>

                  <div className="space-y-2.5 border-t border-border/[0.08] pt-4">
                    <p className="text-xs font-semibold text-foreground/60">
                      O que você recebe neste formato
                    </p>
                    <ul className="space-y-2">
                      {activeGoal.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[15px] leading-snug text-foreground/85"
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

                  <div className="rounded-lg border border-border/[0.08] bg-background/80 p-3.5">
                    <p className="text-sm leading-relaxed text-foreground/70">
                      {activeGoal.preparation}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-border/[0.08] pt-5">
                  <Button asChild variant="metallic"><a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-[15px] font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary"
                  >
                    <span>Consultar Valores e Horários no WhatsApp</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a></Button>
                  <p className="text-center text-xs text-foreground/55">
                    Valores e disponibilidade confirmados pela equipe.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
