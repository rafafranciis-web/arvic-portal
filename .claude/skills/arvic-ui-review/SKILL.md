---
name: arvic-ui-review
description: Review static HTML files styled with Tailwind for the Arvic client portal's dark premium aesthetic. Flags AI-slop patterns, inconsistent spacing, low-contrast text, and redundant classes. Use when the user asks to review, polish, or "give life" to a portal page.
---

# Arvic UI Review

Review the target HTML/CSS against the Arvic portal's design system. Be direct and specific: cite file + line for each issue. Suggest fixes, not just complaints.

## Design system (authoritative)

- **Background**: `#0b0f1a` (ink-900) with subtle dot pattern (`.body` in style.css)
- **Brand teal**: `#3FA095` (brand-500), darker `#2E8A7F`, even darker `#1F746A`
- **Accent orange**: `#F29442` (accent-500) — use sparingly for highlights (charts, marcos, badges), not for primary CTAs
- **Typography**: Inter for body, Plus Jakarta Sans for `.font-display` headings. Tracking-tight on large headings.
- **Radius scale**: `rounded-lg` (0.5rem) for small buttons, `rounded-2xl` (1rem) for cards, `rounded-3xl` (1.5rem) for hero containers. Do not use `rounded-md` or other in-between values.
- **Spacing scale**: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 (Tailwind units 1, 2, 3, 4, 5, 6, 8, 10). Avoid off-scale values like 7, 9, 11.
- **Borders on cards**: `border-white/10` (default) or `border-brand-500/40` (active/selected)
- **Background layers**: `bg-white/[0.02]` for cards, `bg-white/[0.04]` on hover

## AI-slop patterns to flag and eliminate

- Generic purple gradient (`from-purple-*` to `from-pink-*`)
- Overused rainbow CSS
- "Shiny" emojis as primary decoration
- Default Inter everywhere (we use Plus Jakarta Sans on display headings — enforce it)
- Every card with identical `rounded-2xl bg-white/5 border border-white/10 p-6` without intent
- Unnecessary `backdrop-blur-2xl` / heavy blur on elements that do not overlap translucent surfaces
- Icons from random Heroicons set — our SVGs are 1.5–2px stroke, monochrome currentColor
- Center alignment on body text (our body copy is left-aligned)
- `h-full w-full` used where not needed

## Checklist to walk through

1. **Tipografia**: heading usa `.font-display`? Tem `tracking-tight` em títulos `>= text-3xl`? Line-height proporcional (`leading-tight` em hero, `leading-relaxed` em parágrafos)?
2. **Contraste**: texto cinza em fundo escuro passa WCAG AA? `text-slate-400` em `bg-ink-900` = 7.1:1 ✓. `text-slate-500` em cards `bg-white/[0.02]` é limite — evite pra copy importante.
3. **Classes redundantes**: `flex items-center justify-between` repetido em 10 lugares diferentes = extrair pra CSS utility. `transition` sem prop específica = OK. Propriedades conflitantes (`bg-red-500 bg-blue-500`) = bug.
4. **Animations**: transições têm timing function definido (`ease-out-cubic` preferred)? Duração entre 150ms (hover micro) e 700ms (reveal)?
5. **Responsividade**: breakpoints só `md:` e `lg:` — evite `sm:` que tende a quebrar. Sidebar fica `hidden md:flex` corretamente?
6. **Acessibilidade**: `alt` em imagens? `aria-label` em botões só-ícone? `:focus-visible` não foi desabilitado?
7. **Consistência de chips/badges**: usar as classes existentes `.chip .chip-ativo/.chip-concluido/.chip-em-revisao/.chip-pendente` — não criar paleta nova.
8. **CTAs primárias**: usar `.btn-primary` (gradient teal com shadow). Não inventar novos estilos.

## Output format

Quando reviewar, responda assim:

```
## Crítica
- `arquivo.html:123` — problema, recomendação concreta
- `arquivo.html:145` — problema, recomendação concreta
...

## Sugestão de fix
[Se houver, dar o Edit pronto ou patch específico]

## Veredito
[Uma linha: "Ok pra shipar" / "3 pequenos ajustes antes" / "Retrabalho significativo"]
```

Não seja diplomático demais. O usuário quer feedback real.
