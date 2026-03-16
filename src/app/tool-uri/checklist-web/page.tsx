'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, Filter, Download, CheckCircle2, Circle, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { AnimatedOrbs } from '@/components/animations';

// ─── Types ───────────────────────────────────────────────────────────────────

type WCAGLevel = 'A' | 'AA' | 'AAA';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  level: WCAGLevel;
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  items: ChecklistItem[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    id: 'perceivable',
    title: 'Perceptibil',
    description: 'Informațiile și componentele interfeței trebuie prezentate în moduri pe care utilizatorii le pot percepe.',
    icon: '👁️',
    color: '#7C3AED',
    items: [
      { id: 'p1', title: 'Imagini au text alternativ', description: 'Toate imaginile informative au atributul alt descriptiv și relevant.', level: 'A' },
      { id: 'p2', title: 'Video are subtitrări', description: 'Conținutul video preînregistrat include subtitrări sincronizate.', level: 'A' },
      { id: 'p3', title: 'Contrast suficient text', description: 'Raportul de contrast între text și fundal este de minim 4.5:1 pentru text normal.', level: 'AA' },
      { id: 'p4', title: 'Redimensionare text', description: 'Textul poate fi mărit la 200% fără pierderea funcționalității sau conținutului.', level: 'AA' },
      { id: 'p5', title: 'Audio are transcriere', description: 'Conținutul audio preînregistrat are o alternativă text (transcriere completă).', level: 'A' },
      { id: 'p6', title: 'Contrast elemente grafice', description: 'Elementele grafice și componentele UI au un contrast de minim 3:1.', level: 'AA' },
      { id: 'p7', title: 'Informația nu depinde doar de culoare', description: 'Culoarea nu este singurul mijloc vizual de a transmite informații sau acțiuni.', level: 'A' },
      { id: 'p8', title: 'Contrast îmbunătățit', description: 'Raportul de contrast este de minim 7:1 pentru text normal și 4.5:1 pentru text mare.', level: 'AAA' },
    ],
  },
  {
    id: 'operable',
    title: 'Operabil',
    description: 'Componentele interfeței și navigarea trebuie să fie operabile de toți utilizatorii.',
    icon: '⌨️',
    color: '#10B981',
    items: [
      { id: 'o1', title: 'Navigare cu tastatura', description: 'Toate funcționalitățile sunt accesibile prin tastatură, fără a necesita timing specific.', level: 'A' },
      { id: 'o2', title: 'Focus vizibil', description: 'Indicatorul de focus al tastaturii este vizibil pe toate elementele interactive.', level: 'AA' },
      { id: 'o3', title: 'Timp suficient', description: 'Utilizatorii pot extinde, ajusta sau dezactiva limitele de timp pentru citire sau interacțiune.', level: 'A' },
      { id: 'o4', title: 'Fără capcane de focus', description: 'Utilizatorul nu rămâne blocat într-o componentă fără posibilitatea de a naviga mai departe.', level: 'A' },
      { id: 'o5', title: 'Skip navigation', description: 'Există un mecanism de a sări peste blocurile de conținut repetitive (ex. meniu).', level: 'A' },
      { id: 'o6', title: 'Titluri de pagină descriptive', description: 'Fiecare pagină are un titlu unic și descriptiv care reflectă conținutul ei.', level: 'A' },
      { id: 'o7', title: 'Ordinea focusului logică', description: 'Ordinea de navigare prin Tab urmează o secvență logică și previzibilă.', level: 'A' },
      { id: 'o8', title: 'Target size suficient', description: 'Zonele de atingere/click au minimum 44x44 pixeli CSS.', level: 'AAA' },
    ],
  },
  {
    id: 'understandable',
    title: 'Înțeles',
    description: 'Informațiile și operarea interfeței trebuie să fie ușor de înțeles.',
    icon: '🧠',
    color: '#F59E0B',
    items: [
      { id: 'u1', title: 'Limbă specificată', description: 'Limba paginii este declarată corect în atributul lang al elementului HTML.', level: 'A' },
      { id: 'u2', title: 'Navigare consistentă', description: 'Mecanismele de navigare repetate apar în aceeași ordine pe toate paginile.', level: 'AA' },
      { id: 'u3', title: 'Erori identificate', description: 'Erorile din formulare sunt detectate automat și descrise clar în text.', level: 'A' },
      { id: 'u4', title: 'Etichete și instrucțiuni', description: 'Câmpurile formularelor au etichete vizibile și instrucțiuni clare.', level: 'A' },
      { id: 'u5', title: 'Sugestii la erori', description: 'Când sunt detectate erori, se oferă sugestii concrete de corectare.', level: 'AA' },
      { id: 'u6', title: 'Prevenirea erorilor', description: 'Acțiunile ireversibile pot fi anulate, verificate sau confirmate înainte de trimitere.', level: 'AA' },
      { id: 'u7', title: 'Schimbări de limbă marcate', description: 'Schimbările de limbă în text sunt indicate prin atributul lang.', level: 'AA' },
      { id: 'u8', title: 'Ajutor contextual disponibil', description: 'Este disponibil ajutor specific contextului pentru funcționalități complexe.', level: 'AAA' },
    ],
  },
  {
    id: 'robust',
    title: 'Robust',
    description: 'Conținutul trebuie să fie suficient de robust pentru a fi interpretat de o varietate de agenți utilizator.',
    icon: '🔧',
    color: '#1B4D8E',
    items: [
      { id: 'r1', title: 'HTML valid', description: 'Codul HTML nu conține erori de sintaxă și respectă specificația W3C.', level: 'A' },
      { id: 'r2', title: 'Compatibil cu screen readers', description: 'Conținutul funcționează corect cu cititoare de ecran (NVDA, JAWS, VoiceOver).', level: 'A' },
      { id: 'r3', title: 'Roluri ARIA corecte', description: 'Atributele ARIA sunt folosite corect și adaugă informație semantică utilă.', level: 'A' },
      { id: 'r4', title: 'Mesaje de status anunțate', description: 'Mesajele de status sunt comunicate prin aria-live fără a muta focusul.', level: 'AA' },
      { id: 'r5', title: 'Nume și rol accesibil', description: 'Toate componentele UI au un nume și un rol accesibil determinabile programatic.', level: 'A' },
      { id: 'r6', title: 'Funcționează fără JavaScript', description: 'Conținutul esențial rămâne accesibil chiar dacă JavaScript nu se încarcă.', level: 'AAA' },
    ],
  },
];

