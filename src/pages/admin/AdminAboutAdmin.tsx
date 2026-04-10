import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminProfileService } from '../../services/adminProfileService';
import { 
  Save, 
  User, 
  Github, 
  Linkedin, 
  Globe, 
  Plus, 
  Trash2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const AdminAboutAdmin: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useQuery({
    queryKey: ['admin-profile'],
    queryFn: () => adminProfileService.getProfile(),
    select: (res) => res.data,
  });

  const [formData, setFormData] = React.useState({
    name: '',
    bio: '',
    profileImage: '',
    links: {
      github: '',
      linkedin: '',
      portfolio: '',
    },
    socialLinks: [] as { platform: string; url: string }[],
  });

  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        profileImage: profile.profileImage || '',
        links: {
          github: profile.links?.github || '',
          linkedin: profile.links?.linkedin || '',
          portfolio: profile.links?.portfolio || '',
        },
        socialLinks: profile.socialLinks || [],
      });
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => adminProfileService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-profile'] });
      toast.success('PROFILE_SYNCHRONIZED_SUCCESSFULLY');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'FAILED_TO_UPDATE_IDENTITY';
      toast.error(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { platform: '', url: '' }],
    });
  };

  const removeSocialLink = (index: number) => {
    const newSocialLinks = [...formData.socialLinks];
    newSocialLinks.splice(index, 1);
    setFormData({ ...formData, socialLinks: newSocialLinks });
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const newSocialLinks = [...formData.socialLinks];
    newSocialLinks[index] = { ...newSocialLinks[index], [field]: value };
    setFormData({ ...formData, socialLinks: newSocialLinks });
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neon-green/20 border-t-neon-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-black italic tracking-tighter text-glow uppercase mb-2">IDENTITY_EDITOR</h1>
        <p className="text-text-muted font-mono text-sm uppercase tracking-tighter">Modify the public administrator persona file.</p>
      </div>

      {!profile?.name && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-neon-green/10 border border-neon-green/30 rounded-xl flex items-center gap-4"
        >
           <div className="p-2 bg-neon-green/20 rounded-lg">
              <AlertCircle size={20} className="text-neon-green" />
           </div>
           <div>
              <p className="text-sm font-bold text-white uppercase tracking-tight">Profile Not Initialized</p>
              <p className="text-[10px] font-mono text-neon-green uppercase tracking-widest">No profile found on the grid. Please fill the form below to establish your identity.</p>
           </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="card p-6 bg-background-card border-surface-border space-y-6">
            <div className="flex items-center gap-3 border-b border-surface-border pb-4 mb-4">
               <User size={18} className="text-neon-green" />
               <h3 className="font-display font-bold text-white uppercase tracking-widest text-sm">Core Data</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1 tracking-widest">Display Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-surface border border-surface-border rounded-lg px-4 py-2 text-white font-mono text-sm focus:border-neon-green/50 outline-none transition-all"
                  placeholder="e.g. Elliot Alderson"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1 tracking-widest">Avatar URL</label>
                <div className="flex gap-4 items-start">
                  <input
                    type="text"
                    value={formData.profileImage}
                    onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                    className="flex-1 bg-surface border border-surface-border rounded-lg px-4 py-2 text-white font-mono text-sm focus:border-neon-green/50 outline-none transition-all"
                    placeholder="https://images.com/avatar.jpg"
                  />
                  {formData.profileImage && (
                    <div className="w-10 h-10 rounded border border-surface-border bg-black overflow-hidden shrink-0">
                      <img src={formData.profileImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1 tracking-widest">Mission Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-surface border border-surface-border rounded-lg px-4 py-2 text-white font-mono text-sm focus:border-neon-green/50 outline-none transition-all h-32 resize-none"
                  placeholder="Tell the operatives about your mission..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Core Social Links */}
          <div className="card p-6 bg-background-card border-surface-border space-y-6">
            <div className="flex items-center gap-3 border-b border-surface-border pb-4 mb-4">
               <Globe size={18} className="text-neon-green" />
               <h3 className="font-display font-bold text-white uppercase tracking-widest text-sm">Primary Uplinks</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <Github size={14} className="text-zinc-500" />
                  <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">GitHub Profile</span>
                </div>
                <input
                  type="url"
                  value={formData.links.github}
                  onChange={(e) => setFormData({ ...formData, links: { ...formData.links, github: e.target.value } })}
                  className="w-full bg-surface border border-surface-border rounded-lg px-4 py-2 text-white font-mono text-sm focus:border-neon-green/50 outline-none"
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <Linkedin size={14} className="text-zinc-500" />
                  <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">LinkedIn Profile</span>
                </div>
                <input
                  type="url"
                  value={formData.links.linkedin}
                  onChange={(e) => setFormData({ ...formData, links: { ...formData.links, linkedin: e.target.value } })}
                  className="w-full bg-surface border border-surface-border rounded-lg px-4 py-2 text-white font-mono text-sm focus:border-neon-green/50 outline-none"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <Globe size={14} className="text-zinc-500" />
                  <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">External Portfolio</span>
                </div>
                <input
                  type="url"
                  value={formData.links.portfolio}
                  onChange={(e) => setFormData({ ...formData, links: { ...formData.links, portfolio: e.target.value } })}
                  className="w-full bg-surface border border-surface-border rounded-lg px-4 py-2 text-white font-mono text-sm focus:border-neon-green/50 outline-none"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Social Links */}
        <div className="card p-6 bg-background-card border-surface-border">
          <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-6">
             <div className="flex items-center gap-3">
                <Plus size={18} className="text-neon-green" />
                <h3 className="font-display font-bold text-white uppercase tracking-widest text-sm">Extended Connections</h3>
             </div>
             <button
               type="button"
               onClick={addSocialLink}
               className="text-[10px] font-mono font-bold bg-neon-green/10 text-neon-green border border-neon-green/20 px-3 py-1 rounded hover:bg-neon-green/20 transition-all uppercase"
             >
               Add Link
             </button>
          </div>

          <div className="space-y-4">
            {formData.socialLinks.map((link, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={index} 
                className="flex gap-4 items-end bg-surface/30 p-4 rounded-xl border border-surface-border/50"
              >
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Platform Name</label>
                  <input
                    type="text"
                    value={link.platform}
                    onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                    className="w-full bg-surface border border-surface-border rounded-lg px-4 py-2 text-white font-mono text-sm focus:border-neon-green/50 outline-none"
                    placeholder="e.g. Twitter, YouTube"
                  />
                </div>
                <div className="flex-[2] space-y-2">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Target URL</label>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                    className="w-full bg-surface border border-surface-border rounded-lg px-4 py-2 text-white font-mono text-sm focus:border-neon-green/50 outline-none"
                    placeholder="https://..."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="p-2.5 text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
            
            {formData.socialLinks.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-surface-border rounded-xl">
                 <p className="text-xs font-mono text-text-muted uppercase tracking-widest">No extended links configured.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-surface-border">
           <div className="flex items-center gap-2 text-text-muted">
              {updateMutation.isPending ? (
                 <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                    <AlertCircle size={16} />
                 </motion.div>
              ) : (
                <CheckCircle2 size={16} className="text-neon-green" />
              )}
              <span className="text-[10px] font-mono uppercase tracking-widest">
                {updateMutation.isPending ? 'Syncing identity...' : 'Identity stable'}
              </span>
           </div>
           
           <button
            type="submit"
            disabled={updateMutation.isPending}
            className={clsx(
              "flex items-center gap-2 px-8 py-3 rounded-lg font-display font-bold text-sm tracking-widest transition-all",
              updateMutation.isPending 
                ? "bg-neon-green/50 text-black cursor-not-allowed" 
                : "bg-neon-green text-black hover:bg-neon-green/90 hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]"
            )}
          >
            <Save size={18} />
            SYNCHRONIZE_PROFILE
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAboutAdmin;
