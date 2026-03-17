'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  TrendingUp,
  Users,
  Building2,
  MapPin,
  Mail,
  Phone,
  Globe,
  Calendar,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import { FadeIn, AnimatedOrbs } from '@/components/animations';

const STORAGE_KEY = 'upa-hub-registration-draft';

const STEP_LABELS = ['Început', 'Detalii', 'Profil', 'Finalizare'];

const DOMAINS = [
  'IT & Digital',
  'Producție',
  'Servicii curățenie',
  'Ambalare',
  'Confecții textile',
  'Artizanat',
  'Alimentație',
  'Tipografie',
  'Servicii administrative',
  'Grădinărit & Peisagistică',
  'Reciclare',
  'Catering',
  'Altele',
];

interface FormData {
  orgName: string;
  email: string;
  domain: string;
  founder: string;
  phone: string;
  website: string;
  city: string;
  address: string;
  yearFounded: string;
  totalEmployees: string;
  employeesWithDisabilities: string;
  services: string;
  description: string;
  hasAuthorization: boolean;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

const defaultFormData: FormData = {
  orgName: '',
  email: '',
  domain: '',
  founder: '',
  phone: '',
  website: '',
  city: '',
  address: '',
  yearFounded: '',
  totalEmployees: '',
  employeesWithDisabilities: '',
  services: '',
  description: '',
  hasAuthorization: false,
  agreeTerms: false,
  agreePrivacy: false,
};

// --------------- Progress Bar ---------------
function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
        {/* Animated progress line */}
        <motion.div
          className="absolute top-5 left-0 h-0.5"
          style={{
            background: 'linear-gradient(90deg, #10B981, #2563EB, #7C3AED)',
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (STEP_LABELS.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {STEP_LABELS.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={label} className="flex flex-col items-center relative z-10">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${
                  isCompleted
                    ? 'bg-secondary border-secondary text-white'
                    : isCurrent
                    ? 'border-primary-light text-white'
                    : 'bg-white border-border text-text-lighter'
                }`}
                style={
                  isCurrent
                    ? { background: 'linear-gradient(135deg, #1B4D8E, #2563EB)' }
                    : undefined
                }
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>
              <span
                className={`mt-2 text-xs font-medium hidden sm:block ${
                  isCurrent ? 'text-primary' : isCompleted ? 'text-secondary' : 'text-text-lighter'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --------------- Slide animation variants ---------------
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

// --------------- Input classes ---------------
const inputClass =
  'w-full px-4 py-3 border border-border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200';

const labelClass = 'block text-sm font-semibold text-text mb-1.5';

// --------------- Main Component ---------------
export default function RegisterUnitPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  // Load draft from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save draft to localStorage on change
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      } catch {
        // ignore
      }
    }
  }, [formData, mounted]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const target = e.target;
      const value =
        target instanceof HTMLInputElement && target.type === 'checkbox'
          ? target.checked
          : target.value;
      setFormData((prev) => ({ ...prev, [target.name]: value }));
      // Clear error for this field
      setErrors((prev) => {
        const next = { ...prev };
        delete next[target.name];
        return next;
      });
    },
    []
  );

