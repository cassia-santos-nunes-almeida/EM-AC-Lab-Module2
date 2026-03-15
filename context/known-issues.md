# Known Issues

Active bugs, limitations, and technical debt. Remove items when resolved.

---

## Architecture

1. **API key in localStorage** — Gemini API key stored in plain text. Acceptable for student tool, not for broader deployment.
2. **Shareable URL + chart export not yet reusable** — Both patterns are inline in `InteractiveLab/index.tsx`. Should be extracted into `src/hooks/useShareableParams.ts` and `src/components/common/ChartToolbar.tsx` (or `src/hooks/useChartExport.ts`) before adding to ComponentPhysics, TimeDomain, and SDomainAnalysis. See sprint "Next" items.
3. **Chart PNG export uses SVG serialization** — Works for Recharts SVGs but won't capture CSS-only styles (e.g., Tailwind classes applied via stylesheets). Current approach inlines enough for the chart, but if charts gain complex CSS styling, may need html2canvas or similar.
