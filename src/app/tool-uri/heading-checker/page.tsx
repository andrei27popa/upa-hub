'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Heading1,
  Code,
  ArrowRight,
  Info,
  ListTree,
  BarChart3,
  FileCode2,
} from 'lucide-react';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatedOrbs,
} from '@/components/animations';

// --- Types ---

interface HeadingNode {
  level: number;
  text: string;
  index: number;
}

interface Issue {
  type: 'error' | 'warning';
  message: string;
}

interface AnalysisResult {
  headings: HeadingNode[];
  issues: Issue[];
  score: number;
}

// --- Heading level colors ---

const levelColors: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-300' },
  2: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  3: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' },
  4: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' },
  5: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
  6: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-300' },
};

// --- Example HTML ---

const exampleHtml = `<!DOCTYPE html>
<html lang="ro">
<head><title>Pagina exemplu</title></head>
<body>
  <h1>Titlul principal al paginii</h1>
  <p>Paragraf introductiv despre subiect.</p>

  <h2>Prima secțiune importantă</h2>
  <p>Conținut detaliat despre prima secțiune.</p>

  <h3>Subsecțiune cu detalii</h3>
  <p>Mai multe informații despre acest subiect.</p>

  <h3>Altă subsecțiune</h3>
  <p>Alte detalii relevante.</p>

  <h2>A doua secțiune principală</h2>
  <p>Text despre a doua secțiune.</p>

  <!-- Probleme intenșionate mai jos -->
  <h1>Al doilea H1 - nu ar trebui să existe</h1>

  <h4>Nivel sărit - de la H2 la H4</h4>

  <h3></h3>

  <h2>Un heading care este mult prea lung și depășește limita de 70 de caractere recomandată pentru SEO și accesibilitate</h2>

  <h1>OK</h1>
</body>
</html>`;

// --- Analysis logic ---

function analyzeHeadings(html: string): AnalysisResult {
  const headings: HeadingNode[] = [];
  const issues: Issue[] = [];

  // Extract headings using regex
  const headingRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    // Strip HTML tags from heading text
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    headings.push({ level, text, index: idx++ });
  }

  if (headings.length === 0) {
    issues.push({ type: 'error', message: 'Nu s-au găsit headinguri în codul HTML furnizat.' });
    return { headings, issues, score: 0 };
  }

  // Check: Missing H1
  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) {
    issues.push({ type: 'error', message: 'Lipsește tagul H1 — fiecare pagină trebuie să aibă exact un H1.' });
  }

  // Check: Multiple H1
  if (h1s.length > 1) {
    issues.push({
      type: 'warning',
      message: `S-au găsit ${h1s.length} taguri H1. Se recomandă un singur H1 per pagină.`,
    });
  }

  // Check: Skipped levels
  for (let i = 1; i < headings.length; i++) {
    const prev = headings[i - 1].level;
    const curr = headings[i].level;
    if (curr > prev + 1) {
      issues.push({
        type: 'error',
        message: `Nivel de heading sărit: de la H${prev} la H${curr} (headingul #${i + 1}: "${headings[i].text || '(gol)'}"). Nivelurile nu trebuie sărite.`,
      });
    }
  }

  // Check: Empty headings
  headings.forEach((h, i) => {
    if (!h.text) {
      issues.push({
        type: 'error',
        message: `Heading gol: H${h.level} la poziția #${i + 1}. Headingurile nu trebuie să fie goale.`,
      });
    }
  });

  // Check: Too long headings (>70 chars)
  headings.forEach((h, i) => {
    if (h.text.length > 70) {
      issues.push({
        type: 'warning',
        message: `Heading prea lung (${h.text.length} caractere): H${h.level} la poziția #${i + 1} — "${h.text.substring(0, 50)}…". Se recomandă max 70 de caractere.`,
      });
    }
  });

  // Check: Heading used for styling (very short H1/H2)
  headings.forEach((h, i) => {
    if ((h.level === 1 || h.level === 2) && h.text.length > 0 && h.text.length <= 3) {
      issues.push({
        type: 'warning',
        message: `Heading posibil folosit pentru stilizare: H${h.level} la poziția #${i + 1} — "${h.text}". Un heading atât de scurt (${h.text.length} car.) poate indica utilizare incorectă.`,
      });
    }
  });

  // Calculate score
  const maxPenalty = headings.length * 2 + 5; // rough baseline
  const errorPenalty = issues.filter((i) => i.type === 'error').length * 3;
  const warningPenalty = issues.filter((i) => i.type === 'warning').length * 1;
  const totalPenalty = errorPenalty + warningPenalty;
  const score = Math.max(0, Math.min(100, Math.round(100 - (totalPenalty / maxPenalty) * 100)));

  return { headings, issues, score };
}

