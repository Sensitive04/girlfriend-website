'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronLeft, Send } from 'lucide-react';
import { ScreenProps } from '@/types';

export default function LetterScreen({ onNext }: ScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-md w-full border border-sky-100 flex flex-col items-center relative overflow-hidden"
    >
      {/* Background Soft Ambient Glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-indigo-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Header Accent */}
      <div className="flex items-center gap-1.5 mb-1 z-10">
        <Sparkles className="w-4 h-4 text-sky-500 animate-pulse" />
        <span className="text-xs font-semibold tracking-wider text-sky-500 uppercase">
          Special Letter 💌
        </span>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-6 z-10">A Note For You ✨</h2>

      {/* Scrollable Letter Card */}
      <div className="w-full bg-gradient-to-b from-sky-50/60 to-white p-6 rounded-2xl border border-sky-100 shadow-inner max-h-[340px] overflow-y-auto mb-6 z-10 text-left custom-scrollbar">
        <p className="text-xs text-sky-600 font-semibold mb-3">Dear Yamone,</p>
        
        <p className="text-slate-600 text-xs leading-relaxed mb-4">
          Happy Birthday! I wanted to make something special just for you to remind you how much you mean to me. Every moment we share is amazing, and your smile always brightens up my day.
        </p>

        <p className="text-slate-600 text-xs leading-relaxed mb-4">
          Thank you for being such an incredible person, for all the laughter, and for all the wonderful memories we keep making together. 
        </p>

        <p className="text-slate-600 text-xs leading-relaxed mb-6">
          Wishing you a year filled with endless happiness, success, and all your favorite things. Let's make this year unforgettable!
        </p>

        <div className="pt-2 border-t border-sky-100/80 flex items-center justify-between text-xs text-slate-500">
          <span className="italic">With all my love ❤️</span>
          <Heart className="w-4 h-4 text-rose-500 fill-current animate-bounce" />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-3 w-full z-10">
        <button
          onClick={() => onNext('menu')}
          className="w-full bg-slate-100 text-slate-600 py-3 rounded-2xl font-semibold text-xs hover:bg-slate-200 transition flex items-center justify-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Surprise Hub သို့ ပြန်သွားရန်</span>
        </button>
      </div>
    </motion.div>
  );
}