import React, { useEffect, useState } from 'react';
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
  return <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Contact & Socials</h2>
        <button onClick={handleSave} className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-xl font-bold transition-colors">
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6 backdrop-blur-sm">
        <div className="space-y-2">
          <label className="text-sm font-mono text-gray-400">
            CV Download URL
          </label>
          <input type="text" value={content.contact.cvUrl} onChange={e => setContent({
          ...content,
          contact: {
            ...content.contact,
            cvUrl: e.target.value
          }
        })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors" />
        </div>

        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Social Links</h3>
            <button onClick={addSocialLink} className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300">
              <Plus size={16} /> Add Link
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {content.contact.socialLinks.map((link, index) => <div key={link.id} className="bg-black/20 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-gray-500">
                      Name
                    </label>
                    <input type="text" value={link.name} onChange={e => updateSocialLink(index, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/10 px-2 py-1 text-white focus:border-cyan-500 outline-none text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-gray-500">
                      Icon Name
                    </label>
                    <input type="text" value={link.iconName} onChange={e => updateSocialLink(index, 'iconName', e.target.value)} className="w-full bg-transparent border-b border-white/10 px-2 py-1 text-white focus:border-cyan-500 outline-none text-sm" placeholder="e.g. Github, Twitter" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-mono text-gray-500">
                      URL
                    </label>
                    <input type="text" value={link.href} onChange={e => updateSocialLink(index, 'href', e.target.value)} className="w-full bg-transparent border-b border-white/10 px-2 py-1 text-gray-400 focus:border-cyan-500 outline-none text-sm font-mono" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input type="color" value={link.color} onChange={e => updateSocialLink(index, 'color', e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none" />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer select-none">
                    <input type="checkbox" checked={link.disabled} onChange={e => updateSocialLink(index, 'disabled', e.target.checked)} className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500 bg-transparent" />
                    Disabled
                  </label>
                  <button onClick={() => removeSocialLink(index)} className="text-gray-500 hover:text-red-400 p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>)}
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