---
name: M. Aggarwal & Co., Chartered Accountants
description: Jaipur blue pottery as a CA firm; calm cobalt painted on a cool white glaze.
colors:
  glaze: "oklch(0.988 0.004 240)"
  wash: "oklch(0.958 0.02 232)"
  turq: "oklch(0.72 0.105 205)"
  cobalt: "oklch(0.43 0.17 264)"
  ink: "oklch(0.25 0.07 264)"
  ink-soft: "oklch(0.398 0.057 259.2)"
  line: "oklch(0.915 0.026 243.1)"
  wash-deep: "oklch(0.91 0.034 234.9)"
  turq-pale: "oklch(0.908 0.034 229.5)"
  on-cobalt: "oklch(0.895 0.038 235.8)"
  cobalt-deep: "oklch(0.385 0.145 264)"
  on-fill: "#ffffff"
  error: "oklch(0.55 0.19 27)"
typography:
  display:
    fontFamily: "Young Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(42px, 6vw, 76px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Young Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(32px, 4.5vw, 48px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  quote:
    fontFamily: "Young Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(21px, 3vw, 42px)"
    fontWeight: 400
    lineHeight: 1.3
  numeral:
    fontFamily: "Young Serif, Iowan Old Style, Georgia, serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.1
    fontFeature: "tnum"
  title:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.375
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  focus: "6px"
  field: "12px"
  option: "16px"
  panel: "24px"
  plate-card: "28px"
  pill: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter: "32px"
  group: "12px"
  block: "40px"
  section-mobile: "64px"
  section: "80px"
  section-wide: "96px"
components:
  button-book:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.on-fill}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-book-hover:
    backgroundColor: "{colors.cobalt-deep}"
  button-call:
    backgroundColor: "{colors.turq}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-call-hover:
    backgroundColor: "{colors.turq-pale}"
  button-whatsapp:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-fill}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-whatsapp-hover:
    backgroundColor: "{colors.cobalt-deep}"
  button-secondary:
    backgroundColor: "{colors.glaze}"
    textColor: "{colors.cobalt}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.wash}"
  button-on-cobalt:
    backgroundColor: "{colors.glaze}"
    textColor: "{colors.cobalt}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  filter-chip:
    backgroundColor: "{colors.glaze}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  filter-chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-fill}"
  nav-link-active:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.cobalt}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  input:
    backgroundColor: "{colors.glaze}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "48px"
  due-card:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.on-fill}"
    rounded: "{rounded.plate-card}"
    padding: "32px"
---

# Design System: M. Aggarwal & Co., Chartered Accountants

## Overview

**Creative North Star: "The Blue Pottery Plate"**

The site is a piece of Jaipur blue pottery: a cool white glaze ground, cobalt laid on in whole bands, turquoise as the single secondary, and hand-painted motifs (a rosette plate, a vine rim, an eight-petal mark) drawn in cobalt line with a faint brush wobble. Calm is the feature. Nothing is boxed into card grids; content rides directly on bands of glaze, sky wash, cobalt and ink, separated by thin hairlines or a painted vine.

Density is relaxed and mobile-first. Sections breathe (64 to 96px of vertical padding), lists are hairline-ruled rather than carded, and the few filled containers (the next-due-date card, the contact sit-down card, the booking sheet) are soft 28px-cornered slabs of a single tone. Portraits always sit in a round plate with a turquoise rim; the one place photo (the office interior) is a 28px-cornered rectangle. The display face is Young Serif, a soft, heavy-bellied old-style serif that reads as painted lettering; Figtree carries everything functional.

The world refuses the navy-gradient-plus-gold finance hero: no gradients, no gold, no cream.

**Key Characteristics:**
- Five pottery tones, with every secondary token a fixed `color-mix()` of them, never a new hue.
- Bands, not boxes: sections change ground color; lists are ruled with hairlines.
- Painted motifs (rosette, vine rule, petal mark) are the only ornament; they are generated SVG with a brush displacement filter.
- Round everything: pill buttons, round plates, round station markers, round icon wells.
- Three contact actions (Book, Call, WhatsApp) carry equal visual weight, each with its own fill.

## Colors

A strict pottery palette: two pale grounds, one turquoise, one cobalt, one near-black cobalt ink.

