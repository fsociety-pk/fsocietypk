import apiClient from './apiClient';
import { ApiResponse } from '../types';

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  country?: string;
  solveCount?: number;
}

export type LeaderboardFilter = 'all-time' | 'weekly' | 'monthly';

// ── Leaderboard API service ───────────────────────────────────────
export const leaderboardService = {
  getLeaderboard: async (filter: LeaderboardFilter = 'all-time'): Promise<ApiResponse<LeaderboardEntry[]>> => {
    const { data } = await apiClient.get('/leaderboard', { params: { filter } });
    return data;
  },

  getMyRank: async (): Promise<ApiResponse<{ rank: number; score: number }>> => {
    const { data } = await apiClient.get('/leaderboard/me');
    return data;
  },
};
