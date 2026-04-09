# Context — EM-AC-Lab-Module2

## What This Is

Interactive web application for Module 2 (Circuit Analysis) of the EM&AC Lab course (BL30A0350) at LUT University. Students explore analog circuit analysis through interactive simulations covering component physics, time-domain analysis, Laplace/s-domain theory, and a full interactive circuit lab.

Part of a three-module series: M1 (EM Fundamentals) → **M2 (Circuit Analysis)** → M3 (Transmission Lines & Antennas).

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 (CSS-only config via `@theme` in index.css) + clsx/tailwind-merge
- **State:** Zustand 5 (persisted theme store; progress tracking removed 2026-03-15)
- **Math rendering:** KaTeX
- **Charts:** Recharts (voltage/current traces, s-domain plots)
- **AI Tutor:** Google Gemini (`@google/generative-ai`, key in localStorage)
- **Icons:** Lucide React
- **Routing:** React Router DOM (lazy-loaded routes via React.lazy + Suspense)
- **PWA:** vite-plugin-pwa (offline detection via useSyncExternalStore)
- **Testing:** Vitest + Testing Library (92 tests, 141 cases)
- **Linting:** ESLint with jsx-a11y accessibility plugin
- **Deployment:** GitHub Pages via `.github/workflows/deploy.yml`

## Architecture

```
src/
├── types/circuit.ts           — CircuitType, DampingType, classifyDamping (single source of truth)
├── store/progressStore.ts     — useThemeStore (Zustand + persist, theme only)
├── hooks/                     — useOnlineStatus, useShareableParams, useChartExport
├── components/
│   ├── common/                — AiTutor, CircuitCharts, CircuitParameterSliders, MathWrapper,
│   │                            Tabs, CollapsibleSection, ChallengeCard, ConceptCheck,
│   │                            ModuleNavigation, PredictionGate, SectionHook, TableOfContents
│   ├── layout/                — Layout (responsive + offline banner), Sidebar, ErrorBoundary
│   └── modules/               — Page components (lazy-loaded), large ones use subdirectories
│       ├── InteractiveLab/    — index.tsx + CircuitDiagram.tsx
│       ├── ComponentPhysics/  — index.tsx + ResistorSection, CapacitorSection, InductorSection
│       └── TimeDomain/        — index.tsx + CircuitComparisonLayout, MethodComparisonTable
├── utils/
│   ├── cn.ts                  — clsx + tailwind-merge
│   ├── componentMath.ts       — Component physics calculations
│   └── circuitSolver.ts       — Core circuit simulation engine
├── constants/modules.ts       — Cross-module URLs (VITE_MODULE*_URL env vars)
└── App.tsx / main.tsx
```

## Key Data Shapes

| Interface | Fields | Purpose |
|-----------|--------|---------|
| CircuitParams | R, L, C, voltage | Input to the solver |
| TimeSeriesPoint | time, voltage, current | Single data point |
| CircuitResponse | data[], dampingType?, alpha?, omega0?, zeta?, timeConstant? | Full simulation output |
| Complex | real, imag | Pole/zero representation |
| MaterialProperty | name, resistivity?, permittivity?, permeability? | Material constants |

## User Flows

- **Guided Learning Path:** Overview → Component Physics → Circuit Analysis → Laplace Theory → S-Domain Analysis → Interactive Lab
- **Think it Through (Socratic Tutor):** Click "Think it Through" → Enter Gemini API key → Socratic dialogue with LaTeX
- **Interactive Circuit Simulation:** Select circuit type (RC/RL/RLC) → Toggle input (Step/Impulse) → Adjust sliders → Live charts + equations

## Key Patterns

- **URL param sync** — InteractiveLab syncs circuit config to URL params via useShareableParams hook
- **Chart export** — SVG→Canvas→PNG export (2x resolution, dark/light aware) via useChartExport hook
- **Active recall** — ConceptCheck, ChallengeCard, PredictionGate across all modules
- **Progressive disclosure** — CollapsibleSection wraps secondary content

## Content Bridges

- **Laplace transforms** → M3 impedance analysis
- **Component physics** ← M1 magnetic circuits

## Key Constraints

- `circuitSolver.ts` is the core math engine — requires careful review and testing before modification
- `.github/workflows/deploy.yml` — CI/CD pipeline, change only with explicit intent
- Vendor chunks split manually via Rollup manualChunks (react, recharts, katex, gemini)
- Shared `emac-theme` localStorage key across all 3 modules

## Never Suggest

- Changing the vendor chunk split strategy without measuring bundle sizes
- Re-adding visit-based progress tracking (removed by design — see decisions-log)
- Hardcoding module URLs — must use VITE_MODULE*_URL env vars
- Changing the `emac-theme` localStorage key — shared across M1/M2/M3

## Last Updated

2026-04-09
