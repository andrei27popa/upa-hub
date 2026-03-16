import Link from 'next/link';
import {
  Shield, Scale, Users, Heart, TrendingUp, CheckCircle2,
  Building2, ArrowRight, AlertCircle, Banknote,
} from 'lucide-react';

export default function WhatIsUPAPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-10 h-10" aria-hidden="true" />
              <h1 className="text-3xl lg:text-5xl font-bold">Ce este o Unitate Protejată?</h1>
            </div>
            <p className="text-xl text-blue-100 leading-relaxed">
              Ghid complet despre unitățile protejate autorizate, legislație, beneficii
              și mecanismul contribuției pentru dizabilitate.
            </p>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text mb-6">Definiție</h2>
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl mb-8">
            <p className="text-text leading-relaxed text-lg">
              <strong>Unitatea protejată autorizată (UPA)</strong> este operatorul economic de drept public
              sau privat, cu gestiune proprie, care are cel puțin 30% din numărul total de angajați
              persoane cu dizabilități, și care deține autorizație de funcționare emisă conform legii.
            </p>
          </div>
          <p className="text-text-light leading-relaxed mb-4">
            Unitățile protejate autorizate sunt entități care oferă un mediu de muncă adaptat
            persoanelor cu dizabilități. Acestea pot fi organizații non-profit, societăți comerciale,
            secții sau ateliere care funcționează în cadrul unor companii mai mari.
          </p>
          <p className="text-text-light leading-relaxed">
            Scopul lor este de a facilita accesul la piața muncii pentru persoanele cu dizabilități,
            oferindu-le condiții de lucru adaptate, formare profesională și sprijin constant.
          </p>
        </div>
      </section>

      {/* Legislation */}
      <section className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Scale className="w-8 h-8 text-primary" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-text">Cadrul Legislativ</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-border">
              <h3 className="font-semibold text-text text-lg mb-3">Legea nr. 448/2006</h3>
              <p className="text-text-light leading-relaxed mb-4">
                Legea privind protecția și promovarea drepturilor persoanelor cu handicap stabilește
                cadrul general. Conform articolului 78, autoritățile și instituțiile publice, persoanele
                juridice, publice sau private, cu cel puțin 50 de angajați, au obligația de a angaja
                persoane cu handicap într-un procent de cel puțin 4% din numărul total de angajați.
              </p>
              <div className="bg-warning/10 border border-warning/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-text text-sm mb-1">Obligație legală</p>
                    <p className="text-text-light text-sm">
                      Companiile cu peste 50 de angajați care nu îndeplinesc cota de 4% trebuie să opteze
                      pentru una din alternativele prevăzute de lege.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border">
              <h3 className="font-semibold text-text text-lg mb-3">Alternativele legale</h3>
              <p className="text-text-light mb-4">
                Companiile care nu angajează persoane cu dizabilități în proporția cerută pot opta pentru:
              </p>
              <div className="space-y-3">
                {[
                  {
                    option: 'Opțiunea A',
                    title: 'Achiziție de la unități protejate',
                    description: 'Plata lunară către bugetul de stat a unei sume reprezentând salariul minim brut pe țară înmulțit cu numărul de locuri de muncă neocupate, SAU achiziționarea de produse/servicii de la unități protejate autorizate, în valoare echivalentă.',
                  },
                  {
                    option: 'Opțiunea B',
                    title: 'Plata contribuției la bugetul de stat',
                    description: 'Plata către bugetul de stat a sumei de 50% din salariul minim brut pe țară înmulțit cu numărul de locuri neocupate conform cotei obligatorii.',
                  },
                ].map((item) => (
                  <div key={item.option} className="flex gap-4 p-4 bg-surface rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-sm">{item.option.split(' ')[1]}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text mb-1">{item.title}</h4>
                      <p className="text-text-light text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="w-8 h-8 text-secondary" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-text">Beneficiile Colaborării cu UPA</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Scale,
                title: 'Conformitate Legală',
                description: 'Îndeplinești obligațiile din Legea 448/2006 prin achiziția de servicii/produse de la UPA.',
              },
              {
                icon: Banknote,
                title: 'Eficiență Financiară',
                description: 'Sumele plătite către UPA sunt deductibile fiscal. Economisești comparativ cu plata contribuției.',
              },
              {
                icon: Heart,
                title: 'Responsabilitate Socială',
                description: 'Contribui la angajarea și integrarea persoanelor cu dizabilități pe piața muncii.',
              },
              {
                icon: TrendingUp,
                title: 'Imagine Corporativă',
                description: 'Demonstrezi angajamentul față de incluziune și diversitate — valori apreciate de clienți și parteneri.',
              },
              {
                icon: Users,
                title: 'Diversitate în Lanțul de Aprovizionare',
                description: 'Integrezi furnizori sociali în supply chain, contribuind la obiectivele ESG.',
              },
              {
                icon: Building2,
                title: 'Servicii Profesionale',
                description: 'UPA-urile oferă servicii de calitate la prețuri competitive, de la IT la curățenie.',
              },
            ].map((benefit) => (
              <div key={benefit.title} className="flex gap-4 p-5 bg-surface rounded-xl">
                <benefit.icon className="w-6 h-6 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-text mb-1">{benefit.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact */}
      <section className="bg-gradient-to-br from-impact to-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-secondary-light" aria-hidden="true" />
          <h2 className="text-3xl font-bold mb-4">Impactul Social</h2>
          <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-2xl mx-auto">
            Colaborarea cu unități protejate nu este doar o obligație legală — este o investiție
            în demnitatea umană. Fiecare contract cu o UPA înseamnă locuri de muncă pentru
            persoane care altfel ar fi excluse de pe piața muncii.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: '800K+', label: 'Persoane cu dizabilități în România' },
              { value: '<10%', label: 'Rata de angajare' },
              { value: '150+', label: 'UPA-uri active' },
              { value: '3.500+', label: 'Locuri de muncă create' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-secondary-light">{stat.value}</p>
                <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mechanism */}
      <section className="bg-surface py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text mb-8">Mecanismul Contribuției</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Verifică obligația', description: 'Companiile cu peste 50 de angajați verifică dacă au minim 4% angajați cu dizabilități.' },
              { step: '2', title: 'Alege opțiunea', description: 'Dacă nu se atinge cota, compania optează pentru achiziție de la UPA sau plata contribuției.' },
              { step: '3', title: 'Identifică UPA potrivită', description: 'Prin UPA Hub, identifici unitatea protejată care oferă serviciile de care ai nevoie.' },
              { step: '4', title: 'Încheie contractul', description: 'Semnezi contractul de achiziție cu UPA și primești serviciile/produsele convenite.' },
              { step: '5', title: 'Raportează și beneficiezi', description: 'Sumele plătite sunt deductibile. Raportezi conformitatea către autorități.' },
            ].map((step) => (
              <div key={step.step} className="flex gap-4 bg-white p-5 rounded-xl border border-border">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-text mb-1">{step.title}</h3>
                  <p className="text-text-light text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-text mb-4">Începe colaborarea acum</h2>
          <p className="text-text-light text-lg mb-8 max-w-2xl mx-auto">
            Explorează directorul de unități protejate autorizate de pe UPA Hub
            și găsește partenerul potrivit pentru nevoile companiei tale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/unitati-protejate" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
              Explorează Unitățile Protejate
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors">
              Solicită Consultanță
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
