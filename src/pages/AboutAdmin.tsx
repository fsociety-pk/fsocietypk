import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminProfileService } from '../services/adminProfileService';
import { 
  Github, 
  Linkedin, 
  Globe, 
  Terminal, 
  ShieldCheck,
  User as UserIcon,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

const AboutAdmin: React.FC = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['admin-profile'],
    queryFn: () => adminProfileService.getProfile(),
    select: (res) => res.data,
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-neon-green/20 border-t-neon-green rounded-full animate-spin" />
        <p className="font-mono text-neon-green animate-pulse uppercase tracking-widest text-xs">DECRYPTING_IDENTITY_PROTOCOL...</p>
      </div>
    );
  }

  const { user } = useAuthStore();
  const hasData = profile && Object.keys(profile).length > 0 && (profile as any).name;

  if (!hasData) {
    const isAdmin = user?.role === 'admin';
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md p-10 border border-surface-border rounded-2xl bg-background-card/50 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
           <ShieldCheck size={64} className="mx-auto text-text-muted opacity-20 group-hover:text-neon-green group-hover:opacity-40 transition-all duration-500" />
           
           <div className="space-y-2">
              <p className="text-text-muted font-mono text-sm uppercase tracking-widest text-glow-green">
                 [ {isAdmin ? 'IDENTITY_SYNC_REQUIRED' : 'NO_ADMIN_INTEL_FOUND'} ]
              </p>
              <p className="text-[10px] text-zinc-500 font-mono uppercase leading-relaxed">
                 {isAdmin 
                   ? 'The grid requires your identity profile to be synchronized. Please initialize your persona to continue.'
                   : 'The administrator profile has not been initialized. Check back after the next system synchronization.'}
              </p>
           </div>

           {isAdmin && (
             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a 
                  href="/admin/about-admin"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green text-black font-display font-bold text-xs tracking-widest rounded-lg hover:shadow-[0_0_15px_rgba(0,255,65,0.4)] transition-all"
                >
                   <Terminal size={16} />
                   INITIALIZE_IDENTITY
                </a>
             </motion.div>
           )}
        </div>
      </div>
    );
  }

  const socialLinks = [
    { type: 'github', icon: Github, url: profile.links?.github, label: 'GitHub' },
    { type: 'linkedin', icon: Linkedin, url: profile.links?.linkedin, label: 'LinkedIn' },
    { type: 'portfolio', icon: Globe, url: profile.links?.portfolio, label: 'Portfolio' },
  ].filter(link => link.url);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

        <div className="bg-background-card border border-surface-border rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
          {/* Header/Banner */}
          <div className="h-32 bg-gradient-to-r from-zinc-900 via-background-card to-zinc-900 border-b border-surface-border relative flex items-center px-12">
             <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00FF41 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />
             <div className="flex items-center gap-3">
                <Terminal className="text-neon-green w-5 h-5" />
                <span className="text-[10px] font-mono text-neon-green uppercase tracking-[0.3em]">SECURE_PERSONA_FILE</span>
             </div>
          </div>

          <div className="px-8 md:px-12 pb-12 -mt-16 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Image */}
              <div className="shrink-0 group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-background bg-zinc-900 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  {profile.profileImage ? (
                    <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-background border border-surface-border">
                       <UserIcon size={48} className="text-text-muted" />
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-center md:justify-start gap-4">
                   {socialLinks.map((link) => (
                     <a 
                       key={link.type} 
                       href={link.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="p-2 bg-surface border border-surface-border rounded-lg text-text-muted hover:text-neon-green hover:border-neon-green/30 transition-all hover:-translate-y-1"
                       title={link.label}
                     >
                       <link.icon size={18} />
                     </a>
                   ))}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-6 md:pt-16">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase text-glow">
                    {profile.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <ShieldCheck size={14} className="text-neon-green" />
                    <span className="text-xs font-mono text-neon-green font-bold uppercase tracking-widest">AUTHORIZED_ADMINISTRATOR</span>
                  </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center gap-3 text-text-muted">
                      <MessageSquare size={16} className="text-neon-green" />
                      <span className="text-xs font-bold uppercase tracking-widest text-white/50">MISSION_BIO</span>
                   </div>
                   <p className="text-zinc-400 font-mono text-sm leading-relaxed whitespace-pre-wrap selection:bg-neon-green selection:text-black">
                     {profile.bio}
                   </p>
                </div>

                <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {profile.socialLinks?.map((social, idx) => (
                     <a 
                       key={idx}
                       href={social.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center justify-between p-4 rounded-xl bg-surface/50 border border-surface-border hover:border-neon-green/30 hover:bg-surface transition-all group"
                     >
                       <span className="text-xs font-mono font-bold text-text-muted uppercase group-hover:text-text-primary">{social.platform}</span>
                       <ExternalLink size={14} className="text-text-muted group-hover:text-neon-green" />
                     </a>
                   ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Decoration */}
          <div className="p-4 bg-zinc-950 border-t border-surface-border flex justify-center">
             <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                [ GRID_INTEGRITY_VERIFIED_BY_FSOCIET_PORTAL ]
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutAdmin;
