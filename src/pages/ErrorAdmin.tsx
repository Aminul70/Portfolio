import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, Search, RefreshCw } from 'lucide-react';

export function ErrorAdmin() {
  const navigate = useNavigate();
  const [glitchText, setGlitchText] = useState('404');
  const [attemptCount, setAttemptCount] = useState(0);

  // Glitch effect for the 404 text
  useEffect(() => {
    const glitchChars = ['4', '0', '4', '@', '#', '?', '!'];
    const interval = setInterval(() => {
      const randomGlitch = Array(3)
        .fill(0)
        .map(() => glitchChars[Math.floor(Math.random() * glitchChars.length)])
        .join('');
      setGlitchText(randomGlitch);
      
      setTimeout(() => setGlitchText('404'), 100);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const funnyMessages = [
    "Oops! You typed '/admin' but the secret door is at '/amin' 🤫",
    "404: Admin not found. Did you mean '/amin'? 🤔",
    "ERROR: This admin doesn't exist. Try '/amin' instead! 😅",
    "Plot twist: The real admin is at '/amin' 🎭",
    "Wrong door! The admin panel is hiding at '/amin' 🚪"
  ];

  const [currentMessage, setCurrentMessage] = useState(funnyMessages[0]);

  const handleRetry = () => {
    setAttemptCount((prev) => prev + 1);
    setCurrentMessage(funnyMessages[attemptCount % funnyMessages.length]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl w-full"
      >
        {/* Error Container */}
        <div className="bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 md:p-12 shadow-2xl">
          {/* Warning Icon */}
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <AlertTriangle size={80} className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"
              />
            </div>
          </motion.div>

          {/* Glitching 404 */}
          <motion.h1
            className="text-8xl md:text-9xl font-black text-center mb-4 font-mono"
            style={{
              textShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
              color: '#ef4444'
            }}
          >
            {glitchText}
          </motion.h1>

          {/* Error Message */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-white text-center mb-4"
          >
            PAGE NOT FOUND
          </motion.h2>

          {/* Funny Message */}
          <motion.div
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6"
          >
            <p className="text-yellow-200 text-center font-mono text-sm md:text-base">
              {currentMessage}
            </p>
          </motion.div>

          {/* Error Details */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 mb-6 font-mono text-xs md:text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Error Code:</span>
              <span className="text-red-400">404_ADMIN_NOT_FOUND</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Status:</span>
              <span className="text-red-400">CRITICAL</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Requested URL:</span>
              <span className="text-blue-400">/admin</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Hint:</span>
              <span className="text-green-400">Try /amin instead 😉</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transition-all"
            >
              <Home size={20} />
              Go Back Home
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRetry}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-lg transition-all"
            >
              <RefreshCw size={20} />
              Show Another Hint
            </motion.button>
          </div>

          {/* Easter Egg Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-500 text-xs font-mono">
              Psst... the correct route is{' '}
              <motion.span
                className="text-cyan-400 cursor-pointer hover:text-cyan-300"
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate('/amin')}
              >
                /amin
              </motion.span>
            </p>
          </motion.div>
        </div>

        {/* Decorative corner brackets */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-red-500/50 -translate-x-4 -translate-y-4" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-red-500/50 translate-x-4 -translate-y-4" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-red-500/50 -translate-x-4 translate-y-4" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-red-500/50 translate-x-4 translate-y-4" />
      </motion.div>

      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
}
