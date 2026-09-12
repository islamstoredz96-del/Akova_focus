import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';

// ============================================
// Types & Constants
// ============================================

const SETTINGS_STORAGE_KEY = 'app_settings_v1';
const TOAST_DURATION = 4000;

const defaultSettings = {
  general: {
    language: 'ar',
    timezone: 'Asia/Riyadh',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    startupPage: 'dashboard',
    compactMode: false,
    animationsEnabled: true,
  },
  appearance: {
    theme: 'system', // 'light', 'dark', 'system'
    primaryColor: '#00695C',
    accentColor: '#FFB300',
    fontSize: 'medium', // 'small', 'medium', 'large'
    borderRadius: 'medium', // 'none', 'small', 'medium', 'large'
    density: 'comfortable', // 'compact', 'comfortable', 'spacious'
    reducedMotion: false,
    highContrast: false,
  },
  notifications: {
    emailEnabled: true,
    pushEnabled: true,
    inAppEnabled: true,
    marketingEmails: false,
    securityAlerts: true,
    weeklyDigest: true,
    soundEnabled: true,
    desktopPermission: 'default', // 'default', 'granted', 'denied'
  },
  privacy: {
    profileVisibility: 'private', // 'public', 'team', 'private'
    activityTracking: true,
    analyticsOptIn: false,
    crashReporting: true,
    dataSharing: false,
    twoFactorEnabled: false,
    sessionTimeout: 30, // minutes
  },
  data: {
    autoSave: true,
    autoSaveInterval: 5, // minutes
    cacheSize: 500, // MB
    exportFormat: 'json', // 'json', 'csv', 'pdf'
    backupEnabled: true,
    backupFrequency: 'daily', // 'daily', 'weekly', 'monthly'
    retentionPeriod: 90, // days
  },
  advanced: {
    developerMode: false,
    debugLogging: false,
    experimentalFeatures: false,
    apiTimeout: 30000, // ms
    maxRetries: 3,
    customCss: '',
    webhookUrl: '',
  },
};

const categories = [
  { id: 'general', label: 'عام', icon: 'general', description: 'إعدادات اللغة والمنطقة والسلوك العام' },
  { id: 'appearance', label: 'المظهر', icon: 'appearance', description: 'الثيم والألوان والخطوط والتخطيط' },
  { id: 'notifications', label: 'الإشعارات', icon: 'notifications', description: 'تفضيلات الإشعارات والقنوات' },
  { id: 'privacy', label: 'الخصوصية', icon: 'privacy', description: 'الرؤية والتتبع والأمان' },
  { id: 'data', label: 'البيانات', icon: 'data', description: 'الحفظ التلقائي والنسخ الاحتياطي والتخزين' },
  { id: 'advanced', label: 'متقدم', icon: 'advanced', description: 'خيارات المطور والميزات التجريبية' },
];

const languageOptions = [
  { value: 'ar', label: 'العربية', native: 'العربية', dir: 'rtl' },
  { value: 'en', label: 'English', native: 'English', dir: 'ltr' },
  { value: 'fr', label: 'Français', native: 'Français', dir: 'ltr' },
  { value: 'es', label: 'Español', native: 'Español', dir: 'ltr' },
  { value: 'de', label: 'Deutsch', native: 'Deutsch', dir: 'ltr' },
];

const timezoneOptions = [
  'Asia/Riyadh', 'Asia/Dubai', 'Asia/Kuwait', 'Asia/Qatar', 'Asia/Bahrain',
  'Africa/Cairo', 'Asia/Amman', 'Asia/Beirut', 'Asia/Damascus', 'Asia/Baghdad',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'America/New_York', 'America/Los_Angeles',
  'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Singapore', 'Australia/Sydney', 'UTC',
];

const dateFormatOptions = [
  { value: 'DD/MM/YYYY', label: '31/12/2024' },
  { value: 'MM/DD/YYYY', label: '12/31/2024' },
  { value: 'YYYY-MM-DD', label: '2024-12-31' },
  { value: 'DD MMM YYYY', label: '31 كانون الأول 2024' },
  { value: 'MMMM D, YYYY', label: 'December 31, 2024' },
];

const fontSizeOptions = [
  { value: 'small', label: 'صغير (13px)', scale: 0.875 },
  { value: 'medium', label: 'متوسط (15px)', scale: 1 },
  { value: 'large', label: 'كبير (17px)', scale: 1.125 },
];

const borderRadiusOptions = [
  { value: 'none', label: 'بدون زوايا', radius: '0' },
  { value: 'small', label: 'صغير (4px)', radius: '4px' },
  { value: 'medium', label: 'متوسط (8px)', radius: '8px' },
  { value: 'large', label: 'كبير (12px)', radius: '12px' },
];

const densityOptions = [
  { value: 'compact', label: 'مضغوط', spacing: 0.75 },
  { value: 'comfortable', label: 'مريح', spacing: 1 },
  { value: 'spacious', label: 'واسع', spacing: 1.5 },
];

const exportFormatOptions = [
  { value: 'json', label: 'JSON', description: 'للنسخ الاحتياطي والاستيراد' },
  { value: 'csv', label: 'CSV', description: 'لجداول البيانات' },
  { value: 'pdf', label: 'PDF', description: 'للتقارير والطباعة' },
];

const backupFrequencyOptions = [
  { value: 'daily', label: 'يومي' },
  { value: 'weekly', label: 'أسبوعي' },
  { value: 'monthly', label: 'شهري' },
];

const themeOptions = [
  { value: 'light', label: 'فاتح', icon: '☀️' },
  { value: 'dark', label: 'داكن', icon: '🌙' },
  { value: 'system', label: 'النظام', icon: '💻' },
];

const profileVisibilityOptions = [
  { value: 'public', label: 'عام', description: 'الجميع يمكنه رؤية ملفك الشخصي' },
  { value: 'team', label: 'الفريق', description: 'أعضاء الفريق فقط' },
  { value: 'private', label: 'خاص', description: 'أنت فقط' },
];

