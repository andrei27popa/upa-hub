'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ addToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const styles = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const iconStyles = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  warning: 'text-amber-500',
  info: 'text-blue-500',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none" aria-live="polite">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = icons[toast.type];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg max-w-sm ${styles[toast.type]}`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${iconStyles[toast.type]}`} aria-hidden="true" />
                <p className="text-sm font-medium flex-1">{toast.message}</p>
                <button onClick={() => removeToast(toast.id)} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity" aria-label="Închide">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
