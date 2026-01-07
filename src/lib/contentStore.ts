import { PortfolioContent } from '../types/content';

// Default content matching existing Portfolio.tsx
const defaultContent: PortfolioContent = {
  hero: {
    name: 'Aminul Islam',
    subtitle: 'Next-Gen Developer & Video Editor',
    typewriterPhrases: ['Building scalable applications', 'Crafting visual stories', 'Merging code with creativity', 'Driving AI-powered development', 'Mastering the art of the code and the cut', 'Crafting videos that tell a story'],
    ctaText: 'Contact Me'
  },
  about: {
    title: 'About Me',
    description: 'I am a passionate developer and video editor with a keen eye for detail and a drive for innovation. My journey spans across web development, creative coding, and visual storytelling.',
    imageUrl: "/096BCAD2-D6C1-45CB-BE81-34F690C0C103.png"
  },
  projects: [{
    title: 'Web Development',
    gradient: 'linear-gradient(135deg, #00FFFF, #0088FF)',
    projects: [{
      id: 'w1',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      title: 'Toiral Platform'
    }, {
      id: 'w2',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
      title: 'E-Commerce Dashboard'
    }, {
      id: 'w3',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      title: 'React Component Library'
    }, {
      id: 'w4',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
      title: 'TypeScript API'
    }, {
      id: 'w5',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800',
      title: 'Next.js Portfolio'
    }]
  }, {
    title: 'Video Editing',
    gradient: 'linear-gradient(135deg, #FF006E, #FF4D94)',
    projects: [{
      id: 'v1',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
      title: 'Brand Commercial'
    }, {
      id: 'v2',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
      title: 'Music Video Edit'
    }, {
      id: 'v3',
      image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&q=80&w=800',
      title: 'Documentary Short'
    }, {
      id: 'v4',
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800',
      title: 'Product Showcase'
    }, {
      id: 'v5',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
      title: 'Event Highlight Reel'
    }]
  }, {
    title: 'Toiral Projects',
    gradient: 'linear-gradient(135deg, #FFFFFF, #E0E0E0)',
    logoUrl: "/toiral-2.png",
    projects: [{
      id: 't1',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      title: 'Client Portal'
    }, {
      id: 't2',
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19fe4af0?auto=format&fit=crop&q=80&w=800',
      title: 'Agency Website'
    }, {
      id: 't3',
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=800',
      title: 'Team Dashboard'
    }, {
      id: 't4',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
      title: 'Project Manager'
    }]
  }, {
    title: 'Graphics Design',
    gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
    projects: [{
      id: 'g1',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
      title: 'Brand Identity'
    }, {
      id: 'g2',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
      title: 'Poster Design'
    }, {
      id: 'g3',
      image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=800',
      title: 'Social Media Graphics'
    }, {
      id: 'g4',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      title: 'Logo Design'
    }]
  }, {
    title: 'Creative Tech',
    gradient: 'linear-gradient(135deg, #F7B733, #FC4A1A)',
    projects: [{
      id: 'c1',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
      title: 'Interactive Installation'
    }, {
      id: 'c2',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
      title: 'Generative Art'
    }, {
      id: 'c3',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800',
      title: 'WebGL Experience'
    }]
  }, {
    title: 'UI/UX Design',
    gradient: 'linear-gradient(135deg, #00C6FF, #0072FF)',
    projects: [{
      id: 'u1',
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=800',
      title: 'Mobile App Design'
    }, {
      id: 'u2',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800',
      title: 'Dashboard Interface'
    }, {
      id: 'u3',
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=800',
      title: 'User Research'
    }, {
      id: 'u4',
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19fe4af0?auto=format&fit=crop&q=80&w=800',
      title: 'Wireframing'
    }]
  }],
  contact: {
    socialLinks: [{
      id: 'github',
      name: 'GitHub',
      iconName: 'Github',
      href: 'https://github.com/Aminul70',
      color: '#ffffff',
      disabled: false
    }, {
      id: 'instagram',
      name: 'Instagram',
      iconName: 'Instagram',
      href: 'https://www.instagram.com/noob_aminul',
      color: '#E4405F',
      disabled: false
    }, {
      id: 'facebook',
      name: 'Facebook',
      iconName: 'Facebook',
      href: 'https://www.facebook.com/noob.aminul',
      color: '#1877F2',
      disabled: false
    }, {
      id: 'linkedin',
      name: 'LinkedIn',
      iconName: 'Linkedin',
      href: '#',
      color: '#6B7280',
      disabled: true
    }, {
      id: 'whatsapp',
      name: 'WhatsApp',
      iconName: 'MessageCircle',
      href: 'https://wa.me/8801804261696',
      color: '#25D366',
      disabled: false
    }, {
      id: 'phone',
      name: 'Phone',
      iconName: 'Phone',
      href: 'tel:+8801804261696',
      color: '#00FFFF',
      disabled: false
    }, {
      id: 'email',
      name: 'Email',
      iconName: 'Mail',
      href: 'mailto:aminul.ethos@gmail.com',
      color: '#00FFFF',
      disabled: false
    }],
    cvUrl: 'https://drive.google.com/uc?export=download&id=1DP8emppHXdDrXhzcSPLHkDuYiMN6_rMm'
  },
  footer: {
    terminalQuote: 'Innovation thrives where code meets creativity',
    copyrightText: '© 2026 MD Aminul Islam • All Rights Reserved'
  }
};
const STORAGE_KEY = 'amin-control-content';
export function getContent(): PortfolioContent {
  if (typeof window === 'undefined') return defaultContent;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultContent));
    return defaultContent;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse stored content', e);
    return defaultContent;
  }
}
export function saveContent(content: PortfolioContent): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}
export function resetContent(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultContent));
}