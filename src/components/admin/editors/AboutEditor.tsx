import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Check } from 'lucide-react';
import { getContent, saveContent } from '../../../lib/contentStore';
import { PortfolioContent } from '../../../types/content';
export function AboutEditor() {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    setContent(getContent());
  }, []);
  const handleSave = () => {
    if (content) {
      saveContent(content);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };
  if (!content) return null;
  return <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">About Section</h2>
        <button onClick={handleSave} className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-xl font-bold transition-colors">
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6 backdrop-blur-sm">
        <div className="space-y-2">
          <label className="text-sm font-mono text-gray-400">
            Section Title
          </label>
          <input type="text" value={content.about.title} onChange={e => setContent({
          ...content,
          about: {
            ...content.about,
            title: e.target.value
          }
        })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-mono text-gray-400">Description</label>
          <textarea rows={6} value={content.about.description} onChange={e => setContent({
          ...content,
          about: {
            ...content.about,
            description: e.target.value
          }
        })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-mono text-gray-400">
            Profile Image URL
          </label>
          <input type="text" value={content.about.imageUrl} onChange={e => setContent({
          ...content,
          about: {
            ...content.about,
            imageUrl: e.target.value
          }
        })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors" />
          <div className="mt-4 w-32 h-32 rounded-xl overflow-hidden border border-white/20">
            <img src={content.about.imageUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && <motion.div initial={{
        opacity: 0,
        y: -20,
        x: 20
      }} animate={{
        opacity: 1,
        y: 0,
        x: 0
      }} exit={{
        opacity: 0,
        y: -20,
        x: 20
      }} className="fixed top-24 right-8 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 font-bold z-50">
            <Check size={20} />
            Saved Successfully
          </motion.div>}
      </AnimatePresence>
    </div>;
}