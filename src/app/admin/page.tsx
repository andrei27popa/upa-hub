'use client';

import { useState } from 'react';
import {
  Shield, Building2, Wrench, Users, CheckCircle2, Clock,
  XCircle, Eye, Plus, Search, BarChart3,
} from 'lucide-react';
import { protectedUnits, accessibilityTools } from '@/lib/data';

type Tab = 'overview' | 'units' | 'tools' | 'requests';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  if (!isAuthenticated) {
    return (
      <section className="bg-surface min-h-[70vh] flex items-center justify-center py-16">
        <div className="bg-white p-8 rounded-xl border border-border max-w-sm w-full">
          <div className="text-center mb-6">
            <Shield className="w-10 h-10 text-primary mx-auto mb-3" aria-hidden="true" />
            <h1 className="text-xl font-bold text-text">Panou Administrare</h1>
            <p className="text-text-light text-sm mt-1">Introdu parola pentru acces</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (password === 'admin') setIsAuthenticated(true); }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parolă"
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              aria-label="Parolă administrator"
            />
            <button type="submit" className="w-full py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
              Autentificare
            </button>
            <p className="text-xs text-text-lighter text-center mt-3">Demo: parolă = &ldquo;admin&rdquo;</p>
          </form>
        </div>
      </section>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Prezentare generală', icon: BarChart3 },
    { id: 'units', label: 'Unități Protejate', icon: Building2 },
    { id: 'tools', label: 'Tool-uri', icon: Wrench },
    { id: 'requests', label: 'Cereri Înscriere', icon: Clock },
  ];

  const pendingRequests = [
    { id: 'r1', name: 'GreenCare Services', city: 'Constanța', date: '2026-03-10', status: 'pending' },
    { id: 'r2', name: 'TechInclude', city: 'Cluj-Napoca', date: '2026-03-12', status: 'pending' },
    { id: 'r3', name: 'ArtWork Social', city: 'Brașov', date: '2026-03-14', status: 'pending' },
  ];

  return (
    <>
      <section className="bg-primary-dark text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" aria-hidden="true" />
              <h1 className="text-xl font-bold">UPA Hub — Panou Administrare</h1>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm text-blue-200 hover:text-white transition-colors"
            >
              Deconectare
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto border-b border-border" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-light hover:text-text hover:border-border'
              }`}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              <tab.icon className="w-4 h-4" aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Unități Active', value: protectedUnits.length, icon: Building2, color: 'text-primary', bg: 'bg-primary/10' },
                { label: 'Tool-uri Disponibile', value: accessibilityTools.length, icon: Wrench, color: 'text-impact', bg: 'bg-impact/10' },
                { label: 'Cereri Noi', value: pendingRequests.length, icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
                { label: 'Vizitatori Luna', value: '2.450', icon: Users, color: 'text-secondary', bg: 'bg-secondary/10' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-5 rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-text">{stat.value}</p>
                      <p className="text-text-lighter text-xs">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-border">
                <h3 className="font-semibold text-text mb-4">Cereri Recente de Înscriere</h3>
                <div className="space-y-3">
                  {pendingRequests.map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                      <div>
                        <p className="font-medium text-text text-sm">{req.name}</p>
                        <p className="text-text-lighter text-xs">{req.city} — {req.date}</p>
                      </div>
                      <span className="px-2 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full">
                        În așteptare
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-border">
                <h3 className="font-semibold text-text mb-4">Acțiuni Rapide</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Adaugă unitate protejată', icon: Plus, color: 'text-primary' },
                    { label: 'Adaugă tool accesibilitate', icon: Plus, color: 'text-impact' },
                    { label: 'Verifică cereri de înscriere', icon: Eye, color: 'text-warning' },
                    { label: 'Vizualizează rapoarte', icon: BarChart3, color: 'text-secondary' },
                  ].map((action) => (
                    <button key={action.label} className="flex items-center gap-3 w-full p-3 bg-surface rounded-lg hover:bg-surface-dark transition-colors text-left">
                      <action.icon className={`w-5 h-5 ${action.color}`} aria-hidden="true" />
                      <span className="text-sm font-medium text-text">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Units Management */}
        {activeTab === 'units' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-text">Gestionare Unități Protejate</h2>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
                <Plus className="w-4 h-4" aria-hidden="true" />
                Adaugă Unitate
              </button>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-lighter" aria-hidden="true" />
              <input type="search" placeholder="Caută unități..." className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Caută unități protejate" />
            </div>
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-surface">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-text-light">Nume</th>
                    <th className="text-left px-4 py-3 font-medium text-text-light hidden sm:table-cell">Oraș</th>
                    <th className="text-left px-4 py-3 font-medium text-text-light hidden md:table-cell">Domeniu</th>
                    <th className="text-left px-4 py-3 font-medium text-text-light hidden lg:table-cell">Angajați</th>
                    <th className="text-left px-4 py-3 font-medium text-text-light">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-text-light">Acțiuni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {protectedUnits.map((unit) => (
                    <tr key={unit.id} className="hover:bg-surface/50">
                      <td className="px-4 py-3 font-medium text-text">{unit.name}</td>
                      <td className="px-4 py-3 text-text-light hidden sm:table-cell">{unit.city}</td>
                      <td className="px-4 py-3 text-text-light hidden md:table-cell">{unit.domain}</td>
                      <td className="px-4 py-3 text-text-light hidden lg:table-cell">{unit.totalEmployees}</td>
                      <td className="px-4 py-3">
                        {unit.verified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                            <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                            Verificată
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-warning/10 text-warning text-xs font-medium rounded-full">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            În verificare
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="p-1 text-text-lighter hover:text-primary transition-colors" aria-label={`Editează ${unit.name}`}>
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-text-lighter hover:text-error transition-colors" aria-label={`Șterge ${unit.name}`}>
                            <XCircle className="w-4 h-4" />
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

        {/* Tools Management */}
        {activeTab === 'tools' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-text">Gestionare Tool-uri</h2>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-impact text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                <Plus className="w-4 h-4" aria-hidden="true" />
                Adaugă Tool
              </button>
            </div>
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-surface">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-text-light">Titlu</th>
                    <th className="text-left px-4 py-3 font-medium text-text-light hidden sm:table-cell">Categorie</th>
                    <th className="text-left px-4 py-3 font-medium text-text-light hidden md:table-cell">Dificultate</th>
                    <th className="text-left px-4 py-3 font-medium text-text-light">Acțiuni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {accessibilityTools.map((tool) => (
                    <tr key={tool.id} className="hover:bg-surface/50">
                      <td className="px-4 py-3 font-medium text-text">{tool.title}</td>
                      <td className="px-4 py-3 text-text-light hidden sm:table-cell">
                        <span className="px-2 py-0.5 bg-surface text-text-light text-xs rounded-full">{tool.category}</span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          tool.difficulty === 'Începător' ? 'bg-green-100 text-green-700' :
                          tool.difficulty === 'Intermediar' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>{tool.difficulty}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="p-1 text-text-lighter hover:text-primary transition-colors" aria-label={`Editează ${tool.title}`}>
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-text-lighter hover:text-error transition-colors" aria-label={`Șterge ${tool.title}`}>
                            <XCircle className="w-4 h-4" />
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

        {/* Requests */}
        {activeTab === 'requests' && (
          <div>
            <h2 className="text-xl font-bold text-text mb-6">Cereri de Înscriere</h2>
            <div className="space-y-4">
              {pendingRequests.map((req) => (
                <div key={req.id} className="bg-white p-6 rounded-xl border border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-text text-lg">{req.name}</h3>
                      <p className="text-text-light text-sm">{req.city} — Trimisă pe {req.date}</p>
                    </div>
                    <span className="px-3 py-1 bg-warning/10 text-warning text-sm font-medium rounded-full">
                      În așteptare
                    </span>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      Aprobă
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 border border-border text-text-light text-sm font-medium rounded-lg hover:bg-surface transition-colors">
                      <Eye className="w-4 h-4" aria-hidden="true" />
                      Detalii
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 border border-error/30 text-error text-sm font-medium rounded-lg hover:bg-error/5 transition-colors">
                      <XCircle className="w-4 h-4" aria-hidden="true" />
                      Respinge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
