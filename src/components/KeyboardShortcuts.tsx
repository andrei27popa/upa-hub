'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';

const shortcuts = [
  { keys: ['g', 'h'], description: 'Mergi la Acasă' },
  { keys: ['g', 'u'], description: 'Mergi la Unități Protejate' },
  { keys: ['g', 't'], description: 'Mergi la Tool-uri' },
  { keys: ['g', 'c'], description: 'Mergi la Calculator' },
  { keys: ['g', 'b'], description: 'Mergi la Blog' },
  { keys: ['g', 'i'], description: 'Mergi la Impact' },
  { keys: ['d'], description: 'Toggle Dark Mode' },
  { keys: ['?'], description: 'Arată scurtături' },
  { keys: ['Esc'], description: 'Închide modal / meniu' },
];

const routeMap: Record<string, string> = {
  gh: '/', gu: '/unitati-protejate', gt: '/tool-uri',
  gc: '/calculator', gb: '/blog', gi: '/impact',
};

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);
  const [keyBuffer, setKeyBuffer] = useState('');
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleKeyDown = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable) return;
      if (e.key === 'Escape') { setIsOpen(false); return; }
      if (e.key === '?') { e.preventDefault(); setIsOpen(p => !p); return; }
      if (e.key === 'd' && !e.metaKey && !e.ctrlKey) {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('upa-dark-mode', document.documentElement.classList.contains('dark') ? 'true' : 'false');
        return;
      }
      const nb = keyBuffer + e.key.toLowerCase();
      setKeyBuffer(nb);
      clearTimeout(timeout);
      timeout = setTimeout(() => setKeyBuffer(''), 1000);
      if (routeMap[nb]) { router.push(routeMap[nb]); setKeyBuffer(''); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); clearTimeout(timeout); };
  }, [keyBuffer, router]);

  return (
    <>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg border border-border flex items-center justify-center text-text-lighter hover:text-primary transition-colors"
        aria-label="Scurtături tastatură">
        <Keyboard className="w-5 h-5" />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-primary" aria-hidden="true" />
                  <h2 className="font-bold text-text text-lg">Scurtături Tastatură</h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-surface rounded-lg transition-colors" aria-label="Închide">
                  <X className="w-5 h-5 text-text-lighter" />
                </button>
              </div>
              <div className="p-5 space-y-3">
                {shortcuts.map((s) => (
                  <div key={s.description} className="flex items-center justify-between">
                    <span className="text-sm text-text">{s.description}</span>
                    <div className="flex gap-1 items-center">
                      {s.keys.map((k, i) => (
                        <span key={i} className="inline-flex items-center gap-1">
                          <kbd className="px-2 py-1 bg-surface border border-border rounded-lg text-xs font-mono font-bold text-text">{k}</kbd>
                          {i < s.keys.length - 1 && <span className="text-text-lighter text-xs">→</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-surface border-t border-border text-center">
                <p className="text-xs text-text-lighter">Apasă <kbd className="px-1.5 py-0.5 bg-white border border-border rounded text-[10px] font-mono font-bold">?</kbd> oricând</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
