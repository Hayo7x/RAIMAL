# RAIMAL brand identity

Version 1.0 · 8 October 2026

Open [the visual identity guide](RAIMAL-brand-identity.html) in a browser. It works offline and uses the approved PNG unchanged. This identity is a proposed extension of the approved logo; it does not change the application theme.

## Brand foundation

RAIMAL is the brand and product name for the satellite-assisted inspection workflow. Write **RAIMAL** in uppercase. Use the approved logo as the single brand signature; no separate product sub-brand is needed.

**Positioning:** Agricultural intelligence that helps teams turn field observations into focused inspection tasks.

**Proposed headline:** Read the field. Focus the next check.

**Character:** Grounded, precise, actionable. The circular field symbol and curved crop rows inspire the visual language. Its green palette connects the technical product to cultivated land.

**Voice:** Short, specific, measured. Say what was observed, what remains uncertain, and what to check next. Prefer “Persistent crop-pattern change; inspect the eastern sector” to “AI detected an irrigation failure.” Label synthetic examples as demo data. Do not present proposed benefits or simulated metrics as measured results.

## Color system

| Token | Hex | Purpose |
| --- | --- | --- |
| Field | `#5A9367` | Approved brand green; illustrations and decorative accents |
| Grove | `#44633F` | Approved supporting green; primary buttons, links, emphasis |
| Earth | `#3F4B3B` | Approved wordmark color; headings and dark brand panels |
| Ink | `#263329` | Body copy, values, high-contrast foregrounds |
| Chalk | `#F6F7F2` | Main background |
| White | `#FFFFFF` | Cards, logo plates, text on Grove |
| Mist | `#E7EDE2` | Secondary surfaces and subtle grouping |
| Line | `#CBD5C5` | Decorative dividers; not the sole boundary of an input |
| Muted | `#596653` | Secondary text on light backgrounds |
| Water | `#245C73` | Information, keyboard focus, secondary data series |
| Caution | `#805411` | Inspection-needed labels on `#FFF1D6` |
| Critical | `#A13932` | Confirmed-issue labels on `#FBEAE6` |

The first three colors come from the approved asset documentation, rather than individual antialiased PNG pixels. Supporting colors are designed for the broader system. Suggested composition: 60% light neutrals, 25% dark colors, 10% Field, and up to 5% functional accents. These are flexible layout proportions, not requirements for charts.

Use Grove with white text for actions. Field on white passes the 3:1 target for large text and essential graphics but fails 4.5:1 for normal text. See [computed contrast ratios](contrast-report.json). Pair all statuses with text and, where helpful, a distinct icon. Never communicate severity using color alone. Use labels and line styles to distinguish chart series. Test any new color pairing before use.

## Typography

Use **Segoe UI**, with Arial and sans-serif fallbacks. This guide uses installed system fonts and contains no bundled font files. Consolas, with monospace fallback, is for field identifiers, coordinates, and compact technical labels. Use tabular numerals for comparable values. Keep the custom geometric lettering within the approved wordmark.

| Style | Size | Weight | Line height |
| --- | --- | --- | --- |
| Cover display | 64–88px; 48px on small screens | 600 | 1.05 |
| Section heading | 32–40px | 600 | 1.15 |
| Component title | 20–24px | 600 | 1.25 |
| Body | 16–18px | 400 | 1.6 |
| Technical label | 12–13px | 400 | 1.4 |

Use sentence case in headings and controls. Reserve uppercase with modest tracking for short section labels. Avoid long all-caps text. If Arabic is introduced, use a tested Arabic-capable system font, set the document direction appropriately, and check the full layout with actual Arabic copy before release; this guide is an English reference.

## Logo rules

- Use `RAIMAL-logo-final.png` intact. It is the approved, locked artwork.
- Place it on White or Chalk. On dark layouts, place the original on a light plate.
- Clear space: at least one wordmark-letter height around the visible artwork. Existing transparent padding can count toward this distance.
- Starting minimum: 180px-wide PNG image box on screen or 40mm in print. Inspect the lettering at the final output size. Do not use this full lockup as a tiny favicon.
- Do not stretch, rotate, recolor, redraw, add shadows, replace the lettering, or place over busy imagery.
- An icon-only mark, one-color variant, reversed version, or production vector requires its own approved asset. None is supplied or implied by this kit.

The source is a raster PNG. Its visible edge quality and any color variation are inherited from that file. Do not describe it as a vector master; inspect it at the intended reproduction scale before large-format use.

## Layout and graphics

Use a 4px base with spacing steps of 4, 8, 12, 16, 24, 32, 48, 64, and 96px. Use 8px control corners, 16px panel corners, and pill shapes only for short badges. Keep information left aligned and give one primary action prominence per task. Use flat fills, restrained borders, and generous whitespace.

Decorative graphics may use broad curved bands inspired by crop rows. They are supporting artwork, never replacement logos. Keep them away from dense data. Actual data figures must encode their real geometry and quantities; decorative field motifs must be labeled illustrative when they could be mistaken for evidence.

For photography, use real agricultural context and visible field structure when available; preserve natural greens and neutral light. Avoid heavy green overlays, exaggerated neon effects, or imagery that implies the demo has verified a specific farm.

## Component and application direction

- Primary action: Grove fill, White label, 8px radius, at least 44px target height. Hover may use Earth. Focus uses a White inner ring and Water outer ring so it remains visible on light and dark surroundings.
- Secondary action: transparent or White fill, Grove text and border. Underline inline links; do not rely on their green color alone.
- Inputs: visible text labels, Grove or Muted borders, and explicit text errors. Line is only a decorative divider color.
- Cards: White on Chalk with 16px corners; use a heading and spacing to establish grouping.
- Status: “Needs inspection” uses Caution; “Confirmed issue” uses Critical only after a recorded finding. “Recorded” may use Grove on Mist. Neutral or missing evidence must not read as a healthy-field verdict.
- Pitch cover: approved logo on a light field, one short headline, a restrained crop-row motif. Supporting slides: one claim per page, strong figure labels, explicit demo or evidence qualifiers.
- Product screen: approved RAIMAL signature, field context, evidence, and next action. The visual guide contains a non-interactive example.

## Files

- `RAIMAL-brand-identity.html`: offline visual guide and component specimen.
- `RAIMAL-brand-guidelines.md`: implementation and writing rules.
- `raimal.tokens.css`: namespaced CSS custom properties; no global theme overrides.
- `raimal.tokens.json`: reusable design-token values.
- `contrast-report.json`: computed WCAG sRGB contrast ratios for specified solid pairs, not a full application accessibility audit.
- `RAIMAL-brand-preview.png`: desktop visual overview.
- `build_identity.py`: rebuilds the guide, tokens, and contrast report using Python's standard library.

To use the CSS, import `raimal.tokens.css` and reference values such as `var(--raimal-grove)` and `var(--raimal-font-sans)`. Importing tokens alone does not modify existing components.
