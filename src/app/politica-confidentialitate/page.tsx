'use client';

import { Shield } from 'lucide-react';
import { FadeIn } from '@/components/animations';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function PrivacyPolicyPage() {
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
                { label: 'Politica de Confidențialitate' },
              ]}
            />
            <div className="mt-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                  Politica de Confidențialitate
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
                La <strong>UPA Hub</strong>, respectăm și protejăm confidențialitatea utilizatorilor noștri.
                Această politică descrie ce date colectăm, cum le folosim și care sunt drepturile
                dumneavoastră în conformitate cu Regulamentul General privind Protecția Datelor (GDPR).
              </p>

              <h2>1. Ce date colectăm</h2>
              <p>
                UPA Hub este conceput să funcționeze cu un minim de date personale. Nu avem conturi de
                utilizator și nu solicităm înregistrarea. Iată ce date procesăm:
              </p>

              <h3>1.1 Date stocate local (localStorage)</h3>
              <p>
                Următoarele date sunt stocate exclusiv în browserul dumneavoastră și <strong>nu sunt transmise
                către serverele noastre</strong>:
              </p>
              <ul>
                <li><strong>Favorite</strong> — lista de unități protejate salvate ca favorite pentru acces rapid.</li>
                <li><strong>Setări de accesibilitate</strong> — preferințele privind dimensiunea fontului, modul întunecat, fontul pentru dislexie, reducerea animațiilor și alte opțiuni ale widgetului de accesibilitate.</li>
                <li><strong>Consimțământ cookie-uri</strong> — alegerea dumneavoastră privind acceptarea sau refuzul cookie-urilor.</li>
              </ul>

              <h3>1.2 Newsletter</h3>
              <p>
                Dacă vă abonați la newsletter-ul nostru, colectăm <strong>adresa de email</strong> pe care o
                furnizați voluntar. Această adresă este folosită exclusiv pentru trimiterea de actualizări
                periodice despre platforma UPA Hub și noutăți din domeniul incluziunii.
              </p>

              <h3>1.3 Formularul de contact</h3>
              <p>
                Când ne contactați prin formularul de pe site, colectăm numele, adresa de email și mesajul
                transmis, exclusiv pentru a vă răspunde la solicitare.
              </p>

              <h2>2. Cum folosim datele</h2>
              <p>Datele colectate sunt utilizate exclusiv pentru:</p>
              <ul>
                <li>Furnizarea și îmbunătățirea funcționalităților platformei.</li>
                <li>Trimiterea newsletter-ului (doar cu consimțământul explicit).</li>
                <li>Răspunsul la mesajele primite prin formularul de contact.</li>
                <li>Analiza anonimă a traficului pentru îmbunătățirea experienței utilizatorilor.</li>
              </ul>
              <p>
                <strong>Nu vindem, nu închiriem și nu partajăm</strong> datele dumneavoastră cu terți în
                scopuri comerciale.
              </p>

              <h2>3. Cookie-uri</h2>
              <p>UPA Hub folosește un număr minim de cookie-uri:</p>
              <ul>
                <li>
                  <strong>Cookie-uri esențiale</strong> — necesare pentru funcționarea corectă a site-ului
                  (de exemplu, reținerea consimțământului privind cookie-urile). Acestea nu necesită
                  consimțământ separat.
                </li>
                <li>
                  <strong>Cookie-uri analitice</strong> — folosite doar cu consimțământul dumneavoastră
                  explicit, pentru a înțelege cum este utilizat site-ul și pentru a-l îmbunătăți.
                </li>
              </ul>
              <p>
                Puteți retrage consimțământul oricând prin intermediul bannerului de cookie-uri sau
                din setările browserului.
              </p>

              <h2>4. Drepturile dumneavoastră (GDPR)</h2>
              <p>
                În conformitate cu Regulamentul (UE) 2016/679 (GDPR), aveți următoarele drepturi:
              </p>
              <ul>
                <li><strong>Dreptul de acces</strong> — puteți solicita o copie a datelor personale pe care le deținem despre dumneavoastră.</li>
                <li><strong>Dreptul la rectificare</strong> — puteți solicita corectarea datelor inexacte.</li>
                <li><strong>Dreptul la ștergere</strong> — puteți solicita ștergerea datelor personale (&quot;dreptul de a fi uitat&quot;).</li>
                <li><strong>Dreptul la restricționarea prelucrării</strong> — puteți solicita limitarea modului în care vă procesăm datele.</li>
                <li><strong>Dreptul la portabilitatea datelor</strong> — puteți solicita transferul datelor într-un format structurat.</li>
                <li><strong>Dreptul de opoziție</strong> — vă puteți opune prelucrării datelor în anumite circumstanțe.</li>
                <li><strong>Dreptul de a retrage consimțământul</strong> — oricând, fără a afecta legalitatea prelucrării anterioare.</li>
              </ul>
              <p>
                Pentru exercitarea oricăruia dintre aceste drepturi, vă rugăm să ne contactați la adresa
                de email de mai jos.
              </p>

              <h2>5. Securitatea datelor</h2>
              <p>
                Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja datele
                dumneavoastră împotriva accesului neautorizat, pierderii sau distrugerii. Site-ul
                folosește conexiune HTTPS criptată.
              </p>

              <h2>6. Transferuri internaționale</h2>
              <p>
                Datele dumneavoastră sunt procesate în Uniunea Europeană. În cazul în care folosim
                servicii terțe care implică transferuri în afara UE, ne asigurăm că există garanții
                adecvate conform GDPR.
              </p>

              <h2>7. Contact DPO</h2>
              <p>
                Pentru orice întrebări sau solicitări privind protecția datelor, ne puteți contacta:
              </p>
              <ul>
                <li><strong>Email:</strong> dpo@upa-hub.ro</li>
                <li><strong>Adresă:</strong> UPA Hub, București, România</li>
              </ul>
              <p>
                De asemenea, aveți dreptul de a depune o plângere la{' '}
                <strong>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal
                (ANSPDCP)</strong> dacă considerați că datele dumneavoastră nu sunt prelucrate conform legii.
              </p>

              <h2>8. Actualizări ale politicii</h2>
              <p>
                Această politică poate fi actualizată periodic. Vom publica orice modificări pe această
                pagină, cu data ultimei actualizări revizuită corespunzător. Vă recomandăm să verificați
                periodic această pagină.
              </p>

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
