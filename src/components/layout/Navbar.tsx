import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Trophy, User, LogOut, Menu, X, Info } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/auth.service';
import { toast } from 'react-hot-toast';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      toast.success('DECONNECTED_SUCCESSFULLY');
      navigate('/login');
    } catch (error: any) {
      toast.error('LOGOUT_FAILURE');
    }
  };

  const navLinks = isAuthenticated
    ? [
        { name: 'DASHBOARD', path: '/dashboard', icon: Terminal },
        { name: 'MISSIONS', path: '/challenges', icon: Shield },
        { name: 'HALL_OF_FAME', path: '/leaderboard', icon: Trophy },
        { name: 'SUBMIT_MISSION', path: '/submit-challenge', icon: Terminal },
        { name: 'ABOUT_ADMIN', path: '/about-admin', icon: Info },
      ]
    : [
        { name: 'LOGIN', path: '/login', icon: User },
        { name: 'JOIN_US', path: '/signup', icon: Terminal },
      ];

  if (user?.role === 'admin' && isAuthenticated) {
    navLinks.push({ name: 'ADMIN_CONTROL', path: '/admin', icon: Shield });
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black border-b border-neon-green/20 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-neon-green/10 rounded border border-neon-green/30 flex items-center justify-center group-hover:bg-neon-green/20 transition-all">
              <Terminal className="text-neon-green w-6 h-6" />
            </div>
            <span className="text-2xl font-display font-bold text-white tracking-widest hidden sm:block">
              FSOCIETY<span className="text-neon-green">PK</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-mono tracking-widest transition-all hover:text-neon-green ${
                  isActive(link.path) ? 'text-neon-green border-b border-neon-green' : 'text-zinc-500'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}

            {isAuthenticated && (
              <div className="flex items-center gap-4 pl-6 border-l border-zinc-800">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 group"
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-neon-green transition-all overflow-hidden bg-gradient-to-br from-neon-green/10 to-transparent">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="text-zinc-500 group-hover:text-neon-green w-4 h-4" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 tracking-tighter">OPERATOR</span>
                    <span className="text-xs font-bold text-white group-hover:text-neon-green transition-colors">{user?.username.toUpperCase()}</span>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 text-zinc-500 hover:text-red-500 transition-colors bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-red-500/30"
                  title="LOGOUT"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-500 hover:text-neon-green"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-zinc-900/90 border-b border-zinc-800 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl border ${
                    isActive(link.path) ? 'bg-neon-green/10 border-neon-green/30 text-neon-green' : 'border-zinc-800 text-zinc-400'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-mono tracking-widest text-sm">{link.name}</span>
                </Link>
              ))}
              
              {isAuthenticated && (
                <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
                   <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-zinc-700 bg-black flex items-center justify-center">
                         <User className="w-5 h-5 text-zinc-500" />
                      </div>
                      <span className="font-bold">{user?.username}</span>
                   </Link>
                   <button
                    onClick={handleLogout}
                    className="p-3 text-red-500 bg-red-500/10 rounded-xl border border-red-500/20"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
