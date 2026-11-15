import { createFileRoute } from "@tanstack/react-router";
import { NutrividaApp } from "@/components/nutrivida/NutrividaApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nutrivida Nutrição e Massoterapia | Atendimento Especializado" },
      { name: "description", content: "Planos alimentares personalizados, massoterapia terapêutica e agendamento ágil pelo WhatsApp." },
      { property: "og:title", content: "Nutrivida Nutrição e Massoterapia" },
      { property: "og:description", content: "Nutrição clínica e massoterapia terapêutica com agendamento direto pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NutrividaApp,
});