const startupPageOptions = [
  { value: 'dashboard', label: 'لوحة التحكم' },
  { value: 'tasks', label: 'المهام' },
  { value: 'calendar', label: 'التقويم' },
  { value: 'reports', label: 'التقارير' },
  { value: 'settings', label: 'الإعدادات' },
];

// ============================================
// Icons (Inline SVG Components)
// ============================================

const Icons = {
  general: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  appearance: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  notifications: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  privacy: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  data: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  advanced: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <polyline points="20 17 14 11 20 5" />
      <line x1="14" y1="11" x2="10" y2="11" />
    </svg>
  ),
  chevronRight: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  chevronDown: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  check: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  save: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  reset: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  ),
  sun: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  moon: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  monitor: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  globe: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  bell: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  bellOff: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <path d="M18.63 13A17.89 17.89 0 0 1 18 8" />
      <path d="M6.26 6.26A17.89 17.89 0 0 0 6 8c0 7-3 9-3 9h14" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  shield: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  database: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  code: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  bug: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6 12a6 6 0 0 0-3 5.197" />
      <path d="M18 12a6 6 0 0 1 3 5.197" />
      <path d="M6 6a6 6 0 0 1 3-5.197" />
      <path d="M18 6a6 6 0 0 0-3-5.197" />
    </svg>
  ),
  download: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  upload: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  trash: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
  info: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  alert: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  success: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  eye: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  eyeOff: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  key: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3" />
    </svg>
  ),
  clock: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  palette: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M13.5 9a4.5 4.5 0 0 1 4.5 4.5" />
      <path d="M18 15.5a4.5 4.5 0 0 1-4.5 4.5" />
      <path d="M6 15.5a4.5 4.5 0 0 0 4.5 4.5" />
    </svg>
  ),
  type: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
  layout: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  mail: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  smartphone: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  volume: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),
  volumeX: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ),
  users: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  user: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  lock: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  activity: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  chart: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  share: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  refresh: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  ),
  terminal: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  flask: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2v7.31" />
      <path d="M14 2v7.31" />
      <path d="M10 16a6 6 0 0 1 12 0" />
      <path d="M10 2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-4" />
    </svg>
  ),
  link: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  close: ({ className = '' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

// ============================================
// Settings Context
// ============================================

const SettingsContext = createContext(null);

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
        if (stored) {
          return { ...defaultSettings, ...JSON.parse(stored) };
        }
      } catch (e) {
        console.warn('Failed to parse settings:', e);
      }
    }
    return defaultSettings;
  });

  const [hasHydrated, setHasHydrated] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    setHasHydrated(true);
    // Apply theme on mount
    applyTheme(settings.appearance.theme);
    // Apply font size
    applyFontSize(settings.appearance.fontSize);
    // Apply density
    applyDensity(settings.appearance.density);
    // Apply border radius
    applyBorderRadius(settings.appearance.borderRadius);
    // Apply reduced motion
    applyReducedMotion(settings.appearance.reducedMotion);
    // Apply high contrast
    applyHighContrast(settings.appearance.highContrast);
    // Apply direction
    applyDirection(settings.general.language);
  }, []);

  const applyTheme = useCallback((theme) => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, []);

  const applyFontSize = useCallback((size) => {
    if (typeof window === 'undefined') return;
    const scale = fontSizeOptions.find(f => f.value === size)?.scale || 1;
    document.documentElement.style.fontSize = `${16 * scale}px`;
  }, []);

  const applyDensity = useCallback((density) => {
    if (typeof window === 'undefined') return;
    const spacing = densityOptions.find(d => d.value === density)?.spacing || 1;
    document.documentElement.style.setProperty('--spacing-multiplier', spacing);
  }, []);

  const applyBorderRadius = useCallback((radius) => {
    if (typeof window === 'undefined') return;
    const value = borderRadiusOptions.find(r => r.value === radius)?.radius || '8px';
    document.documentElement.style.setProperty('--border-radius', value);
  }, []);

  const applyReducedMotion = useCallback((enabled) => {
    if (typeof window === 'undefined') return;
    document.documentElement.classList.toggle('reduce-motion', enabled);
  }, []);

  const applyHighContrast = useCallback((enabled) => {
    if (typeof window === 'undefined') return;
    document.documentElement.classList.toggle('high-contrast', enabled);
  }, []);

  const applyDirection = useCallback((language) => {
    if (typeof window === 'undefined') return;
    const lang = languageOptions.find(l => l.value === language);
    document.documentElement.dir = lang?.dir || 'rtl';
    document.documentElement.lang = language;
  }, []);

  const updateSettings = useCallback((category, newValues) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        [category]: { ...prev[category], ...newValues },
      };
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save settings:', e);
      }
      return updated;
    });
  }, []);

  const resetCategory = useCallback((category) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        [category]: { ...defaultSettings[category] },
      };
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save settings:', e);
      }
      return updated;
    });
    showToast('success', 'تم إعادة التعيين', `تم إعادة إعدادات ${getCategoryLabel(category)} إلى القيم الافتراضية`);
  }, []);

  const resetAll = useCallback(() => {
    setSettings(defaultSettings);
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
    showToast('success', 'تم إعادة التعيين', 'تم إعادة جميع الإعدادات إلى القيم الافتراضية');
    // Reapply all defaults
    applyTheme(defaultSettings.appearance.theme);
    applyFontSize(defaultSettings.appearance.fontSize);
    applyDensity(defaultSettings.appearance.density);
    applyBorderRadius(defaultSettings.appearance.borderRadius);
    applyReducedMotion(defaultSettings.appearance.reducedMotion);
    applyHighContrast(defaultSettings.appearance.highContrast);
    applyDirection(defaultSettings.general.language);
  }, [applyTheme, applyFontSize, applyDensity, applyBorderRadius, applyReducedMotion, applyHighContrast, applyDirection]);

  const exportSettings = useCallback(() => {
    const data = JSON.stringify(settings, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `settings-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('success', 'تم التصدير', 'تم حفظ نسخة احتياطية من الإعدادات');
  }, [settings]);

  const importSettings = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        // Validate structure
        const validated = { ...defaultSettings };
        Object.keys(defaultSettings).forEach(cat => {
          if (imported[cat] && typeof imported[cat] === 'object') {
            validated[cat] = { ...defaultSettings[cat], ...imported[cat] };
          }
        });
        setSettings(validated);
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(validated));
        showToast('success', 'تم الاستيراد', 'تم استيراد الإعدادات بنجاح');
        // Reapply
        applyTheme(validated.appearance.theme);
        applyFontSize(validated.appearance.fontSize);
        applyDensity(validated.appearance.density);
        applyBorderRadius(validated.appearance.borderRadius);
        applyReducedMotion(validated.appearance.reducedMotion);
        applyHighContrast(validated.appearance.highContrast);
        applyDirection(validated.general.language);
      } catch (err) {
        showToast('error', 'خطأ في الاستيراد', 'ملف الإعدادات غير صالح');
      }
    };
    reader.readAsText(file);
  }, [applyTheme, applyFontSize, applyDensity, applyBorderRadius, applyReducedMotion, applyHighContrast, applyDirection]);

  const showToast = useCallback((type, title, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, TOAST_DURATION);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const value = {
    settings,
    updateSettings,
    resetCategory,
    resetAll,
    exportSettings,
    importSettings,
    showToast,
    dismissToast,
    toasts,
    hasHydrated,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}

function getCategoryLabel(id) {
  return categories.find(c => c.id === id)?.label || id;
}

// ============================================
// UI Components
// ============================================

function Toast({ toast, onDismiss }) {
  const bgColors = {
    success: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800',
    warning: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800',
    info: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800',
  };
  const iconColors = {
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
    warning: 'text-amber-600 dark:text-amber-400',
    info: 'text-blue-600 dark:text-blue-400',
  };
  const icons = {
    success: Icons.success,
    error: Icons.alert,
    warning: Icons.alert,
    info: Icons.info,
  };

  const Icon = icons[toast.type];

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg animate-slide-in ${bgColors[toast.type]}`}
      role="alert"
      aria-live="polite"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColors[toast.type]}`} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-gray-100">{toast.title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
        aria-label="إغلاق"
      >
        <Icons.close className="w-4 h-4" />
      </button>
    </div>
  );
}

function Toaster({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50 flex flex-col gap-2" aria-live="polite">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function SectionHeader({ title, description, icon: Icon }) {
  return (
    <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ label, description, children, className = '' }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0 ${className}`}>
      <div className="flex-1 min-w-0">
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">{label}</label>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-3 sm:ml-4 flex-shrink-0">
        {children}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, disabled, id, ariaLabel }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
        checked ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

