import React from 'react';
import { use3DTilt } from '../hooks/use3DTilt';
import { Project, Mode } from '../types/portfolio';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';
interface ProjectCardProps {
  project: Project;
  mode: Mode;
}
function ProjectCard({
  project,
  mode
}: ProjectCardProps) {
  const {
    ref,
    handleMouseMove,
    handleMouseLeave,
    style
  } = use3DTilt();
  const accentColor = mode === 'dev' ? '#00f5ff' : '#ff006e';
  return <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={style} className="relative w-full h-[400px] rounded-xl overflow-hidden group cursor-none" initial={{
    opacity: 0,
    y: 50
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }}>
      <div className="absolute inset-0 bg-gray-900">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-z-10">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-2 mb-3">
            {project.tags.map(tag => <span key={tag} className="text-xs font-mono px-2 py-1 rounded border border-white/20 bg-black/30 backdrop-blur-sm text-gray-300">
                {tag}
              </span>)}
          </div>

          <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors" style={{
          '--accent': accentColor
        } as any}>
            {project.title}
          </h3>

          <p className="text-gray-400 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {project.description}
          </p>

          <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
            <button className="flex items-center gap-2 px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold text-white">
              {project.type === 'dev' ? <Github size={16} /> : <Play size={16} />}
              {project.type === 'dev' ? 'VIEW CODE' : 'WATCH'}
            </button>
            {project.link && <button className="flex items-center gap-2 px-4 py-2 rounded border border-white/10 hover:border-white/30 transition-colors text-sm font-bold text-white">
                <ExternalLink size={16} />
                VISIT
              </button>}
          </div>
        </div>
      </div>

      {/* Border Glow */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--accent)] rounded-xl transition-colors duration-300 pointer-events-none" style={{
      '--accent': accentColor
    } as any} />
    </motion.div>;
}
interface ProjectMasonryProps {
  mode: Mode;
}
const PROJECTS: Project[] = [{
  id: '1',
  title: 'Neon Commerce',
  description: 'Headless e-commerce platform with 3D product configurator.',
  tags: ['Next.js', 'Three.js', 'Shopify'],
  image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
  type: 'dev'
}, {
  id: '2',
  title: 'Cyber Punk 2077 Edit',
  description: 'High-energy gameplay montage synced to synthwave track.',
  tags: ['Premiere', 'After Effects', 'Sound Design'],
  image: 'https://images.unsplash.com/photo-1535016120720-40c6874c3b13?q=80&w=1000&auto=format&fit=crop',
  type: 'edit'
}, {
  id: '3',
  title: 'AI Dashboard',
  description: 'Real-time analytics dashboard for machine learning models.',
  tags: ['React', 'D3.js', 'Python'],
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  type: 'dev'
}, {
  id: '4',
  title: 'Music Video VFX',
  description: 'Compositing and rotoscoping for indie artist music video.',
  tags: ['After Effects', 'Blender', 'Davinci'],
  image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
  type: 'edit'
}];
export function ProjectMasonry({
  mode
}: ProjectMasonryProps) {
  // Filter projects based on mode, but keep some cross-pollination for interest
  const displayProjects = PROJECTS.sort((a, b) => {
    if (a.type === mode) return -1;
    return 1;
  });
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto">
      {displayProjects.map(project => <ProjectCard key={project.id} project={project} mode={mode} />)}
    </div>;
}