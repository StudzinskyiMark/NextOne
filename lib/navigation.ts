import { BookOpen, Home, type LucideIcon, Plus } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
  isAccent?: boolean;
}

// Єдине джерело правди для всієї навігації в додатку
export const navigationConfig: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
    exact: true, // Підсвічувати тільки коли шлях строго дорівнює '/'
  },
  {
    title: 'Blog',
    href: '/blog',
    icon: BookOpen,
    // exact не потрібен, бо для постів (напр. /blog/123) вкладка теж має бути активною
  },
  {
    title: 'Publish',
    href: '/publish',
    icon: Plus,
    isAccent: true, // Прапорець для візуального виділення (CTA)
  },
];
