'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Shield, ChevronDown, Building2, Wrench, Calculator, BookOpen, BarChart3, HelpCircle, Map, GitCompareArrows } from 'lucide-react';
import DarkModeToggle from '@/components/DarkModeToggle';

const mainLinks = [
  { href: '/', label: 'Acasă' },
  { href: '/unitati-protejate', label: 'Unități Protejate' },
  {
    label: 'Instrumente',
    children: [
      { href: '/tool-uri', label: 'Toate Tool-urile', icon: Wrench, desc: 'Bibliotecă completă de instrumente' },
      { href: '/tool-uri/contrast-checker', label: 'Contrast Checker', icon: Wrench, desc: 'Verifică contrastul culorilor WCAG' },
      { href: '/tool-uri/checklist-web', label: 'Checklist Web', icon: Wrench, desc: 'Checklist WCAG pas cu pas' },
      { href: '/tool-uri/font-tester', label: 'Font Tester', icon: Wrench, desc: 'Testează lizibilitatea fonturilor' },
      { href: '/tool-uri/heading-checker', label: 'Heading Checker', icon: Wrench, desc: 'Verifică structura heading-urilor' },
      { href: '/calculator', label: 'Calculator Economii', icon: Calculator, desc: 'Calculează economiile colaborării UPA' },
    ],
  },
  {
    label: 'Explorează',
    children: [
      { href: '/blog', label: 'Blog', icon: BookOpen, desc: 'Articole despre incluziune și legislație' },
      { href: '/povesti-succes', label: 'Povești de Succes', icon: Heart, desc: 'Testimoniale și studii de caz' },
      { href: '/impact', label: 'Impact Dashboard', icon: BarChart3, desc: 'Harta și statisticile incluziunii' },
      { href: '/compara', label: 'Compară Unități', icon: GitCompareArrows, desc: 'Compară unități protejate side-by-side' },
      { href: '/faq', label: 'Întrebări Frecvente', icon: HelpCircle, desc: 'Răspunsuri la întrebările comune' },
    ],
  },
  { href: '/despre', label: 'Despre' },
  { href: '/contact', label: 'Contact' },
];

const mobileLinks = [
  { href: '/', label: 'Acasă' },
  { href: '/unitati-protejate', label: 'Unități Protejate' },
  { href: '/tool-uri', label: 'Tool-uri' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/blog', label: 'Blog' },
  { href: '/impact', label: 'Impact' },
  { href: '/compara', label: 'Compară' },
  { href: '/despre', label: 'Despre' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

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

          <div className="hidden lg:flex items-center gap-0.5">
            {mainLinks.map((link) =>
              'children' in link ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 inline-flex items-center gap-1 group ${
                      scrolled ? 'text-text-light hover:text-primary' : 'text-white/80 hover:text-white'
                    }`}
                    aria-expanded={openDropdown === link.label}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 min-w-[280px]"
                      >
                        <div className="bg-white rounded-2xl shadow-xl shadow-black/10 border border-border/50 p-2 overflow-hidden">
                          {link.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-surface transition-colors group/item"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0 group-hover/item:bg-primary/10 transition-colors">
                                <child.icon className="w-4 h-4 text-primary" aria-hidden="true" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-text group-hover/item:text-primary transition-colors">{child.label}</p>
                                <p className="text-xs text-text-lighter leading-snug">{child.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
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
              )
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <DarkModeToggle />
            <Link href="/inscrie-unitate" className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl">
              <Heart className="w-4 h-4" aria-hidden="true" />
              Înscrie o Unitate
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <DarkModeToggle />
            <button
              className={`p-2 rounded-lg transition-colors ${scrolled ? 'hover:bg-surface text-text' : 'hover:bg-white/10 text-white'}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Închide meniul' : 'Deschide meniul'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {mobileLinks.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link href={link.href} className="block px-4 py-2.5 text-base font-medium text-text hover:text-primary hover:bg-primary/5 rounded-xl transition-all" onClick={() => setIsOpen(false)}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
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
