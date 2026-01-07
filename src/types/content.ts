import { LucideIcon } from 'lucide-react';
export interface HeroContent {
  name: string;
  subtitle: string;
  typewriterPhrases: string[];
  ctaText: string;
}
export interface AboutContent {
  title: string;
  description: string;
  imageUrl: string;
}
export interface ProjectItem {
  id: string;
  image: string;
  title: string;
  description?: string;
  techStack?: string;
  projectLink?: string;
}
export interface ProjectCategory {
  title: string;
  gradient: string;
  logoUrl?: string;
  projects: ProjectItem[];
}
export interface SocialLink {
  id: string;
  name: string;
  iconName: string; // Store icon name as string for persistence
  href: string;
  color: string;
  disabled: boolean;
}
export interface ContactContent {
  socialLinks: SocialLink[];
  cvUrl: string;
}
export interface FooterContent {
  terminalQuote: string;
  copyrightText: string;
}
export interface PortfolioContent {
  hero: HeroContent;
  about: AboutContent;
  projects: ProjectCategory[];
  contact: ContactContent;
  footer: FooterContent;
}