  const validateStep = useCallback(
    (step: number): boolean => {
      const newErrors: Record<string, string> = {};

      if (step === 0) {
        if (!formData.orgName.trim()) newErrors.orgName = 'Numele organizației este obligatoriu';
        if (!formData.email.trim()) newErrors.email = 'Email-ul este obligatoriu';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
          newErrors.email = 'Email invalid';
        if (!formData.domain) newErrors.domain = 'Selectează un domeniu';
      }

      if (step === 1) {
        if (!formData.founder.trim()) newErrors.founder = 'Fondatorul/Managerul este obligatoriu';
        if (!formData.phone.trim()) newErrors.phone = 'Telefonul este obligatoriu';
        if (!formData.city.trim()) newErrors.city = 'Orașul este obligatoriu';
        if (!formData.address.trim()) newErrors.address = 'Adresa este obligatorie';
        if (!formData.yearFounded) newErrors.yearFounded = 'Anul înființării este obligatoriu';
        else {
          const year = parseInt(formData.yearFounded);
          if (year < 1990 || year > 2026) newErrors.yearFounded = 'Anul trebuie să fie între 1990 și 2026';
        }
        if (!formData.totalEmployees) newErrors.totalEmployees = 'Numărul de angajați este obligatoriu';
        if (!formData.employeesWithDisabilities)
          newErrors.employeesWithDisabilities = 'Numărul de angajați cu dizabilități este obligatoriu';
      }

      if (step === 2) {
        if (!formData.services.trim()) newErrors.services = 'Serviciile oferite sunt obligatorii';
        if (!formData.description.trim())
          newErrors.description = 'Descrierea organizației este obligatorie';
      }

      if (step === 3) {
        if (!formData.hasAuthorization) newErrors.hasAuthorization = 'Confirmarea autorizației este obligatorie';
        if (!formData.agreeTerms) newErrors.agreeTerms = 'Acceptarea termenilor este obligatorie';
        if (!formData.agreePrivacy) newErrors.agreePrivacy = 'Acordul privind datele este obligatoriu';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [formData]
  );

  const goNext = useCallback(() => {
    if (validateStep(currentStep)) {
      setDirection(1);
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  }, [currentStep, validateStep]);

  const goBack = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleSubmit = useCallback(() => {
    if (validateStep(3)) {
      localStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
    }
  }, [validateStep]);

  const FieldError = ({ name }: { name: string }) =>
    errors[name] ? (
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-error text-xs mt-1"
      >
        {errors[name]}
      </motion.p>
    ) : null;

  // --------------- Success State ---------------
  if (submitted) {
    return (
      <section className="bg-surface min-h-[80vh] flex items-center justify-center py-16">
        <div className="max-w-lg text-center px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.4 }}
            >
              <CheckCircle2 className="w-12 h-12 text-secondary" aria-hidden="true" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-text mb-4"
          >
            Cererea a fost trimisă cu succes!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="text-text-light leading-relaxed mb-8 text-lg"
          >
            Echipa noastră va verifica informațiile și te va contacta în 3-5 zile lucrătoare
            pentru finalizarea procesului.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-xl border border-border p-6 mb-8"
          >
            <p className="text-sm font-semibold text-text mb-3">Între timp, explorează platforma:</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/unitati"
                className="text-sm text-primary-light hover:underline font-medium"
              >
                Descoperă unitățile protejate
              </a>
              <span className="hidden sm:inline text-text-lighter">|</span>
              <a
                href="/despre"
                className="text-sm text-primary-light hover:underline font-medium"
              >
                Află mai multe despre UPA Hub
              </a>
            </div>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
            href="/"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-xl"
          >
            Înapoi la Acasă
          </motion.a>
        </div>
      </section>
    );
  }

  // --------------- Step 1: Motivation & Quick Start ---------------
  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Hero section with mesh gradient */}
      <div className="relative rounded-2xl overflow-hidden mesh-gradient py-12 px-6 lg:px-10 text-white">
        <AnimatedOrbs />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="w-8 h-8 mx-auto mb-4 text-accent-light" aria-hidden="true" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl lg:text-3xl font-bold mb-3"
          >
            Alătură-te comunității UPA Hub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-blue-100 text-base lg:text-lg"
          >
            Conectează-te cu sute de companii care caută parteneri de încredere
          </motion.p>
        </div>
      </div>

      {/* Benefit cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          {
            icon: TrendingUp,
            title: 'Vizibilitate Crescută',
            desc: 'Profilul tău va fi vizibil pentru sute de companii care caută servicii',
            color: 'text-secondary',
            bg: 'bg-secondary/10',
          },
          {
            icon: Users,
            title: 'Conexiuni Directe',
            desc: 'Primești cereri de ofertă direct de la companii interesate',
            color: 'text-primary-light',
            bg: 'bg-primary-light/10',
          },
          {
            icon: Shield,
            title: 'Credibilitate',
            desc: 'Verificarea UPA Hub conferă încredere și profesionalism',
            color: 'text-impact',
            bg: 'bg-impact/10',
          },
        ].map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="card-hover bg-white rounded-xl border border-border p-5 text-center"
          >
            <div
              className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}
            >
              <card.icon className={`w-6 h-6 ${card.color}`} aria-hidden="true" />
            </div>
            <h3 className="font-bold text-text text-sm mb-1">{card.title}</h3>
            <p className="text-text-light text-xs leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Fields */}
      <div className="bg-white rounded-xl border border-border p-6 lg:p-8 space-y-5">
        <div>
          <label htmlFor="orgName" className={labelClass}>
            <Building2 className="w-4 h-4 inline mr-1.5 text-text-lighter" />
            Numele Organizației <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="orgName"
            name="orgName"
            value={formData.orgName}
            onChange={handleChange}
            placeholder="Ex: Atelierul de Incluziune SRL"
            className={`${inputClass} ${errors.orgName ? 'border-error focus:ring-error/20' : ''}`}
          />
          <FieldError name="orgName" />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            <Mail className="w-4 h-4 inline mr-1.5 text-text-lighter" />
            Email de Contact <span className="text-error">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="contact@organizatie.ro"
            className={`${inputClass} ${errors.email ? 'border-error focus:ring-error/20' : ''}`}
          />
          <FieldError name="email" />
        </div>

        <div>
          <label htmlFor="domain" className={labelClass}>
            Domeniu de Activitate <span className="text-error">*</span>
          </label>
          <select
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className={`${inputClass} ${errors.domain ? 'border-error focus:ring-error/20' : ''}`}
          >
            <option value="">Selectează domeniul</option>
            {DOMAINS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <FieldError name="domain" />
        </div>
      </div>
    </div>
  );

  // --------------- Step 2: Organization Details ---------------
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-text">Detalii despre organizația ta</h2>
        <p className="text-text-light text-sm mt-1">
          Completează informațiile necesare pentru verificarea organizației
        </p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 lg:p-8">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="founder" className={labelClass}>
              <Users className="w-4 h-4 inline mr-1.5 text-text-lighter" />
              Fondator / Manager <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="founder"
              name="founder"
              value={formData.founder}
              onChange={handleChange}
              placeholder="Nume complet"
              className={`${inputClass} ${errors.founder ? 'border-error focus:ring-error/20' : ''}`}
            />
            <FieldError name="founder" />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              <Phone className="w-4 h-4 inline mr-1.5 text-text-lighter" />
              Telefon <span className="text-error">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="07XX XXX XXX"
              className={`${inputClass} ${errors.phone ? 'border-error focus:ring-error/20' : ''}`}
            />
            <FieldError name="phone" />
          </div>

          <div>
            <label htmlFor="website" className={labelClass}>
              <Globe className="w-4 h-4 inline mr-1.5 text-text-lighter" />
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://www.exemplu.ro"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="city" className={labelClass}>
              <MapPin className="w-4 h-4 inline mr-1.5 text-text-lighter" />
              Oraș <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ex: București"
              className={`${inputClass} ${errors.city ? 'border-error focus:ring-error/20' : ''}`}
            />
            <FieldError name="city" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address" className={labelClass}>
              <MapPin className="w-4 h-4 inline mr-1.5 text-text-lighter" />
              Adresă <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Strada, număr, sector/județ"
              className={`${inputClass} ${errors.address ? 'border-error focus:ring-error/20' : ''}`}
            />
            <FieldError name="address" />
          </div>

          <div>
            <label htmlFor="yearFounded" className={labelClass}>
              <Calendar className="w-4 h-4 inline mr-1.5 text-text-lighter" />
              Anul Înființării <span className="text-error">*</span>
            </label>
            <input
              type="number"
              id="yearFounded"
              name="yearFounded"
              value={formData.yearFounded}
              onChange={handleChange}
              min={1990}
              max={2026}
              placeholder="Ex: 2015"
              className={`${inputClass} ${errors.yearFounded ? 'border-error focus:ring-error/20' : ''}`}
            />
            <FieldError name="yearFounded" />
          </div>

          <div>
            <label htmlFor="totalEmployees" className={labelClass}>
              Total Angajați <span className="text-error">*</span>
            </label>
            <input
              type="number"
              id="totalEmployees"
              name="totalEmployees"
              value={formData.totalEmployees}
              onChange={handleChange}
              min={1}
              placeholder="Ex: 50"
              className={`${inputClass} ${errors.totalEmployees ? 'border-error focus:ring-error/20' : ''}`}
            />
            <FieldError name="totalEmployees" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="employeesWithDisabilities" className={labelClass}>
              Angajați cu Dizabilități <span className="text-error">*</span>
            </label>
            <input
              type="number"
              id="employeesWithDisabilities"
              name="employeesWithDisabilities"
              value={formData.employeesWithDisabilities}
              onChange={handleChange}
              min={1}
              placeholder="Ex: 20"
              className={`${inputClass} ${errors.employeesWithDisabilities ? 'border-error focus:ring-error/20' : ''}`}
            />
            <FieldError name="employeesWithDisabilities" />
          </div>
        </div>
      </div>
    </div>
  );

  // --------------- Step 3: Profile & Description ---------------
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-text">Completează profilul</h2>
        <p className="text-text-light text-sm mt-1">
          Aceste informații vor fi afișate pe pagina organizației tale
        </p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 lg:p-8 space-y-5">
        <div>
          <label htmlFor="services" className={labelClass}>
            Servicii Oferite <span className="text-error">*</span>
          </label>
          <textarea
            id="services"
            name="services"
            rows={3}
            value={formData.services}
            onChange={handleChange}
            placeholder="Descrie serviciile oferite, separate prin virgulă (ex: curățenie industrială, ambalare produse, digitizare documente)"
            className={`${inputClass} resize-none ${errors.services ? 'border-error focus:ring-error/20' : ''}`}
          />
          <FieldError name="services" />
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Descrierea Organizației <span className="text-error">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrie pe scurt organizația, misiunea și activitățile principale. Această descriere va fi vizibilă pe pagina profilului."
            className={`${inputClass} resize-none ${errors.description ? 'border-error focus:ring-error/20' : ''}`}
          />
          <FieldError name="description" />
        </div>

        {/* Logo upload area (visual only) */}
        <div>
          <label className={labelClass}>Logo Organizație</label>
          <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="w-14 h-14 bg-primary-light/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-light/20 transition-colors">
              <Upload className="w-7 h-7 text-primary-light" aria-hidden="true" />
            </div>
            <p className="text-sm font-medium text-text">
              Trage fișierul aici sau click pentru upload
            </p>
            <p className="text-xs text-text-lighter mt-1">PNG, JPG, SVG - max 2MB</p>
          </div>
        </div>
      </div>
    </div>
  );

