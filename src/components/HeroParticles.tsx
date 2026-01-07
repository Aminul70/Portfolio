import React, { useEffect, useRef } from 'react';
import { ParticleEngine } from '../utils/particleEngine';
import { Mode } from '../types/portfolio';
import { motion } from 'framer-motion';
interface HeroParticlesProps {
  mode: Mode;
}
export function HeroParticles({
  mode
}: HeroParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ParticleEngine | null>(null);
  useEffect(() => {
    if (canvasRef.current && !engineRef.current) {
      engineRef.current = new ParticleEngine(canvasRef.current);
      engineRef.current.update();
    }
  }, []);
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setMode(mode);
    }
  }, [mode]);
  const handleExplosion = (e: React.MouseEvent) => {
    if (engineRef.current) {
      engineRef.current.createExplosion(e.clientX, e.clientY, 30);
    }
  };
  return <div className="relative h-screen w-full overflow-hidden flex items-center justify-center" onClick={handleExplosion}>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />

      <div className="relative z-10 text-center pointer-events-none select-none">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>
          <h2 className={`font-mono text-lg mb-4 tracking-widest ${mode === 'dev' ? 'text-[#00f5ff]' : 'text-[#ff006e]'}`}>
            {mode === 'dev' ? '< SYSTEM.READY />' : 'REC ●'}
          </h2>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white mix-blend-difference mb-6">
            AMINUL
            <br />
            ISLAM
          </h1>
          <p className="text-xl md:text-2xl font-bold mb-4 text-white/90">
            {mode === 'dev' ? 'Developer × Video Editor | Turning Code into Stories & Moments into Experiences' : 'Blending Code Craft with Cinematic Vision'}
          </p>
          <p className="text-gray-400 max-w-md mx-auto font-mono text-sm md:text-base">
            A creative synthesis of full-stack engineering and visual
            storytelling. Click anywhere to disrupt the system.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center p-2 ${mode === 'dev' ? 'border-[#00f5ff]' : 'border-[#ff006e]'}`}>
          <div className={`w-1 h-2 rounded-full ${mode === 'dev' ? 'bg-[#00f5ff]' : 'bg-[#ff006e]'}`} />
        </div>
      </div>
    </div>;
}