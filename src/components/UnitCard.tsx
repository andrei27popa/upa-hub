import Link from 'next/link';
import { MapPin, Users, BadgeCheck, Heart, Star, Building2 } from 'lucide-react';
import type { ProtectedUnit } from '@/lib/data';

export default function UnitCard({ unit }: { unit: ProtectedUnit }) {
  const impactPercent = Math.round((unit.employeesWithDisabilities / unit.totalEmployees) * 100);

  return (
    <article className="bg-white rounded-xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg" aria-hidden="true">
              {unit.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                <Link href={`/unitati-protejate/${unit.id}`} className="hover:underline">
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
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
              <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
              Verificată
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-text-light text-sm leading-relaxed mb-4 line-clamp-2">
          {unit.description}
        </p>

        {/* Domain & Services */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {unit.domain}
          </span>
          {unit.services.slice(0, 2).map((service) => (
            <span key={service} className="px-2 py-0.5 bg-surface text-text-light text-xs rounded-full">
              {service}
            </span>
          ))}
          {unit.services.length > 2 && (
            <span className="px-2 py-0.5 bg-surface text-text-lighter text-xs rounded-full">
              +{unit.services.length - 2}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-surface rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-text font-semibold text-sm">
              <Users className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              {unit.totalEmployees}
            </div>
            <p className="text-text-lighter text-xs mt-0.5">Angajați</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-text font-semibold text-sm">
              <Heart className="w-3.5 h-3.5 text-error" aria-hidden="true" />
              {impactPercent}%
            </div>
            <p className="text-text-lighter text-xs mt-0.5">Incluziune</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-text font-semibold text-sm">
              <Star className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              {unit.socialImpactScore}
            </div>
            <p className="text-text-lighter text-xs mt-0.5">Impact</p>
          </div>
        </div>

        {/* Impact bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-text-light">Scor impact social</span>
            <span className="text-xs font-semibold text-impact">{unit.socialImpactScore}/100</span>
          </div>
          <div className="w-full h-2 bg-surface rounded-full overflow-hidden" role="progressbar" aria-valuenow={unit.socialImpactScore} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
              style={{ width: `${unit.socialImpactScore}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/unitati-protejate/${unit.id}`}
            className="flex-1 text-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            Vezi Profil
          </Link>
          <button
            className="px-3 py-2 border border-border text-text-light rounded-lg hover:bg-surface hover:text-primary transition-colors"
            aria-label={`Contactează ${unit.name}`}
          >
            <Building2 className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            className="px-3 py-2 border border-border text-text-light rounded-lg hover:bg-surface hover:text-error transition-colors"
            aria-label={`Salvează ${unit.name} la favorite`}
          >
            <Heart className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
