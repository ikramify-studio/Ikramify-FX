/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Share2, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Info,
  ChevronLeft
} from 'lucide-react';

import { AppState, TransformationStyle } from './types';
import { compressImage, addWatermark, downloadImage, shareImage } from './utils/imageUtils';
import { transformImage } from './services/aiService';

import { SplashScreen } from './components/SplashScreen';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { ComparisonSlider } from './components/ComparisonSlider';
import { ProcessingOverlay } from './components/ProcessingOverlay';
import { PremiumBanner } from './components/PremiumBanner';

export default function App() {
  const [state, setState] = useState<AppState>({
    originalImage: null,
    processedImage: null,
    isProcessing: false,
    selectedStyle: null,
    isPremium: false,
    showSplash: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, showSplash: false }));
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleImageSelect = async (base64: string) => {
    const compressed = await compressImage(base64);
    setState(prev => ({ ...prev, originalImage: compressed, processedImage: null, selectedStyle: null }));
  };

  const handleStyleSelect = async (style: TransformationStyle) => {
    if (!state.originalImage) return;
    
    setState(prev => ({ ...prev, selectedStyle: style, isProcessing: true }));
    
    try {
      let result = await transformImage(state.originalImage, style);
      
      if (!state.isPremium) {
        result = await addWatermark(result, "IkramiFy FX");
      }
      
      setState(prev => ({ ...prev, processedImage: result, isProcessing: false }));
    } catch (error) {
      console.error(error);
      setState(prev => ({ ...prev, isProcessing: false }));
      alert("Failed to process image. Please try again.");
    }
  };

  const handleReset = () => {
    setState(prev => ({ ...prev, originalImage: null, processedImage: null, selectedStyle: null }));
  };

  const handleDownload = () => {
    if (state.processedImage) {
      downloadImage(state.processedImage, `ikramify-fx-${state.selectedStyle}.jpg`);
    }
  };

  const handleShare = () => {
    if (state.processedImage) {
      shareImage(state.processedImage, `ikramify-fx-${state.selectedStyle}.jpg`);
    }
  };

  const togglePremium = () => {
    setState(prev => ({ ...prev, isPremium: !prev.isPremium }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-indigo-500/30">
      <SplashScreen isVisible={state.showSplash} />
      <ProcessingOverlay isVisible={state.isProcessing} />
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {state.originalImage && (
            <button 
              onClick={handleReset}
              className="p-2 hover:bg-zinc-900 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight">IkramiFy <span className="text-indigo-500">FX</span></h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {state.isPremium && (
            <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
              <CheckCircle2 className="w-3 h-3" />
              Premium
            </div>
          )}
          <button className="p-2 text-zinc-500 hover:text-white transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 pb-32">
        <AnimatePresence mode="wait">
          {!state.originalImage ? (
            <motion.div
              key="uploader"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center"
            >
              <ImageUploader onImageSelect={handleImageSelect} />
              
              <div className="mt-12 grid grid-cols-2 gap-4 w-full">
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Pencil Sketch</h4>
                  <p className="text-sm text-zinc-400">Realistic graphite shading and edge detection.</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Neon Glow</h4>
                  <p className="text-sm text-zinc-400">Cyberpunk lighting with vibrant glowing edges.</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="editor"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              {/* Image Preview / Comparison */}
              <div className="w-full">
                {state.processedImage ? (
                  <ComparisonSlider before={state.originalImage} after={state.processedImage} />
                ) : (
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <img 
                      src={state.originalImage} 
                      alt="Original" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-white">
                        Original Preview
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {state.processedImage ? (
                  <>
                    <button 
                      onClick={handleDownload}
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-colors shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </button>
                    <button 
                      onClick={handleShare}
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-zinc-800 text-white font-bold rounded-2xl hover:bg-zinc-700 transition-colors border border-white/5"
                    >
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                  </>
                ) : (
                  <div className="w-full p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-indigo-500 shrink-0" />
                    <p className="text-sm text-indigo-200">Select a style below to start the transformation.</p>
                  </div>
                )}
              </div>

              {/* Style Selector */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Choose Style</h3>
                  {state.processedImage && (
                    <button 
                      onClick={() => setState(prev => ({ ...prev, processedImage: null, selectedStyle: null }))}
                      className="text-xs text-indigo-500 hover:text-indigo-400 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Style
                    </button>
                  )}
                </div>
                <StyleSelector 
                  selected={state.selectedStyle} 
                  onSelect={handleStyleSelect}
                  disabled={state.isProcessing}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <PremiumBanner isPremium={state.isPremium} onUpgrade={togglePremium} />
      
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[300px] h-[300px] bg-emerald-600/10 blur-[100px] -z-10 pointer-events-none" />
    </div>
  );
}
