'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo } from 'react';
import {
  TrendingUp, Users, Heart, Building2, ArrowRight,
  MapPin, BarChart3, Target, Sparkles, Calendar,
  HandHeart, Award, Zap,
} from 'lucide-react';
import {
  FadeIn, StaggerContainer, StaggerItem, AnimatedCounter,
  AnimatedOrbs,
} from '@/components/animations';
import { protectedUnits } from '@/lib/data';
import RomaniaMap from '@/components/RomaniaMap';

/* ========== helpers ========== */
function countByField(field: 'domain' | 'region') {
  const map: Record<string, number> = {};
  protectedUnits.forEach(u => {
    map[u[field]] = (map[u[field]] || 0) + 1;
  });
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1]);
}

/* ========== timeline data ========== */
const milestones = [
  { year: 2015, text: 'Prima unitate protejată înregistrată', icon: Building2 },
  { year: 2018, text: 'Pragul de 5 unități atins', icon: Target },
  { year: 2020, text: 'Începe transformarea digitală', icon: Zap },
  { year: 2022, text: 'Pragul de 10 unități atins', icon: Award },
  { year: 2025, text: 'Lansarea platformei UPA Hub', icon: Sparkles },
];

export default function ImpactPage() {
  /* ---- computed stats ---- */
  const stats = useMemo(() => {
    const totalUnits = protectedUnits.length;
    const totalEmployees = protectedUnits.reduce((s, u) => s + u.totalEmployees, 0);
    const totalDisabled = protectedUnits.reduce((s, u) => s + u.employeesWithDisabilities, 0);
    const avgImpact = Math.round(
      protectedUnits.reduce((s, u) => s + u.socialImpactScore, 0) / totalUnits,
    );
    return { totalUnits, totalEmployees, totalDisabled, avgImpact };
  }, []);

  const byDomain = useMemo(() => countByField('domain'), []);
  const byRegion = useMemo(() => countByField('region'), []);
  const maxDomain = byDomain[0]?.[1] ?? 1;
  const maxRegion = byRegion[0]?.[1] ?? 1;

  const disabledPct = Math.round((stats.totalDisabled / stats.totalEmployees) * 100);
  const nonDisabledPct = 100 - disabledPct;

  return (
    <main className="min-h-screen">
      {/* ========== HERO ========== */}
      <section className="relative mesh-gradient text-white overflow-hidden">
        <AnimatedOrbs />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-semibold rounded-full mb-6 border border-white/20">
              <BarChart3 className="w-4 h-4" aria-hidden="true" /> Date și Impact
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Impactul{' '}
              <span className="gradient-text-hero">UPA Hub</span>{' '}
              în România
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Descoperă cum unitățile protejate autorizate transformă viețile persoanelor cu
              dizabilități și contribuie la economia românească.
            </p>
          </FadeIn>
        </div>
        {/* wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0,64 C360,0 720,80 1440,32 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ========== MAP SECTION ========== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary text-sm font-semibold rounded-full mb-4">
                <MapPin className="w-4 h-4" aria-hidden="true" /> Acoperire Națională
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
                Unde suntem <span className="gradient-text">prezenți</span>
              </h2>
              <p className="text-text-light mt-3 max-w-2xl mx-auto">
                Unitățile protejate acoperă mai multe regiuni din România, de la vest la est.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <RomaniaMap units={protectedUnits} />
          </FadeIn>
        </div>
      </section>

      {/* ========== LIVE STATISTICS ========== */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/5 text-secondary text-sm font-semibold rounded-full mb-4">
                <TrendingUp className="w-4 h-4" aria-hidden="true" /> Statistici
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
                Cifre care <span className="gradient-text">contează</span>
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
            {[
              {
                icon: Building2,
                label: 'Unități protejate',
                value: stats.totalUnits,
                suffix: '',
                color: 'text-primary-light',
                bg: 'bg-primary/5',
              },
              {
                icon: Users,
                label: 'Total angajați',
                value: stats.totalEmployees,
                suffix: '',
                color: 'text-secondary',
                bg: 'bg-secondary/5',
              },
              {
                icon: Heart,
                label: 'Angajați cu dizabilități',
                value: stats.totalDisabled,
                suffix: '',
                color: 'text-error',
                bg: 'bg-error/5',
              },
              {
                icon: Target,
                label: 'Scor mediu de impact',
                value: stats.avgImpact,
                suffix: '/100',
                color: 'text-impact',
                bg: 'bg-impact/5',
              },
            ].map(item => (
              <StaggerItem key={item.label}>
                <div className="bg-white rounded-2xl border border-border p-6 text-center card-hover">
                  <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} aria-hidden="true" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-text mb-1">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </p>
                  <p className="text-sm text-text-light">{item.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ========== CHARTS SECTION ========== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/5 text-accent text-sm font-semibold rounded-full mb-4">
                <BarChart3 className="w-4 h-4" aria-hidden="true" /> Grafice
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
                Distribuția <span className="gradient-text">unităților</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Bar chart: Units by domain */}
            <FadeIn delay={0.1} className="lg:col-span-1">
              <div className="bg-surface rounded-2xl border border-border p-6 h-full">
                <h3 className="text-lg font-bold text-text mb-6">Unități pe domeniu</h3>
                <div className="space-y-4">
                  {byDomain.map(([domain, count], i) => (
                    <div key={domain}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-text-light truncate mr-2">{domain}</span>
                        <span className="font-semibold text-text">{count}</span>
                      </div>
                      <div className="w-full h-3 bg-border/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, #10B981, #2563EB)`,
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(count / maxDomain) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Horizontal bars: Units by region */}
            <FadeIn delay={0.2} className="lg:col-span-1">
              <div className="bg-surface rounded-2xl border border-border p-6 h-full">
                <h3 className="text-lg font-bold text-text mb-6">Unități pe regiune</h3>
                <div className="space-y-4">
                  {byRegion.map(([region, count], i) => (
                    <div key={region}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-text-light">{region}</span>
                        <span className="font-semibold text-text">{count}</span>
                      </div>
                      <div className="w-full h-3 bg-border/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, #7C3AED, #F59E0B)`,
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(count / maxRegion) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Donut chart: Employees */}
            <FadeIn delay={0.3} className="lg:col-span-1">
              <div className="bg-surface rounded-2xl border border-border p-6 h-full flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold text-text mb-6 self-start">Structura angajaților</h3>
                <div className="relative w-48 h-48 mb-6">
                  <motion.div
                    className="w-full h-full rounded-full"
                    initial={{ opacity: 0, rotate: -90 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{
                      background: `conic-gradient(
                        #10B981 0deg ${disabledPct * 3.6}deg,
                        #E2E8F0 ${disabledPct * 3.6}deg 360deg
                      )`,
                    }}
                  />
                  {/* Inner circle for donut effect */}
                  <div className="absolute inset-6 bg-surface rounded-full flex flex-col items-center justify-center">
                    <span className="text-2xl font-extrabold text-text">{disabledPct}%</span>
                    <span className="text-xs text-text-light">cu dizabilități</span>
                  </div>
                </div>
                <div className="flex gap-6 text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-secondary inline-block" />
                    Cu dizabilități ({stats.totalDisabled})
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-border inline-block" />
                    Alți angajați ({stats.totalEmployees - stats.totalDisabled})
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========== TIMELINE ========== */}
      <section className="bg-surface py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-impact/5 text-impact text-sm font-semibold rounded-full mb-4">
                <Calendar className="w-4 h-4" aria-hidden="true" /> Cronologie
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
                Parcursul <span className="gradient-text">nostru</span>
              </h2>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary-light to-impact" />

            <div className="space-y-12">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <FadeIn
                    key={m.year}
                    delay={i * 0.12}
                    direction={isLeft ? 'left' : 'right'}
                  >
                    <div className={`relative flex items-center gap-6 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}>
                      {/* Content */}
                      <div className={`ml-16 md:ml-0 md:w-5/12 ${
                        isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                      }`}>
                        <span className="text-sm font-bold text-primary-light">{m.year}</span>
                        <p className="text-text font-semibold mt-1">{m.text}</p>
                      </div>

                      {/* Dot */}
                      <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 w-7 h-7 rounded-full bg-white border-[3px] border-primary-light flex items-center justify-center z-10 shadow-md">
                        <m.icon className="w-3.5 h-3.5 text-primary-light" aria-hidden="true" />
                      </div>

                      {/* Spacer on other side */}
                      <div className="hidden md:block md:w-5/12" />
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== SOCIAL IMPACT METRICS ========== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/5 text-secondary text-sm font-semibold rounded-full mb-4">
                <HandHeart className="w-4 h-4" aria-hidden="true" /> Impact Social
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
                Numerele care <span className="gradient-text">inspiră</span>
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {[
              {
                value: 254,
                label: 'Vieți schimbate',
                description: 'Persoane cu dizabilități care au primit o șansă reală la un loc de muncă.',
                icon: Heart,
                color: 'text-error',
                bg: 'bg-error/5',
              },
              {
                value: 4200000,
                label: 'Valoare economică generată',
                description: 'Lei contribuiți la economia românească prin activitatea unităților protejate.',
                icon: TrendingUp,
                suffix: ' RON',
                color: 'text-secondary',
                bg: 'bg-secondary/5',
              },
              {
                value: 97,
                label: 'Rata de satisfacție',
                description: 'Dintre partenerii comerciali recomandă colaborarea cu unități protejate.',
                icon: Award,
                suffix: '%',
                color: 'text-accent',
                bg: 'bg-accent/5',
              },
            ].map(item => (
              <StaggerItem key={item.label}>
                <div className="bg-surface rounded-2xl border border-border p-8 text-center card-hover">
                  <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                    <item.icon className={`w-7 h-7 ${item.color}`} aria-hidden="true" />
                  </div>
                  <p className="text-4xl sm:text-5xl font-extrabold text-text mb-2">
                    <AnimatedCounter value={item.value} suffix={item.suffix || ''} duration={2.5} />
                  </p>
                  <p className="text-lg font-bold text-text mb-2">{item.label}</p>
                  <p className="text-sm text-text-light leading-relaxed">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="relative mesh-gradient text-white overflow-hidden">
        <AnimatedOrbs />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Vrei să contribui la acest impact?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Fie că ești o companie care dorește să colaboreze cu o unitate protejată, fie că
              vrei să înregistrezi propria unitate, platforma UPA Hub te poate ajuta.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/unitati-protejate"
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-white rounded-xl font-semibold text-lg"
              >
                Descoperă unitățile
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="/inscrie-unitate"
                className="btn-glass inline-flex items-center gap-2 px-8 py-4 text-white rounded-xl font-semibold text-lg"
              >
                Înscrie o unitate
                <Building2 className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