function Select({ value, onChange, options, disabled, id, className = '', placeholder }) {
  return (
    <select
      id={id}
      value={value}
      onChange={e => !disabled && onChange(e.target.value)}
      disabled={disabled}
      className={`w-full sm:w-48 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed appearance-none bg-no-repeat bg-right pr-10 ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 0.5rem center',
        backgroundSize: '1.5em 1.5em',
      }}
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function Slider({ value, onChange, min, max, step, disabled, id, ariaLabel, showValue = true }) {
  return (
    <div className="flex items-center gap-3 w-full sm:w-64">
      <input
        type="range"
        id={id}
        value={value}
        onChange={e => !disabled && onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-label={ariaLabel}
        className={`w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        style={{ accentColor: '#00695C' }}
      />
      {showValue && (
        <span className="text-sm font-mono text-gray-600 dark:text-gray-400 w-12 text-right" aria-hidden="true">
          {value}
        </span>
      )}
    </div>
  );
}

function TextInput({ value, onChange, type = 'text', placeholder, disabled, id, className = '', ariaLabel }) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={e => !disabled && onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`w-full sm:w-64 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    />
  );
}

function TextArea({ value, onChange, placeholder, disabled, id, rows = 3, className = '', ariaLabel }) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={e => !disabled && onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      aria-label={ariaLabel}
      rows={rows}
      className={`w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed font-mono ${className}`}
    />
  );
}

function ColorPicker({ value, onChange, disabled, id, label }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        id={id}
        value={value}
        onChange={e => !disabled && onChange(e.target.value)}
        disabled={disabled}
        aria-label={label}
        className="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer p-0 bg-none"
        style={{ appearance: 'none', WebkitAppearance: 'none' }}
      />
      <TextInput
        value={value}
        onChange={onChange}
        disabled={disabled}
        id={`${id}-text`}
        className="w-28 font-mono text-xs"
        placeholder="#000000"
      />
    </div>
  );
}

function ThemeSelector({ value, onChange, disabled }) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="اختيار الثيم">
      {themeOptions.map(option => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => !disabled && onChange(option.value)}
          disabled={disabled}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
            value === option.value
              ? 'border-primary bg-primary/5 dark:bg-primary/10'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span className="text-2xl" aria-hidden="true">{option.icon}</span>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{option.label}</span>
        </button>
      ))}
    </div>
  );
}

function Card({ title, description, icon: Icon, children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-shadow hover:shadow-lg ${className}`}>
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
            {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>}
          </div>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Button({ children, onClick, variant = 'primary', disabled, loading, className = '', type = 'button', ...props }) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
    secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500',
    outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-primary',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
  );
}

function TabButton({ label, icon: Icon, active, onClick, disabled, badge }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onClick()}
      disabled={disabled}
      role="tab"
      aria-selected={active}
      className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl transition-all duration-200 ${
        active
          ? 'bg-primary/10 text-primary border-b-2 border-primary'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs font-medium">{label}</span>
      {badge && (
        <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
          {badge}
        </span>
      )}
    </button>
  );
}

// ============================================
// Category Components
// ============================================

