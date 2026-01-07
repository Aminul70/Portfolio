import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function ErrorAdmin() {
  const navigate = useNavigate();
  const [glitchText, setGlitchText] = useState('ACCESS DENIED');
  const [glitchHacked, setGlitchHacked] = useState("YOU'VE BEEN HACKED!");
  const [showScanline, setShowScanline] = useState(true);
  const [matrixChars, setMatrixChars] = useState<Array<{x: number, speed: number, chars: string}>>([]);

  // Matrix rain effect
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const columns = Math.floor(window.innerWidth / 20);
    const drops: Array<{x: number, speed: number, chars: string}> = [];

    for (let i = 0; i < columns; i++) {
      drops.push({
        x: i * 20,
        speed: Math.random() * 5 + 2,
        chars: Array(Math.floor(Math.random() * 20) + 10)
          .fill(0)
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join('')
      });
    }
    setMatrixChars(drops);
  }, []);

  // Glitch effect for main text
  useEffect(() => {
    const glitchChars = '!@#$%^&*(){}[]<>?/\\|~`';
    const originalText = 'ACCESS DENIED';
    
    const glitchInterval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.7;
      
      if (shouldGlitch) {
        const glitched = originalText
          .split('')
          .map(char => 
            Math.random() > 0.7 
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          )
          .join('');
        setGlitchText(glitched);
        
        setTimeout(() => setGlitchText(originalText), 50);
      }
    }, 150);

    return () => clearInterval(glitchInterval);
  }, []);

  // Glitch effect for "hacked" text
  useEffect(() => {
    const glitchChars = '!@#$%^&*(){}[]<>?/\\|~`';
    const originalText = "YOU'VE BEEN HACKED!";
    
    const glitchInterval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.8;
      
      if (shouldGlitch) {
        const glitched = originalText
          .split('')
          .map(char => 
            Math.random() > 0.8
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          )
          .join('');
        setGlitchHacked(glitched);
        
        setTimeout(() => setGlitchHacked(originalText), 50);
      }
    }, 200);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden relative font-mono">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-10">
        {matrixChars.map((drop, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500 text-xs whitespace-nowrap"
            style={{ left: drop.x }}
            animate={{
              y: ['0vh', '100vh']
            }}
            transition={{
              duration: 20 / drop.speed,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5
            }}
          >
            {drop.chars}
          </motion.div>
        ))}
      </div>

      {/* Scanline Effect */}
      {showScanline && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'repeating-linear-gradient(0deg, rgba(0, 255, 0, 0.03), rgba(0, 255, 0, 0.03) 1px, transparent 1px, transparent 2px)',
          }}
        />
      )}

      {/* Moving Scanline */}
      <motion.div
        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent z-20 pointer-events-none"
        animate={{
          y: ['0vh', '100vh']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        {/* ACCESS DENIED Box */}
        <motion.div
          animate={{
            opacity: [1, 0.8, 1],
            boxShadow: [
              '0 0 20px rgba(0, 255, 0, 0.5)',
              '0 0 40px rgba(0, 255, 0, 0.8)',
              '0 0 20px rgba(0, 255, 0, 0.5)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="border-2 border-green-500 inline-block mb-8 relative overflow-hidden"
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.5), inset 0 0 20px rgba(0, 255, 0, 0.1)'
          }}
        >
          {/* Random glitch bars */}
          <motion.div
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: Math.random() * 3
            }}
            className="absolute inset-0 w-full h-1 bg-green-500/50"
            style={{ top: Math.random() * 100 + '%' }}
          />
          
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold px-8 md:px-16 py-4 md:py-6 tracking-wider"
            style={{
              color: '#00ff00',
              textShadow: '0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.5)',
              fontFamily: 'Courier New, monospace'
            }}
          >
            {glitchText}
          </motion.h1>
        </motion.div>

        {/* YOU'VE BEEN HACKED! */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-widest mb-12"
          style={{
            color: '#00ff00',
            textShadow: '0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.5)',
            fontFamily: 'Courier New, monospace'
          }}
        >
          {glitchHacked}
        </motion.h2>

        {/* Fake Loading Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-8 max-w-md mx-auto"
        >
          <div className="text-green-500 text-sm mb-2">
            &gt; EXTRACTING DATA...
          </div>
          <div className="w-full h-4 border border-green-500 relative overflow-hidden">
            <motion.div
              className="h-full bg-green-500/50"
              animate={{
                width: ['0%', '100%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>
        </motion.div>

        {/* Terminal Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-left max-w-lg mx-auto mb-8 space-y-1 text-xs md:text-sm"
          style={{ color: '#00ff00' }}
        >
          <div>&gt; SYSTEM_BREACH_DETECTED</div>
          <div>&gt; UNAUTHORIZED_ACCESS_ATTEMPT</div>
          <div>&gt; ERROR_CODE: 0x4D494E</div>
          <div>&gt; LOCATION: /admin</div>
          <div>&gt; STATUS: DENIED</div>
        </motion.div>

        {/* Return Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 30px rgba(0, 255, 0, 0.6)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="border-2 border-green-500 px-8 py-3 text-green-500 font-bold tracking-wider transition-all hover:bg-green-500/10"
          style={{
            boxShadow: '0 0 15px rgba(0, 255, 0, 0.3)',
            fontFamily: 'Courier New, monospace'
          }}
        >
          &gt; RETURN_TO_MAIN
        </motion.button>

        {/* Blinking Cursor */}
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-green-500 ml-2 mt-8"
        />
      </motion.div>

      {/* Random Glitch Overlays */}
      <AnimatePresence>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`glitch-${i}`}
            className="absolute inset-0 pointer-events-none z-30"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.1, 0],
              x: [0, Math.random() * 10 - 5, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: Math.random() * 5 + 2,
              delay: i * 0.3
            }}
            style={{
              background: `linear-gradient(${Math.random() * 360}deg, transparent, rgba(0, 255, 0, 0.1), transparent)`,
              mixBlendMode: 'screen'
            }}
          />
        ))}
      </AnimatePresence>

      {/* VHS Noise */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5 z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          animation: 'noise 0.2s steps(10) infinite'
        }}
      />

      <style>{`
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
      `}</style>
    </div>
  );
}
