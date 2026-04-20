# EM&AC Lab — Module 2: Circuit Analysis

Part of the three-module EM&AC Lab course: M1 (EM Fundamentals) → **M2 (Circuit Analysis)** → M3 (Transmission Lines & Antennas).

Interactive learning platform for analog circuit analysis. React 19 + TypeScript app built with Vite. Installable as a PWA with offline support.

## Operating Rules

* **Before claiming done:** run behavioural tests, not static-only. Run Vitest; for visual outputs, load the UI in a browser and check the actual rendering. State explicitly: `Tested: [X]. Not tested: [Y] because [Z].` See **P-TEST-01**.
* **Environment:** Windows UNC home via `Z:\`. Python is `python` not `python3` (**P-ENV-01**). Sub-agents are read-only on UNC — main agent performs writes (**P-ENV-05**). Always work from `Z:\`, never `\\maa1\...` (**P-ENV-09**). Short alias vs FQDN are distinct SMB caches (**P-ENV-10**).
* **Hooks:** limited PATH — no Python/Node interpreters in hook scripts (**P-ENV-06**).
* **Settings changes:** `.claude/settings.local.json` edits need session restart + Shift+Tab opt-in (**P-ENV-08**).
* Full rules: `.claude/skill/context_evaluator/shared-patterns.md`.

## Build & Dev

- `npm run dev` / `npm start` — Start Vite dev server (localhost:5173)
- `npm run build` — TypeScript check + production build (`tsc -b && vite build`)
- `npm run lint` — ESLint (includes jsx-a11y accessibility checks)
- `npm run preview` — Preview production build locally
- `npm test` — Run Vitest test suite (92 tests)
- `npm run test:watch` — Run Vitest in watch mode

## Architecture

- `src/types/circuit.ts` — Shared type definitions (CircuitType, DampingType, classifyDamping). Single source of truth.
- `src/store/progressStore.ts` — Zustand theme store (persisted to localStorage)
- `src/hooks/` — Shared hooks (`useOnlineStatus.ts`, `useShareableParams.ts`, `useChartExport.ts`)
- `src/components/modules/` — Page-level components, lazy-loaded via React.lazy for code-splitting. Large modules use subdirectory structure (e.g., `InteractiveLab/index.tsx` + `InteractiveLab/CircuitDiagram.tsx`).
- `src/components/layout/` — Layout (responsive with mobile sidebar + offline banner), Sidebar (navigation + dark mode toggle), ErrorBoundary
- `src/components/common/` — Shared components (AiTutor, CircuitCharts, CircuitParameterSliders, MathWrapper, Tabs, CollapsibleSection, ChallengeCard, ConceptCheck, ModuleNavigation, PredictionGate, SectionHook, TableOfContents)
- `src/utils/` — Math/physics calculations (componentMath.ts, circuitSolver.ts), utility helpers (cn.ts)
- `src/constants/modules.ts` — Cross-module URLs (reads `VITE_MODULE*_URL` env vars)
- `src/App.tsx` — Main app with React Router + Suspense code-splitting
- `src/main.tsx` — Entry point

### Key Data Shapes

| Interface | Fields | Purpose |
|-----------|--------|---------|
| `CircuitParams` | `R`, `L`, `C`, `voltage` | Input to the solver |
| `TimeSeriesPoint` | `time`, `voltage`, `current` | Single data point |
| `CircuitResponse` | `data[]`, `dampingType?`, `alpha?`, `omega0?`, `zeta?`, `timeConstant?` | Full simulation output |
| `Complex` | `real`, `imag` | Pole/zero representation |
| `MaterialProperty` | `name`, `resistivity?`, `permittivity?`, `permeability?` | Material constants |

### Key Patterns

- **URL param sync** — InteractiveLab syncs circuit config (type, input, R, L, C, V) to URL search params via `useSearchParams` + `useDeferredValue`. Enables shareable lab links. Extracted to `useShareableParams` hook.
- **Chart export** — InteractiveLab has SVG→Canvas→PNG export (2x resolution, dark/light aware). Extracted to `useChartExport` hook.
- **Active recall** — ConceptCheck (multiple-choice + predict-reveal), ChallengeCard (auto-check with hints), PredictionGate (predict-before-reveal wrapper). Used across all modules.
- **Progressive disclosure** — CollapsibleSection wraps secondary content. Experiment tips, equations, worked examples default-closed to reduce scroll.

## Module-Specific Conventions

- Recharts for data visualization / circuit plots
- Optional Google Generative AI integration for AI tutor (API key in localStorage only)
- `useShareableParams` hook for URL param sync (clampNum, parseEnum, useUrlSync, useCopyLink)
- `useChartExport` hook for SVG→PNG chart export

### User Flows

- **Guided Learning Path:** Overview → Component Physics → Circuit Analysis → Laplace Theory → S-Domain Analysis → Interactive Lab
- **Think it Through (Socratic Tutor):** Click "Think it Through" → Enter Gemini API key → Guided Socratic dialogue with LaTeX-formatted responses → Persists across page navigation
- **Interactive Circuit Simulation:** Select circuit type (RC/RL/RLC) → Toggle input (Step/Impulse) → Adjust sliders → See live charts + equations + analysis

## Content Bridges

- **Laplace transforms** → M3 impedance analysis
- **Component physics** ← M1 magnetic circuits

## Skills

| Skill | Purpose | Location |
|-------|---------|----------|
| context-evaluator | Session lifecycle, context loading, correction capture | `.claude/skill/context_evaluator/SKILL.md` |
| handover | Cross-chat session continuity via Notion | `.claude/skill/handover/SKILL.md` |
| refactor | Safe code refactoring with certainty levels | `.claude/skill/refactor/SKILL.md` |
| frontend-design | Educational app design guidelines | `.claude/skill/frontend-design/SKILL.md` |
| notebooklm-guide | Query textbook notebooks (Ulaby, Nilsson) for physics content | `.claude/skill/notebooklm-guide/SKILL.md` |
| academic-research | Literature search across 12+ databases (Scopus, WoS, ERIC, etc.) | `.claude/skill/academic-research/SKILL.md` |
| stop-slop | Remove AI writing patterns from prose | `.claude/skill/stop-slop/SKILL.md` |
| citation-verification | Verify academic citations and references | `.claude/skill/citation-verification/SKILL.md` |

## Reference

| Topic | File |
|-------|------|
| Architecture, tech stack, constraints, data shapes | `.claude/skill/context_evaluator/context.md` |
| Current session state, pending tasks, blockers | `SESSION.md` |
| Accumulated corrections and hard constraints | `PATTERNS.md` |
| All design decisions with rationale | `.claude/skill/context_evaluator/decisions-log.md` |
| Communication and coding preferences | `.claude/skill/context_evaluator/personal-preferences.md` |
| Cross-project rules (synced from my-claude-skills) | `.claude/skill/context_evaluator/shared-patterns.md` |
| Legacy architecture decisions (full 28 ADRs) | `context/decisions.md` |
| Full refactor workflow specification | `.claude/commands/refactor.md` |

## Session Boundary Protocol

At **session end**, run both protocols in order:
1. **context_evaluator** — writes `SESSION.md` + `PATTERNS.md` (local project state)
2. **handover** — saves structured handover to Notion (cross-chat continuity)

At **session start**, context_evaluator loads local files automatically. Use handover **FETCH** only when resuming in a brand-new chat that lacks prior context.

## Task Decomposition

Before starting any non-trivial task, assess scope:
- If a task has 3+ deliverables, 2+ files, or 2+ skills — decompose into subtasks with dependency map before starting.
- Present the subtask list and proposed execution order before starting work.
- Report at each boundary: what was completed, what comes next, any blockers.

## Self-Verification

Before returning any output:
1. **Goal analysis** — State explicit and implicit goals.
2. **Assumption audit** — List inferences not directly stated in input.
3. **Gap identification** — What is missing, ambiguous, or likely to fall short?
4. **End-to-end self-test** — Test against all stated goals. For physics simulations: verify math against textbook, check edge cases, run tests.
5. **Pattern check** — Check `PATTERNS.md`. If output would trigger a known pattern, apply the fix automatically.

## Do Not Touch

- `.github/workflows/deploy.yml` — CI/CD pipeline, change only with explicit intent
- `src/utils/circuitSolver.ts` — Core math engine, requires careful review and testing before any modification

## Deployment

Auto-deploys to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`. The CI pipeline runs lint, type-check, and build before deploying. A `404.html` fallback is generated for SPA client-side routing. Uses `actions/deploy-pages` (requires Pages source set to "GitHub Actions" in repo settings).
