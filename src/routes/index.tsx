import { createFileRoute } from "@tanstack/react-router";
import { NutrividaApp } from "@/components/nutrivida/NutrividaApp";

const siteUrl = "https://nutrivida-inky.vercel.app";
const previewImage = `${siteUrl}/og-nutrivida.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "canonical", href: siteUrl },
    ],
    meta: [
      { title: "Nutrivida Nutrição e Massoterapia | Atendimento Especializado" },
      { name: "description", content: "Planos alimentares personalizados, massoterapia terapêutica e agendamento ágil pelo WhatsApp." },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Nutrivida" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:title", content: "Nutrivida Nutrição e Massoterapia" },
      { property: "og:description", content: "Nutrição clínica e massoterapia terapêutica com agendamento direto pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { property: "og:image", content: previewImage },
      { property: "og:image:secure_url", content: previewImage },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Nutrivida — Nutrição e Massoterapia" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nutrivida Nutrição e Massoterapia" },
      { name: "twitter:description", content: "Nutrição clínica e massoterapia terapêutica com agendamento direto pelo WhatsApp." },
      { name: "twitter:image", content: previewImage },
      { name: "twitter:image:alt", content: "Nutrivida — Nutrição e Massoterapia" },
    ],
  }),
  component: NutrividaApp,
});
