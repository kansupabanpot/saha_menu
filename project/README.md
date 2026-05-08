# SAHA Steak & Butcher — Design System

A heritage-Western butcher shop and steakhouse identity with a Thai-textile soul. Cream parchment, deep crimson, jet black. Bold, carved, confident — nothing thin, nothing precious.

## Brand at a glance

- **Category:** Steak restaurant & butcher shop
- **Aesthetic:** Heritage-Western meets Thai-textile border motifs
- **Logo:** Black cow silhouette inside a circular emblem, wheat laurels, knife/fork crest
- **Personality:** Premium · Heritage · Bold · Approachable · Authentic

## Source materials

All provided directly by the brand (no Figma / codebase given):

| File | Role |
|---|---|
| `uploads/SAHA Logo.png` → `assets/saha-logo.png` | Primary circular emblem (704×717, transparent) |
| `uploads/SAHA_BG.png` → `assets/saha-bg.png` | Full-bleed cream background with Thai textile border (2048²) |
| `uploads/Chreed-Bold.ttf` → `fonts/Chreed-Bold.ttf` | English display — heritage serif |
| `uploads/tannakone-light-condensed.ttf` → `fonts/tannakone-light-condensed.ttf` | Thai display / body |
| `uploads/BebasNeue-Regular.ttf` → `fonts/BebasNeue-Regular.ttf` | Supporting English condensed |

All fonts shipped by the brand — **no Google Fonts substitutions needed.**

## Index

- `colors_and_type.css` — all color + type + spacing tokens, `@font-face` declarations
- `fonts/` — the three brand typefaces
- `assets/` — logo + background texture
- `preview/` — Design System tab cards (colors, type, components, brand)
- `slides/` — sample branded slide templates (title, section, menu, quote, specs)
- `SKILL.md` — Agent Skill entry point

---

## Content Fundamentals

**Voice.** Confident butcher-shop proprietor. Short, declarative, no fluff. Writes like a hand-painted sign, not a marketing email.

**Casing.** English headlines are **ALL CAPS** almost universally — Chreed has the gravitas of a heritage signage face and reads strongest at large, tightly-tracked caps. Body copy is sentence case. Prices and weights are written out plainly (`350 G`, `฿1,290`).

**Voice of the brand.**
- Third person or imperative — *"Dry-aged 45 days"*, *"Cut to order"*, *"Ask the butcher"*
- Avoids "we" / "our" chatter; lets the product speak
- Avoids "you" unless it's an instruction (*"Choose your cut"*)

**Bilingual pairing.** Thai and English often sit as a pair — English in Chreed caps on top, Thai in Tannakone underneath, roughly the same visual weight. Never mixed inside a single sentence.

**Examples** (in voice):
- `DRY-AGED · 45 DAYS` / `บ่มแห้ง ๔๕ วัน`
- `CUT TO ORDER`
- `THE BUTCHER'S TABLE`
- `RIBEYE · 350 G · ฿1,290`
- `EST. BANGKOK`
- `ASK FOR THE CHEF'S BOARD`

**Never:** emoji, exclamation points (the type is already shouting), corporate verbs ("leverage", "elevate"), hype language ("amazing", "the best").

---

## Visual Foundations

### Color

Four colors, used with discipline:

| Token | Hex | Use |
|---|---|---|
| `--saha-cream` | `#F5F0C8` | Primary background. 70–80% of any layout. |
| `--saha-crimson` | `#8B2020` | Primary text on cream. Headlines, body, accent blocks, borders. |
| `--saha-crimson-hi` | `#A33434` | Lighter maroon. Use as a dark surface fill paired with cream/white text. |
| `--saha-black` | `#1A1A1A` | Secondary text on cream. Logo, heavy outlines, offset "stamp" shadows. Never used as a background. |
| `--saha-white` | `#FFFFFF` | Reserved for inverse text on dark crimson surfaces only. **Never** used on cream. |

**Color pairing rules**
- **On cream:** text is dark maroon (`--saha-crimson`) for primary, jet black (`--saha-black`) for secondary. Never white.
- **On dark maroon (`--saha-crimson`) or lighter maroon (`--saha-crimson-hi`):** text is cream or white.
- Black is **ink**, not a surface — used for logo, secondary type, and stamp shadows. Avoid filling large shapes with it.

Two small derived tints (`--saha-cream-deep`, `--saha-crimson-ink`) exist for hover/press states. Do **not** invent new hues.

### Typography

Three typefaces, each with a single job:

- **Chreed Bold** — English display. Heritage serif with confident weight. All caps. Tight tracking (`-0.01em`) to mimic the tool's `text-gap: -0.50` setting.
- **Tannakone Light Condensed** — Thai display and body. Tall narrow Thai face that pairs naturally with Chreed's English caps. Use letter-spacing `-0.06em` throughout to tighten the default airiness.
- **Bebas Neue** — Supporting English. Condensed caps for eyebrows, labels, small supporting text, nutritional info, prices.

