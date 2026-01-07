import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface SkillNode {
  id: string;
  label: string;
  category: 'dev' | 'edit' | 'core';
  x: number;
  y: number;
  connections: string[];
  imageSrc: string;
}
const SKILLS: SkillNode[] = [
// Dev Constellation (Left - Cyan)
{
  id: 'ts',
  label: 'TypeScript',
  category: 'dev',
  x: 15,
  y: 25,
  connections: ['lead', 'react'],
  imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Typescript-official-svgrepo-com_%282%29.svg'
}, {
  id: 'react',
  label: 'React',
  category: 'dev',
  x: 20,
  y: 40,
  connections: ['lead', 'ts', 'next'],
  imageSrc: 'https://cdn.simpleicons.org/react/61DAFB'
}, {
  id: 'next',
  label: 'Next.js',
  category: 'dev',
  x: 18,
  y: 60,
  connections: ['lead', 'react', 'node'],
  imageSrc: "/nextjs-icon-svgrepo-com.svg"
}, {
  id: 'node',
  label: 'Node.js',
  category: 'dev',
  x: 25,
  y: 75,
  connections: ['lead', 'next', 'sql'],
  imageSrc: "/nodejs-icon.svg"
}, {
  id: 'sql',
  label: 'PostgreSQL',
  category: 'dev',
  x: 35,
  y: 85,
  connections: ['lead', 'node'],
  imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg'
}, {
  id: 'tailwind',
  label: 'Tailwind',
  category: 'dev',
  x: 30,
  y: 15,
  connections: ['lead', 'ts'],
  imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg'
},
// Central Supernova
{
  id: 'lead',
  label: 'Creative Tech Lead',
  category: 'core',
  x: 50,
  y: 50,
  connections: [],
  imageSrc: 'https://cdn.simpleicons.org/lightning/00F5FF'
},
// Creative Constellation (Right - White/Blue)
{
  id: 'premiere',
  label: 'Premiere Pro',
  category: 'edit',
  x: 70,
  y: 15,
  connections: ['lead', 'ae'],
  imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg'
}, {
  id: 'ae',
  label: 'After Effects',
  category: 'edit',
  x: 85,
  y: 25,
  connections: ['lead', 'premiere', 'filmora'],
  imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg'
}, {
  id: 'filmora',
  label: 'Filmora',
  category: 'edit',
  x: 80,
  y: 40,
  connections: ['lead', 'ae', 'davinci'],
  imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Wondershare_filmora_logo.svg'
}, {
  id: 'davinci',
  label: 'DaVinci Resolve',
  category: 'edit',
  x: 82,
  y: 60,
  connections: ['lead', 'filmora', 'design'],
  imageSrc: "/DaVinci_Resolve_17_logo.svg"
}, {
  id: 'design',
  label: 'Design',
  category: 'edit',
  x: 75,
  y: 75,
  connections: ['lead', 'davinci'],
  imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg'
}, {
  id: 'capcut',
  label: 'CapCut',
  category: 'edit',
  x: 65,
  y: 85,
  connections: ['lead', 'design'],
  imageSrc: "/capcut-icon.svg"
}];
// Particle component
function Particle({
  delay
}: {
  delay: number;
}) {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDuration = 15 + Math.random() * 10;
  return <motion.circle cx={`${randomX}%`} cy={`${randomY}%`} r="1" fill="rgba(255, 255, 255, 0.3)" initial={{
    opacity: 0
  }} animate={{
    opacity: [0, 0.6, 0],
    cx: [`${randomX}%`, `${randomX + (Math.random() - 0.5) * 20}%`],
    cy: [`${randomY}%`, `${randomY + (Math.random() - 0.5) * 20}%`]
  }} transition={{
    duration: randomDuration,
    repeat: Infinity,
    delay: delay,
    ease: 'linear'
  }} />;
}
// Traveling light pulse along connection line
function LightPulse({
  x1,
  y1,
  x2,
  y2,
  color,
  delay
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  delay: number;
}) {
  return <motion.circle r="3" fill={color} initial={{
    cx: `${x1}%`,
    cy: `${y1}%`,
    opacity: 0
  }} animate={{
    cx: `${x2}%`,
    cy: `${y2}%`,
    opacity: [0, 1, 0]
  }} transition={{
    duration: 2,
    repeat: Infinity,
    delay: delay,
    ease: 'linear'
  }} />;
}
export function SkillsWeb() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [particles, setParticles] = useState<number[]>([]);
  useEffect(() => {
    setParticles(Array.from({
      length: 30
    }, (_, i) => i));
  }, []);
  const getNodeColor = (category: string) => {
    if (category === 'dev') return '#00f5ff'; // Cyan
    if (category === 'edit') return '#ffffff'; // White
    return '#00f5ff'; // Core (supernova)
  };
  const getNodeSize = (category: string, isHovered: boolean) => {
    if (category === 'core') return isHovered ? 12 : 10;
    return isHovered ? 8 : 5;
  };
  return <div className="relative w-full h-[380px] sm:h-[450px] md:h-[600px] overflow-hidden rounded-xl border border-white/5">
      {/* Deep space background with nebula gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1f] via-[#001233] to-[#0a0a1f]" />

      {/* Nebula effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <svg className="absolute inset-0 w-full h-full">
        {/* Particles */}
        {particles.map(i => <Particle key={i} delay={i * 0.5} />)}

        {/* Connection lines */}
        {SKILLS.map(node => node.connections.map(targetId => {
        const target = SKILLS.find(s => s.id === targetId);
        if (!target) return null;
        const isConnected = hoveredNode && (node.id === hoveredNode || target.id === hoveredNode || node.connections.includes(hoveredNode));
        const lineColor = node.category === 'dev' ? '#00f5ff' : '#ffffff';
        const opacity = isConnected ? 0.6 : 0.2;
        return <g key={`${node.id}-${target.id}`}>
                {/* Connection line */}
                <motion.line x1={`${node.x}%`} y1={`${node.y}%`} x2={`${target.x}%`} y2={`${target.y}%`} stroke={lineColor} strokeWidth={isConnected ? 2 : 1} initial={{
            pathLength: 0,
            opacity: 0
          }} animate={{
            pathLength: 1,
            opacity: opacity
          }} transition={{
            pathLength: {
              duration: 1.5,
              ease: 'easeInOut'
            },
            opacity: {
              duration: 0.3
            }
          }} />

                {/* Light pulse traveling along line */}
                {isConnected && <LightPulse x1={node.x} y1={node.y} x2={target.x} y2={target.y} color={lineColor} delay={Math.random() * 2} />}
              </g>;
      }))}

        {/* Star nodes */}
        {SKILLS.map(node => {
        const isHovered = hoveredNode === node.id;
        const isCentral = node.category === 'core';
        const color = getNodeColor(node.category);
        const size = getNodeSize(node.category, isHovered);
        return <g key={node.id}>
              {/* Outer glow */}
              <motion.circle cx={`${node.x}%`} cy={`${node.y}%`} r={isCentral ? 25 : 15} fill={color} opacity={0.1} animate={{
            r: isCentral ? [25, 30, 25] : [15, 18, 15],
            opacity: isHovered ? [0.2, 0.3, 0.2] : [0.1, 0.15, 0.1]
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }} />

              {/* Middle glow */}
              <motion.circle cx={`${node.x}%`} cy={`${node.y}%`} r={isCentral ? 15 : 10} fill={color} opacity={0.3} animate={{
            r: isCentral ? [15, 18, 15] : [10, 12, 10],
            opacity: isHovered ? [0.4, 0.5, 0.4] : [0.3, 0.4, 0.3]
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3
          }} />

              {/* Invisible stable hover area - FIXED SIZE */}
              <circle cx={`${node.x}%`} cy={`${node.y}%`} r={isCentral ? 20 : 12} fill="transparent" className="cursor-pointer" onMouseEnter={() => setHoveredNode(node.id)} onMouseLeave={() => setHoveredNode(null)} />

              {/* Core star - visual only, no hover events */}
              <motion.circle cx={`${node.x}%`} cy={`${node.y}%`} r={size} fill={color} className="pointer-events-none" animate={{
            r: isHovered ? size * 1.3 : size,
            opacity: isHovered ? 1 : 0.9
          }} transition={{
            duration: 0.3
          }} style={{
            filter: `drop-shadow(0 0 ${isHovered ? '8px' : '4px'} ${color})`
          }} />

              {/* Supernova rays for central node */}
              {isCentral && <>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => <motion.line key={angle} x1={`${node.x}%`} y1={`${node.y}%`} x2={`${node.x + Math.cos(angle * Math.PI / 180) * 3}%`} y2={`${node.y + Math.sin(angle * Math.PI / 180) * 3}%`} stroke={color} strokeWidth="2" className="pointer-events-none" animate={{
              x2: `${node.x + Math.cos(angle * Math.PI / 180) * (isHovered ? 5 : 3)}%`,
              y2: `${node.y + Math.sin(angle * Math.PI / 180) * (isHovered ? 5 : 3)}%`,
              opacity: [0.6, 1, 0.6]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }} />)}
                </>}
            </g>;
      })}
      </svg>

      {/* Logo overlays */}
      {SKILLS.map(node => {
      const isHovered = hoveredNode === node.id;
      const isCentral = node.category === 'core';
      const logoSize = isCentral ? isHovered ? 32 : 28 : isHovered ? 20 : 16;
      const color = getNodeColor(node.category);
      return <motion.div key={`logo-${node.id}`} className="absolute pointer-events-none flex items-center justify-center" style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        width: `${logoSize}px`,
        height: `${logoSize}px`,
        marginLeft: `-${logoSize / 2}px`,
        marginTop: `-${logoSize / 2}px`
      }} animate={{
        scale: isHovered ? 1.2 : 1
      }} transition={{
        duration: 0.3
      }}>
            <img src={node.imageSrc} alt={node.label} className="w-full h-full object-contain drop-shadow-lg" style={{
          filter: `drop-shadow(0 0 ${isHovered ? '8px' : '4px'} ${color}) brightness(${isHovered ? 1.2 : 1})`
        }} />
          </motion.div>;
    })}

      {/* Skill labels on hover */}
      <AnimatePresence>
        {hoveredNode && <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: 10
      }} transition={{
        duration: 0.2
      }} className="absolute pointer-events-none" style={{
        left: `${SKILLS.find(s => s.id === hoveredNode)?.x}%`,
        top: `${(SKILLS.find(s => s.id === hoveredNode)?.y || 0) - 8}%`,
        transform: 'translate(-50%, -100%)'
      }}>
            <div className="px-4 py-2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl">
              <p className="text-white font-bold text-sm tracking-wide whitespace-nowrap">
                {SKILLS.find(s => s.id === hoveredNode)?.label}
              </p>
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex gap-6 text-xs font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500" />
          <span>Development</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white" />
          <span>Creative</span>
        </div>
      </div>

      {/* Instruction */}
      <div className="absolute bottom-4 right-4 text-xs font-mono text-gray-500">
        Hover over stars to explore
      </div>
    </div>;
}