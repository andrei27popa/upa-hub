'use client';

import Link from 'next/link';
import { useState } from 'react';
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

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50" role="navigation" aria-label="Navigare principală">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary" aria-label="UPA Hub - Pagina principală">
            <Shield className="w-8 h-8 text-primary" aria-hidden="true" />
            <span>UPA <span className="text-secondary">Hub</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-text-light hover:text-primary hover:bg-surface rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/inscrie-unitate"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              Înscrie o Unitate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Închide meniul' : 'Deschide meniul'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-border bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-text-light hover:text-primary hover:bg-surface rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/inscrie-unitate"
              className="block mt-3 text-center px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Înscrie o Unitate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
