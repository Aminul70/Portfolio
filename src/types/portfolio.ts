export type Mode = 'dev' | 'edit';
export interface SkillNode {
  id: string;
  label: string;
  category: 'dev' | 'edit' | 'core';
  x: number;
  y: number;
  connections: string[];
  proficiency?: number;
}
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  type: 'dev' | 'edit';
  link?: string;
}