import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Mode } from '../types/portfolio';
interface MagneticCursorProps {
  mode: Mode;
}
export function MagneticCursor({
  mode
}: MagneticCursorProps) {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = {
    damping: 25,
    stiffness: 700
  };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    const mouseDown = () => setClicked(true);
    const mouseUp = () => setClicked(false);
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [cursorX, cursorY]);
  return <motion.div className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference" style={{
    x: cursorXSpring,
    y: cursorYSpring,
    scale: clicked ? 0.8 : 1,
    border: `2px solid ${mode === 'dev' ? '#00f5ff' : '#ff006e'}`,
    backgroundColor: 'transparent'
  }}>
      <motion.div className="w-full h-full rounded-full opacity-20" animate={{
      backgroundColor: mode === 'dev' ? '#00f5ff' : '#ff006e',
      scale: [1, 1.5, 1]
    }} transition={{
      duration: 2,
      repeat: Infinity
    }} />
    </motion.div>;
}