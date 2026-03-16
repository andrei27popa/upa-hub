'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('upa-dark-mode');
    if (saved === 'true') {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('upa-dark-mode', String(next));
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="p-2 rounded-xl bg-surface dark:bg-white/10 text-text-light dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors"
      aria-label={dark ? 'Activează modul luminos' : 'Activează modul întunecat'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: dark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.div>
    </motion.button>
  );
}
