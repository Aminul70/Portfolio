import React from 'react';
import { Mode } from '../types/portfolio';
import { motion } from 'framer-motion';
import { Code, Clapperboard } from 'lucide-react';
interface ModeToggleProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}
export function ModeToggle({
  mode,
  setMode
}: ModeToggleProps) {
  return <div className="fixed top-8 right-8 z-40 flex items-center gap-4 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10">
      <button onClick={() => setMode('dev')} className={`relative p-3 rounded-full transition-colors duration-300 ${mode === 'dev' ? 'text-[#0a0a0f]' : 'text-gray-400 hover:text-white'}`}>
        {mode === 'dev' && <motion.div layoutId="active-mode" className="absolute inset-0 bg-[#00f5ff] rounded-full" transition={{
        type: 'spring',
        bounce: 0.2,
        duration: 0.6
      }} />}
        <span className="relative z-10 flex items-center gap-2 font-mono text-sm font-bold">
          <Code size={18} />
          <span className="hidden md:inline">DEV</span>
        </span>
      </button>

      <button onClick={() => setMode('edit')} className={`relative p-3 rounded-full transition-colors duration-300 ${mode === 'edit' ? 'text-[#0a0a0f]' : 'text-gray-400 hover:text-white'}`}>
        {mode === 'edit' && <motion.div layoutId="active-mode" className="absolute inset-0 bg-[#ff006e] rounded-full" transition={{
        type: 'spring',
        bounce: 0.2,
        duration: 0.6
      }} />}
        <span className="relative z-10 flex items-center gap-2 font-mono text-sm font-bold">
          <Clapperboard size={18} />
          <span className="hidden md:inline">EDIT</span>
        </span>
      </button>
    </div>;
}