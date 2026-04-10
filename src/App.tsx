import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { authService } from './services/auth.service';

// ── Layouts & Components ────────────────────────────────────────
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';

// ── Pages ────────────────────────────────────────────────────────
import Login from './pages/Login';
import Signup from './pages/Signup';
import Challenges from './pages/Challenges';
import ChallengeDetail from './pages/ChallengeDetail';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import ManageChallenges from './pages/admin/ManageChallenges';
import ManageUsers from './pages/admin/ManageUsers';
import Analytics from './pages/admin/Analytics';
import AboutAdmin from './pages/AboutAdmin';
import AdminAboutAdmin from './pages/admin/AdminAboutAdmin';
import SubmitChallenge from './pages/SubmitChallenge';

// ── Utils / Components ──────────────────────────────────────────
const ComingSoon = ({ title }: { title: string }) => (
  <div className="min-h-[60vh] flex items-center justify-center font-mono">
    <div className="text-center">
      <p className="text-4xl text-neon-green animate-pulse uppercase tracking-widest">
        {title}
      </p>
      <p className="text-zinc-500 mt-2 text-sm">
        &gt; INITIALIZING_{title.toLowerCase().replace(/\s+/g, '_')}...
      </p>
    </div>
  </div>
);


function App() {
  const { setUser, setLoading, isLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await authService.getMe();
        setUser(response.data.user);
      } catch (error: any) {
        setUser(null);
        // If error status is 401, session might be expired
        if (error.response?.status === 401 && !['/login', '/signup'].includes(window.location.pathname)) {
          toast.error('SESSION_EXPIRED');
        }
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [setUser, setLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black font-mono">
        <div className="text-center">
          <p className="text-2xl text-neon-green animate-pulse tracking-widest">
            AUTHENTICATING...
          </p>
          <div className="mt-4 w-48 h-1 bg-zinc-900 mx-auto overflow-hidden">
             <div className="h-full bg-neon-green animate-progress" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#18181b', // zinc-900
            color: '#fff',
            border: '1px solid rgba(0, 255, 65, 0.2)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px',
          },
        }}
      />
      
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Entrance */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Auth Routes (Public but redirected if logged in) */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

          {/* Protected Area */}
          <Route path="/dashboard" element={<ProtectedRoute><Challenges /></ProtectedRoute>} />
          <Route path="/challenges" element={<ProtectedRoute><Challenges /></ProtectedRoute>} />
          <Route path="/challenges/:id" element={<ProtectedRoute><ChallengeDetail /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/profile/:username" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/submit-challenge" element={<ProtectedRoute><SubmitChallenge /></ProtectedRoute>} />
          <Route path="/about-admin" element={<ProtectedRoute><AboutAdmin /></ProtectedRoute>} />

          {/* Admin Command Center */}
          <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="challenges" element={<ManageChallenges />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="about-admin" element={<AdminAboutAdmin />} />
            <Route path="settings" element={<ComingSoon title="Platform Settings" />} />
          </Route>

          {/* 404 Rescue */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}


export default App;
