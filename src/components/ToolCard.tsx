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

const difficultyColors: Record<string, string> = {
  'Începător': 'bg-green-100 text-green-700',
  'Intermediar': 'bg-amber-100 text-amber-700',
  'Avansat': 'bg-red-100 text-red-700',
};

export default function ToolCard({ tool }: { tool: AccessibilityTool }) {
  const Icon = iconMap[tool.icon] || FileCheck;

  return (
    <article className="bg-white rounded-xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
            <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
              {tool.title}
            </h3>
            <span className="text-xs text-text-lighter">{tool.category}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-text-light text-sm leading-relaxed mb-4 flex-1">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${difficultyColors[tool.difficulty]}`}>
            {tool.difficulty}
          </span>
          {tool.userType.slice(0, 3).map((type) => (
            <span key={type} className="px-2 py-0.5 bg-surface text-text-light text-xs rounded-full">
              {type}
            </span>
          ))}
        </div>

        {/* Action */}
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors group/btn">
          Deschide Tool
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
