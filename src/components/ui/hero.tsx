import React, { forwardRef, Component } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
interface HeroAction {
  label: string;
  href: string;
  variant?: 'default' | 'outline';
  onClick?: () => void;
  target?: string;
}
interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  gradient?: boolean;
  blur?: boolean;
  name: string;
  typewriterComponent?: React.ReactNode;
  actions?: HeroAction[];
  titleClassName?: string;
  actionsClassName?: string;
}
const Hero = forwardRef<HTMLElement, HeroProps>(({
  className,
  gradient = true,
  blur = true,
  name,
  typewriterComponent,
  actions,
  titleClassName,
  actionsClassName,
  ...props
}, ref) => {
  return <section ref={ref} className={cn('relative z-0 flex min-h-screen w-full items-center justify-start overflow-hidden bg-background', className)} {...props}>
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="/pixelcut-export_(1).jpg" alt="Hero Background" className="w-full h-full object-cover brightness-120" />

          {/* Minimal Bottom Gradient for Seamless Blend */}
          <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, #001233 0%, transparent 15%)'
      }} />
        </div>

        {/* Content Container - Left Aligned */}
        <motion.div initial={{
      y: 100,
      opacity: 0
    }} viewport={{
      once: true
    }} transition={{
      ease: 'easeInOut',
      delay: 0.3,
      duration: 0.8
    }} whileInView={{
      y: 0,
      opacity: 1
    }} className="relative z-50 w-full pl-4 md:pl-16 lg:pl-24 pr-4">
          <div className="flex flex-col items-start text-left space-y-4 max-w-3xl">
            {/* Name - NO cursor animation */}
            <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5,
          duration: 0.6
        }} className={cn('text-6xl md:text-8xl font-black text-white tracking-tight', titleClassName)}>
              {name}
            </motion.h1>

            {/* Typewriter Component (contains subtitle + animated phrases) */}
            {typewriterComponent && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7,
          duration: 0.6
        }} className="w-full">
                {typewriterComponent}
              </motion.div>}

            {/* Actions/Buttons */}
            {actions && actions.length > 0 && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.9,
          duration: 0.6
        }} className={cn('flex gap-4 flex-wrap justify-start pt-4', actionsClassName)}>
                {actions.map((action, index) => <motion.button key={index} onClick={action.onClick} whileHover={{
            scale: 1.05,
            borderColor: 'rgba(6, 182, 212, 1)'
          }} whileTap={{
            scale: 0.98
          }} transition={{
            duration: 0.2,
            ease: 'easeOut'
          }} className="rounded-full border-2 border-white/40 hover:bg-white/10 px-10 py-4 text-white font-semibold transition-all duration-300">
                    {action.label}
                  </motion.button>)}
              </motion.div>}
          </div>
        </motion.div>
      </section>;
});
Hero.displayName = 'Hero';
export { Hero };