// --- Component ---

export default function HeadingCheckerPage() {
  const [activeTab, setActiveTab] = useState<'html' | 'url'>('html');
  const [htmlInput, setHtmlInput] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = useCallback(() => {
    if (!htmlInput.trim()) return;
    const analysis = analyzeHeadings(htmlInput);
    setResult(analysis);
    setHasAnalyzed(true);
  }, [htmlInput]);

  const loadExample = useCallback(() => {
    setHtmlInput(exampleHtml);
    setResult(null);
    setHasAnalyzed(false);
  }, []);

  const errorCount = useMemo(() => result?.issues.filter((i) => i.type === 'error').length ?? 0, [result]);
  const warningCount = useMemo(() => result?.issues.filter((i) => i.type === 'warning').length ?? 0, [result]);

  const scoreColor = useMemo(() => {
    if (!result) return '';
    if (result.score >= 80) return 'text-green-600';
    if (result.score >= 50) return 'text-amber-500';
    return 'text-red-500';
  }, [result]);

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
              <Heading1 className="w-4 h-4" aria-hidden="true" /> Instrument
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Verificator{' '}
              <span className="gradient-text-hero">Structură Headinguri</span>
            </h1>
            <p className="text-blue-100/70 text-lg max-w-2xl font-light">
              Analizează ierarhia headingurilor (H1–H6) din codul HTML al paginii tale
              și identifică problemele de structură, SEO și accesibilitate.
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
            {/* Tab Toggle */}
            <div className="flex gap-1 p-1 bg-surface border border-border rounded-xl mb-6 w-fit">
              <button
                onClick={() => setActiveTab('html')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'html'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-light hover:text-text'
                }`}
              >
                <Code className="w-4 h-4 inline-block mr-2 -mt-0.5" aria-hidden="true" />
                Introdu HTML
              </button>
              <button
                onClick={() => setActiveTab('url')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'url'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-light hover:text-text'
                }`}
              >
                <ArrowRight className="w-4 h-4 inline-block mr-2 -mt-0.5" aria-hidden="true" />
                Introdu URL
              </button>
            </div>

            {/* URL tab info */}
            <AnimatePresence mode="wait">
              {activeTab === 'url' && (
                <motion.div
                  key="url-info"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="text-sm text-amber-800">
                      <p className="font-bold mb-1">
                        Nu putem prelua automat codul sursă al unui URL extern
                      </p>
                      <p>
                        Din motive de securitate (CORS), browserul nu permite accesarea
                        codului sursă al altor site-uri. Pentru a analiza o pagină web:
                      </p>
                      <ol className="list-decimal ml-5 mt-2 space-y-1">
                        <li>Deschide pagina dorită în browser</li>
                        <li>Click dreapta → <strong>View Page Source</strong> (sau Ctrl+U)</li>
                        <li>Copiază tot codul HTML (Ctrl+A, Ctrl+C)</li>
                        <li>Lipește-l în tab-ul <strong>&quot;Introdu HTML&quot;</strong></li>
                      </ol>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Textarea */}
            <div className="bg-surface border border-border rounded-2xl p-6">
              <label
                htmlFor="html-input"
                className="block text-sm font-bold text-text mb-3"
              >
                Codul HTML al paginii
              </label>
              <textarea
                id="html-input"
                value={htmlInput}
                onChange={(e) => {
                  setHtmlInput(e.target.value);
                  if (hasAnalyzed) {
                    setResult(null);
                    setHasAnalyzed(false);
                  }
                }}
                rows={12}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white transition-all resize-y"
                placeholder="Lipește codul HTML aici..."
              />

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAnalyze}
                  disabled={!htmlInput.trim()}
                  className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ListTree className="w-4 h-4" aria-hidden="true" />
                  Analizează
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={loadExample}
                  className="px-5 py-3 rounded-xl font-semibold text-sm border border-border text-text-light hover:text-text hover:border-primary/30 transition-all inline-flex items-center gap-2"
                >
                  <FileCode2 className="w-4 h-4" aria-hidden="true" />
                  Încarcă exemplu HTML
                </motion.button>
              </div>
            </div>
          </FadeIn>

          {/* Results */}
          <AnimatePresence mode="wait">
            {hasAnalyzed && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-10 space-y-8"
              >
                {/* Summary Stats */}
                <FadeIn>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-surface border border-border rounded-2xl p-6 text-center">
                      <p className="text-sm font-bold text-text-light uppercase tracking-widest mb-1">
                        Total headinguri
                      </p>
                      <p className="text-4xl font-extrabold text-text">
                        {result.headings.length}
                      </p>
                    </div>
                    <div className="bg-surface border border-border rounded-2xl p-6 text-center">
                      <p className="text-sm font-bold text-text-light uppercase tracking-widest mb-1">
                        Probleme găsite
                      </p>
                      <p className="text-4xl font-extrabold">
                        <span className="text-red-500">{errorCount}</span>
                        {warningCount > 0 && (
                          <span className="text-amber-500 text-2xl ml-1">+{warningCount}</span>
                        )}
                      </p>
                      <p className="text-xs text-text-light mt-1">
                        {errorCount} {errorCount === 1 ? 'eroare' : 'erori'}, {warningCount}{' '}
                        {warningCount === 1 ? 'avertisment' : 'avertismente'}
                      </p>
                    </div>
                    <div className="bg-surface border border-border rounded-2xl p-6 text-center">
                      <p className="text-sm font-bold text-text-light uppercase tracking-widest mb-1">
                        Scor structură
                      </p>
                      <p className={`text-4xl font-extrabold ${scoreColor}`}>
                        {result.score}%
                      </p>
                    </div>
                  </div>
                </FadeIn>

                {/* Heading Tree */}
                <FadeIn delay={0.1}>
                  <div className="bg-surface border border-border rounded-2xl p-6">
                    <p className="text-sm font-bold text-text uppercase tracking-widest mb-5 flex items-center gap-2">
                      <ListTree className="w-4 h-4" aria-hidden="true" />
                      Arborele de headinguri
                    </p>

                    {result.headings.length === 0 ? (
                      <p className="text-text-light text-sm italic">
                        Nu s-au găsit headinguri.
                      </p>
                    ) : (
                      <StaggerContainer className="space-y-2" staggerDelay={0.05}>
                        {result.headings.map((h, i) => {
                          const colors = levelColors[h.level];
                          const indent = (h.level - 1) * 28;
                          return (
                            <StaggerItem key={i}>
                              <div
                                className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white border border-border/50 hover:border-primary/20 transition-colors"
                                style={{ marginLeft: `${indent}px` }}
                              >
                                {/* Connector line */}
                                {h.level > 1 && (
                                  <div className="flex items-center gap-1" aria-hidden="true">
                                    <div className="w-3 h-px bg-border" />
                                  </div>
                                )}

                                {/* Level badge */}
                                <span
                                  className={`shrink-0 inline-flex items-center justify-center w-9 h-7 rounded-md text-xs font-bold border ${colors.bg} ${colors.text} ${colors.border}`}
                                >
                                  H{h.level}
                                </span>

                                {/* Text */}
                                <span
                                  className={`text-sm truncate ${
                                    h.text ? 'text-text' : 'text-red-400 italic'
                                  }`}
                                  title={h.text || '(heading gol)'}
                                >
                                  {h.text || '(gol)'}
                                </span>

                                {/* Char count */}
                                {h.text && (
                                  <span className="shrink-0 text-xs text-text-light ml-auto">
                                    {h.text.length} car.
                                  </span>
                                )}
                              </div>
                            </StaggerItem>
                          );
                        })}
                      </StaggerContainer>
                    )}
                  </div>
                </FadeIn>

                {/* Issues */}
                <FadeIn delay={0.2}>
                  <div className="bg-surface border border-border rounded-2xl p-6">
                    <p className="text-sm font-bold text-text uppercase tracking-widest mb-5 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" aria-hidden="true" />
                      Probleme identificate
                    </p>

                    {result.issues.length === 0 ? (
                      <div className="flex items-center gap-3 py-4 px-4 bg-green-50 border border-green-200 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" aria-hidden="true" />
                        <p className="text-sm font-semibold text-green-700">
                          Excelent! Nu s-au găsit probleme de structură.
                          Ierarhia headingurilor este corectă.
                        </p>
                      </div>
                    ) : (
                      <StaggerContainer className="space-y-3" staggerDelay={0.06}>
                        {result.issues.map((issue, i) => (
                          <StaggerItem key={i}>
                            <div
                              className={`flex items-start gap-3 py-3 px-4 rounded-xl border ${
                                issue.type === 'error'
                                  ? 'bg-red-50 border-red-200'
                                  : 'bg-amber-50 border-amber-200'
                              }`}
                            >
                              {issue.type === 'error' ? (
                                <XCircle
                                  className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <AlertTriangle
                                  className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                                  aria-hidden="true"
                                />
                              )}
                              <div>
                                <span
                                  className={`inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-1 ${
                                    issue.type === 'error'
                                      ? 'bg-red-100 text-red-600'
                                      : 'bg-amber-100 text-amber-600'
                                  }`}
                                >
                                  {issue.type === 'error' ? 'Eroare' : 'Avertisment'}
                                </span>
                                <p
                                  className={`text-sm ${
                                    issue.type === 'error'
                                      ? 'text-red-700'
                                      : 'text-amber-700'
                                  }`}
                                >
                                  {issue.message}
                                </p>
                              </div>
                            </div>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    )}
                  </div>
                </FadeIn>
              </motion.div>
            )}
          </AnimatePresence>
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
                  De ce contează structura headingurilor?
                </h2>
              </div>
              <div className="space-y-4 text-text-light text-sm leading-relaxed">
                <p>
                  <strong className="text-text">Headingurile HTML (H1–H6)</strong> definesc
                  ierarhia logică a conținutului unei pagini web. O structură corectă este
                  esențială atât pentru accesibilitate, cât și pentru SEO.
                </p>
                <p>
                  <strong className="text-text">Utilizatorii de screen reader</strong> navighează
                  frecvent prin headinguri pentru a înțelege structura paginii. Dacă nivelurile
                  sunt sărite (de exemplu, de la H1 direct la H4), navigarea devine confuză.
                </p>
                <p>
                  <strong className="text-text">Motoarele de căutare</strong> folosesc headingurile
                  pentru a înțelege subiectul și organizarea conținutului. Un H1 unic și descriptiv
                  ajută la indexare, iar subheadingurile organizate logic îmbunătățesc relevanța.
                </p>
                <p>
                  <strong className="text-text">Reguli de bază:</strong>
                </p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Fiecare pagină trebuie să aibă exact <strong className="text-text">un singur H1</strong></li>
                  <li>Nu săriți niveluri — de la H2, mergeți la H3, nu la H5</li>
                  <li>Nu folosiți headinguri doar pentru stilizare vizuală</li>
                  <li>Headingurile trebuie să fie descriptive și concise (max 70 caractere)</li>
                  <li>Nu lăsați headinguri goale în codul HTML</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
