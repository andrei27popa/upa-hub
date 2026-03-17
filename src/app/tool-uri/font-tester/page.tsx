'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Type, Eye, Info, Lightbulb, RotateCcw } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, AnimatedOrbs } from '@/components/animations';

// --- Contrast calculation helpers (same as contrast-checker) ---

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

// --- Readability score calculation ---

interface ReadabilityScores {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  contrast: number;
  overall: number;
}

function calculateReadabilityScores(
  fontSize: number,
  lineHeight: number,
  letterSpacing: number,
  textColor: string,
  bgColor: string,
): ReadabilityScores {
  // Font size score: 16px = 50, 24px+ = 100, 12px = 20
  const fontSizeScore = Math.min(100, Math.max(0, ((fontSize - 10) / 14) * 100));

  // Line height score: 1.5 = 70, 1.8 = 100, 1.0 = 20
  const lineHeightScore = Math.min(100, Math.max(0, ((lineHeight - 0.8) / 1.2) * 100));

  // Letter spacing score: 0 = 40, 1 = 70, 2+ = 100
  const letterSpacingScore = Math.min(100, 40 + (letterSpacing / 2) * 60);

  // Contrast score: based on WCAG ratio
  const ratio = contrastRatio(textColor, bgColor);
  const contrastScore = Math.min(100, Math.max(0, (ratio / 7) * 100));

  // Overall: weighted average
  const overall = Math.round(
    fontSizeScore * 0.3 +
    lineHeightScore * 0.2 +
    letterSpacingScore * 0.15 +
    contrastScore * 0.35
  );

  return {
    fontSize: Math.round(fontSizeScore),
    lineHeight: Math.round(lineHeightScore),
    letterSpacing: Math.round(letterSpacingScore),
    contrast: Math.round(contrastScore),
    overall,
  };
}

// --- Presets ---

interface Preset {
  name: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  textColor: string;
  bgColor: string;
}

const presets: Preset[] = [
  {
    name: 'Optimal pentru dislexie',
    fontFamily: 'OpenDyslexic',
    fontSize: 18,
    lineHeight: 2.0,
    letterSpacing: 2,
    wordSpacing: 5,
    textColor: '#1A1A2E',
    bgColor: '#FFF8E7',
  },
  {
    name: 'Optimal pentru ecran',
    fontFamily: 'Verdana',
    fontSize: 16,
    lineHeight: 1.6,
    letterSpacing: 0.5,
    wordSpacing: 1,
    textColor: '#1F2937',
    bgColor: '#FFFFFF',
  },
  {
    name: 'Vârstnici',
    fontFamily: 'Georgia',
    fontSize: 22,
    lineHeight: 1.8,
    letterSpacing: 1,
    wordSpacing: 3,
    textColor: '#000000',
    bgColor: '#FFFFF0',
  },
  {
    name: 'Print',
    fontFamily: 'Times New Roman',
    fontSize: 14,
    lineHeight: 1.5,
    letterSpacing: 0,
    wordSpacing: 0,
    textColor: '#000000',
    bgColor: '#FFFFFF',
  },
];

const fontFamilies = [
  'Arial',
  'Verdana',
  'Georgia',
  'Times New Roman',
  'Trebuchet MS',
  'Courier New',
  'OpenDyslexic',
  'Comic Sans MS',
];

// --- Component ---

