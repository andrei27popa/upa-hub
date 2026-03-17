'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, AnimatedOrbs } from '@/components/animations';

type FAQCategory = 'Toate' | 'General' | 'Legislație' | 'Colaborare' | 'Înregistrare' | 'Accesibilitate';

interface FAQItem {
  question: string;
  answer: string;
  category: Exclude<FAQCategory, 'Toate'>;
}

const faqItems: FAQItem[] = [
  // General
  {
    question: 'Ce este UPA Hub?',
    answer:
      'UPA Hub este platforma digitală de referință din România care conectează companiile responsabile cu unitățile protejate autorizate. Oferim un director complet de UPA-uri verificate, instrumente digitale gratuite pentru accesibilitate și resurse educaționale pentru incluziunea persoanelor cu dizabilități pe piața muncii.',
    category: 'General',
  },
  {
    question: 'Ce este o unitate protejată autorizată (UPA)?',
    answer:
      'O unitate protejată autorizată este un operator economic de drept public sau privat care are cel puțin 30% din numărul total de angajați persoane cu dizabilități și deține autorizație de funcționare emisă conform Legii 448/2006. Aceste entități oferă un mediu de muncă adaptat nevoilor persoanelor cu dizabilități.',
    category: 'General',
  },
  {
    question: 'Cine poate folosi platforma UPA Hub?',
    answer:
      'Platforma este deschisă tuturor: companii care doresc să colaboreze cu unități protejate, unități protejate autorizate care vor să-și crească vizibilitatea, persoane cu dizabilități în căutarea unui loc de muncă, specialiști în accesibilitate și resurse umane, precum și oricine interesat de incluziune socială.',
    category: 'General',
  },
  {
    question: 'Este platforma UPA Hub gratuită?',
    answer:
      'Da, utilizarea platformei UPA Hub este complet gratuită atât pentru companii, cât și pentru unitățile protejate. Directorul de unități protejate, instrumentele de accesibilitate și resursele educaționale sunt disponibile fără niciun cost. Misiunea noastră este de a facilita incluziunea, nu de a genera profit din acest serviciu.',
    category: 'General',
  },
  // Legislație
  {
    question: 'Ce prevede Legea 448/2006 privind angajarea persoanelor cu dizabilități?',
    answer:
      'Conform art. 78 din Legea 448/2006, autoritățile și instituțiile publice, persoanele juridice publice sau private cu cel puțin 50 de angajați au obligația de a angaja persoane cu handicap într-un procent de cel puțin 4% din numărul total de angajați. În caz contrar, trebuie să opteze pentru una dintre alternativele legale prevăzute.',
    category: 'Legislație',
  },
  {
    question: 'Care sunt alternativele legale pentru companiile care nu ating cota de 4%?',
    answer:
      'Companiile care nu îndeplinesc cota au două opțiuni: (A) achiziționarea de produse sau servicii de la unități protejate autorizate în valoare echivalentă cu salariul minim brut pe țară înmulțit cu numărul de locuri neocupate, sau (B) plata unei contribuții lunare la bugetul de stat de 50% din salariul minim brut pe țară pentru fiecare loc neocupat.',
    category: 'Legislație',
  },
  {
    question: 'Ce riscuri există dacă nu respect obligațiile din Legea 448/2006?',
    answer:
      'Nerespectarea obligațiilor legale poate atrage sancțiuni contravenționale, amenzi și obligații de plată retroactive. Inspectoratul Teritorial de Muncă și ANPD monitorizează conformitatea companiilor. În plus, dincolo de aspectul legal, lipsa conformității poate afecta negativ reputația companiei și eligibilitatea pentru licitații publice.',
    category: 'Legislație',
  },
  {
    question: 'Sunt deductibile fiscal sumele plătite către unitățile protejate?',
    answer:
      'Da, sumele plătite pentru achiziția de produse sau servicii de la unitățile protejate autorizate sunt deductibile fiscal. Aceasta face colaborarea cu UPA-uri nu doar o obligație legală, ci și o opțiune financiar avantajoasă comparativ cu plata directă a contribuției la bugetul de stat.',
    category: 'Legislație',
  },
  // Colaborare
  {
    question: 'Cum pot găsi o unitate protejată potrivită pentru compania mea?',
    answer:
      'Pe UPA Hub ai acces la un director complet de unități protejate autorizate cu filtre avansate: după locație (județ, oraș), tipul de servicii oferite, domeniu de activitate, număr de angajați și evaluări. Fiecare unitate are un profil detaliat cu informații de contact, servicii, certificări și recenzii de la alți parteneri.',
    category: 'Colaborare',
  },
  {
    question: 'Ce tipuri de servicii oferă unitățile protejate?',
    answer:
      'Unitățile protejate oferă o gamă largă de servicii profesionale: curățenie și mentenanță, producție industrială, ambalare și confecționare, servicii IT și digitalizare, catering și pregătire alimentară, servicii administrative și de back-office, grădinărit și amenajare spații verzi, reciclare și colectare selectivă, croitorie și textile, și multe altele.',
    category: 'Colaborare',
  },
  {
    question: 'Cum funcționează procesul de colaborare cu o UPA?',
    answer:
      'Procesul este simplu: (1) identifici unitatea protejată potrivită pe UPA Hub, (2) contactezi direct unitatea prin datele din profil, (3) negociezi și semnezi contractul de prestări servicii sau achiziție produse, (4) primești serviciile/produsele convenite, (5) facturile emise de UPA îndeplinesc obligația legală și sunt deductibile fiscal.',
    category: 'Colaborare',
  },
  {
    question: 'Pot colabora cu mai multe unități protejate simultan?',
    answer:
      'Da, puteți colabora cu oricâte unități protejate doriți. De fapt, diversificarea partenerilor UPA este o practică recomandată, deoarece vă permite să accesați servicii specializate din mai multe domenii și să reduceți dependența de un singur furnizor. Valoarea totală a contractelor se cumulează pentru îndeplinirea obligației legale.',
    category: 'Colaborare',
  },
  // Înregistrare
  {
    question: 'Cum îmi pot înregistra unitatea protejată pe UPA Hub?',
    answer:
      'Procesul de înregistrare este simplu și gratuit: accesează pagina „Înscrie o Unitate" din meniu, completează formularul cu datele unității (denumire, CUI, adresă, servicii oferite, autorizație), încarcă documentele justificative și trimite cererea. Echipa noastră verifică informațiile în maxim 48 de ore și activează profilul.',
    category: 'Înregistrare',
  },
  {
    question: 'Ce documente sunt necesare pentru înregistrare?',
    answer:
      'Pentru înregistrarea pe UPA Hub ai nevoie de: autorizația de funcționare ca unitate protejată (emisă de ANPD sau organismul competent), certificatul de înregistrare la Registrul Comerțului (CUI), o descriere detaliată a serviciilor/produselor oferite și datele de contact. Opțional, poți adăuga fotografii, certificări suplimentare și referințe.',
    category: 'Înregistrare',
  },
  {
    question: 'Cât durează procesul de verificare și aprobare?',
    answer:
      'Verificarea se realizează în termen de 24–48 de ore lucrătoare de la trimiterea cererii. Echipa noastră validează autorizația de funcționare, datele de contact și informațiile furnizate. În cazul în care sunt necesare clarificări sau documente suplimentare, veți fi contactat prin email.',
    category: 'Înregistrare',
  },
  {
    question: 'Pot modifica informațiile unității după înregistrare?',
    answer:
      'Da, puteți actualiza oricând profilul unității protejate: servicii oferite, date de contact, descriere, fotografii și alte detalii. Modificările sunt vizibile imediat pe platformă. Pentru schimbări care țin de autorizație sau date juridice, este necesară o reverificare din partea echipei noastre.',
    category: 'Înregistrare',
  },
  // Accesibilitate
  {
    question: 'Ce instrumente de accesibilitate oferă UPA Hub?',
    answer:
      'UPA Hub pune la dispoziție o suită de instrumente digitale gratuite: verificator de contrast culori (conform WCAG), checklist de accesibilitate web, ghiduri pentru adaptarea documentelor în format accesibil, resurse pentru limbaj simplu și comunicare incluzivă, și recomandări de instrumente terțe pentru testarea accesibilității.',
    category: 'Accesibilitate',
  },
  {
    question: 'Ce înseamnă standardul WCAG și de ce este important?',
    answer:
      'WCAG (Web Content Accessibility Guidelines) este standardul internațional pentru accesibilitatea conținutului web, emis de W3C. Definește criterii tehnice pentru ca site-urile și aplicațiile web să fie utilizabile de persoane cu diverse dizabilități (vizuale, auditive, motorii, cognitive). Conformitatea WCAG este obligatorie pentru site-urile instituțiilor publice din UE.',
    category: 'Accesibilitate',
  },
  {
    question: 'Cum poate compania mea să devină mai incluzivă la locul de muncă?',
    answer:
      'Există mai multe direcții: adaptarea spațiului fizic de lucru (rampe, lifturi, mobilier ergonomic), implementarea tehnologiilor asistive (cititoare de ecran, tastaturi adaptate), formarea echipei privind comunicarea incluzivă, flexibilizarea programului de lucru, desemnarea unui responsabil cu incluziunea și colaborarea cu organizații specializate pentru mentorat și suport.',
    category: 'Accesibilitate',
  },
  {
    question: 'Cum funcționează calculatorul de contribuție de pe UPA Hub?',
    answer:
      'Calculatorul de contribuție este un instrument gratuit care estimează obligația financiară a companiei dvs. conform Legii 448/2006. Introduceți numărul total de angajați, iar calculatorul afișează: numărul minim de persoane cu dizabilități pe care trebuie să le angajați (4%), suma contribuției lunare la bugetul de stat (opțiunea B) și valoarea minimă a achizițiilor de la UPA necesare (opțiunea A).',
    category: 'Accesibilitate',
  },
];

