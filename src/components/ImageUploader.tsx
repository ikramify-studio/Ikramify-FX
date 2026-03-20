import React from 'react';
import { Camera, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (base64: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onImageSelect(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-8 rounded-3xl border-2 border-dashed border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all group">
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">Transform Your Photos</h3>
      <p className="text-zinc-400 text-center mb-8 text-sm">Select a photo from your gallery or take a new one to apply AI magic.</p>
      
      <div className="flex gap-4 w-full">
        <label className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl cursor-pointer transition-colors border border-white/5">
          <ImageIcon className="w-5 h-5" />
          <span className="font-medium">Gallery</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
        
        <label className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl cursor-pointer transition-colors border border-white/5">
          <Camera className="w-5 h-5" />
          <span className="font-medium">Camera</span>
          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
};
