import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Zap,
  Clock,
  FunctionSquare,
  GitBranch,
  FlaskConical,
  Moon,
  Sun,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useThemeStore } from '../../store/progressStore';

const navigationLinks = [
  { to: '/', icon: Home, label: 'Overview' },
  { to: '/component-physics', icon: Zap, label: 'Component Physics' },
  { to: '/circuit-analysis', icon: Clock, label: 'Circuit Analysis' },
  { to: '/laplace-theory', icon: FunctionSquare, label: 'Laplace Theory' },
  { to: '/s-domain', icon: GitBranch, label: 'S-Domain Theory' },
  { to: '/interactive-lab', icon: FlaskConical, label: 'Interactive Lab' },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const { theme, toggleTheme } = useThemeStore();
  const currentIndex = navigationLinks.findIndex(link =>
    link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to)
  );

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-br from-engineering-blue-600 to-engineering-blue-800">
        <h1 className="text-xl font-bold text-white">EM&AC Lab</h1>
        <p className="text-sm text-engineering-blue-200 mt-1">Module 2: Circuit Analysis</p>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto" aria-label="Learning path">
        <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 px-2">Learning Path</p>
        <ul className="space-y-1">
          {navigationLinks.map((link, index) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm',
                      isActive
                        ? 'bg-engineering-blue-50 dark:bg-engineering-blue-900/30 text-engineering-blue-700 dark:text-engineering-blue-300 font-semibold border-l-3 border-engineering-blue-600'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                    )
                  }
                >
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors',
                    index === currentIndex
                      ? 'bg-engineering-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                  )}>
                    <link.icon className="w-3.5 h-3.5" />
                  </div>
                  <span>{link.label}</span>
                </NavLink>
              </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 mb-3 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>

        <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium tracking-wide">
          CA/EM&CA Course
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center mt-0.5">
          &copy; 2026 LUT University
        </p>
      </div>
    </aside>
  );
}
