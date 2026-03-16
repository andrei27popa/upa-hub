'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('upa-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = (level: 'all' | 'essential') => {
    localStorage.setItem('upa-cookie-consent', JSON.stringify({ level, date: new Date().toISOString() }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[90] bg-white rounded-2xl border border-border shadow-2xl shadow-black/10 p-5"
          role="dialog"
          aria-label="Consimțământ cookie-uri"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-bold text-text text-sm mb-1">Respectăm confidențialitatea ta</h3>
              <p className="text-text-light text-xs leading-relaxed">
                UPA Hub folosește cookie-uri esențiale pentru funcționare și cookie-uri analitice
                pentru a îmbunătăți experiența. Poți alege ce cookie-uri accepți.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => accept('essential')}
              className="flex-1 px-4 py-2 text-sm font-semibold text-text-light border border-border rounded-xl hover:bg-surface transition-colors"
            >
              Doar esențiale
            </button>
            <button
              onClick={() => accept('all')}
              className="flex-1 px-4 py-2 text-sm font-semibold text-white btn-primary rounded-xl"
            >
              Accept toate
            </button>
          </div>
          <div className="flex items-center gap-1 mt-3 justify-center">
            <Shield className="w-3 h-3 text-text-lighter" aria-hidden="true" />
            <span className="text-[10px] text-text-lighter">Conform GDPR și ePrivacy</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
