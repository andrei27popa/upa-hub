import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin, Users, Heart, Star, BadgeCheck, Globe, Mail, Phone,
  Calendar, ArrowLeft, Building2, Send, Bookmark, Quote,
} from 'lucide-react';
import { protectedUnits } from '@/lib/data';

export function generateStaticParams() {
  return protectedUnits.map((unit) => ({ id: unit.id }));
}

export default async function UnitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const unit = protectedUnits.find((u) => u.id === id);

  if (!unit) {
    notFound();
  }

  const impactPercent = Math.round((unit.employeesWithDisabilities / unit.totalEmployees) * 100);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              <li><Link href="/" className="text-text-light hover:text-primary">Acasă</Link></li>
              <li className="text-text-lighter">/</li>
              <li><Link href="/unitati-protejate" className="text-text-light hover:text-primary">Unități Protejate</Link></li>
              <li className="text-text-lighter">/</li>
              <li className="text-text font-medium">{unit.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/unitati-protejate" className="inline-flex items-center gap-2 text-text-light hover:text-primary text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Înapoi la lista de unități
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-xl border border-border p-6 lg:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl shrink-0" aria-hidden="true">
                  {unit.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl lg:text-3xl font-bold text-text">{unit.name}</h1>
                    {unit.verified && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full">
                        <BadgeCheck className="w-4 h-4" aria-hidden="true" />
                        Unitate Verificată
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-text-light text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                      {unit.city}, {unit.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      Fondată în {unit.yearFounded}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-text-light leading-relaxed mb-6">{unit.description}</p>

              <div className="flex items-center gap-2 mb-6">
                <Building2 className="w-4 h-4 text-text-lighter" aria-hidden="true" />
                <span className="text-sm text-text-light">Fondator / Manager:</span>
                <span className="text-sm font-semibold text-text">{unit.founder}</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-surface p-4 rounded-lg text-center">
                  <Users className="w-5 h-5 text-primary mx-auto mb-1" aria-hidden="true" />
                  <p className="text-xl font-bold text-text">{unit.totalEmployees}</p>
                  <p className="text-xs text-text-lighter">Total Angajați</p>
                </div>
                <div className="bg-surface p-4 rounded-lg text-center">
                  <Heart className="w-5 h-5 text-error mx-auto mb-1" aria-hidden="true" />
                  <p className="text-xl font-bold text-text">{unit.employeesWithDisabilities}</p>
                  <p className="text-xs text-text-lighter">Cu Dizabilități</p>
                </div>
                <div className="bg-surface p-4 rounded-lg text-center">
                  <Star className="w-5 h-5 text-accent mx-auto mb-1" aria-hidden="true" />
                  <p className="text-xl font-bold text-text">{impactPercent}%</p>
                  <p className="text-xs text-text-lighter">Rată Incluziune</p>
                </div>
                <div className="bg-surface p-4 rounded-lg text-center">
                  <Star className="w-5 h-5 text-impact mx-auto mb-1" aria-hidden="true" />
                  <p className="text-xl font-bold text-text">{unit.socialImpactScore}</p>
                  <p className="text-xs text-text-lighter">Scor Impact</p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl border border-border p-6 lg:p-8">
              <h2 className="text-xl font-bold text-text mb-4">Servicii Oferite</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {unit.services.map((service) => (
                  <div key={service} className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full shrink-0" aria-hidden="true" />
                    <span className="text-sm text-text">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Domain & Products */}
            <div className="bg-white rounded-xl border border-border p-6 lg:p-8">
              <h2 className="text-xl font-bold text-text mb-4">Domeniu și Produse</h2>
              <div className="mb-4">
                <span className="text-sm text-text-light">Domeniu de activitate:</span>
                <span className="ml-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {unit.domain}
                </span>
              </div>
              <div>
                <span className="text-sm text-text-light">Tipuri de produse:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {unit.productTypes.map((pt) => (
                    <span key={pt} className="px-3 py-1 bg-surface text-text-light text-sm rounded-full">
                      {pt}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Impact Social */}
            <div className="bg-white rounded-xl border border-border p-6 lg:p-8">
              <h2 className="text-xl font-bold text-text mb-4">Indicator de Impact Social</h2>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-light">Scor general de impact</span>
                  <span className="text-lg font-bold text-impact">{unit.socialImpactScore}/100</span>
                </div>
                <div className="w-full h-3 bg-surface rounded-full overflow-hidden" role="progressbar" aria-valuenow={unit.socialImpactScore} aria-valuemin={0} aria-valuemax={100} aria-label="Scor impact social">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    style={{ width: `${unit.socialImpactScore}%` }}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-surface rounded-lg">
                  <p className="text-lg font-bold text-primary">{impactPercent}%</p>
                  <p className="text-xs text-text-lighter">Angajați cu dizabilități</p>
                </div>
                <div className="text-center p-3 bg-surface rounded-lg">
                  <p className="text-lg font-bold text-secondary">{unit.yearFounded}</p>
                  <p className="text-xs text-text-lighter">An înființare</p>
                </div>
                <div className="text-center p-3 bg-surface rounded-lg">
                  <p className="text-lg font-bold text-accent">{unit.certified ? 'Da' : 'Nu'}</p>
                  <p className="text-xs text-text-lighter">Certificare UPA</p>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            {unit.testimonials.length > 0 && (
              <div className="bg-white rounded-xl border border-border p-6 lg:p-8">
                <h2 className="text-xl font-bold text-text mb-6">Testimoniale</h2>
                <div className="space-y-4">
                  {unit.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-surface p-5 rounded-lg">
                      <Quote className="w-6 h-6 text-primary/30 mb-2" aria-hidden="true" />
                      <p className="text-text leading-relaxed mb-3 italic">&ldquo;{testimonial.text}&rdquo;</p>
                      <div>
                        <p className="font-semibold text-text text-sm">{testimonial.author}</p>
                        <p className="text-text-lighter text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl border border-border p-6 sticky top-24">
              <h2 className="text-lg font-bold text-text mb-4">Contactează</h2>

              <div className="space-y-3 mb-6">
                <a href={`mailto:${unit.email}`} className="flex items-center gap-3 text-sm text-text-light hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {unit.email}
                </a>
                <a href={`tel:${unit.phone}`} className="flex items-center gap-3 text-sm text-text-light hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {unit.phone}
                </a>
                <a href={unit.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-text-light hover:text-primary transition-colors">
                  <Globe className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {unit.website.replace('https://', '')}
                </a>
                <div className="flex items-start gap-3 text-sm text-text-light">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  {unit.location}, {unit.city}
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Solicită Ofertă
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Contactează
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-border text-text-light font-medium rounded-lg hover:bg-surface transition-colors">
                  <Bookmark className="w-4 h-4" aria-hidden="true" />
                  Salvează la Favorite
                </button>
              </div>

              {unit.certified && (
                <div className="mt-6 p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeCheck className="w-5 h-5 text-secondary" aria-hidden="true" />
                    <span className="font-semibold text-secondary text-sm">Certificare UPA</span>
                  </div>
                  <p className="text-xs text-text-light">
                    Această unitate deține certificarea de unitate protejată autorizată conform legislației în vigoare.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