function GeneralSettings() {
  const { settings, updateSettings } = useSettings();
  const { general } = settings;

  const handleChange = (key, value) => {
    updateSettings('general', { [key]: value });
    if (key === 'language') {
      applyDirection(value);
    }
  };

  const applyDirection = (language) => {
    if (typeof window === 'undefined') return;
    const lang = languageOptions.find(l => l.value === language);
    document.documentElement.dir = lang?.dir || 'rtl';
    document.documentElement.lang = language;
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="عام"
        description="إعدادات اللغة والمنطقة والسلوك العام للتطبيق"
        icon={Icons.general}
      />

      <SettingRow
        label="اللغة"
        description="اختر لغة واجهة المستخدم"
      >
        <Select
          value={general.language}
          onChange={v => handleChange('language', v)}
          options={languageOptions}
          id="language"
        />
      </SettingRow>

      <SettingRow
        label="المنطقة الزمنية"
        description="تستخدم للتواريخ والأوقات المجدولة"
      >
        <Select
          value={general.timezone}
          onChange={v => handleChange('timezone', v)}
          options={timezoneOptions.map(t => ({ value: t, label: t }))}
          id="timezone"
        />
      </SettingRow>

      <SettingRow
        label="تنسيق التاريخ"
        description="كيفية عرض التواريخ في التطبيق"
      >
        <Select
          value={general.dateFormat}
          onChange={v => handleChange('dateFormat', v)}
          options={dateFormatOptions}
          id="dateFormat"
        />
      </SettingRow>

      <SettingRow
        label="تنسيق الوقت"
        description="الساعة 12 أو 24 ساعة"
      >
        <Select
          value={general.timeFormat}
          onChange={v => handleChange('timeFormat', v)}
          options={[
            { value: '12h', label: '12 ساعة (ص/م)' },
            { value: '24h', label: '24 ساعة' },
          ]}
          id="timeFormat"
        />
      </SettingRow>

      <SettingRow
        label="صفحة البدء"
        description="الصفحة التي تفتح عند تشغيل التطبيق"
      >
        <Select
          value={general.startupPage}
          onChange={v => handleChange('startupPage', v)}
          options={startupPageOptions}
          id="startupPage"
        />
      </SettingRow>

      <SettingRow
        label="الوضع المضغوط"
        description="تقليل المسافات لعرض محتوى أكثر"
      >
        <Toggle
          checked={general.compactMode}
          onChange={v => handleChange('compactMode', v)}
          id="compactMode"
          ariaLabel="تفعيل الوضع المضغوط"
        />
      </SettingRow>

      <SettingRow
        label="الرسوم المتحركة"
        description="تمكين تأثيرات الحركة والانتقالات"
      >
        <Toggle
          checked={general.animationsEnabled}
          onChange={v => handleChange('animationsEnabled', v)}
          id="animationsEnabled"
          ariaLabel="تمكين الرسوم المتحركة"
        />
      </SettingRow>
    </div>
  );
}

