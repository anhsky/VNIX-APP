import React from 'react';
import { AppNotification } from '../types';
import { AlertTriangle, Info, AlertOctagon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  notifications: AppNotification[];
  onDismiss: (id: string) => void;
}

export function NotificationBanner({ notifications, onDismiss }: Props) {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center justify-between p-3 rounded-lg border shadow-lg backdrop-blur-md ${
              notif.type === 'critical' ? 'bg-rose-950/80 border-rose-500/50 text-rose-200' :
              notif.type === 'warning' ? 'bg-orange-950/80 border-orange-500/50 text-orange-200' :
              'bg-blue-950/80 border-blue-500/50 text-blue-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {notif.type === 'critical' ? <AlertOctagon className="w-5 h-5 text-rose-400" /> :
               notif.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-orange-400" /> :
               <Info className="w-5 h-5 text-blue-400" />}
              <span className="text-sm font-medium">{notif.message}</span>
            </div>
            <button
              onClick={() => onDismiss(notif.id)}
              className="p-1 hover:bg-white/10 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
