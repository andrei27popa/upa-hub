'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  LogOut,
  User,
  BarChart3,
  Settings,
  Save,
  CheckCircle,
  AlertCircle,
  Trash2,
  ExternalLink,
  Users,
  Heart,
  TrendingUp,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { protectedUnits, domains } from '@/lib/data';
import type { ProtectedUnit } from '@/lib/data';

type Tab = 'profil' | 'statistici' | 'setari';

interface AuthData {
  email: string;
  unitId: string;
  unitName: string;
  loggedIn: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [unit, setUnit] = useState<ProtectedUnit | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('profil');
  const [loading, setLoading] = useState(true);

  // Profile form state
  const [formName, setFormName] = useState('');
  const [formFounder, setFormFounder] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formWebsite, setFormWebsite] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formServices, setFormServices] = useState('');
  const [formDomain, setFormDomain] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Auth check
  useEffect(() => {
    const raw = localStorage.getItem('upa-hub-auth');
    if (!raw) {
      router.push('/autentificare');
      return;
    }
    try {
      const parsed: AuthData = JSON.parse(raw);
      if (!parsed.loggedIn) {
        router.push('/autentificare');
        return;
      }
      setAuthData(parsed);

      const found = protectedUnits.find((u) => u.id === parsed.unitId);
      if (found) {
        setUnit(found);
        setFormName(found.name);
        setFormFounder(found.founder);
        setFormDescription(found.description);
        setFormEmail(found.email);
        setFormPhone(found.phone);
        setFormWebsite(found.website);
        setFormCity(found.city);
        setFormAddress(found.location);
        setFormServices(found.services.join(', '));
        setFormDomain(found.domain);
      }
    } catch {
      router.push('/autentificare');
      return;
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('upa-hub-auth');
    router.push('/autentificare');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (!currentPassword.trim()) {
      setPasswordError('Introdu parola curentă.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Noua parolă trebuie să aibă cel puțin 6 caractere.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Parolele noi nu coincid.');
      return;
    }

    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm) {
      localStorage.removeItem('upa-hub-auth');
      router.push('/');
    } else {
      setDeleteConfirm(true);
      setTimeout(() => setDeleteConfirm(false), 5000);
    }
  };

  if (loading || !unit || !authData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full"
        />
      </div>
    );
  }

  const inclusionRate = Math.round(
    (unit.employeesWithDisabilities / unit.totalEmployees) * 100
  );

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'profil', label: 'Profil', icon: <User className="w-4 h-4" /> },
    { id: 'statistici', label: 'Statistici', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'setari', label: 'Setări Cont', icon: <Settings className="w-4 h-4" /> },
  ];

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-text placeholder:text-text-lighter text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors';

  const tabVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <Shield className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-text leading-tight">{unit.name}</p>
              <p className="text-xs text-text-lighter">Panou de administrare</p>
            </div>
            <p className="sm:hidden text-sm font-bold text-text">{unit.name}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-text-light hover:bg-surface-dark hover:text-error transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Deconectare</span>
          </motion.button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-surface-dark rounded-2xl mb-8 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary'
                  : 'text-text-lighter hover:text-text-light'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-xl shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* =================== PROFIL TAB =================== */}
          {activeTab === 'profil' && (
            <motion.div
              key="profil"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <div className="glass rounded-2xl p-6 sm:p-8 border border-border">
                <h2 className="text-xl font-bold text-text mb-1">Profilul Unității</h2>
                <p className="text-sm text-text-lighter mb-6">
                  Actualizează informațiile afișate public despre unitatea ta protejată.
                </p>

                {/* Success toast */}
                <AnimatePresence>
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 flex items-center gap-2 rounded-xl bg-success/10 border border-success/20 px-4 py-3 text-sm text-success"
                    >
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      Modificările au fost salvate cu succes!
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  {/* Name & Founder */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-light mb-1.5">
                        Numele unității
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="founder" className="block text-sm font-medium text-text-light mb-1.5">
                        Fondator
                      </label>
                      <input
                        id="founder"
                        type="text"
                        value={formFounder}
                        onChange={(e) => setFormFounder(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-text-light mb-1.5">
                      Descriere
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className={`${inputClass} resize-y`}
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="prof-email" className="block text-sm font-medium text-text-light mb-1.5">
                        Email
                      </label>
                      <input
                        id="prof-email"
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text-light mb-1.5">
                        Telefon
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-text-light mb-1.5">
                      Website
                    </label>
                    <input
                      id="website"
                      type="url"
                      value={formWebsite}
                      onChange={(e) => setFormWebsite(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  {/* City & Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-text-light mb-1.5">
                        Oraș
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={formCity}
                        onChange={(e) => setFormCity(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-text-light mb-1.5">
                        Adresă
                      </label>
                      <input
                        id="address"
                        type="text"
                        value={formAddress}
                        onChange={(e) => setFormAddress(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <label htmlFor="services" className="block text-sm font-medium text-text-light mb-1.5">
                      Servicii <span className="text-text-lighter font-normal">(separate prin virgulă)</span>
                    </label>
                    <input
                      id="services"
                      type="text"
                      value={formServices}
                      onChange={(e) => setFormServices(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  {/* Domain */}
                  <div>
                    <label htmlFor="domain" className="block text-sm font-medium text-text-light mb-1.5">
                      Domeniu de activitate
                    </label>
                    <select
                      id="domain"
                      value={formDomain}
                      onChange={(e) => setFormDomain(e.target.value)}
                      className={inputClass}
                    >
                      {domains.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold"
                    >
                      <Save className="w-4 h-4" />
                      Salvează Modificările
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* =================== STATISTICI TAB =================== */}
          {activeTab === 'statistici' && (
            <motion.div
              key="statistici"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl font-bold text-text mb-1">Statistici</h2>
              <p className="text-sm text-text-lighter mb-6">
                Indicatorii cheie ai unității tale protejate.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {/* Total Employees */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="glass rounded-2xl p-5 border border-border card-hover"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-text-light">Total angajați</span>
                  </div>
                  <p className="text-3xl font-bold text-text">{unit.totalEmployees}</p>
                </motion.div>

                {/* Employees with disabilities */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass rounded-2xl p-5 border border-border card-hover"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-text-light">Angajați cu dizabilități</span>
                  </div>
                  <p className="text-3xl font-bold text-text">{unit.employeesWithDisabilities}</p>
                </motion.div>

                {/* Inclusion Rate */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="glass rounded-2xl p-5 border border-border card-hover"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <span className="text-sm font-medium text-text-light">Rată incluziune</span>
                  </div>
                  <p className="text-3xl font-bold text-text">{inclusionRate}%</p>
                </motion.div>

                {/* Social Impact Score */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass rounded-2xl p-5 border border-border card-hover"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-impact/10 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-impact" />
                    </div>
                    <span className="text-sm font-medium text-text-light">Scor impact social</span>
                  </div>
                  <p className="text-3xl font-bold text-text">{unit.socialImpactScore}</p>
                  <div className="mt-3">
                    <div className="w-full h-2 bg-surface-dark rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${unit.socialImpactScore}%` }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                    <p className="text-xs text-text-lighter mt-1">{unit.socialImpactScore}/100</p>
                  </div>
                </motion.div>
              </div>

              {/* Business card link */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl p-6 border border-border"
              >
                <h3 className="text-lg font-semibold text-text mb-2">Carte de Vizită Digitală</h3>
                <p className="text-sm text-text-lighter mb-4">
                  Vizualizează și partajează profilul public al unității tale protejate.
                </p>
                <motion.a
                  href={`/carte-vizita/${unit.id}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
                >
                  <ExternalLink className="w-4 h-4" />
                  Vezi Cartea de Vizită
                </motion.a>
              </motion.div>
            </motion.div>
          )}

          {/* =================== SETARI TAB =================== */}
          {activeTab === 'setari' && (
            <motion.div
              key="setari"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Change Password */}
              <div className="glass rounded-2xl p-6 sm:p-8 border border-border">
                <h2 className="text-xl font-bold text-text mb-1">Schimbă Parola</h2>
                <p className="text-sm text-text-lighter mb-6">
                  Actualizează parola contului tău pentru securitate sporită.
                </p>

                <AnimatePresence>
                  {passwordError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 flex items-center gap-2 rounded-xl bg-error/10 border border-error/20 px-4 py-3 text-sm text-error"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {passwordError}
                    </motion.div>
                  )}
                  {passwordSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 flex items-center gap-2 rounded-xl bg-success/10 border border-success/20 px-4 py-3 text-sm text-success"
                    >
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      Parola a fost schimbată cu succes!
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleChangePassword} className="space-y-5 max-w-md">
                  {/* Current Password */}
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-text-light mb-1.5">
                      Parola curentă
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-lighter" />
                      <input
                        id="currentPassword"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => {
                          setCurrentPassword(e.target.value);
                          setPasswordError('');
                        }}
                        placeholder="********"
                        className={`${inputClass} pl-10 pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-lighter hover:text-text-light transition-colors"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-text-light mb-1.5">
                      Parola nouă
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-lighter" />
                      <input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setPasswordError('');
                        }}
                        placeholder="********"
                        className={`${inputClass} pl-10 pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-lighter hover:text-text-light transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-light mb-1.5">
                      Confirmă parola nouă
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-lighter" />
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setPasswordError('');
                        }}
                        placeholder="********"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold"
                  >
                    <Lock className="w-4 h-4" />
                    Schimbă Parola
                  </motion.button>
                </form>
              </div>

              {/* Danger Zone */}
              <div className="rounded-2xl p-6 sm:p-8 border-2 border-error/20 bg-error/5">
                <h2 className="text-xl font-bold text-error mb-1">Zonă Periculoasă</h2>
                <p className="text-sm text-text-lighter mb-6">
                  Acțiunile din această secțiune sunt ireversibile. Procedează cu atenție.
                </p>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDeleteAccount}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    deleteConfirm
                      ? 'bg-error text-white'
                      : 'bg-error/10 text-error hover:bg-error/20'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  {deleteConfirm ? 'Confirmă ștergerea contului' : 'Șterge Contul'}
                </motion.button>
                {deleteConfirm && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-error mt-2"
                  >
                    Apasă din nou pentru a confirma. Această acțiune este ireversibilă.
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