function AppearanceSettings() {
  const { settings, updateSettings } = useSettings();
  const { appearance } = settings;

  const handleChange = (key, value) => {
    updateSettings('appearance', { [key]: value });
    // Apply immediate side effects
    switch (key) {
      case 'theme':
        applyTheme(value);
        break;
      case 'fontSize':
        applyFontSize(value);
        break;
      case 'density':
        applyDensity(value);
        break;
      case 'borderRadius':
        applyBorderRadius(value);
        break;
      case 'reducedMotion':
        applyReducedMotion(value);
        break;
      case 'highContrast':
        applyHighContrast(value);
        break;
    }
  };

  const applyTheme = (theme) => {
    if (typeof window === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  };

  const applyFontSize = (size) => {
    if (typeof window === 'undefined') return;
    const scale = fontSizeOptions.find(f => f.value === size)?.scale || 1;
    document.documentElement.style.fontSize = `${16 * scale}px`;
  };

  const applyDensity = (density) => {
    if (typeof window === 'undefined') return;
    const spacing = densityOptions.find(d => d.value === density)?.spacing || 1;
    document.documentElement.style.setProperty('--spacing-multiplier', spacing);
  };

  const applyBorderRadius = (radius) => {
    if (typeof window === 'undefined') return;
    const value = borderRadiusOptions.find(r => r.value === radius)?.radius || '8px';
    document.documentElement.style.setProperty('--border-radius', value);
  };

  const applyReducedMotion = (enabled) => {
    if (typeof window === 'undefined') return;
    document.documentElement.classList.toggle('reduce-motion', enabled);
  };

  const applyHighContrast = (enabled) => {
    if (typeof window === 'undefined') return;
    document.documentElement.classList.toggle('high-contrast', enabled);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="المظهر"
        description="تخصيص الثيم والألوان والخطوط والتخطيط"
        icon={Icons.appearance}
      />

      <SettingRow
        label="الثيم"
        description="اختر وضع الألوان للتطبيق"
      >
        <ThemeSelector
          value={appearance.theme}
          onChange={v => handleChange('theme', v)}
        />
      </SettingRow>

      <SettingRow
        label="اللون الأساسي"
        description="اللون الرئيسي للعلامة التجارية والروابط والأزرار"
      >
        <ColorPicker
          value={appearance.primaryColor}
          onChange={v => handleChange('primaryColor', v)}
          id="primaryColor"
          label="اللون الأساسي"
        />
      </SettingRow>

      <SettingRow
        label="لون التمييز"
        description="لون ثانوي للتنبيهات والعناصر المميزة"
      >
        <ColorPicker
          value={appearance.accentColor}
          onChange={v => handleChange('accentColor', v)}
          id="accentColor"
          label="لون التمييز"
        />
      </SettingRow>

      <SettingRow
        label="حجم الخط"
        description="تغيير حجم النص في جميع أنحاء التطبيق"
      >
        <Select
          value={appearance.fontSize}
          onChange={v => handleChange('fontSize', v)}
          options={fontSizeOptions}
          id="fontSize"
        />
      </SettingRow>

      <SettingRow
        label="زوايا العناصر"
        description="مستوى استدارة الزوايا للأزرار والبطاقات"
      >
        <Select
          value={appearance.borderRadius}
          onChange={v => handleChange('borderRadius', v)}
          options={borderRadiusOptions}
          id="borderRadius"
        />
      </SettingRow>

      <SettingRow
        label="كثافة التخطيط"
        description="المسافات بين العناصر"
      >
        <Select
          value={appearance.density}
          onChange={v => handleChange('density', v)}
          options={densityOptions}
          id="density"
        />
      </SettingRow>

      <SettingRow
        label="تقليل الحركة"
        description="تقليل الرسوم المتحركة لأسباب إمكانية الوصول"
      >
        <Toggle
          checked={appearance.reducedMotion}
          onChange={v => handleChange('reducedMotion', v)}
          id="reducedMotion"
          ariaLabel="تقليل الحركة"
        />
      </SettingRow>

      <SettingRow
        label="تباين عالي"
        description="زيادة التباين لتحسين القراءة"
      >
        <Toggle
          checked={appearance.highContrast}
          onChange={v => handleChange('highContrast', v)}
          id="highContrast"
          ariaLabel="تباين عالي"
        />
      </SettingRow>
    </div>
  );
}

function NotificationsSettings() {
  const { settings, updateSettings, showToast } = useSettings();
  const { notifications } = settings;

  const handleChange = (key, value) => {
    updateSettings('notifications', { [key]: value });
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      showToast('error', 'غير مدعوم', 'المتصفح لا يدعم إشعارات سطح المكتب');
      return;
    }
    const permission = await Notification.requestPermission();
    handleChange('desktopPermission', permission);
    if (permission === 'granted') {
      showToast('success', 'تم التفعيل', 'تم السماح بالإشعارات');
      new Notification('الإشعارات مفعلة', { body: 'ستتلقى الإشعارات الآن' });
    } else {
      showToast('warning', 'تم الرفض', 'لم يتم السماح بالإشعارات');
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="الإشعارات"
        description="إدارة تفضيلات الإشعارات والقنوات"
        icon={Icons.notifications}
      />

      <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 border border-primary/20 dark:border-primary/800 mb-4">
        <div className="flex items-center gap-3">
          <Icons.bell className="w-6 h-6 text-primary flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">إشعارات سطح المكتب</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              الحالة الحالية: <span className="font-medium capitalize">{notifications.desktopPermission}</span>
            </p>
          </div>
        </div>
        {notifications.desktopPermission === 'default' && (
          <Button
            variant="primary"
            size="sm"
            className="ml-auto"
            onClick={requestNotificationPermission}
          >
            تفعيل الإشعارات
          </Button>
        )}
      </div>

      <SettingRow
        label="إشعارات البريد الإلكتروني"
        description="استقبال الإشعارات عبر البريد الإلكتروني"
      >
        <Toggle
          checked={notifications.emailEnabled}
          onChange={v => handleChange('emailEnabled', v)}
          id="emailEnabled"
          ariaLabel="إشعارات البريد الإلكتروني"
        />
      </SettingRow>

      <SettingRow
        label="إشعارات الدفع (Push)"
        description="استقبال إشعارات فورية على الجهاز"
      >
        <Toggle
          checked={notifications.pushEnabled}
          onChange={v => handleChange('pushEnabled', v)}
          id="pushEnabled"
          ariaLabel="إشعارات الدفع"
        />
      </SettingRow>

      <SettingRow
        label="الإشعارات داخل التطبيق"
        description="عرض الإشعارات في مركز الإشعارات"
      >
        <Toggle
          checked={notifications.inAppEnabled}
          onChange={v => handleChange('inAppEnabled', v)}
          id="inAppEnabled"
          ariaLabel="الإشعارات داخل التطبيق"
        />
      </SettingRow>

      <SettingRow
        label="الرسائل التسويقية"
        description="استقبال العروض والتحديثات والمنتجات الجديدة"
      >
        <Toggle
          checked={notifications.marketingEmails}
          onChange={v => handleChange('marketingEmails', v)}
          id="marketingEmails"
          ariaLabel="الرسائل التسويقية"
        />
      </SettingRow>

      <SettingRow
        label="تنبيهات الأمان"
        description="إشعارات هامة حول أمان الحساب"
      >
        <Toggle
          checked={notifications.securityAlerts}
          onChange={v => handleChange('securityAlerts', v)}
          id="securityAlerts"
          ariaLabel="تنبيهات الأمان"
        />
      </SettingRow>

      <SettingRow
        label="الملخص الأسبوعي"
        description="ملخص أسبوعي للنشاط والإحصائيات"
      >
        <Toggle
          checked={notifications.weeklyDigest}
          onChange={v => handleChange('weeklyDigest', v)}
          id="weeklyDigest"
          ariaLabel="الملخص الأسبوعي"
        />
      </SettingRow>

      <SettingRow
        label="أصوات الإشعارات"
        description="تشغيل صوت عند وصول إشعار جديد"
      >
        <Toggle
          checked={notifications.soundEnabled}
          onChange={v => handleChange('soundEnabled', v)}
          id="soundEnabled"
          ariaLabel="أصوات الإشعارات"
        />
      </SettingRow>
    </div>
  );
}

function PrivacySettings() {
  const { settings, updateSettings } = useSettings();
  const { privacy } = settings;

  const handleChange = (key, value) => {
    updateSettings('privacy', { [key]: value });
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="الخصوصية والأمان"
        description="التحكم في رؤية الملف الشخصي والتتبع والأمان"
        icon={Icons.privacy}
      />

      <SettingRow
        label="رؤية الملف الشخصي"
        description="من يمكنه رؤية ملفك الشخصي ومعلوماتك"
      >
        <Select
          value={privacy.profileVisibility}
          onChange={v => handleChange('profileVisibility', v)}
          options={profileVisibilityOptions}
          id="profileVisibility"
        />
      </SettingRow>

      <SettingRow
        label="تتبع النشاط"
        description="السماح بتتبع استخدامك للتطبيق لتحسين التجربة"
      >
        <Toggle
          checked={privacy.activityTracking}
          onChange={v => handleChange('activityTracking', v)}
          id="activityTracking"
          ariaLabel="تتبع النشاط"
        />
      </SettingRow>

      <SettingRow
        label="المشاركة في التحليلات"
        description="إرسال بيانات مجهولة الاستخدام للتحسين"
      >
        <Toggle
          checked={privacy.analyticsOptIn}
          onChange={v => handleChange('analyticsOptIn', v)}
          id="analyticsOptIn"
          ariaLabel="المشاركة في التحليلات"
        />
      </SettingRow>

      <SettingRow
        label="تقارير الأعطال"
        description="إرسال تقارير الأخطاء تلقائياً للمطورين"
      >
        <Toggle
          checked={privacy.crashReporting}
          onChange={v => handleChange('crashReporting', v)}
          id="crashReporting"
          ariaLabel="تقارير الأعطال"
        />
      </SettingRow>

      <SettingRow
        label="مشاركة البيانات"
        description="مشاركة بيانات مجهولة مع شركاء موثوقين"
      >
        <Toggle
          checked={privacy.dataSharing}
          onChange={v => handleChange('dataSharing', v)}
          id="dataSharing"
          ariaLabel="مشاركة البيانات"
        />
      </SettingRow>

      <SettingRow
        label="المصادقة الثنائية (2FA)"
        description="طبقة أمان إضافية لتسجيل الدخول"
      >
        <div className="flex items-center gap-3">
          <Toggle
            checked={privacy.twoFactorEnabled}
            onChange={v => handleChange('twoFactorEnabled', v)}
            id="twoFactorEnabled"
            ariaLabel="المصادقة الثنائية"
          />
          {!privacy.twoFactorEnabled && (
            <Button variant="outline" size="sm" onClick={() => alert('سيتم توجيهك لإعداد 2FA')}>
              إعداد
            </Button>
          )}
        </div>
      </SettingRow>

      <SettingRow
        label="مهلة الجلسة"
        description="الدقائق قبل تسجيل الخروج التلقائي عند عدم النشاط"
      >
        <Slider
          value={privacy.sessionTimeout}
          onChange={v => handleChange('sessionTimeout', v)}
          min={5}
          max={120}
          step={5}
          id="sessionTimeout"
          ariaLabel="مهلة الجلسة بالدقائق"
        />
      </SettingRow>
    </div>
  );
}

function DataSettings() {
  const { settings, updateSettings, exportSettings, importSettings, showToast } = useSettings();
  const { data } = settings;
  const [importFile, setImportFile] = useState(null);

  const handleChange = (key, value) => {
    updateSettings('data', { [key]: value });
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importSettings(file);
    }
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="البيانات والتخزين"
        description="إدارة الحفظ التلقائي والنسخ الاحتياطي والتصدير"
        icon={Icons.data}
      />

      <SettingRow
        label="الحفظ التلقائي"
        description="حفظ التغييرات تلقائياً أثناء العمل"
      >
        <Toggle
          checked={data.autoSave}
          onChange={v => handleChange('autoSave', v)}
          id="autoSave"
          ariaLabel="الحفظ التلقائي"
        />
      </SettingRow>

      <SettingRow
        label="فترة الحفظ التلقائي"
        description="الدقائق بين كل حفظ تلقائي"
      >
        <Slider
          value={data.autoSaveInterval}
          onChange={v => handleChange('autoSaveInterval', v)}
          min={1}
          max={30}
          step={1}
          id="autoSaveInterval"
          ariaLabel="فترة الحفظ التلقائي بالدقائق"
          disabled={!data.autoSave}
        />
      </SettingRow>

      <SettingRow
        label="حجم ذاكرة التخزين المؤقت"
        description="الحد الأقصى للمساحة المستخدمة للتخزين المؤقت (ميجابايت)"
      >
        <Slider
          value={data.cacheSize}
          onChange={v => handleChange('cacheSize', v)}
          min={50}
          max={2000}
          step={50}
          id="cacheSize"
          ariaLabel="حجم ذاكرة التخزين المؤقت"
        />
      </SettingRow>

      <SettingRow
        label="تنسيق التصدير الافتراضي"
        description="التنسيق المستخدم عند تصدير البيانات"
      >
        <Select
          value={data.exportFormat}
          onChange={v => handleChange('exportFormat', v)}
          options={exportFormatOptions}
          id="exportFormat"
        />
      </SettingRow>

      <SettingRow
        label="النسخ الاحتياطي التلقائي"
        description="إنشاء نسخ احتياطية مجدولة"
      >
        <Toggle
          checked={data.backupEnabled}
          onChange={v => handleChange('backupEnabled', v)}
          id="backupEnabled"
          ariaLabel="النسخ الاحتياطي التلقائي"
        />
      </SettingRow>

      <SettingRow
        label="تكرار النسخ الاحتياطي"
        description="كم مرة يتم إنشاء نسخة احتياطية"
      >
        <Select
          value={data.backupFrequency}
          onChange={v => handleChange('backupFrequency', v)}
          options={backupFrequencyOptions}
          id="backupFrequency"
          disabled={!data.backupEnabled}
        />
      </SettingRow>

      <SettingRow
        label="فترة الاحتفاظ"
        description="الأيام التي يتم الاحتفاظ فيها بالنسخ الاحتياطية"
      >
        <Slider
          value={data.retentionPeriod}
          onChange={v => handleChange('retentionPeriod', v)}
          min={7}
          max={365}
          step={7}
          id="retentionPeriod"
          ariaLabel="فترة الاحتفاظ بالأيام"
          disabled={!data.backupEnabled}
        />
      </SettingRow>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={exportSettings}
            icon={<Icons.download className="w-4 h-4" />}
          >
            تصدير الإعدادات
          </Button>
          <label className="flex items-center">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="sr-only"
              id="import-settings"
            />
            <Button variant="outline" onClick={() => document.getElementById('import-settings')?.click()}>
              <Icons.upload className="w-4 h-4" />
              استيراد الإعدادات
            </Button>
          </label>
          <Button
            variant="outline"
            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
            onClick={() => {
              if (confirm('هل أنت متأكد من مسح جميع البيانات المخزنة محلياً؟')) {
                showToast('success', 'تم المسح', 'تم مسح البيانات المحلية');
              }
            }}
          >
            <Icons.trash className="w-4 h-4" />
            مسح البيانات المحلية
          </Button>
        </div>
      </div>
    </div>
  );
}

