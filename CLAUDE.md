# KHYR Labs website — build brief for Claude Code

Read this file, then `reference/DESIGN.md`, then open `reference/prototype.html` in a browser. The prototype is the approved design: match its look, copy and behaviour. The `khyr-brand` skill in `.claude/skills/` holds the same rules.

## Goal
A fast, bilingual (English default, Indonesian) site for KHYR Labs at **khyr.my.id**, hosted free on **Cloudflare Pages**, with a simple **admin** (Pages CMS) so the owner can add products, work, notes and links without touching code.

## Stack
- **Astro** (latest stable), static output, TypeScript, no UI framework needed (vanilla JS islands are enough).
- Fonts: Outfit (400/500/600/700) and Geist Mono (400/500) from Google Fonts, with system fallbacks.
- Content in `src/content/` as JSON, loaded with Astro content collections (schemas with zod).
- CMS: **Pages CMS** (https://pagescms.org). It edits the JSON files in this GitHub repo through a web dashboard, no server needed. Add `.pages.yml` at the repo root (see "CMS" below).
- Hosting: Cloudflare Pages, build `npm run build`, output `dist`.

## Routes
| Path | Page |
|---|---|
| `/` and `/id/` | Home: hero, catalog (Tools), selected work, notes, support |
| `/work/` and `/id/work/` | Work gallery with filters (All, Landing page, App, Brand) |
| `/work/[slug]/` and `/id/work/[slug]/` | Case study (only items with `hasCase: true`) |
Use Astro i18n routing: `defaultLocale: 'en'`, `locales: ['en','id']`, `prefixDefaultLocale: false`. Keep UI strings in `src/i18n/{en,id}.json` (copy them from the `T` object in the prototype). The island language button links to the same page in the other locale. Remember the theme in localStorage (try/catch).

## Content model (seed files in `seed/`, move them to `src/content/`)
- `products/*.json` (one file per product, from `seed/products.json`): slug, no, name, featured, status (live | in-progress), version?, platform, price (always "free" for now), summary {en,id}, highlights? {en[],id[]}, image?, cta {en,id}, url, site?
- `work/*.json` (from `seed/work.json`): slug, no, title, tags[], concept, hasCase, liveUrl?, frameUrl, cover, mobile?, year?, role?, stack?, languages?, summary {en,id}, lede?, problem?, approach?, result?
- `notes/*.json` (from `seed/notes.json`): no, image, url, text {en,id}
- `site.json` (from `seed/site.json`): tagline, support links with QR images, social links, timezone. **Never show the city name.**
Catalog numbers are shown as `No.001` (three digits). Sort products and work by `no`.

## Look and behaviour (must match the prototype)
- Paper background with a 36 px grid, ink frames, one orange highlighter per headline, light and dark themes via CSS variables, `prefers-color-scheme` respected and a manual toggle (`data-theme` on `<html>`).
- **Island nav**: dark pill, fixed top centre: KHYR mark, mini Flo, local time (Asia/Jakarta, time only), links Tools / Work / Notes / Support, language and theme buttons. Opens once on load. On mobile a Menu button opens the links below the pill.
- **Flo** (mascot, see DESIGN.md 7a): SVG flask above the hero headline (about 120 px) and mini Flo in the island. Pupils follow the pointer, random blinks, smile on hover over products/cards/buttons, bubbles rise when hovering support buttons. Copy the SVG and script from the prototype into a reusable `Flo.astro` component.
- **Hero**: Flo, "Small tools. / Steady days." (highlight on the second line), lede, buttons "See the tools" (primary) and "Support the lab". Three catalog cards dealt onto a desk on load (paandaa on top).
- **Catalog**: rows No. | name | what it does | runs on + status | price (Free) | action link. The featured product expands with a screenshot and highlights.
- **Work cards**: browser frame with the URL bar; long screenshots scroll slowly on hover. Items without a case study say "Case study coming soon". Concepts get a "Concept" tag.
- **Case study**: back link, Work No.01, title, lede, "View live site ↗" (new tab), meta (role, built with, languages, year), scrollable desktop frame + phone frame, then Problem / Approach / Result.
- **Support**: three buttons Saweria, Ko-fi, Trakteer (real links) and a QR panel that switches to the hovered or focused platform (default Ko-fi on English, Saweria on Indonesian).
- **Page transitions** (DESIGN.md 7b): use Astro's `<ClientRouter />` with a custom animation on the main content: old page translateY(-160px) scale(.95) opacity .5; new page from translateY(50vh) with clip-path inset(70% 0 0 0) to inset(0); 1.1 s, cubic-bezier(.4,.3,0,1). Give the island `transition:persist` so it stays still. Same-page section links (Tools, Notes, Support) should also animate: use `document.startViewTransition` around the jump when the target is on the current page. Skip all motion for prefers-reduced-motion. Re-run Flo, clock and card scripts on `astro:page-load`.
- Quality floor: responsive to 360 px, keyboard focus visible, alt text on every image, no horizontal scroll, Lighthouse performance and accessibility 95+.

## CMS (`.pages.yml`)
Create a Pages CMS config with:
- media: `public/images`, served from `/images`
- collections: Products (`src/content/products`, json), Work (`src/content/work`, json), Notes (`src/content/notes`, json)
- a single file: Site settings (`src/content/site.json`)
Field types: string, text, boolean, number, select (status, tags), image, and object fields for `{en,id}` pairs. Tell the owner how to log in at app.pagescms.org with GitHub and open this repo.

## Deploy
1. Push to the GitHub repo the owner created.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo. Framework preset Astro, build command `npm run build`, output directory `dist`.
3. Custom domain: add `khyr.my.id` (and `www`) in the Pages project. The domain is registered at IDwebhost (nameservers now `ns1.idwebhost.id`, `ns2.idwebhost.id`). The owner must add the domain to Cloudflare and change the nameservers at IDwebhost to the two Cloudflare gives. Explain this step to the owner; do not change registrar settings yourself.
4. Every push to `main` (including CMS edits) redeploys automatically.

## Do not
- Show the city, invent metrics, testimonials or clients, use watercolor, replace the logo with "[K]", or add sections that are not in the prototype.
- Put secrets in the repo.

## Done when
- All routes build and work in both languages and both themes.
- Flo, island, dealt cards, hover-scroll and page transitions behave like the prototype.
- Pages CMS can edit a product and the change appears after the next deploy.
- The site is live on the Cloudflare Pages URL; khyr.my.id works once nameservers have switched.
