import React, { useState, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Mail, Phone, Download } from 'lucide-react';
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ContactModal({
  isOpen,
  onClose
}: ContactModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const contactOptions = [{
    icon: MessageCircle,
    label: 'WhatsApp',
    href: 'https://wa.me/8801804261696',
    color: '#25D366',
    description: 'Chat on WhatsApp'
  }, {
    icon: Mail,
    label: 'Email',
    href: 'mailto:aminul.ethos@gmail.com',
    color: '#00FFFF',
    description: 'Send an email'
  }, {
    icon: Phone,
    label: 'Call',
    href: 'tel:+8801804261696',
    color: '#00FFFF',
    description: 'Give me a call'
  }];
  const handleDownloadCV = async () => {
    setIsDownloading(true);
    // Wait 1 second to show loading state
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Trigger Google Drive download
    window.location.href = 'https://drive.google.com/uc?export=download&id=1DP8emppHXdDrXhzcSPLHkDuYiMN6_rMm';
    setIsDownloading(false);
  };
  return <AnimatePresence>
      {isOpen && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} transition={{
      duration: 0.2
    }} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-black/80" onClick={onClose}>
          <motion.div initial={{
        scale: 0.9,
        opacity: 0,
        y: 20
      }} animate={{
        scale: 1,
        opacity: 1,
        y: 0
      }} exit={{
        scale: 0.9,
        opacity: 0,
        y: 20
      }} transition={{
        duration: 0.3,
        ease: 'easeOut'
      }} className="relative bg-white/10 backdrop-blur-2xl border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200">
              <X size={24} />
            </button>

            {/* Heading */}
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
              Get In Touch
            </h2>
            <p className="text-gray-400 mb-8">
              Choose your preferred way to connect
            </p>

            {/* Contact Options */}
            <div className="space-y-4">
              {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return <motion.a key={option.label} href={option.href} target="_blank" rel="noopener noreferrer" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: index * 0.1 + 0.2
            }} whileHover={{
              scale: 1.02,
              x: 4
            }} whileTap={{
              scale: 0.98
            }} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 group">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300" style={{
                backgroundColor: `${option.color}20`,
                border: `2px solid ${option.color}40`
              }}>
                      <Icon size={24} style={{
                  color: option.color
                }} className="group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-0.5">
                        {option.label}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {option.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="text-gray-500 group-hover:text-cyan-400 transition-colors duration-300">
                      →
                    </div>
                  </motion.a>;
          })}
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* CV Download Button */}
            <motion.button onClick={handleDownloadCV} disabled={isDownloading} whileTap={!isDownloading ? {
          scale: 0.95
        } : {}} animate={isDownloading ? {
          scale: [1, 1.05, 1]
        } : {}} transition={{
          duration: 0.3
        }} className="w-full bg-white/10 backdrop-blur-xl border border-white/20 hover:border-cyan-400 rounded-lg px-10 py-4 text-white font-medium transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
              <Download size={20} className={isDownloading ? 'animate-bounce' : ''} />
              <span>
                {isDownloading ? 'Downloading' : 'Download CV'}
                {isDownloading && <motion.span animate={{
              opacity: [0, 1, 0]
            }} transition={{
              duration: 1.5,
              repeat: Infinity
            }}>
                    ...
                  </motion.span>}
              </span>
            </motion.button>
          </motion.div>
        </motion.div>}
    </AnimatePresence>;
}