**3D engraving note.** The brand's generation tool uses a `thickness: 2.00` setting that extrudes letters into a carved, physical block. On the web this is **not a stroke**; we emulate the carved feeling with hard stamp shadows (`--sh-stamp: 4px 4px 0 black`) applied to headline blocks or accent cards, never to body text.

### Backgrounds

- **Primary:** flat cream (`#F5F0C8`).
- **Hero / title surfaces:** the supplied textile-border background (`assets/saha-bg.png`). Full-bleed on the top and bottom edge; cream in the middle. Use via the `.saha-frame` utility.
- **No** gradients. **No** AI-generated imagery. Photography (when used) should be warm-toned, grainy, low-key steak and butcher shop imagery.

### Layout

- **Heavy, confident, symmetrical.** Title blocks are typically centered.
- **Fixed crimson rules** (`2px` or `4px`) separate sections — think butcher shop chalkboard.
- **Textile border** pattern frames full-page compositions (title cards, menu covers).
- Generous padding (`--s-7` / `--s-8`) around hero content — the parchment should breathe.
- Grid: 4pt baseline (`--s-1` … `--s-9`).

### Borders & Radii

- **Corners stay square.** `--r-0` or `--r-1` by default. A `--r-pill` exists for badges only.
- Borders are crimson or black, never gray. `2px` is the default rule weight.

### Shadows & depth

- No soft shadows. No blur. The brand has a carved, stamped feel.
- **Stamp shadow** (`--sh-stamp`): a hard `4px 4px 0` black offset, used on buttons, cards, badges to feel physically punched.
- Inner press shadow (`--sh-press`) is a subtle darkening on active/pressed state.

### Motion & interaction

- Minimal. Firm. `120–200ms` `cubic-bezier(.2,.7,.2,1)`.
- **Hover on crimson surfaces:** shift to `--saha-crimson-hi` (lighter).
- **Hover on cream surfaces:** shift to `--saha-cream-deep`.
- **Pressed / active:** translate the element `2px 2px` toward its shadow so the stamp shadow "collapses" — the button feels pressed into the parchment.
- No bounces. No fades longer than `300ms`. No parallax.

### Transparency & blur

- Rarely. The brand is opaque and physical. If you must layer, use a solid cream card on top of the textile background — no translucent overlays.

### Cards

- Flat cream (or white) fill, `2px` crimson border, **no radius** or `2px` max, `--sh-stamp` offset shadow.
- Optional black "banner" strip at the top with Bebas Neue caps label (butcher-shop price tag feel).

### Imagery tone

- Warm. Grainy. Low-key lighting. Steak, cast iron, wood, butcher paper, wheat.
- Black & white also appropriate — evokes old Americana butcher photography.
- **Avoid:** cool blues, pastels, airy/bright food photography, studio-white backgrounds.

---

## Iconography

- **No bundled icon font.** The brand has no native icon system.
- **Ornamental marks** are the hero "icons": wheat laurels, knife-and-fork crest, and the Thai-textile diamond motif — all present in the logo and background. Lift these from the supplied assets rather than drawing new ones.
- **Functional UI icons** (arrows, caret, plus, close): use **Lucide** from CDN (`https://unpkg.com/lucide-static@latest/icons/`) at stroke-width `2`, colored `--saha-crimson`. This is a **flagged substitution** — the brand did not ship functional icons; Lucide's thin-line set is the neutral bed we default to. Swap in a heavier sign-painter set if you acquire one.
- **No emoji.** Ever. The aesthetic is hand-painted signage; emoji break the spell instantly.
- **Unicode glyphs** used sparingly and decoratively: `·` (middle dot, as a separator in `350 G · ฿1,290`), `&` (always upright, no italic), `✦` / `❖` may appear in the textile motif but should be replaced with actual PNG/SVG marks from the background when the density is there.

---

## Quick start

```html
<link rel="stylesheet" href="colors_and_type.css">

<div class="saha-frame" style="padding: 96px 64px">
  <h1 class="saha-display">The Butcher's Table</h1>
  <div class="saha-thai-headline">โต๊ะของช่างเขียง</div>
  <p class="saha-small">Est. Bangkok · Dry-aged 45 days</p>
</div>
```

---

## Caveats / open questions

- **No codebase or Figma** was attached — this system is built entirely from the supplied logo, background, fonts, and written brief. UI-kit products (app? website? menu system?) aren't defined; no UI kits shipped in this pass. Ask to add one and point at the relevant surface.
- **Functional icons** default to Lucide. Flag if the brand has an icon pack.
- **Photography / secondary imagery** not provided. Slides use typographic + emblem compositions only; photo slots are marked as placeholders.
