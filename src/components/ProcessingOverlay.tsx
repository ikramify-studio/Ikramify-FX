import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface ProcessingOverlayProps {
  isVisible: boolean;
}

export const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-pulse" />
            </div>
          </div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-2xl font-bold text-white tracking-tight"
          >
            Applying AI Magic
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-zinc-400 text-sm max-w-[200px] text-center"
          >
            Our neural networks are sketching your masterpiece...
          </motion.p>
          
          <div className="mt-12 w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
