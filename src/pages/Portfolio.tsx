import React, { useEffect, useState, useRef, Component } from 'react';
import { Hero } from '../components/ui/hero';
import { AboutSection } from '../components/AboutSection';
import { SkillsWeb } from '../components/SkillsWeb';
import { AnimatedFolder } from '../components/ui/3d-folder';
import { TypewriterSubtitle } from '../components/TypewriterSubtitle';
import { motion, useInView } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ContactModal } from '../components/ContactModal';
import { getContent } from '../lib/contentStore';
import { PortfolioContent } from '../types/content';
// Terminal Quote Component
function TerminalQuote({
  text
}: {
  text: string;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showAuthor, setShowAuthor] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const fullText = text || 'Innovation thrives where code meets creativity';
  const highlightWords = ['Innovation', 'code', 'creativity'];
  useEffect(() => {
    if (!isInView) return;
    let currentIndex = 0;
    const typingSpeed = 50;
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setShowAuthor(true);
      }
    }, typingSpeed);
    return () => clearInterval(typeInterval);
  }, [isInView, fullText]);
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);
  const renderTextWithHighlights = (text: string) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      const isHighlighted = highlightWords.some(hw => word.includes(hw));
      return <span key={index}>
          {isHighlighted ? <span className="text-cyan-400 font-bold">{word}</span> : word}
          {index < words.length - 1 ? ' ' : ''}
        </span>;
    });
  };
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.6
  }} className="max-w-3xl mx-auto relative">
      {/* Terminal Box */}
      <div className="relative bg-black/60 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-6 md:p-8 overflow-hidden shadow-2xl">
        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-scan" style={{
          backgroundSize: '100% 4px',
          animation: 'scan 8s linear infinite'
        }} />
        </div>

        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(0deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />

        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-4 md:mb-6 font-mono text-xs text-cyan-500/60">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/40" />
          </div>
          <span className="text-[10px] md:text-xs">~/portfolio/philosophy</span>
        </div>

        {/* Quote text */}
        <div className="relative">
          <p className="font-mono text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
            <span className="text-cyan-500/60">$ echo "</span>
            {renderTextWithHighlights(displayedText)}
            {displayedText.length < fullText.length && <span className={`inline-block w-1.5 md:w-2 h-4 md:h-5 bg-cyan-400 ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />}
            {displayedText.length === fullText.length && <span className="text-cyan-500/60">"</span>}
          </p>

          {/* Author */}
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: showAuthor ? 1 : 0
        }} transition={{
          duration: 0.8
        }} className="font-mono text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
            <span className="text-cyan-500/40">→</span> MD Aminul Islam
          </motion.p>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-lg pointer-events-none">
          <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_60px_rgba(0,255,255,0.1)]" />
        </div>
      </div>
    </motion.div>;
}
// Copyright Component
function AnimatedCopyright({
  text
}: {
  text: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-50px'
  });
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    if (isInView) {
      // Show text after line animation completes
      const timer = setTimeout(() => setShowText(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isInView]);
  return <motion.div ref={ref} className="mt-12 md:mt-16 flex flex-col items-center gap-4 md:gap-6">
      {/* Animated Glowing Divider Line */}
      <motion.div className="relative h-px overflow-hidden" initial={{
      width: 0
    }} animate={isInView ? {
      width: 200
    } : {
      width: 0
    }} transition={{
      duration: 0.8,
      ease: 'easeOut'
    }}>
        {/* Base line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />

        {/* Pulsing glow */}
        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm" animate={{
        opacity: [0.5, 1, 0.5]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }} />
      </motion.div>

      {/* Copyright Text */}
      <motion.p className="font-mono text-xs md:text-sm text-gray-400 transition-colors duration-300 hover:text-cyan-400 cursor-default px-4 text-center" initial={{
      opacity: 0,
      y: 10
    }} animate={showText ? {
      opacity: 1,
      y: 0
    } : {
      opacity: 0,
      y: 10
    }} transition={{
      duration: 0.6,
      ease: 'easeOut'
    }}>
        {text}
      </motion.p>
    </motion.div>;
}
export function Portfolio() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [content, setContent] = useState<PortfolioContent | null>(null);
  useEffect(() => {
    setContent(getContent());
  }, []);
  if (!content) return null;
  // Map social links to include actual Icon components
  const socialLinksWithIcons = content.contact.socialLinks.map(link => {
    // @ts-ignore - Dynamic icon access
    const IconComponent = LucideIcons[link.iconName] || LucideIcons.Link;
    return {
      ...link,
      icon: IconComponent
    };
  });
  return <div className="min-h-screen bg-[#001233] text-white selection:bg-cyan-500/30">
      {/* Hero Section - Clean Hierarchy */}
      <Hero name={content.hero.name} typewriterComponent={<TypewriterSubtitle />} actions={[{
      label: content.hero.ctaText,
      href: '#contact',
      onClick: () => setIsContactModalOpen(true)
    }]} className="bg-[#001233]" />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* Main Content */}
      <main className="relative z-10">
        {/* About Section */}
        <AboutSection />

        {/* Skills Section - RESPONSIVE HEIGHTS */}
        <section className="py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-3 md:gap-4 mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter">
              SKILL <span className="text-cyan-500">MATRIX</span>
            </h2>
            <div className="hidden md:block h-px flex-1 bg-white/10 mb-4" />
            <span className="font-mono text-xs text-gray-500 md:mb-4">
              01 // NETWORK
            </span>
          </div>
          <SkillsWeb />
        </section>

        {/* Projects Section - MOBILE RESPONSIVE GRID */}
        <section className="py-12 md:py-20 bg-black/20">
          <div className="px-4 md:px-8 max-w-7xl mx-auto mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-3 md:gap-4">
              <span className="font-mono text-xs text-gray-500 md:mb-4">
                02 // WORK
              </span>
              <div className="hidden md:block h-px flex-1 bg-white/10 mb-4" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter md:text-right">
                SELECTED <span className="text-cyan-500">PROJECTS</span>
              </h2>
            </div>
          </div>

          {/* MOBILE RESPONSIVE GRID: 2 cols mobile, 3 cols tablet+ */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-16">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 justify-items-center">
              {content.projects.map((folder, index) => <motion.div key={folder.title} className="w-full" initial={{
              opacity: 0,
              y: 50
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.7,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}>
                  <AnimatedFolder title={folder.title} projects={folder.projects} gradient={folder.gradient} logoUrl={folder.logoUrl} className="w-full" />
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Contact / Footer - PERFECT AS-IS */}
        <footer className="py-20 md:py-32 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-12 md:mb-16 mix-blend-difference px-4">
            LET'S <span className="opacity-50">CREATE</span>{' '}
            <span className="text-cyan-500">●</span>
          </h2>

          {/* Optimized Social Orbs - 60fps GPU Accelerated */}
          <div className="flex justify-center items-center gap-4 md:gap-6 mb-12 md:mb-16 flex-wrap max-w-4xl mx-auto px-4">
            {socialLinksWithIcons.map((social, index) => {
            const Icon = social.icon;
            const floatDelay = index * 0.2;
            return <motion.a key={social.name} href={social.disabled ? undefined : social.href} target={social.disabled ? undefined : '_blank'} rel={social.disabled ? undefined : 'noopener noreferrer'} className={`relative group ${social.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} style={{
              willChange: 'transform'
            }}>
                  {/* Floating animation container - GPU accelerated */}
                  <motion.div animate={{
                y: [0, -8, 0]
              }} transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelay
              }} style={{
                transform: 'translate3d(0, 0, 0)',
                willChange: 'transform'
              }}>
                    {/* Hover scale wrapper */}
                    <motion.div whileHover={social.disabled ? {} : {
                  scale: 1.1
                }} transition={{
                  duration: 0.2,
                  ease: 'easeOut'
                }} style={{
                  transform: 'translate3d(0, 0, 0)'
                }}>
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-300 ${social.disabled ? 'opacity-0' : 'opacity-0 group-hover:opacity-60'}`} style={{
                    backgroundColor: social.color
                  }} />

                      {/* Orb */}
                      <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full backdrop-blur-xl border transition-all duration-300 flex items-center justify-center ${social.disabled ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/20 group-hover:border-white/40'}`} style={{
                    boxShadow: social.disabled ? 'none' : `0 0 20px ${social.color}20`
                  }}>
                        <Icon size={24} className={`md:w-7 md:h-7 transition-colors duration-300 ${social.disabled ? 'text-gray-600' : 'text-white group-hover:brightness-125'}`} style={{
                      color: social.disabled ? undefined : social.color,
                      filter: social.disabled ? 'grayscale(1)' : undefined
                    }} />
                      </div>

                      {/* Tooltip */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className="text-xs font-mono text-gray-400 whitespace-nowrap">
                          {social.disabled ? 'Coming Soon' : social.name}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.a>;
          })}
          </div>

          {/* Terminal Quote Section */}
          <TerminalQuote text={content.footer.terminalQuote} />

          {/* Animated Copyright */}
          <AnimatedCopyright text={content.footer.copyrightText} />
        </footer>
      </main>

      {/* Background Ambient Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-overlay" style={{
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
    }} />

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>;
}