import { LucideIcon } from 'lucide-react';

export type Language = 'en' | 'bn';

export interface MenuItem {
  id: string;
  label: string;
  labelBn: string;
  icon?: LucideIcon;
  path?: string;
  subItems?: MenuItem[];
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  subject: string;
  phone: string;
  status: 'Active' | 'Inactive';
}

export interface Student {
  id: string;
  roll: number;
  name: string;
  class: string;
  section: string;
  guardianPhone: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  status: 'Active' | 'Inactive';
}

export interface ThemeConfig {
  darkMode: boolean;
  primaryColor: string;
  accentColor: string;
}

export interface GenericData {
  id: string;
  [key: string]: any;
}