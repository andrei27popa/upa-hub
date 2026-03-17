'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale,
  ChevronDown,
  Plus,
  X,
  Building2,
  MapPin,
  Briefcase,
  Calendar,
  Users,
  Heart,
  TrendingUp,
  Wrench,
  ShieldCheck,
  BadgeCheck,
  Share2,
  Mail,
  Trophy,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCounter, AnimatedOrbs } from '@/components/animations';
import { protectedUnits, type ProtectedUnit } from '@/lib/data';

// ── helpers ──────────────────────────────────────────────────────
function inclusionPct(u: ProtectedUnit) {
  return u.totalEmployees > 0
    ? Math.round((u.employeesWithDisabilities / u.totalEmployees) * 100)
    : 0;
}

type MetricResult = 'better' | 'worse' | 'equal';

function cmpHigherBetter(a: number, b: number): MetricResult {
  if (a > b) return 'better';
  if (a < b) return 'worse';
  return 'equal';
}
function cmpLowerBetter(a: number, b: number): MetricResult {
  if (a < b) return 'better';
  if (a > b) return 'worse';
  return 'equal';
}

function resultColor(r: MetricResult) {
  if (r === 'better') return 'text-secondary font-bold';
  if (r === 'worse') return 'text-text-light';
  return 'text-text';
}

function resultBg(r: MetricResult) {
  if (r === 'better') return 'bg-secondary/10';
  return 'bg-transparent';
}

// ── types ────────────────────────────────────────────────────────
interface MetricRow {
  icon: React.ReactNode;
  label: string;
  values: string[];
  results: MetricResult[];
  type?: 'text' | 'number' | 'score' | 'boolean' | 'services';
  rawScores?: number[];
}

