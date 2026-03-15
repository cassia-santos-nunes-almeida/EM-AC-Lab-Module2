import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { Layout } from './components/layout/Layout';

// Retry dynamic imports once on failure (handles stale service worker cache)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lazyRetry(importFn: () => Promise<any>) {
  return lazy(() =>
    importFn().catch(() => {
      const reloaded = sessionStorage.getItem('chunk-reload');
      if (!reloaded) {
        sessionStorage.setItem('chunk-reload', '1');
        window.location.reload();
        return new Promise(() => {}); // never resolves — page is reloading
      }
      sessionStorage.removeItem('chunk-reload');
      return importFn();
    }),
  );
}

const Overview = lazyRetry(() => import('./components/modules/Overview').then(m => ({ default: m.Overview })));
const ComponentPhysics = lazyRetry(() => import('./components/modules/ComponentPhysics').then(m => ({ default: m.ComponentPhysics })));
const TimeDomain = lazyRetry(() => import('./components/modules/TimeDomain').then(m => ({ default: m.TimeDomain })));
const LaplaceTheory = lazyRetry(() => import('./components/modules/LaplaceTheory').then(m => ({ default: m.LaplaceTheory })));
const SDomainAnalysis = lazyRetry(() => import('./components/modules/SDomainAnalysis').then(m => ({ default: m.SDomainAnalysis })));
const InteractiveLab = lazyRetry(() => import('./components/modules/InteractiveLab').then(m => ({ default: m.InteractiveLab })));

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-engineering-blue-200 dark:border-engineering-blue-800 border-t-engineering-blue-600 dark:border-t-engineering-blue-400 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><Overview /></Suspense></ErrorBoundary>} />
          <Route path="/component-physics" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><ComponentPhysics /></Suspense></ErrorBoundary>} />
          <Route path="/circuit-analysis" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><TimeDomain /></Suspense></ErrorBoundary>} />
          <Route path="/laplace-theory" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><LaplaceTheory /></Suspense></ErrorBoundary>} />
          <Route path="/s-domain" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><SDomainAnalysis /></Suspense></ErrorBoundary>} />
          <Route path="/interactive-lab" element={<ErrorBoundary><Suspense fallback={<PageLoader />}><InteractiveLab /></Suspense></ErrorBoundary>} />
        </Routes>
      </Layout>
      <Analytics />
    </Router>
  );
}

export default App;
