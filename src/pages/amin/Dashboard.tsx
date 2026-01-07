import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Minus, Square, X, Search, Wifi, Volume2, ChevronUp, Layout, User, Mail, Settings, Monitor, Shield, Folder, FileText, HardDrive, Printer, HelpCircle, Power } from 'lucide-react';
import { useContent } from '../../lib/ContentContext';
import { ProjectsManager } from '../../components/admin/editors/ProjectsManager';
import { HeroEditor } from '../../components/admin/editors/HeroEditor';
import { AboutEditor } from '../../components/admin/editors/AboutEditor';
import { ContactEditor } from '../../components/admin/editors/ContactEditor';
import { FooterEditor } from '../../components/admin/editors/FooterEditor';
type WindowType = 'projects' | 'hero' | 'about' | 'contact' | 'footer';
interface WindowState {
  id: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}
const INITIAL_WINDOWS: Record<WindowType, WindowState> = {
  projects: {
    id: 'projects',
    title: 'Projects Manager',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: {
      x: 50,
      y: 50
    },
    size: {
      width: 900,
      height: 600
    }
  },
  hero: {
    id: 'hero',
    title: 'Hero Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: {
      x: 80,
      y: 80
    },
    size: {
      width: 700,
      height: 500
    }
  },
  about: {
    id: 'about',
    title: 'About Me Editor',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: {
      x: 110,
      y: 110
    },
    size: {
      width: 800,
      height: 600
    }
  },
  contact: {
    id: 'contact',
    title: 'Contact & Socials',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: {
      x: 140,
      y: 140
    },
    size: {
      width: 600,
      height: 500
    }
  },
  footer: {
    id: 'footer',
    title: 'Footer Configuration',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: {
      x: 170,
      y: 170
    },
    size: {
      width: 500,
      height: 400
    }
  }
};
export function Dashboard() {
  const navigate = useNavigate();
  const {
    content
  } = useContent();
  const [windows, setWindows] = useState<Record<WindowType, WindowState>>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<WindowType | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [time, setTime] = useState(new Date());
  // Play startup sound on mount
  useEffect(() => {
    // Optional: Add Windows 7 startup sound
    // const audio = new Audio('/sounds/windows7-startup.mp3')
    // audio.play()
  }, []);
  // Clock update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const openWindow = (id: WindowType) => {
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: maxZIndex + 1
      }
    }));
    setActiveWindowId(id);
    setMaxZIndex(prev => prev + 1);
    setShowStartMenu(false);
  };
  const closeWindow = (id: WindowType) => {
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false
      }
    }));
    if (activeWindowId === id) setActiveWindowId(null);
  };
  const minimizeWindow = (id: WindowType) => {
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true
      }
    }));
    setActiveWindowId(null);
  };
  const maximizeWindow = (id: WindowType) => {
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized
      }
    }));
  };
  const focusWindow = (id: WindowType) => {
    if (activeWindowId === id) return;
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        zIndex: maxZIndex + 1,
        isMinimized: false
      }
    }));
    setActiveWindowId(id);
    setMaxZIndex(prev => prev + 1);
  };
  return <div className="h-screen w-full overflow-hidden relative font-['Segoe_UI',sans-serif] select-none">
      {/* Windows 7 Desktop Wallpaper */}
      <div className="absolute inset-0 bg-cover bg-center" style={{
      background: 'linear-gradient(135deg, #4a90d9 0%, #2b6eb5 50%, #1e5799 100%)'
    }}>
        {/* Light Rays */}
        <div className="absolute inset-0 overflow-hidden opacity-40">
          {[...Array(16)].map((_, i) => <div key={i} className="absolute bottom-0 left-1/2 w-1 h-full bg-gradient-to-t from-white/20 via-white/5 to-transparent" style={{
          transform: `rotate(${i * 22.5 - 180}deg)`,
          transformOrigin: 'bottom center'
        }} />)}
        </div>

        {/* Windows Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 grid grid-cols-2 gap-4 opacity-30">
          <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-tl-3xl transform -skew-x-6"></div>
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-tr-3xl transform skew-x-6"></div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-bl-3xl transform skew-x-6"></div>
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-br-3xl transform -skew-x-6"></div>
        </div>

        {/* Flower in top right */}
        <div className="absolute top-8 right-8 w-32 h-32 opacity-60">
          <img src="/49432863a58cf2212067ca4911536d4c.jpg" alt="Flower" className="w-full h-full object-cover rounded-full shadow-2xl" />
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-0 left-0 bottom-10 w-full p-4 flex flex-col flex-wrap content-start gap-4 z-0">
        <DesktopIcon icon={<img src="/remove-photos-background-removed(3).png" alt="Projects Folder" className="w-16 h-16 drop-shadow-2xl" />} label="Projects_Folder" onClick={() => openWindow('projects')} />
        <DesktopIcon icon={<Monitor size={48} className="text-blue-400 drop-shadow-lg" />} label="Hero_Settings.exe" onClick={() => openWindow('hero')} />
        <DesktopIcon icon={<FileText size={48} className="text-white drop-shadow-lg" />} label="About_Me.docx" onClick={() => openWindow('about')} />
        <DesktopIcon icon={<Mail size={48} className="text-purple-400 drop-shadow-lg" />} label="Network_Settings" onClick={() => openWindow('contact')} />
        <DesktopIcon icon={<Settings size={48} className="text-gray-300 drop-shadow-lg" />} label="Footer_Config.cfg" onClick={() => openWindow('footer')} />
      </div>

      {/* Windows Layer */}
      <AnimatePresence>
        {Object.values(windows).map(window => window.isOpen && !window.isMinimized && <AeroWindow key={window.id} window={window} isActive={activeWindowId === window.id} onClose={() => closeWindow(window.id)} onMinimize={() => minimizeWindow(window.id)} onMaximize={() => maximizeWindow(window.id)} onFocus={() => focusWindow(window.id)}>
                {window.id === 'projects' && <ProjectsManager />}
                {window.id === 'hero' && <HeroEditor />}
                {window.id === 'about' && <AboutEditor />}
                {window.id === 'contact' && <ContactEditor />}
                {window.id === 'footer' && <FooterEditor />}
              </AeroWindow>)}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-black/20 backdrop-blur-xl border-t border-white/10 flex items-center px-1 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]">
        {/* Start Button */}
        <button onClick={() => setShowStartMenu(!showStartMenu)} className="relative w-14 h-full flex items-center justify-center group">
          <img src="/remove-photos-background-removed(2).png" alt="Start" className="w-10 h-10 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/50 group-active:scale-95 transition-all duration-200" />
        </button>

        {/* Separator */}
        <div className="w-px h-8 bg-white/20 mx-1" />

        {/* Taskbar Items */}
        <div className="flex-1 flex items-center gap-1 px-2">
          {Object.values(windows).filter(w => w.isOpen).map(window => <button key={window.id} onClick={() => window.isMinimized ? focusWindow(window.id) : activeWindowId === window.id ? minimizeWindow(window.id) : focusWindow(window.id)} className={`h-8 px-3 rounded flex items-center gap-2 border transition-all min-w-[140px] max-w-[200px] ${activeWindowId === window.id && !window.isMinimized ? 'bg-white/30 border-white/40 shadow-inner' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}>
                <div className="w-4 h-4">
                  {window.id === 'projects' && <img src="/remove-photos-background-removed(3).png" alt="Projects" className="w-4 h-4" />}
                  {window.id === 'hero' && <Monitor size={16} className="text-blue-300" />}
                  {window.id === 'about' && <FileText size={16} className="text-white" />}
                  {window.id === 'contact' && <Mail size={16} className="text-purple-300" />}
                  {window.id === 'footer' && <Settings size={16} className="text-gray-300" />}
                </div>
                <span className="text-white text-xs truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {window.title}
                </span>
              </button>)}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-3 px-3 h-full border-l border-white/10">
          <ChevronUp size={14} className="text-white/70 hover:text-white cursor-pointer transition-colors" />
          <Wifi size={16} className="text-white/90 drop-shadow-md" />
          <Volume2 size={16} className="text-white/90 drop-shadow-md" />
          <div className="flex flex-col items-end text-white text-[11px] leading-tight cursor-default">
            <span className="font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {time.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit'
            })}
            </span>
            <span className="opacity-90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {time.toLocaleDateString('en-US', {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric'
            })}
            </span>
          </div>
        </div>

        {/* Show Desktop */}
        <div className="w-2 h-full border-l border-white/20 hover:bg-white/20 cursor-pointer ml-1 transition-colors" title="Show Desktop" />
      </div>

      {/* Start Menu */}
      <AnimatePresence>
        {showStartMenu && <>
            <div className="fixed inset-0 z-40" onClick={() => setShowStartMenu(false)} />
            <motion.div initial={{
          opacity: 0,
          y: 20,
          scale: 0.95
        }} animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }} exit={{
          opacity: 0,
          y: 10,
          scale: 0.95
        }} className="absolute bottom-11 left-0 w-[420px] h-[520px] bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-xl border border-white/40 rounded-tr-lg shadow-2xl z-50 flex overflow-hidden">
              {/* Left Column - Programs */}
              <div className="w-[260px] bg-white/95 flex flex-col">
                <div className="flex-1 p-2 space-y-1 overflow-y-auto">
                  <StartMenuItem icon={<Folder size={32} className="text-yellow-500" />} label="Projects Manager" onClick={() => openWindow('projects')} />
                  <StartMenuItem icon={<Monitor size={32} className="text-blue-500" />} label="Hero Settings" onClick={() => openWindow('hero')} />
                  <StartMenuItem icon={<FileText size={32} className="text-gray-600" />} label="About Me Editor" onClick={() => openWindow('about')} />
                  <StartMenuItem icon={<Mail size={32} className="text-purple-500" />} label="Contact Editor" onClick={() => openWindow('contact')} />
                  <StartMenuItem icon={<Settings size={32} className="text-gray-500" />} label="Footer Config" onClick={() => openWindow('footer')} />
                  <div className="h-px bg-gray-300 my-2" />
                  <StartMenuItem icon={<HelpCircle size={24} className="text-blue-500" />} label="Getting Started" />
                </div>

                {/* Search Box */}
                <div className="p-2 border-t border-gray-200 bg-gradient-to-b from-transparent to-gray-100/50">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search programs and files" className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-400 bg-white/80 italic text-gray-600" />
                  </div>
                </div>
              </div>

              {/* Right Column - Places */}
              <div className="w-[160px] bg-black/80 backdrop-blur-xl p-2 text-white flex flex-col text-sm space-y-1">
                <div className="flex items-center gap-2 p-2 rounded hover:bg-white/10 cursor-pointer mb-2 border-b border-white/10 pb-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                    <User size={20} />
                  </div>
                  <span className="font-semibold text-xs">Admin</span>
                </div>
                <StartPlaceItem icon={<Folder size={16} />} label="Documents" />
                <StartPlaceItem icon={<Folder size={16} />} label="Pictures" />
                <StartPlaceItem icon={<Folder size={16} />} label="Music" />
                <StartPlaceItem icon={<Folder size={16} />} label="Games" />
                <div className="h-px bg-white/10 my-1" />
                <StartPlaceItem icon={<HardDrive size={16} />} label="Computer" />
                <StartPlaceItem icon={<Settings size={16} />} label="Control Panel" />
                <StartPlaceItem icon={<Printer size={16} />} label="Devices and Printers" />
                <StartPlaceItem icon={<Settings size={16} />} label="Default Programs" />
                <StartPlaceItem icon={<HelpCircle size={16} />} label="Help and Support" />

                <div className="mt-auto pt-3 border-t border-white/10">
                  <button onClick={() => navigate('/amin')} className="w-full flex items-center justify-between px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded transition-colors shadow-lg">
                    <span className="font-semibold text-sm">Shut down</span>
                    <Power size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </div>;
}
function DesktopIcon({
  icon,
  label,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return <div onDoubleClick={onClick} className="w-24 flex flex-col items-center gap-1 group cursor-pointer p-2 rounded hover:bg-white/10 transition-colors">
      <div className="group-hover:scale-105 transition-transform duration-200 drop-shadow-2xl">
        {icon}
      </div>
      <span className="text-white text-xs text-center font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-tight px-1 py-0.5 rounded group-hover:bg-blue-500/80 transition-colors">
        {label}
      </span>
    </div>;
}
function StartMenuItem({
  icon,
  label,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return <div onClick={onClick} className="flex items-center gap-3 p-2 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-50 rounded cursor-pointer group transition-all">
      <div className="group-hover:scale-105 transition-transform">{icon}</div>
      <span className="text-sm font-normal text-gray-800 group-hover:text-black">
        {label}
      </span>
    </div>;
}
function StartPlaceItem({
  icon,
  label
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/10 rounded cursor-pointer text-white/90 hover:text-white transition-colors text-xs">
      {icon}
      <span>{label}</span>
    </div>;
}
function AeroWindow({
  window,
  isActive,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus
}: {
  window: WindowState;
  isActive: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
}) {
  const dragControls = useDragControls();
  return <motion.div drag={!window.isMaximized} dragControls={dragControls} dragListener={false} dragMomentum={false} initial={{
    opacity: 0,
    scale: 0.95,
    y: 20
  }} animate={{
    opacity: 1,
    scale: 1,
    y: 0,
    width: window.isMaximized ? '100%' : window.size.width,
    height: window.isMaximized ? 'calc(100% - 40px)' : window.size.height,
    x: window.isMaximized ? 0 : window.position.x,
    y: window.isMaximized ? 0 : window.position.y,
    zIndex: window.zIndex
  }} exit={{
    opacity: 0,
    scale: 0.95
  }} transition={{
    duration: 0.2
  }} className="absolute flex flex-col rounded-lg overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/40" style={{
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)'
  }} onMouseDown={onFocus}>
      {/* Title Bar */}
      <div onPointerDown={e => dragControls.start(e)} className={`h-8 px-3 flex items-center justify-between select-none cursor-move ${isActive ? 'bg-gradient-to-b from-white/30 via-white/20 to-white/10' : 'bg-gradient-to-b from-white/15 via-white/10 to-white/5'}`} onDoubleClick={onMaximize} style={{
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)'
    }}>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4">
            {window.id === 'projects' && <Folder size={14} className="text-yellow-600 drop-shadow" />}
            {window.id === 'hero' && <Monitor size={14} className="text-blue-600 drop-shadow" />}
            {window.id === 'about' && <FileText size={14} className="text-gray-700 drop-shadow" />}
            {window.id === 'contact' && <Mail size={14} className="text-purple-600 drop-shadow" />}
            {window.id === 'footer' && <Settings size={14} className="text-gray-600 drop-shadow" />}
          </div>
          <span className={`text-xs font-normal ${isActive ? 'text-black drop-shadow-sm' : 'text-gray-700'}`}>
            {window.title}
          </span>
        </div>

        <div className="flex items-center gap-0.5">
          <button onClick={e => {
          e.stopPropagation();
          onMinimize();
        }} className="w-7 h-6 flex items-center justify-center hover:bg-white/30 rounded-sm transition-colors">
            <Minus size={10} className="text-gray-800" />
          </button>
          <button onClick={e => {
          e.stopPropagation();
          onMaximize();
        }} className="w-7 h-6 flex items-center justify-center hover:bg-white/30 rounded-sm transition-colors">
            <Square size={9} className="text-gray-800" />
          </button>
          <button onClick={e => {
          e.stopPropagation();
          onClose();
        }} className="w-9 h-6 flex items-center justify-center hover:bg-[#e81123] hover:text-white rounded-sm transition-colors ml-1">
            <X size={12} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white overflow-hidden">{children}</div>
    </motion.div>;
}