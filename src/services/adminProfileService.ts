import apiClient from './apiClient';
import { ApiResponse, IAdminProfile } from '../types';

export const adminProfileService = {
  /**
   * Fetches the admin profile (authenticated users)
   */
  getProfile: async (): Promise<ApiResponse<IAdminProfile>> => {
    const { data } = await apiClient.get('/admin-profile');
    return data;
  },

  /**
   * Updates the admin profile (admins only)
   */
  updateProfile: async (profileData: Partial<IAdminProfile>): Promise<ApiResponse<IAdminProfile>> => {
    const { data } = await apiClient.put('/admin-profile', profileData);
    return data;
  },
};
