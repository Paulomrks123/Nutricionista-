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
      { property: "og:image", content: "https://playful-possibility.lovable.app/og-nutrivida.jpg" },
      { property: "og:image:secure_url", content: "https://playful-possibility.lovable.app/og-nutrivida.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Nutrivida — Nutrição e Massoterapia" },
      { name: "twitter:image", content: "https://playful-possibility.lovable.app/og-nutrivida.jpg" },
      { name: "twitter:image:alt", content: "Nutrivida — Nutrição e Massoterapia" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NutrividaApp,
});
