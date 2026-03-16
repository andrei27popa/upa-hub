import Link from 'next/link';
import {
  ArrowRight, Search, Shield, Users, Heart, TrendingUp,
  Building2, Wrench, CheckCircle2, Star, Handshake,
} from 'lucide-react';
import UnitCard from '@/components/UnitCard';
import ToolCard from '@/components/ToolCard';
import { protectedUnits, accessibilityTools } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <Shield className="w-4 h-4" aria-hidden="true" />
              Platformă pentru incluziune și accesibilitate
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Conectăm companiile responsabile cu{' '}
              <span className="text-secondary-light">unitățile protejate</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
              UPA Hub este resursa centrală pentru colaborare cu unități protejate autorizate
              și instrumente digitale pentru accesibilitate și incluziune în câmpul muncii.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/unitati-protejate"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
                Găsește o Unitate Protejată
              </Link>
              <Link
                href="/tool-uri"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/25 transition-colors border border-white/30"
              >
                <Wrench className="w-5 h-5" aria-hidden="true" />
                Explorează Tool-uri
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Building2, value: '150+', label: 'Unități Protejate', color: 'text-primary' },
              { icon: Users, value: '3.500+', label: 'Persoane Angajate', color: 'text-secondary' },
              { icon: Handshake, value: '800+', label: 'Colaborări Active', color: 'text-accent' },
              { icon: Wrench, value: '12', label: 'Tool-uri Disponibile', color: 'text-impact' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} aria-hidden="true" />
                <p className="text-3xl font-bold text-text">{stat.value}</p>
                <p className="text-text-light text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is UPA - Short Explanation */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">Ce este o Unitate Protejată?</h2>
            <p className="text-text-light text-lg leading-relaxed">
              O unitate protejată autorizată (UPA) este o entitate care angajează persoane cu dizabilități
              într-un mediu de lucru adaptat. Companiile cu peste 50 de angajați au obligația legală de a
              colabora cu UPA-uri sau de a plăti o contribuție la bugetul de stat.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: CheckCircle2,
                title: 'Conformitate Legală',
                description: 'Îndeplinești obligațiile prevăzute de Legea 448/2006 privind angajarea persoanelor cu dizabilități.',
              },
              {
                icon: Heart,
                title: 'Impact Social Real',
                description: 'Contribui direct la incluziunea persoanelor cu dizabilități în câmpul muncii și la independența lor economică.',
              },
              {
                icon: Star,
                title: 'Servicii de Calitate',
                description: 'Unitățile protejate oferă servicii și produse profesionale la prețuri competitive, cu valoare adăugată socială.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-xl border border-border">
                <item.icon className="w-10 h-10 text-primary mb-4" aria-hidden="true" />
                <h3 className="font-semibold text-text text-lg mb-2">{item.title}</h3>
                <p className="text-text-light text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/ce-este-upa" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              Află mai mult despre unitățile protejate
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Protected Units */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-text mb-2">Unități Protejate Recomandate</h2>
              <p className="text-text-light">Descoperă unități protejate verificate și de încredere</p>
            </div>
            <Link href="/unitati-protejate" className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              Vezi toate
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protectedUnits.slice(0, 3).map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link href="/unitati-protejate" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
              Vezi toate unitățile
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-text mb-2">Tool-uri pentru Accesibilitate</h2>
              <p className="text-text-light">Instrumente digitale gratuite pentru incluziune</p>
            </div>
            <Link href="/tool-uri" className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              Vezi toate
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessibilityTools.slice(0, 3).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link href="/tool-uri" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
              Vezi toate tool-urile
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Impact Section */}
      <section className="bg-gradient-to-br from-impact to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-secondary-light" aria-hidden="true" />
            <h2 className="text-3xl font-bold mb-4">Impactul Nostru Social</h2>
            <p className="text-lg text-blue-100 leading-relaxed mb-8">
              Fiecare colaborare cu o unitate protejată schimbă vieți. Prin UPA Hub,
              facilităm conexiuni care generează locuri de muncă, independență economică
              și demnitate pentru persoanele cu dizabilități.
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[
                { value: '92%', label: 'Rată de satisfacție' },
                { value: '€2.5M', label: 'Valoare contracte' },
                { value: '1.200+', label: 'Vieți schimbate' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-secondary-light">{stat.value}</p>
                  <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-text-light text-sm font-semibold uppercase tracking-wider mb-8">
            Parteneri și Susținători
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {['ANPD', 'MMSS', 'CNDR', 'UNICEF România', 'Fundația Motivation', 'ASCHF'].map((partner) => (
              <div key={partner} className="px-6 py-3 bg-surface rounded-lg text-text-light font-semibold text-sm">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ești o unitate protejată autorizată?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Înscrie-te gratuit pe UPA Hub și conectează-te cu sute de companii
              care caută parteneri de încredere pentru colaborare.
            </p>
            <Link
              href="/inscrie-unitate"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Înscrie Unitatea Ta
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
