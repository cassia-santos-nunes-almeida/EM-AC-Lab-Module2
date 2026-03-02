# Known Issues

Active bugs, limitations, and technical debt. Remove items when resolved.

---

## Architecture

1. **Large components remain** — `ComponentPhysics/index.tsx` (~766 lines) and `TimeDomain/index.tsx` (~661 lines) are still large. Progressive disclosure via CollapsibleSection improves UX, but further sub-component extraction is possible.
2. **No component-level tests** — React Testing Library tests not yet added for UI components. Only unit tests exist for math utilities (37 tests).

## Security

3. **API key in localStorage** — Gemini API key stored in plain text. Acceptable for student tool, not for broader deployment.
