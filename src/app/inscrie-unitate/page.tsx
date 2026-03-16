'use client';

import { useState } from 'react';
import { Shield, Upload, CheckCircle2 } from 'lucide-react';

export default function RegisterUnitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    founder: '',
    email: '',
    phone: '',
    website: '',
    city: '',
    address: '',
    yearFounded: '',
    totalEmployees: '',
    employeesWithDisabilities: '',
    domain: '',
    services: '',
    description: '',
    hasAuthorization: false,
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="bg-surface min-h-[60vh] flex items-center justify-center py-16">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-secondary" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-4">Cererea a fost trimisă!</h1>
          <p className="text-text-light leading-relaxed mb-6">
            Îți mulțumim pentru înregistrare. Echipa noastră va verifica informațiile
            și te va contacta în termen de 3-5 zile lucrătoare pentru finalizarea procesului.
          </p>
          <a href="/" className="inline-flex px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
            Înapoi la Acasă
          </a>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-8 h-8" aria-hidden="true" />
            <h1 className="text-3xl lg:text-4xl font-bold">Înscrie o Unitate Protejată</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Completează formularul de mai jos pentru a adăuga unitatea protejată autorizată
            pe platforma UPA Hub. Procesul de verificare durează 3-5 zile lucrătoare.
          </p>
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Organization Info */}
            <div className="bg-white p-6 lg:p-8 rounded-xl border border-border">
              <h2 className="text-xl font-bold text-text mb-6">Informații Organizație</h2>
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="orgName" className="block text-sm font-medium text-text mb-1.5">
                      Numele Organizației <span className="text-error">*</span>
                    </label>
                    <input type="text" id="orgName" name="orgName" required value={formData.orgName} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label htmlFor="founder" className="block text-sm font-medium text-text mb-1.5">
                      Fondator / Manager <span className="text-error">*</span>
                    </label>
                    <input type="text" id="founder" name="founder" required value={formData.founder} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-1.5">
                      Email <span className="text-error">*</span>
                    </label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text mb-1.5">
                      Telefon <span className="text-error">*</span>
                    </label>
                    <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-text mb-1.5">
                    Website
                  </label>
                  <input type="url" id="website" name="website" value={formData.website} onChange={handleChange}
                    placeholder="https://"
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white p-6 lg:p-8 rounded-xl border border-border">
              <h2 className="text-xl font-bold text-text mb-6">Localizare</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-text mb-1.5">
                    Orașul <span className="text-error">*</span>
                  </label>
                  <input type="text" id="city" name="city" required value={formData.city} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-text mb-1.5">
                    Adresă <span className="text-error">*</span>
                  </label>
                  <input type="text" id="address" name="address" required value={formData.address} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white p-6 lg:p-8 rounded-xl border border-border">
              <h2 className="text-xl font-bold text-text mb-6">Detalii Activitate</h2>
              <div className="space-y-5">
                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="yearFounded" className="block text-sm font-medium text-text mb-1.5">
                      Anul Înființării <span className="text-error">*</span>
                    </label>
                    <input type="number" id="yearFounded" name="yearFounded" required min="1990" max="2026" value={formData.yearFounded} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label htmlFor="totalEmployees" className="block text-sm font-medium text-text mb-1.5">
                      Total Angajați <span className="text-error">*</span>
                    </label>
                    <input type="number" id="totalEmployees" name="totalEmployees" required min="1" value={formData.totalEmployees} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label htmlFor="employeesWithDisabilities" className="block text-sm font-medium text-text mb-1.5">
                      Angajați cu dizabilități <span className="text-error">*</span>
                    </label>
                    <input type="number" id="employeesWithDisabilities" name="employeesWithDisabilities" required min="1" value={formData.employeesWithDisabilities} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                </div>

                <div>
                  <label htmlFor="domain" className="block text-sm font-medium text-text mb-1.5">
                    Domeniu de Activitate <span className="text-error">*</span>
                  </label>
                  <select id="domain" name="domain" required value={formData.domain} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option value="">Selectează domeniul</option>
                    <option value="IT & Digital">IT & Digital</option>
                    <option value="Producție">Producție</option>
                    <option value="Servicii curățenie">Servicii curățenie</option>
                    <option value="Ambalare">Ambalare</option>
                    <option value="Confecții textile">Confecții textile</option>
                    <option value="Artizanat">Artizanat</option>
                    <option value="Alimentație">Alimentație</option>
                    <option value="Tipografie">Tipografie</option>
                    <option value="Servicii administrative">Servicii administrative</option>
                    <option value="Grădinărit & Peisagistică">Grădinărit & Peisagistică</option>
                    <option value="Reciclare">Reciclare</option>
                    <option value="Catering">Catering</option>
                    <option value="Altele">Altele</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="services" className="block text-sm font-medium text-text mb-1.5">
                    Servicii Oferite <span className="text-error">*</span>
                  </label>
                  <textarea id="services" name="services" required rows={3} value={formData.services} onChange={handleChange}
                    placeholder="Descrie serviciile oferite, separate prin virgulă"
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-text mb-1.5">
                    Descrierea Organizației <span className="text-error">*</span>
                  </label>
                  <textarea id="description" name="description" required rows={5} value={formData.description} onChange={handleChange}
                    placeholder="Descrie pe scurt organizația, misiunea și activitățile principale"
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                </div>

                {/* Logo upload placeholder */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Logo Organizație</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-text-lighter mx-auto mb-2" aria-hidden="true" />
                    <p className="text-sm text-text-light">Trage fișierul aici sau click pentru upload</p>
                    <p className="text-xs text-text-lighter mt-1">PNG, JPG, SVG - max 2MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification */}
            <div className="bg-white p-6 lg:p-8 rounded-xl border border-border">
              <h2 className="text-xl font-bold text-text mb-6">Verificare</h2>
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="hasAuthorization" checked={formData.hasAuthorization} onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                  <span className="text-sm text-text-light">
                    Confirm că organizația deține autorizație de funcționare ca unitate protejată,
                    emisă conform legislației în vigoare. <span className="text-error">*</span>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required
                    className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                  <span className="text-sm text-text-light">
                    Accept termenii și condițiile platformei UPA Hub și sunt de acord cu prelucrarea
                    datelor furnizate. <span className="text-error">*</span>
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Shield className="w-5 h-5" aria-hidden="true" />
              Trimite Cererea de Înscriere
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