export default function FontTesterPage() {
  const [sampleText, setSampleText] = useState(
    'Aceasta este o propoziție de test pentru lizibilitatea fontului.'
  );
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [wordSpacing, setWordSpacing] = useState(0);
  const [textColor, setTextColor] = useState('#1F2937');
  const [bgColor, setBgColor] = useState('#FFFFFF');

  const scores = useMemo(
    () => calculateReadabilityScores(fontSize, lineHeight, letterSpacing, textColor, bgColor),
    [fontSize, lineHeight, letterSpacing, textColor, bgColor]
  );

  const ratio = useMemo(() => contrastRatio(textColor, bgColor), [textColor, bgColor]);

  const applyPreset = useCallback((preset: Preset) => {
    setFontFamily(preset.fontFamily);
    setFontSize(preset.fontSize);
    setLineHeight(preset.lineHeight);
    setLetterSpacing(preset.letterSpacing);
    setWordSpacing(preset.wordSpacing);
    setTextColor(preset.textColor);
    setBgColor(preset.bgColor);
  }, []);

  const resetDefaults = useCallback(() => {
    setFontFamily('Arial');
    setFontSize(16);
    setLineHeight(1.5);
    setLetterSpacing(0);
    setWordSpacing(0);
    setTextColor('#1F2937');
    setBgColor('#FFFFFF');
  }, []);

  const tips = useMemo(() => {
    const result: string[] = [];
    if (fontSize < 16) result.push('Dimensiunea fontului sub 16px poate fi dificil de citit pe ecrane. Se recomandă minim 16px.');
    if (lineHeight < 1.5) result.push('Înălțimea liniei sub 1.5 reduce lizibilitatea. WCAG recomandă minim 1.5 pentru textul corpului.');
    if (letterSpacing < 0.5) result.push('Un spațiu minim între litere (0.5px+) ajută la citirea mai ușoară, în special pentru dislexie.');
    if (ratio < 4.5) result.push('Contrastul de culori nu respectă standardul WCAG AA (min 4.5:1). Alegeți culori mai contrastante.');
    if (ratio < 3) result.push('Contrastul este foarte scăzut! Textul va fi greu de citit pentru mulți utilizatori.');
    if (fontFamily === 'Comic Sans MS') result.push('Comic Sans MS poate fi util pentru dislexie, dar nu este recomandat pentru texte formale.');
    if (fontFamily === 'OpenDyslexic') result.push('OpenDyslexic este conceput special pentru a îmbunătăți lizibilitatea pentru persoanele cu dislexie.');
    if (fontSize >= 24 && lineHeight < 1.4) result.push('La dimensiuni mari ale fontului, o înălțime a liniei de cel puțin 1.4 este recomandată.');
    if (wordSpacing >= 5) result.push('Spațiul mare între cuvinte poate fragmenta textul. Folosiți cu moderație.');
    if (result.length === 0) result.push('Setările curente sunt bune pentru lizibilitate! Textul ar trebui să fie accesibil majorității utilizatorilor.');
    return result;
  }, [fontSize, lineHeight, letterSpacing, ratio, fontFamily, wordSpacing]);

  const scoreLabel = useMemo(() => {
    if (scores.overall >= 85) return 'Excelent';
    if (scores.overall >= 65) return 'Bun';
    if (scores.overall >= 45) return 'Acceptabil';
    return 'Slab';
  }, [scores.overall]);

  const scoreColor = useMemo(() => {
    if (scores.overall >= 85) return 'text-green-600';
    if (scores.overall >= 65) return 'text-emerald-500';
    if (scores.overall >= 45) return 'text-amber-500';
    return 'text-red-500';
  }, [scores.overall]);

  const scoreBarColor = useCallback((value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-emerald-400';
    if (value >= 40) return 'bg-amber-400';
    return 'bg-red-400';
  }, []);

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
              <Type className="w-4 h-4" aria-hidden="true" /> Instrument
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Tester <span className="gradient-text-hero">Lizibilitate Font</span>
            </h1>
            <p className="text-blue-100/70 text-lg max-w-2xl font-light">
              Testează combinații de fonturi, dimensiuni și culori pentru a asigura
              lizibilitatea optimă a textului tău.
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Preset Buttons */}
          <FadeIn>
            <div className="mb-8">
              <p className="text-sm font-bold text-text uppercase tracking-widest mb-4">
                Preseturi rapide
              </p>
              <div className="flex flex-wrap gap-3">
                {presets.map((preset) => (
                  <motion.button
                    key={preset.name}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => applyPreset(preset)}
                    className="px-5 py-2.5 bg-surface border border-border rounded-xl text-sm font-semibold text-text hover:border-primary/30 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    {preset.name}
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={resetDefaults}
                  className="px-5 py-2.5 bg-white border border-border rounded-xl text-sm font-semibold text-text-light hover:text-text hover:border-primary/30 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary/30 flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  Resetare
                </motion.button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left: Controls (2 cols) */}
              <div className="lg:col-span-2 space-y-5">
                {/* Sample text input */}
                <div className="bg-surface border border-border rounded-2xl p-5">
                  <label className="block text-sm font-bold text-text mb-2">
                    Text de test
                  </label>
                  <textarea
                    value={sampleText}
                    onChange={(e) => setSampleText(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white transition-all resize-none"
                    placeholder="Introduceți textul de test..."
                  />
                </div>

                {/* Font family selector */}
                <div className="bg-surface border border-border rounded-2xl p-5">
                  <label className="block text-sm font-bold text-text mb-2">
                    Familie font
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white transition-all cursor-pointer"
                  >
                    {fontFamilies.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font size slider */}
                <div className="bg-surface border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-text">Dimensiune font</label>
                    <span className="text-sm font-mono text-text-light">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={48}
                    step={1}
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-primary"
                    aria-label="Dimensiune font"
                  />
                  <div className="flex justify-between text-xs text-text-light mt-1">
                    <span>12px</span>
                    <span>48px</span>
                  </div>
                </div>

                {/* Line height slider */}
                <div className="bg-surface border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-text">Înălțime linie</label>
                    <span className="text-sm font-mono text-text-light">{lineHeight.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min={1.0}
                    max={3.0}
                    step={0.1}
                    value={lineHeight}
                    onChange={(e) => setLineHeight(Number(e.target.value))}
                    className="w-full accent-primary"
                    aria-label="Înălțime linie"
                  />
                  <div className="flex justify-between text-xs text-text-light mt-1">
                    <span>1.0</span>
                    <span>3.0</span>
                  </div>
                </div>

                {/* Letter spacing slider */}
                <div className="bg-surface border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-text">Spațiere litere</label>
                    <span className="text-sm font-mono text-text-light">{letterSpacing.toFixed(1)}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    step={0.5}
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className="w-full accent-primary"
                    aria-label="Spațiere litere"
                  />
                  <div className="flex justify-between text-xs text-text-light mt-1">
                    <span>0px</span>
                    <span>5px</span>
                  </div>
                </div>

                {/* Word spacing slider */}
                <div className="bg-surface border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-text">Spațiere cuvinte</label>
                    <span className="text-sm font-mono text-text-light">{wordSpacing.toFixed(1)}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.5}
                    value={wordSpacing}
                    onChange={(e) => setWordSpacing(Number(e.target.value))}
                    className="w-full accent-primary"
                    aria-label="Spațiere cuvinte"
                  />
                  <div className="flex justify-between text-xs text-text-light mt-1">
                    <span>0px</span>
                    <span>10px</span>
                  </div>
                </div>

                {/* Color pickers */}
                <div className="bg-surface border border-border rounded-2xl p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-text mb-2">
                        Culoare text
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-10 h-10 rounded-lg border-2 border-border cursor-pointer shrink-0"
                          aria-label="Selectează culoarea textului"
                        />
                        <input
                          type="text"
                          value={textColor.toUpperCase()}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^#[0-9A-Fa-f]{6}$/.test(val)) setTextColor(val);
                          }}
                          className="flex-1 min-w-0 px-3 py-2 border border-border rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white transition-all"
                          placeholder="#000000"
                          maxLength={7}
                          aria-label="Cod hex culoare text"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-text mb-2">
                        Culoare fundal
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="w-10 h-10 rounded-lg border-2 border-border cursor-pointer shrink-0"
                          aria-label="Selectează culoarea fundalului"
                        />
                        <input
                          type="text"
                          value={bgColor.toUpperCase()}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^#[0-9A-Fa-f]{6}$/.test(val)) setBgColor(val);
                          }}
                          className="flex-1 min-w-0 px-3 py-2 border border-border rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white transition-all"
                          placeholder="#FFFFFF"
                          maxLength={7}
                          aria-label="Cod hex culoare fundal"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-text-light mt-3">
                    Contrast actual: <strong className="text-text">{ratio.toFixed(2)}:1</strong>
                    {ratio >= 4.5 ? ' — WCAG AA OK' : ' — Sub WCAG AA'}
                  </p>
                </div>
              </div>

              {/* Right: Preview + Scores (3 cols) */}
              <div className="lg:col-span-3 space-y-6">
                {/* Live Preview */}
                <div>
                  <p className="text-sm font-bold text-text uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    Previzualizare live
                  </p>
                  <motion.div
                    className="rounded-2xl border-2 border-border overflow-hidden p-8 min-h-[200px] transition-colors duration-300"
                    style={{ backgroundColor: bgColor }}
                    layout
                  >
                    <p
                      className="transition-all duration-300 whitespace-pre-wrap"
                      style={{
                        fontFamily: `"${fontFamily}", sans-serif`,
                        fontSize: `${fontSize}px`,
                        lineHeight: lineHeight,
                        letterSpacing: `${letterSpacing}px`,
                        wordSpacing: `${wordSpacing}px`,
                        color: textColor,
                      }}
                    >
                      {sampleText || 'Introduceți text mai sus...'}
                    </p>
                  </motion.div>
                </div>

                {/* Readability Score */}
                <StaggerContainer className="space-y-4">
                  <StaggerItem>
                    <div className="bg-surface border border-border rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-bold text-text uppercase tracking-widest">
                          Scor lizibilitate
                        </p>
                        <div className="text-right">
                          <motion.p
                            key={scores.overall}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`text-3xl font-extrabold ${scoreColor}`}
                          >
                            {scores.overall}/100
                          </motion.p>
                          <p className={`text-xs font-semibold ${scoreColor}`}>{scoreLabel}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {/* Font size score */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-text-light">Dimensiune font</span>
                            <span className="text-xs font-bold text-text">{scores.fontSize}%</span>
                          </div>
                          <div className="w-full h-2 bg-border/50 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${scoreBarColor(scores.fontSize)}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${scores.fontSize}%` }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                          </div>
                        </div>

                        {/* Line height score */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-text-light">Înălțime linie</span>
                            <span className="text-xs font-bold text-text">{scores.lineHeight}%</span>
                          </div>
                          <div className="w-full h-2 bg-border/50 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${scoreBarColor(scores.lineHeight)}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${scores.lineHeight}%` }}
                              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                            />
                          </div>
                        </div>

                        {/* Letter spacing score */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-text-light">Spațiere litere</span>
                            <span className="text-xs font-bold text-text">{scores.letterSpacing}%</span>
                          </div>
                          <div className="w-full h-2 bg-border/50 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${scoreBarColor(scores.letterSpacing)}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${scores.letterSpacing}%` }}
                              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
                            />
                          </div>
                        </div>

                        {/* Contrast score */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-text-light">Contrast culori ({ratio.toFixed(1)}:1)</span>
                            <span className="text-xs font-bold text-text">{scores.contrast}%</span>
                          </div>
                          <div className="w-full h-2 bg-border/50 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${scoreBarColor(scores.contrast)}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${scores.contrast}%` }}
                              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>

                  {/* WCAG Tips */}
                  <StaggerItem>
                    <div className="bg-surface border border-border rounded-2xl p-6">
                      <p className="text-sm font-bold text-text uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-accent" aria-hidden="true" />
                        Recomandări WCAG
                      </p>
                      <div className="space-y-2.5">
                        {tips.map((tip, i) => (
                          <motion.div
                            key={tip}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="flex items-start gap-3 text-sm text-text-light leading-relaxed"
                          >
                            <span className="shrink-0 w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold mt-0.5">
                              {i + 1}
                            </span>
                            <span>{tip}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>

                  {/* Current settings summary */}
                  <StaggerItem>
                    <div className="bg-surface border border-border rounded-2xl p-6">
                      <p className="text-sm font-bold text-text uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Info className="w-4 h-4 text-primary" aria-hidden="true" />
                        Setări curente
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="bg-white border border-border/50 rounded-xl px-3 py-2">
                          <p className="text-xs text-text-light">Font</p>
                          <p className="text-sm font-bold text-text truncate">{fontFamily}</p>
                        </div>
                        <div className="bg-white border border-border/50 rounded-xl px-3 py-2">
                          <p className="text-xs text-text-light">Dimensiune</p>
                          <p className="text-sm font-bold text-text">{fontSize}px</p>
                        </div>
                        <div className="bg-white border border-border/50 rounded-xl px-3 py-2">
                          <p className="text-xs text-text-light">Înălțime linie</p>
                          <p className="text-sm font-bold text-text">{lineHeight.toFixed(1)}</p>
                        </div>
                        <div className="bg-white border border-border/50 rounded-xl px-3 py-2">
                          <p className="text-xs text-text-light">Spațiere litere</p>
                          <p className="text-sm font-bold text-text">{letterSpacing.toFixed(1)}px</p>
                        </div>
                        <div className="bg-white border border-border/50 rounded-xl px-3 py-2">
                          <p className="text-xs text-text-light">Spațiere cuvinte</p>
                          <p className="text-sm font-bold text-text">{wordSpacing.toFixed(1)}px</p>
                        </div>
                        <div className="bg-white border border-border/50 rounded-xl px-3 py-2">
                          <p className="text-xs text-text-light">Contrast</p>
                          <p className="text-sm font-bold text-text">{ratio.toFixed(2)}:1</p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
