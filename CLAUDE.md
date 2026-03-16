# EM&AC Lab — Module 2: Circuit Analysis

Part of the three-module EM&AC Lab course: M1 (EM Fundamentals) → **M2 (Circuit Analysis)** → M3 (Transmission Lines & Antennas).

> **Shared conventions:** See `COURSE_GUIDELINES.md` for cross-module patterns, lessons learned, and pedagogical guidelines.

Interactive learning platform for analog circuit analysis. React 19 + TypeScript app built with Vite. Installable as a PWA with offline support.

## Build & Dev

- `npm run dev` / `npm start` — Start Vite dev server (localhost:5173)
- `npm run build` — TypeScript check + production build (`tsc -b && vite build`)
- `npm run lint` — ESLint (includes jsx-a11y accessibility checks)
- `npm run preview` — Preview production build locally
- `npm test` — Run Vitest test suite (78 tests)
- `npm run test:watch` — Run Vitest in watch mode

## Architecture

- `src/types/circuit.ts` — Shared type definitions (CircuitType, DampingType, classifyDamping). Single source of truth.
- `src/store/progressStore.ts` — Zustand theme store (persisted to localStorage)
- `src/hooks/` — Shared hooks (`useOnlineStatus.ts` for navigator.onLine via useSyncExternalStore)
- `src/components/modules/` — Page-level components, lazy-loaded via React.lazy for code-splitting. Large modules use subdirectory structure (e.g., `InteractiveLab/index.tsx` + `InteractiveLab/CircuitDiagram.tsx`).
- `src/components/layout/` — Layout (responsive with mobile sidebar + offline banner), Sidebar (navigation + dark mode toggle), ErrorBoundary
- `src/components/common/` — Shared components (AiTutor, CircuitCharts, CircuitParameterSliders, MathWrapper, Tabs, CollapsibleSection, ChallengeCard, ConceptCheck, ModuleNavigation, PredictionGate, SectionHook, TableOfContents)
- `src/utils/` — Math/physics calculations (componentMath.ts, circuitSolver.ts), utility helpers (cn.ts)
- `src/constants/modules.ts` — Cross-module URLs (reads `VITE_MODULE*_URL` env vars)
- `src/App.tsx` — Main app with React Router + Suspense code-splitting
- `src/main.tsx` — Entry point

### Key Patterns

- **URL param sync** — InteractiveLab syncs circuit config (type, input, R, L, C, V) to URL search params via `useSearchParams` + `useDeferredValue`. Enables shareable lab links. Pattern is inline — extract to a `useShareableParams` hook if adding to more modules.
- **Chart export** — InteractiveLab has SVG→Canvas→PNG export (2x resolution, dark/light aware). Pattern is inline in `handleDownloadChart` — extract to `useChartExport` hook or `ChartToolbar` component if reusing.
- **Active recall** — ConceptCheck (multiple-choice + predict-reveal), ChallengeCard (auto-check with hints), PredictionGate (predict-before-reveal wrapper). Used across all modules.
- **Progressive disclosure** — CollapsibleSection wraps secondary content. Experiment tips, equations, worked examples default-closed to reduce scroll.

## Conventions

- React functional components with TypeScript
- Tailwind CSS for styling (via `cn()` utility from `src/utils/cn.ts`)
- KaTeX for math rendering (wrapped by `MathWrapper` component)
- Recharts for data visualization / circuit plots
- Lucide React for icons
- React Router for navigation
- vite-plugin-pwa for service worker generation and offline caching (auto-update strategy)
- Optional Google Generative AI integration for AI tutor (API key in localStorage only)
- Cross-module URLs via `src/constants/modules.ts` (configurable in `.env`)
- Dark mode: shared `emac-theme` localStorage key across all three modules

## Cross-Module Integration

- **Dark mode**: Shared `emac-theme` localStorage key — toggling in any module affects all three
- **Navigation**: `src/constants/modules.ts` provides URLs to M1 and M3
- **Content bridges**: Laplace transforms → M3 impedance analysis; Component physics ← M1 magnetic circuits

## Skills

When refactoring code → read `skills/refactor/SKILL.md` first.
When building or improving frontend UI/UX → read `skills/frontend-design/SKILL.md` first.

## Context Files

- `context/current-sprint.md` — What's being built right now
- `context/decisions.md` — Architecture decision log (28 ADRs)
- `context/known-issues.md` — Active bugs and technical debt
- `context/project-reference.md` — Detailed technical reference

## Do Not Touch

- `.github/workflows/deploy.yml` — CI/CD pipeline, change only with explicit intent
- `src/utils/circuitSolver.ts` — Core math engine, requires careful review and testing before any modification

## Deployment

Auto-deploys to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`. The CI pipeline runs lint, type-check, and build before deploying. A `404.html` fallback is generated for SPA client-side routing. Uses `actions/deploy-pages` (requires Pages source set to "GitHub Actions" in repo settings).
