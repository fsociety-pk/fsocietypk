import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Home, Shield, Trophy, PlusCircle } from 'lucide-react';

const sideLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Missions', path: '/challenges', icon: Shield },
  { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
  { name: 'Submit', path: '/submit-challenge', icon: PlusCircle },
  { name: 'Cyber Cinema', path: '/cyber-cinema', icon: Film, featured: true },
];

const SideNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:block md:w-64 md:shrink-0">
      <div className="sticky top-24 ml-4 rounded-2xl border border-neon-green/20 bg-zinc-950/80 p-4 backdrop-blur-xl">
        <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-neon-green/80">Navigation</p>
        <nav className="space-y-2">
          {sideLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-all ${
                  isActive
                    ? 'border-neon-green/60 bg-neon-green/10 text-neon-green'
                    : link.featured
                    ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200 hover:border-cyan-300'
                    : 'border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-neon-green/40 hover:text-neon-green'
                }`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default SideNavigation;
