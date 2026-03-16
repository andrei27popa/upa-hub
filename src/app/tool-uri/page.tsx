'use client';

import { useState, useMemo } from 'react';
import { Search, Wrench } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import { accessibilityTools, toolCategories, userTypes } from '@/lib/data';

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toate');
  const [selectedUserType, setSelectedUserType] = useState('Toți');

  const filteredTools = useMemo(() => {
    return accessibilityTools.filter((tool) => {
      const matchesSearch = searchQuery === '' ||
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Toate' || tool.category === selectedCategory;
      const matchesUserType = selectedUserType === 'Toți' ||
        tool.userType.includes(selectedUserType);
      return matchesSearch && matchesCategory && matchesUserType;
    });
  }, [searchQuery, selectedCategory, selectedUserType]);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-impact to-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Wrench className="w-8 h-8" aria-hidden="true" />
            <h1 className="text-3xl lg:text-4xl font-bold">Tool-uri pentru Accesibilitate</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Bibliotecă de instrumente digitale pentru accesibilitate și incluziune.
            Utile pentru persoane cu dizabilități, angajatori, designeri și dezvoltatori.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-lighter" aria-hidden="true" />
            <input
              type="search"
              placeholder="Caută un instrument..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              aria-label="Caută instrumente de accesibilitate"
            />
          </div>

          {/* Category tabs */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-text-lighter uppercase tracking-wider mb-2">Categorie</p>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrare după categorie">
              {toolCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-surface text-text-light hover:bg-primary/10 hover:text-primary'
                  }`}
                  role="tab"
                  aria-selected={selectedCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* User type tabs */}
          <div>
            <p className="text-xs font-semibold text-text-lighter uppercase tracking-wider mb-2">Tip utilizator</p>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrare după tip utilizator">
              {userTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedUserType(type)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    selectedUserType === type
                      ? 'bg-impact text-white'
                      : 'bg-surface text-text-light hover:bg-impact/10 hover:text-impact'
                  }`}
                  role="tab"
                  aria-selected={selectedUserType === type}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-surface py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-text-light text-sm mb-6">
            <span className="font-semibold text-text">{filteredTools.length}</span>{' '}
            {filteredTools.length === 1 ? 'instrument disponibil' : 'instrumente disponibile'}
          </p>

          {filteredTools.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Wrench className="w-12 h-12 text-text-lighter mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-text mb-2">Niciun instrument găsit</h3>
              <p className="text-text-light">Încearcă alte criterii de căutare sau filtre.</p>
            </div>
          )}
        </div>
      </section>

      {/* Suggest Tool CTA */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-text mb-3">Ai o sugestie de tool?</h2>
            <p className="text-text-light mb-6 max-w-lg mx-auto">
              Cunoști un instrument util pentru accesibilitate sau incluziune?
              Trimite-ne sugestia ta și îl vom adăuga în bibliotecă.
            </p>
            <a
              href="/contact?subject=sugestie-tool"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              Sugerează un Tool
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
