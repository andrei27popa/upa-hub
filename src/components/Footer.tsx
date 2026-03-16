import Link from 'next/link';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <Shield className="w-7 h-7" aria-hidden="true" />
              <span>UPA <span className="text-secondary-light">Hub</span></span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Platforma care conectează companiile responsabile cu unitățile protejate autorizate și instrumentele pentru incluziune.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigare</h3>
            <ul className="space-y-2">
              {[
                { href: '/unitati-protejate', label: 'Unități Protejate' },
                { href: '/tool-uri', label: 'Tool-uri Accesibilitate' },
                { href: '/despre', label: 'Despre UPA Hub' },
                { href: '/resurse', label: 'Resurse' },
                { href: '/ce-este-upa', label: 'Ce este o Unitate Protejată?' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For companies */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Pentru Companii</h3>
            <ul className="space-y-2">
              {[
                { href: '/unitati-protejate', label: 'Găsește o unitate protejată' },
                { href: '/ce-este-upa', label: 'Beneficiile colaborării' },
                { href: '/inscrie-unitate', label: 'Înscrie o unitate' },
                { href: '/contact', label: 'Solicită consultanță' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-blue-200 text-sm">
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                <a href="mailto:contact@upahub.ro" className="hover:text-white transition-colors">contact@upahub.ro</a>
              </li>
              <li className="flex items-center gap-2 text-blue-200 text-sm">
                <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                <a href="tel:+40700000000" className="hover:text-white transition-colors">+40 700 000 000</a>
              </li>
              <li className="flex items-start gap-2 text-blue-200 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>București, România</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-300 text-sm">
              &copy; {new Date().getFullYear()} UPA Hub. Toate drepturile rezervate.
            </p>
            <div className="flex gap-6">
              <Link href="/politica-confidentialitate" className="text-blue-300 hover:text-white text-sm transition-colors">
                Politica de confidențialitate
              </Link>
              <Link href="/termeni" className="text-blue-300 hover:text-white text-sm transition-colors">
                Termeni și condiții
              </Link>
              <Link href="/accesibilitate" className="text-blue-300 hover:text-white text-sm transition-colors">
                Accesibilitate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
