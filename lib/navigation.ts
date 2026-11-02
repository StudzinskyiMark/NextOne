import { BookOpen, Home, type LucideIcon, Plus } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
  isAccent?: boolean;
}

// Single source of truth for all app navigation
export const navigationConfig: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
    exact: true, // Highlight only when the path is exactly '/'
  },
  {
    title: 'Blog',
    href: '/blog',
    icon: BookOpen,
    // No `exact`: the tab stays active on post pages too (e.g. /blog/123)
  },
  {
    title: 'Publish',
    href: '/publish',
    icon: Plus,
    isAccent: true, // Visually emphasized item (CTA)
  },
];
