'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Check, X, Eye, Palette, Info } from 'lucide-react';
import { FadeIn, AnimatedOrbs } from '@/components/animations';

// --- Contrast calculation helpers ---

function hexToRgb(hex: string): [number, number, number] {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return [r, g, b];
}

function linearize(channel: number): number {
  const sRGB = channel / 255;
  return sRGB <= 0.04045
    ? sRGB / 12.92
    : Math.pow((sRGB + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// --- Presets ---

const presets: { name: string; fg: string; bg: string }[] = [
  { name: 'Clasic', fg: '#000000', bg: '#FFFFFF' },
  { name: 'Albastru pe alb', fg: '#1B4D8E', bg: '#FFFFFF' },
  { name: 'Alb pe violet', fg: '#FFFFFF', bg: '#7C3AED' },
  { name: 'Galben pe negru', fg: '#FFD700', bg: '#000000' },
  { name: 'Verde inchis pe crem', fg: '#064E3B', bg: '#FEF3C7' },
  { name: 'Gri inchis pe deschis', fg: '#374151', bg: '#F3F4F6' },
];

// --- WCAG levels ---

interface WcagLevel {
  label: string;
  description: string;
  minRatio: number;
}

const wcagLevels: WcagLevel[] = [
  { label: 'AA Normal', description: 'Text normal (< 18pt)', minRatio: 4.5 },
  { label: 'AA Large', description: 'Text mare (\u2265 18pt bold / \u2265 24pt)', minRatio: 3 },
  { label: 'AAA Normal', description: 'Text normal (< 18pt)', minRatio: 7 },
  { label: 'AAA Large', description: 'Text mare (\u2265 18pt bold / \u2265 24pt)', minRatio: 4.5 },
];

// --- Component ---

export default function ContrastCheckerPage() {
  const [foreground, setForeground] = useState('#1B4D8E');
  const [background, setBackground] = useState('#FFFFFF');

  const ratio = useMemo(() => contrastRatio(foreground, background), [foreground, background]);

  const swapColors = useCallback(() => {
    setForeground(background);
    setBackground(foreground);
  }, [foreground, background]);

  const applyPreset = useCallback((preset: { fg: string; bg: string }) => {
    setForeground(preset.fg);
    setBackground(preset.bg);
  }, []);

  const ratingLabel = useMemo(() => {
    if (ratio >= 7) return 'Excelent';
    if (ratio >= 4.5) return 'Bun';
    if (ratio >= 3) return 'Acceptabil (doar text mare)';
    return 'Insuficient';
  }, [ratio]);

  const ratingColor = useMemo(() => {
    if (ratio >= 7) return 'text-green-600';
    if (ratio >= 4.5) return 'text-emerald-500';
    if (ratio >= 3) return 'text-amber-500';
    return 'text-red-500';
  }, [ratio]);

  return (
    <>
      {/* Header */}
      <section
        className="relative overflow-hidden pt-28 pb-16"
        style={{
          background: 'linear-gradient(135deg, #7C3AED 0%, #1B4D8E 50%, #0F172A 100%)',
        }}
      >
        <AnimatedOrbs />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-5 border border-white/10">
              <Palette className="w-4 h-4" aria-hidden="true" /> Instrument
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Verificator <span className="gradient-text-hero">Contrast Culori</span>
            </h1>
            <p className="text-blue-100/70 text-lg max-w-2xl font-light">
              Verifici dac\u0103 combinatia ta de culori respecta standardele WCAG 2.1
              pentru accesibilitate vizual\u0103.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full" preserveAspectRatio="none">
            <path
              d="M0 80L80 68C160 56 320 32 480 24C640 16 800 24 960 32C1120 40 1280 48 1360 52L1440 56V80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Color Pickers */}
              <div className="space-y-6">
                {/* Foreground */}
                <div className="bg-surface border border-border rounded-2xl p-6">
                  <label className="block text-sm font-bold text-text mb-3">
                    Culoare text (foreground)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={foreground}
                      onChange={(e) => setForeground(e.target.value)}
                      className="w-14 h-14 rounded-xl border-2 border-border cursor-pointer shrink-0"
                      aria-label="Selecteaz\u0103 culoarea textului"
                    />
                    <input
                      type="text"
                      value={foreground.toUpperCase()}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^#[0-9A-Fa-f]{6}$/.test(val)) setForeground(val);
                      }}
                      className="flex-1 px-4 py-3 border border-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white transition-all"
                      placeholder="#000000"
                      maxLength={7}
                      aria-label="Cod hex culoare text"
                    />
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 180 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    onClick={swapColors}
                    className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
                    aria-label="Inverseaz\u0103 culorile"
                  >
                    <ArrowLeftRight className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Background */}
                <div className="bg-surface border border-border rounded-2xl p-6">
                  <label className="block text-sm font-bold text-text mb-3">
                    Culoare fundal (background)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="w-14 h-14 rounded-xl border-2 border-border cursor-pointer shrink-0"
                      aria-label="Selecteaz\u0103 culoarea fundalului"
                    />
                    <input
                      type="text"
                      value={background.toUpperCase()}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^#[0-9A-Fa-f]{6}$/.test(val)) setBackground(val);
                      }}
                      className="flex-1 px-4 py-3 border border-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white transition-all"
                      placeholder="#FFFFFF"
                      maxLength={7}
                      aria-label="Cod hex culoare fundal"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Results */}
              <div className="space-y-6">
                {/* Contrast Ratio */}
                <motion.div
                  className="bg-surface border border-border rounded-2xl p-6 text-center"
                  key={ratio.toFixed(2)}
                  initial={{ scale: 0.98, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm font-bold text-text-light uppercase tracking-widest mb-2">
                    Raport de contrast
                  </p>
                  <p className={`text-5xl font-extrabold tracking-tight ${ratingColor}`}>
                    {ratio.toFixed(2)}:1
                  </p>
                  <p className={`text-sm font-semibold mt-2 ${ratingColor}`}>{ratingLabel}</p>
                </motion.div>

                {/* WCAG Levels */}
                <div className="bg-surface border border-border rounded-2xl p-6">
                  <p className="text-sm font-bold text-text uppercase tracking-widest mb-4">
                    Conformitate WCAG 2.1
                  </p>
                  <div className="space-y-3">
                    {wcagLevels.map((level) => {
                      const passes = ratio >= level.minRatio;
                      return (
                        <div
                          key={level.label}
                          className="flex items-center justify-between gap-3 py-2 px-3 rounded-xl bg-white border border-border/50"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-text">{level.label}</p>
                            <p className="text-xs text-text-light truncate">
                              {level.description} &mdash; min {level.minRatio}:1
                            </p>
                          </div>
                          <span
                            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              passes
                                ? 'bg-green-100 text-green-600'
                                : 'bg-red-100 text-red-500'
                            }`}
                            aria-label={passes ? 'Trece' : 'Nu trece'}
                          >
                            {passes ? (
                              <Check className="w-4 h-4" strokeWidth={3} />
                            ) : (
                              <X className="w-4 h-4" strokeWidth={3} />
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Live Preview */}
          <FadeIn delay={0.15}>
            <div className="mt-10">
              <p className="text-sm font-bold text-text uppercase tracking-widest mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4" aria-hidden="true" />
                Previzualizare live
              </p>
              <motion.div
                className="rounded-2xl border border-border overflow-hidden p-8 transition-colors duration-300"
                style={{ backgroundColor: background }}
                layout
              >
                <p
                  className="text-3xl font-extrabold mb-3 transition-colors duration-300"
                  style={{ color: foreground }}
                >
                  Titlu de exemplu
                </p>
                <p
                  className="text-lg font-semibold mb-2 transition-colors duration-300"
                  style={{ color: foreground }}
                >
                  Text mare bold (18pt+) &mdash; verificat la nivel AA Large
                </p>
                <p
                  className="text-base mb-4 transition-colors duration-300"
                  style={{ color: foreground }}
                >
                  Acesta este un paragraf de text normal. Contrastul dintre culoarea textului
                  si culoarea fundalului trebuie sa fie suficient de mare pentru a asigura
                  lizibilitatea continutului de catre toti utilizatorii, inclusiv cei cu
                  deficiente de vedere.
                </p>
                <p
                  className="text-sm transition-colors duration-300"
                  style={{ color: foreground }}
                >
                  Text mic &mdash; cel mai dificil de citit, necesit\u0103 contrast ridicat.
                </p>
              </motion.div>
            </div>
          </FadeIn>

          {/* Presets */}
          <FadeIn delay={0.25}>
            <div className="mt-10">
              <p className="text-sm font-bold text-text uppercase tracking-widest mb-4">
                Combina\u021Bii preset accesibile
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {presets.map((preset) => {
                  const presetRatio = contrastRatio(preset.fg, preset.bg);
                  return (
                    <motion.button
                      key={preset.name}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => applyPreset(preset)}
                      className="rounded-xl border border-border overflow-hidden text-left transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <div
                        className="px-4 py-3"
                        style={{ backgroundColor: preset.bg }}
                      >
                        <p
                          className="text-sm font-bold truncate"
                          style={{ color: preset.fg }}
                        >
                          {preset.name}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: preset.fg }}
                        >
                          {presetRatio.toFixed(1)}:1
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Explanation */}
      <section className="bg-surface border-t border-border py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-white border border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Info className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-extrabold text-text">
                  Ce este raportul de contrast?
                </h2>
              </div>
              <div className="space-y-4 text-text-light text-sm leading-relaxed">
                <p>
                  <strong className="text-text">Raportul de contrast</strong> m\u0103soar\u0103
                  diferen\u021Ba de luminozitate perceput\u0103 \u00eentre dou\u0103 culori.
                  Este exprimat ca un raport (de exemplu 4.5:1), unde 1:1 \u00eenseamn\u0103
                  niciun contrast (aceea\u0219i culoare) iar 21:1 este contrastul maxim
                  (negru pe alb).
                </p>
                <p>
                  Standardul <strong className="text-text">WCAG 2.1</strong> (Web Content
                  Accessibility Guidelines) define\u0219te niveluri minime de contrast
                  pentru a asigura c\u0103 textul este lizibil pentru persoanele cu
                  deficien\u021Be de vedere, inclusiv daltonism sau vedere sl\u0103bit\u0103.
                </p>
                <p>
                  <strong className="text-text">Nivelul AA</strong> este considerat minimul
                  necesar pentru conformitate. Textul normal necesit\u0103 un raport de cel
                  pu\u021Bin <strong className="text-text">4.5:1</strong>, iar textul mare
                  (18pt bold sau 24pt) necesit\u0103 cel pu\u021Bin{' '}
                  <strong className="text-text">3:1</strong>.
                </p>
                <p>
                  <strong className="text-text">Nivelul AAA</strong> ofer\u0103 un grad
                  superior de accesibilitate. Textul normal necesit\u0103{' '}
                  <strong className="text-text">7:1</strong>, iar textul mare necesit\u0103{' '}
                  <strong className="text-text">4.5:1</strong>.
                </p>
                <p>
                  Algoritmul calculeaz\u0103{' '}
                  <strong className="text-text">luminan\u021Ba relativ\u0103</strong> a fiec\u0103rei
                  culori prin liniarizarea canalelor sRGB (\u00een func\u021Bie de valoarea
                  gamma), apoi aplic\u0103 formula ponderat\u0103:{' '}
                  <code className="bg-surface px-2 py-0.5 rounded text-xs font-mono">
                    L = 0.2126 &times; R + 0.7152 &times; G + 0.0722 &times; B
                  </code>
                  . Raportul final este{' '}
                  <code className="bg-surface px-2 py-0.5 rounded text-xs font-mono">
                    (L1 + 0.05) / (L2 + 0.05)
                  </code>
                  , unde L1 este luminan\u021Ba mai mare.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
