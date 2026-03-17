'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accessibility,
  X,
  Type,
  Eye,
  EyeOff,
  BookOpen,
  MousePointer,
  Sparkles,
  Link2,
  RotateCcw,
  Sun,
  Moon,
  Palette,
  Minus,
  Plus,
  AlignLeft,
  AlignJustify,
  Focus,
  Heading,
  List,
  Hand,
  Zap,
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────────── */

type SaturationMode = 'normal' | 'low' | 'grayscale';
type ColorBlindness = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
type CursorSize = 'normal' | 'large' | 'xlarge';
type LineHeightMode = 'normal' | 'medium' | 'large';
type SpacingMode = 'normal' | 'wide' | 'extra-wide';
type TextAlignMode = 'default' | 'left' | 'justify';
type TabId = 'vizual' | 'citire' | 'navigare' | 'motor';

interface AccessibilityPreferences {
  // Vizual
  highContrast: boolean;
  darkMode: boolean;
  saturation: SaturationMode;
  colorBlindness: ColorBlindness;
  cursorSize: CursorSize;
  // Citire
  fontScale: number;
  dyslexiaFont: boolean;
  lineHeight: LineHeightMode;
  letterSpacing: SpacingMode;
  wordSpacing: SpacingMode;
  textAlign: TextAlignMode;
  readingGuide: boolean;
  // Navigare
  focusIndicator: boolean;
  highlightLinks: boolean;
  headingHighlight: boolean;
  pageStructure: boolean;
  // Motor
  reduceMotion: boolean;
  stopAnimations: boolean;
  largeTargets: boolean;
}

const DEFAULT_PREFERENCES: AccessibilityPreferences = {
  highContrast: false,
  darkMode: false,
  saturation: 'normal',
  colorBlindness: 'none',
  cursorSize: 'normal',
  fontScale: 1,
  dyslexiaFont: false,
  lineHeight: 'normal',
  letterSpacing: 'normal',
  wordSpacing: 'normal',
  textAlign: 'default',
  readingGuide: false,
  focusIndicator: false,
  highlightLinks: false,
  headingHighlight: false,
  pageStructure: false,
  reduceMotion: false,
  stopAnimations: false,
  largeTargets: false,
};

const STORAGE_KEY = 'upa-accessibility';

const FONT_SCALE_MIN = 0.75;
const FONT_SCALE_MAX = 1.5;
const FONT_SCALE_STEP = 0.125;

const TABS: { id: TabId; label: string }[] = [
  { id: 'vizual', label: 'Vizual' },
  { id: 'citire', label: 'Citire' },
  { id: 'navigare', label: 'Navigare' },
  { id: 'motor', label: 'Motor' },
];

/* ─── SVG filter definitions for color blindness simulation ────────── */

function ColorBlindnessSVGFilters() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
      <defs>
        <filter id="protanopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.567 0.433 0     0 0
                    0.558 0.442 0     0 0
                    0     0.242 0.758 0 0
                    0     0     0     1 0"
          />
        </filter>
        <filter id="deuteranopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.625 0.375 0     0 0
                    0.7   0.3   0     0 0
                    0     0.3   0.7   0 0
                    0     0     0     1 0"
          />
        </filter>
        <filter id="tritanopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.95 0.05 0     0 0
                    0    0.433 0.567 0 0
                    0    0.475 0.525 0 0
                    0    0     0     1 0"
          />
        </filter>
      </defs>
    </svg>
  );
}

/* ─── Heading data for Page Structure panel ────────────────────────── */

