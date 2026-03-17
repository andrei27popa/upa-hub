'use client';

import { Accessibility, CheckCircle2, AlertCircle, Mail } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

const implementedFeatures = [
  { label: 'Skip to content (salt la conținut)', done: true },
  { label: 'Atribute ARIA pe toate componentele interactive', done: true },
  { label: 'Contrast de culoare conform WCAG 2.1 AA', done: true },
  { label: 'Navigare completă prin tastatură', done: true },
  { label: 'Compatibilitate cu cititoare de ecran (screen readers)', done: true },
  { label: 'Scalare font (mărire/micșorare text)', done: true },
  { label: 'Mod întunecat (Dark Mode)', done: true },
  { label: 'Reducerea animațiilor (Reduce Motion)', done: true },
  { label: 'Font pentru dislexie (OpenDyslexic)', done: true },
  { label: 'Widget de accesibilitate integrat', done: true },
  { label: 'Texte alternative pentru imagini', done: true },
  { label: 'Structură semantică a heading-urilor (h1-h6)', done: true },
  { label: 'Focus vizibil pe elementele interactive', done: true },
  { label: 'Formulare cu etichete și mesaje de eroare accesibile', done: true },
];

const knownLimitations = [
  'Unele conținuturi generate de terți (de exemplu, hărți interactive) pot avea limitări de accesibilitate.',
  'PDF-urile externe către care facem trimitere pot să nu fie complet accesibile.',
  'Anumite animații complexe pot fi vizibile chiar și cu opțiunea "Reduce Motion" activată (lucrăm la rezolvare).',
];

export default function AccessibilityPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden mesh-gradient bg-gradient-to-br from-primary to-primary-dark text-white pt-28 pb-16">
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Breadcrumbs
              items={[
                { label: 'Acasă', href: '/' },
                { label: 'Declarație de Accesibilitate' },
              ]}
            />
            <div className="mt-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Accessibility className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                  Declarație de Accesibilitate
                </h1>
                <p className="text-blue-100 mt-1 text-sm">
                  Ultima actualizare: 17 martie 2026
                </p>
              </div>
            </div>
          </FadeIn>
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

      {/* Content */}
      <section className="bg-white dark:bg-[#0B1120] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <article className="article-content">
              <p>
                <strong>UPA Hub</strong> se angajează să asigure accesibilitatea digitală pentru toate
                persoanele, inclusiv cele cu dizabilități. Depunem eforturi continue pentru a îmbunătăți
                experiența utilizatorilor și pentru a aplica standardele relevante de accesibilitate.
              </p>

              <h2>Obiectivul nostru de conformitate</h2>
              <p>
                Ne propunem să respectăm cerințele{' '}
                <strong>WCAG 2.1 (Web Content Accessibility Guidelines) la nivelul AA</strong>.
                Aceste linii directoare explică modul în care conținutul web poate fi făcut mai accesibil
                pentru persoanele cu diverse tipuri de dizabilități, inclusiv deficiențe de vedere,
                auz, mobilitate și cogniție.
              </p>

              <h2>Ce am implementat</h2>
              <p>
                Am luat măsuri semnificative pentru a face platforma UPA Hub accesibilă. Mai jos
                este lista funcționalităților de accesibilitate implementate:
              </p>
            </article>
          </FadeIn>

          {/* Accessibility features checklist */}
          <FadeIn delay={0.1}>
            <StaggerContainer className="grid sm:grid-cols-2 gap-3 my-8">
              {implementedFeatures.map((feature) => (
                <StaggerItem key={feature.label}>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/5 dark:bg-secondary/10 border border-secondary/20">
                    <CheckCircle2
                      className="w-5 h-5 text-secondary shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-text dark:text-gray-200 font-medium">
                      {feature.label}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>

          <FadeIn delay={0.2}>
            <article className="article-content">
              <h2>Widgetul de accesibilitate</h2>
              <p>
                UPA Hub include un <strong>widget de accesibilitate</strong> integrat, accesibil prin
                butonul flotant din colțul din dreapta jos al ecranului. Widgetul vă permite să:
              </p>
              <ul>
                <li>Măriți sau micșorați dimensiunea textului.</li>
                <li>Activați modul întunecat (Dark Mode).</li>
                <li>Activați fontul pentru dislexie (OpenDyslexic).</li>
                <li>Reduceți animațiile pentru un confort vizual sporit.</li>
                <li>Resetați toate setările la valorile implicite.</li>
              </ul>
              <p>
                Setările alese sunt salvate local în browserul dumneavoastră și sunt păstrate între vizite.
              </p>

              <h2>Limitări cunoscute</h2>
              <p>
                Cu toate eforturile noastre, pot exista unele limitări de accesibilitate:
              </p>
            </article>
          </FadeIn>

          {/* Known limitations */}
          <FadeIn delay={0.3}>
            <div className="space-y-3 my-8">
              {knownLimitations.map((limitation, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30"
                >
                  <AlertCircle
                    className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-text-light dark:text-gray-300">
                    {limitation}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <article className="article-content">
              <h2>Cum să raportați o problemă de accesibilitate</h2>
              <p>
                Apreciem feedback-ul dumneavoastră. Dacă întâmpinați dificultăți în accesarea oricărei
                părți a platformei UPA Hub, vă rugăm să ne contactați:
              </p>
              <ul>
                <li><strong>Email:</strong> accesibilitate@upa-hub.ro</li>
                <li><strong>Formularul de contact:</strong>{' '}
                  <Link href="/contact" className="text-primary font-semibold hover:underline">
                    pagina de contact
                  </Link>
                </li>
              </ul>
              <p>
                Vă rugăm să includeți în mesaj:
              </p>
              <ul>
                <li>Pagina sau funcționalitatea unde ați întâmpinat problema.</li>
                <li>O descriere a dificultății întâmpinate.</li>
                <li>Browserul și dispozitivul folosit.</li>
                <li>Tehnologia asistivă utilizată (dacă este cazul).</li>
              </ul>
              <p>
                Vom depune toate eforturile pentru a răspunde în termen de <strong>5 zile lucrătoare</strong>{' '}
                și pentru a rezolva problema raportată cât mai curând posibil.
              </p>

              <h2>Evaluare și îmbunătățire continuă</h2>
              <p>
                Evaluăm periodic accesibilitatea platformei UPA Hub prin:
              </p>
              <ul>
                <li>Testare automată cu instrumente specializate (axe, Lighthouse).</li>
                <li>Testare manuală cu cititor de ecran și navigare exclusiv prin tastatură.</li>
                <li>Revizuirea feedback-ului primit de la utilizatori.</li>
                <li>Utilizarea instrumentelor proprii (Contrast Checker, Heading Checker) pentru auto-auditare.</li>
              </ul>

              <blockquote>
                Accesibilitatea nu este o destinație, ci o călătorie continuă. Ne angajăm să îmbunătățim
                constant platforma UPA Hub pentru a fi cât mai incluzivă posibil.
              </blockquote>
            </article>
          </FadeIn>

          {/* Contact CTA */}
          <FadeIn delay={0.5}>
            <div className="mt-12 p-6 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/20 flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-text dark:text-white mb-1">Aveți o problemă de accesibilitate?</h3>
                <p className="text-sm text-text-light dark:text-gray-300 mb-3">
                  Suntem aici să vă ajutăm. Nu ezitați să ne contactați pentru orice dificultate
                  întâmpinată pe platformă.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Contactează-ne
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
