# Known Issues

Active bugs, limitations, and technical debt. Remove items when resolved.

---

## Architecture

1. **API key in localStorage** — Gemini API key stored in plain text. Acceptable for student tool, not for broader deployment.
2. **~~Shareable URL + chart export not yet reusable~~** ✅ (2026-03-16) — Extracted to `src/hooks/useShareableParams.ts` (clampNum, parseEnum, useUrlSync, useCopyLink) and `src/hooks/useChartExport.ts`. Both have tests.
3. **Chart PNG export uses SVG serialization** — Works for Recharts SVGs but won't capture CSS-only styles (e.g., Tailwind classes applied via stylesheets). Current approach inlines enough for the chart, but if charts gain complex CSS styling, may need html2canvas or similar.
