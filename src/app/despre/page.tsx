'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Shield, Target, Eye, Heart, Users, Building2, Wrench, TrendingUp,
  ArrowRight, Sparkles, CheckCircle2, Globe,
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCounter, AnimatedOrbs } from '@/components/animations';

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="relative mesh-gradient text-white pt-28 pb-20 overflow-hidden">
        <AnimatedOrbs />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-5 border border-white/10">
              <Shield className="w-4 h-4" aria-hidden="true" /> Despre Noi
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-5 tracking-tight max-w-3xl">
              Construim punți între <span className="gradient-text-hero">companii</span> și <span className="gradient-text-hero">incluziune</span>
            </h1>
            <p className="text-xl text-blue-100/70 leading-relaxed max-w-2xl font-light">
              UPA Hub este platforma digitală care conectează companiile responsabile cu unitățile protejate
              autorizate și promovează incluziunea persoanelor cu dizabilități în câmpul muncii din România.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L80 68C160 56 320 32 480 24C640 16 800 24 960 32C1120 40 1280 48 1360 52L1440 56V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary text-sm font-semibold rounded-full mb-4">
                  <Target className="w-4 h-4" aria-hidden="true" /> Misiune
                </span>
                <h2 className="text-4xl font-extrabold text-text mb-6 tracking-tight">
                  De ce existăm și <span className="gradient-text">ce ne motivează</span>
                </h2>
                <p className="text-text-light leading-relaxed mb-4 text-lg">
                  UPA Hub a fost creat cu scopul de a facilita și accelera incluziunea persoanelor cu
                  dizabilități pe piața muncii din România. Credem că fiecare persoană merită oportunitatea
                  de a contribui și de a fi apreciată pentru valoarea pe care o aduce.
                </p>
                <p className="text-text-light leading-relaxed mb-6">
                  Prin intermediul platformei noastre, simplificăm procesul de identificare și colaborare
                  cu unități protejate autorizate, oferind în același timp instrumente digitale gratuite
                  pentru accesibilitate și incluziune.
                </p>
                <div className="space-y-3">
                  {[
                    'O piață a muncii fără bariere pentru persoanele cu dizabilități',
                    'Fiecare companie să contribuie activ la incluziunea socială',
                    'Instrumente digitale gratuite pentru toți',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-text font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.1}>
                {[
                  { icon: Target, title: 'Viziune', description: 'O piață a muncii în care dizabilitatea nu mai este o barieră.', color: 'from-primary to-primary-light' },
                  { icon: Heart, title: 'Valori', description: 'Incluziune, transparență, empatie și impact social.', color: 'from-rose-500 to-rose-400' },
                  { icon: Eye, title: 'Transparență', description: 'Verificăm și certificăm fiecare unitate protejată.', color: 'from-accent to-amber-400' },
                  { icon: TrendingUp, title: 'Impact', description: 'Măsurăm impactul social al fiecărei colaborări.', color: 'from-impact to-purple-400' },
                ].map((item) => (
                  <StaggerItem key={item.title}>
                    <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-2xl border border-border card-hover">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <h3 className="font-bold text-text mb-2">{item.title}</h3>
                      <p className="text-text-light text-sm leading-relaxed">{item.description}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative mesh-gradient text-white py-20 overflow-hidden">
        <AnimatedOrbs />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: 12, suffix: '+', label: 'Unități pe platformă' },
                { value: 390, suffix: '+', label: 'Angajați cu dizabilități' },
                { value: 14, suffix: '', label: 'Tool-uri gratuite' },
                { value: 8, suffix: '', label: 'Regiuni acoperite' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl lg:text-5xl font-extrabold text-secondary-light">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-blue-200/60 text-sm mt-2 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What we offer */}
      <section className="bg-surface dot-pattern py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/5 text-secondary text-sm font-semibold rounded-full mb-4">
                <Wrench className="w-4 h-4" aria-hidden="true" /> Servicii
              </span>
              <h2 className="text-4xl font-extrabold text-text tracking-tight">Ce <span className="gradient-text">Oferim</span></h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {[
              {
                icon: Building2, title: 'Director de Unități Protejate',
                description: 'Cel mai complet director de unități protejate autorizate din România. Cu filtre avansate, profile detaliate, sistem de verificare și funcție de comparare.',
                color: 'from-primary to-primary-light',
                features: ['12+ unități verificate', 'Filtre avansate', 'Profil detaliat', 'Comparare side-by-side'],
              },
              {
                icon: Wrench, title: 'Tool-uri de Accesibilitate',
                description: 'Bibliotecă de instrumente digitale gratuite: contrast checker, checklist WCAG, font tester, heading checker, calculator de economii.',
                color: 'from-impact to-purple-400',
                features: ['4 tool-uri funcționale', 'Calculator economii', 'Verificare WCAG', 'Gratuit pentru toți'],
              },
              {
                icon: Globe, title: 'Resurse & Comunitate',
                description: 'Blog cu articole educaționale, FAQ detaliat, povești de succes, impact dashboard cu hartă interactivă și newsletter.',
                color: 'from-secondary to-emerald-400',
                features: ['8+ articole blog', '20+ FAQ-uri', 'Newsletter', 'Impact dashboard'],
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <motion.div whileHover={{ y: -6 }} className="bg-white p-8 rounded-2xl border border-border card-shine h-full flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-3">{item.title}</h3>
                  <p className="text-text-light leading-relaxed mb-5 flex-1">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text">
                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/5 text-accent text-sm font-semibold rounded-full mb-4">
                <Users className="w-4 h-4" aria-hidden="true" /> Echipa
              </span>
              <h2 className="text-4xl font-extrabold text-text tracking-tight">Oamenii din spatele <span className="gradient-text">UPA Hub</span></h2>
              <p className="text-text-light mt-3 max-w-2xl mx-auto">
                O echipă pasionată de incluziune socială, cu experiență în tehnologie, resurse umane și legislație.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {[
              { name: 'Ana Marinescu', role: 'Fondator & Director', initials: 'AM', color: 'from-primary to-primary-light', bio: '15 ani experiență în incluziune socială' },
              { name: 'Mihai Popa', role: 'Director Tehnic', initials: 'MP', color: 'from-impact to-purple-400', bio: 'Expert în accesibilitate digitală' },
              { name: 'Elena Vasile', role: 'Specialist Incluziune', initials: 'EV', color: 'from-secondary to-emerald-400', bio: 'Consultant HR și diversitate' },
              { name: 'Andrei Ionescu', role: 'Manager Parteneriate', initials: 'AI', color: 'from-accent to-amber-400', bio: 'Specialist în relații B2B' },
            ].map((member) => (
              <StaggerItem key={member.name}>
                <motion.div whileHover={{ y: -6 }} className="text-center bg-surface rounded-2xl p-6 border border-border/50 card-hover">
                  <div className={`w-20 h-20 bg-gradient-to-br ${member.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg`} aria-hidden="true">
                    {member.initials}
                  </div>
                  <h3 className="font-bold text-text text-lg">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-1">{member.role}</p>
                  <p className="text-text-lighter text-xs">{member.bio}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 mesh-gradient" />
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="relative p-10 lg:p-16 text-center">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                  <Sparkles className="w-10 h-10 text-accent-light mx-auto mb-5" aria-hidden="true" />
                </motion.div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
                  Alătură-te misiunii noastre
                </h2>
                <p className="text-blue-100/70 text-lg mb-10 max-w-2xl mx-auto font-light">
                  Fie că ești o companie, o unitate protejată sau o persoană pasionată de incluziune,
                  locul tău este pe UPA Hub.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/inscrie-unitate" className="inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-white text-primary font-bold rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all text-lg">
                    Înscrie o Unitate <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </Link>
                  <Link href="/contact" className="btn-glass inline-flex items-center justify-center gap-2.5 px-10 py-4 text-white font-semibold rounded-2xl text-lg">
                    Contactează-ne
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
