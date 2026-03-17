'use client';

import { FileText } from 'lucide-react';
import { FadeIn } from '@/components/animations';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function TermsPage() {
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
                { label: 'Termeni și Condiții' },
              ]}
            />
            <div className="mt-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                  Termeni și Condiții
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
                Bine ați venit pe <strong>UPA Hub</strong>. Prin accesarea și utilizarea acestui site web,
                acceptați să respectați prezentii termeni și condiții. Vă rugăm să-i citiți cu atenție
                înainte de a utiliza platforma.
              </p>

              <h2>1. Domeniul de aplicare</h2>
              <p>
                Acești termeni se aplică tuturor utilizatorilor platformei UPA Hub, inclusiv vizitatorilor,
                companiilor și unităților protejate înregistrate. UPA Hub este o platformă informativă
                care facilitează conectarea între companii și unități protejate autorizate din România.
              </p>

              <h2>2. Utilizarea platformei</h2>
              <p>Prin utilizarea UPA Hub, vă angajați să:</p>
              <ul>
                <li>Folosiți platforma doar în scopuri legale și conforme cu acești termeni.</li>
                <li>Nu încercați să perturbați funcționarea normală a site-ului.</li>
                <li>Nu colectați date ale altor utilizatori fără consimțământul lor.</li>
                <li>Furnizați informații corecte și actualizate atunci când completați formulare.</li>
                <li>Nu utilizați platforma pentru activități frauduloase sau înșelătoare.</li>
              </ul>

              <h2>3. Conținutul platformei</h2>
              <p>
                Informațiile prezentate pe UPA Hub au caracter informativ. Deși depunem eforturi pentru
                a menține datele exacte și actualizate, nu garantăm exhaustivitatea, acuratețea sau
                actualitatea tuturor informațiilor publicate.
              </p>
              <p>
                Informațiile despre unitățile protejate sunt furnizate pe baza datelor publice disponibile
                și a informațiilor transmise de unitățile respective. UPA Hub nu se substituie
                verificărilor oficiale efectuate de autoritățile competente.
              </p>

              <h2>4. Proprietate intelectuală</h2>
              <p>
                Toate elementele platformei UPA Hub — incluzând, dar fără a se limita la: designul,
                codul sursă, textele, grafica, logo-urile, iconurile și structura bazei de date — sunt
                protejate de legislația privind drepturile de autor și proprietatea intelectuală.
              </p>
              <p>
                Nu aveți dreptul să reproduceți, distribuiți, modificați sau exploatați comercial
                conținutul platformei fără acordul prealabil scris al UPA Hub.
              </p>

              <h2>5. Instrumentele de accesibilitate</h2>
              <p>
                UPA Hub pune la dispoziție instrumente gratuite de accesibilitate (contrast checker,
                font tester, heading checker etc.). Acestea sunt oferite &quot;ca atare&quot; (&quot;as is&quot;) și sunt
                destinate utilizării orientative. Nu garantăm că rezultatele acestor instrumente
                îndeplinesc toate cerințele legale sau standardele specifice de accesibilitate.
              </p>

              <h2>6. Limitarea răspunderii</h2>
              <p>
                UPA Hub nu poate fi ținut responsabil pentru:
              </p>
              <ul>
                <li>Eventualele erori sau omisiuni din informațiile publicate.</li>
                <li>Pierderile sau daunele rezultate din utilizarea platformei.</li>
                <li>Conținutul site-urilor externe către care platforma poate face trimitere.</li>
                <li>Întreruperile temporare ale serviciului din motive tehnice sau de mentenanță.</li>
                <li>Deciziile luate pe baza informațiilor furnizate de platformă.</li>
              </ul>

              <h2>7. Link-uri externe</h2>
              <p>
                Platforma poate conține link-uri către site-uri externe. UPA Hub nu controlează și nu
                își asumă responsabilitatea pentru conținutul, politicile de confidențialitate sau
                practicile altor site-uri web.
              </p>

              <h2>8. Modificarea termenilor</h2>
              <p>
                Ne rezervăm dreptul de a modifica acești termeni în orice moment. Modificările intră
                în vigoare la data publicării pe această pagină. Continuarea utilizării platformei
                după publicarea modificărilor constituie acceptarea noilor termeni.
              </p>

              <h2>9. Legislație aplicabilă</h2>
              <p>
                Acești termeni sunt guvernați de legislația din <strong>România</strong>. Orice litigiu
                va fi soluționat de instanțele judecătorești competente din București, România, în
                conformitate cu dreptul român.
              </p>

              <h2>10. Contact</h2>
              <p>
                Pentru orice întrebări referitoare la acești termeni și condiții, ne puteți contacta:
              </p>
              <ul>
                <li><strong>Email:</strong> contact@upa-hub.ro</li>
                <li><strong>Adresă:</strong> UPA Hub, București, România</li>
              </ul>

              <blockquote>
                Ultima actualizare: <strong>17 martie 2026</strong>
              </blockquote>
            </article>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
