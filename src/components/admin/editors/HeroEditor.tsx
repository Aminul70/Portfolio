import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Check } from 'lucide-react';
import { getContent, saveContent } from '../../../lib/contentStore';
import { PortfolioContent } from '../../../types/content';
export function HeroEditor() {
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
  return <div className="h-full flex flex-col pt-2 font-['Segoe_UI',sans-serif]">
    <div className="px-4 pb-2 border-b border-white/10 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-white">Hero Section Configuration</h2>
    </div>

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="space-y-1">
        <label className="text-xs text-gray-400">Display Name</label>
        <input
          type="text"
          value={content.hero.name}
          onChange={e => setContent({ ...content, hero: { ...content.hero, name: e.target.value } })}
          className="w-full bg-black/40 border border-white/10 rounded-sm px-2 py-1.5 text-white text-sm focus:border-cyan-500 outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-400">Subtitle</label>
        <input
          type="text"
          value={content.hero.subtitle}
          onChange={e => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
          className="w-full bg-black/40 border border-white/10 rounded-sm px-2 py-1.5 text-white text-sm focus:border-cyan-500 outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-400">Typewriter Phrases (One per line)</label>
        <textarea
          rows={6}
          value={content.hero.typewriterPhrases.join('\n')}
          onChange={e => setContent({ ...content, hero: { ...content.hero, typewriterPhrases: e.target.value.split('\n') } })}
          className="w-full bg-black/40 border border-white/10 rounded-sm px-2 py-1.5 text-white text-sm focus:border-cyan-500 outline-none font-mono resize-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-400">CTA Button Text</label>
        <input
          type="text"
          value={content.hero.ctaText}
          onChange={e => setContent({ ...content, hero: { ...content.hero, ctaText: e.target.value } })}
          className="w-full bg-black/40 border border-white/10 rounded-sm px-2 py-1.5 text-white text-sm focus:border-cyan-500 outline-none"
        />
      </div>
    </div>

    {/* Bottom Toolbar */}
    <div className="h-12 border-t border-white/10 bg-black/20 flex items-center justify-end px-4 gap-2">
      <button
        onClick={handleSave}
        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-1.5 rounded-sm text-xs font-medium transition-colors shadow-sm"
      >
        <Save size={14} />
        Save Changes
      </button>
    </div>

    {/* Success Toast */}
    <AnimatePresence>
      {showToast && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="fixed bottom-14 right-4 bg-green-600 text-white px-3 py-1.5 rounded-sm shadow-lg flex items-center gap-2 text-xs font-medium z-50">
        <Check size={14} />
        Saved Successfully
      </motion.div>}
    </AnimatePresence>
  </div>;
}