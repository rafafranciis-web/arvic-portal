---
name: arvic-empty-states
description: Generate minimalist inline SVG illustrations, loading skeletons, and empty state blocks matching the Arvic dark premium theme. Use when user asks for empty state, loading state, placeholder, or "nothing here yet" blocks in HTML.
---

# Arvic Empty States

Gera empty/loading states para o portal Arvic. Estilo visual consistente com o resto do projeto.

## Regras visuais

- **SVG inline**, nunca imagem raster
- Traços de 1.5px (viewBox 24x24 padrão) ou 2px
- Monocromático `currentColor` + 1 acento opcional (`#3FA095` teal ou `#F29442` orange)
- `opacity: 0.55` no SVG quando dentro de `.empty-ill` — pede o CSS existente
- Geométrico, nada de ilustração fofa/cartoon
- Preferir "objeto simples + linha de ação" (ex: câmera com X, calendário com check, pasta vazia)

## Markup base

Use o componente existente em `style.css`:

```html
<div class="empty-ill">
  <svg class="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- SVG path aqui -->
  </svg>
  <div class="empty-ill-title">Título curto</div>
  <div class="empty-ill-sub">Explicação em 1 linha do que vai aparecer aqui e quando.</div>
</div>
```

O CSS já aplica color, opacity, padding.

## Copy pro empty state

- **Título**: 2–5 palavras, afirmativo. Não use "Ops" nem "Desculpe". Exemplo: "Nada pendente agora".
- **Subtítulo**: 1 frase de 8–15 palavras explicando quando o conteúdo aparece, tipo "Assim que tivermos vídeo novo pra revisar, aparece aqui."
- **Sem CTA** por padrão, a não ser que exista ação óbvia. Se houver CTA, usar link texto simples, não botão.

## Biblioteca de ícones Arvic (copie quando precisar)

### Pasta vazia
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M4 7l2-3h5l2 3h7v12a2 2 0 01-2 2H4V7z" />
  <path d="M9 14h6" opacity="0.5" />
</svg>
```

### Câmera "sem vídeo"
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M23 7l-7 5 7 5V7z"/>
  <rect x="1" y="5" width="15" height="14" rx="2"/>
  <path d="M4 8l4 4 4-4" opacity="0.4"/>
</svg>
```

### Calendário "sem eventos"
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <rect x="3" y="4" width="18" height="18" rx="2"/>
  <path d="M16 2v4M8 2v4M3 10h18"/>
  <circle cx="12" cy="16" r="1.5" opacity="0.5"/>
</svg>
```

### Gráfico sem dados
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M3 3v18h18"/>
  <path d="M7 14l3-3 4 4 5-6" stroke-dasharray="3 3" opacity="0.5"/>
</svg>
```

### Caixa de aprovação vazia (tudo aprovado)
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <circle cx="12" cy="12" r="10"/>
  <path d="M8 12l3 3 5-6" stroke="#3FA095" stroke-width="2"/>
</svg>
```

### Biblioteca vazia (livros empilhados)
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
  <path d="M4 6a2 2 0 012-2h4v16H6a2 2 0 01-2-2V6z"/>
  <path d="M14 4h4a2 2 0 012 2v12a2 2 0 01-2 2h-4V4z" opacity="0.5"/>
</svg>
```

## Skeleton loaders

Quando dados estão carregando de fato (API async), gerar skeleton com shimmer:

```html
<div class="space-y-3">
  <div class="h-6 w-2/3 rounded bg-white/[0.04] shimmer-skel"></div>
  <div class="h-4 w-full rounded bg-white/[0.04] shimmer-skel"></div>
  <div class="h-4 w-4/5 rounded bg-white/[0.04] shimmer-skel"></div>
</div>
```

E o CSS do `shimmer-skel`:
```css
.shimmer-skel {
  background: linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 75%);
  background-size: 200% 100%;
  animation: shimmerSkel 1.8s ease-in-out infinite;
}
@keyframes shimmerSkel { to { background-position: -200% 0 } }
```

## Output format

Quando o usuário pedir empty state, entregue o HTML completo + a copy (título + subtítulo) + instruções se precisar adicionar CSS extra. Se houver 3+ contextos diferentes (videos/artes/roteiros), gere os 3 juntos pra consistência.