function AdvancedSettings() {
  const { settings, updateSettings } = useSettings();
  const { advanced } = settings;

  const handleChange = (key, value) => {
    updateSettings('advanced', { [key]: value });
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="إعدادات متقدمة"
        description="خيارات المطور والميزات التجريبية والتكامل"
        icon={Icons.advanced}
      />

      <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-4">
        <div className="flex items-start gap-3">
          <Icons.alert className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-900 dark:text-amber-100">تحذير: إعدادات متقدمة</p>
            <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
              تغيير هذه الإعدادات قد يؤثر على استقرار التطبيق. عدلها فقط إذا كنت تعرف ما تفعله.
            </p>
          </div>
        </div>
      </div>

      <SettingRow
        label="وضع المطور"
        description="تمكين أدوات التطوير والمعلومات التشخيصية"
      >
        <Toggle
          checked={advanced.developerMode}
          onChange={v => handleChange('developerMode', v)}
          id="developerMode"
          ariaLabel="وضع المطور"
        />
      </SettingRow>

      <SettingRow
        label="تسجيل الأخطاء التفصيلي"
        description="تسجيل مفصل للأحداث والأخطاء في الكونسول"
      >
        <Toggle
          checked={advanced.debugLogging}
          onChange={v => handleChange('debugLogging', v)}
          id="debugLogging"
          ariaLabel="تسجيل الأخطاء التفصيلي"
          disabled={!advanced.developerMode}
        />
      </SettingRow>

      <SettingRow
        label="الميزات التجريبية"
        description="تمكين الميزات قيد التطوير (قد تكون غير مستقرة)"
      >
        <Toggle
          checked={advanced.experimentalFeatures}
          onChange={v => handleChange('experimentalFeatures', v)}
          id="experimentalFeatures"
          ariaLabel="الميزات التجريبية"
          disabled={!advanced.developerMode}
        />
      </SettingRow>

      <SettingRow
        label="مهلة طلبات API"
        description="الوقت بالمللي ثانية قبل إلغاء طلب الشبكة"
      >
        <Slider
          value={advanced.apiTimeout}
          onChange={v => handleChange('apiTimeout', v)}
          min={5000}
          max={120000}
          step={5000}
          id="apiTimeout"
          ariaLabel="مهلة API بالمللي ثانية"
          showValue={false}
        />
        <span className="text-sm font-mono text-gray-600 dark:text-gray-400 w-20 text-right">
          {advanced.apiTimeout}ms
        </span>
      </SettingRow>

      <SettingRow
        label="أقصى محاولات إعادة"
        description="عدد مرات إعادة المحاولة للطلبات الفاشلة"
      >
        <Slider
          value={advanced.maxRetries}
          onChange={v => handleChange('maxRetries', v)}
          min={0}
          max={10}
          step={1}
          id="maxRetries"
          ariaLabel="أقصى محاولات إعادة"
        />
      </SettingRow>

      <SettingRow
        label="CSS مخصص"
        description="كود CSS مخصص يُطبق على التطبيق"
      >
        <TextArea
          value={advanced.customCss}
          onChange={v => handleChange('customCss', v)}
          placeholder="/* أدخل CSS مخصص هنا */"
          id="customCss"
          rows={4}
          ariaLabel="CSS مخصص"
        />
      </SettingRow>

      <SettingRow
        label="رابط Webhook"
        description="عنوان URL لإرسال أحداث التطبيق"
      >
        <TextInput
          value={advanced.webhookUrl}
          onChange={v => handleChange('webhookUrl', v)}
          type="url"
          placeholder="https://example.com/webhook"
          id="webhookUrl"
          ariaLabel="رابط Webhook"
        />
      </SettingRow>
    </div>
  );
}

