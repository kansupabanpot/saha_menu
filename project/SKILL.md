---
name: saha-design
description: Use this skill to generate well-branded interfaces and assets for SAHA Steak & Butcher, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and sample slide components for prototyping. Heritage-Western butcher & steakhouse aesthetic with Thai-textile motifs — cream parchment, deep crimson, jet black, carved type.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key files:
- `README.md` — full brand context: voice, visual foundations, iconography
- `colors_and_type.css` — drop-in CSS variables + `@font-face` declarations
- `fonts/` — Chreed Bold (English display), Tannakone (Thai), Bebas Neue (supporting)
- `assets/saha-logo.png` — circular cow emblem (704×717, transparent)
- `assets/saha-bg.png` — cream + Thai-textile-border background (2048²)
- `slides/` — sample slide templates (title, section, menu, quote, specs)
- `preview/` — design-token cards for reference

Quick rules: ALL CAPS Chreed Bold for English headlines, Tannakone for Thai paired underneath at equal weight, hard `4px 4px 0 black` "stamp" shadows instead of soft blur, square corners (radius ≤ 4px), no emoji, no gradients, no AI imagery. Background is cream `#F5F0C8`; primary text is crimson `#8B2020`.
