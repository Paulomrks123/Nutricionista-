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
  const [selectedGoalId, setSelectedGoalId] = useState<string>(GOALS[0].id);
  const [selectedWindow, setSelectedWindow] = useState<(typeof WINDOWS)[number]>('Horário flexível');
  const [selectedApproach, setSelectedApproach] =
    useState<(typeof INTENSITIES)[number]>('Foco direto em resultado prático');

  const activeGoal = GOALS.find((goal) => goal.id === selectedGoalId) ?? GOALS[0];

  const customNote = `Objetivo principal: ${activeGoal.label} | Preferência de turno: ${selectedWindow} | Perfil: ${selectedApproach}`;
  const whatsappHref = buildWhatsAppUrl(activeGoal.serviceTitle, customNote);

  return (
    <section aria-labelledby="planner-heading" className="border-b border-white/[0.08] py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-medium text-[#d4af37]">Direcionamento de Atendimento</p>
            <h2
              id="planner-heading"
              className="text-balance text-3xl font-bold tracking-tight text-[#f3f4f6] sm:text-4xl"
            >
              Configure seu atendimento ideal em segundos
            </h2>
            <p className="text-[15px] leading-relaxed text-[#f3f4f6]/75">
              Selecione seu objetivo e preferência de turno para visualizar o formato indicado e
              enviar a solicitação pronta diretamente para o WhatsApp da equipe.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-[#f3f4f6]/60">
            <SlidersHorizontal className="h-4 w-4 text-[#d4af37]" aria-hidden="true" />
            <span>Pré-agendamento sem compromisso</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Controls Column */}
          <SpotlightCard className="p-6 sm:p-8 lg:col-span-7">
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[#f3f4f6]">
                  1. Qual é a sua prioridade neste momento?
                </p>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {GOALS.map((goal) => {
                    const isSelected = goal.id === selectedGoalId;
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => setSelectedGoalId(goal.id)}
                        aria-pressed={isSelected}
                        className={`relative flex min-h-[52px] items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-[15px] font-medium transition-colors duration-150 ${
                          isSelected
                            ? 'border-[#d4af37] bg-[#d4af37]/12 text-[#f3f4f6]'
                            : 'border-white/[0.08] bg-[#090b10]/70 text-[#f3f4f6]/75 hover:border-white/25 hover:text-[#f3f4f6]'
                        }`}
                      >
                        <span>{goal.label}</span>
                        {isSelected && (
                          <Check className="h-4 w-4 shrink-0 text-[#d4af37]" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 border-t border-white/[0.08] pt-6">
                <p className="text-sm font-semibold text-[#f3f4f6]">
                  2. Preferência de turno para consulta ou sessão
                </p>
                <div className="flex flex-wrap gap-2">
                  {WINDOWS.map((win) => {
                    const isSelected = win === selectedWindow;
                    return (
                      <button
                        key={win}
                        type="button"
                        onClick={() => setSelectedWindow(win)}
                        aria-pressed={isSelected}
                        className={`min-h-[44px] whitespace-nowrap shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                          isSelected
                            ? 'border-[#d4af37] bg-[#d4af37] font-semibold text-[#090b10]'
                            : 'border-white/[0.08] bg-[#090b10]/70 text-[#f3f4f6]/75 hover:border-white/25 hover:text-[#f3f4f6]'
                        }`}
                      >
                        {win}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 border-t border-white/[0.08] pt-6">
                <p className="text-sm font-semibold text-[#f3f4f6]">
                  3. Estilo de acompanhamento preferido
                </p>
                <div className="flex flex-wrap gap-2">
                  {INTENSITIES.map((item) => {
                    const isSelected = item === selectedApproach;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setSelectedApproach(item)}
                        aria-pressed={isSelected}
                        className={`min-h-[44px] whitespace-nowrap shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                          isSelected
                            ? 'border-[#d4af37] bg-[#d4af37]/15 text-[#d4af37]'
                            : 'border-white/[0.08] bg-[#090b10]/70 text-[#f3f4f6]/75 hover:border-white/25 hover:text-[#f3f4f6]'
                        }`}
                      >
                        {item}
                      </button>
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
                    <p className="text-xs font-medium text-[#d4af37]">
                      Atendimento Recomendado · {selectedWindow}
                    </p>
                    <h3 className="text-xl font-bold tracking-tight text-[#f3f4f6]">
                      {activeGoal.serviceTitle}
                    </h3>
                  </div>

                  <p className="text-[15px] leading-relaxed text-[#f3f4f6]/80">
                    {activeGoal.summary}
                  </p>

                  <div className="space-y-2.5 border-t border-white/[0.08] pt-4">
                    <p className="text-xs font-semibold text-[#f3f4f6]/60">
                      O que você recebe neste formato
                    </p>
                    <ul className="space-y-2">
                      {activeGoal.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[15px] leading-snug text-[#f3f4f6]/85"
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

                  <div className="rounded-lg border border-white/[0.08] bg-[#090b10]/80 p-3.5">
                    <p className="text-sm leading-relaxed text-[#f3f4f6]/70">
                      {activeGoal.preparation}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-white/[0.08] pt-5">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#d4af37] px-5 py-3 text-[15px] font-semibold text-[#090b10] transition-colors duration-150 hover:bg-[#e2c155]"
                  >
                    <span>Consultar Valores e Horários no WhatsApp</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                  <p className="text-center text-xs text-[#f3f4f6]/55">
                    A mensagem já abre preenchida com suas preferências selecionadas.
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
