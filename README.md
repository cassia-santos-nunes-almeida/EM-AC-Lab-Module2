# EM&AC Lab — Module 2: Circuit Analysis

An interactive learning platform for analog circuit analysis. Built for students taking introductory circuit theory courses at LUT University. This is the second module in the **EM&AC Lab** three-module course.

**Live Demo:** https://em-ac-lab-module.vercel.app/

## Course Structure

This app is part of a three-module progressive learning sequence:

| Module | Focus | Description |
|---|---|---|
| [Module 1](https://em-ac-lab-module1.vercel.app/) | Electromagnetic Fundamentals | Maxwell's equations, field laws, EM waves, magnetic circuits |
| **Module 2 (this app)** | Circuit Analysis | Component physics, time/s-domain analysis, Laplace transforms |
| [Module 3](https://em-ac-lab-module3.vercel.app/) | Transmission Lines & Antennas | Coupled coils, transmission line theory, Smith chart, antennas |

**Module 1 → Module 2:** Magnetic circuits, mutual inductance, and phasor concepts from Module 1 provide the physical foundation for circuit analysis here. **Module 2 → Module 3:** The Laplace transform techniques and impedance concepts mastered here are essential for transmission line analysis in Module 3.

## Modules

| Route | Module | Description |
|---|---|---|
| `/` | **Overview** | Learning objectives, guided learning path, and AI tutor introduction |
| `/component-physics` | **Component Physics** | Interactive exploration of R, L, C with adjustable physical parameters, SVG diagrams, real-time calculations |
| `/circuit-analysis` | **Circuit Analysis** | Time-domain ODE vs. s-domain (Laplace) methods for RC, RL, RLC — with KVL/KCL exercises |
| `/laplace-theory` | **Laplace Theory** | Transform definition, pairs table, properties (incl. FVT stability caveat), Laplace motivation demo |
| `/s-domain-analysis` | **S-Domain Analysis** | Transfer functions, poles/zeros visualization, damping ratios, stability analysis |
| `/interactive-lab` | **Interactive Lab** | Real-time circuit simulations with parameter tuning, step/impulse responses, guided challenges |

## Think it Through (optional)

The app includes a Socratic AI tutor sidebar that guides students through circuit analysis with questions rather than direct answers. It uses the **Google Gemini API** (free tier) and supports three display modes: closed, docked, and floating.

To enable it:
1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click the chat icon in the app sidebar
3. Paste your key when prompted

Your key is stored only in your browser's local storage — it is never sent to any server other than Google's API.

## Progressive Web App

The app is installable as a PWA with offline support. On supported browsers, users can add it to their home screen for a native-like experience. The service worker auto-updates when new content is deployed — no manual refresh needed.

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (localhost:5173)
npm run dev        # or: npm start

# Production build (TypeScript check + Vite bundle)
npm run build

# Lint
npm run lint

# Preview production build locally
npm run preview
```

## Tech Stack

- **React 19** + **TypeScript** — UI framework and type safety
- **Vite 7** — Build tool and dev server
- **Tailwind CSS 4** — Utility-first styling with custom `engineering-blue` palette
- **KaTeX** — LaTeX math rendering
- **Recharts** — Charts and data visualization
- **Lucide React** — Icons
- **React Router DOM 7** — Client-side routing
- **Google Generative AI** — Optional AI tutor (Gemini)
- **vite-plugin-pwa** — Service worker generation and offline caching

## Deployment

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that auto-deploys to GitHub Pages on every push to `main`. The pipeline runs lint, type-check, and build before deploying. A `404.html` fallback is generated so that client-side routes work on direct navigation.

**Setup:**
1. Go to **Settings > Pages** in your GitHub repo
2. Under **Build and deployment > Source**, select **GitHub Actions**
3. Push to `main` — the workflow builds and deploys automatically

## Cross-Module Features

- **Unified dark mode** — Theme preference syncs across all three modules via shared `emac-theme` localStorage key
- **Cross-module navigation** — Links between modules via configurable environment variables (see `.env.example`)
- **Consistent pedagogy** — All modules use ConceptCheck, CollapsibleSection, and "Think it Through" Socratic tutor
- **Progress persistence** — Section visits, concept checks, and prediction gates tracked in localStorage (`emac-m2-progress`)

## License

© 2026 [CA/EM&CA], LUT University. Licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

Provided for educational purposes within LUT University. Third-party materials used under Kopiosto License.
