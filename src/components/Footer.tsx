'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Mail, Phone, MapPin, ArrowUpRight, Linkedin, Facebook, Twitter, Instagram } from 'lucide-react';
import Newsletter from '@/components/Newsletter';

export default function Footer() {
  return (
    <footer className="relative bg-[#0B1D3A] text-white overflow-hidden" role="contentinfo">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/50 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="mb-14">
          <Newsletter />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 font-bold text-xl mb-5">
              <Shield className="w-7 h-7 text-primary-light" aria-hidden="true" />
              <span>UPA <span className="text-secondary-light">Hub</span></span>
            </div>
            <p className="text-blue-200/60 text-sm leading-relaxed">
              Platforma care conectează companiile responsabile cu unitățile protejate autorizate și instrumentele pentru incluziune.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-blue-200/40 mb-5">Navigare</h3>
            <ul className="space-y-3">
              {[
                { href: '/unitati-protejate', label: 'Unități Protejate' },
                { href: '/tool-uri', label: 'Tool-uri Accesibilitate' },
                { href: '/despre', label: 'Despre UPA Hub' },
                { href: '/resurse', label: 'Resurse' },
                { href: '/ce-este-upa', label: 'Ce este o UPA?' },
                { href: '/blog', label: 'Blog' },
                { href: '/faq', label: 'Întrebări frecvente' },
                { href: '/povesti-succes', label: 'Povești de succes' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-200/60 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For companies */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-blue-200/40 mb-5">Pentru Companii</h3>
            <ul className="space-y-3">
              {[
                { href: '/unitati-protejate', label: 'Găsește o unitate protejată' },
                { href: '/ce-este-upa', label: 'Beneficiile colaborării' },
                { href: '/inscrie-unitate', label: 'Înscrie o unitate' },
                { href: '/contact', label: 'Solicită consultanță' },
                { href: '/calculator', label: 'Calculator Impact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-200/60 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-blue-200/40 mb-5">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-blue-200/60 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Mail className="w-4 h-4" aria-hidden="true" /></div>
                <a href="mailto:contact@upahub.ro" className="hover:text-white transition-colors">contact@upahub.ro</a>
              </li>
              <li className="flex items-center gap-3 text-blue-200/60 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Phone className="w-4 h-4" aria-hidden="true" /></div>
                <a href="tel:+40700000000" className="hover:text-white transition-colors">+40 700 000 000</a>
              </li>
              <li className="flex items-start gap-3 text-blue-200/60 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0"><MapPin className="w-4 h-4" aria-hidden="true" /></div>
                <span>București, România</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-14 pt-8 border-t border-white/5">
          <div className="flex justify-center gap-4 mb-8">
            {[
              { href: '#', icon: Linkedin, label: 'LinkedIn' },
              { href: '#', icon: Facebook, label: 'Facebook' },
              { href: '#', icon: Twitter, label: 'X (Twitter)' },
              { href: '#', icon: Instagram, label: 'Instagram' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-blue-200/60 hover:text-white hover:bg-white/10 transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-200/40 text-sm">
              &copy; {new Date().getFullYear()} UPA Hub. Toate drepturile rezervate.
            </p>
            <div className="flex gap-6">
              {[
                { href: '/politica-confidentialitate', label: 'Confidențialitate' },
                { href: '/termeni', label: 'Termeni' },
                { href: '/accesibilitate', label: 'Accesibilitate' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-blue-200/40 hover:text-white text-sm transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
