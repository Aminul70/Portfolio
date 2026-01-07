import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkPreview } from './ui/link-preview';
export function AboutSection() {
  const titles = ['Next-Gen Developer', 'Video Editor', 'UI/UX Designer'];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex(prev => (prev + 1) % titles.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);
  return <section id="about" className="py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_1.3fr] gap-6 md:gap-8">
        {/* Photo Card */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="relative group">
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 overflow-hidden hover:border-cyan-500/30 transition-all duration-500">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Photo with overlaid text */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl blur-2xl opacity-20 bg-cyan-500" />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-cyan-500/30">
                <img src="/a-cinematic-portrait-photograph-of-a-you_Udra-uIpRLWJIwzQIfDkig_VXiqu_E3RPqmpJfNUNNUCg.jpg" alt="MD Aminul Islam - Professional Portrait" className="w-full h-full object-cover" />

                {/* Gradient overlay - only bottom 40% */}
                <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Name and Animated Title - Overlaid on photo bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    MD Aminul Islam
                  </h3>

                  {/* Animated rotating title */}
                  <div className="h-7 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.p key={currentTitleIndex} initial={{
                      y: 20,
                      opacity: 0
                    }} animate={{
                      y: 0,
                      opacity: 1
                    }} exit={{
                      y: -20,
                      opacity: 0
                    }} transition={{
                      duration: 0.5,
                      ease: 'easeInOut'
                    }} className="text-cyan-400 font-medium text-base md:text-lg">
                        {titles[currentTitleIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio Card */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="relative group">
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 h-full hover:border-cyan-500/30 transition-all duration-500">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="relative z-10 space-y-6">
              {/* Heading */}
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-3 text-white">
                  ABOUT<span className="text-cyan-500">.</span>
                </h2>
                <motion.div initial={{
                width: 0
              }} whileInView={{
                width: 80
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.8,
                delay: 0.4
              }} className="h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full" />
              </div>

              {/* Intro - Larger text */}
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                Co-founder of{' '}
                <LinkPreview url="https://toiral-development.web.app/" imageSrc="/Screenshot_2026-01-04_at_21-48-52_Toiral_-_Professional_Web_Development__Design_Agency_Custom_Websites__SEO.png" width={200} height={130} className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                  Toiral
                </LinkPreview>{' '}
                — where code meets creativity.
              </p>

              {/* Main Bio with highlighted keywords */}
              <div className="space-y-4 text-base text-gray-300 leading-relaxed">
                <p>
                  Hi, I'm{' '}
                  <LinkPreview url="https://www.facebook.com/noob.aminul" imageSrc="/WhatsApp_Image_2026-01-04_at_9.55.57_PM.jpg" width={150} height={100} className="font-semibold text-white hover:text-cyan-400 transition-colors">
                    MD Aminul Islam
                  </LinkPreview>
                  . I architect clean, scalable web applications using the full
                  spectrum of modern development tools. As a{' '}
                  <span className="text-cyan-400 font-medium">
                    Next-Gen Developer
                  </span>
                  , I leverage{' '}
                  <span className="text-cyan-400 font-medium">
                    AI-augmented workflows
                  </span>{' '}
                  to build with a level of speed and technical precision that
                  traditional methods can't match.
                </p>
                <p>
                  My expertise extends beyond the browser. As a{' '}
                  <span className="text-cyan-400 font-medium">
                    UI/UX Designer
                  </span>{' '}
                  and{' '}
                  <span className="text-cyan-400 font-medium">
                    Video Editor
                  </span>
                  , I ensure that every project is as visually compelling as it
                  is technically sound. My passion lies in the intersection of{' '}
                  <span className="text-cyan-400 font-medium">
                    high-end code and visual storytelling
                  </span>
                  —creating digital experiences that are both robust and
                  impactful.
                </p>

                {/* Footer comment - Cyan italic */}
                <p className="text-sm font-mono text-cyan-500/60 italic pt-2">
                  // Leading tech innovation at{' '}
                  <LinkPreview url="https://toiral-development.web.app/" imageSrc="/Screenshot_2026-01-04_at_21-48-52_Toiral_-_Professional_Web_Development__Design_Agency_Custom_Websites__SEO.png" width={200} height={130} className="text-cyan-500/60 hover:text-cyan-400 transition-colors">
                    Toiral
                  </LinkPreview>{' '}
                  by merging code craftsmanship with professional video editing
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
}