  // --------------- Step 4: Finalization ---------------
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-text">Ultimul pas</h2>
        <p className="text-text-light text-sm mt-1">
          Verifică informațiile și confirmă înscrierea
        </p>
      </div>

      {/* Summary card */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-sm font-bold text-text mb-4 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-secondary" aria-hidden="true" />
          Sumar Înregistrare
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: 'Organizație', value: formData.orgName },
            { label: 'Email', value: formData.email },
            { label: 'Oraș', value: formData.city },
            { label: 'Domeniu', value: formData.domain },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-3 py-2.5 bg-surface rounded-lg"
            >
              <span className="text-xs text-text-lighter font-medium min-w-[80px]">
                {item.label}:
              </span>
              <span className="text-sm text-text font-medium truncate">
                {item.value || '—'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Checkboxes */}
      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="hasAuthorization"
            checked={formData.hasAuthorization}
            onChange={handleChange}
            className="mt-0.5 w-5 h-5 rounded border-border text-primary focus:ring-primary shrink-0"
          />
          <span className="text-sm text-text-light leading-relaxed">
            Confirm că organizația deține autorizație de funcționare ca unitate protejată,
            emisă conform legislației în vigoare. <span className="text-error">*</span>
          </span>
        </label>
        {errors.hasAuthorization && (
          <p className="text-error text-xs ml-8">{errors.hasAuthorization}</p>
        )}

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="mt-0.5 w-5 h-5 rounded border-border text-primary focus:ring-primary shrink-0"
          />
          <span className="text-sm text-text-light leading-relaxed">
            Accept{' '}
            <a href="/termeni" className="text-primary-light hover:underline font-medium">
              termenii și condițiile
            </a>{' '}
            platformei UPA Hub. <span className="text-error">*</span>
          </span>
        </label>
        {errors.agreeTerms && <p className="text-error text-xs ml-8">{errors.agreeTerms}</p>}

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="agreePrivacy"
            checked={formData.agreePrivacy}
            onChange={handleChange}
            className="mt-0.5 w-5 h-5 rounded border-border text-primary focus:ring-primary shrink-0"
          />
          <span className="text-sm text-text-light leading-relaxed">
            Sunt de acord cu prelucrarea datelor conform{' '}
            <a
              href="/politica-confidentialitate"
              className="text-primary-light hover:underline font-medium"
            >
              Politicii de Confidențialitate
            </a>
            . <span className="text-error">*</span>
          </span>
        </label>
        {errors.agreePrivacy && <p className="text-error text-xs ml-8">{errors.agreePrivacy}</p>}
      </div>
    </div>
  );

  const steps = [renderStep1, renderStep2, renderStep3, renderStep4];

  return (
    <section className="bg-surface min-h-screen pb-16">
      {/* Progress bar */}
      <ProgressBar currentStep={currentStep} />

      {/* Step content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {steps[currentStep]()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-between">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-xl text-text font-semibold bg-white hover:bg-surface-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Înapoi
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={goNext}
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3 text-white font-semibold rounded-xl w-full sm:w-auto"
            >
              Continuă
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3 text-white font-semibold rounded-xl w-full sm:w-auto"
            >
              <Shield className="w-5 h-5" aria-hidden="true" />
              Trimite Cererea de Înscriere
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
