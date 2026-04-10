import apiClient from './apiClient';
import { ApiResponse, IUser, IChallenge, IAnalyticsData } from '../types';

export interface AdminStats {
  totalUsers: number;
  totalChallenges: number;
  pendingChallenges: number;
  totalSubmissions: number;
  totalPointsPlatform: number;
}

export interface UserManagementList {
  users: IUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
}

// ── Admin API service ─────────────────────────────────────────────
export const adminService = {
  getStats: async (): Promise<ApiResponse<AdminStats>> => {
    const { data } = await apiClient.get('/admin/stats');
    return data;
  },

  getUsers: async (page = 1, limit = 50): Promise<ApiResponse<UserManagementList>> => {
    const { data } = await apiClient.get('/admin/users', { params: { page, limit } });
    return data;
  },

  toggleBan: async (userId: string): Promise<ApiResponse<IUser>> => {
    const { data } = await apiClient.patch(`/admin/users/${userId}/ban`);
    return data;
  },

  getChallenges: async (status?: string): Promise<ApiResponse<IChallenge[]>> => {
    const { data } = await apiClient.get('/admin/challenges', { params: { status } });
    return data;
  },

  updateChallengeStatus: async (
    id: string,
    status: string,
    rejectionReason?: string,
    isActive?: boolean,
  ): Promise<ApiResponse<IChallenge>> => {
    const { data } = await apiClient.patch(`/admin/challenges/${id}/status`, {
      status,
      rejectionReason,
      isActive,
    });
    return data;
  },

  deleteChallenge: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.delete(`/admin/challenges/${id}`);
    return data;
  },

  getAnalytics: async (): Promise<ApiResponse<IAnalyticsData>> => {
    const { data } = await apiClient.get('/admin/analytics');
    return data;
  },
};
