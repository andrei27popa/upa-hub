'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import UnitCard from '@/components/UnitCard';
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
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Unități Protejate Autorizate</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Descoperă și conectează-te cu unități protejate verificate din toată România.
            Filtrează după regiune, domeniu sau tip de servicii.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-lighter" aria-hidden="true" />
              <input
                type="search"
                placeholder="Caută după nume, servicii, descriere..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                aria-label="Caută unități protejate"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-text-light hover:bg-surface'
              }`}
              aria-expanded={showFilters}
              aria-controls="filters-panel"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              Filtre
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  {[selectedRegion, selectedDomain, selectedService].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div id="filters-panel" className="mt-4 pt-4 border-t border-border">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="filter-region" className="block text-sm font-medium text-text mb-1.5">
                    Regiune / Oraș
                  </label>
                  <select
                    id="filter-region"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="">Toate regiunile</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="filter-domain" className="block text-sm font-medium text-text mb-1.5">
                    Domeniu Activitate
                  </label>
                  <select
                    id="filter-domain"
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="">Toate domeniile</option>
                    {domains.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="filter-service" className="block text-sm font-medium text-text mb-1.5">
                    Tip Servicii
                  </label>
                  <select
                    id="filter-service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="">Toate serviciile</option>
                    {serviceTypes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-3 inline-flex items-center gap-1 text-sm text-text-light hover:text-error transition-colors"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                  Șterge toate filtrele
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="bg-surface py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-text-light text-sm">
              <span className="font-semibold text-text">{filteredUnits.length}</span>{' '}
              {filteredUnits.length === 1 ? 'unitate protejată găsită' : 'unități protejate găsite'}
            </p>
          </div>

          {filteredUnits.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUnits.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-text-lighter mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-text mb-2">Niciun rezultat găsit</h3>
              <p className="text-text-light mb-4">Încearcă să modifici criteriile de căutare sau filtrele.</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                Resetează filtrele
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
