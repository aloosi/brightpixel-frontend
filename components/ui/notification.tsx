// components/notification.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export function Notification({ message, show, onClose }: {
  message: string;
  show: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="flex items-center gap-3 bg-emerald-600/90 backdrop-blur text-white px-4 py-3 rounded-lg shadow-lg border border-emerald-700">
        <CheckCircle2 className="w-5 h-5" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </motion.div>
  );
}