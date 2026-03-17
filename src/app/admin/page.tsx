'use client';

import { useState, useMemo } from 'react';
import {
  Shield, Building2, Wrench, Users, CheckCircle2, Clock,
  XCircle, Eye, Plus, Search, BarChart3, Menu, X, Bell,
  Settings, LayoutDashboard, FileText, Edit, Flag, Ban,
  Trash2, AlertTriangle, ChevronDown, Filter, MoreHorizontal, LogOut,
} from 'lucide-react';
import { protectedUnits, allAccessibilityTools } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'overview' | 'units' | 'requests' | 'tools' | 'users' | 'analytics' | 'settings';
type UnitStatus = 'active' | 'banned' | 'flagged' | 'pending';
type StatusFilter = 'all' | 'active' | 'banned' | 'flagged' | 'pending';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel: string;
  danger?: boolean;
}

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmLabel, danger }: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${danger ? 'bg-red-100' : 'bg-amber-100'}`}>
                <AlertTriangle className={`w-7 h-7 ${danger ? 'text-red-600' : 'text-amber-600'}`} />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{title}</h3>
              <p className="text-text-light text-sm mb-6">{message}</p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-border text-text-light text-sm font-medium rounded-lg hover:bg-surface transition-colors"
                >
                  Anulează
                </button>
                <button
                  onClick={() => { onConfirm(); onClose(); }}
                  className={`flex-1 px-4 py-2.5 text-white text-sm font-medium rounded-lg transition-colors ${
                    danger ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const pendingRequests = [
  { id: 'r1', name: 'GreenCare Services', city: 'Constanța', domain: 'Servicii curățenie', date: '2026-03-10', email: 'contact@greencare.ro', description: 'Unitate protejată specializată în servicii de curățenie ecologică pentru birouri și spații comerciale.' },
  { id: 'r2', name: 'TechInclude', city: 'Cluj-Napoca', domain: 'IT & Digital', date: '2026-03-12', email: 'office@techinclude.ro', description: 'Startup social axat pe dezvoltarea de aplicații mobile accesibile pentru persoanele cu dizabilități.' },
  { id: 'r3', name: 'ArtWork Social', city: 'Brașov', domain: 'Artizanat', date: '2026-03-14', email: 'hello@artworksocial.ro', description: 'Atelier de ceramică și pictură condus de o echipă mixtă, producând obiecte decorative unice.' },
  { id: 'r4', name: 'EcoPack Solutions', city: 'Timișoara', domain: 'Ambalare', date: '2026-03-15', email: 'info@ecopack.ro', description: 'Unitate specializată în ambalaje biodegradabile și sustenabile pentru industria alimentară.' },
  { id: 'r5', name: 'DigitalBridge Hub', city: 'Iași', domain: 'IT & Digital', date: '2026-03-16', email: 'contact@digitalbridge.ro', description: 'Centru de digitalizare a documentelor și arhivare electronică pentru instituții publice.' },
];

const recentActivity = [
  { action: 'Unitate aprobată', detail: 'WebAccess Studio a fost verificată', time: 'Acum 2 ore', type: 'success' as const },
  { action: 'Cerere nouă primită', detail: 'DigitalBridge Hub - Iași', time: 'Acum 4 ore', type: 'info' as const },
  { action: 'Unitate flagged', detail: 'PackSocial - raport incomplet', time: 'Ieri, 18:30', type: 'warning' as const },
  { action: 'Cerere respinsă', detail: 'QuickFix SRL - documentație invalidă', time: 'Ieri, 14:00', type: 'error' as const },
  { action: 'Tool adăugat', detail: 'ARIA Landmark Checker', time: 'Acum 2 zile', type: 'info' as const },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Unit management state
  const [unitStatuses, setUnitStatuses] = useState<Record<string, UnitStatus>>(() => {
    const initial: Record<string, UnitStatus> = {};
    protectedUnits.forEach((u) => {
      initial[u.id] = u.verified ? 'active' : 'pending';
    });
    return initial;
  });
  const [unitSearch, setUnitSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedUnits, setSelectedUnits] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(false);

  // Modal state
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; title: string; message: string; confirmLabel: string; danger: boolean; onConfirm: () => void }>({
    isOpen: false, title: '', message: '', confirmLabel: '', danger: false, onConfirm: () => {},
  });

  // Request state
  const [requestStatuses, setRequestStatuses] = useState<Record<string, 'pending' | 'approved' | 'rejected'>>(() => {
    const initial: Record<string, 'pending' | 'approved' | 'rejected'> = {};
    pendingRequests.forEach((r) => { initial[r.id] = 'pending'; });
    return initial;
  });

  const filteredUnits = useMemo(() => {
    return protectedUnits.filter((unit) => {
      const status = unitStatuses[unit.id] || 'active';
      const matchesSearch = unitSearch === '' ||
        unit.name.toLowerCase().includes(unitSearch.toLowerCase()) ||
        unit.city.toLowerCase().includes(unitSearch.toLowerCase()) ||
        unit.domain.toLowerCase().includes(unitSearch.toLowerCase());
      const matchesFilter = statusFilter === 'all' || status === statusFilter;
      return matchesSearch && matchesFilter;
    });
  }, [unitSearch, statusFilter, unitStatuses]);

  const pendingRequestCount = Object.values(requestStatuses).filter((s) => s === 'pending').length;

  const getStatusBadge = (status: UnitStatus) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full"><CheckCircle2 className="w-3 h-3" /> Activă</span>;
      case 'banned':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full"><Ban className="w-3 h-3" /> Banned</span>;
      case 'flagged':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full"><Flag className="w-3 h-3" /> Flagged</span>;
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full"><Clock className="w-3 h-3" /> În verificare</span>;
    }
  };

  const toggleFlag = (id: string) => {
    setUnitStatuses((prev) => ({
      ...prev,
      [id]: prev[id] === 'flagged' ? 'active' : 'flagged',
    }));
  };

  const toggleBan = (id: string) => {
    setUnitStatuses((prev) => ({
      ...prev,
      [id]: prev[id] === 'banned' ? 'active' : 'banned',
    }));
  };

  const deleteUnit = (id: string) => {
    setUnitStatuses((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setSelectedUnits((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const toggleSelectUnit = (id: string) => {
    setSelectedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedUnits.size === filteredUnits.length) {
      setSelectedUnits(new Set());
    } else {
      setSelectedUnits(new Set(filteredUnits.map((u) => u.id)));
    }
  };

  const bulkFlag = () => {
    setUnitStatuses((prev) => {
      const next = { ...prev };
      selectedUnits.forEach((id) => { next[id] = 'flagged'; });
      return next;
    });
    setSelectedUnits(new Set());
  };

  const bulkBan = () => {
    setUnitStatuses((prev) => {
      const next = { ...prev };
      selectedUnits.forEach((id) => { next[id] = 'banned'; });
      return next;
    });
    setSelectedUnits(new Set());
  };

  const bulkDelete = () => {
    setUnitStatuses((prev) => {
      const next = { ...prev };
      selectedUnits.forEach((id) => { delete next[id]; });
      return next;
    });
    setSelectedUnits(new Set());
  };

  const openConfirm = (title: string, message: string, confirmLabel: string, danger: boolean, onConfirm: () => void) => {
    setConfirmModal({ isOpen: true, title, message, confirmLabel, danger, onConfirm });
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 60%, #1e293b 100%)' }}>
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)' }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 border border-white/20"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold text-text">UPA Hub Admin</h1>
            <p className="text-text-light text-sm mt-1">Panou de administrare</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (password === 'admin') {
              setIsAuthenticated(true);
              setPasswordError(false);
            } else {
              setPasswordError(true);
            }
          }}>
            <label className="block text-sm font-medium text-text mb-1.5">Parolă</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
              placeholder="Introdu parola"
              className={`w-full px-4 py-3 border rounded-xl text-sm mb-1 focus:outline-none focus:ring-2 transition-colors ${
                passwordError ? 'border-red-400 focus:ring-red-200 focus:border-red-400' : 'border-border focus:ring-primary/20 focus:border-primary'
              }`}
              aria-label="Parolă administrator"
            />
            {passwordError && (
              <p className="text-red-500 text-xs mb-3">Parolă incorectă. Încearcă din nou.</p>
            )}
            {!passwordError && <div className="mb-3" />}
            <button type="submit" className="w-full py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
              Autentificare
            </button>
            <p className="text-xs text-text-lighter text-center mt-4">Demo: parola = &ldquo;admin&rdquo;</p>
          </form>
        </motion.div>
      </section>
    );
  }

  const sidebarItems: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'units', label: 'Unități Protejate', icon: Building2 },
    { id: 'requests', label: 'Cereri Înscriere', icon: FileText, badge: pendingRequestCount },
    { id: 'tools', label: 'Tool-uri', icon: Wrench },
    { id: 'users', label: 'Utilizatori', icon: Users },
    { id: 'analytics', label: 'Analiză', icon: BarChart3 },
    { id: 'settings', label: 'Setări', icon: Settings },
  ];

  const statusFilterLabels: Record<StatusFilter, string> = {
    all: 'Toate',
    active: 'Active',
    banned: 'Banned',
    flagged: 'Flagged',
    pending: 'În așteptare',
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmLabel={confirmModal.confirmLabel}
        danger={confirmModal.danger}
      />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold">UPA Hub</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Admin Panel</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-slate-700/50">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Deconectare
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-text hidden sm:block">
              {sidebarItems.find((i) => i.id === activeTab)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5" />
              {pendingRequestCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
            <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {/* ======================== DASHBOARD ======================== */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Unități Active', value: Object.values(unitStatuses).filter((s) => s === 'active').length, icon: Building2, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+2 luna aceasta' },
                  { label: 'Cereri Noi', value: pendingRequestCount, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50', trend: `${pendingRequestCount} în așteptare` },
                  { label: 'Vizitatori Luna', value: '2.450', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12.5% vs. luna trecută' },
                  { label: 'Rata Conversie', value: '12.3%', icon: BarChart3, color: 'text-violet-600', bg: 'bg-violet-50', trend: '+2.1% vs. luna trecută' },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} aria-hidden="true" />
                      </div>
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-2xl font-bold text-text">{stat.value}</p>
                    <p className="text-text-lighter text-xs mt-0.5">{stat.label}</p>
                    <p className="text-xs text-emerald-600 mt-2">{stat.trend}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-semibold text-text mb-4">Activitate Recentă</h3>
                  <div className="space-y-3">
                    {recentActivity.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          item.type === 'success' ? 'bg-emerald-500' :
                          item.type === 'warning' ? 'bg-amber-500' :
                          item.type === 'error' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text">{item.action}</p>
                          <p className="text-xs text-text-lighter truncate">{item.detail}</p>
                        </div>
                        <span className="text-[11px] text-text-lighter whitespace-nowrap">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-semibold text-text mb-4">Acțiuni Rapide</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Adaugă unitate', icon: Plus, color: 'text-emerald-600', bg: 'hover:bg-emerald-50', action: () => setActiveTab('units') },
                      { label: 'Verifică cereri', icon: FileText, color: 'text-amber-600', bg: 'hover:bg-amber-50', action: () => setActiveTab('requests') },
                      { label: 'Adaugă tool', icon: Wrench, color: 'text-blue-600', bg: 'hover:bg-blue-50', action: () => setActiveTab('tools') },
                      { label: 'Vezi rapoarte', icon: BarChart3, color: 'text-violet-600', bg: 'hover:bg-violet-50', action: () => setActiveTab('analytics') },
                    ].map((action) => (
                      <button
                        key={action.label}
                        onClick={action.action}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 ${action.bg} transition-colors text-center`}
                      >
                        <action.icon className={`w-6 h-6 ${action.color}`} aria-hidden="true" />
                        <span className="text-sm font-medium text-text">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================== UNITS ======================== */}
          {activeTab === 'units' && (
            <div>
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                  <input
                    type="search"
                    value={unitSearch}
                    onChange={(e) => setUnitSearch(e.target.value)}
                    placeholder="Caută unități după nume, oraș sau domeniu..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    aria-label="Caută unități protejate"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-text hover:bg-slate-50 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    {statusFilterLabels[statusFilter]}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {filterOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 min-w-[160px]">
                      {(Object.keys(statusFilterLabels) as StatusFilter[]).map((key) => (
                        <button
                          key={key}
                          onClick={() => { setStatusFilter(key); setFilterOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                            statusFilter === key ? 'text-primary font-medium bg-primary/5' : 'text-text'
                          }`}
                        >
                          {statusFilterLabels[key]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors">
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  Adaugă Unitate
                </button>
              </div>

              {/* Bulk Actions Bar */}
              <AnimatePresence>
                {selectedUnits.size > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-xl">
                      <span className="text-sm font-medium">{selectedUnits.size} selectate</span>
                      <div className="flex-1" />
                      <button onClick={() => openConfirm('Flag unități', `Ești sigur că vrei să marchezi ${selectedUnits.size} unități ca flagged?`, 'Flag Toate', false, bulkFlag)} className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded-lg transition-colors">
                        Flag Toate
                      </button>
                      <button onClick={() => openConfirm('Ban unități', `Ești sigur că vrei să interzici ${selectedUnits.size} unități?`, 'Ban Toate', true, bulkBan)} className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-colors">
                        Ban Toate
                      </button>
                      <button onClick={() => openConfirm('Șterge unități', `Ești sigur că vrei să ștergi ${selectedUnits.size} unități? Această acțiune este ireversibilă.`, 'Șterge Toate', true, bulkDelete)} className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-medium rounded-lg transition-colors">
                        Șterge Toate
                      </button>
                      <button onClick={() => setSelectedUnits(new Set())} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hidden md:block">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="w-10 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedUnits.size === filteredUnits.length && filteredUnits.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded border-slate-300 text-primary focus:ring-primary/20"
                          aria-label="Selectează toate"
                        />
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Nume</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Oraș</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden lg:table-cell">Domeniu</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden lg:table-cell">Angajați</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden xl:table-cell">Scor Impact</th>
                      <th className="text-right px-4 py-3 font-semibold text-slate-600">Acțiuni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUnits.filter((u) => unitStatuses[u.id] !== undefined).map((unit) => {
                      const status = unitStatuses[unit.id] || 'active';
                      return (
                        <tr key={unit.id} className={`hover:bg-slate-50 transition-colors ${status === 'banned' ? 'opacity-60' : ''}`}>
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={selectedUnits.has(unit.id)}
                              onChange={() => toggleSelectUnit(unit.id)}
                              className="rounded border-slate-300 text-primary focus:ring-primary/20"
                              aria-label={`Selectează ${unit.name}`}
                            />
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-text">{unit.name}</p>
                            <p className="text-xs text-text-lighter">{unit.email}</p>
                          </td>
                          <td className="px-4 py-3 text-text-light">{unit.city}</td>
                          <td className="px-4 py-3 text-text-light hidden lg:table-cell">{unit.domain}</td>
                          <td className="px-4 py-3 text-text-light hidden lg:table-cell">{unit.totalEmployees}</td>
                          <td className="px-4 py-3">{getStatusBadge(status)}</td>
                          <td className="px-4 py-3 hidden xl:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-slate-100 rounded-full max-w-[80px]">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${unit.socialImpactScore}%` }} />
                              </div>
                              <span className="text-xs font-semibold text-text">{unit.socialImpactScore}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => alert(`Detalii pentru: ${unit.name}\nOraș: ${unit.city}\nDomeniu: ${unit.domain}\nAngajați: ${unit.totalEmployees}\nScor Impact: ${unit.socialImpactScore}`)}
                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Vizualizează"
                                aria-label={`Vizualizează ${unit.name}`}
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => alert(`Editare: ${unit.name} (funcționalitate în dezvoltare)`)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                title="Editează"
                                aria-label={`Editează ${unit.name}`}
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => toggleFlag(unit.id)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  status === 'flagged' ? 'text-amber-600 bg-amber-50 hover:bg-amber-100' : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
                                }`}
                                title={status === 'flagged' ? 'Unflag' : 'Flag'}
                                aria-label={`${status === 'flagged' ? 'Unflag' : 'Flag'} ${unit.name}`}
                              >
                                <Flag className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openConfirm(
                                  status === 'banned' ? 'Unban unitate' : 'Ban unitate',
                                  status === 'banned'
                                    ? `Ești sigur că vrei să deblochezi "${unit.name}"?`
                                    : `Ești sigur că vrei să interzici "${unit.name}"? Unitatea nu va mai fi vizibilă public.`,
                                  status === 'banned' ? 'Unban' : 'Ban',
                                  status !== 'banned',
                                  () => toggleBan(unit.id)
                                )}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  status === 'banned' ? 'text-red-600 bg-red-50 hover:bg-red-100' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                                }`}
                                title={status === 'banned' ? 'Unban' : 'Ban'}
                                aria-label={`${status === 'banned' ? 'Unban' : 'Ban'} ${unit.name}`}
                              >
                                <Ban className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openConfirm(
                                  'Șterge unitate',
                                  `Ești sigur că vrei să ștergi "${unit.name}"? Această acțiune este ireversibilă.`,
                                  'Șterge',
                                  true,
                                  () => deleteUnit(unit.id)
                                )}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Șterge"
                                aria-label={`Șterge ${unit.name}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredUnits.filter((u) => unitStatuses[u.id] !== undefined).length === 0 && (
                  <div className="text-center py-12 text-text-lighter">
                    <Building2 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Nicio unitate găsită</p>
                  </div>
                )}
              </div>

              {/* Mobile Cards */}
              <div className="space-y-3 md:hidden">
                {filteredUnits.filter((u) => unitStatuses[u.id] !== undefined).map((unit) => {
                  const status = unitStatuses[unit.id] || 'active';
                  return (
                    <div key={unit.id} className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm ${status === 'banned' ? 'opacity-60' : ''}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedUnits.has(unit.id)}
                            onChange={() => toggleSelectUnit(unit.id)}
                            className="rounded border-slate-300 text-primary focus:ring-primary/20"
                          />
                          <div>
                            <p className="font-semibold text-text">{unit.name}</p>
                            <p className="text-xs text-text-lighter">{unit.city} &middot; {unit.domain}</p>
                          </div>
                        </div>
                        {getStatusBadge(status)}
                      </div>
                      <div className="flex items-center justify-between text-xs text-text-lighter mb-3">
                        <span>{unit.totalEmployees} angajați</span>
                        <span>Scor Impact: {unit.socialImpactScore}</span>
                      </div>
                      <div className="flex items-center gap-1 border-t border-slate-100 pt-3">
                        <button onClick={() => alert(`Detalii: ${unit.name}`)} className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-3.5 h-3.5" /> Vizualizează
                        </button>
                        <button onClick={() => toggleFlag(unit.id)} className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                          <Flag className="w-3.5 h-3.5" /> {status === 'flagged' ? 'Unflag' : 'Flag'}
                        </button>
                        <button
                          onClick={() => openConfirm(status === 'banned' ? 'Unban' : 'Ban', `Ești sigur pentru "${unit.name}"?`, status === 'banned' ? 'Unban' : 'Ban', status !== 'banned', () => toggleBan(unit.id))}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Ban className="w-3.5 h-3.5" /> {status === 'banned' ? 'Unban' : 'Ban'}
                        </button>
                        <button
                          onClick={() => openConfirm('Șterge', `Ștergi "${unit.name}"? Ireversibil.`, 'Șterge', true, () => deleteUnit(unit.id))}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Șterge
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 text-sm text-text-lighter text-center">
                {filteredUnits.filter((u) => unitStatuses[u.id] !== undefined).length} din {protectedUnits.length} unități afișate
              </div>
            </div>
          )}

          {/* ======================== REQUESTS ======================== */}
          {activeTab === 'requests' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-text">Cereri de Înscriere</h2>
                  <p className="text-sm text-text-lighter mt-1">{pendingRequestCount} cereri în așteptare</p>
                </div>
              </div>
              <div className="space-y-4">
                {pendingRequests.map((req) => {
                  const status = requestStatuses[req.id];
                  return (
                    <motion.div
                      key={req.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-white p-6 rounded-xl border shadow-sm transition-all ${
                        status === 'approved' ? 'border-emerald-200 bg-emerald-50/30' :
                        status === 'rejected' ? 'border-red-200 bg-red-50/30 opacity-60' :
                        'border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-text text-lg">{req.name}</h3>
                            {status === 'approved' && (
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">Aprobată</span>
                            )}
                            {status === 'rejected' && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">Respinsă</span>
                            )}
                            {status === 'pending' && (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">În așteptare</span>
                            )}
                          </div>
                          <p className="text-sm text-text-light mt-1">{req.city} &middot; {req.domain}</p>
                          <p className="text-xs text-text-lighter mt-0.5">Trimisă pe {req.date} &middot; {req.email}</p>
                        </div>
                      </div>
                      <p className="text-sm text-text-light mb-4 line-clamp-2">{req.description}</p>
                      {status === 'pending' && (
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => {
                              setRequestStatuses((prev) => ({ ...prev, [req.id]: 'approved' }));
                              alert(`Cererea de la "${req.name}" a fost aprobată cu succes!`);
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                            Aprobă
                          </button>
                          <button
                            onClick={() => alert(`Detalii complete:\n\nNume: ${req.name}\nOraș: ${req.city}\nDomeniu: ${req.domain}\nEmail: ${req.email}\nData: ${req.date}\n\nDescriere: ${req.description}`)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <Eye className="w-4 h-4" aria-hidden="true" />
                            Detalii
                          </button>
                          <button
                            onClick={() => openConfirm(
                              'Respinge cererea',
                              `Ești sigur că vrei să respingi cererea de la "${req.name}"?`,
                              'Respinge',
                              true,
                              () => setRequestStatuses((prev) => ({ ...prev, [req.id]: 'rejected' }))
                            )}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <XCircle className="w-4 h-4" aria-hidden="true" />
                            Respinge
                          </button>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================== TOOLS ======================== */}
          {activeTab === 'tools' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-text">Gestionare Tool-uri</h2>
                  <p className="text-sm text-text-lighter mt-1">{allAccessibilityTools.length} tool-uri disponibile</p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors">
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  Adaugă Tool
                </button>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Titlu</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden sm:table-cell">Categorie</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden md:table-cell">Dificultate</th>
                      <th className="text-right px-4 py-3 font-semibold text-slate-600">Acțiuni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {allAccessibilityTools.map((tool) => (
                      <tr key={tool.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium text-text">{tool.title}</p>
                          <p className="text-xs text-text-lighter truncate max-w-xs hidden sm:block">{tool.description.slice(0, 80)}...</p>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">{tool.category}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                            tool.difficulty === 'Începător' ? 'bg-emerald-50 text-emerald-700' :
                            tool.difficulty === 'Intermediar' ? 'bg-amber-50 text-amber-700' :
                            'bg-red-50 text-red-700'
                          }`}>{tool.difficulty}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Vizualizează">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Editează">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Șterge">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================== USERS ======================== */}
          {activeTab === 'users' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-slate-400" />
              </div>
              <h2 className="text-xl font-bold text-text mb-2">Gestionare Utilizatori</h2>
              <p className="text-text-lighter text-sm max-w-md">
                Modulul de gestionare a utilizatorilor este în curs de dezvoltare. Vei putea gestiona conturile, rolurile și permisiunile utilizatorilor din această secțiune.
              </p>
            </div>
          )}

          {/* ======================== ANALYTICS ======================== */}
          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-xl font-bold text-text mb-6">Analiză & Rapoarte</h2>

              {/* Monthly Traffic Chart */}
              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-semibold text-text mb-4">Vizitatori Lunari</h3>
                  <div className="flex items-end gap-2 h-48">
                    {[
                      { month: 'Sep', value: 850 },
                      { month: 'Oct', value: 1200 },
                      { month: 'Nov', value: 1450 },
                      { month: 'Dec', value: 980 },
                      { month: 'Ian', value: 1680 },
                      { month: 'Feb', value: 2100 },
                      { month: 'Mar', value: 2450 },
                    ].map((m) => (
                      <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs font-bold text-primary">{m.value}</span>
                        <div className="w-full bg-gradient-to-t from-primary to-blue-400 rounded-t-lg transition-all" style={{ height: `${(m.value / 2500) * 100}%` }} />
                        <span className="text-xs text-text-lighter">{m.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-semibold text-text mb-4">Distribuție pe Regiuni</h3>
                  <div className="space-y-3">
                    {[
                      { region: 'București', count: 4, pct: 33 },
                      { region: 'Cluj', count: 3, pct: 25 },
                      { region: 'Timiș', count: 2, pct: 17 },
                      { region: 'Brașov', count: 2, pct: 17 },
                      { region: 'Alte regiuni', count: 1, pct: 8 },
                    ].map((r) => (
                      <div key={r.region}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-text font-medium">{r.region}</span>
                          <span className="text-text-lighter">{r.count} unități ({r.pct}%)</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: `${r.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-semibold text-text mb-4">Top Domenii</h3>
                  <div className="space-y-3">
                    {[
                      { domain: 'IT & Digital', count: 3, color: 'bg-blue-500' },
                      { domain: 'Servicii curățenie', count: 2, color: 'bg-emerald-500' },
                      { domain: 'Ambalare', count: 2, color: 'bg-amber-500' },
                      { domain: 'Reciclare', count: 1, color: 'bg-violet-500' },
                      { domain: 'Artizanat', count: 1, color: 'bg-rose-500' },
                    ].map((d) => (
                      <div key={d.domain} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${d.color}`} />
                        <span className="text-sm text-text flex-1">{d.domain}</span>
                        <span className="text-sm font-bold text-text">{d.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-semibold text-text mb-4">Engagement Tool-uri</h3>
                  <div className="space-y-3">
                    {[
                      { tool: 'Contrast Checker', uses: 342 },
                      { tool: 'Checklist Web', uses: 278 },
                      { tool: 'Font Tester', uses: 189 },
                      { tool: 'Heading Checker', uses: 145 },
                    ].map((t) => (
                      <div key={t.tool} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <span className="text-sm text-text">{t.tool}</span>
                        <span className="text-sm font-bold text-violet-600">{t.uses} utilizări</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-semibold text-text mb-4">Metrici Cheie</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Rata conversie contacte', value: '12.3%', trend: '+2.1%', positive: true },
                      { label: 'Timp mediu pe site', value: '4:32', trend: '+0:45', positive: true },
                      { label: 'Bounce rate', value: '34%', trend: '-5%', positive: true },
                      { label: 'Pagini/sesiune', value: '3.8', trend: '+0.4', positive: true },
                    ].map((m) => (
                      <div key={m.label} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-text font-medium">{m.label}</p>
                          <p className="text-lg font-bold text-text">{m.value}</p>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${m.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                          {m.trend}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================== SETTINGS ======================== */}
          {activeTab === 'settings' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                <Settings className="w-8 h-8 text-slate-400" />
              </div>
              <h2 className="text-xl font-bold text-text mb-2">Setări</h2>
              <p className="text-text-lighter text-sm max-w-md">
                Secțiunea de setări este în curs de dezvoltare. Vei putea configura notificările, preferințele de afișare și setările generale ale panoului de administrare.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
