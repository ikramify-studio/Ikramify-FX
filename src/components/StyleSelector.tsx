import React from 'react';
import { TransformationOption, TransformationStyle } from '../types';
import { Pencil, PenTool, Palette, Zap } from 'lucide-react';
import { motion } from 'motion/react';

const OPTIONS: TransformationOption[] = [
  { id: 'pencil', label: 'Pencil', description: 'Classic sketch', icon: 'pencil' },
  { id: 'written', label: 'Written', description: 'Text strokes', icon: 'written' },
  { id: 'cartoon', label: 'Cartoon', description: 'Vibrant art', icon: 'cartoon' },
  { id: 'neon', label: 'Neon', description: 'Glow effect', icon: 'neon' },
];

interface StyleSelectorProps {
  selected: TransformationStyle | null;
  onSelect: (style: TransformationStyle) => void;
  disabled?: boolean;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selected, onSelect, disabled }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'pencil': return <Pencil className="w-6 h-6" />;
      case 'written': return <PenTool className="w-6 h-6" />;
      case 'cartoon': return <Palette className="w-6 h-6" />;
      case 'neon': return <Zap className="w-6 h-6" />;
      default: return null;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {OPTIONS.map((option) => (
        <motion.button
          key={option.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(option.id)}
          disabled={disabled}
          className={`
            relative flex flex-col items-center p-4 rounded-2xl border transition-all
            ${selected === option.id 
              ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
              : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <div className={`
            w-12 h-12 rounded-xl flex items-center justify-center mb-3
            ${selected === option.id ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-400'}
          `}>
            {getIcon(option.id)}
          </div>
          <span className={`text-sm font-semibold ${selected === option.id ? 'text-white' : 'text-zinc-300'}`}>
            {option.label}
          </span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-tighter mt-1">
            {option.description}
          </span>
          
          {selected === option.id && (
            <motion.div 
              layoutId="active-style"
              className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full border-2 border-black"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};
