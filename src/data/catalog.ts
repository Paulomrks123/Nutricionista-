export const BUSINESS_NAME = 'Nutrivida Nutrição e Massoterapia';
export const SHORT_BRAND = 'Nutrivida';
export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Nutrivida%20nutri%C3%A7%C3%A3o%20e%20massoterapia';

export const WHATSAPP_NUMBER = '5561986580143';
export const WHATSAPP_DISPLAY = '+55 61 98658-0143';

export function buildWhatsAppUrl(serviceName?: string, customNote?: string): string {
  const baseGreeting = serviceName
    ? `Olá! Estava no site da Nutrivida Nutrição e Massoterapia e gostaria de consultar valores e horários para: ${serviceName}.`
    : 'Olá! Estava no site da Nutrivida Nutrição e Massoterapia e gostaria de consultar valores e horários disponíveis para agendamento.';

  const fullText = customNote ? `${baseGreeting}\n\nObservação: ${customNote}` : baseGreeting;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullText)}`;
}

export type ServiceCategory = 'Todos' | 'Nutrição' | 'Massoterapia' | 'Integrado';

export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  category: Exclude<ServiceCategory, 'Todos'>;
  shortDescription: string;
  fullDescription: string;
  anticipationNote: string;
  durationLabel: string;
  bookingLabel: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export const HERO_IMAGE = {
  src: '/images/hero_nutrivida_clinic_1794763404518.jpg',
  alt: 'Sala de atendimento da Nutrivida Nutrição e Massoterapia com maca terapêutica, iluminação quente e frascos de óleos essenciais sobre madeira escura.',
};

export const METHOD_IMAGE = {
  src: '/images/method_atendimento_integrado_1794763406806.jpg',
  alt: 'Consultório acolhedor da Nutrivida durante atendimento individualizado de nutrição com material de avaliação e chá natural.',
};

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'nutricao-clinica',
    code: '01',
    title: 'Avaliação Nutricional e Plano Alimentar',
    category: 'Nutrição',
    shortDescription:
      'Planejamento alimentar estruturado para sua rotina real, preferências e metas de saúde ou composição corporal.',
    fullDescription:
      'Consulta completa com análise de histórico alimentar, rotina de horários, exames laboratoriais disponíveis e montagem de plano prático com opções de substituição para o dia a dia sem restrições extremas.',
    anticipationNote:
      'Atendimento presencial com agendamento prévio. Consulte formas de pagamento e tabela de valores diretamente pelo WhatsApp.',
    durationLabel: 'Consulta individualizada',
    bookingLabel: 'Agendamento prévio',
    highlights: [
      'Anamnese clínica e levantamento detalhado de hábitos e rotina',
      'Cardápio adaptado aos alimentos acessíveis na sua região',
      'Lista de substituições práticas para trabalho e refeições fora de casa',
      'Orientações de acompanhamento e retorno conforme objetivo',
    ],
    image: '/images/service_nutricao_clinica_1794763405239.jpg',
    imageAlt:
      'Tigela cerâmica sobre pedra escura com vegetais frescos, grãos integrais, castanhas e frutas cítricas representando nutrição clínica equilibrada.',
  },
  {
    id: 'massoterapia-terapeutica',
    code: '02',
    title: 'Massoterapia Terapêutica e Relaxante',
    category: 'Massoterapia',
    shortDescription:
      'Manobras manuais direcionadas para alívio de tensões musculares acumuladas, dor cervical, lombar e fadiga física.',
    fullDescription:
      'Sessão conduzida de acordo com os pontos de maior sobrecarga do seu corpo, combinando técnicas de relaxamento profundo e pressão terapêutica controlada com óleos vegetais e ambiente climatizado.',
    anticipationNote:
      'Não requer preparo prévio. Duração da sessão, opções de pacotes e formas de pagamento informadas na hora pelo WhatsApp.',
    durationLabel: 'Sessão sob medida',
    bookingLabel: 'Horário reservado',
    highlights: [
      'Avaliação rápida inicial dos pontos de tensão antes da sessão',
      'Foco em região cervical, ombros, costas e membros inferiores',
      'Ambiente reservado com iluminação indireta e conforto térmico',
      'Indicação clara de frequência conforme necessidade muscular',
    ],
    image: '/images/service_massoterapia_terapeutica_1794763405546.jpg',
    imageAlt:
      'Pedras basálticas aquecidas, toalhas de linho escuras dobradas e frasco âmbar de óleo terapêutico sobre madeira.',
  },
  {
    id: 'drenagem-miofascial',
    code: '03',
    title: 'Liberação Miofascial e Drenagem Corporal',
    category: 'Massoterapia',
    shortDescription:
      'Técnica específica para redução de retenção de líquidos, recuperação muscular pós-treino e melhora da mobilidade.',
    fullDescription:
      'Atuação precisa sobre fáscia muscular e sistema linfático para quem busca recuperação após atividades físicas intensas, alívio de sensação de peso nas pernas ou redução de inchaço corporal.',
    anticipationNote:
      'Disponível em sessões avulsas ou acompanhamento contínuo. Solicite a tabela completa e disponibilidade de horários via WhatsApp.',
    durationLabel: 'Recuperação e mobilidade',
    bookingLabel: 'Sessão individual ou pacote',
    highlights: [
      'Manobras manuais lentas e rítmicas respeitando o limiar de conforto',
      'Auxílio na redução de edemas e desconfortos circulatórios leves',
      'Indicado para praticantes de atividade física e longas jornadas em pé ou sentado',
      'Orientação pós-sessão para potencializar hidratação e recuperação',
    ],
    image: '/images/service_drenagem_liberacao_1794763406059.jpg',
    imageAlt:
      'Maca de massoterapia em sala serena com toalhas dobradas e instrumentos de madeira para liberação miofascial.',
  },
  {
    id: 'programa-integrado',
    code: '04',
    title: 'Acompanhamento Integrado: Nutrição + Massoterapia',
    category: 'Integrado',
    shortDescription:
      'Protocolo combinado que une ajuste nutricional e sessões periódicas de massoterapia para bem-estar contínuo.',
    fullDescription:
      'Desenvolvido para clientes que desejam cuidar da alimentação e do alívio físico em um único lugar, otimizando agenda e alinhando estratégias anti-inflamatórias alimentares ao cuidado muscular.',
    anticipationNote:
      'Condições combinadas para consultas e sessões no mesmo local. Consulte disponibilidade e valores atualizados pelo WhatsApp.',
    durationLabel: 'Plano combinado',
    bookingLabel: 'Agenda coordenada',
    highlights: [
      'Alinhamento entre metas nutricionais e recuperação corporal',
      'Agendamento facilitado para concentrar seus cuidados no mesmo espaço',
      'Acompanhamento contínuo ajustado à evolução de cada etapa',
      'Comunicação direta pelo WhatsApp para remarcações e dúvidas',
    ],
    image: '/images/method_atendimento_integrado_1794763406806.jpg',
    imageAlt:
      'Atendimento consultivo em sala privativa da Nutrivida com anamnese nutricional e planejamento de cuidado integrado.',
  },
];

export const GALLERY_ITEMS = [
  {
    src: HERO_IMAGE.src,
    alt: HERO_IMAGE.alt,
    title: 'Ambiente de Atendimento Nutrivida',
    caption: 'Espaço reservado com iluminação controlada para sessões de massoterapia e acolhimento.',
  },
  ...SERVICES_CATALOG.map((item) => ({
    src: item.image,
    alt: item.imageAlt,
    title: item.title,
    caption: item.shortDescription,
  })),
];

export interface DifferentialItem {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export const DIFFERENTIALS: DifferentialItem[] = [
  {
    number: '01',
    title: 'Dois cuidados essenciais no mesmo endereço',
    description:
      'Integramos nutrição clínica e massoterapia terapêutica para tratar alimentação, disposição diária e tensão muscular de forma coordenada.',
    detail: 'Menos deslocamentos e mais coerência entre o que você come e como seu corpo se recupera.',
  },
  {
    number: '02',
    title: 'Planejamento possível de seguir na rotina real',
    description:
      'Nada de cardápios engessados ou listas com ingredientes difíceis de encontrar. Trabalhamos com seus horários, orçamento e preferências.',
    detail: 'Substituições práticas e orientações objetivas desde o primeiro encontro.',
  },
  {
    number: '03',
    title: 'Atendimento sem pressa e com horário reservado',
    description:
      'Cada sessão de massoterapia e cada consulta nutricional conta com horário exclusivo para ouvir suas queixas e adaptar a conduta.',
    detail: 'Comunicação direta com a equipe para tirar dúvidas antes e depois do atendimento.',
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  actionHint: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Escolha o atendimento de interesse',
    description:
      'Selecione entre nutrição, massoterapia ou acompanhamento integrado diretamente no catálogo ou clique no botão do WhatsApp.',
    actionHint: 'Você já inicia a conversa com o serviço preenchido.',
  },
  {
    step: '02',
    title: 'Confirme valores e horários no WhatsApp',
    description:
      'Nossa equipe informa os valores vigentes, formas de pagamento aceitas e os horários livres mais próximos para sua agenda.',
    actionHint: 'Retorno direto sem formulários longos ou burocracia.',
  },
  {
    step: '03',
    title: 'Realize sua consulta ou sessão presencial',
    description:
      'Compareça ao nosso espaço comercial no horário reservado para avaliação detalhada ou sessão terapêutica individualizada.',
    actionHint: 'Localização acessível com link direto no Google Maps.',
  },
  {
    step: '04',
    title: 'Acompanhamento contínuo e ajustes',
    description:
      'Receba suas orientações nutricionais ou plano de sessões e mantenha contato aberto pelo WhatsApp para revisões periódicas.',
    actionHint: 'Evolução acompanhada no seu ritmo.',
  },
];
