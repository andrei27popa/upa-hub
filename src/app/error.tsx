'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Eroare aplicație:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary-dark px-4">
      <div className="text-center max-w-lg mx-auto">
        {/* Iconița de eroare */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-500/15 backdrop-blur-sm border border-red-500/20 mb-8"
        >
          <AlertTriangle className="w-10 h-10 text-red-400" />
        </motion.div>

        {/* Titlu */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Ceva nu a mers bine
        </motion.h1>

        {/* Mesaj de eroare */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/60 text-base mb-4"
        >
          A apărut o eroare neașteptată. Te rugăm să încerci din nou sau să revii mai târziu.
        </motion.p>

        {/* Detalii eroare */}
        {error?.message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-8"
          >
            <p className="text-white/40 text-sm font-mono break-words">
              {error.message}
            </p>
          </motion.div>
        )}

        {/* Butoane */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={reset}
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-semibold rounded-xl cursor-pointer"
          >
            <RefreshCw className="w-5 h-5" />
            Încearcă din nou
          </button>
          <Link
            href="/"
            className="btn-glass inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-semibold rounded-xl"
          >
            <Home className="w-5 h-5" />
            Acasă
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
