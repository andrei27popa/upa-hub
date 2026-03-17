'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  MapPin, Users, Heart, Star, BadgeCheck, Globe, Mail, Phone,
  Calendar, ArrowLeft, Building2, Send, Bookmark, Quote, Shield,
} from 'lucide-react';
import { FadeIn, AnimatedCounter } from '@/components/animations';
import { protectedUnits } from '@/lib/data';
import ShareButton from '@/components/ShareButton';

export default function UnitDetailPage() {
  const params = useParams();
  const unit = protectedUnits.find((u) => u.id === params.id);

  if (!unit) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-2">Unitate negăsită</h1>
          <Link href="/unitati-protejate" className="text-primary hover:underline">Înapoi la lista de unități</Link>
        </div>
      </div>
    );
  }

  const impactPercent = Math.round((unit.employeesWithDisabilities / unit.totalEmployees) * 100);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              <li><Link href="/" className="text-text-light hover:text-primary transition-colors">Acasă</Link></li>
              <li className="text-text-lighter">/</li>
              <li><Link href="/unitati-protejate" className="text-text-light hover:text-primary transition-colors">Unități Protejate</Link></li>
              <li className="text-text-lighter">/</li>
              <li className="text-text font-semibold">{unit.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/unitati-protejate" className="inline-flex items-center gap-2 text-text-light hover:text-primary text-sm mb-6 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Înapoi la lista de unități
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <FadeIn>
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-secondary via-primary to-impact" />
                <div className="p-6 lg:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-impact/10 flex items-center justify-center text-primary font-bold text-2xl shrink-0 ring-2 ring-primary/10" aria-hidden="true">
                      {unit.name.charAt(0)}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h1 className="text-2xl lg:text-3xl font-extrabold text-text tracking-tight">{unit.name}</h1>
                        <ShareButton title={unit.name} />
                        {unit.verified && (
                          <span className="badge-verified inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary text-sm font-semibold rounded-full">
                            <BadgeCheck className="w-4 h-4" aria-hidden="true" /> Verificată
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-text-light text-sm">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" aria-hidden="true" /> {unit.city}, {unit.location}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" aria-hidden="true" /> Fondată în {unit.yearFounded}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-text-light leading-relaxed mb-6">{unit.description}</p>

                  <div className="flex items-center gap-2 mb-6 p-3 bg-surface rounded-xl">
                    <Building2 className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span className="text-sm text-text-light">Fondator / Manager:</span>
                    <span className="text-sm font-bold text-text">{unit.founder}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon: Users, value: unit.totalEmployees, label: 'Total Angajați', color: 'from-primary to-primary-light' },
                      { icon: Heart, value: unit.employeesWithDisabilities, label: 'Cu Dizabilități', color: 'from-rose-500 to-rose-400' },
                      { icon: Star, value: impactPercent, label: 'Rată Incluziune', color: 'from-accent to-amber-400', suffix: '%' },
                      { icon: Star, value: unit.socialImpactScore, label: 'Scor Impact', color: 'from-impact to-purple-400' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-surface p-4 rounded-xl text-center">
                        <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                          <stat.icon className="w-5 h-5 text-white" aria-hidden="true" />
                        </div>
                        <p className="text-xl font-extrabold text-text">
                          <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} />
                        </p>
                        <p className="text-[10px] text-text-lighter mt-0.5 font-semibold uppercase tracking-wider">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Services */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl border border-border p-6 lg:p-8">
                <h2 className="text-xl font-extrabold text-text mb-5">Servicii Oferite</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {unit.services.map((service, i) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3.5 bg-surface rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <div className="w-2.5 h-2.5 bg-gradient-to-br from-primary to-primary-light rounded-full shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium text-text">{service}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Impact */}
            <FadeIn delay={0.2}>
              <div className="bg-white rounded-2xl border border-border p-6 lg:p-8">
                <h2 className="text-xl font-extrabold text-text mb-5">Indicator de Impact Social</h2>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-text-light font-medium">Scor general de impact</span>
                    <span className="text-2xl font-extrabold text-impact">{unit.socialImpactScore}<span className="text-sm text-text-lighter">/100</span></span>
                  </div>
                  <div className="w-full h-3 bg-surface-dark rounded-full overflow-hidden" role="progressbar" aria-valuenow={unit.socialImpactScore} aria-valuemin={0} aria-valuemax={100}>
                    <motion.div
                      className="h-full impact-bar rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${unit.socialImpactScore}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Testimonials */}
            {unit.testimonials.length > 0 && (
              <FadeIn delay={0.3}>
                <div className="bg-white rounded-2xl border border-border p-6 lg:p-8">
                  <h2 className="text-xl font-extrabold text-text mb-6">Testimoniale</h2>
                  <div className="space-y-4">
                    {unit.testimonials.map((testimonial, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 }}
                        className="relative bg-gradient-to-b from-surface to-white p-6 rounded-2xl border border-border/50"
                      >
                        <Quote className="w-8 h-8 text-primary/10 mb-2" aria-hidden="true" />
                        <p className="text-text leading-relaxed mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {testimonial.author.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-text text-sm">{testimonial.author}</p>
                            <p className="text-text-lighter text-xs">{testimonial.role}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <FadeIn direction="right">
              <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
                <h2 className="text-lg font-extrabold text-text mb-5">Contactează</h2>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: Mail, href: `mailto:${unit.email}`, text: unit.email },
                    { icon: Phone, href: `tel:${unit.phone}`, text: unit.phone },
                    { icon: Globe, href: unit.website, text: unit.website.replace('https://', '') },
                  ].map((item) => (
                    <a key={item.text} href={item.href} target={item.icon === Globe ? '_blank' : undefined} rel={item.icon === Globe ? 'noopener noreferrer' : undefined} className="flex items-center gap-3 text-sm text-text-light hover:text-primary transition-colors p-2 rounded-lg hover:bg-surface">
                      <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      {item.text}
                    </a>
                  ))}
                  <div className="flex items-start gap-3 text-sm text-text-light p-2">
                    <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                    </div>
                    {unit.location}, {unit.city}
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center gap-2 px-4 py-3 btn-primary text-white font-semibold rounded-xl">
                    <Send className="w-4 h-4" aria-hidden="true" /> Solicită Ofertă
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors">
                    <Mail className="w-4 h-4" aria-hidden="true" /> Contactează
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-border text-text-light font-medium rounded-xl hover:bg-surface hover:text-rose-500 transition-all">
                    <Bookmark className="w-4 h-4" aria-hidden="true" /> Salvează la Favorite
                  </motion.button>
                </div>

                {unit.certified && (
                  <div className="mt-6 p-4 bg-gradient-to-b from-secondary/5 to-secondary/10 border border-secondary/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-secondary" aria-hidden="true" />
                      <span className="font-bold text-secondary text-sm">Certificare UPA</span>
                    </div>
                    <p className="text-xs text-text-light">
                      Această unitate deține certificarea de unitate protejată autorizată conform legislației în vigoare.
                    </p>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </>
  );
}