### Primary
- **Kiln Cobalt** (`cobalt`): the painted color. Whole section bands (services, CTA band), the Book button, the next-due-date card, motif line work, headline emphasis spans, links, focus rings, and the hero stats numerals.
- **Fired Cobalt** (`cobalt-deep`, mix of cobalt 75% with ink): hover state for the Book and WhatsApp buttons only.

### Secondary
- **Glaze Turquoise** (`turq`): the single secondary. The Call button, plate rims, rosette rim band, vine leaves, station line, service icon wells on cobalt, date-ring around list dates, the quote mark, and small separator dots.
- **Pale Turquoise** (`turq-pale`, turq 30% into glaze): rosette petal fill, Call hover, text selection.

### Neutral
- **Glaze White** (`glaze`): the page ground. Cool, never cream. Also the inverted Book button on cobalt grounds.
- **Sky Wash** (`wash`): alternate section ground (due dates, founder, journey, page heads), active nav pill, icon wells, selected booking option.
- **Deep Wash** (`wash-deep`): scrollbar thumb only.
- **Cobalt Ink** (`ink`): all body and heading text on light grounds, the footer band, the WhatsApp button, the active filter chip, and the 40% scrim behind sheets.
- **Soft Ink** (`ink-soft`, ink 80% into glaze): secondary text, sublines, captions, inactive nav.
- **Hairline** (`line`, cobalt 13% into glaze): every divider, list rule, field ring, and the dock and header borders.
- **On Cobalt** (`on-cobalt`, wash 88% with cobalt): secondary text on cobalt and ink grounds; the light vine on the footer.
- **On Fill** (`on-fill`, white): primary text and icons on cobalt, ink and the cobalt card. Translucent white (15% for rules, 35% for ghost rings, 8% for hover) is the divider vocabulary on cobalt.

### State
- **Error Red** (`error`): field error ring in the booking form, nothing else. It is the one hue outside the pottery set and is permitted only because an error must read as an error.

### Named Rules
**The Five Tones Rule.** Glaze, wash, turquoise, cobalt, ink. Any further color is a `color-mix(in oklch, ...)` of those five, defined once as a token. No gradients anywhere.

**The Equal Voices Rule.** Book is cobalt, Call is turquoise with ink text, WhatsApp is ink. On light grounds they keep these fills everywhere (hero, mobile menu, action dock), at the same height and shape. On a cobalt band, Book inverts to a glaze pill so it stays visible.

## Typography

**Display Font:** Young Serif 400 (with Iowan Old Style, Georgia, serif)
**Body Font:** Figtree 400 to 700 (with system-ui, Segoe UI, sans-serif)

**Character:** Young Serif is soft and heavy, with old-style figures that look brush-lettered next to the motifs; it is only ever used at weight 400. Figtree is a clean geometric-humanist sans that keeps forms, lists and buttons plain. Both are self-hosted.

### Hierarchy
- **Display** (Young Serif 400, 42px mobile to 76px desktop, 1.06): the hero headline and page heads (44 to 72px). A trailing phrase may be set in cobalt.
- **Headline** (Young Serif 400, 32 / 40 / 48px, 1.12, -0.015em, balanced wrap): section headings, CTA band titles (34 to 48px), due-card title (26 to 30px).
- **Quote** (Young Serif 400, 21 to 24px for testimonials at 1.4; 28 to 42px for the founder quote at 1.25): all quoted speech is set in the display face.
- **Numeral** (Young Serif 400, tabular figures, cobalt): stats (28px mobile, 24px inline desktop), list dates (20px), days-left count (56 to 72px on the cobalt card).
- **Title** (Figtree 600, 17 to 18px, snug): list item and station titles, FAQ questions, service names. Card-level h3s switch to the sans.
- **Body** (Figtree 400, 16px, 1.6): running text; leads and section sublines at 17px, relaxed, max about 36rem.
- **Small** (Figtree 400, 13 to 15px): captions, details, the due-date disclaimer. Never below 13px.
- **Label** (Figtree 600, 11 to 13px, 0.08em, uppercase): only the brand subline, footer column heads (turquoise on ink) and month abbreviations in date rings.

