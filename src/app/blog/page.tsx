'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Newspaper, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, AnimatedOrbs } from '@/components/animations';
import { blogPosts, blogCategories } from '@/lib/blog';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toate');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'Toate' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPosts = filteredPosts.filter((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  const categoryColors: Record<string, string> = {
    'Legislație': 'bg-primary/10 text-primary',
    'Incluziune': 'bg-secondary/10 text-secondary',
    'Accesibilitate': 'bg-impact/10 text-impact',
    'Povești de succes': 'bg-accent/10 text-accent',
    'Ghiduri practice': 'bg-primary-light/10 text-primary-light',
  };

  return (
    <>
      {/* Header */}
      <section
        className="relative overflow-hidden pt-28 pb-16"
        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #1B4D8E 50%, #0F172A 100%)' }}
      >
        <AnimatedOrbs />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-5 border border-white/10">
              <Newspaper className="w-4 h-4" aria-hidden="true" /> Blog
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Noutăți și <span className="gradient-text-hero">Resurse</span>
            </h1>
            <p className="text-blue-100/70 text-lg max-w-2xl font-light">
              Articole despre legislație, incluziune, accesibilitate și povești inspiraționale
              din lumea unităților protejate.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path
              d="M0 80L80 68C160 56 320 32 480 24C640 16 800 24 960 32C1120 40 1280 48 1360 52L1440 56V80H0Z"
              fill="white"
            />
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
              placeholder="Caută articole..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-surface transition-all"
              aria-label="Caută articole pe blog"
            />
          </div>

          <div>
            <p className="text-xs font-bold text-text-lighter uppercase tracking-widest mb-2">Categorie</p>
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((cat) => (
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
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl font-extrabold text-text mb-8">Articole recomandate</h2>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.slug}`}>
                    <motion.article
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="card-shine relative group rounded-2xl overflow-hidden border border-border bg-white h-full flex flex-col"
                    >
                      {/* Gradient overlay header */}
                      <div
                        className="h-48 relative"
                        style={{
                          background: `linear-gradient(135deg, ${
                            post.category === 'Legislație'
                              ? '#1B4D8E, #2563EB'
                              : post.category === 'Incluziune'
                              ? '#10B981, #34D399'
                              : '#7C3AED, #A78BFA'
                          })`,
                        }}
                      >
                        <div className="absolute inset-0 dot-pattern opacity-20" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-white/20 backdrop-blur-sm rounded-full mb-2">
                            {post.category}
                          </span>
                          <h3 className="text-lg font-bold text-white leading-snug line-clamp-2">
                            {post.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <p className="text-text-light text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-text-lighter">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" aria-hidden="true" />
                              {post.author}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                              {post.readTime} min
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border">
                          <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            Citește <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Regular Posts Grid */}
      <section className="bg-surface dot-pattern py-12 min-h-[30vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {regularPosts.length > 0 || (featuredPosts.length === 0 && filteredPosts.length > 0) ? (
            <>
              <FadeIn>
                <h2 className="text-2xl font-extrabold text-text mb-8">
                  {featuredPosts.length > 0 ? 'Toate articolele' : 'Articole'}
                </h2>
              </FadeIn>
              <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {(featuredPosts.length > 0 ? regularPosts : filteredPosts).map((post, i) => (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <motion.article
                          whileHover={{ y: -6 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                          className="card-shine bg-white rounded-2xl border border-border overflow-hidden h-full flex flex-col group"
                        >
                          <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span
                                className={`px-3 py-1 text-xs font-bold rounded-full ${
                                  categoryColors[post.category] || 'bg-surface text-text-light'
                                }`}
                              >
                                {post.category}
                              </span>
                              <span className="text-xs text-text-lighter flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                                {post.readTime} min lectură
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-text mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>

                            <p className="text-text-light text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between text-xs text-text-lighter mt-auto">
                              <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" aria-hidden="true" />
                                {post.author}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                                {post.date}
                              </span>
                            </div>

                            <div className="mt-4 pt-4 border-t border-border">
                              <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                Citește <ArrowRight className="w-4 h-4" />
                              </span>
                            </div>
                          </div>
                        </motion.article>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          ) : filteredPosts.length === 0 ? (
            <FadeIn>
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <Newspaper className="w-8 h-8 text-text-lighter" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-text mb-2">Niciun articol găsit</h3>
                <p className="text-text-light">Încearcă alte criterii de căutare sau filtre.</p>
              </div>
            </FadeIn>
          ) : null}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-impact/5 via-primary/5 to-secondary/5 border border-border/50 p-10 text-center">
              <Newspaper className="w-10 h-10 text-impact mx-auto mb-4" aria-hidden="true" />
              <h2 className="text-2xl font-extrabold text-text mb-3">Rămâi la curent</h2>
              <p className="text-text-light mb-6 max-w-lg mx-auto">
                Abonează-te pentru a primi cele mai recente articole despre legislație, incluziune și accesibilitate.
              </p>
              <a
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-xl"
              >
                Contactează-ne
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
