# KHYR Labs — DESIGN.md

## 1. Overview
KHYR Labs makes small, carefully built tools for the screen (Windows apps, wallpapers) and for runs (Garmin watch faces, training plans).
Tagline: **Small tools. Steady days.**
Feel: a tidy lab notebook. Precise, calm, warm, a little playful. Never loud, never "AI gradient".
Core motif: the catalog. Every product, post and project is an entry with a number (No.001, No.002...). Numbers are real sequence, not decoration.

## 2. Logo
- Bracket-K: a straight navy stem + an orange chevron "<". Reads as a code bracket, a cursor and a step forward.
- Files: assets/khyr_B1_primary.svg (on light), assets/khyr_B7_reversed.svg (on dark), assets/khyr_B10_icon.svg (app icon / avatar).
- Never redraw, recolor or replace it with the text "[K]".

## 3. Color
| Token | Light | Dark | Use |
|---|---|---|---|
| paper | #F4EEE2 | #12162A | page background |
| surface | #FFFFFF | #1C2140 | cards, panels |
| ink | #1F2440 | #F4EEE2 | text, borders, frames |
| ink-soft | rgba(31,36,64,.68) | rgba(244,238,226,.70) | secondary text |
| grid | rgba(31,36,64,.07) | rgba(244,238,226,.05) | 36 px graph-paper grid |
| signal | #F2994A | #F2994A | the ONE accent: highlighter bar, primary action, chevron |
| sage | #7FB59A | #8FC3A9 | rare: "available / live" state, chart secondary |
Rules: signal orange appears at one or two key moments per screen. Sage is a state color, not decoration. No gradients except a soft lamp glow in dark mode heroes.

## 4. Type
- Outfit (Google Fonts): headlines and body. Headline 600–700, tight leading (1.05–1.1). Body 400, 17–18 px, line length under 70 characters.
- Geist Mono: catalog numbers (No.001), versions, prices, times. Never for paragraphs. On the web, labels are sentence case; ALL CAPS only inside Threads post cards.
- Highlighter: the key phrase of a headline gets an orange bar behind its lower 40%. One per headline at most.

## 5. Shape and depth
- Frame: a 3 px ink border, inset from the edge (Threads cards: 54 px). On the web the hero and catalog cards use a 2–3 px ink border.
- Radius: 0 for frames and catalog cards (paper), 14 px for app screenshots and keycaps, 999 px only for the island and pills.
- Shadow: hard offset shadow in ink (0 6px 0) for keycaps and the primary button only. No soft grey shadows.

## 6. Components
- Island nav (web): a dark pill at the top center, like paandaa. Shows the KHYR mark, mini Flo, the local time (no city name), language switch, theme switch. Opens once on load to show the sections.
- Catalog row: No. | name | what it does | runs on | price | action. Flagship rows can expand with a screenshot.
- Browser frame: screenshots of landing pages sit in a simple frame with three dots and a URL bar; on hover the long screenshot scrolls slowly.
- Keycap: white key, ink outline, thick ink bottom shadow.
- Threads post card: 1080x1350, paper + grid + frame, logo top left, No.### in a solid ink box top right, content type in an orange outlined box, Outfit headline with highlighter, footer "Small tools. Steady days." left, slide dots or "khyr.labs" right.

## 7. Motion
- One orchestrated moment per page (hero catalog cards dealt onto the desk). Everything else answers the user: island expands, screenshots scroll on hover, theme cross-fades.
- Respect prefers-reduced-motion: no movement, instant states.

## 7a. Mascot: Flo
- A small lab flask: navy outline (7 px at 220 px size), white or surface-colored glass, cream liquid in the bottom half, orange cork, three orange bubbles, two navy eyes with white pupils, small navy mouth.
- Behaviour: pupils follow the cursor anywhere on the page; blinks at random intervals (3–7 s); smiles and squashes slightly when the visitor hovers a product, card or button; bubbles rise when hovering the support buttons (Saweria, Ko-fi, Trakteer). Fully still with prefers-reduced-motion.
- Placement: above the hero headline (about 120 px), and a mini Flo inside the island nav next to the logo.
- Flo is a supporting character. The bracket-K stays the logo.

## 7b. Page transitions
- Every menu move (other views and sections on the same page) uses the View Transitions API: the old view moves up 160 px, scales to 0.95 and fades to 0.5; the new view rises from 50vh with clip-path inset(70% 0 0 0) opening to inset(0). Duration about 1.1 s, easing cubic-bezier(.4,.3,0,1). The island nav keeps its own view-transition-name so it stays still. Instant switch for reduced motion or old browsers.

## 8. Voice
- Plain, specific, calm. Sentence case. Active verbs ("Get paandaa", "Support the lab").
- Show real things: real screenshots, real numbers, real reviews. Mark concepts as "Concept". Never invent clients, testimonials or stats.
- English first for the global audience; Indonesian version available.

## 9. Do / Don't
Do: keep the grid and frame, keep numbers meaningful, use the island, show real product screens.
Don't: watercolor (that belongs to BapakAI), blue-purple gradients, glassmorphism everywhere, emoji in headings, fake metrics, ALL CAPS eyebrows on the web.
