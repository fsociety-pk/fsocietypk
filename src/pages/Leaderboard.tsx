import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Crown, Calendar, Clock, Search } from 'lucide-react';
import { leaderboardService, LeaderboardEntry, LeaderboardFilter } from '../services/leaderboardService';
import { socketService } from '../utils/socket';
import { useQuery } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { toast } from 'react-hot-toast';

// ── Components ────────────────────────────────────────────────────

const PodiumItem = ({ entry, rank, color }: { entry: LeaderboardEntry; rank: number; color: string }) => {
  const Icon = rank === 1 ? Crown : (rank === 2 ? Trophy : Medal);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className={clsx(
        "relative flex flex-col items-center p-6 rounded-xl border bg-background-card transition-all duration-300",
        rank === 1 ? "scale-110 z-10 -translate-y-4" : "scale-100",
        color === 'gold' && "border-neon-green shadow-neon-sm",
        color === 'silver' && "border-blue-400/50 shadow-[0_0_15px_rgba(96,165,250,0.3)]",
        color === 'bronze' && "border-orange-400/50 shadow-[0_0_15px_rgba(251,146,60,0.3)]"
      )}
    >
      <div className={clsx(
        "absolute -top-4 w-8 h-8 rounded-full flex items-center justify-center font-bold text-background",
        color === 'gold' && "bg-neon-green",
        color === 'silver' && "bg-blue-400",
        color === 'bronze' && "bg-orange-400"
      )}>
        {rank}
      </div>
      
      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-surface-border mb-4 bg-surface">
        {entry.avatar ? (
          <img src={entry.avatar} alt={entry.username} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-border text-text-secondary text-2xl font-bold">
            {entry.username[0].toUpperCase()}
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold text-text-primary mb-1 truncate max-w-full">{entry.username}</h3>
      <div className="flex items-center gap-2 text-neon-green font-mono font-bold">
        <Icon size={16} />
        <span>{entry.score.toLocaleString()} pts</span>
      </div>
      
      {entry.solveCount !== undefined && (
        <p className="text-xs text-text-muted mt-2">{entry.solveCount} challenges solved</p>
      )}

      {rank === 1 && (
        <div className="absolute inset-0 rounded-xl bg-neon-green/5 animate-pulse -z-1" />
      )}
    </motion.div>
  );
};

// ── Main Page Component ───────────────────────────────────────────

const Leaderboard = () => {
  const [filter, setFilter] = useState<LeaderboardFilter>('all-time');
  const [search, setSearch] = useState('');

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['leaderboard', filter],
    queryFn: () => leaderboardService.getLeaderboard(filter),
    select: (res) => res.data,
  });

  useEffect(() => {
    // Connect socket and listen for updates
    socketService.connect();
    socketService.on('leaderboardUpdate', () => {
      refetch();
      toast.success('Leaderboard updated!', { id: 'lb-update', duration: 2000 });
    });

    return () => {
      socketService.off('leaderboardUpdate');
    };
  }, [refetch]);

  const filteredData = data?.filter(entry => 
    entry.username.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const topThree = filteredData.slice(0, 3);
  const remaining = filteredData.slice(3);

  const filters: { id: LeaderboardFilter; label: string; icon: any }[] = [
    { id: 'all-time', label: 'All Time', icon: Crown },
    { id: 'monthly', label: 'Monthly', icon: Calendar },
    { id: 'weekly', label: 'Weekly', icon: Clock },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black italic tracking-tighter text-glow"
          >
            RANKINGS
          </motion.h1>
          <p className="text-text-secondary font-mono">Real-time competitive standings.</p>
        </div>

        <div className="flex flex-wrap gap-2 p-1 bg-surface rounded-lg border border-surface-border">
          {filters.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm transition-all duration-200",
                  filter === f.id 
                    ? "bg-neon-green text-background font-bold shadow-neon-sm" 
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-border"
                )}
              >
                <Icon size={14} />
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-12 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
        <input
          type="text"
          placeholder="Search operative..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input pl-10 h-11"
        />
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-12 h-12 border-4 border-neon-green/20 border-t-neon-green rounded-full animate-spin" />
          <p className="font-mono text-neon-green animate-pulse">SYNCING RANKINGS...</p>
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          {filteredData.length > 0 && !search && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
              {topThree[1] && <PodiumItem entry={topThree[1]} rank={2} color="silver" />}
              {topThree[0] && <PodiumItem entry={topThree[0]} rank={1} color="gold" />}
              {topThree[2] && <PodiumItem entry={topThree[2]} rank={3} color="bronze" />}
            </div>
          )}

          {/* Ranking Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono">
                <thead>
                  <tr className="bg-surface border-b border-surface-border text-text-muted uppercase text-xs tracking-widest">
                    <th className="px-6 py-4 font-medium">Rank</th>
                    <th className="px-6 py-4 font-medium">Operative</th>
                    <th className="px-6 py-4 font-medium">Flag Count</th>
                    <th className="px-6 py-4 font-medium text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border">
                  <AnimatePresence mode="popLayout">
                    {(search ? filteredData : remaining).map((entry, index) => (
                      <motion.tr
                        key={entry.userId}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-surface/50 transition-colors duration-150 group"
                      >
                        <td className="px-6 py-4">
                          <span className={clsx(
                            "inline-block w-8 h-8 rounded text-center leading-8 font-bold",
                            entry.rank <= 3 ? "text-neon-green" : "text-text-muted"
                          )}>
                            {entry.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full border border-surface-border overflow-hidden bg-surface flex-shrink-0">
                              {entry.avatar ? (
                                <img src={entry.avatar} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] text-text-muted">
                                  ID
                                </div>
                              )}
                            </div>
                            <span className="font-bold text-text-primary group-hover:text-neon-green transition-colors">
                              {entry.username}
                            </span>
                            {entry.country && (
                              <span className="text-xs text-text-muted">[{entry.country}]</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-text-secondary">
                          {entry.solveCount || 0}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-neon-green font-bold">
                            {entry.score.toLocaleString()}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {filteredData.length === 0 && (
              <div className="p-12 text-center text-text-muted italic">
                No operatives found in current sector.
              </div>
            )}
          </div>
        </>
      )}

      {/* Real-time Indicator */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-text-muted uppercase tracking-tighter">
        <div className={clsx("w-1.5 h-1.5 rounded-full", isRefetching ? "bg-neon-green animate-ping" : "bg-status-success")} />
        <span>Live System Status: <span className="text-status-success">Operational</span></span>
      </div>
    </div>
  );
};

export default Leaderboard;
