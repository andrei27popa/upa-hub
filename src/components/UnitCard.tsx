'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Users, BadgeCheck, Heart, Star, Building2 } from 'lucide-react';
import type { ProtectedUnit } from '@/lib/data';

export default function UnitCard({ unit }: { unit: ProtectedUnit }) {
  const impactPercent = Math.round((unit.employeesWithDisabilities / unit.totalEmployees) * 100);

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative bg-white rounded-2xl border border-border overflow-hidden group card-shine"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      {/* Top gradient line */}
      <div className="h-1 w-full bg-gradient-to-r from-secondary via-primary to-impact" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-13 h-13 rounded-2xl bg-gradient-to-br from-primary/10 to-impact/10 flex items-center justify-center text-primary font-bold text-lg ring-2 ring-primary/5"
              aria-hidden="true"
            >
              {unit.name.charAt(0)}
            </motion.div>
            <div>
              <h3 className="font-bold text-text group-hover:text-primary transition-colors">
                <Link href={`/unitati-protejate/${unit.id}`} className="hover:underline decoration-primary/30 underline-offset-2">
                  {unit.name}
                </Link>
              </h3>
              <div className="flex items-center gap-1 text-text-light text-sm">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{unit.city}</span>
              </div>
            </div>
          </div>
          {unit.verified && (
            <span className="badge-verified inline-flex items-center gap-1 px-2.5 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full">
              <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
              Verificată
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-text-light text-sm leading-relaxed mb-4 line-clamp-2">
          {unit.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          <span className="px-2.5 py-0.5 bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-xs font-semibold rounded-full border border-primary/10">
            {unit.domain}
          </span>
          {unit.services.slice(0, 2).map((service) => (
            <span key={service} className="px-2.5 py-0.5 bg-surface text-text-light text-xs rounded-full">
              {service}
            </span>
          ))}
          {unit.services.length > 2 && (
            <span className="px-2.5 py-0.5 bg-surface text-text-lighter text-xs rounded-full">
              +{unit.services.length - 2}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { icon: Users, value: unit.totalEmployees, label: 'Angajați', color: 'text-primary', bg: 'from-primary/10 to-primary/5' },
            { icon: Heart, value: `${impactPercent}%`, label: 'Incluziune', color: 'text-rose-500', bg: 'from-rose-500/10 to-rose-500/5' },
            { icon: Star, value: unit.socialImpactScore, label: 'Impact', color: 'text-accent', bg: 'from-accent/10 to-accent/5' },
          ].map((stat) => (
            <div key={stat.label} className={`text-center p-2.5 bg-gradient-to-b ${stat.bg} rounded-xl`}>
              <div className={`flex items-center justify-center gap-1 font-bold text-sm ${stat.color}`}>
                <stat.icon className="w-3.5 h-3.5" aria-hidden="true" />
                {stat.value}
              </div>
              <p className="text-text-lighter text-[10px] mt-0.5 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Impact bar */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-text-light font-medium">Impact social</span>
            <span className="text-xs font-bold text-impact">{unit.socialImpactScore}/100</span>
          </div>
          <div className="w-full h-2 bg-surface-dark rounded-full overflow-hidden" role="progressbar" aria-valuenow={unit.socialImpactScore} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="h-full impact-bar rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${unit.socialImpactScore}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/unitati-protejate/${unit.id}`}
            className="flex-1 text-center px-4 py-2.5 btn-primary text-white text-sm font-semibold rounded-xl"
          >
            Vezi Profil
          </Link>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2.5 border border-border text-text-light rounded-xl hover:bg-surface hover:text-primary hover:border-primary/30 transition-all"
            aria-label={`Contactează ${unit.name}`}
          >
            <Building2 className="w-4 h-4" aria-hidden="true" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="px-3 py-2.5 border border-border text-text-light rounded-xl hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-all"
            aria-label={`Salvează ${unit.name} la favorite`}
          >
            <Heart className="w-4 h-4" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
