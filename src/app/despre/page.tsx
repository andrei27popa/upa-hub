import { Shield, Target, Eye, Heart, Users, Building2, Wrench, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">Despre UPA Hub</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Platforma digitală care conectează companiile responsabile cu unitățile protejate
              autorizate și promovează incluziunea persoanelor cu dizabilități în câmpul muncii.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text mb-6">Misiunea Noastră</h2>
              <p className="text-text-light leading-relaxed mb-4">
                UPA Hub a fost creat cu scopul de a facilita și accelera incluziunea persoanelor cu
                dizabilități pe piața muncii din România. Credem că fiecare persoană merită oportunitatea
                de a contribui și de a fi apreciată pentru valoarea pe care o aduce.
              </p>
              <p className="text-text-light leading-relaxed mb-4">
                Prin intermediul platformei noastre, simplificăm procesul de identificare și colaborare
                cu unități protejate autorizate, oferind în același timp instrumente digitale gratuite
                pentru accesibilitate și incluziune.
              </p>
              <p className="text-text-light leading-relaxed">
                Ne dorim ca UPA Hub să devină resursa de referință pentru orice companie sau instituție
                care dorește să contribuie la o societate mai incluzivă.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, title: 'Viziune', description: 'O piață a muncii în care dizabilitatea nu mai este o barieră.' },
                { icon: Heart, title: 'Valori', description: 'Incluziune, transparență, empatie și impact social measurabil.' },
                { icon: Eye, title: 'Transparență', description: 'Verificăm și certificăm fiecare unitate protejată din platformă.' },
                { icon: TrendingUp, title: 'Impact', description: 'Măsurăm și raportăm impactul social al fiecărei colaborări.' },
              ].map((item) => (
                <div key={item.title} className="bg-surface p-5 rounded-xl">
                  <item.icon className="w-8 h-8 text-primary mb-3" aria-hidden="true" />
                  <h3 className="font-semibold text-text mb-2">{item.title}</h3>
                  <p className="text-text-light text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text text-center mb-12">Ce Oferim</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: 'Director de Unități Protejate',
                description: 'Cel mai complet director de unități protejate autorizate din România. Cu filtre avansate, profile detaliate și sistem de verificare.',
              },
              {
                icon: Wrench,
                title: 'Tool-uri de Accesibilitate',
                description: 'Bibliotecă de instrumente digitale gratuite pentru accesibilitate, utile pentru angajatori, persoane cu dizabilități, designeri și dezvoltatori.',
              },
              {
                icon: Users,
                title: 'Comunitate și Resurse',
                description: 'Resurse educaționale, ghiduri practice și o comunitate dedicată incluziunii și accesibilității în România.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-xl border border-border text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-text mb-3">{item.title}</h3>
                <p className="text-text-light text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">Echipa Noastră</h2>
            <p className="text-text-light max-w-2xl mx-auto">
              UPA Hub este dezvoltat de o echipă pasionată de incluziune socială,
              cu experiență în tehnologie, resurse umane și legislație.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Ana Marinescu', role: 'Fondator & Director', initials: 'AM' },
              { name: 'Mihai Popa', role: 'Director Tehnic', initials: 'MP' },
              { name: 'Elena Vasile', role: 'Specialist Incluziune', initials: 'EV' },
              { name: 'Andrei Ionescu', role: 'Manager Parteneriate', initials: 'AI' },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary font-bold text-lg" aria-hidden="true">
                  {member.initials}
                </div>
                <h3 className="font-semibold text-text">{member.name}</h3>
                <p className="text-text-light text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-12 h-12 text-white/80 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-3xl font-bold text-white mb-4">Alătură-te misiunii noastre</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Fie că ești o companie, o unitate protejată sau o persoană pasionată de incluziune,
            locul tău este pe UPA Hub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inscrie-unitate" className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Înscrie o Unitate
            </Link>
            <Link href="/contact" className="px-6 py-3 bg-white/15 text-white font-semibold rounded-lg hover:bg-white/25 transition-colors border border-white/30">
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
