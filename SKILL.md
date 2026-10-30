---
name: web-design
description: Visual design guidance for marketing websites and web UIs. Use when the user says "design", "redesign", "design review", "make it look better", "make it pop", "make it look premium", "polish the UI", "landing page", "design a hero section", "design system", "color palette", "typography", "visual hierarchy", "spacing", "design critique", or asks for opinions on layout, color, motion, or aesthetics. Defaults to a Next.js + Tailwind CSS stack, with no component library required.
license: MIT
metadata:
  author: Kopplin Co.
  version: "0.2.0"
---

# Web Design

You are designing or critiquing visual design for marketing websites and web UIs. The default stack is Next.js + Tailwind CSS (v4, CSS-first config). The default audience is small-business, SaaS, and B2B marketing sites.

The goal is a page that looks like a studio charged six figures for it: disciplined underneath, alive on the surface. Discipline (hierarchy, spacing, contrast, one clear action) is what makes a page work. Personality (a point of view, a signature moment, motion with purpose) is what makes it remembered. Generic AI output usually has neither: it is either beige and timid or loud and random. Aim for confident.

## Core Principles

1. **Hierarchy is the whole job.** Every section has one primary thing the eye lands on first, one secondary thing, and supporting detail. If two elements compete for attention, there is no hierarchy.
2. **A system first, then a signature.** Lock the type scale, color tokens, and spacing before styling anything. Then give the page one or two moments nobody else has. A system with no signature is forgettable. A signature with no system is a mess.
3. **Show, don't tell.** A tiny working demo, a real number, or an interactive before/after beats an icon and a sentence every time. Every card should earn its space with something to look at.
4. **Whitespace is design.** Cramped reads cheap, generous reads premium. When in doubt, add padding.
5. **Conversion before aesthetics.** A beautiful page that hides the CTA fails. Personality serves the funnel; it never replaces it.
6. **Match the mood to the buyer.** Compliance software can be calm and premium. A coffee shop can be loud and warm. Decide the mood on purpose (see the Mood Dial) instead of defaulting to gray.

## The Mood Dial

Before designing, pick a point on each dial and say it out loud. These choices drive every later decision.

- **Temperature:** cool (slate, blue, white) or warm (cream, ink, tangerine, sun).
- **Energy:** calm (big whitespace, slow motion, one accent) or lively (color-blocked panels, a marquee, playful stickers, bolder type).
- **Voice:** technical (mono details, precise copy) or human (conversational copy, editorial serif or characterful grotesk).
- **Surface:** light-first, dark-first, or mixed (light page with ink panels for contrast, which reads most expensive and works for most brands).

Default when the user gives no direction: warm, lively-but-controlled, human, mixed surfaces.

## Design System Defaults

Starting points. Override when the brand demands it, and say why.

### Typography

- **Two families, plus mono if the product is technical.** One display face with character for headings, one quiet sans for body. Load everything through `next/font/google`, never a `<link>` tag.
- **Display faces with character:** Bricolage Grotesque (lively, warm), Instrument Serif (editorial, elegant), Fraunces (soft serif, friendly), Space Grotesk (technical, quirky), Inter Tight or Geist (neutral, safe).
- **Body faces:** Geist, Inter, or the neutral member of the display family. Mono: Geist Mono or JetBrains Mono.
- **Register the fonts as theme tokens** so they are utilities:
  ```css
  @theme inline {
    --font-sans: var(--font-geist-sans);
    --font-display: var(--font-display);
    --font-mono: var(--font-geist-mono);
  }
  ```
- **Type scale:**
  - Hero headline: `font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-[-0.045em]`. Big display type needs negative tracking and tight leading.
  - Section heading: `font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.02] tracking-[-0.035em]`.
  - Eyebrow: a small pill, `text-xs font-semibold uppercase tracking-[0.16em]`, often with a colored dot.
  - Lead paragraph: `text-lg md:text-xl leading-relaxed text-muted-foreground`.
  - Body: `text-base leading-7`. Small: `text-sm text-muted-foreground`.
- **Highlight one word, not five.** A hand-drawn SVG underline, a marker highlight, or an italic serif swap on one key word in the hero gives the headline a voice. Gradient text on whole headlines is dated.
- **Line length** 60 to 75 characters (`max-w-prose` or `max-w-xl`). Use `text-balance` on headings and `text-pretty` on paragraphs.

### Color

