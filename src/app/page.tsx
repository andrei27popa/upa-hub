'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowRight, Search, Shield, Users, Heart, TrendingUp,
  Building2, Wrench, CheckCircle2, Star, Handshake, Sparkles, Zap,
  Calculator, BookOpen, Quote, ChevronLeft, ChevronRight,
  FileCheck, Palette, Globe, Target, Award, Lightbulb,
} from 'lucide-react';
import UnitCard from '@/components/UnitCard';
import ToolCard from '@/components/ToolCard';
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCounter, FloatingElement, AnimatedOrbs } from '@/components/animations';
import { protectedUnits, accessibilityTools } from '@/lib/data';

const testimonials = [
  { quote: 'Colaborarea cu Atelierul de Incluziune ne-a adus nu doar produse de calitate, ci și satisfacția de a contribui la incluziunea socială. O experiență care ne-a schimbat perspectiva asupra diversității la locul de muncă.', author: 'Alexandru Popescu', role: 'Director Achiziții, TechCorp', unit: 'Atelierul de Incluziune', rating: 5 },
  { quote: 'DigiAccess ne-a ajutat să ne facem platforma accesibilă. Expertiză reală în testare de accesibilitate. Au identificat probleme pe care echipa noastră le-a ratat complet.', author: 'Cristina Vasilescu', role: 'CTO, InnoSoft', unit: 'DigiAccess Solutions', rating: 5 },
  { quote: 'De când colaborăm cu GreenHope, colegii sunt mai fericiți la prânz și noi contribuim la o cauză bună. Calitatea mâncării este excepțională.', author: 'Sergiu Bălan', role: 'Office Manager, MarinaCorp', unit: 'GreenHope Catering', rating: 5 },
  { quote: 'TechAbility ne-a ajutat să identificăm 47 de probleme de accesibilitate pe care echipa noastră internă le-a ratat. Perspectiva lor unică este de neprețuit.', author: 'Diana Luca', role: 'Product Manager, FinTech Pro', unit: 'TechAbility', rating: 5 },
  { quote: 'PackSocial gestionează ambalarea pentru trei din liniile noastre de produse. Calitate constantă și livrare la timp, de peste 3 ani.', author: 'Ana Grigorescu', role: 'Supply Chain Manager, FreshFoods', unit: 'PackSocial', rating: 4 },
  { quote: 'Cadourile corporate personalizate de la ArtIncluziv au fost senzația evenimentului nostru anual. Calitate, suflet și impact social într-un singur pachet.', author: 'Marta Constantinescu', role: 'Event Manager, CorporateEvents', unit: 'ArtIncluziv', rating: 5 },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const testimonialsPerPage = typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1;
  const maxIndex = Math.max(0, testimonials.length - testimonialsPerPage);
  const next = () => setCurrent(i => Math.min(i + 1, maxIndex));
  const prev = () => setCurrent(i => Math.max(i - 1, 0));

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/5 text-accent text-sm font-semibold rounded-full mb-4">
                <Quote className="w-4 h-4" aria-hidden="true" /> Testimoniale
              </span>
              <h2 className="text-4xl font-extrabold text-text tracking-tight">
                Ce spun <span className="gradient-text">partenerii noștri</span>
              </h2>
              <p className="text-text-light mt-2">Povești reale de la companii care colaborează cu unități protejate</p>
            </div>
            <div className="hidden md:flex gap-2">
              <button onClick={prev} disabled={current === 0} className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-light hover:bg-surface hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all" aria-label="Testimonial anterior">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next} disabled={current >= maxIndex} className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-light hover:bg-surface hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all" aria-label="Testimonial următor">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </FadeIn>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${current * (100 / 2 + 1.5)}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          >
            {testimonials.map((t, i) => (
              <motion.div key={i} className="min-w-[calc(50%-12px)] max-md:min-w-full" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="bg-surface rounded-2xl p-8 border border-border h-full flex flex-col">
                  <div className="flex gap-1 mb-4" aria-label={`Rating: ${t.rating} din 5`}>
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className={`w-4 h-4 ${si < t.rating ? 'text-accent fill-accent' : 'text-border'}`} aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-text leading-relaxed flex-1 mb-6 italic">&ldquo;{t.quote}&rdquo;</blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-impact flex items-center justify-center text-white font-bold text-sm">{t.author.charAt(0)}</div>
                    <div>
                      <p className="font-semibold text-text text-sm">{t.author}</p>
                      <p className="text-text-lighter text-xs">{t.role}</p>
                    </div>
                    <span className="ml-auto px-2.5 py-0.5 bg-secondary/10 text-secondary text-xs font-semibold rounded-full">{t.unit}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <FadeIn delay={0.3}>
          <div className="text-center mt-10">
            <Link href="/povesti-succes" className="inline-flex items-center gap-2 px-6 py-3 text-primary font-semibold hover:bg-primary/5 rounded-xl transition-colors">
              Vezi toate poveștile de succes
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="relative min-h-[100vh] flex items-center mesh-gradient overflow-hidden">
        {/* Animated background orbs */}
        <AnimatedOrbs />

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-30" aria-hidden="true" />

        {/* Floating decorative elements */}
        <FloatingElement duration={8} distance={30} delay={0} className="absolute top-32 right-[15%] hidden lg:block">
          <div className="w-16 h-16 rounded-2xl bg-secondary/20 backdrop-blur-sm border border-secondary/20 flex items-center justify-center">
            <Shield className="w-8 h-8 text-secondary-light" />
          </div>
        </FloatingElement>
        <FloatingElement duration={10} distance={25} delay={2} className="absolute bottom-40 right-[25%] hidden lg:block">
          <div className="w-14 h-14 rounded-2xl bg-accent/20 backdrop-blur-sm border border-accent/20 flex items-center justify-center">
            <Heart className="w-7 h-7 text-accent-light" />
          </div>
        </FloatingElement>
        <FloatingElement duration={7} distance={20} delay={4} className="absolute top-[45%] right-[8%] hidden lg:block">
          <div className="w-12 h-12 rounded-xl bg-impact/20 backdrop-blur-sm border border-impact/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-purple-300" />
          </div>
        </FloatingElement>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-8 border border-white/10"
            >
              <Zap className="w-4 h-4 text-accent-light" aria-hidden="true" />
              Platformă pentru incluziune și accesibilitate
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight"
            >
              Conectăm companiile{' '}
              <br className="hidden sm:block" />
              responsabile cu{' '}
              <span className="gradient-text-hero">unitățile protejate</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl lg:text-2xl text-blue-100/80 leading-relaxed mb-10 max-w-2xl font-light"
            >
              Resursa centrală pentru colaborare cu unități protejate autorizate
              și instrumente digitale pentru accesibilitate și incluziune.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/unitati-protejate"
                className="btn-primary inline-flex items-center justify-center gap-2.5 px-8 py-4 text-white font-semibold rounded-2xl text-lg"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
                Găsește o Unitate Protejată
              </Link>
              <Link
                href="/tool-uri"
                className="btn-glass inline-flex items-center justify-center gap-2.5 px-8 py-4 text-white font-semibold rounded-2xl text-lg"
              >
                <Wrench className="w-5 h-5" aria-hidden="true" />
                Explorează Tool-uri
              </Link>
            </motion.div>

            {/* Mini social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-12 flex items-center gap-6 text-blue-200/60"
            >
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D'].map((l, i) => (
                  <div key={l} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-light to-impact border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold" style={{ zIndex: 4 - i }}>
                    {l}
                  </div>
                ))}
              </div>
              <span className="text-sm">Peste <strong className="text-white">150</strong> unități protejate înregistrate</span>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ====== STATS ====== */}
      <section className="bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Building2, value: 150, suffix: '+', label: 'Unități Protejate', color: 'from-primary to-primary-light', iconColor: 'text-primary' },
              { icon: Users, value: 3500, suffix: '+', label: 'Persoane Angajate', color: 'from-secondary to-emerald-400', iconColor: 'text-secondary' },
              { icon: Handshake, value: 800, suffix: '+', label: 'Colaborări Active', color: 'from-accent to-amber-400', iconColor: 'text-accent' },
              { icon: Wrench, value: 14, suffix: '', label: 'Tool-uri Disponibile', color: 'from-impact to-purple-400', iconColor: 'text-impact' },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-border p-6 text-center card-hover shadow-sm">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center bg-opacity-10`}>
                    <stat.icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <p className="text-3xl lg:text-4xl font-extrabold text-text">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-text-lighter text-sm mt-1 font-medium">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== WHAT IS UPA ====== */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary text-sm font-semibold rounded-full mb-4">
                <Shield className="w-4 h-4" aria-hidden="true" /> Despre UPA
              </span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-text mb-5 tracking-tight">
                Ce este o <span className="gradient-text">Unitate Protejată?</span>
              </h2>
              <p className="text-text-light text-lg leading-relaxed">
                O unitate protejată autorizată angajează persoane cu dizabilități
                într-un mediu de lucru adaptat. Companiile cu peste 50 de angajați au obligația legală de a
                colabora cu UPA-uri sau de a plăti o contribuție la bugetul de stat.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {[
              {
                icon: CheckCircle2,
                title: 'Conformitate Legală',
                description: 'Îndeplinești obligațiile prevăzute de Legea 448/2006 privind angajarea persoanelor cu dizabilități.',
                gradient: 'from-primary/10 to-primary/5',
                iconBg: 'from-primary to-primary-light',
              },
              {
                icon: Heart,
                title: 'Impact Social Real',
                description: 'Contribui direct la incluziunea persoanelor cu dizabilități în câmpul muncii și la independența lor economică.',
                gradient: 'from-rose-500/10 to-rose-500/5',
                iconBg: 'from-rose-500 to-rose-400',
              },
              {
                icon: Star,
                title: 'Servicii de Calitate',
                description: 'Unitățile protejate oferă servicii și produse profesionale la prețuri competitive, cu valoare adăugată socială.',
                gradient: 'from-accent/10 to-accent/5',
                iconBg: 'from-accent to-amber-400',
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className={`bg-gradient-to-b ${item.gradient} p-8 rounded-2xl border border-border/50 card-hover h-full`}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center mb-5 shadow-lg`}>
                    <item.icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-text text-xl mb-3">{item.title}</h3>
                  <p className="text-text-light leading-relaxed">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.4}>
            <div className="text-center mt-10">
              <Link href="/ce-este-upa" className="inline-flex items-center gap-2 px-6 py-3 text-primary font-semibold hover:bg-primary/5 rounded-xl transition-colors">
                Află mai mult despre unitățile protejate
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== FEATURED UNITS ====== */}
      <section className="bg-surface dot-pattern py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary text-sm font-semibold rounded-full mb-4">
                  <Building2 className="w-4 h-4" aria-hidden="true" /> Director
                </span>
                <h2 className="text-4xl font-extrabold text-text tracking-tight">
                  Unități Protejate <span className="gradient-text">Recomandate</span>
                </h2>
                <p className="text-text-light mt-2">Descoperă unități protejate verificate și de încredere</p>
              </div>
              <Link href="/unitati-protejate" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-primary font-semibold border border-primary/20 rounded-xl hover:bg-primary/5 transition-all">
                Vezi toate
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.12}>
            {protectedUnits.slice(0, 3).map((unit) => (
              <StaggerItem key={unit.id}>
                <UnitCard unit={unit} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="text-center mt-10 md:hidden">
              <Link href="/unitati-protejate" className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-xl">
                Vezi toate unitățile <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/5 text-secondary text-sm font-semibold rounded-full mb-4">
                <Target className="w-4 h-4" aria-hidden="true" /> Cum funcționează
              </span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-text mb-5 tracking-tight">
                De la căutare la <span className="gradient-text">colaborare</span>, în 4 pași
              </h2>
              <p className="text-text-light text-lg">Procesul este simplu, transparent și complet gratuit.</p>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-secondary via-accent to-impact opacity-20" aria-hidden="true" />

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.15}>
              {[
                { step: '01', icon: Search, title: 'Descoperă', description: 'Explorează directorul de unități protejate. Filtrează după servicii, regiune sau domeniu de activitate.', color: 'from-primary to-primary-light' },
                { step: '02', icon: FileCheck, title: 'Evaluează', description: 'Citește profilurile detaliate, verifică certificările și scorul de impact social al fiecărei unități.', color: 'from-secondary to-emerald-400' },
                { step: '03', icon: Handshake, title: 'Contactează', description: 'Trimite o cerere de ofertă sau contactează direct unitatea. Noi facilităm prima conexiune.', color: 'from-accent to-amber-400' },
                { step: '04', icon: Award, title: 'Colaborează', description: 'Începe colaborarea și contribuie la incluziunea persoanelor cu dizabilități în câmpul muncii.', color: 'from-impact to-purple-400' },
              ].map((item) => (
                <StaggerItem key={item.step}>
                  <motion.div whileHover={{ y: -6 }} className="relative text-center group">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow relative z-10`}>
                      <item.icon className="w-9 h-9 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-6xl font-black text-surface-dark absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-0 select-none" aria-hidden="true">{item.step}</span>
                    <h3 className="font-bold text-text text-xl mb-2">{item.title}</h3>
                    <p className="text-text-light text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ====== FEATURED TOOLS ====== */}
      <section className="bg-surface dot-pattern py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-impact/5 text-impact text-sm font-semibold rounded-full mb-4">
                  <Wrench className="w-4 h-4" aria-hidden="true" /> Instrumente
                </span>
                <h2 className="text-4xl font-extrabold text-text tracking-tight">
                  Tool-uri pentru <span className="gradient-text">Accesibilitate</span>
                </h2>
                <p className="text-text-light mt-2">Instrumente digitale gratuite pentru incluziune</p>
              </div>
              <Link href="/tool-uri" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-impact font-semibold border border-impact/20 rounded-xl hover:bg-impact/5 transition-all">
                Vezi toate <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.12}>
            {accessibilityTools.slice(0, 3).map((tool) => (
              <StaggerItem key={tool.id}>
                <ToolCard tool={tool} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Calculator CTA */}
          <FadeIn delay={0.3}>
            <motion.div whileHover={{ y: -4 }} className="mt-10 relative overflow-hidden rounded-2xl border border-border bg-white p-8 lg:p-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-secondary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
              <div className="relative flex flex-col lg:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-emerald-400 flex items-center justify-center shadow-lg shrink-0">
                  <Calculator className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-xl font-bold text-text mb-1">Calculator Economii Colaborare UPA</h3>
                  <p className="text-text-light">Află cât poți economisi anual prin colaborarea cu o unitate protejată vs. plata contribuției la bugetul de stat.</p>
                </div>
                <Link href="/calculator" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-white font-semibold rounded-xl shrink-0">
                  Calculează acum <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ====== SOCIAL IMPACT ====== */}
      <section className="relative mesh-gradient text-white py-24 overflow-hidden">
        <AnimatedOrbs />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <TrendingUp className="w-14 h-14 mx-auto mb-6 text-secondary-light" aria-hidden="true" />
              </motion.div>
              <h2 className="text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">Impactul Nostru Social</h2>
              <p className="text-xl text-blue-100/70 leading-relaxed mb-12 font-light">
                Fiecare colaborare cu o unitate protejată schimbă vieți. Facilităm conexiuni care generează
                locuri de muncă, independență economică și demnitate.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-2xl mx-auto">
                {[
                  { value: 92, suffix: '%', label: 'Rată de satisfacție' },
                  { value: 2500000, prefix: '€', suffix: '', label: 'Valoare contracte' },
                  { value: 1200, suffix: '+', label: 'Vieți schimbate' },
                  { value: 45, suffix: '%', label: 'Economie medie' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl lg:text-4xl font-extrabold text-secondary-light">
                      {stat.value >= 1000000
                        ? <>{stat.prefix}<AnimatedCounter value={2.5} suffix="M" duration={2} /></>
                        : <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix || ''} />
                      }
                    </p>
                    <p className="text-blue-200/60 text-sm mt-2 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== TESTIMONIALS CAROUSEL ====== */}
      <TestimonialsSection />

      {/* ====== BLOG PREVIEW ====== */}
      <section className="bg-surface dot-pattern py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary text-sm font-semibold rounded-full mb-4">
                  <BookOpen className="w-4 h-4" aria-hidden="true" /> Blog
                </span>
                <h2 className="text-4xl font-extrabold text-text tracking-tight">
                  Articole & <span className="gradient-text">Resurse</span>
                </h2>
                <p className="text-text-light mt-2">Legislație, ghiduri practice și povești de succes</p>
              </div>
              <Link href="/blog" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-primary font-semibold border border-primary/20 rounded-xl hover:bg-primary/5 transition-all">
                Toate articolele <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.12}>
            {[
              { title: 'Legea 448/2006: Tot ce trebuie să știi', category: 'Legislație', date: '15 Mar 2025', readTime: 8, excerpt: 'Ghid complet privind obligațiile angajatorilor cu peste 50 de angajați și avantajele colaborării cu unitățile protejate autorizate.', color: 'from-primary to-primary-light', slug: 'legea-448-2006-ghid-complet' },
              { title: '5 Beneficii ale colaborării cu o unitate protejată', category: 'Incluziune', date: '2 Mar 2025', readTime: 5, excerpt: 'Descoperă cum colaborarea cu unitățile protejate aduce beneficii economice, sociale și de imagine companiei tale.', color: 'from-secondary to-emerald-400', slug: '5-beneficii-colaborare-upa' },
              { title: 'Cum să faci un website accesibil', category: 'Accesibilitate', date: '18 Feb 2025', readTime: 12, excerpt: 'Ghid complet WCAG 2.1 pentru dezvoltatori și designeri care vor să creeze experiențe digitale incluzive pentru toți.', color: 'from-impact to-purple-400', slug: 'ghid-wcag-accesibilitate-web' },
            ].map((post) => (
              <StaggerItem key={post.slug}>
                <motion.article whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="bg-white rounded-2xl border border-border overflow-hidden group card-shine h-full flex flex-col">
                  {/* Color header bar */}
                  <div className={`h-2 w-full bg-gradient-to-r ${post.color}`} />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-0.5 bg-primary/5 text-primary text-xs font-semibold rounded-full">{post.category}</span>
                      <span className="text-text-lighter text-xs">{post.date}</span>
                      <span className="text-text-lighter text-xs">· {post.readTime} min</span>
                    </div>
                    <h3 className="font-bold text-text text-lg mb-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-text-light text-sm leading-relaxed flex-1">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                      Citește <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ====== PARTNERS ====== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-center text-text-lighter text-sm font-semibold uppercase tracking-widest mb-10">
              Parteneri și Susținători
            </h2>
          </FadeIn>
          <StaggerContainer className="flex flex-wrap justify-center items-center gap-5 lg:gap-8" staggerDelay={0.08}>
            {['ANPD', 'MMSS', 'CNDR', 'UNICEF România', 'Fundația Motivation', 'ASCHF', 'CNADR', 'Camera de Comerț'].map((partner) => (
              <StaggerItem key={partner}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-8 py-4 bg-surface rounded-xl text-text-light font-semibold text-sm border border-border/50 hover:border-primary/20 hover:shadow-md transition-all cursor-default"
                >
                  {partner}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 mesh-gradient" />
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="relative p-10 lg:p-16 text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-10 h-10 text-accent-light mx-auto mb-5" aria-hidden="true" />
                </motion.div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
                  Ești o unitate protejată autorizată?
                </h2>
                <p className="text-blue-100/70 text-lg mb-10 max-w-2xl mx-auto font-light">
                  Înscrie-te gratuit pe UPA Hub și conectează-te cu sute de companii
                  care caută parteneri de încredere pentru colaborare.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/inscrie-unitate"
                    className="inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-white text-primary font-bold rounded-2xl hover:shadow-xl hover:shadow-white/20 hover:-translate-y-1 transition-all text-lg"
                  >
                    Înscrie Unitatea Ta
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/faq"
                    className="btn-glass inline-flex items-center justify-center gap-2.5 px-10 py-4 text-white font-semibold rounded-2xl text-lg"
                  >
                    <Lightbulb className="w-5 h-5" aria-hidden="true" />
                    Întrebări frecvente
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
