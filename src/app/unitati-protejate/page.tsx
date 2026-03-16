'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, Building2, Sparkles } from 'lucide-react';
import UnitCard from '@/components/UnitCard';
import { FadeIn, AnimatedOrbs } from '@/components/animations';
import { protectedUnits, regions, domains, serviceTypes } from '@/lib/data';

export default function ProtectedUnitsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredUnits = useMemo(() => {
    return protectedUnits.filter((unit) => {
      const matchesSearch = searchQuery === '' ||
        unit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesRegion = selectedRegion === '' || unit.region === selectedRegion;
      const matchesDomain = selectedDomain === '' || unit.domain === selectedDomain;
      const matchesService = selectedService === '' ||
        unit.services.some(s => s.toLowerCase().includes(selectedService.toLowerCase()));
      return matchesSearch && matchesRegion && matchesDomain && matchesService;
    });
  }, [searchQuery, selectedRegion, selectedDomain, selectedService]);

  const hasActiveFilters = selectedRegion || selectedDomain || selectedService;

  const clearFilters = () => {
    setSelectedRegion('');
    setSelectedDomain('');
    setSelectedService('');
    setSearchQuery('');
  };

  return (
    <>
      {/* Header */}
      <section className="relative mesh-gradient text-white pt-28 pb-16 overflow-hidden">
        <AnimatedOrbs />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-5 border border-white/10">
              <Building2 className="w-4 h-4" aria-hidden="true" /> Director UPA
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">Unități Protejate Autorizate</h1>
            <p className="text-blue-100/70 text-lg max-w-2xl font-light">
              Descoperă și conectează-te cu unități protejate verificate din toată România.
            </p>
          </motion.div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L80 68C160 56 320 32 480 24C640 16 800 24 960 32C1120 40 1280 48 1360 52L1440 56V80H0Z" fill="#F8FAFC"/>
          </svg>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-surface sticky top-16 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-lighter" aria-hidden="true" />
              <input
                type="search"
                placeholder="Caută după nume, servicii, descriere..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                aria-label="Caută unități protejate"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-5 py-3 border rounded-xl text-sm font-semibold transition-all ${
                showFilters || hasActiveFilters
                  ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                  : 'border-border bg-white text-text-light hover:bg-surface'
              }`}
              aria-expanded={showFilters}
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              Filtre
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-white text-primary text-xs rounded-full flex items-center justify-center font-bold">
                  {[selectedRegion, selectedDomain, selectedService].filter(Boolean).length}
                </span>
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { id: 'region', label: 'Regiune / Oraș', value: selectedRegion, onChange: setSelectedRegion, options: regions, placeholder: 'Toate regiunile' },
                      { id: 'domain', label: 'Domeniu Activitate', value: selectedDomain, onChange: setSelectedDomain, options: domains, placeholder: 'Toate domeniile' },
                      { id: 'service', label: 'Tip Servicii', value: selectedService, onChange: setSelectedService, options: serviceTypes, placeholder: 'Toate serviciile' },
                    ].map((filter) => (
                      <div key={filter.id}>
                        <label htmlFor={filter.id} className="block text-sm font-semibold text-text mb-1.5">{filter.label}</label>
                        <select
                          id={filter.id}
                          value={filter.value}
                          onChange={(e) => filter.onChange(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="">{filter.placeholder}</option>
                          {filter.options.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="mt-3 inline-flex items-center gap-1 text-sm text-text-light hover:text-error transition-colors font-medium">
                      <X className="w-4 h-4" aria-hidden="true" /> Șterge filtrele
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Results */}
      <section className="bg-surface py-8 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-text-light text-sm">
              <span className="font-bold text-text">{filteredUnits.length}</span>{' '}
              {filteredUnits.length === 1 ? 'unitate protejată' : 'unități protejate'}
            </p>
          </div>

          {filteredUnits.length > 0 ? (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredUnits.map((unit, i) => (
                  <motion.div
                    key={unit.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <UnitCard unit={unit} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <FadeIn>
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-surface-dark rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Search className="w-8 h-8 text-text-lighter" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-text mb-2">Niciun rezultat găsit</h3>
                <p className="text-text-light mb-6">Încearcă să modifici criteriile de căutare.</p>
                <button onClick={clearFilters} className="btn-primary px-6 py-2.5 text-white text-sm font-semibold rounded-xl">
                  Resetează filtrele
                </button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
}