- **Tokens in CSS variables, defined once, in OKLCH.** Tailwind v4 maps them to utilities through `@theme inline`:
  ```css
  :root {
    --background: oklch(0.985 0.012 80);   /* warm cream */
    --foreground: oklch(0.19 0.015 50);    /* warm ink */
    --muted: oklch(0.955 0.016 75);
    --muted-foreground: oklch(0.47 0.02 50);
    --border: oklch(0.9 0.018 70);
    --primary: oklch(0.7 0.2 45);          /* the brand accent */
  }
  @theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    /* ...one line per token */
  }
  ```
- **Brand constants vs. theme tokens.** Keep a second small set that never flips with dark mode (for example `--ink`, `--cream`, `--accent`, `--pop`). Nav pills, code windows, footers, and accent panels use these so they look identical in both themes.
- **One hero accent, one supporting pop.** The accent (usually from the logo) carries CTAs, highlights, and one full-bleed panel. A second, softer pop color (sun yellow, blush, mint) is allowed for surfaces and small highlights only, never for buttons. Three or more saturated colors competing is the classic amateur tell.
- **Color-block the page.** Alternate the base background with an ink panel and an accent panel. A rounded `bg-ink` section in the middle of a cream page and a full accent-color final CTA create rhythm without adding any new colors.
- **Avoid pure black on pure white.** Use a warm or cool tinted near-black on a tinted near-white.
- **Contrast:** 4.5:1 for body text, 3:1 for large text and UI. Bright accents (orange, yellow) usually fail with white text, so put ink text on them. Check with a contrast checker.
- **Dark mode:** a `.dark` class with a parallel token set. Shift hues slightly and lower saturation; do not just invert.

### Spacing and Layout

- **8-point grid.** Stick to Tailwind's scale (`p-2`, `p-4`, `p-6`, `p-8`, `p-12`, `p-16`, `p-24`). `p-[23px]` is a smell.
- **Containers:** `max-w-7xl` for marketing pages, `max-w-5xl` for a floating nav or a hero visual, `max-w-3xl` for articles. Horizontal padding `px-5 sm:px-6 md:px-8`.
- **Section rhythm:** `py-20 md:py-28` for major sections. Two padded sections stacked back to back can double the gap, so check the space between sections, not just inside them.
- **Inset panels:** full-width colored sections look more premium as large rounded panels inset from the viewport (`mx-3 sm:mx-6 rounded-[2.5rem]`) than as edge-to-edge stripes.
- **Grids:** `gap-4` or `gap-5` for bento, `gap-8` for spacious feature rows.

### Radii, Borders, Shadows, Texture

- **Radius sets the mood.** `rounded-lg` reads neutral, `rounded-2xl` to `rounded-[2rem]` reads modern and friendly, `rounded-full` buttons read lively, square reads editorial. Pick a family and use it everywhere, with outer containers rounder than the things inside them.
- **Borders:** 1px and low contrast. Border or shadow on a card, rarely both.
- **Shadows:** layered and soft, tinted toward the ink color, never default gray:
  ```css
  box-shadow:
    0 1px 2px oklch(0.19 0.015 50 / 0.06),
    0 24px 60px -16px oklch(0.19 0.015 50 / 0.28);
  ```
  A colored glow in the accent hue under the main hero element is a strong, cheap premium signal.
- **Texture and atmosphere:** a faint dot grid masked with a radial gradient, and two or three heavily blurred color blobs (`blur-[100px]`) drifting slowly behind the hero. Keep them behind content and low opacity.

## The Signature Moment

Every page gets one, ideally in or just under the hero. It is the thing someone would describe to a friend. Pick one that proves the product's value:

- **Interactive before/after slider** comparing the old way and the new way (a clipped layer plus a range input).
- **A live product mock** built in HTML and CSS rather than a flat screenshot, with one or two floating annotation cards.
- **A playground:** a tiny working version of the product (a color picker, a calculator, a prompt box).
- **A kinetic statement:** a rotated marquee ticker of principles or customer names in the accent color.
- **Stickers:** one or two slightly rotated, gently floating labels ("Drag me", "New") pinned to the hero visual on desktop.

One or two of these per page. Five is a theme park.

## Layout Patterns

### Hero

A hero answers in under three seconds: **What is this? Who is it for? What do I do next?**

1. **Eyebrow pill** with a tiny badge ("Free", "New", a version, or a funding line).
2. **Headline.** Outcome-focused, short, with one highlighted word.
3. **Subheadline.** One or two sentences.
4. **One primary CTA**, plus a quieter secondary text link. For developer products the primary CTA can be a copyable install command.
5. **The signature visual** directly below or beside, large, inside a framed card with a lift shadow.
6. **Proof** near the fold: logos, a rating, a number, or stack chips.

Anti-patterns: more than two CTAs, carousels, `min-h-screen` heroes, stock photos, a headline that could describe any company.

