# EM&AC Lab — Module 2: Circuit Analysis

> *From resistor physics to pole-zero plots — master circuit analysis through interactive simulations, Laplace transforms & real-time s-domain visualization.*

An interactive learning platform for analog circuit analysis. Built for students taking introductory circuit theory courses at LUT University. This is the second module in the **EM&AC Lab** three-module course.

**Live Demo:** https://em-ac-lab-module2.vercel.app/

## Course Structure

This app is part of a three-module progressive learning sequence:

| Module | Focus | Description |
|---|---|---|
| [Module 1](https://em-ac-lab-module1.vercel.app/) | Electromagnetic Fundamentals | Maxwell's equations, field laws, EM waves, magnetic circuits |
| **Module 2 (this app)** | Circuit Analysis | Component physics, time/s-domain analysis, Laplace transforms |
| [Module 3](https://em-ac-lab-module3.vercel.app/) | Transmission Lines & Antennas | Coupled coils, transmission line theory, Smith chart, antennas |

**Module 1 → Module 2:** Magnetic circuits, mutual inductance, and phasor concepts from Module 1 provide the physical foundation for circuit analysis here. **Module 2 → Module 3:** The Laplace transform techniques and impedance concepts mastered here are essential for transmission line analysis in Module 3.

## Features

- **6 Interactive Modules** — Component physics, time-domain ODE, Laplace theory, s-domain analysis, and interactive lab
- **"Think it Through" Socratic Tutor** — AI chat (Google Gemini) that guides via questions, never gives direct answers
- **PredictionGate** — Students commit a prediction before accessing simulations
- **ConceptCheck** — Multiple-choice knowledge checks embedded throughout modules
- **Real-Time Circuit Charts** — Recharts-powered step/impulse response visualization with parameter tuning
- **Dark Mode** — Persisted theme toggle (shared `emac-theme` key across all three modules)
- **Progress Tracking** — Section visits, prediction gates, concept checks tracked in localStorage
- **PWA** — Installable as a Progressive Web App with offline support
- **Accessible** — WAI-ARIA tabs, roving tabIndex, skip-to-content, aria-live regions

## Modules

| Route | Module | Description |
|---|---|---|
| `/` | **Overview** | Learning objectives, guided learning path, and AI tutor introduction |
| `/component-physics` | **Component Physics** | Interactive exploration of R, L, C with adjustable physical parameters, SVG diagrams, real-time calculations |
| `/circuit-analysis` | **Circuit Analysis** | Time-domain ODE vs. s-domain (Laplace) methods for RC, RL, RLC — with KVL/KCL exercises |
| `/laplace-theory` | **Laplace Theory** | Transform definition, pairs table, properties (incl. FVT stability caveat), Laplace motivation demo |
| `/s-domain-analysis` | **S-Domain Analysis** | Transfer functions, poles/zeros visualization, damping ratios, stability analysis |
| `/interactive-lab` | **Interactive Lab** | Real-time circuit simulations with parameter tuning, step/impulse responses, guided challenges |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 |
| State | Zustand (persisted) |
| Routing | react-router-dom v7 |
| Icons | lucide-react |
| Math | KaTeX |
| Charts | Recharts |
| AI Tutor | Google Gemini API |
| PWA | vite-plugin-pwa |
| Testing | Vitest + Testing Library |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Preview production build
npm run preview
```

### AI Tutor Setup

The AI Tutor uses Google Gemini. To enable it:

1. Get a free API key from [Google AI Studio](https://aistudio.google.com)
2. Click the chat icon in the app sidebar
3. Enter your API key when prompted (stored in localStorage only)

## Project Structure

```
src/
├── components/
│   ├── common/           — Reusable: AiTutor, MathWrapper, ConceptCheck, Tabs, CollapsibleSection, etc.
│   ├── layout/           — Layout shell, Sidebar, ErrorBoundary
│   └── modules/          — Page-level components (lazy-loaded, some with subdirectories)
│       ├── ComponentPhysics/
│       ├── InteractiveLab/
│       └── TimeDomain/
├── constants/            — Cross-module URLs
├── hooks/                — useOnlineStatus
├── store/                — Zustand stores (theme + progress)
├── types/                — TypeScript interfaces (CircuitType, DampingType)
└── utils/                — Math/physics (componentMath, circuitSolver), cn()
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run lint` | ESLint with jsx-a11y accessibility rules |
| `npm test` | Run Vitest test suite |
| `npm run preview` | Serve production build locally |

## Cross-Module Features

- **Unified dark mode** — Theme preference syncs across all three modules via shared `emac-theme` localStorage key
- **Cross-module navigation** — Links between modules via configurable environment variables (see `.env.example`)
- **Consistent pedagogy** — All modules use PredictionGate, ConceptCheck, CollapsibleSection, and "Think it Through" Socratic tutor
- **Progress persistence** — Section visits, concept checks, and prediction gates tracked in localStorage (`emac-m2-progress`)

## Deployment

Auto-deploys to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`. The CI pipeline runs lint, type-check, and build before deploying. A `404.html` fallback is generated for SPA client-side routing.

**Setup:**
1. Go to **Settings > Pages** in your GitHub repo
2. Under **Build and deployment > Source**, select **GitHub Actions**
3. Push to `main` — the workflow builds and deploys automatically

## Disclaimer

This educational application was architected and generated using AI models. While designed to align with rigorous engineering standards, it may contain errors or simplifications. **Always cross-reference** all formulas, diagrams, and explanations with your official course reference books.

## License

© 2026 [CA/EM&CA], LUT University. Licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

Provided for educational purposes within LUT University. Third-party materials used under Kopiosto License.