// ── component ────────────────────────────────────────────────────
export default function ComparaPage() {
  const [selectedIds, setSelectedIds] = useState<(string | null)[]>([null, null]);
  const [copiedLink, setCopiedLink] = useState(false);

  const maxSlots = 3;
  const canAddSlot = selectedIds.length < maxSlots;

  // selected units (filtered out nulls)
  const selectedUnits = useMemo(
    () =>
      selectedIds
        .map((id) => (id ? protectedUnits.find((u) => u.id === id) ?? null : null)),
    [selectedIds],
  );

  const validUnits = useMemo(
    () => selectedUnits.filter((u): u is ProtectedUnit => u !== null),
    [selectedUnits],
  );

  const showComparison = validUnits.length >= 2;

  // handler helpers
  const setSlot = useCallback(
    (index: number, id: string | null) => {
      setSelectedIds((prev) => {
        const next = [...prev];
        next[index] = id;
        return next;
      });
    },
    [],
  );

  const addSlot = useCallback(() => {
    setSelectedIds((prev) => (prev.length < maxSlots ? [...prev, null] : prev));
  }, []);

  const removeSlot = useCallback(
    (index: number) => {
      if (selectedIds.length <= 2) {
        setSlot(index, null);
      } else {
        setSelectedIds((prev) => prev.filter((_, i) => i !== index));
      }
    },
    [selectedIds.length, setSlot],
  );

  // share
  const handleShare = useCallback(() => {
    const ids = validUnits.map((u) => u.id).join(',');
    const url = `${window.location.origin}/compara?unitati=${ids}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  }, [validUnits]);

  // ── build metric rows ──────────────────────────────────────────
  const metricRows: MetricRow[] = useMemo(() => {
    if (!showComparison) return [];
    const units = validUnits;

    const rows: MetricRow[] = [];

    // City / Region
    rows.push({
      icon: <MapPin className="w-4 h-4" />,
      label: 'Oraș / Regiune',
      values: units.map((u) => `${u.city}, ${u.region}`),
      results: units.map(() => 'equal' as MetricResult),
      type: 'text',
    });

    // Domain
    rows.push({
      icon: <Briefcase className="w-4 h-4" />,
      label: 'Domeniu',
      values: units.map((u) => u.domain),
      results: units.map(() => 'equal' as MetricResult),
      type: 'text',
    });

    // Year founded – older = more experience
    const years = units.map((u) => u.yearFounded);
    rows.push({
      icon: <Calendar className="w-4 h-4" />,
      label: 'Anul înființării',
      values: units.map((u) => String(u.yearFounded)),
      results: units.map((u) => cmpLowerBetter(u.yearFounded, Math.min(...years))),
      type: 'number',
    });

    // Total employees – higher = better
    const totals = units.map((u) => u.totalEmployees);
    rows.push({
      icon: <Users className="w-4 h-4" />,
      label: 'Total angajați',
      values: units.map((u) => String(u.totalEmployees)),
      results: units.map((u) => cmpHigherBetter(u.totalEmployees, Math.max(...totals))),
      type: 'number',
    });

    // Employees w/ disabilities
    const disab = units.map((u) => u.employeesWithDisabilities);
    rows.push({
      icon: <Heart className="w-4 h-4" />,
      label: 'Angajați cu dizabilități',
      values: units.map((u) => String(u.employeesWithDisabilities)),
      results: units.map((u) =>
        cmpHigherBetter(u.employeesWithDisabilities, Math.max(...disab)),
      ),
      type: 'number',
    });

    // Inclusion %
    const pcts = units.map(inclusionPct);
    rows.push({
      icon: <TrendingUp className="w-4 h-4" />,
      label: 'Procent incluziune',
      values: units.map((u) => `${inclusionPct(u)}%`),
      results: units.map((u) =>
        cmpHigherBetter(inclusionPct(u), Math.max(...pcts)),
      ),
      type: 'number',
    });

    // Social impact score
    const scores = units.map((u) => u.socialImpactScore);
    rows.push({
      icon: <Sparkles className="w-4 h-4" />,
      label: 'Scor impact social',
      values: units.map((u) => `${u.socialImpactScore}/100`),
      results: units.map((u) =>
        cmpHigherBetter(u.socialImpactScore, Math.max(...scores)),
      ),
      rawScores: units.map((u) => u.socialImpactScore),
      type: 'score',
    });

    // Certified
    rows.push({
      icon: <ShieldCheck className="w-4 h-4" />,
      label: 'Certificată',
      values: units.map((u) => (u.certified ? 'Da' : 'Nu')),
      results: units.map((u) => (u.certified ? 'better' : 'worse') as MetricResult),
      type: 'boolean',
    });

    // Verified
    rows.push({
      icon: <BadgeCheck className="w-4 h-4" />,
      label: 'Verificată',
      values: units.map((u) => (u.verified ? 'Da' : 'Nu')),
      results: units.map((u) => (u.verified ? 'better' : 'worse') as MetricResult),
      type: 'boolean',
    });

    // Services
    rows.push({
      icon: <Wrench className="w-4 h-4" />,
      label: 'Servicii',
      values: units.map((u) => u.services.join(', ')),
      results: units.map(() => 'equal' as MetricResult),
      type: 'services',
    });

    return rows;
  }, [showComparison, validUnits]);

  // winner counts
  const winnerCounts = useMemo(() => {
    if (!showComparison) return [];
    return validUnits.map((_, idx) =>
      metricRows.filter((r) => r.results[idx] === 'better').length,
    );
  }, [showComparison, validUnits, metricRows]);

  // shared vs unique services
  const { shared, unique } = useMemo(() => {
    if (!showComparison) return { shared: [] as string[], unique: [] as string[][] };
    const allSets = validUnits.map((u) => new Set(u.services));
    const sharedServices = [...allSets[0]].filter((s) => allSets.every((set) => set.has(s)));
    const uniqueServices = validUnits.map((u) =>
      u.services.filter((s) => !sharedServices.includes(s)),
    );
    return { shared: sharedServices, unique: uniqueServices };
  }, [showComparison, validUnits]);

  // ── available units for a slot (exclude already-selected) ──────
  const availableForSlot = useCallback(
    (slotIndex: number) => {
      const otherIds = selectedIds.filter((_, i) => i !== slotIndex).filter(Boolean);
      return protectedUnits.filter((u) => !otherIds.includes(u.id));
    },
    [selectedIds],
  );

  // ── render ─────────────────────────────────────────────────────
  return (
    <>
      {/* ── Header ── */}
      <section className="relative mesh-gradient text-white pt-28 pb-16 overflow-hidden">
        <AnimatedOrbs />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-5 border border-white/10">
              <Scale className="w-4 h-4" aria-hidden="true" /> Comparație
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
              Compară Unități Protejate
            </h1>
            <p className="text-blue-100/70 text-lg max-w-2xl font-light">
              Alege două sau trei unități protejate și compară-le side-by-side pentru a lua
              decizia potrivită.
            </p>
          </motion.div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path
              d="M0 80L80 68C160 56 320 32 480 24C640 16 800 24 960 32C1120 40 1280 48 1360 52L1440 56V80H0Z"
              fill="#F8FAFC"
            />
          </svg>
        </div>
      </section>

      {/* ── Unit Selectors ── */}
      <section className="bg-surface py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              {selectedIds.map((id, idx) => (
                <div key={idx} className="flex-1 w-full">
                  <label
                    htmlFor={`unit-${idx}`}
                    className="block text-sm font-semibold text-text mb-1.5"
                  >
                    Unitatea {idx + 1}
                  </label>
                  <div className="relative flex gap-2">
                    <div className="relative flex-1">
                      <select
                        id={`unit-${idx}`}
                        value={id ?? ''}
                        onChange={(e) => setSlot(idx, e.target.value || null)}
                        className="w-full appearance-none pl-4 pr-10 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      >
                        <option value="">— Selectează unitate —</option>
                        {availableForSlot(idx).map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name} ({u.city})
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-lighter pointer-events-none"
                        aria-hidden="true"
                      />
                    </div>
                    {(selectedIds.length > 2 || id) && (
                      <button
                        onClick={() => removeSlot(idx)}
                        className="flex items-center justify-center w-10 h-10 my-auto rounded-xl border border-border bg-white text-text-light hover:text-error hover:border-error transition-colors"
                        aria-label="Elimină unitatea"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {canAddSlot && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={addSlot}
                  className="inline-flex items-center gap-2 px-5 py-3 border-2 border-dashed border-border rounded-xl text-sm font-semibold text-text-light hover:border-primary hover:text-primary transition-all whitespace-nowrap mt-auto"
                >
                  <Plus className="w-4 h-4" /> Adaugă încă o unitate
                </motion.button>
              )}
            </div>
          </FadeIn>

          {/* Share button */}
          {showComparison && (
            <FadeIn delay={0.15}>
              <div className="mt-6 flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-border rounded-xl text-sm font-semibold text-text-light hover:text-primary hover:border-primary transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  {copiedLink ? 'Link copiat!' : 'Distribuie comparația'}
                </motion.button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── Comparison ── */}
      <AnimatePresence>
        {showComparison && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="bg-surface pb-16"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* ── Winner highlights ── */}
              <div
                className="grid gap-4 mb-10"
                style={{ gridTemplateColumns: `repeat(${validUnits.length}, minmax(0, 1fr))` }}
              >
                {validUnits.map((unit, idx) => {
                  const isBest = winnerCounts[idx] === Math.max(...winnerCounts);
                  return (
                    <FadeIn key={unit.id} delay={idx * 0.1}>
                      <div
                        className={`relative card-shine rounded-2xl border p-6 text-center transition-all ${
                          isBest
                            ? 'border-secondary bg-secondary/5 shadow-lg shadow-secondary/10'
                            : 'border-border bg-white'
                        }`}
                      >
                        {isBest && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full shadow-md">
                            <Trophy className="w-3 h-3" /> Lider
                          </span>
                        )}
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-text mb-1 truncate">{unit.name}</h3>
                        <p className="text-sm text-text-light mb-3">
                          {unit.city}, {unit.region}
                        </p>
                        <div className="flex items-center justify-center gap-1 text-sm">
                          <span className="font-bold text-secondary">
                            <AnimatedCounter value={winnerCounts[idx]} />
                          </span>
                          <span className="text-text-light">categorii câștigate</span>
                        </div>

                        {/* Contact button */}
                        <a
                          href={`mailto:${unit.email}`}
                          className="mt-4 inline-flex items-center gap-2 btn-primary px-5 py-2.5 text-white text-sm font-semibold rounded-xl w-full justify-center"
                        >
                          <Mail className="w-4 h-4" /> Contactează
                        </a>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>

              {/* ── Metric rows ── */}
              <StaggerContainer className="space-y-3">
                {metricRows.map((row, rIdx) => (
                  <StaggerItem key={rIdx}>
                    <div className="bg-white rounded-2xl border border-border overflow-hidden card-hover">
                      {/* Label row */}
                      <div className="flex items-center gap-2 px-5 pt-4 pb-2">
                        <span className="text-primary">{row.icon}</span>
                        <span className="text-sm font-semibold text-text">{row.label}</span>
                      </div>

                      {/* Values row – responsive */}
                      <div
                        className="grid gap-px bg-border"
                        style={{
                          gridTemplateColumns: `repeat(${validUnits.length}, minmax(0, 1fr))`,
                        }}
                      >
                        {row.values.map((val, vIdx) => (
                          <div
                            key={vIdx}
                            className={`px-5 py-4 bg-white ${resultBg(row.results[vIdx])}`}
                          >
                            {/* Score type → progress bar */}
                            {row.type === 'score' && row.rawScores ? (
                              <div>
                                <span className={`text-lg font-bold ${resultColor(row.results[vIdx])}`}>
                                  <AnimatedCounter value={row.rawScores[vIdx]} suffix="/100" />
                                </span>
                                <div className="mt-2 w-full h-2.5 bg-surface-dark rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full impact-bar"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${row.rawScores[vIdx]}%` }}
                                    transition={{ duration: 1, delay: 0.3 + vIdx * 0.15, ease: 'easeOut' }}
                                  />
                                </div>
                              </div>
                            ) : row.type === 'services' ? (
                              <div className="flex flex-wrap gap-1.5">
                                {val.split(', ').map((s) => {
                                  const isShared = shared.includes(s);
                                  return (
                                    <span
                                      key={s}
                                      className={`px-2.5 py-1 text-xs font-medium rounded-lg ${
                                        isShared
                                          ? 'bg-primary/10 text-primary'
                                          : 'bg-accent/10 text-accent'
                                      }`}
                                    >
                                      {s}
                                    </span>
                                  );
                                })}
                              </div>
                            ) : row.type === 'boolean' ? (
                              <span
                                className={`inline-flex items-center gap-1.5 text-sm font-semibold ${resultColor(row.results[vIdx])}`}
                              >
                                {val === 'Da' ? (
                                  <ShieldCheck className="w-4 h-4 text-secondary" />
                                ) : (
                                  <X className="w-4 h-4 text-text-lighter" />
                                )}
                                {val}
                              </span>
                            ) : (
                              <span className={`text-sm font-semibold ${resultColor(row.results[vIdx])}`}>
                                {val}
                                {row.results[vIdx] === 'better' && (
                                  <Trophy className="inline w-3.5 h-3.5 ml-1.5 text-secondary" />
                                )}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* ── Services breakdown ── */}
              <FadeIn delay={0.2}>
                <div className="mt-10 bg-white rounded-2xl border border-border p-6">
                  <h3 className="text-lg font-bold text-text mb-5 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-primary" /> Comparație servicii
                  </h3>

                  {shared.length > 0 && (
                    <div className="mb-5">
                      <p className="text-sm font-semibold text-text-light mb-2">
                        Servicii comune ({shared.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {shared.map((s) => (
                          <span
                            key={s}
                            className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-lg"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    className="grid gap-6"
                    style={{
                      gridTemplateColumns: `repeat(${validUnits.length}, minmax(0, 1fr))`,
                    }}
                  >
                    {validUnits.map((unit, idx) => (
                      <div key={unit.id}>
                        <p className="text-sm font-semibold text-text mb-2">
                          Unice – {unit.name}
                        </p>
                        {unique[idx].length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {unique[idx].map((s) => (
                              <span
                                key={s}
                                className="px-3 py-1.5 bg-accent/10 text-accent text-xs font-semibold rounded-lg"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-text-lighter italic">
                            Toate serviciile sunt comune
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* ── CTA ── */}
              <FadeIn delay={0.3}>
                <div className="mt-10 text-center">
                  <a
                    href="/unitati-protejate"
                    className="inline-flex items-center gap-2 btn-primary px-8 py-3 text-white text-sm font-semibold rounded-xl"
                  >
                    Explorează toate unitățile <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Empty state when fewer than 2 selected ── */}
      {!showComparison && (
        <section className="bg-surface py-20">
          <FadeIn>
            <div className="max-w-xl mx-auto text-center px-4">
              <div className="w-20 h-20 bg-surface-dark rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Scale className="w-8 h-8 text-text-lighter" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-text mb-2">
                Selectează cel puțin două unități
              </h3>
              <p className="text-text-light">
                Alege două sau trei unități protejate din selectoarele de mai sus pentru a vedea
                comparația detaliată.
              </p>
            </div>
          </FadeIn>
        </section>
      )}
    </>
  );
}