### Section Order (cut ruthlessly)

1. Hero with the signature moment
2. Proof strip (press, logos, rating)
3. What it does: a bento grid of live mini-demos
4. How it works: three numbered steps
5. Deep proof: a scored review, testimonial wall, case-study numbers, or a peek inside the product
6. FAQ that answers real objections
7. Final CTA panel in the accent color, same CTA wording as the hero
8. Footer

### Bento Grids

Bento is the default feature layout now, but only when every tile has its own visual:

- Mix spans (`md:grid-cols-6` with tiles of 4, 2, 2, 2, 2, 6).
- Mix surfaces: one ink tile, one accent or pop tile, the rest card-colored.
- Put a working miniature in each tile: a type specimen for typography, swatches for color, bars for spacing, real button states for components, check chips for accessibility.
- Title and one-sentence body sit at the bottom of the tile, the visual at the top.

A grid of six identical icon-plus-text boxes is the most common AI tell. Avoid it.

### Steps and Process

Three cards with a big outlined numeral, a colored icon tile per step, and a dashed connector line behind them on desktop. Follow with a code window or screenshot that shows the steps actually happening.

## Components (plain Tailwind, no library required)

Build components from semantic HTML and Tailwind utilities. Reach for a headless library only for genuinely hard widgets (comboboxes, date pickers, complex dialogs). Most marketing pages need none.

- **Buttons:** `rounded-full h-11 px-6 font-semibold` for marketing CTAs (`h-12` in hero and final CTA). Primary is ink-on-accent or cream-on-ink; secondary is outline or a text link with an accent underline. Hover with a small brightness or background change and `active:scale-95`. Always a visible `focus-visible:ring-2`.
- **Navigation:** a floating pill (`sticky top-3`, `max-w-5xl`, `rounded-full` or `rounded-[1.75rem]`, ink background, blur) with logo left, 4 to 6 links center, one accent CTA right. Add a lift shadow once the page scrolls. On mobile, a menu button that expands the pill.
- **FAQ:** native `<details>` and `<summary>` styled as rounded cards with a rotating chevron (`group-open:rotate-180`). Accessible, zero JavaScript. Open the first item by default.
- **Tabs:** a `role="tablist"` row of pill buttons with `aria-selected`, and a `role="tabpanel"`. A dozen lines of React state.
- **Code and terminal surfaces:** ink windows with traffic-light dots, a mono title, and light syntax tinting (comments dim, additions green, removals red). Copy buttons swap to a "Copied!" state for about two seconds.
- **Forms:** labels above inputs, one column, `h-12` inputs, errors in text plus color, full-width submit on mobile with a loading state.
- **Cards:** `p-7 md:p-8`, consistent radius, hover with `hover:-translate-y-1 hover:shadow-xl` on interactive cards.
- **Reuse before you create.** If a card, heading block, or window already exists on the site, use it. Two versions of the same component is a bug.

## Motion

Motion is what makes a page feel alive. Keep it purposeful and cheap.

- **Prefer CSS.** Keyframes plus scroll-driven animations (`animation-timeline: view()`) cover most needs with no JavaScript. Wrap scroll-driven rules in `@supports (animation-timeline: view())` so unsupported browsers just show the content.
- **The useful set:**
  - Hero entrance: staggered fade-and-rise (`animation-delay` of 80 to 120ms per element).
  - Scroll reveal: sections rise 24px and fade in as they enter.
  - Draw-on: SVG underline or ring strokes animate with `stroke-dashoffset`.
  - Ambient: blurred blobs drift over 15 to 20 seconds; stickers bob 8px over 6 seconds.
  - Marquee: duplicate the list once and translate `-50%` on a linear infinite loop.
  - Micro-interactions: card lift, button press, swatches that tilt on hover.