const categories: FAQCategory[] = ['Toate', 'General', 'Legislație', 'Colaborare', 'Înregistrare', 'Accesibilitate'];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('Toate');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = faqItems.filter((item) => {
    const matchesCategory = activeCategory === 'Toate' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* ====== HEADER ====== */}
      <section className="relative mesh-gradient text-white py-20 lg:py-28 overflow-hidden">
        <AnimatedOrbs />
        <div className="absolute inset-0 dot-pattern opacity-20" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6 border border-white/10">
              <HelpCircle className="w-4 h-4 text-accent-light" aria-hidden="true" />
              Centru de ajutor
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-5 tracking-tight">
              Întrebări <span className="gradient-text-hero">Frecvente</span>
            </h1>
            <p className="text-xl text-blue-100/80 leading-relaxed font-light max-w-2xl">
              Găsește rapid răspunsuri la cele mai frecvente întrebări despre unitățile protejate,
              legislație, colaborare și instrumentele de accesibilitate.
            </p>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full" preserveAspectRatio="none">
            <path
              d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ====== SEARCH & FILTER ====== */}
      <section className="bg-white pt-8 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <FadeIn>
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" aria-hidden="true" />
              <input
                type="text"
                placeholder="Caută o întrebare..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenIndex(null);
                }}
                className="w-full pl-12 pr-4 py-4 border border-border rounded-2xl text-text bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg"
              />
            </div>
          </FadeIn>

          {/* Category tabs */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(null);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-surface text-text-light hover:bg-primary/5 hover:text-primary border border-border/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== FAQ ACCORDION ====== */}
      <section className="bg-white pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <FadeIn>
              <div className="text-center py-16">
                <HelpCircle className="w-16 h-16 text-text-lighter mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-text mb-2">Nicio întrebare găsită</h3>
                <p className="text-text-light">
                  Încearcă să modifici termenul de căutare sau selectează o altă categorie.
                </p>
              </div>
            </FadeIn>
          ) : (
            <StaggerContainer className="space-y-3" staggerDelay={0.05}>
              {filteredItems.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <StaggerItem key={`${item.category}-${index}`}>
                    <div className="border border-border/60 rounded-2xl overflow-hidden bg-white hover:border-primary/30 transition-colors">
                      <button
                        onClick={() => toggle(index)}
                        className="w-full flex items-start gap-4 p-5 lg:p-6 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <HelpCircle className="w-4 h-4 text-primary" aria-hidden="true" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-text text-base lg:text-lg pr-8 leading-snug">
                            {item.question}
                          </h3>
                          <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-surface text-text-lighter text-xs font-medium rounded-full">
                            {item.category}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="shrink-0 mt-1"
                        >
                          <ChevronDown className="w-5 h-5 text-text-light" aria-hidden="true" />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 lg:px-6 pb-5 lg:pb-6 pl-[4.25rem]">
                              <p className="text-text-light leading-relaxed">{item.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 mesh-gradient" />
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <div className="relative p-10 lg:p-16 text-center">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                  <MessageCircle className="w-12 h-12 text-accent-light mx-auto mb-5" aria-hidden="true" />
                </motion.div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
                  Nu ai g&#259;sit r&#259;spunsul?
                </h2>
                <p className="text-blue-100/70 text-lg mb-10 max-w-2xl mx-auto font-light">
                  Echipa noastr&#259; este preg&#259;tit&#259; s&#259; te ajute. Trimite-ne un mesaj &#537;i &#238;&#539;i vom
                  r&#259;spunde &#238;n cel mai scurt timp posibil.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-10 py-4 bg-white text-primary font-bold rounded-2xl hover:shadow-xl hover:shadow-white/20 hover:-translate-y-1 transition-all text-lg"
                >
                  Contacteaz&#259;-ne
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
