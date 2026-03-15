# Known Issues

Active bugs, limitations, and technical debt. Remove items when resolved.

---

## Architecture

1. **API key in localStorage** — Gemini API key stored in plain text. Acceptable for student tool, not for broader deployment.

## Physics Simplifications

2. **Iron permeability linearized** — μᵣ values in componentMath.ts are linearized. Real ferromagnetic materials have nonlinear B-H curves. A note is shown in the UI.

3. **FVT stability caveat** — Final Value Theorem is only valid when all poles of sF(s) have negative real parts. A caveat is shown in the Laplace Theory properties table.
