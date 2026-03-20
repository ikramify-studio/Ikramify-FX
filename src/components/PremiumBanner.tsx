import React from 'react';
import { Crown, X } from 'lucide-react';
import { motion } from 'motion/react';

interface PremiumBannerProps {
  isPremium: boolean;
  onUpgrade: () => void;
}

export const PremiumBanner: React.FC<PremiumBannerProps> = ({ isPremium, onUpgrade }) => {
  if (isPremium) return null;

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-6 right-6 z-40"
    >
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-[1px] rounded-2xl shadow-2xl shadow-amber-500/20">
        <div className="bg-zinc-900 rounded-[15px] p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Crown className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Unlock Premium FX</h4>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider">HD Export • No Watermark • More Styles</p>
            </div>
          </div>
          
          <button 
            onClick={onUpgrade}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-xl transition-colors"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};
