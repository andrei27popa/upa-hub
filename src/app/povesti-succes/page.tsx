'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Quote, TrendingUp, Building2, Users, Heart } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCounter, AnimatedOrbs } from '@/components/animations';

interface SuccessStory {
  id: number;
  companyName: string;
  personName: string;
  role: string;
  quote: string;
  protectedUnit: string;
  results: string[];
  year: number;
  rating: number;
  initials: string;
  gradient: string;
}

const successStories: SuccessStory[] = [
  {
    id: 1,
    companyName: 'TechSolutions România',
    personName: 'Maria Constantinescu',
    role: 'Director Resurse Umane',
    quote:
      'Colaborarea cu unitatea protejată Atelierul Digital ne-a transformat complet perspectiva asupra incluziunii. Am descoperit profesioniști dedicați care aduc o calitate excepțională serviciilor de digitalizare documente. Nu doar că am îndeplinit obligațiile legale, dar am câștigat parteneri de încredere pe termen lung care ne-au ajutat să ne optimizăm procesele interne.',
    protectedUnit: 'Atelierul Digital',
    results: ['Reducere 45% costuri administrative', 'Conformitate legală 100%'],
    year: 2024,
    rating: 5,
    initials: 'MC',
    gradient: 'from-primary to-primary-light',
  },
  {
    id: 2,
    companyName: 'Grup Industrial Carpați',
    personName: 'Alexandru Popescu',
    role: 'CEO',
    quote:
      'Am început colaborarea cu UPA Mâini Dibace acum trei ani, pentru servicii de ambalare și confecționare. Astăzi, aceștia sunt furnizorul nostru principal pentru aceste activități. Calitatea este constantă, termenele sunt respectate, iar satisfacția echipei noastre este la cote maxime. Recomand oricărui antreprenor să exploreze această opțiune — rezultatele vorbesc de la sine.',
    protectedUnit: 'UPA Mâini Dibace',
    results: ['120 locuri de muncă create', 'Parteneriat pe 3 ani'],
    year: 2023,
    rating: 5,
    initials: 'AP',
    gradient: 'from-secondary to-emerald-400',
  },
  {
    id: 3,
    companyName: 'Farmacia Verde S.R.L.',
    personName: 'Elena Dragomir',
    role: 'Manager Operațiuni',
    quote:
      'Serviciile de curățenie și mentenanță oferite de UPA Viitorul Curat sunt impecabile. Echipa lor este profesionistă, punctuală și extrem de atentă la detalii. Am reușit să reducem costurile operaționale cu 30% față de furnizorul anterior, în timp ce contribuim activ la incluziunea socială. Este o situație de tip win-win pentru toată lumea.',
    protectedUnit: 'UPA Viitorul Curat',
    results: ['Reducere 30% costuri operaționale', 'Evaluare 5 stele servicii'],
    year: 2024,
    rating: 5,
    initials: 'ED',
    gradient: 'from-accent to-amber-400',
  },
  {
    id: 4,
    companyName: 'BancaPlus România',
    personName: 'Cristian Ionescu',
    role: 'Director CSR',
    quote:
      'Prin programul nostru de responsabilitate socială, am colaborat cu patru unități protejate simultan, pentru servicii diverse: de la catering la administrarea arhivelor. Impactul asupra comunității locale a fost remarcabil — peste 80 de persoane cu dizabilități au beneficiat direct de aceste contracte. UPA Hub ne-a facilitat întregul proces de identificare și conectare.',
    protectedUnit: 'Diverse UPA-uri',
    results: ['80+ persoane beneficiare', '4 parteneriate active'],
    year: 2024,
    rating: 5,
    initials: 'CI',
    gradient: 'from-impact to-purple-400',
  },
  {
    id: 5,
    companyName: 'RetailMax Group',
    personName: 'Andreea Marin',
    role: 'Director Achiziții',
    quote:
      'Inițial am apelat la o unitate protejată strict pentru conformitate legală. Dar calitatea serviciilor de ambalare și etichetare ne-a surprins plăcut. Am extins contractul de trei ori în ultimii doi ani. Acum colaborăm și pentru servicii de logistică ușoară. Este o demonstrație clară că incluziunea și performanța merg mână în mână.',
    protectedUnit: 'UPA PackRight',
    results: ['Contract extins de 3 ori', 'Economii de 250.000 lei/an'],
    year: 2023,
    rating: 4,
    initials: 'AM',
    gradient: 'from-rose-500 to-rose-400',
  },
  {
    id: 6,
    companyName: 'Constructo S.A.',
    personName: 'Bogdan Stancu',
    role: 'Manager General',
    quote:
      'Am integrat în lanțul nostru de aprovizionare o unitate protejată specializată pe reciclare și gestionarea deșeurilor. Nu numai că am atins obiectivele ESG ale companiei, dar am redus semnificativ impactul ecologic al proiectelor noastre. Echipa UPA EcoSort este profesionistă și dedicată, iar rapoartele de sustenabilitate pe care le primim lunar sunt de o calitate excelentă.',
    protectedUnit: 'UPA EcoSort',
    results: ['Obiective ESG atinse', 'Reducere 40% deșeuri'],
    year: 2024,
    rating: 5,
    initials: 'BS',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    id: 7,
    companyName: 'MediaStar Communications',
    personName: 'Diana Petrescu',
    role: 'HR Business Partner',
    quote:
      'Prin UPA Hub am găsit o unitate protejată care oferă servicii de transcripție și subtitrare pentru conținutul nostru media. Calitatea este excepțională, termenele sunt respectate cu strictețe, iar feedback-ul clienților noștri a fost extraordinar. Am creat un model de colaborare care demonstrează că diversitatea în supply chain aduce valoare reală și nu doar conformitate.',
    protectedUnit: 'UPA AccessMedia',
    results: ['Conținut accesibilizat 100%', 'Satisfacție clienți 98%'],
    year: 2023,
    rating: 5,
    initials: 'DP',
    gradient: 'from-sky-500 to-blue-400',
  },
  {
    id: 8,
    companyName: 'HotelGrand Collection',
    personName: 'Radu Gheorghe',
    role: 'Director Operațiuni',
    quote:
      'În industria hotelieră, calitatea serviciilor de curățenie și spălătorie este critică. Unitatea protejată cu care colaborăm prin UPA Hub nu doar că livrează la standarde premium, dar a adus și o stabilitate a personalului pe care nu o avuseserăm niciodată cu furnizorii tradiționali. Rata de retenție a angajaților UPA este remarcabilă, ceea ce se traduce în consistență și profesionalism.',
    protectedUnit: 'UPA CleanPro',
    results: ['Standarde premium menținute', '95% rată de retenție personal'],
    year: 2024,
    rating: 5,
    initials: 'RG',
    gradient: 'from-orange-500 to-amber-400',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Evaluare: ${rating} din 5 stele`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-accent fill-accent' : 'text-border'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function SuccessStoriesPage() {
  const featured = successStories[0];
  const gridStories = successStories.slice(1);

  return (
    <>
      {/* ====== HEADER ====== */}
      <section className="relative mesh-gradient text-white py-20 lg:py-28 overflow-hidden">
        <AnimatedOrbs />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6 border border-white/10">
              <Heart className="w-4 h-4 text-accent-light" aria-hidden="true" />
              Testimoniale
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-5 tracking-tight">
              Pove&#537;ti de <span className="gradient-text-hero">Succes</span>
            </h1>
            <p className="text-xl text-blue-100/80 leading-relaxed font-light max-w-2xl">
              Descoper&#259; cum companiile din Rom&#226;nia transform&#259; obliga&#539;ia legal&#259; &#238;n
              oportunit&#259;&#539;i de impact social &#537;i parteneriate valoroase cu unit&#259;&#539;ile protejate.
            </p>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full" preserveAspectRatio="none">
            <path
              d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ====== FEATURED STORY ====== */}
      <section className="bg-white pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-impact" />
              <div className="absolute inset-0 dot-pattern opacity-10" />
              <div className="relative p-8 lg:p-14">
                <div className="grid lg:grid-cols-5 gap-8 items-center">
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-3 py-1 bg-white/15 text-white text-xs font-semibold rounded-full backdrop-blur-sm border border-white/10">
                        Povestea lunii
                      </span>
                      <StarRating rating={featured.rating} />
                    </div>
                    <Quote className="w-10 h-10 text-accent-light/60 mb-4" aria-hidden="true" />
                    <blockquote className="text-white text-lg lg:text-xl leading-relaxed mb-8 font-light">
                      &ldquo;{featured.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${featured.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                      >
                        {featured.initials}
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">{featured.personName}</p>
                        <p className="text-blue-200/70 text-sm">
                          {featured.role} &mdash; {featured.companyName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                      <p className="text-blue-200/60 text-xs font-semibold uppercase tracking-wider mb-2">
                        Unitate protejat&#259;
                      </p>
                      <p className="text-white font-bold text-lg">{featured.protectedUnit}</p>
                      <p className="text-blue-200/50 text-sm">{featured.year}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {featured.results.map((result) => (
                        <div
                          key={result}
                          className="bg-white/10 backdrop-blur-md rounded-xl px-5 py-3 border border-white/10"
                        >
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-secondary-light" aria-hidden="true" />
                            <span className="text-white font-semibold text-sm">{result}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== STORIES GRID ====== */}
      <section className="bg-surface dot-pattern py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary text-sm font-semibold rounded-full mb-4">
                <Users className="w-4 h-4" aria-hidden="true" /> Testimoniale
              </span>
              <h2 className="text-4xl font-extrabold text-text tracking-tight">
                Ce spun <span className="gradient-text">partenerii no&#537;tri</span>
              </h2>
              <p className="text-text-light mt-3 max-w-2xl mx-auto">
                Fiecare colaborare genereaz&#259; impact real &#238;n comunit&#259;&#539;i din &#238;ntreaga &#539;ar&#259;.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {gridStories.map((story) => (
              <StaggerItem key={story.id}>
                <div className="bg-white rounded-2xl border border-border/50 p-6 lg:p-7 card-hover h-full flex flex-col">
                  {/* Rating & Year */}
                  <div className="flex items-center justify-between mb-5">
                    <StarRating rating={story.rating} />
                    <span className="text-text-lighter text-xs font-medium">{story.year}</span>
                  </div>

                  {/* Quote */}
                  <Quote className="w-7 h-7 text-primary/20 mb-3" aria-hidden="true" />
                  <blockquote className="text-text leading-relaxed mb-6 flex-1 text-sm lg:text-base line-clamp-5">
                    &ldquo;{story.quote}&rdquo;
                  </blockquote>

                  {/* Person */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${story.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}
                    >
                      {story.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-text text-sm truncate">{story.personName}</p>
                      <p className="text-text-lighter text-xs truncate">
                        {story.role} &mdash; {story.companyName}
                      </p>
                    </div>
                  </div>

                  {/* Protected Unit */}
                  <div className="px-3 py-2 bg-primary/5 rounded-lg mb-4">
                    <p className="text-xs text-text-lighter font-medium">Unitate protejat&#259;</p>
                    <p className="text-primary font-semibold text-sm">{story.protectedUnit}</p>
                  </div>

                  {/* Results badges */}
                  <div className="flex flex-wrap gap-2">
                    {story.results.map((result) => (
                      <span
                        key={result}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-secondary/10 text-secondary text-xs font-semibold rounded-full"
                      >
                        <TrendingUp className="w-3 h-3" aria-hidden="true" />
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ====== ANIMATED COUNTERS ====== */}
      <section className="relative mesh-gradient text-white py-20 overflow-hidden">
        <AnimatedOrbs />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
                Impactul &#238;n cifre
              </h2>
              <p className="text-blue-100/70 text-lg font-light max-w-2xl mx-auto">
                Rezultatele colabor&#259;rilor facilitate prin UPA Hub
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" staggerDelay={0.15}>
            {[
              {
                icon: Building2,
                value: 320,
                suffix: '+',
                label: 'Companii partenere',
                color: 'from-primary-light to-primary',
              },
              {
                icon: Users,
                value: 1200,
                suffix: '+',
                label: 'Vie\u021bi schimbate',
                color: 'from-secondary to-emerald-400',
              },
              {
                icon: Heart,
                value: 97,
                suffix: '%',
                label: 'Rat\u0103 de satisfac\u021Bie',
                color: 'from-accent to-amber-400',
              },
              {
                icon: TrendingUp,
                value: 5,
                suffix: 'M \u20AC',
                label: 'Valoare contracte',
                color: 'from-impact to-purple-400',
              },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center bg-white/5 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/10">
                  <div
                    className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    <stat.icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <p className="text-4xl lg:text-5xl font-extrabold text-white mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-blue-200/60 text-sm font-medium">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <Heart className="w-12 h-12 text-primary mx-auto mb-5" aria-hidden="true" />
              </motion.div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-text mb-4 tracking-tight">
                Scrie-&#539;i propria poveste de succes
              </h2>
              <p className="text-text-light text-lg mb-10 leading-relaxed">
                Al&#259;tur&#259;-te celor peste 320 de companii care au transformat obliga&#539;ia legal&#259;
                &#238;ntr-o oportunitate de impact social. Contacteaz&#259;-ne &#537;i te ajut&#259;m s&#259;
                g&#259;se&#537;ti partenerii potrivi&#539;i.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center justify-center gap-2.5 px-8 py-4 text-white font-semibold rounded-2xl text-lg"
                >
                  Contacteaz&#259;-ne
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/unitati-protejate"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border border-primary/20 text-primary font-semibold rounded-2xl text-lg hover:bg-primary/5 transition-all"
                >
                  Exploreaz&#259; Unit&#259;&#539;ile Protejate
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
