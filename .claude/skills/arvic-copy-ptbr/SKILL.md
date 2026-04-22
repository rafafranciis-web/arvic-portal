---
name: arvic-copy-ptbr
description: Humanize and tighten Brazilian Portuguese marketing copy for the Arvic client portal and landing. Removes corporate jargon, prefers active voice, avoids AI-speak and English-translated patterns. Use when user asks to review, humanize, or rewrite any user-facing text.
---

# Arvic Copy · PT-BR

Reescreve copy de marketing/portal em português brasileiro. O objetivo é som humano e direto — não corporativo, não "tradução do inglês", não IA.

## Princípios

1. **Frase curta vence**. Se a frase tem mais de 18 palavras, quebra.
2. **Voz ativa**. "A Arvic entrega X" > "X é entregue pela Arvic".
3. **Segunda pessoa** (`você`, `seu`, `sua`). Não use `cliente`, `usuário`, `pessoa`, `empresário`.
4. **Concreto vence abstrato**. "Seu paciente agenda no Instagram" > "Aumentamos engajamento nas redes".
5. **Dito como se falaria**. Contrações, "a gente", "não", "né" — com moderação. Não é chat, não é carta formal.
6. **CTAs** em 3 palavras ou menos: "Acessar portal", "Conversar com a Arvic", "Aprovar vídeo".

## Termos proibidos (substituir sempre)

| Cortar | Trocar por |
|---|---|
| solução robusta | solução que funciona |
| sinergia | colaboração, alinhamento |
| alavancar | impulsionar, acelerar, destravar |
| maximizar potencial | crescer, escalar |
| entregar valor | resolver, entregar |
| empoderar | dar autonomia, apoiar |
| engajamento | interação, presença, alcance (contexto específico) |
| experiência única do usuário | jeito como [X] funciona, caminho do cliente |
| transformação digital | digitalização, virar digital |
| otimizar resultados | melhorar resultados, aumentar resultados |
| disruptivo | diferente, novo, quebra padrão |
| unlock | destravar |
| jornada completa (genérico) | [nomear a jornada específica] |

## Padrões de tradução-do-inglês a caçar

- "Nós na Arvic..." → "A Arvic..." (não traduz "We at Arvic")
- "Isto é onde..." → "É aqui que..."
- "Certifique-se de..." → "Confira se...", "Garanta que..."
- "Para entender isto melhor..." → "Pra você entender melhor..."
- Gerúndio excessivo: "Estamos trabalhando em..." → "A gente trabalha em..."

## Formato AI-slop a eliminar

- Abrir com "Bem-vindo ao mundo de..."
- Frases com três adjetivos em sequência ("inovador, eficiente e transformador")
- Listas com paralelismo artificial ("Nós pensamos. Nós criamos. Nós entregamos.")
- "Não é apenas X, é Y" usado mais de uma vez por documento
- Frases que começam com "Na era digital..."
- Exclamações em copy séria (!)
- Emoji como ponto final (normal em toast/microcopy, evita em copy institucional)

## Tom específico da Arvic

- Confiante, não arrogante
- Direto, não rude
- Humano, não caloroso-demais
- Técnico quando precisa, nunca por vaidade
- Nunca "amigo" nem "parceiro" (sinal de texto solto de MBA)

## Output format

Quando reviewar copy, responda:

```
## Original
> [texto]

## Reescrita
[versão humana e direta]

## O que mudei
- [mudança 1 + por quê em 1 linha]
- [mudança 2 + por quê]
```

Se copy já está boa, diga: "Sem mexer. Tom humano, direto, claro."
