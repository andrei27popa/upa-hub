'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary-dark">
      <div className="text-center">
        {/* Iconița Shield animată */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 mb-6"
        >
          <Shield className="w-10 h-10 text-secondary-light" />
        </motion.div>

        {/* Text de încărcare */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/70 text-lg font-medium tracking-wide"
        >
          Se încarcă...
        </motion.p>

        {/* Bară de progres animată */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden"
        >
          <motion.div
            className="h-full bg-secondary rounded-full"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ width: '40%' }}
          />
        </motion.div>
      </div>
    </main>
  );
}
