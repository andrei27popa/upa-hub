'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileCheck, Palette, Image, ClipboardCheck, Type, FileText,
  Building2, Building, Globe, AudioLines, Keyboard, MessageCircleHeart,
  ArrowRight,
} from 'lucide-react';
import type { AccessibilityTool } from '@/lib/data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCheck, Palette, Image, ClipboardCheck, Type, FileText,
  Building2, Building, Globe, AudioLines, Keyboard, MessageCircleHeart,
};

const difficultyConfig: Record<string, { bg: string; text: string; dot: string }> = {
  'Începător': { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
  'Intermediar': { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500' },
  'Avansat': { bg: 'bg-rose-50', text: 'text-rose-600', dot: 'bg-rose-500' },
};

export default function ToolCard({ tool }: { tool: AccessibilityTool }) {
  const Icon = iconMap[tool.icon] || FileCheck;
  const diff = difficultyConfig[tool.difficulty] || difficultyConfig['Începător'];

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative bg-white rounded-2xl border border-border overflow-hidden group card-shine flex flex-col"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 via-impact/5 to-secondary/10 flex items-center justify-center text-primary shrink-0 ring-2 ring-primary/5 group-hover:ring-primary/20 transition-all group-hover:shadow-lg group-hover:shadow-primary/10"
          >
            <Icon className="w-7 h-7" aria-hidden="true" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-text group-hover:text-primary transition-colors leading-tight">
              {tool.title}
            </h3>
            <span className="text-xs text-text-lighter font-medium uppercase tracking-wider">{tool.category}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-light text-sm leading-relaxed mb-5 flex-1">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${diff.bg} ${diff.text} text-xs font-semibold rounded-full`}>
            <span className={`w-1.5 h-1.5 ${diff.dot} rounded-full`} />
            {tool.difficulty}
          </span>
          {tool.userType.slice(0, 2).map((type) => (
            <span key={type} className="px-2.5 py-1 bg-surface text-text-light text-xs font-medium rounded-full">
              {type}
            </span>
          ))}
        </div>

        {/* Action */}
        {tool.url ? (
          <Link href={tool.url} className="w-full flex items-center justify-center gap-2 px-4 py-3 btn-primary text-white text-sm font-semibold rounded-xl group/btn">
            Deschide Tool
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-surface text-text-light text-sm font-semibold rounded-xl cursor-not-allowed"
            disabled
          >
            În Curând
          </motion.button>
        )}
      </div>
    </motion.article>
  );
}