- **Timing:** 150 to 250ms for UI feedback, 600 to 900ms for entrances, ease-out curves like `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Always respect reduced motion.** Put every non-essential animation inside `@media (prefers-reduced-motion: no-preference)` and make sure the page reads correctly with all motion off.
- No autoplay video backgrounds, no parallax for its own sake, no bounce easing.

## Copy Voice

Design and copy are one job. Lively design with corporate copy feels fake.

- Headlines make a promise in plain words ("Audit reports in an afternoon"), not a category ("AI-Powered Compliance Solutions").
- Short sentences. Specific numbers. A little wit in eyebrows, stickers, and microcopy.
- Ban list: revolutionize, synergy, cutting-edge, next-generation, empower, seamless, unlock, elevate, game-changer, and exclamation points in headlines.
- No emoji in headings or nav.

## Responsive Design

- **Mobile first.** Base styles for phones, then `sm:`, `md:`, `lg:`. Avoid `max-*:` variants.
- **Test at** 375, 390, 768, 1024, and 1440px.
- **Big type must shrink gracefully.** A `text-8xl` hero needs a phone size around `text-5xl` and must not break a word mid-line.
- **Decorative extras hide on small screens** (stickers, side annotations). The signature moment stays, simplified if needed.
- **No horizontal scroll.** Clip decorative overflow at the section (`overflow-hidden` on the hero, `overflow-x: clip` on `html` and `body` for rotated marquees), but fix real layout overflow at the source.
- **Tap targets** 44px minimum. Long commands or URLs truncate with an icon-only copy button on phones.
- **Images** through `next/image` with `sizes`, and `priority` on the hero image.

## Accessibility (the floor, not the ceiling)

- Semantic HTML: `<button>` for actions, `<a>` for navigation, headings in order, one `<h1>`, landmarks (`<nav>`, `<main>`, `<footer>`).
- Alt text on meaningful images, `alt=""` and `aria-hidden` on decorative ones (blobs, stickers, duplicated marquee items).
- Visible focus on everything interactive. Never `outline: none` without a replacement.
- WCAG AA contrast, checked, not eyeballed. Watch muted text on tinted backgrounds and white text on bright accents.
- Interactive demos are keyboard operable (a before/after slider is a real `<input type="range">` with an `aria-label`).
- Reduced motion respected everywhere.

## What Reads Dated, and What Reads Generic

Dated:
- Hard drop shadows on every card, skeuomorphic gradient buttons.
- Hero carousels, autoplay video backgrounds.
- Stock photos of people pointing at laptops.
- Gradient text on entire headlines.

Generic (the AI-generated look):
- Purple-to-pink gradient heroes with white Arial and three CTAs.
- Six identical icon-plus-text cards.
- Flat gray-on-white with one blue button and no point of view.
- Emoji bullets, "Welcome to the future", "Revolutionize your workflow".

Current and premium:
- Tinted, warm or cool neutrals with one confident accent and color-blocked panels.
- Characterful display type, tight tracking, one highlighted word.
- A floating pill nav, inset rounded panels, layered tinted shadows.
- Bento grids of live mini-demos, HTML product mocks, before/after proof.
- Subtle, purposeful CSS motion that disappears under reduced motion.

## References

Linear, Stripe, Vercel, Resend, Raycast, Arc, Framer, and Apple for polish. Awwwards, Godly, Land-book, SiteInspire, and Refero for current patterns. When designing for an industry, look at three to five sites in that industry first and note what they share before deciding where to stand out.

## Design Review Checklist

Score each item 1 to 10, average them, report the score, then give the three highest-leverage fixes.

1. **Hierarchy.** Can a visitor tell what the page wants them to do in 3 seconds?
2. **Typography.** Two families or fewer, a consistent scale, readable line lengths.
3. **Color.** One clear accent, tokens instead of scattered hex values, WCAG AA contrast.
4. **Spacing.** Generous and consistent, the 8-point grid holds, no doubled gaps.
5. **CTAs.** One primary action, obvious from anywhere on the page.
6. **Mobile.** Works at 375px with no horizontal scroll and 44px tap targets.
7. **Above the fold.** Value prop and CTA visible on a 1366x768 laptop.
8. **Consistency.** Buttons, cards, headings, and windows styled the same everywhere.
9. **Signature.** Is there one memorable moment that proves the value? Would someone describe this page tomorrow?
10. **Trust and speed.** Proof near the value prop; `next/image`, `next/font`, and no avoidable bloat.

## Process

1. **Ask (or infer and state):** audience, the one action, and a position on the Mood Dial.
2. **Find references** that match the buyer. Three minimum.
3. **Build the system:** fonts, color tokens and brand constants, spacing, radius family, shadow.
4. **Design the hero and its signature moment** until it lands. Everything else gets easier.
5. **Build mobile first**, then desktop.
6. **Add motion last**, CSS-first, with reduced-motion fallbacks.
7. **Look at it.** Screenshot desktop and mobile, check contrast and overflow, then run the review checklist before calling it done.

## What NOT to do

- Do not design without knowing the audience, the one action, and the mood.
- Do not add a third typeface "for variety".
- Do not use more than one saturated accent plus one soft pop color.
- Do not ship a grid of identical icon cards.
- Do not add carousels, autoplay video, or parallax without a measurable reason.
- Do not install a component library to build a marketing page. Plain Tailwind and semantic HTML cover it.
- Do not let personality hide the CTA.
- Do not scatter hex values through components. Define tokens once.
