import Link from 'next/link';
import { BookOpen, Scale, FileText, ExternalLink, Download, ArrowRight } from 'lucide-react';

const resources = [
  {
    category: 'Legislație',
    icon: Scale,
    items: [
      { title: 'Legea nr. 448/2006 privind protecția și promovarea drepturilor persoanelor cu handicap', description: 'Cadrul legislativ principal care reglementează drepturile persoanelor cu dizabilități, inclusiv obligațiile angajatorilor.' },
      { title: 'HG nr. 268/2007 — Normele metodologice de aplicare', description: 'Normele care detaliază modul de aplicare a Legii 448/2006, inclusiv procedura de autorizare a unităților protejate.' },
      { title: 'Legea nr. 76/2002 privind sistemul asigurărilor pentru șomaj', description: 'Beneficii și stimulente pentru angajatorii care încadrează persoane cu dizabilități.' },
      { title: 'Convenția ONU privind drepturile persoanelor cu dizabilități', description: 'Cadrul internațional ratificat de România pentru protecția drepturilor persoanelor cu dizabilități.' },
    ],
  },
  {
    category: 'Ghiduri Practice',
    icon: BookOpen,
    items: [
      { title: 'Ghid de colaborare cu unități protejate', description: 'Pași practici pentru companiile care doresc să inițieze colaborări cu unități protejate autorizate.' },
      { title: 'Ghid de adaptare a locului de muncă', description: 'Recomandări pentru crearea unui mediu de lucru accesibil și incluziv pentru persoanele cu dizabilități.' },
      { title: 'Ghid WCAG 2.1 în limba română', description: 'Ghidul de accesibilitate web tradus și adaptat pentru contextul românesc.' },
      { title: 'Comunicare incluzivă — Ghid de bune practici', description: 'Cum să comunici respectuos și eficient despre dizabilitate.' },
    ],
  },
  {
    category: 'Documente Utile',
    icon: FileText,
    items: [
      { title: 'Model contract de achiziție servicii de la UPA', description: 'Template de contract pentru colaborarea dintre companii și unități protejate.' },
      { title: 'Checklist conformitate Legea 448/2006', description: 'Lista de verificare pentru companiile cu peste 50 de angajați.' },
      { title: 'Formular de solicitare autorizație UPA', description: 'Documentele necesare pentru obținerea statutului de unitate protejată autorizată.' },
      { title: 'Raport de impact social — Template', description: 'Model de raport pentru măsurarea și comunicarea impactului social al colaborărilor cu UPA.' },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Resurse</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Legislație, ghiduri practice și documente utile pentru colaborarea cu unități protejate
            și promovarea incluziunii la locul de muncă.
          </p>
        </div>
      </section>

      {/* Resources */}
      <section className="bg-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {resources.map((section) => (
              <div key={section.category}>
                <div className="flex items-center gap-3 mb-6">
                  <section.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  <h2 className="text-2xl font-bold text-text">{section.category}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {section.items.map((item) => (
                    <div key={item.title} className="bg-white p-6 rounded-xl border border-border hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-text mb-2">{item.title}</h3>
                      <p className="text-text-light text-sm leading-relaxed mb-4">{item.description}</p>
                      <div className="flex gap-3">
                        <button className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline">
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          Citește
                        </button>
                        <button className="inline-flex items-center gap-1 text-sm text-text-light font-medium hover:text-primary hover:underline">
                          <Download className="w-3.5 h-3.5" aria-hidden="true" />
                          Descarcă PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Ai nevoie de mai multe informații?</h2>
          <p className="text-text-light mb-6 max-w-lg mx-auto">
            Echipa noastră te poate ghida prin procesul de colaborare cu unități protejate.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
            Contactează-ne
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
