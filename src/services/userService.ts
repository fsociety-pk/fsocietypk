import apiClient from './apiClient';
import { ApiResponse, IUser, ISubmission } from '../types';

export interface UserProfile extends IUser {
  rank: number;
  grade?: string;
  solveHistory: ISubmission[];
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ── User API service ──────────────────────────────────────────────
export const userService = {
  getProfile: async (): Promise<ApiResponse<UserProfile>> => {
    const { data } = await apiClient.get('/users/me/profile');
    return data;
  },

  changePassword: async (payload: ChangePasswordPayload): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.post('/users/me/change-password', payload);
    return data;
  },
};