interface HeadingInfo {
  level: number;
  text: string;
  element: HTMLElement;
}

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('vizual');
  const [prefs, setPrefs] = useState<AccessibilityPreferences>(DEFAULT_PREFERENCES);
  const [mouseY, setMouseY] = useState(0);
  const [headings, setHeadings] = useState<HeadingInfo[]>([]);
  const guideRef = useRef<HTMLDivElement>(null);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<AccessibilityPreferences>;
        setPrefs((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist preferences to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore storage errors
    }
  }, [prefs]);

  // Apply font scale CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(prefs.fontScale));
  }, [prefs.fontScale]);

  // Apply all class toggles on <html>
  useEffect(() => {
    const cl = document.documentElement.classList;

    // Boolean toggles
    const toggleMap: Record<string, boolean> = {
      'high-contrast': prefs.highContrast,
      dark: prefs.darkMode,
      'dyslexia-font': prefs.dyslexiaFont,
      'reduce-motion': prefs.reduceMotion,
      'highlight-links': prefs.highlightLinks,
      'a11y-focus-enhanced': prefs.focusIndicator,
      'a11y-heading-highlight': prefs.headingHighlight,
      'a11y-stop-animations': prefs.stopAnimations,
      'a11y-large-targets': prefs.largeTargets,
    };

    Object.entries(toggleMap).forEach(([cls, on]) => {
      on ? cl.add(cls) : cl.remove(cls);
    });

    // Saturation (mutually exclusive)
    cl.remove('a11y-low-saturation', 'a11y-grayscale');
    if (prefs.saturation === 'low') cl.add('a11y-low-saturation');
    if (prefs.saturation === 'grayscale') cl.add('a11y-grayscale');

    // Color blindness (mutually exclusive)
    cl.remove('a11y-protanopia', 'a11y-deuteranopia', 'a11y-tritanopia');
    if (prefs.colorBlindness !== 'none') cl.add(`a11y-${prefs.colorBlindness}`);

    // Cursor size
    cl.remove('a11y-cursor-large', 'a11y-cursor-xlarge');
    if (prefs.cursorSize === 'large') cl.add('a11y-cursor-large');
    if (prefs.cursorSize === 'xlarge') cl.add('a11y-cursor-xlarge');

    // Line height
    cl.remove('a11y-line-height-medium', 'a11y-line-height-large');
    if (prefs.lineHeight === 'medium') cl.add('a11y-line-height-medium');
    if (prefs.lineHeight === 'large') cl.add('a11y-line-height-large');

    // Letter spacing
    cl.remove('a11y-letter-wide', 'a11y-letter-extra-wide');
    if (prefs.letterSpacing === 'wide') cl.add('a11y-letter-wide');
    if (prefs.letterSpacing === 'extra-wide') cl.add('a11y-letter-extra-wide');

    // Word spacing
    cl.remove('a11y-word-wide', 'a11y-word-extra-wide');
    if (prefs.wordSpacing === 'wide') cl.add('a11y-word-wide');
    if (prefs.wordSpacing === 'extra-wide') cl.add('a11y-word-extra-wide');

    // Text align
    cl.remove('a11y-text-left', 'a11y-text-justify');
    if (prefs.textAlign === 'left') cl.add('a11y-text-left');
    if (prefs.textAlign === 'justify') cl.add('a11y-text-justify');
  }, [prefs]);

  // Reading guide: track mouse position
  useEffect(() => {
    if (!prefs.readingGuide) return;
    const handler = (e: MouseEvent) => setMouseY(e.clientY);
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [prefs.readingGuide]);

  // Collect headings for Page Structure
  useEffect(() => {
    if (!prefs.pageStructure) {
      setHeadings([]);
      return;
    }
    const els = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const result: HeadingInfo[] = [];
    els.forEach((el) => {
      const text = (el as HTMLElement).innerText?.trim();
      if (text) {
        result.push({
          level: parseInt(el.tagName[1]),
          text,
          element: el as HTMLElement,
        });
      }
    });
    setHeadings(result);
  }, [prefs.pageStructure, isOpen]);

  const updatePref = useCallback(
    <K extends keyof AccessibilityPreferences>(key: K, value: AccessibilityPreferences[K]) => {
      setPrefs((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetAll = useCallback(() => {
    setPrefs(DEFAULT_PREFERENCES);
    document.documentElement.style.removeProperty('--font-scale');
  }, []);

  const decreaseFont = () => {
    setPrefs((prev) => ({
      ...prev,
      fontScale: Math.max(FONT_SCALE_MIN, +(prev.fontScale - FONT_SCALE_STEP).toFixed(3)),
    }));
  };

  const increaseFont = () => {
    setPrefs((prev) => ({
      ...prev,
      fontScale: Math.min(FONT_SCALE_MAX, +(prev.fontScale + FONT_SCALE_STEP).toFixed(3)),
    }));
  };

  const resetFont = () => updatePref('fontScale', 1);

  const scrollToHeading = (el: HTMLElement) => {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.style.outline = '3px solid #2563EB';
    el.style.outlineOffset = '4px';
    setTimeout(() => {
      el.style.outline = '';
      el.style.outlineOffset = '';
    }, 2000);
  };

  /* ─── Render ──────────────────────────────────────────────────────── */

  return (
    <>
      <ColorBlindnessSVGFilters />

      {/* Reading Guide Overlay */}
      <AnimatePresence>
        {prefs.readingGuide && (
          <motion.div
            ref={guideRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: mouseY - 2,
              left: 0,
              right: 0,
              height: 4,
              background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
              pointerEvents: 'none',
              zIndex: 99998,
              boxShadow: '0 0 12px 2px rgba(59,130,246,0.35)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Page Structure Panel */}
      <AnimatePresence>
        {prefs.pageStructure && headings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'fixed',
              top: 80,
              left: 16,
              width: 280,
              maxHeight: '60vh',
              overflowY: 'auto',
              background: '#ffffff',
              borderRadius: 12,
              boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
              zIndex: 99997,
              padding: '12px 0',
            }}
          >
            <div
              style={{
                padding: '8px 16px 12px',
                fontSize: 13,
                fontWeight: 700,
                color: '#6366f1',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <List size={16} />
              Structura Paginii
            </div>
            {headings.map((h, i) => (
              <button
                key={i}
                onClick={() => scrollToHeading(h.element)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '6px 16px',
                  paddingLeft: 16 + (h.level - 1) * 14,
                  fontSize: 13,
                  fontWeight: h.level <= 2 ? 600 : 400,
                  color: h.level <= 2 ? '#1e293b' : '#64748b',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f1f5f9')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ color: '#94a3b8', fontSize: 11, marginRight: 6 }}>H{h.level}</span>
                {h.text}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button + Panel */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 99999 }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              style={{
                position: 'absolute',
                bottom: 68,
                right: 0,
                width: 380,
                background: '#ffffff',
                borderRadius: 16,
                boxShadow:
                  '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Panel Header */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Accessibility size={22} color="#fff" />
                  <span
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontWeight: 700,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Setări Accesibilitate
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Închide panoul de accesibilitate"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: 8,
                    padding: 4,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'rgba(255,255,255,0.35)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')
                  }
                >
                  <X size={18} color="#fff" />
                </button>
              </div>

              {/* Tabs */}
              <div
                style={{
                  display: 'flex',
                  borderBottom: '1px solid #e2e8f0',
                  flexShrink: 0,
                }}
              >
                {TABS.map((tab) => (
                  <TabButton
                    key={tab.id}
                    label={tab.label}
                    active={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </div>

              {/* Panel Body - scrollable */}
              <div
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  maxHeight: '70vh',
                  overflowY: 'auto',
                }}
              >
                {/* ═══ TAB: VIZUAL ═══ */}
                {activeTab === 'vizual' && (
                  <>
                    {/* High Contrast */}
                    <OptionRow icon={<Eye size={18} />} label="Contrast Ridicat">
                      <ToggleSwitch
                        checked={prefs.highContrast}
                        onChange={(v) => updatePref('highContrast', v)}
                        aria-label="Comută contrast ridicat"
                      />
                    </OptionRow>

                    {/* Dark Mode */}
                    <OptionRow
                      icon={prefs.darkMode ? <Moon size={18} /> : <Sun size={18} />}
                      label="Mod Întunecat"
                    >
                      <ToggleSwitch
                        checked={prefs.darkMode}
                        onChange={(v) => updatePref('darkMode', v)}
                        aria-label="Comută mod întunecat"
                      />
                    </OptionRow>

                    {/* Saturation */}
                    <OptionRow icon={<Palette size={18} />} label="Saturație">
                      <div style={{ display: 'flex', gap: 4 }}>
                        <SmallButton
                          onClick={() => updatePref('saturation', 'normal')}
                          active={prefs.saturation === 'normal'}
                          aria-label="Saturație normală"
                        >
                          Norm
                        </SmallButton>
                        <SmallButton
                          onClick={() => updatePref('saturation', 'low')}
                          active={prefs.saturation === 'low'}
                          aria-label="Saturație redusă"
                        >
                          Redus
                        </SmallButton>
                        <SmallButton
                          onClick={() => updatePref('saturation', 'grayscale')}
                          active={prefs.saturation === 'grayscale'}
                          aria-label="Tonuri de gri"
                        >
                          Gri
                        </SmallButton>
                      </div>
                    </OptionRow>

                    {/* Color Blindness */}
                    <OptionRow icon={<EyeOff size={18} />} label="Daltonism">
                      <select
                        value={prefs.colorBlindness}
                        onChange={(e) =>
                          updatePref('colorBlindness', e.target.value as ColorBlindness)
                        }
                        aria-label="Filtru daltonism"
                        style={{
                          fontSize: 12,
                          padding: '4px 8px',
                          borderRadius: 8,
                          border: '1px solid #e2e8f0',
                          background: '#f1f5f9',
                          color: '#334155',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                      >
                        <option value="none">Niciunul</option>
                        <option value="protanopia">Protanopie</option>
                        <option value="deuteranopia">Deuteranopie</option>
                        <option value="tritanopia">Tritanopie</option>
                      </select>
                    </OptionRow>

                    {/* Cursor Size */}
                    <OptionRow icon={<MousePointer size={18} />} label="Dimensiune Cursor">
                      <div style={{ display: 'flex', gap: 4 }}>
                        <SmallButton
                          onClick={() => updatePref('cursorSize', 'normal')}
                          active={prefs.cursorSize === 'normal'}
                          aria-label="Cursor normal"
                        >
                          Norm
                        </SmallButton>
                        <SmallButton
                          onClick={() => updatePref('cursorSize', 'large')}
                          active={prefs.cursorSize === 'large'}
                          aria-label="Cursor mare"
                        >
                          Mare
                        </SmallButton>
                        <SmallButton
                          onClick={() => updatePref('cursorSize', 'xlarge')}
                          active={prefs.cursorSize === 'xlarge'}
                          aria-label="Cursor foarte mare"
                        >
                          XL
                        </SmallButton>
                      </div>
                    </OptionRow>
                  </>
                )}

                {/* ═══ TAB: CITIRE ═══ */}
                {activeTab === 'citire' && (
                  <>
                    {/* Font Size */}
                    <OptionRow icon={<Type size={18} />} label="Dimensiune Font">
                      <div style={{ display: 'flex', gap: 6 }}>
                        <SmallButton
                          onClick={decreaseFont}
                          disabled={prefs.fontScale <= FONT_SCALE_MIN}
                          aria-label="Micșorează fontul"
                        >
                          A-
                        </SmallButton>
                        <SmallButton onClick={resetFont} aria-label="Resetează fontul">
                          A
                        </SmallButton>
                        <SmallButton
                          onClick={increaseFont}
                          disabled={prefs.fontScale >= FONT_SCALE_MAX}
                          aria-label="Mărește fontul"
                        >
                          A+
                        </SmallButton>
                      </div>
                    </OptionRow>

                    {/* Dyslexia Font */}
                    <OptionRow icon={<BookOpen size={18} />} label="Font Dislexie">
                      <ToggleSwitch
                        checked={prefs.dyslexiaFont}
                        onChange={(v) => updatePref('dyslexiaFont', v)}
                        aria-label="Comută font pentru dislexie"
                      />
                    </OptionRow>

                    {/* Line Height */}
                    <OptionRow icon={<Minus size={18} />} label="Înălțime Linie">
                      <div style={{ display: 'flex', gap: 4 }}>
                        <SmallButton
                          onClick={() => updatePref('lineHeight', 'normal')}
                          active={prefs.lineHeight === 'normal'}
                          aria-label="Înălțime linie normală"
                        >
                          Norm
                        </SmallButton>
                        <SmallButton
                          onClick={() => updatePref('lineHeight', 'medium')}
                          active={prefs.lineHeight === 'medium'}
                          aria-label="Înălțime linie 1.8"
                        >
                          1.8
                        </SmallButton>
                        <SmallButton
                          onClick={() => updatePref('lineHeight', 'large')}
                          active={prefs.lineHeight === 'large'}
                          aria-label="Înălțime linie 2.2"
                        >
                          2.2
                        </SmallButton>
                      </div>
                    </OptionRow>

                    {/* Letter Spacing */}
                    <OptionRow icon={<Type size={18} />} label="Spațiere Litere">
                      <div style={{ display: 'flex', gap: 4 }}>
                        <SmallButton
                          onClick={() => updatePref('letterSpacing', 'normal')}
                          active={prefs.letterSpacing === 'normal'}
                          aria-label="Spațiere litere normală"
                        >
                          Norm
                        </SmallButton>
                        <SmallButton
                          onClick={() => updatePref('letterSpacing', 'wide')}
                          active={prefs.letterSpacing === 'wide'}
                          aria-label="Spațiere litere largă"
                        >
                          Larg
                        </SmallButton>
                        <SmallButton
                          onClick={() => updatePref('letterSpacing', 'extra-wide')}
                          active={prefs.letterSpacing === 'extra-wide'}
                          aria-label="Spațiere litere extra largă"
                        >
                          XL
                        </SmallButton>
                      </div>
                    </OptionRow>

                    {/* Word Spacing */}
                    <OptionRow icon={<Plus size={18} />} label="Spațiere Cuvinte">
                      <div style={{ display: 'flex', gap: 4 }}>
                        <SmallButton
                          onClick={() => updatePref('wordSpacing', 'normal')}
                          active={prefs.wordSpacing === 'normal'}
                          aria-label="Spațiere cuvinte normală"
                        >
                          Norm
                        </SmallButton>
                        <SmallButton
                          onClick={() => updatePref('wordSpacing', 'wide')}
                          active={prefs.wordSpacing === 'wide'}
                          aria-label="Spațiere cuvinte largă"
                        >
                          Larg
                        </SmallButton>
                        <SmallButton
                          onClick={() => updatePref('wordSpacing', 'extra-wide')}
                          active={prefs.wordSpacing === 'extra-wide'}
                          aria-label="Spațiere cuvinte extra largă"
                        >
                          XL
                        </SmallButton>
                      </div>
                    </OptionRow>

                    {/* Text Align */}
                    <OptionRow icon={<AlignLeft size={18} />} label="Aliniere Text">
                      <div style={{ display: 'flex', gap: 4 }}>
                        <SmallButton
                          onClick={() => updatePref('textAlign', 'default')}
                          active={prefs.textAlign === 'default'}
                          aria-label="Aliniere implicită"
                        >
                          Auto
                        </SmallButton>
                        <SmallButton
                          onClick={() => updatePref('textAlign', 'left')}
                          active={prefs.textAlign === 'left'}
                          aria-label="Aliniere stânga"
                        >
                          <AlignLeft size={14} />
                        </SmallButton>
                        <SmallButton
                          onClick={() => updatePref('textAlign', 'justify')}
                          active={prefs.textAlign === 'justify'}
                          aria-label="Aliniere justify"
                        >
                          <AlignJustify size={14} />
                        </SmallButton>
                      </div>
                    </OptionRow>

                    {/* Reading Guide */}
                    <OptionRow icon={<MousePointer size={18} />} label="Ghid de Citire">
                      <ToggleSwitch
                        checked={prefs.readingGuide}
                        onChange={(v) => updatePref('readingGuide', v)}
                        aria-label="Comută ghid de citire"
                      />
                    </OptionRow>
                  </>
                )}

                {/* ═══ TAB: NAVIGARE ═══ */}
                {activeTab === 'navigare' && (
                  <>
                    {/* Focus Indicator */}
                    <OptionRow icon={<Focus size={18} />} label="Indicator Focus">
                      <ToggleSwitch
                        checked={prefs.focusIndicator}
                        onChange={(v) => updatePref('focusIndicator', v)}
                        aria-label="Comută indicator focus îmbunătățit"
                      />
                    </OptionRow>

                    {/* Link Highlighting */}
                    <OptionRow icon={<Link2 size={18} />} label="Evidențiere Linkuri">
                      <ToggleSwitch
                        checked={prefs.highlightLinks}
                        onChange={(v) => updatePref('highlightLinks', v)}
                        aria-label="Comută evidențierea linkurilor"
                      />
                    </OptionRow>

                    {/* Heading Highlighting */}
                    <OptionRow icon={<Heading size={18} />} label="Evidențiere Titluri">
                      <ToggleSwitch
                        checked={prefs.headingHighlight}
                        onChange={(v) => updatePref('headingHighlight', v)}
                        aria-label="Comută evidențierea titlurilor"
                      />
                    </OptionRow>

                    {/* Page Structure */}
                    <OptionRow icon={<List size={18} />} label="Structura Paginii">
                      <ToggleSwitch
                        checked={prefs.pageStructure}
                        onChange={(v) => updatePref('pageStructure', v)}
                        aria-label="Comută afișarea structurii paginii"
                      />
                    </OptionRow>
                  </>
                )}

                {/* ═══ TAB: MOTOR ═══ */}
                {activeTab === 'motor' && (
                  <>
                    {/* Reduce Motion */}
                    <OptionRow icon={<Sparkles size={18} />} label="Reduce Mișcarea">
                      <ToggleSwitch
                        checked={prefs.reduceMotion}
                        onChange={(v) => updatePref('reduceMotion', v)}
                        aria-label="Comută reducerea animațiilor"
                      />
                    </OptionRow>

                    {/* Stop All Animations */}
                    <OptionRow icon={<Zap size={18} />} label="Oprire Animații">
                      <ToggleSwitch
                        checked={prefs.stopAnimations}
                        onChange={(v) => updatePref('stopAnimations', v)}
                        aria-label="Comută oprirea completă a animațiilor"
                      />
                    </OptionRow>

                    {/* Large Click Targets */}
                    <OptionRow icon={<Hand size={18} />} label="Ținte Click Mari">
                      <ToggleSwitch
                        checked={prefs.largeTargets}
                        onChange={(v) => updatePref('largeTargets', v)}
                        aria-label="Comută ținte click mari"
                      />
                    </OptionRow>
                  </>
                )}

                {/* Reset All - always visible */}
                <button
                  onClick={resetAll}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '10px 16px',
                    marginTop: 4,
                    background: '#fef2f2',
                    color: '#dc2626',
                    border: '1px solid #fecaca',
                    borderRadius: 10,
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fee2e2';
                    e.currentTarget.style.borderColor = '#fca5a5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fef2f2';
                    e.currentTarget.style.borderColor = '#fecaca';
                  }}
                  aria-label="Resetează toate setările de accesibilitate"
                >
                  <RotateCcw size={16} />
                  Resetează Tot
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Închide setări accesibilitate' : 'Deschide setări accesibilitate'}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            border: 'none',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 30px rgba(37,99,235,0.4)',
            position: 'relative',
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulse ring */}
          {!isOpen && (
            <motion.span
              style={{
                position: 'absolute',
                inset: -4,
                borderRadius: '50%',
                border: '2px solid rgba(37,99,235,0.5)',
              }}
              animate={{
                scale: [1, 1.25],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          )}
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex' }}
              >
                <X size={26} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex' }}
              >
                <Accessibility size={26} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}

/* ─── Sub-components ────────────────────────────────────────────────── */

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '10px 8px',
        fontSize: 13,
        fontWeight: 600,
        color: active ? '#2563eb' : '#64748b',
        background: active ? 'rgba(37,99,235,0.06)' : 'transparent',
        border: 'none',
        borderBottom: active ? '2px solid #2563eb' : '2px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = 'transparent';
      }}
    >
      {label}
    </button>
  );
}

function OptionRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
        <span style={{ color: '#6366f1', flexShrink: 0, display: 'flex' }}>{icon}</span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#1e293b',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {label}
        </span>
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

function SmallButton({
  children,
  onClick,
  disabled,
  active,
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  'aria-label'?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        minWidth: 34,
        height: 30,
        padding: '0 8px',
        borderRadius: 8,
        border: active ? '1px solid #2563eb' : '1px solid #e2e8f0',
        background: disabled
          ? '#f8fafc'
          : active
            ? 'rgba(37,99,235,0.1)'
            : '#f1f5f9',
        color: disabled ? '#94a3b8' : active ? '#2563eb' : '#334155',
        fontSize: 12,
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s',
      }}
    >
      {children}
    </button>
  );
}

function ToggleSwitch({
  checked,
  onChange,
  'aria-label': ariaLabel,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  'aria-label'?: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        border: 'none',
        padding: 2,
        cursor: 'pointer',
        background: checked
          ? 'linear-gradient(135deg, #2563eb, #7c3aed)'
          : '#cbd5e1',
        transition: 'background 0.25s',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          marginLeft: checked ? 20 : 0,
        }}
      />
    </button>
  );
}
