'use client';

import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { useToast } from '@/components/Toast';
import { FadeIn } from '@/components/animations';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      addToast('Te rugăm să introduci adresa de email.', 'warning');
      return;
    }

    if (!isValidEmail(email)) {
      addToast('Adresa de email nu este validă.', 'error');
      return;
    }

    setLoading(true);

    try {
      const stored = localStorage.getItem('upa-newsletter-emails');
      const emails: string[] = stored ? JSON.parse(stored) : [];

      if (emails.includes(email.toLowerCase().trim())) {
        addToast('Această adresă de email este deja abonată.', 'info');
        setLoading(false);
        return;
      }

      emails.push(email.toLowerCase().trim());
      localStorage.setItem('upa-newsletter-emails', JSON.stringify(emails));

      addToast('Te-ai abonat cu succes la newsletter!', 'success');
      setEmail('');
    } catch {
      addToast('A apărut o eroare. Te rugăm să încerci din nou.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeIn>
      <section className="relative overflow-hidden rounded-2xl">
        {/* Mesh gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #1B4D8E 0%, #2563EB 30%, #10B981 60%, #7C3AED 100%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.3) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(37, 99, 235, 0.4) 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />

        <div className="relative px-6 py-12 sm:px-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Abonează-te la Newsletter
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Primește noutăți despre incluziune, legislație și oportunități de colaborare.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Adresa de email
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="adresa@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
              autoComplete="email"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              {loading ? 'Se trimite...' : 'Abonează-te'}
            </button>
          </form>

          <p className="text-white/50 text-xs mt-4">
            Nu trimitem spam. Te poți dezabona oricând.
          </p>
        </div>
      </section>
    </FadeIn>
  );
}
