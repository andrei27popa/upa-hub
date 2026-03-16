'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Users,
  Building2,
  TrendingDown,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Handshake,
  Info,
  Banknote,
  PiggyBank,
  Scale,
  Sparkles,
} from 'lucide-react';
import { FadeIn, AnimatedCounter, AnimatedOrbs, StaggerContainer, StaggerItem } from '@/components/animations';

export default function CalculatorPage() {
  const [totalEmployees, setTotalEmployees] = useState<number | ''>('');
  const [disabledEmployees, setDisabledEmployees] = useState<number | ''>('');
  const [minimumWage, setMinimumWage] = useState<number>(3700);

  const results = useMemo(() => {
    const total = typeof totalEmployees === 'number' ? totalEmployees : 0;
    const disabled = typeof disabledEmployees === 'number' ? disabledEmployees : 0;

    if (total < 50) return null;

    const quota = Math.ceil(total * 0.04);
    const unfilled = Math.max(0, quota - disabled);
    const monthlyStateBudget = unfilled * minimumWage;
    const annualStateBudget = monthlyStateBudget * 12;
    const monthlyUPA = unfilled * minimumWage * 0.5;
    const annualUPA = monthlyUPA * 12;
    const monthlySavings = monthlyStateBudget - monthlyUPA;
    const annualSavings = annualStateBudget - annualUPA;
    const savingsPercent = monthlyStateBudget > 0 ? 50 : 0;

    return {
      quota,
      unfilled,
      monthlyStateBudget,
      annualStateBudget,
      monthlyUPA,
      annualUPA,
      monthlySavings,
      annualSavings,
      savingsPercent,
    };
  }, [totalEmployees, disabledEmployees, minimumWage]);

  const hasValidInput = typeof totalEmployees === 'number' && totalEmployees >= 50;

  const formatRON = (value: number) =>
    value.toLocaleString('ro-RO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <>
      {/* ====== HEADER ====== */}
      <section className="relative mesh-gradient text-white py-20 overflow-hidden">
        <AnimatedOrbs />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6 border border-white/10"
              >
                <Calculator className="w-4 h-4 text-accent-light" aria-hidden="true" />
                Calculator de Impact
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl lg:text-6xl font-extrabold leading-[1.1] mb-5 tracking-tight"
              >
                Calculează{' '}
                <span className="gradient-text-hero">obligația legală</span>{' '}
                și economia ta
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg lg:text-xl text-blue-100/80 leading-relaxed max-w-2xl font-light"
              >
                Conform <strong className="text-white">Legii 448/2006</strong>, companiile cu peste 50 de angajați
                au obligația de a angaja persoane cu dizabilități in proporție de minim 4% din totalul
                angajaților, sau de a plăti o contribuție lunară la bugetul de stat.
              </motion.p>
            </div>
          </FadeIn>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full" preserveAspectRatio="none">
            <path
              d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ====== LEGAL CONTEXT ====== */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 lg:p-8 flex gap-4">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-text text-lg mb-2">Ce spune legea?</h2>
                <p className="text-text-light leading-relaxed text-sm lg:text-base">
                  <strong>Art. 78, Legea 448/2006:</strong> Autoritățile și instituțiile publice, persoanele
                  juridice, publice sau private, cu cel puțin 50 de angajați, au obligația de a angaja
                  persoane cu handicap intr-un procent de cel puțin <strong>4%</strong> din numarul total de
                  angajați. In cazul in care nu angajează, au obligația de a plăti lunar catre bugetul de
                  stat o sumă reprezentand salariul de bază minim brut pe țara garantat in plata inmulțit cu
                  numarul de locuri de muncă in care nu au angajat persoane cu handicap. Alternativ, pot opta
                  pentru achiziționarea de produse sau servicii de la unități protejate autorizate, in sumă
                  echivalentă cu <strong>50%</strong> din salariul minim brut inmulțit cu numarul de locuri neocupate.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== CALCULATOR ====== */}
      <section className="bg-surface dot-pattern py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Input Panel */}
            <FadeIn className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-border p-6 lg:p-8 shadow-sm sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold text-text">Date companie</h2>
                </div>

                <div className="space-y-5">
                  {/* Total employees */}
                  <div>
                    <label htmlFor="totalEmployees" className="block text-sm font-semibold text-text mb-2">
                      <Users className="w-4 h-4 inline-block mr-1.5 text-primary" aria-hidden="true" />
                      Numar total de angajați
                    </label>
                    <input
                      id="totalEmployees"
                      type="number"
                      min={50}
                      placeholder="ex: 120"
                      value={totalEmployees}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTotalEmployees(val === '' ? '' : Math.max(0, parseInt(val) || 0));
                      }}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text font-medium placeholder:text-text-lighter focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all"
                    />
                    {typeof totalEmployees === 'number' && totalEmployees > 0 && totalEmployees < 50 && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-warning text-xs mt-1.5 flex items-center gap-1"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                        Obligația legala se aplica doar companiilor cu minim 50 de angajați.
                      </motion.p>
                    )}
                  </div>

                  {/* Disabled employees */}
                  <div>
                    <label htmlFor="disabledEmployees" className="block text-sm font-semibold text-text mb-2">
                      <Handshake className="w-4 h-4 inline-block mr-1.5 text-secondary" aria-hidden="true" />
                      Angajați cu dizabilitați actuali
                    </label>
                    <input
                      id="disabledEmployees"
                      type="number"
                      min={0}
                      placeholder="ex: 2"
                      value={disabledEmployees}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDisabledEmployees(val === '' ? '' : Math.max(0, parseInt(val) || 0));
                      }}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text font-medium placeholder:text-text-lighter focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Minimum wage */}
                  <div>
                    <label htmlFor="minimumWage" className="block text-sm font-semibold text-text mb-2">
                      <Banknote className="w-4 h-4 inline-block mr-1.5 text-accent" aria-hidden="true" />
                      Salariul minim brut (RON)
                    </label>
                    <input
                      id="minimumWage"
                      type="number"
                      min={0}
                      value={minimumWage}
                      onChange={(e) => setMinimumWage(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text font-medium placeholder:text-text-lighter focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all"
                    />
                    <p className="text-text-lighter text-xs mt-1.5 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" aria-hidden="true" />
                      Valoare actualizata 2025. Modificați dacă este cazul.
                    </p>
                  </div>
                </div>

                {/* Quick quota info */}
                <AnimatePresence>
                  {results && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-primary/5 to-impact/5 rounded-xl p-4 border border-primary/10">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-extrabold text-primary">{results.quota}</p>
                            <p className="text-text-lighter text-xs font-medium">Cota 4% obligatorie</p>
                          </div>
                          <div>
                            <p className="text-2xl font-extrabold text-error">{results.unfilled}</p>
                            <p className="text-text-lighter text-xs font-medium">Locuri neocupate</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>

            {/* Results Panel */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {!hasValidInput ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-2xl border border-border p-12 text-center shadow-sm"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Calculator className="w-16 h-16 text-text-lighter mx-auto mb-4" aria-hidden="true" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-text mb-2">Introdu datele companiei tale</h3>
                    <p className="text-text-light max-w-md mx-auto">
                      Completează numarul de angajați (minim 50) pentru a vedea calculul obligației legale
                      și economia potențială prin colaborarea cu unități protejate.
                    </p>
                  </motion.div>
                ) : results && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Quota Summary */}
                    <FadeIn>
                      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                        <h3 className="font-bold text-text text-lg mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" aria-hidden="true" />
                          Situația obligației legale
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-primary/5 rounded-xl">
                            <p className="text-3xl font-extrabold text-primary">
                              <AnimatedCounter value={results.quota} duration={1} />
                            </p>
                            <p className="text-text-lighter text-sm mt-1">Cota 4%</p>
                          </div>
                          <div className="text-center p-4 bg-secondary/5 rounded-xl">
                            <p className="text-3xl font-extrabold text-secondary">
                              <AnimatedCounter value={typeof disabledEmployees === 'number' ? disabledEmployees : 0} duration={1} />
                            </p>
                            <p className="text-text-lighter text-sm mt-1">Angajați actuali</p>
                          </div>
                          <div className="text-center p-4 bg-error/5 rounded-xl">
                            <p className="text-3xl font-extrabold text-error">
                              <AnimatedCounter value={results.unfilled} duration={1} />
                            </p>
                            <p className="text-text-lighter text-sm mt-1">Locuri neocupate</p>
                          </div>
                        </div>

                        {results.unfilled === 0 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-4 bg-secondary/5 border border-secondary/20 rounded-xl p-4 flex items-center gap-3"
                          >
                            <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" aria-hidden="true" />
                            <p className="text-secondary font-medium text-sm">
                              Felicitari! Compania ta indeplinește cota de 4%. Nu ai obligații financiare suplimentare.
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </FadeIn>

                    {results.unfilled > 0 && (
                      <>
                        {/* Comparison Cards */}
                        <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.15}>
                          {/* Option A - State budget */}
                          <StaggerItem>
                            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm h-full relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-error/5 rounded-bl-[100px]" aria-hidden="true" />
                              <div className="relative">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center">
                                    <AlertTriangle className="w-5 h-5 text-error" aria-hidden="true" />
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold text-error uppercase tracking-wider">Opțiunea A</p>
                                    <h4 className="font-bold text-text">Plata la bugetul de stat</h4>
                                  </div>
                                </div>

                                <p className="text-text-light text-sm mb-5">
                                  100% din salariul minim brut pentru fiecare loc neocupat. Banii merg la bugetul
                                  de stat, fara impact social direct.
                                </p>

                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-text-light text-sm">Cost lunar</span>
                                    <span className="text-xl font-extrabold text-error">
                                      <AnimatedCounter value={results.monthlyStateBudget} duration={1.5} suffix=" RON" />
                                    </span>
                                  </div>
                                  <div className="h-px bg-border" />
                                  <div className="flex justify-between items-center">
                                    <span className="text-text-light text-sm">Cost anual</span>
                                    <span className="text-2xl font-extrabold text-error">
                                      <AnimatedCounter value={results.annualStateBudget} duration={1.5} suffix=" RON" />
                                    </span>
                                  </div>
                                </div>

                                <div className="mt-5 bg-error/5 rounded-lg p-3">
                                  <p className="text-error text-xs font-medium">
                                    {results.unfilled} locuri x {formatRON(minimumWage)} RON = {formatRON(results.monthlyStateBudget)} RON/luna
                                  </p>
                                </div>
                              </div>
                            </div>
                          </StaggerItem>

                          {/* Option B - UPA collaboration */}
                          <StaggerItem>
                            <div className="bg-white rounded-2xl border-2 border-secondary/30 p-6 shadow-sm h-full relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-[100px]" aria-hidden="true" />
                              <div className="absolute top-3 right-3">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full">
                                  <Sparkles className="w-3 h-3" aria-hidden="true" />
                                  Recomandat
                                </span>
                              </div>
                              <div className="relative">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                                    <Handshake className="w-5 h-5 text-secondary" aria-hidden="true" />
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Opțiunea B</p>
                                    <h4 className="font-bold text-text">Colaborare cu UPA</h4>
                                  </div>
                                </div>

                                <p className="text-text-light text-sm mb-5">
                                  50% din salariul minim brut pentru fiecare loc neocupat, prin achiziții de la unități
                                  protejate. Impact social real + economie de 50%.
                                </p>

                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-text-light text-sm">Cost lunar</span>
                                    <span className="text-xl font-extrabold text-secondary">
                                      <AnimatedCounter value={results.monthlyUPA} duration={1.5} suffix=" RON" />
                                    </span>
                                  </div>
                                  <div className="h-px bg-border" />
                                  <div className="flex justify-between items-center">
                                    <span className="text-text-light text-sm">Cost anual</span>
                                    <span className="text-2xl font-extrabold text-secondary">
                                      <AnimatedCounter value={results.annualUPA} duration={1.5} suffix=" RON" />
                                    </span>
                                  </div>
                                </div>

                                <div className="mt-5 bg-secondary/5 rounded-lg p-3">
                                  <p className="text-secondary text-xs font-medium">
                                    {results.unfilled} locuri x {formatRON(minimumWage * 0.5)} RON = {formatRON(results.monthlyUPA)} RON/luna
                                  </p>
                                </div>
                              </div>
                            </div>
                          </StaggerItem>
                        </StaggerContainer>

                        {/* Savings Card */}
                        <FadeIn delay={0.3}>
                          <div className="relative overflow-hidden rounded-2xl">
                            <div className="absolute inset-0 mesh-gradient" />
                            <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
                            <div className="relative p-6 lg:p-8">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                <div className="flex items-center gap-4">
                                  <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                  >
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                      <PiggyBank className="w-7 h-7 text-secondary-light" aria-hidden="true" />
                                    </div>
                                  </motion.div>
                                  <div>
                                    <p className="text-blue-200/70 text-sm font-medium">
                                      Economie prin colaborare UPA
                                    </p>
                                    <p className="text-white text-3xl lg:text-4xl font-extrabold">
                                      <AnimatedCounter value={results.annualSavings} duration={2} suffix=" RON" />
                                      <span className="text-secondary-light text-lg font-bold ml-2">/an</span>
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-4">
                                  <div className="text-center">
                                    <p className="text-5xl font-extrabold text-secondary-light">
                                      <AnimatedCounter value={results.savingsPercent} duration={1.5} suffix="%" />
                                    </p>
                                    <p className="text-blue-200/60 text-sm font-medium mt-1">Economie</p>
                                  </div>
                                </div>
                              </div>

                              {/* Visual Comparison Bar */}
                              <div className="mt-8">
                                <p className="text-blue-200/60 text-xs font-semibold uppercase tracking-wider mb-3">
                                  Comparație costuri anuale
                                </p>
                                <div className="space-y-3">
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span className="text-blue-100/70 font-medium">Plata la stat</span>
                                      <span className="text-white font-bold">{formatRON(results.annualStateBudget)} RON</span>
                                    </div>
                                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                                        className="h-full bg-gradient-to-r from-error/80 to-error rounded-full"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span className="text-blue-100/70 font-medium">Colaborare UPA</span>
                                      <span className="text-secondary-light font-bold">{formatRON(results.annualUPA)} RON</span>
                                    </div>
                                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '50%' }}
                                        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                                        className="h-full bg-gradient-to-r from-secondary/80 to-secondary-light rounded-full"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </FadeIn>

                        {/* Benefits List */}
                        <FadeIn delay={0.4}>
                          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                            <h3 className="font-bold text-text text-lg mb-4 flex items-center gap-2">
                              <TrendingDown className="w-5 h-5 text-secondary" aria-hidden="true" />
                              Avantajele colaborarii cu unități protejate
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {[
                                'Economie de 50% fata de plata la bugetul de stat',
                                'Conformitate deplina cu Legea 448/2006',
                                'Impact social real - susții angajarea persoanelor cu dizabilitati',
                                'Servicii și produse profesionale de calitate',
                                'Deductibilitate fiscala pentru achizitii',
                                'Responsabilitate sociala corporativa (CSR)',
                              ].map((benefit, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 + i * 0.08 }}
                                  className="flex items-start gap-2.5 p-2"
                                >
                                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                                  <span className="text-text-light text-sm">{benefit}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </FadeIn>

                        {/* CTA */}
                        <FadeIn delay={0.5}>
                          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-impact/5 rounded-2xl border border-border p-6 lg:p-8 text-center">
                            <Building2 className="w-10 h-10 text-primary mx-auto mb-3" aria-hidden="true" />
                            <h3 className="text-xl font-bold text-text mb-2">
                              Gasește o unitate protejata potrivita
                            </h3>
                            <p className="text-text-light text-sm mb-6 max-w-lg mx-auto">
                              Explorează directorul nostru de unități protejate autorizate și incepe o colaborare
                              care aduce beneficii financiare și impact social real.
                            </p>
                            <Link
                              href="/unitati-protejate"
                              className="btn-primary inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-white font-semibold rounded-2xl"
                            >
                              Explorează Unitați Protejate
                              <ArrowRight className="w-5 h-5" aria-hidden="true" />
                            </Link>
                          </div>
                        </FadeIn>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
