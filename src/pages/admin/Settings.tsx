import React from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, Trash2, RefreshCw, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { notificationService } from '../../services/notificationService';

const AdminSettings: React.FC = () => {
  const [isWorking, setIsWorking] = React.useState(false);

  const runAction = async (action: () => Promise<void>, successMessage: string, errorMessage: string) => {
    try {
      setIsWorking(true);
      await action();
      toast.success(successMessage);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || errorMessage);
    } finally {
      setIsWorking(false);
    }
  };

  const handleMarkAllRead = () =>
    runAction(
      () => notificationService.markAllAsRead(),
      'All notifications marked as read',
      'Failed to mark notifications as read'
    );

  const handleClearAll = () => {
    const confirmed = window.confirm('Clear all notifications from your account?');
    if (!confirmed) return;

    runAction(() => notificationService.clearAll(), 'All notifications cleared', 'Failed to clear notifications');
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black italic tracking-tighter text-glow uppercase">PLATFORM_SETTINGS</h1>
        <p className="text-text-muted font-mono text-sm uppercase">Administrative controls and notification maintenance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
              <Bell className="w-5 h-5 text-neon-green" />
            </div>
            <div>
              <h2 className="font-display font-bold text-white uppercase tracking-widest">Notification Controls</h2>
              <p className="text-[11px] text-zinc-500 font-mono uppercase">Manage your admin notification center</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleMarkAllRead}
              disabled={isWorking}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all text-xs font-black tracking-widest disabled:opacity-60"
            >
              <CheckCheck className="w-4 h-4" />
              MARK ALL AS READ
            </button>

            <button
              onClick={handleClearAll}
              disabled={isWorking}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-status-error/30 bg-status-error/10 text-status-error hover:bg-status-error/20 transition-all text-xs font-black tracking-widest disabled:opacity-60"
            >
              <Trash2 className="w-4 h-4" />
              CLEAR ALL NOTIFICATIONS
            </button>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="card p-6 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-neon-green" />
            </div>
            <div>
              <h2 className="font-display font-bold text-white uppercase tracking-widest">Admin Session</h2>
              <p className="text-[11px] text-zinc-500 font-mono uppercase">Quick utility for panel refresh and sync</p>
            </div>
          </div>

          <button
            onClick={handleReload}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-neon-green/30 bg-neon-green/10 text-neon-green hover:bg-neon-green/20 transition-all text-xs font-black tracking-widest"
          >
            <RefreshCw className="w-4 h-4" />
            RELOAD ADMIN PANEL
          </button>

          <p className="text-xs text-zinc-500 font-mono leading-relaxed">
            Use this when you need to force-refresh data after moderation actions or infrastructure changes.
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default AdminSettings;
