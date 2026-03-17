'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Mail, Phone, Globe, Calendar, Users, Heart,
  BadgeCheck, Shield, ArrowLeft, Share2, QrCode, Download,
  ExternalLink, Building2,
} from 'lucide-react';
import { protectedUnits } from '@/lib/data';

export default function BusinessCardPage() {
  const params = useParams();
  const unit = protectedUnits.find((u) => u.id === params.id);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!unit) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white rounded-2xl shadow-xl p-10 max-w-sm w-full"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-red-400" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Carte de vizită negăsită</h1>
          <p className="text-gray-500 text-sm mb-6">Unitatea protejată solicitată nu a fost găsită în directorul nostru.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Înapoi la pagina principală
          </Link>
        </motion.div>
      </div>
    );
  }

  const impactPercent = Math.round((unit.employeesWithDisabilities / unit.totalEmployees) * 100);
  const shortDesc = unit.description.length > 120 ? unit.description.slice(0, 120) + '...' : unit.description;

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-lg w-full"
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/60 overflow-hidden border border-gray-100">
          {/* Top Banner */}
          <div className="relative h-32 bg-gradient-to-r from-[#1B4D8E] via-[#2E7BBF] to-[#7C3AED]">
            {/* Decorative circles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/5" />
            </div>

            {/* Initial avatar - overlapping banner */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl bg-white shadow-lg shadow-gray-200/50 flex items-center justify-center ring-4 ring-white"
            >
              <span className="text-3xl font-extrabold bg-gradient-to-br from-[#1B4D8E] to-[#7C3AED] bg-clip-text text-transparent">
                {unit.name.charAt(0)}
              </span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="pt-12 px-6 pb-6">
            {/* Name + Verified */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-4"
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">{unit.name}</h1>
                {unit.verified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring' }}
                  >
                    <BadgeCheck className="w-5 h-5 text-blue-500" aria-label="Verificată" />
                  </motion.div>
                )}
              </div>

              {/* Domain pill */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                {unit.domain}
              </span>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2 mb-5"
            >
              <a
                href={`mailto:${unit.email}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <Mail className="w-4 h-4 text-blue-600" aria-hidden="true" />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors truncate">{unit.email}</span>
              </a>

              <a
                href={`tel:${unit.phone}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                  <Phone className="w-4 h-4 text-green-600" aria-hidden="true" />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-green-600 transition-colors">{unit.phone}</span>
              </a>

              <a
                href={unit.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
                  <Globe className="w-4 h-4 text-purple-600" aria-hidden="true" />
                </div>
                <span className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors truncate">{unit.website.replace('https://', '')}</span>
                <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" aria-hidden="true" />
              </a>

              <div className="flex items-center gap-3 px-3 py-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-rose-500" aria-hidden="true" />
                </div>
                <span className="text-sm text-gray-600">{unit.location}, {unit.city}</span>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5" />

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-3 mb-5"
            >
              <div className="text-center p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-center mb-1">
                  <Users className="w-4 h-4 text-blue-500" aria-hidden="true" />
                </div>
                <p className="text-lg font-extrabold text-gray-900">{unit.totalEmployees}</p>
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Total Angajați</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="w-4 h-4 text-rose-500" aria-hidden="true" />
                </div>
                <p className="text-lg font-extrabold text-gray-900">{unit.employeesWithDisabilities}</p>
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Cu Dizabilități</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-gray-50">
                <div className="flex items-center justify-center mb-1">
                  <Shield className="w-4 h-4 text-purple-500" aria-hidden="true" />
                </div>
                <p className="text-lg font-extrabold text-gray-900">{unit.socialImpactScore}</p>
                <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Scor Impact</p>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-5"
            >
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Servicii</h2>
              <div className="flex flex-wrap gap-1.5">
                {unit.services.map((service, i) => (
                  <motion.span
                    key={service}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.05 }}
                    className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {service}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-6"
            >
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Despre</h2>
              <p className="text-sm text-gray-600 leading-relaxed px-1">
                {expanded ? unit.description : shortDesc}
              </p>
              {unit.description.length > 120 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-1 px-1 transition-colors"
                >
                  {expanded ? 'Mai puțin' : 'Mai mult...'}
                </button>
              )}
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5" />

            {/* Bottom actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="space-y-3"
            >
              {/* Full profile link */}
              <Link
                href={`/unitati-protejate/${unit.id}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#1B4D8E] to-[#7C3AED] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm"
              >
                <Building2 className="w-4 h-4" aria-hidden="true" />
                Vezi profilul complet
              </Link>

              {/* Share button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-all text-sm"
              >
                <Share2 className="w-4 h-4" aria-hidden="true" />
                {copied ? 'Link copiat!' : 'Distribuie cartea de vizită'}
              </motion.button>
            </motion.div>

            {/* Powered by */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 pt-4 border-t border-gray-100 text-center"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-600 transition-colors font-medium"
              >
                <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                Powered by UPA Hub
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
