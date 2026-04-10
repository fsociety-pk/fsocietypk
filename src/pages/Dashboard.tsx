import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Book,
  ArrowRight,
  Code,
  Repeat,
  Award,
  Users,
  Plus,
  Mail,
  Github,
  MessageCircle,
  Rocket,
  Shield,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Dashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen bg-black font-mono text-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-16 rounded-2xl border border-neon-green/30 overflow-hidden bg-gradient-to-br from-zinc-900/80 to-black p-8 md:p-12"
        >
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <Code className="w-48 h-48" />
          </div>

          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-black italic text-glow mb-2 tracking-tighter">
              WELCOME BACK
            </h1>
            <h2 className="text-2xl md:text-3xl text-neon-green tracking-widest font-bold mb-4">
              {user?.username?.toUpperCase()}
            </h2>
            <p className="text-zinc-400 max-w-2xl leading-relaxed">
              You're now part of the underground. Explore challenges designed to test and improve your cybersecurity skills.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* About Section */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <Book className="text-neon-green w-6 h-6" />
              <h3 className="text-2xl font-bold tracking-widest uppercase">About FsocietyPK</h3>
            </div>

            <div className="bg-gradient-to-r from-neon-green/10 to-transparent border border-neon-green/30 rounded-xl p-6 md:p-8 mb-6">
              <h4 className="text-lg font-bold text-neon-green mb-3">The Best Platform for Beginners to Learn CVE & Practice</h4>
              <p className="text-zinc-300 leading-relaxed mb-4">
                FsocietyPK is designed as the ultimate learning platform for beginners and professionals alike. Whether you're just starting your cybersecurity journey or are a seasoned security researcher, our challenges help you master real-world Vulnerability Assessment & Penetration Testing skills.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                Our platform provides hands-on experience with Common Vulnerabilities and Exposures (CVE), security tools, attack methodologies, and defensive techniques. Each challenge is carefully crafted to teach practical skills that matter in the field.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mission Card */}
              <motion.div
                variants={itemVariants}
                className="bg-zinc-900/60 border border-neon-green/20 rounded-xl p-6 hover:border-neon-green/50 transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.1)]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neon-green/10 rounded-lg mt-1">
                    <Rocket className="w-6 h-6 text-neon-green" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2 text-neon-green">For Beginners</h4>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      Start with easy challenges to build confidence. Learn fundamental concepts in web security, cryptography, and system administration. Get comprehensive writeups and hints to guide your learning journey.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Professional Card */}
              <motion.div
                variants={itemVariants}
                className="bg-zinc-900/60 border border-neon-green/20 rounded-xl p-6 hover:border-neon-green/50 transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.1)]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neon-green/10 rounded-lg mt-1">
                    <Shield className="w-6 h-6 text-neon-green" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2 text-neon-green">For Professionals</h4>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      Challenge yourself with insane-level CTF problems. Enhance your expertise with real-world attack scenarios, advanced exploitation techniques, and defensive strategies used by industry professionals.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Feature 1 */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-lg hover:border-neon-green/30 transition-all"
              >
                <Repeat className="w-5 h-5 text-neon-green flex-shrink-0" />
                <span className="text-sm">
                  <span className="font-bold text-neon-green">Unlimited Practice:</span> Retry challenges unlimited times
                </span>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-lg hover:border-neon-green/30 transition-all"
              >
                <Award className="w-5 h-5 text-neon-green flex-shrink-0" />
                <span className="text-sm">
                  <span className="font-bold text-neon-green">Gamified Learning:</span> Earn points and climb the leaderboard
                </span>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-lg hover:border-neon-green/30 transition-all"
              >
                <Users className="w-5 h-5 text-neon-green flex-shrink-0" />
                <span className="text-sm">
                  <span className="font-bold text-neon-green">Community Challenges:</span> Learn from real submissions
                </span>
              </motion.div>
            </div>
          </motion.section>

          {/* Social Media & Contact Section */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle className="text-neon-green w-6 h-6" />
              <h3 className="text-2xl font-bold tracking-widest uppercase">Connect With Us</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Email */}
              <a
                href="mailto:pkfsociety@gmail.com"
                className="group bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-600/40 rounded-xl p-6 hover:border-blue-600/80 transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.2)]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-blue-400 mb-1">Email</h5>
                    <p className="text-sm text-zinc-400 break-all">pkfsociety@gmail.com</p>
                    <p className="text-[10px] text-zinc-500 mt-2">Questions? Reach out to us anytime</p>
                  </div>
                </div>
              </a>

              {/* Discord */}
              <a
                href="https://discord.gg/YYpFYBzH"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-purple-900/30 to-purple-900/10 border border-purple-600/40 rounded-xl p-6 hover:border-purple-600/80 transition-all hover:shadow-[0_0_25px_rgba(147,51,234,0.2)]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-purple-400 mb-1">Discord Community</h5>
                    <p className="text-sm text-zinc-400">Join our Discord server</p>
                    <p className="text-[10px] text-zinc-500 mt-2">Chat, share writeups & connect</p>
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/orgs/fsociety-pk"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-orange-900/30 to-orange-900/10 border border-orange-600/40 rounded-xl p-6 hover:border-orange-600/80 transition-all hover:shadow-[0_0_25px_rgba(234,88,12,0.2)]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-500/20 rounded-lg group-hover:scale-110 transition-transform">
                    <Github className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-orange-400 mb-1">GitHub Organization</h5>
                    <p className="text-sm text-zinc-400">View our source & projects</p>
                    <p className="text-[10px] text-zinc-500 mt-2">Contribute to the community</p>
                  </div>
                </div>
              </a>
            </div>
          </motion.section>

          {/* Call to Action Section */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Explore Challenges */}
              <Link
                to="/challenges"
                className="group relative bg-gradient-to-br from-neon-green/20 to-neon-green/5 border border-neon-green/40 rounded-xl p-8 hover:border-neon-green/80 transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.2)]"
              >
                <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Code className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <Code className="w-6 h-6 text-neon-green" />
                    <h4 className="text-xl font-bold text-neon-green">Explore Challenges</h4>
                  </div>
                  <p className="text-zinc-400 mb-4 text-sm">
                    Browse through our collection of challenges across different categories and difficulty levels.
                  </p>
                  <div className="flex items-center text-neon-green font-bold text-sm group-hover:translate-x-2 transition-transform">
                    Start Solving <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>

              {/* Contribute Challenge */}
              <Link
                to="/submit-challenge"
                className="group relative bg-gradient-to-br from-purple-600/20 to-purple-600/5 border border-purple-600/40 rounded-xl p-8 hover:border-purple-600/80 transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.2)]"
              >
                <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Users className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <Plus className="w-6 h-6 text-purple-400" />
                    <h4 className="text-xl font-bold text-purple-400">Contribute a Challenge</h4>
                  </div>
                  <p className="text-zinc-400 mb-4 text-sm">
                    Share your own challenges! Submit challenges for review and help others learn.
                  </p>
                  <div className="flex items-center text-purple-400 font-bold text-sm group-hover:translate-x-2 transition-transform">
                    Create Challenge <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            </div>
          </motion.section>

          {/* Guidelines Section */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold tracking-widest uppercase mb-6">
              Challenge Submission Guidelines
            </h3>

            <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-bold text-neon-green mb-2 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-neon-green rounded-full" />
                    Flag Format
                  </h5>
                  <p className="text-sm text-zinc-400">
                    Flags must follow the format: <code className="bg-black/50 px-2 py-1 rounded text-neon-green">fsociety{'{'}'...{'}'}</code>
                  </p>
                </div>
                <div>
                  <h5 className="font-bold text-neon-green mb-2 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-neon-green rounded-full" />
                    Review Process
                  </h5>
                  <p className="text-sm text-zinc-400">
                    All submitted challenges go through admin review before being published to ensure quality and security.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-bold text-neon-green mb-2 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-neon-green rounded-full" />
                    Categories
                  </h5>
                  <p className="text-sm text-zinc-400">
                    Web, Crypto, Forensics, Reverse Engineering, PWN, OSINT, and more!
                  </p>
                </div>
                <div>
                  <h5 className="font-bold text-neon-green mb-2 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-neon-green rounded-full" />
                    Difficulty Levels
                  </h5>
                  <p className="text-sm text-zinc-400">
                    Easy, Medium, Hard, and Insane challenges available
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/60 border border-neon-green/20 rounded-xl p-6 text-center">
              <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">Learning Platform</p>
              <h4 className="text-3xl font-black text-neon-green">100%</h4>
              <p className="text-zinc-400 text-sm mt-2">Focused on Educational Growth</p>
            </div>

            <div className="bg-zinc-900/60 border border-neon-green/20 rounded-xl p-6 text-center">
              <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">Community Driven</p>
              <h4 className="text-3xl font-black text-neon-green">UNLIMITED</h4>
              <p className="text-zinc-400 text-sm mt-2">Unlimited Challenge Attempts</p>
            </div>

            <div className="bg-zinc-900/60 border border-neon-green/20 rounded-xl p-6 text-center">
              <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">Your Voice</p>
              <h4 className="text-3xl font-black text-neon-green">SUBMIT</h4>
              <p className="text-zinc-400 text-sm mt-2">Submit & Share Your Challenges</p>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