### Named Rules
**The Single Weight Serif Rule.** Young Serif is set at 400 only; emphasis comes from size and cobalt color, never bold or italic.

**The Tabular Figures Rule.** Every phone number, date, count and registration number uses tabular numerals.

## Layout

A single centered container (max 1152px) with 20px gutters on phones and 32px from 640px. Sections are full-bleed bands that alternate ground (glaze, wash, cobalt, ink) and carry 64px vertical padding on phones, 80px from 640px, and 96px from 1024px. Headings sit in a max 42rem measure; section content starts 40px below (56px on desktop).

Two breakpoints matter: 640px (button groups go from stacked grid to inline row) and 1024px (two-column splits at roughly 0.8fr / 1.2fr with a sticky heading column, horizontal stations, desktop nav). Mobile is the design viewport: button groups stack full width with 12px gaps, testimonials scroll horizontally with snap, filter chips scroll without a visible scrollbar.

A fixed action dock (Call, WhatsApp, Book in three equal columns) sits at the bottom of every page below 1024px, glaze at 85% with backdrop blur and a hairline top border, respecting the safe-area inset. The footer carries extra bottom padding (128px) on phones so the dock never covers it. The header is sticky, 64px (72px desktop), and gains its hairline only after scrolling.

Process and history are laid out as stations along one turquoise line: vertical on phones, horizontal from 1024px.

## Elevation & Depth

Mostly flat: depth comes from changing the ground tone, not lifting surfaces. Shadows exist only as soft, cobalt- or ink-tinted glows, never gray and never hard-offset, and only on the two filled action buttons, the hero plate and rosette, and the booking sheet.

### Shadow Vocabulary
- **Button glow** (`box-shadow: 0 6px 16px -6px oklch(0.43 0.17 264 / 0.55)`; turquoise version for Call at 0.7 alpha): under the Book and Call buttons at rest.
- **Plate lift** (`box-shadow: 0 18px 40px -14px oklch(0.25 0.07 264 / 0.45)`): the hero portrait plate overlapping the rosette.
- **Rosette float** (`filter: drop-shadow(0 18px 30px oklch(0.43 0.17 264 / 0.18))`): the hero rosette only.
- **Sheet** (`box-shadow: 0 -12px 40px -12px oklch(0.25 0.07 264 / 0.35)`): the booking sheet over its ink scrim.

### Named Rules
**The Ground Not Shadow Rule.** To separate content, change the band color or draw a hairline. Shadows are reserved for elements that physically overlap something.

## Shapes

The form language is the round plate. Buttons, chips, nav items, icon wells, station markers, avatar initials and date rings are full circles or pills. Photos are always circular plates: a turquoise outer rim (3px small, 6px medium, 10px large), a 3px glaze gap, a 1px inset cobalt ring, then the image. The few rectangular containers use generous 28px corners (24px for the contact details list), booking options 16px, inputs 12px. Sheets on phones round only the top corners (28px). Borders are 1px hairlines; 2px rings mark selection and focus.

The painted motifs are generated SVG: an eight-petal rosette plate with a rim of 28 leaves, a sinuous vine with alternating leaves and dots used as a full-width section rule, and an eight-petal mark for the logo. Each is seeded (stable between renders) and passed through a fractal-noise displacement for a brush wobble.

## Components

### Buttons
Round, solid and confident; one height everywhere.
- **Shape:** full pill (9999px), minimum 48px tall (44px in the desktop header), 24px horizontal padding, Figtree 600 at 15px, icon and label 8px apart.
- **Book (primary):** cobalt fill, white text, cobalt glow; hover to Fired Cobalt.
- **Call:** turquoise fill, ink text, turquoise glow; hover to Pale Turquoise.
- **WhatsApp:** ink fill, white text, no glow; hover to Fired Cobalt.
- **Secondary:** glaze fill, cobalt text, 1px inset cobalt ring at 30%; hover to full ring on wash.
- **On cobalt:** glaze fill with cobalt text (Book inverted), or a ghost pill with a 35% white ring.
- **States:** 200ms color transitions, press scales to 0.98, disabled at 40% opacity. Focus is a 2px cobalt outline offset 3px.

