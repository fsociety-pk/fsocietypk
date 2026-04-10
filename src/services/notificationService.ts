import api from './api';

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
    return response.data.data.unreadCount;
  },

  markAsRead: async (notificationId: string) => {
    const response = await api.patch<{ data: INotification }>(`/notifications/${notificationId}/read`);
    return response.data.data;
  },

  markAllAsRead: async () => {
    await api.patch('/notifications/read/all');
  },

  deleteNotification: async (notificationId: string) => {
    await api.delete(`/notifications/${notificationId}`);
  },

  clearAll: async () => {
    await api.delete('/notifications');
  },
};
