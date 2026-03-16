'use client';

import { type ReactNode } from 'react';
import { ToastProvider } from '@/components/Toast';
import { FavoritesProvider } from '@/lib/favorites';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import CookieConsent from '@/components/CookieConsent';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <FavoritesProvider>
        {children}
        <AccessibilityWidget />
        <CookieConsent />
      </FavoritesProvider>
    </ToastProvider>
  );
}