### Text Link
Cobalt Figtree 600 with a 2px turquoise underline offset 6px and a trailing arrow; hover turns the underline cobalt and nudges the arrow 2px right.

### Filter Chips
Pill, 44px tall, 20px padding. Inactive: glaze with soft-ink text and a hairline ring; hover text to cobalt. Active: solid ink with white text. Used as a tab list for due-date audiences; the services jump list uses the same pill with ink text and a cobalt ring on hover.

### Cards / Containers
- **Corner Style:** 28px.
- **Background:** a single solid tone (cobalt for the next-due card and the sit-down card, wash for the map and details).
- **Shadow Strategy:** none (see Elevation).
- **Border:** none, or a hairline ring on wash; inner dividers on cobalt are 15% white.
- **Internal Padding:** 24px on phones, 32px from 640px.
- Cards are the exception. Lists of services, credentials, FAQs and dates are hairline-ruled rows, not cards.

### Inputs / Fields
- **Style:** glaze fill, 1px inset hairline ring, 12px corners, 48px tall, 16px text in ink, cobalt caret, placeholder in a muted blue-gray.
- **Focus:** ring thickens to 2px cobalt.
- **Error:** 2px Error Red ring.
- **Choice options (booking):** 56px rows, 16px corners; selected becomes wash with a 2px cobalt ring.

### Navigation
- **Desktop:** Figtree 500 at 15px pills in soft ink; hover to cobalt; active is a wash pill with cobalt text. Phone number and the Book button sit to the right.
- **Mobile:** a 44px round menu button opens a bottom sheet (28px top corners) with the brand, a vine rule, and Young Serif 26px links ruled by hairlines; active link in cobalt with a turquoise dot. Book (full width) then Call and WhatsApp side by side.

### Plate (signature)
A round photo in a turquoise-rimmed plate (see Shapes). The hero plate overlaps the large rosette, which turns like a plate on a potter's wheel as you scroll (0.09 degrees per pixel, disabled under reduced motion).

### Stations (signature)
Steps or milestones hang on one 1px turquoise line. Each marker is a 44px glaze circle with a 2px cobalt ring holding a Young Serif numeral (or a turquoise dot for undated items). A milestone's year sits above its title in cobalt Figtree 600 as data.

### Due Dates (signature)
The next deadline is a cobalt card: headline-size title, detail and full date in on-cobalt, a large days-left numeral right-aligned, and a split footer of two 56px actions (Add to calendar, Get it done). Later dates are hairline rows led by a 56px glaze date ring with a 2px turquoise ring, the day as a cobalt numeral and the month as an uppercase label. Rows due within seven days set their countdown in cobalt.

### Vine Rule
The painted vine runs full width at 16px tall as a section top edge (on wash and footer bands), under page heads, at the top of the mobile menu, and above each testimonial in place of a box.

## Do's and Don'ts

### Do:
- **Do** derive any new tone with `color-mix(in oklch, ...)` from glaze, wash, turquoise, cobalt and ink, and give it a token name.
- **Do** separate sections by changing the band ground (glaze, wash, cobalt, ink) and rule lists with the hairline.
- **Do** keep Book (cobalt), Call (turquoise, ink text) and WhatsApp (ink) at equal size wherever contact actions appear, and keep the mobile action dock on every page.
- **Do** put every portrait of a person in a round turquoise-rimmed plate.
- **Do** set quotes, numerals and headings in Young Serif 400, with tabular figures for numbers.
- **Do** keep tap targets at 44px or more and running text at 16px or more.
- **Do** let entrances rise 18px and fade over 0.9s on `cubic-bezier(0.16, 1, 0.3, 1)`, and drop all motion under reduced motion.

### Don't:
- **Don't** use gradients, gold, or a cream ground.
- **Don't** introduce a hue outside the five tones; the only exception is the form error red.
- **Don't** wrap services, testimonials, credentials or FAQs in boxed cards.
- **Don't** use gray or hard-offset shadows; shadows are soft and cobalt- or ink-tinted, and only under overlapping elements.
- **Don't** set Young Serif in bold or italic.
- **Don't** add small uppercase eyebrows or kickers above headlines; uppercase tracked labels are limited to the brand subline, footer column heads and date-ring months.
- **Don't** show any photo with square corners; place photos take 28px corners.
