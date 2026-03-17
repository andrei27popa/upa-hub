'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Shield, MapPin, SearchX, Sparkles } from 'lucide-react';
import { AnimatedOrbs, FloatingElement } from '@/components/animations';

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center mesh-gradient overflow-hidden">
      {/* Orbs animate pe fundal */}
      <AnimatedOrbs />

      {/* Elemente decorative plutitoare */}
      <FloatingElement duration={8} distance={25} delay={0} className="absolute top-24 right-[12%] hidden lg:block">
        <div className="w-14 h-14 rounded-2xl bg-secondary/20 backdrop-blur-sm border border-secondary/20 flex items-center justify-center">
          <SearchX className="w-7 h-7 text-secondary-light" />
        </div>
      </FloatingElement>
      <FloatingElement duration={10} distance={20} delay={2} className="absolute bottom-32 left-[15%] hidden lg:block">
        <div className="w-12 h-12 rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/20 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-accent-light" />
        </div>
      </FloatingElement>
      <FloatingElement duration={7} distance={30} delay={4} className="absolute top-[55%] left-[8%] hidden lg:block">
        <div className="w-10 h-10 rounded-lg bg-impact/20 backdrop-blur-sm border border-impact/20 flex items-center justify-center">
          <Shield className="w-5 h-5 text-purple-300" />
        </div>
      </FloatingElement>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        {/* Numărul 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h1 className="text-[10rem] sm:text-[12rem] font-extrabold leading-none gradient-text-hero select-none">
            404
          </h1>
        </motion.div>

        {/* Titlu */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Pagina nu a fost găsită
        </motion.h2>

        {/* Descriere */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg text-white/70 mb-10 max-w-md mx-auto"
        >
          Ne pare rău, dar pagina pe care o cauți nu există sau a fost mutată.
          Te invităm să explorezi platforma noastră.
        </motion.p>

        {/* Butoane */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-semibold rounded-xl">
            <Home className="w-5 h-5" />
            Acasă
          </Link>
          <Link href="/unitati-protejate" className="btn-glass inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-semibold rounded-xl">
            <MapPin className="w-5 h-5" />
            Unități Protejate
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
