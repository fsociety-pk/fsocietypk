import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Flag, 
  Settings, 
  ChevronLeft, 
  Terminal,
  ShieldAlert,
  Menu,
  X,
  BarChart4,
  Info
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { clsx } from 'clsx';

const AdminLayout: React.FC = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  // Final check: only admins should ever see this layout
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart4 },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Challenges', path: '/admin/challenges', icon: Flag },
    { name: 'About Admin', path: '/admin/about-admin', icon: Info },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className={clsx(
        "bg-background-card border-r border-surface-border transition-all duration-300 flex flex-col z-50",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 flex items-center justify-between border-b border-surface-border h-16">
          <Link to="/" className={clsx("flex items-center gap-2", !isSidebarOpen && "justify-center w-full")}>
            <Terminal className="text-neon-green w-6 h-6" />
            {isSidebarOpen && <span className="font-display font-bold text-white tracking-widest">FSOCIETY</span>}
          </Link>
          {isSidebarOpen && (
            <button onClick={() => setIsSidebarOpen(false)} className="text-text-muted hover:text-white lg:hidden">
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all group",
                  isActive(item.path) 
                    ? "bg-neon-green/10 text-neon-green border border-neon-green/20" 
                    : "text-text-muted hover:bg-surface-border hover:text-text-primary"
                )}
              >
                <Icon size={18} className={clsx(isActive(item.path) ? "text-neon-green" : "text-text-muted group-hover:text-text-primary")} />
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-surface-border">
          <Link
            to="/"
            className={clsx(
              "flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm text-text-muted hover:text-white transition-all",
              !isSidebarOpen && "justify-center"
            )}
          >
            <ChevronLeft size={18} />
            {isSidebarOpen && <span>Exit Portal</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-surface-border bg-background-card/50 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-text-muted hover:text-white p-2 bg-surface rounded-md border border-surface-border lg:hidden"
              >
                <Menu size={20} />
              </button>
              <h2 className="font-display font-bold text-white tracking-tighter text-xl">
                 PORTAL<span className="text-neon-green">_CONTROL</span>
              </h2>
           </div>

           <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-zinc-500 font-mono">SYS_ADMIN</span>
                <span className="text-xs font-bold text-neon-green">{user?.username.toUpperCase()}</span>
              </div>
              <div className="w-8 h-8 rounded-full border border-neon-green/30 bg-neon-green/10 flex items-center justify-center">
                 <ShieldAlert className="text-neon-green w-4 h-4" />
              </div>
           </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
