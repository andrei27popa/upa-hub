'use client';

import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-text-lighter">
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-text-lighter/60 shrink-0" aria-hidden="true" />
              )}

              {isLast ? (
                <span className="font-bold text-text" aria-current="page">
                  {isFirst && (
                    <Home className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" aria-hidden="true" />
                  )}
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  {isFirst && (
                    <Home className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  )}
                  {item.label}
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1">
                  {isFirst && (
                    <Home className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  )}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
