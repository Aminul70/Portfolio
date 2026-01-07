import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Power } from 'lucide-react';
const ERROR_MESSAGES = ['Wrong! But A for effort 🎓', "Incorrect password. Hint: It's not this one 😅", "Nope! Want to try 'admin' next? 🤦", "Nice try! But that's not it 🙃", "Getting warmer... just kidding, you're not 🥶"];
export function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const handleProfileClick = () => {
    // Correct login method - clicking the profile
    navigate('/amin/dashboard');
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Wrong login method - show humorous error
    const errorIndex = attemptCount % ERROR_MESSAGES.length;
    setError(ERROR_MESSAGES[errorIndex]);
    setAttemptCount(prev => prev + 1);
    // Clear error after 3 seconds
    setTimeout(() => setError(''), 3000);
  };
  const handlePowerClick = () => {
    navigate('/');
  };
  return <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{
    background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 100%)'
  }}>
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6
    }} className="z-10 flex flex-col items-center">
        {/* Profile Image - The Real Login Button */}
        <motion.button onClick={handleProfileClick} whileHover={{
        scale: 1.05,
        filter: 'brightness(1.1)'
      }} whileTap={{
        scale: 0.95
      }} className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-2xl">
          <div className="w-[140px] h-[140px] rounded-2xl border-2 border-white/5 shadow-2xl shadow-cyan-500/10 overflow-hidden">
            <img src="/27ce93bd-e406-4e40-80bc-300b0680ca3f.png" alt="Admin Profile" className="w-full h-full object-cover" />
          </div>
        </motion.button>

        {/* Admin Text */}
        <h1 className="text-white text-3xl font-bold tracking-tight mt-6">
          Admin
        </h1>

        {/* Login Form (Decoy) */}
        <form onSubmit={handleFormSubmit} className="flex items-center gap-0 mt-8">
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-64 h-12 bg-white/95 text-gray-900 placeholder-gray-500 px-4 rounded-l-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <button type="submit" className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-r-xl flex items-center justify-center text-white active:scale-95 transition-all">
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </form>

        {/* Error Message */}
        <AnimatePresence>
          {error && <motion.div initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -10
        }} className="text-red-500 font-medium mt-3 text-center">
              {error}
            </motion.div>}
        </AnimatePresence>
      </motion.div>

      {/* Power Button - Bottom Right */}
      <button onClick={handlePowerClick} className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 shadow-lg hover:shadow-xl flex items-center justify-center text-white transition-all active:scale-95 group">
        <Power size={24} strokeWidth={2.5} />
        <div className="absolute -top-12 right-0 bg-black/80 text-white text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Exit to Portfolio
        </div>
      </button>
    </div>;
}