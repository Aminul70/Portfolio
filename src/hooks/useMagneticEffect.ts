import { useRef, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
export function useMagneticEffect(strength: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = {
    damping: 15,
    stiffness: 150,
    mass: 0.1
  };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Only activate if close enough
      if (Math.abs(distanceX) < rect.width && Math.abs(distanceY) < rect.height) {
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, strength]);
  return {
    ref,
    x: springX,
    y: springY
  };
}