// ============================================
// Main Settings Page
// ============================================

export default function SettingsPage() {
  const { settings, resetCategory, resetAll, exportSettings, importSettings, toasts, dismissToast, hasHydrated } = useSettings();
  const [activeCategory, setActiveCategory] = useState('general');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save delay
    await new Promise(r => setTimeout(r, 500));
    setSaving(false);
  };

  const CategoryComponents = {
    general: GeneralSettings,
    appearance: AppearanceSettings,
    notifications: NotificationsSettings,
    privacy: PrivacySettings,
    data: DataSettings,
    advanced: AdvancedSettings,
  };

  const ActiveComponent = CategoryComponents[activeCategory];

  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200" dir={settings.general.language === 'ar' ? 'rtl' : 'ltr'}>
      <Toaster toasts={toasts} onDismiss={dismissToast} />

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col overflow-hidden`}
          aria-label="فئات الإعدادات"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            {sidebarOpen && (
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Icons.general className="w-5 h-5 text-primary" />
                الإعدادات
              </h1>
            )}
          </div>

          <nav className="flex-1 p-2 overflow-y-auto" role="navigation" aria-label="تنقل الإعدادات">
            <ul className="space-y-1" role="tablist">
              {categories.map(cat => {
                const Icon = Icons[cat.icon];
                return (
                  <li key={cat.id} role="presentation">
                    <button
                      role="tab"
                      aria-selected={activeCategory === cat.id}
                      aria-controls={`${cat.id}-panel`}
                      id={`${cat.id}-tab`}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                        activeCategory === cat.id
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {sidebarOpen && (
                        <span className="font-medium text-sm truncate">{cat.label}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={sidebarOpen ? 'طي الشريط الجانبي' : 'توسيع الشريط الجانبي'}
            >
              <Icons.chevronRight className={`w-5 h-5 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
              {sidebarOpen && <span className="text-sm font-medium">طي</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto" role="main">
          <div className="p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">الإعدادات</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  إدارة تفضيلات التطبيق والسلوك والمظهر
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <Button
                  variant="outline"
                  onClick={exportSettings}
                  icon={<Icons.download className="w-4 h-4" />}
                >
                  تصدير
                </Button>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".json"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) importSettings(file);
                      e.target.value = '';
                    }}
                  />
                  <Button variant="outline" icon={<Icons.upload className="w-4 h-4" />}>
                    استيراد
                  </Button>
                </label>
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (confirm('إعادة جميع الإعدادات إلى القيم الافتراضية؟')) {
                      resetAll();
                    }
                  }}
                  icon={<Icons.reset className="w-4 h-4" />}
                >
                  إعادة تعيين
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  loading={saving}
                  icon={<Icons.save className="w-4 h-4" />}
                >
                  حفظ التغييرات
                </Button>
              </div>
            </div>

            {/* Category Content */}
            <div
              id={`${activeCategory}-panel`}
              role="tabpanel"
              aria-labelledby={`${activeCategory}-tab`}
              className="animate-fade-in"
            >
              <ActiveComponent />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// ============================================
