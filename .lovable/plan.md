# Novo logo como ícone do site e imagem do link no WhatsApp

## O que muda
- **Ícone da aba do navegador:** passa a ser o coração com a mão e a folha do logo enviado (recortado em quadrado, sem o texto, para ficar legível em tamanho pequeno).
- **Prévia do link no WhatsApp:** ao compartilhar o site, aparece o logo completo "NUTI VIDA" sobre o fundo grafite, enquadrado no formato de prévia (1200x630).

## Observação
- O logo diz "NUTI VIDA", e o site usa "Nutrivida". Vou usar a imagem exatamente como enviada.
- O WhatsApp guarda prévias antigas por um tempo; a nova imagem aparece só depois de publicar, e às vezes só em links compartilhados de novo.

## Detalhes técnicos
- Gerar `public/favicon.png` (recorte quadrado do símbolo, 64x64 e 180x180 apple-touch-icon) com magick; trocar o link de ícone no `__root.tsx`; remover `public/favicon.ico` e `public/nutrivida-favicon.svg`.
- Gerar `public/og-nutrivida.jpg` 1200x630 (logo centralizado com padding no fundo escuro).
- Em `src/routes/index.tsx`, apontar og:image/twitter:image para `https://playful-possibility.lovable.app/og-nutrivida.jpg` e ajustar o tipo/alt.
