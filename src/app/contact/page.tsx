'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    type: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Contact</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Ai întrebări despre platformă, despre colaborarea cu unități protejate sau dorești să ne transmiți o sugestie?
            Suntem aici să te ajutăm.
          </p>
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-border">
                <h2 className="text-lg font-bold text-text mb-4">Informații de Contact</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-text text-sm">Email</p>
                      <a href="mailto:contact@upahub.ro" className="text-text-light text-sm hover:text-primary">contact@upahub.ro</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-text text-sm">Telefon</p>
                      <a href="tel:+40700000000" className="text-text-light text-sm hover:text-primary">+40 700 000 000</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-text text-sm">Adresă</p>
                      <p className="text-text-light text-sm">București, România</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-text text-sm">Program</p>
                      <p className="text-text-light text-sm">Luni - Vineri: 09:00 - 17:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
                <h3 className="font-semibold text-primary mb-2">Sugestie de Tool?</h3>
                <p className="text-text-light text-sm">
                  Cunoști un instrument util pentru accesibilitate? Selectează &ldquo;Sugestie tool&rdquo; în formularul de contact
                  și descrie-ne instrumentul.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 lg:p-8 rounded-xl border border-border">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-secondary" aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl font-bold text-text mb-2">Mesaj trimis!</h2>
                    <p className="text-text-light">Îți mulțumim pentru mesaj. Te vom contacta în cel mai scurt timp.</p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', type: 'general', message: '' }); }}
                      className="mt-6 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Trimite alt mesaj
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-text mb-6">Trimite-ne un mesaj</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-text mb-1.5">
                            Nume complet <span className="text-error">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-text mb-1.5">
                            Email <span className="text-error">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-text mb-1.5">
                          Tip solicitare
                        </label>
                        <select
                          id="type"
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="general">Întrebare generală</option>
                          <option value="colaborare">Colaborare cu UPA</option>
                          <option value="sugestie-tool">Sugestie tool</option>
                          <option value="inscriere">Înscriere unitate protejată</option>
                          <option value="parteneriat">Propunere parteneriat</option>
                          <option value="altele">Altele</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-text mb-1.5">
                          Subiect <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-text mb-1.5">
                          Mesaj <span className="text-error">*</span>
                        </label>
                        <textarea
                          id="message"
                          rows={6}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-3 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        <Send className="w-4 h-4" aria-hidden="true" />
                        Trimite Mesajul
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