// App Wrapper with Providers & Global Styles
// ============================================

export function SettingsApp() {
  return (
    <SettingsProvider>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap');
        
        :root {
          --color-primary: #00695C;
          --color-primary-hover: #004d40;
          --color-primary-light: #e0f2f1;
          --color-accent: #FFB300;
          --color-accent-hover: #FFA000;
          --spacing-multiplier: 1;
          --border-radius: 8px;
        }
        
        * {
          box-sizing: border-box;
        }
        
        html {
          font-size: 16px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          font-family: 'Inter', 'Noto Naskh Arabic', 'Roboto', system-ui, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f9fafb;
          color: #111827;
          line-height: 1.6;
        }
        
        .dark body {
          background-color: #111827;
          color: #f9fafb;
        }
        
        [dir="rtl"] body {
          font-family: 'Noto Naskh Arabic', 'Inter', 'Roboto', system-ui, sans-serif;
        }
        
        /* Primary color utility */
        .bg-primary { background-color: var(--color-primary); }
        .text-primary { color: var(--color-primary); }
        .border-primary { border-color: var(--color-primary); }
        .bg-primary\/5 { background-color: rgba(0, 105, 92, 0.05); }
        .bg-primary\/10 { background-color: rgba(0, 105, 92, 0.1); }
        .bg-primary\/90 { background-color: rgba(0, 105, 92, 0.9); }
        .hover\\:bg-primary\\/90:hover { background-color: rgba(0, 105, 92, 0.9); }
        .focus\\:ring-primary:focus { --tw-ring-color: var(--color-primary); }
        
        /* Accent color utility */
        .bg-accent { background-color: var(--color-accent); }
        .text-accent { color: var(--color-accent); }
        .border-accent { border-color: var(--color-accent); }
        
        /* Spacing multiplier */
        .p-4 { padding: calc(1rem * var(--spacing-multiplier)); }
        .px-4 { padding-left: calc(1rem * var(--spacing-multiplier)); padding-right: calc(1rem * var(--spacing-multiplier)); }
        .py-2 { padding-top: calc(0.5rem * var(--spacing-multiplier)); padding-bottom: calc(0.5rem * var(--spacing-multiplier)); }
        .gap-4 { gap: calc(1rem * var(--spacing-multiplier)); }
        .gap-3 { gap: calc(0.75rem * var(--spacing-multiplier)); }
        .gap-2 { gap: calc(0.5rem * var(--spacing-multiplier)); }
        .space-y-6 > * + * { margin-top: calc(1.5rem * var(--spacing-multiplier)); }
        .space-y-4 > * + * { margin-top: calc(1rem * var(--spacing-multiplier)); }
        .mb-4 { margin-bottom: calc(1rem * var(--spacing-multiplier)); }
        .mb-6 { margin-bottom: calc(1.5rem * var(--spacing-multiplier)); }
        .mb-8 { margin-bottom: calc(2rem * var(--spacing-multiplier)); }
        .mt-1 { margin-top: calc(0.25rem * var(--spacing-multiplier)); }
        .mt-2 { margin-top: calc(0.5rem * var(--spacing-multiplier)); }
        .mt-4 { margin-top: calc(1rem * var(--spacing-multiplier)); }
        .ml-4 { margin-left: calc(1rem * var(--spacing-multiplier)); }
        .ml-auto { margin-left: auto; }
        
        /* Border radius */
        .rounded-lg { border-radius: var(--border-radius); }
        .rounded-xl { border-radius: calc(var(--border-radius) + 4px); }
        .rounded-2xl { border-radius: calc(var(--border-radius) + 8px); }
        .rounded-full { border-radius: 9999px; }
        
        /* Animations */
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .transition-all { transition: all 0.2s ease; }
        .transition-colors { transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease; }
        .transition-shadow { transition: box-shadow 0.2s ease; }
        .duration-200 { transition-duration: 200ms; }
        .duration-300 { transition-duration: 300ms; }
        
        /* Reduced motion */
        .reduce-motion *,
        .reduce-motion *::before,
        .reduce-motion *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
        
        /* High contrast */
        .high-contrast {
          --color-primary: #004d40;
          --color-accent: #FF8F00;
        }
        .high-contrast body {
          background: #fff;
          color: #000;
        }
        .high-contrast .dark body {
          background: #000;
          color: #fff;
        }
        .high-contrast .bg-white { background: #fff !important; }
        .high-contrast .dark\\:bg-gray-800 { background: #1a1a1a !important; }
        .high-contrast .text-gray-900 { color: #000 !important; }
        .high-contrast .dark\\:text-gray-100 { color: #fff !important; }
        .high-contrast .border-gray-200 { border-color: #000 !important; }
        .high-contrast .dark\\:border-gray-700 { border-color: #fff !important; }
        
        /* Focus visible */
        :focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }
        
        /* Scrollbar */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .dark ::-webkit-scrollbar-thumb { background: #475569; }
        .dark ::-webkit-scrollbar-thumb:hover { background: #64748b; }
        
        /* Selection */
        ::selection { background: var(--color-primary); color: white; }
        
        /* Input styling */
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
        input[type="color"]::-webkit-color-swatch { border: none; border-radius: 6px; }
        
        /* Print styles */
        @media print {
          .fixed, button, select, input { display: none !important; }
          main { padding: 0 !important; }
        }
      `}</style>
      <SettingsPage />
    </SettingsProvider>
  );
}

// ============================================
// Render Helper (for standalone usage)
// ============================================

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const rootElement = document.getElementById('root') || document.body;
  const root = createRoot(rootElement);
  root.render(<SettingsApp />);
}