const STORAGE_KEY = 'upa-checklist-progress';

const levelColors: Record<WCAGLevel, { bg: string; text: string; border: string }> = {
  A: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  AA: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  AAA: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function ChecklistWebPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [levelFilter, setLevelFilter] = useState<WCAGLevel | 'all'>('all');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    perceivable: true,
    operable: true,
    understandable: true,
    robust: true,
  });
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setChecked(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
      } catch {
        // ignore
      }
    }
  }, [checked, mounted]);

  const toggleItem = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleCategory = useCallback((id: string) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Filter items by level
  const filteredCategories = useMemo(() => {
    if (levelFilter === 'all') return categories;
    return categories.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => item.level === levelFilter),
    })).filter((cat) => cat.items.length > 0);
  }, [levelFilter]);

  // Stats
  const allItems = useMemo(() => categories.flatMap((c) => c.items), []);
  const filteredItems = useMemo(() => filteredCategories.flatMap((c) => c.items), [filteredCategories]);

  const totalChecked = useMemo(() => filteredItems.filter((item) => checked[item.id]).length, [filteredItems, checked]);
  const totalItems = filteredItems.length;
  const overallPercent = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

  const getCategoryStats = useCallback(
    (cat: Category) => {
      const filtered = levelFilter === 'all' ? cat.items : cat.items.filter((i) => i.level === levelFilter);
      const done = filtered.filter((i) => checked[i.id]).length;
      return { done, total: filtered.length, percent: filtered.length > 0 ? Math.round((done / filtered.length) * 100) : 0 };
    },
    [checked, levelFilter],
  );

  // Export
  const handleExport = useCallback(async () => {
    const lines: string[] = [
      '═══════════════════════════════════════════',
      '  UPA Hub - Checklist Accesibilitate Web',
      `  Data: ${new Date().toLocaleDateString('ro-RO')}`,
      `  Progres total: ${totalChecked}/${totalItems} (${overallPercent}%)`,
      '═══════════════════════════════════════════',
      '',
    ];
    for (const cat of categories) {
      const stats = getCategoryStats(cat);
      lines.push(`${cat.icon} ${cat.title.toUpperCase()} — ${stats.done}/${stats.total} (${stats.percent}%)`);
      lines.push('───────────────────────────────────────────');
      for (const item of cat.items) {
        if (levelFilter !== 'all' && item.level !== levelFilter) continue;
        const mark = checked[item.id] ? '✅' : '⬜';
        lines.push(`  ${mark} [${item.level}] ${item.title}`);
      }
      lines.push('');
    }
    lines.push('Generat cu UPA Hub — upa-hub.ro/tool-uri/checklist-web');

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  }, [checked, levelFilter, totalChecked, totalItems, overallPercent, getCategoryStats]);

  const handleReset = useCallback(() => {
    setChecked({});
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Header */}
      <section
        className="relative overflow-hidden pt-28 pb-16"
        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #1B4D8E 50%, #0F172A 100%)' }}
      >
        <AnimatedOrbs />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-5 border border-white/10">
              <ClipboardCheck className="w-4 h-4" aria-hidden="true" /> Checklist
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Checklist <span className="gradient-text-hero">Accesibilitate Web</span>
            </h1>
            <p className="text-blue-100/70 text-lg max-w-2xl font-light">
              Verifică conformitatea site-ului tău cu standardele WCAG 2.1.
              Parcurge lista interactivă, bifează criteriile îndeplinite și exportă rezultatele.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L80 68C160 56 320 32 480 24C640 16 800 24 960 32C1120 40 1280 48 1360 52L1440 56V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Progress & Controls */}
      <section className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          {/* Overall progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-text">
                Progres total: {totalChecked}/{totalItems} criterii
              </span>
              <span className="text-sm font-extrabold text-primary">{overallPercent}%</span>
            </div>
            <div className="w-full h-3 bg-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #7C3AED, #10B981)' }}
                initial={{ width: 0 }}
                animate={{ width: `${overallPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Controls row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Level filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-text-lighter" aria-hidden="true" />
              <span className="text-xs font-bold text-text-lighter uppercase tracking-widest">Nivel WCAG:</span>
              {(['all', 'A', 'AA', 'AAA'] as const).map((level) => (
                <motion.button
                  key={level}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLevelFilter(level)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    levelFilter === level
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-surface text-text-light hover:bg-primary/5 hover:text-primary'
                  }`}
                  aria-pressed={levelFilter === level}
                  aria-label={level === 'all' ? 'Arată toate nivelurile' : `Filtrează nivel ${level}`}
                >
                  {level === 'all' ? 'Toate' : level}
                </motion.button>
              ))}
            </div>

            <div className="flex-1" />

            {/* Export */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              {copied ? 'Copiat!' : 'Exportă rezultatele'}
            </motion.button>

            {/* Reset */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-surface text-text-light hover:bg-red-50 hover:text-red-600 transition-colors"
              aria-label="Resetează toate bifele"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Resetează
            </motion.button>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="bg-surface dot-pattern py-10 min-h-[60vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="space-y-6" staggerDelay={0.1}>
            {filteredCategories.map((cat) => {
              const stats = getCategoryStats(cat);
              const isExpanded = expandedCategories[cat.id] !== false;
              const items = levelFilter === 'all' ? cat.items : cat.items.filter((i) => i.level === levelFilter);

              return (
                <StaggerItem key={cat.id}>
                  <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                    {/* Category header */}
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full px-6 py-5 flex items-center gap-4 hover:bg-surface/50 transition-colors text-left"
                      aria-expanded={isExpanded}
                    >
                      <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="text-lg font-extrabold text-text">{cat.title}</h2>
                          <span className="text-xs font-bold text-text-lighter">
                            {stats.done}/{stats.total}
                          </span>
                        </div>
                        <p className="text-xs text-text-light line-clamp-1">{cat.description}</p>
                        {/* Category progress */}
                        <div className="mt-2 w-full h-1.5 bg-surface rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: cat.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${stats.percent}%` }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-extrabold" style={{ color: cat.color }}>
                        {stats.percent}%
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-text-lighter flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-text-lighter flex-shrink-0" />
                      )}
                    </button>

                    {/* Items */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 space-y-1">
                            {items.map((item) => {
                              const isChecked = !!checked[item.id];
                              const colors = levelColors[item.level];

                              return (
                                <motion.button
                                  key={item.id}
                                  onClick={() => toggleItem(item.id)}
                                  className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors group ${
                                    isChecked
                                      ? 'bg-emerald-50/60 hover:bg-emerald-50'
                                      : 'hover:bg-surface/80'
                                  }`}
                                  whileTap={{ scale: 0.99 }}
                                  aria-pressed={isChecked}
                                  aria-label={`${item.title} — ${isChecked ? 'bifat' : 'nebifat'}`}
                                >
                                  {/* Animated checkbox */}
                                  <div className="mt-0.5 flex-shrink-0">
                                    <AnimatePresence mode="wait">
                                      {isChecked ? (
                                        <motion.div
                                          key="checked"
                                          initial={{ scale: 0, rotate: -90 }}
                                          animate={{ scale: 1, rotate: 0 }}
                                          exit={{ scale: 0, rotate: 90 }}
                                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                        >
                                          <CheckCircle2
                                            className="w-5 h-5 text-emerald-500"
                                            aria-hidden="true"
                                          />
                                        </motion.div>
                                      ) : (
                                        <motion.div
                                          key="unchecked"
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          exit={{ scale: 0 }}
                                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                        >
                                          <Circle
                                            className="w-5 h-5 text-text-lighter group-hover:text-primary transition-colors"
                                            aria-hidden="true"
                                          />
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <span
                                        className={`text-sm font-semibold transition-colors ${
                                          isChecked ? 'text-emerald-700 line-through decoration-emerald-300' : 'text-text'
                                        }`}
                                      >
                                        {item.title}
                                      </span>
                                      <span
                                        className={`inline-flex px-1.5 py-0.5 text-[10px] font-bold rounded border ${colors.bg} ${colors.text} ${colors.border}`}
                                      >
                                        {item.level}
                                      </span>
                                    </div>
                                    <p className={`text-xs leading-relaxed ${isChecked ? 'text-emerald-600/60' : 'text-text-light'}`}>
                                      {item.description}
                                    </p>
                                  </div>
                                </motion.button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Summary card */}
          <FadeIn delay={0.3}>
            <div className="mt-10 bg-white rounded-2xl border border-border/50 shadow-sm p-6 text-center">
              <div className="flex flex-wrap justify-center gap-6 mb-4">
                {categories.map((cat) => {
                  const stats = getCategoryStats(cat);
                  return (
                    <div key={cat.id} className="text-center">
                      <div className="text-2xl mb-1" aria-hidden="true">{cat.icon}</div>
                      <div className="text-xs font-bold text-text-lighter mb-1">{cat.title}</div>
                      <div className="text-lg font-extrabold" style={{ color: cat.color }}>
                        {stats.percent}%
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-sm text-text-light">
                {overallPercent === 100
                  ? 'Felicitări! Ai completat toate criteriile din checklist. Exportă rezultatele pentru documentare.'
                  : overallPercent >= 75
                    ? 'Progres excelent! Mai ai câteva criterii de verificat.'
                    : overallPercent >= 50
                      ? 'Ești pe drumul cel bun. Continuă să verifici criteriile rămase.'
                      : 'Începe prin a parcurge fiecare categorie și bifează criteriile îndeplinite.'}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
