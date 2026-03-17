'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Link2, Linkedin, Facebook, Twitter, Mail, Check } from 'lucide-react';
import { useToast } from '@/components/Toast';

interface ShareButtonProps {
  url?: string;
  title?: string;
}

export default function ShareButton({ url, title }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = title || (typeof document !== 'undefined' ? document.title : '');

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: shareUrl });
        return;
      } catch {
        // user cancelled or API unavailable, fall through to dropdown
      }
    }
    setOpen((prev) => !prev);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      addToast('Link copiat!', 'success');
      setTimeout(() => setCopied(false), 2000);
      setOpen(false);
    } catch {
      addToast('Nu s-a putut copia linkul.', 'error');
    }
  }

  function openWindow(href: string) {
    window.open(href, '_blank', 'noopener,noreferrer,width=600,height=500');
    setOpen(false);
  }

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  const items = [
    {
      label: 'Copiază linkul',
      icon: copied ? Check : Link2,
      action: copyLink,
    },
    {
      label: 'LinkedIn',
      icon: Linkedin,
      action: () => openWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`),
    },
    {
      label: 'Facebook',
      icon: Facebook,
      action: () => openWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`),
    },
    {
      label: 'Twitter / X',
      icon: Twitter,
      action: () => openWindow(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`),
    },
    {
      label: 'Email',
      icon: Mail,
      action: () => {
        window.location.href = `mailto:?subject=${encodedTitle}&body=${encodedUrl}`;
        setOpen(false);
      },
    },
  ];

  return (
    <div className="relative inline-block" ref={ref}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-light border border-border rounded-xl hover:bg-surface hover:text-primary transition-colors"
        aria-label="Distribuie"
      >
        <Share2 className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">Distribuie</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute right-0 top-full mt-2 z-50 w-56 rounded-xl border border-border bg-white/80 backdrop-blur-xl shadow-xl dark:bg-[#1E293B]/90 dark:border-[#334155]"
          >
            <div className="p-1.5">
              {items.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-text-light hover:text-primary hover:bg-surface rounded-lg transition-colors"
                >
                  <item.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
