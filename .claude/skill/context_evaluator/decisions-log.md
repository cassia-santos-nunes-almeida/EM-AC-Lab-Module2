# Decisions Log — EM-AC-Lab-Module2

Chronological log of key decisions. Newest at top.

---

### 2026-04-09 — Onboarded to my-claude-skills system
**Decision:** Adopted centralized skill system with context-evaluator v2.0.0 + handover. Migrated skills from `skills/` to `.claude/skill/`. Made project self-contained (removed `../CLAUDE.md` references).
**Reason:** Enables session lifecycle management, cross-project pattern sync, and Notion handovers.

### 2026-03-15 — Shareable lab links and chart export
**Decision:** Sync InteractiveLab state to URL search params via useSearchParams. Add Download PNG and Copy Link buttons.
**Reason:** Students need to share specific circuit configurations and export charts for lab reports.

### 2026-03-15 — ComponentPhysics concept checks and Overview review tab
**Decision:** Add ConceptCheck per ComponentPhysics tab. Add "Review" tab to Overview with cross-module connections.
**Reason:** ComponentPhysics was the only module without active recall.

### 2026-03-15 — Remove progress tracking (visit-based)
**Decision:** Remove useProgressStore, sidebar progress bar, and visited-module checkmarks. Keep useThemeStore.
**Reason:** Visiting a page is not the same as learning. If progress tracking returns, it should be based on meaningful signals.

### 2026-03-02 — Page-level integration tests
**Decision:** Add 13 integration tests covering page rendering, tab switching, concept check interaction.
**Reason:** Component-level tests don't catch integration issues (duplicate text collisions, ARIA propagation).

### 2026-03-02 — Comprehensive accessibility audit
**Decision:** Add WAI-ARIA patterns: tablist/tab/tabpanel, dialog + Escape key, region + aria-controls, group + aria-live.
**Reason:** Screen reader users need semantic landmarks and live region announcements.

### 2026-03-02 — Vendor chunk splitting with manualChunks
**Decision:** Split vendor bundles: vendor-react (46KB), vendor-recharts (366KB), vendor-katex (265KB), vendor-gemini (19KB).
**Reason:** Build exceeded Vite's 500KB warning. Splitting improves caching.

### 2026-03-02 — Decompose ComponentPhysics and TimeDomain
**Decision:** Extract sub-components from the two largest page components (770 and 665 lines).
**Reason:** Improves readability, testability, and focused code reviews.

### 2026-03-02 — Component-level tests with React Testing Library
**Decision:** Add tests for 5 shared UI components using @testing-library/user-event.
**Reason:** Only math utility tests existed (37 tests). Component tests catch interactive regressions.

### 2026-03-01 — Frontend design skill (adapted for education)
**Decision:** Install frontend-design skill, adapted for educational context — clarity first, bold in micro-interactions and data visualization.
**Reason:** Original skill's "brutalist/maximalist" direction conflicts with educational readability.

### 2026-03-01 — Dark mode with Zustand theme store
**Decision:** Class-based dark mode using useThemeStore (Zustand + persist). Toggle in sidebar.
**Reason:** Works with Tailwind v4's @variant dark. Persistence remembers preference.

### 2026-03-01 — Tailwind v4 CSS-only configuration
**Decision:** Delete tailwind.config.js, use @theme directive in index.css.
**Reason:** v3-style config was redundant with v4's CSS-first approach.

### 2026-03-01 — Code-split routes with React.lazy
**Decision:** Lazy-load all module page components.
**Reason:** Main bundle was 1,059 KB. After splitting: 566 KB main + 14-28 KB per page.

### Initial — Local-only state management
**Decision:** Component state via useState. Zustand only for theme persistence.
**Reason:** Single-user learning tool. Most state is page-local.

### Initial — Client-side Gemini API key
**Decision:** Store Google Gemini API key in localStorage, call API directly from browser.
**Reason:** No backend. Acceptable risk for a student learning tool.

### Initial — KaTeX over MathJax
**Decision:** Use KaTeX for math rendering.
**Reason:** Faster than MathJax, sufficient LaTeX subset for circuit analysis.
