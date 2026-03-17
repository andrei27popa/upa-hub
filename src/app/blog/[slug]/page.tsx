'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Check, ChevronRight, Home, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { getBlogPost, getRelatedPosts } from '@/lib/blog';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [copied, setCopied] = useState(false);

  const post = useMemo(() => getBlogPost(slug), [slug]);
  const relatedPosts = useMemo(
    () => (post ? getRelatedPosts(post.slug, post.category, 3) : []),
    [post]
  );

  const categoryColors: Record<string, string> = {
    'Legislație': 'bg-primary/10 text-primary',
    'Incluziune': 'bg-secondary/10 text-secondary',
    'Accesibilitate': 'bg-impact/10 text-impact',
    'Povești de succes': 'bg-accent/10 text-accent',
    'Ghiduri practice': 'bg-primary-light/10 text-primary-light',
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback — do nothing
    }
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      '_blank'
    );
  };

  if (!post) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-surface">
        <FadeIn>
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Newspaper className="w-8 h-8 text-text-lighter" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-extrabold text-text mb-3">Articol negăsit</h1>
            <p className="text-text-light mb-6">Articolul pe care îl cauți nu există sau a fost mutat.</p>
            <Link
              href="/blog"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" /> Înapoi la blog
            </Link>
          </div>
        </FadeIn>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section
        className="relative overflow-hidden pt-28 pb-16"
        style={{
          background: `linear-gradient(135deg, ${
            post.category === 'Legislație'
              ? '#1B4D8E, #2563EB'
              : post.category === 'Incluziune'
              ? '#10B981, #1B4D8E'
              : post.category === 'Accesibilitate'
              ? '#7C3AED, #2563EB'
              : post.category === 'Povești de succes'
              ? '#F59E0B, #EF4444'
              : '#2563EB, #7C3AED'
          })`,
        }}
      >
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-white/60">
                <li>
                  <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                    <Home className="w-3.5 h-3.5" /> Acasă
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </li>
                <li className="text-white/90 font-medium truncate max-w-[200px]">{post.title}</li>
              </ol>
            </nav>

            <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-white/20 backdrop-blur-sm rounded-full mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" aria-hidden="true" />
                <span>
                  <span className="text-white font-medium">{post.author}</span> — {post.authorRole}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {post.readTime} min lectură
              </span>
            </div>
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

      {/* Article Content */}
      <section className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-medium bg-surface text-text-light rounded-full border border-border">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Article Body */}
            <article
              className="prose prose-slate max-w-none
                prose-headings:font-extrabold prose-headings:text-text prose-headings:tracking-tight
                prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:text-text-light prose-p:leading-relaxed prose-p:mb-4
                prose-li:text-text-light prose-li:leading-relaxed
                prose-strong:text-text prose-strong:font-bold
                prose-ul:my-4 prose-ul:pl-6
                prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-sm font-bold text-text-lighter uppercase tracking-widest mb-4">Distribuie articolul</h3>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-surface text-text-light hover:bg-primary/5 hover:text-primary border border-border transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-secondary" /> Link copiat!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" /> Copiază link
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShareFacebook}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-surface text-text-light hover:bg-[#1877F2]/10 hover:text-[#1877F2] border border-border transition-all"
                >
                  Facebook
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShareLinkedIn}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-surface text-text-light hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] border border-border transition-all"
                >
                  LinkedIn
                </motion.button>
              </div>
            </div>

            {/* Author Card */}
            <div className="mt-8 p-6 rounded-2xl bg-surface border border-border">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-impact flex items-center justify-center text-white font-bold text-lg">
                  {post.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-text">{post.author}</p>
                  <p className="text-sm text-text-light">{post.authorRole}</p>
                </div>
              </div>
            </div>

            {/* Back to blog */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Înapoi la blog
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-surface dot-pattern py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl font-extrabold text-text mb-8">Articole similare</h2>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <StaggerItem key={related.id}>
                  <Link href={`/blog/${related.slug}`}>
                    <motion.article
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="card-shine bg-white rounded-2xl border border-border overflow-hidden h-full flex flex-col group"
                    >
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`px-3 py-1 text-xs font-bold rounded-full ${
                              categoryColors[related.category] || 'bg-surface text-text-light'
                            }`}
                          >
                            {related.category}
                          </span>
                          <span className="text-xs text-text-lighter flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                            {related.readTime} min
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-text mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {related.title}
                        </h3>

                        <p className="text-text-light text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                          {related.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-text-lighter mt-auto">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" aria-hidden="true" />
                            {related.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                            {related.date}
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
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </>
  );
}
