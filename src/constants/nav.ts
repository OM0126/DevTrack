import { List } from 'lucide-react';

export interface SidebarItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
}

export const sidebarItems: SidebarItem[] = [
  { path: '/', label: "Today's Schedule", icon: List },
];
