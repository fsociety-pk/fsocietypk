import api from './api';

export const NOTIFICATION_UNREAD_COUNT_UPDATED = 'notification-unread-count-updated';

export interface INotification {
  _id: string;
  userId: string;
  type: 'challenge_submitted' | 'challenge_approved' | 'challenge_rejected' | 'challenge_solved';
  title: string;
  message: string;
  challengeId?: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: string;
}

interface NotificationUnreadCountUpdatedEventDetail {
  count: number;
}

const emitUnreadCountUpdated = (count: number) => {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent<NotificationUnreadCountUpdatedEventDetail>(NOTIFICATION_UNREAD_COUNT_UPDATED, {
      detail: { count },
    })
  );
};

export const notificationService = {
  getNotifications: async (filter?: { read?: boolean }) => {
    const params = new URLSearchParams();
    if (filter?.read !== undefined) {
      params.append('read', String(filter.read));
    }
    const response = await api.get<{ data: INotification[] }>(`/notifications?${params.toString()}`);
    return response.data.data;
  },

  getUnreadCount: async () => {
    const response = await api.get<{ data: { unreadCount: number } }>('/notifications/unread-count');
    return Number(response.data?.data?.unreadCount ?? 0);
  },

  syncUnreadCount: async () => {
    const count = await notificationService.getUnreadCount();
    emitUnreadCountUpdated(count);
    return count;
  },

  markAsRead: async (notificationId: string) => {
    const response = await api.patch<{ data: INotification }>(`/notifications/${notificationId}/read`);
    await notificationService.syncUnreadCount();
    return response.data.data;
  },

  markAllAsRead: async () => {
    await api.patch('/notifications/read/all');
    await notificationService.syncUnreadCount();
  },

  deleteNotification: async (notificationId: string) => {
    await api.delete(`/notifications/${notificationId}`);
    await notificationService.syncUnreadCount();
  },

  clearAll: async () => {
    await api.delete('/notifications');
    emitUnreadCountUpdated(0);
  },
};
