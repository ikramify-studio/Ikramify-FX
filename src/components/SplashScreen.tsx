import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SplashScreenProps {
  isVisible: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
            className="relative"
          >
            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            
            {/* Animated rings */}
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-2 border-indigo-500 rounded-[2.5rem]"
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <h1 className="text-4xl font-black text-white tracking-tighter">
              IkramiFy <span className="text-indigo-500">FX</span>
            </h1>
            <p className="text-zinc-500 text-xs uppercase tracking-[0.3em] mt-2">
              Artistic AI Engine
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 flex flex-col items-center"
          >
            <div className="w-48 h-0.5 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-full h-full bg-indigo-500"
              />
            </div>
            <p className="text-zinc-600 text-[10px] mt-4 font-mono">v1.0.0 • IkramiFy Org</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
