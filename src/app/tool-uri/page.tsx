'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Wrench, Sparkles } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import { FadeIn, AnimatedOrbs } from '@/components/animations';
import { allAccessibilityTools, toolCategories, userTypes } from '@/lib/data';

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toate');
  const [selectedUserType, setSelectedUserType] = useState('Toți');

  const filteredTools = useMemo(() => {
    return allAccessibilityTools.filter((tool) => {
      const matchesSearch = searchQuery === '' ||
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Toate' || tool.category === selectedCategory;
      const matchesUserType = selectedUserType === 'Toți' || tool.userType.includes(selectedUserType);
      return matchesSearch && matchesCategory && matchesUserType;
    });
  }, [searchQuery, selectedCategory, selectedUserType]);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pt-28 pb-16" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #1B4D8E 50%, #0F172A 100%)' }}>
        <AnimatedOrbs />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-5 border border-white/10">
              <Wrench className="w-4 h-4" aria-hidden="true" /> Instrumente
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Tool-uri pentru <span className="gradient-text-hero">Accesibilitate</span>
            </h1>
            <p className="text-blue-100/70 text-lg max-w-2xl font-light">
              Bibliotecă de instrumente digitale pentru accesibilitate și incluziune.
              Utile pentru persoane cu dizabilități, angajatori, designeri și dezvoltatori.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L80 68C160 56 320 32 480 24C640 16 800 24 960 32C1120 40 1280 48 1360 52L1440 56V80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-lighter" aria-hidden="true" />
            <input
              type="search"
              placeholder="Caută un instrument..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-surface transition-all"
              aria-label="Caută instrumente de accesibilitate"
            />
          </div>

          <div className="mb-3">
            <p className="text-xs font-bold text-text-lighter uppercase tracking-widest mb-2">Categorie</p>
            <div className="flex flex-wrap gap-2">
              {toolCategories.map((cat) => (
                <motion.button
                  key={cat}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-surface text-text-light hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-text-lighter uppercase tracking-widest mb-2">Tip utilizator</p>
            <div className="flex flex-wrap gap-2">
              {userTypes.map((type) => (
                <motion.button
                  key={type}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedUserType(type)}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                    selectedUserType === type
                      ? 'bg-impact text-white shadow-lg shadow-impact/20'
                      : 'bg-surface text-text-light hover:bg-impact/5 hover:text-impact'
                  }`}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-surface dot-pattern py-8 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-text-light text-sm mb-6">
            <span className="font-bold text-text">{filteredTools.length}</span>{' '}
            {filteredTools.length === 1 ? 'instrument disponibil' : 'instrumente disponibile'}
          </p>

          {filteredTools.length > 0 ? (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredTools.map((tool, i) => (
                  <motion.div
                    key={tool.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <ToolCard tool={tool} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <FadeIn>
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <Wrench className="w-8 h-8 text-text-lighter" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-text mb-2">Niciun instrument găsit</h3>
                <p className="text-text-light">Încearcă alte criterii de căutare sau filtre.</p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Suggest Tool */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-impact/5 via-primary/5 to-secondary/5 border border-border/50 p-10 text-center">
              <Sparkles className="w-10 h-10 text-impact mx-auto mb-4" aria-hidden="true" />
              <h2 className="text-2xl font-extrabold text-text mb-3">Ai o sugestie de tool?</h2>
              <p className="text-text-light mb-6 max-w-lg mx-auto">
                Cunoști un instrument util pentru accesibilitate? Trimite-ne sugestia ta.
              </p>
              <a href="/contact?subject=sugestie-tool" className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-xl">
                Sugerează un Tool
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
