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
  return <section ref={ref} className={cn('relative z-0 flex min-h-screen w-full items-end md:items-center justify-start overflow-hidden bg-background', className)} {...props}>
    {/* Hero Background Image */}
    <div className="absolute inset-0 z-0">
      {/* Mobile Image - Vignette Blending */}
      <div className="block md:hidden w-full h-[85vh] absolute top-0 left-0">
        <img src="/mobile-hero.png" alt="Hero Background Mobile" className="w-full h-full object-cover object-top brightness-110" />

        {/* Vignette Gradients for Seamless Blending */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#001233] to-transparent opacity-90" />
        <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-[#001233] to-transparent opacity-80" />
        <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-[#001233] to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#001233] via-[#001233]/80 to-transparent" />
      </div>

      {/* Desktop Image */}
      <div className="hidden md:block w-full h-full absolute inset-0">
        <img src="/pixelcut-export_(1).jpg" alt="Hero Background" className="w-full h-full object-cover object-center brightness-110" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001233] via-[#001233]/40 to-transparent" />
        {/* Bottom Seamless Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#001233] to-transparent" />
      </div>
    </div>

    {/* Content Container */}
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
    }} className="relative z-50 w-full px-6 md:px-0 md:pl-16 lg:pl-24 pb-24 md:pb-0">
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
        }} className={cn('text-5xl md:text-8xl font-black text-white tracking-tight leading-[0.9]', titleClassName)}>
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
          }} className="rounded-full border-2 border-white/40 hover:bg-white/10 px-8 py-3 md:px-10 md:py-4 text-sm md:text-base text-white font-semibold transition-all duration-300 backdrop-blur-sm">
            {action.label}
          </motion.button>)}
        </motion.div>}
      </div>
    </motion.div>
  </section>;
});
Hero.displayName = 'Hero';
export { Hero };