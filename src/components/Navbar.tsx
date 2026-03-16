'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Shield } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Acasă' },
  { href: '/unitati-protejate', label: 'Unități Protejate' },
  { href: '/tool-uri', label: 'Tool-uri Accesibilitate' },
  { href: '/despre', label: 'Despre' },
  { href: '/resurse', label: 'Resurse' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg shadow-black/[0.03]' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Navigare principală"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="UPA Hub - Pagina principală">
            <motion.div whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }} transition={{ duration: 0.5 }} className="relative">
              <Shield className={`w-8 h-8 transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white'}`} aria-hidden="true" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${scrolled ? 'text-text' : 'text-white'}`}>
              UPA <span className={scrolled ? 'gradient-text' : 'text-secondary-light'}>Hub</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                  scrolled ? 'text-text-light hover:text-primary' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${scrolled ? 'bg-primary' : 'bg-white'}`} />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/inscrie-unitate" className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl">
              <Heart className="w-4 h-4" aria-hidden="true" />
              Înscrie o Unitate
            </Link>
          </div>

          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'hover:bg-surface text-text' : 'hover:bg-white/10 text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Închide meniul' : 'Deschide meniul'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={link.href} className="block px-4 py-2.5 text-base font-medium text-text hover:text-primary hover:bg-primary/5 rounded-xl transition-all" onClick={() => setIsOpen(false)}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Link href="/inscrie-unitate" className="block mt-3 text-center px-4 py-2.5 btn-primary text-white font-semibold rounded-xl" onClick={() => setIsOpen(false)}>
                  Înscrie o Unitate
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
