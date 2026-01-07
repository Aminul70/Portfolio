import React from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface Tab {
  id: string;
  label: string;
}
interface TopNavProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}
export function TopNav({
  tabs,
  activeTab,
  onTabChange
}: TopNavProps) {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/amin');
  };
  return <nav className="fixed top-0 left-0 right-0 bg-[#001233]/95 backdrop-blur-xl border-b border-white/10 z-50 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-lg">
            A
          </div>
          <span className="font-black text-xl text-white hidden md:block">
            Admin Control
          </span>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar">
          {tabs.map(tab => <button key={tab.id} onClick={() => onTabChange(tab.id)} className={`relative px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}>
              {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute inset-0 bg-white/5 rounded-lg border border-white/10" transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.6
          }} />}
              <span className="relative z-10">{tab.label}</span>
            </button>)}
        </div>

        {/* Logout */}
        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/5" title="Logout">
          <LogOut size={20} />
          <span className="hidden md:block text-sm font-medium">Logout</span>
        </button>
      </div>
    </nav>;
}