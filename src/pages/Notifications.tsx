import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Check,
  Trash2,
  CheckCheck,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Trophy,
  Loader2,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { notificationService, INotification } from '../services/notificationService';

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      let data;
      if (filter === 'unread') {
        data = await notificationService.getNotifications({ read: false });
      } else if (filter === 'read') {
        data = await notificationService.getNotifications({ read: true });
      } else {
        data = await notificationService.getNotifications();
      }
      setNotifications(data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n => n._id === notificationId ? { ...n, read: true } : n)
      );
      toast.success('Marked as read');
    } catch (error: any) {
      toast.error('Failed to mark as read');
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await notificationService.deleteNotification(notificationId);
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      toast.success('Notification deleted');
    } catch (error: any) {
      toast.error('Failed to delete notification');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast.success('All notifications marked as read');
    } catch (error: any) {
      toast.error('Failed to mark all as read');
    }
  };

  const handleClearAll = async () => {
    try {
      await notificationService.clearAll();
      setNotifications([]);
      toast.success('All notifications cleared');
    } catch (error: any) {
      toast.error('Failed to clear notifications');
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'challenge_approved':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'challenge_rejected':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'challenge_submitted':
        return <AlertCircle className="w-5 h-5 text-blue-400" />;
      case 'challenge_solved':
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      default:
        return <Bell className="w-5 h-5 text-neon-green" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'challenge_approved':
        return 'bg-emerald-500/10 border-emerald-500/30';
      case 'challenge_rejected':
        return 'bg-red-500/10 border-red-500/30';
      case 'challenge_submitted':
        return 'bg-blue-500/10 border-blue-500/30';
      case 'challenge_solved':
        return 'bg-yellow-500/10 border-yellow-500/30';
      default:
        return 'bg-zinc-900/40 border-zinc-800/50';
    }
  };

  return (
    <div className="min-h-screen bg-black font-mono text-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
              <Bell className="w-5 h-5 text-neon-green" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neon-green tracking-widest uppercase">
                Notifications
              </h1>
              <p className="text-zinc-500 text-xs mt-1">&gt; Receive updates about your challenges</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {(['all', 'unread', 'read'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === f
                    ? 'bg-neon-green text-black'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-neon-green/50'
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Actions */}
          {notifications.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 border border-blue-500/50 rounded text-xs font-bold text-blue-400 hover:bg-blue-600/30 transition-all"
              >
                <CheckCheck className="w-4 h-4" />
                MARK ALL READ
              </button>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-3 py-2 bg-red-600/20 border border-red-500/50 rounded text-xs font-bold text-red-400 hover:bg-red-600/30 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                CLEAR ALL
              </button>
            </div>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-neon-green animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Bell className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg">No notifications yet</p>
            <p className="text-zinc-600 text-sm mt-2">
              {filter === 'unread' && 'All caught up!'}
              {filter === 'read' && 'No read notifications'}
              {filter === 'all' && 'Stay tuned for updates about your challenges'}
            </p>
          </motion.div>
        )}

        {/* Notifications List */}
        <AnimatePresence>
          <div className="space-y-3">
            {notifications.map((notif, index) => (
              <motion.div
                key={notif._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`border rounded-lg p-4 transition-all ${
                  notif.read
                    ? 'bg-zinc-900/30 border-zinc-800/30'
                    : `${getNotificationBgColor(notif.type)} active:scale-95`
                } ${!notif.read ? 'border-solid' : 'border-dashed'}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notif.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className={`font-bold text-sm uppercase tracking-widest ${
                          notif.read ? 'text-zinc-400' : 'text-white'
                        }`}>
                          {notif.title}
                        </h3>
                        <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>

                      {!notif.read && (
                        <div className="w-2 h-2 bg-neon-green rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/30">
                      <span className="text-[10px] text-zinc-600">
                        {new Date(notif.createdAt).toLocaleDateString()} at{' '}
                        {new Date(notif.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>

                      <div className="flex items-center gap-2">
                        {!notif.read && (
                          <button
                            onClick={() => handleMarkAsRead(notif._id)}
                            className="p-1.5 text-zinc-500 hover:text-neon-green hover:bg-neon-green/10 rounded transition-all"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notif._id)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notifications;
