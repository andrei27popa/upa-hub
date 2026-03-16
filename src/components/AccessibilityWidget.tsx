'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accessibility,
  X,
  Type,
  Eye,
  BookOpen,
  MousePointer,
  Sparkles,
  Link2,
  RotateCcw,
} from 'lucide-react';

interface AccessibilityPreferences {
  fontScale: number;
  highContrast: boolean;
  dyslexiaFont: boolean;
  readingGuide: boolean;
  reduceMotion: boolean;
  highlightLinks: boolean;
}

const DEFAULT_PREFERENCES: AccessibilityPreferences = {
  fontScale: 1,
  highContrast: false,
  dyslexiaFont: false,
  readingGuide: false,
  reduceMotion: false,
  highlightLinks: false,
};

const STORAGE_KEY = 'upa-accessibility';

const FONT_SCALE_MIN = 0.75;
const FONT_SCALE_MAX = 1.5;
const FONT_SCALE_STEP = 0.125;

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [prefs, setPrefs] = useState<AccessibilityPreferences>(DEFAULT_PREFERENCES);
  const [mouseY, setMouseY] = useState(0);
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

  // Apply class toggles on <html>
  useEffect(() => {
    const cl = document.documentElement.classList;

    prefs.highContrast ? cl.add('high-contrast') : cl.remove('high-contrast');
    prefs.dyslexiaFont ? cl.add('dyslexia-font') : cl.remove('dyslexia-font');
    prefs.reduceMotion ? cl.add('reduce-motion') : cl.remove('reduce-motion');
    prefs.highlightLinks ? cl.add('highlight-links') : cl.remove('highlight-links');
  }, [prefs.highContrast, prefs.dyslexiaFont, prefs.reduceMotion, prefs.highlightLinks]);

  // Reading guide: track mouse position
  useEffect(() => {
    if (!prefs.readingGuide) return;

    const handler = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [prefs.readingGuide]);

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

  const resetFont = () => {
    updatePref('fontScale', 1);
  };

  return (
    <>
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

      {/* Floating Button */}
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
                width: 340,
                background: '#ffffff',
                borderRadius: 16,
                boxShadow:
                  '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                overflow: 'hidden',
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

              {/* Panel Body */}
              <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
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

                {/* High Contrast */}
                <OptionRow icon={<Eye size={18} />} label="Contrast Ridicat">
                  <ToggleSwitch
                    checked={prefs.highContrast}
                    onChange={(v) => updatePref('highContrast', v)}
                    aria-label="Comută contrast ridicat"
                  />
                </OptionRow>

                {/* Dyslexia-Friendly Font */}
                <OptionRow icon={<BookOpen size={18} />} label="Font Dislexie">
                  <ToggleSwitch
                    checked={prefs.dyslexiaFont}
                    onChange={(v) => updatePref('dyslexiaFont', v)}
                    aria-label="Comută font pentru dislexie"
                  />
                </OptionRow>

                {/* Reading Guide */}
                <OptionRow icon={<MousePointer size={18} />} label="Ghid de Citire">
                  <ToggleSwitch
                    checked={prefs.readingGuide}
                    onChange={(v) => updatePref('readingGuide', v)}
                    aria-label="Comută ghid de citire"
                  />
                </OptionRow>

                {/* Reduce Motion */}
                <OptionRow icon={<Sparkles size={18} />} label="Reduce Mișcarea">
                  <ToggleSwitch
                    checked={prefs.reduceMotion}
                    onChange={(v) => updatePref('reduceMotion', v)}
                    aria-label="Comută reducerea animațiilor"
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

                {/* Reset All */}
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
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  'aria-label'?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        width: 34,
        height: 30,
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        background: disabled ? '#f8fafc' : '#f1f5f9',
        color: disabled ? '#94a3b8' : '#334155',
        fontSize: 13,
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
