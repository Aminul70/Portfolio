import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Check, Plus, Trash2 } from 'lucide-react';
import { getContent, saveContent } from '../../../lib/contentStore';
import { PortfolioContent, SocialLink } from '../../../types/content';
export function ContactEditor() {
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
  const addSocialLink = () => {
    if (!content) return;
    const newLink: SocialLink = {
      id: `social-${Date.now()}`,
      name: 'New Link',
      iconName: 'Link',
      href: '#',
      color: '#ffffff',
      disabled: false
    };
    setContent({
      ...content,
      contact: {
        ...content.contact,
        socialLinks: [...content.contact.socialLinks, newLink]
      }
    });
  };
  const removeSocialLink = (index: number) => {
    if (!content) return;
    const newLinks = [...content.contact.socialLinks];
    newLinks.splice(index, 1);
    setContent({
      ...content,
      contact: {
        ...content.contact,
        socialLinks: newLinks
      }
    });
  };
  const updateSocialLink = (index: number, field: keyof SocialLink, value: any) => {
    if (!content) return;
    const newLinks = [...content.contact.socialLinks];
    newLinks[index] = {
      ...newLinks[index],
      [field]: value
    };
    setContent({
      ...content,
      contact: {
        ...content.contact,
        socialLinks: newLinks
      }
    });
  };
  if (!content) return null;
  return <div className="h-full flex flex-col pt-2 font-['Segoe_UI',sans-serif]">
    <div className="px-4 pb-2 border-b border-white/10 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-white">Contact & Socials</h2>
    </div>

    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      <div className="space-y-1">
        <label className="text-xs text-gray-400">CV Download URL</label>
        <input
          type="text"
          value={content.contact.cvUrl}
          onChange={e => setContent({ ...content, contact: { ...content.contact, cvUrl: e.target.value } })}
          className="w-full bg-black/40 border border-white/10 rounded-sm px-2 py-1.5 text-white text-sm focus:border-cyan-500 outline-none"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-1">
          <h3 className="text-sm font-semibold text-gray-300">Social Links</h3>
          <button onClick={addSocialLink} className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
            <Plus size={14} /> Add Link
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {content.contact.socialLinks.map((link, index) => (
            <div key={link.id} className="bg-black/20 border border-white/10 rounded-sm p-3 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase tracking-wider">Name</label>
                  <input type="text" value={link.name} onChange={e => updateSocialLink(index, 'name', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm px-2 py-1 text-white text-xs focus:border-cyan-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 uppercase tracking-wider">Icon</label>
                  <input type="text" value={link.iconName} onChange={e => updateSocialLink(index, 'iconName', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm px-2 py-1 text-white text-xs focus:border-cyan-500 outline-none" placeholder="e.g. Github" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase tracking-wider">URL</label>
                <input type="text" value={link.href} onChange={e => updateSocialLink(index, 'href', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-sm px-2 py-1 text-gray-300 text-xs focus:border-cyan-500 outline-none font-mono" />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 uppercase">Color:</span>
                    <input type="color" value={link.color} onChange={e => updateSocialLink(index, 'color', e.target.value)} className="w-5 h-5 rounded-sm cursor-pointer bg-transparent border-none p-0" />
                  </div>
                  <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer select-none">
                    <input type="checkbox" checked={link.disabled} onChange={e => updateSocialLink(index, 'disabled', e.target.checked)} className="rounded-sm border-gray-600 text-cyan-500 focus:ring-cyan-500 bg-transparent" />
                    Disabled
                  </label>
                </div>
                <button onClick={() => removeSocialLink(index)} className="text-gray-500 hover:text-red-400 transition-colors p-1" title="Remove Link">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
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