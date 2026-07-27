'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ChevronLeft, Heart, Sparkles } from 'lucide-react';
import { ScreenProps } from '@/types';

export default function EnvelopeScreen({ onNext }: ScreenProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white/85 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-sky-100 flex flex-col items-center text-center relative overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-200/40 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-200/30 rounded-full blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-1.5 mb-1">
        <Sparkles className="w-4 h-4 text-sky-500 animate-pulse" />
        <span className="text-xs font-semibold tracking-wider text-sky-500 uppercase">
          စာအိတ်လေး
        </span>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">ဘေဘီ့အတွက်ပါခည💌</h2>
      <p className="text-slate-400 text-xs mb-8">
        {!isOpen ? 'အသည်းလေးကိုထိပြီးဖွင့်ပါခဗျာ' : 'စာဖတ်မယ်ဆို စာလေးကိုထိပါ 💌'}
      </p>

      {/* Interactive Envelope Container */}
      <div className="relative my-4 w-full flex items-center justify-center h-52 select-none">
        
        {/* The Envelope Base */}
        <div className="relative w-64 h-40 bg-gradient-to-b from-sky-50 to-sky-100 rounded-2xl shadow-lg border border-sky-200/80 flex items-center justify-center overflow-visible">
          
          {/* Top Flap (Animated opening) */}
          <motion.div
            animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
            className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-sky-200 via-sky-100 to-sky-50 rounded-t-2xl border-t border-sky-300/60 shadow-xs flex items-center justify-center"
          >
            {/* Triangular Flap Fold Lines */}
            <div className="w-0 h-0 border-l-[128px] border-r-[128px] border-t-[80px] border-l-transparent border-r-transparent border-t-sky-200/50 absolute top-0" />
          </motion.div>

          {/* Letter Card inside (Slides Up when open) */}
          <motion.div
            initial={{ y: 0 }}
            animate={isOpen ? { y: -50, scale: 1.05 } : { y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
            onClick={() => isOpen && onNext('letter')}
            className={`absolute z-10 w-56 h-32 bg-white rounded-xl shadow-md border border-slate-100 p-4 flex flex-col items-center justify-between transition-all ${
              isOpen ? 'cursor-pointer hover:shadow-xl hover:-translate-y-14' : 'pointer-events-none'
            }`}
          >
            <div className="w-full flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>အရေးကြီး</span>
              <Heart className="w-3 h-3 text-pink-400 fill-current" />
            </div>

            <div className="text-xs text-slate-600 font-medium my-auto italic">
              "အချစ်ရဆုံးကောင်မလေးအတွက်..."
            </div>

            <div className="w-full h-1 bg-sky-100 rounded-full" />
          </motion.div>

          {/* Envelope Pocket (Front Pocket covering bottom of letter) */}
          <div className="absolute inset-0 z-20 rounded-2xl border-b border-sky-200/80 pointer-events-none overflow-hidden">
            {/* Diagonal Side Folds */}
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[128px] border-b-[80px] border-l-transparent border-b-sky-100/90" />
            <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[128px] border-b-[80px] border-r-transparent border-b-sky-100/90" />
          </div>

          {/* Red Wax Seal */}
          <AnimatePresence>
            {!isOpen && (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleOpenEnvelope}
                className="absolute z-40 w-12 h-12 bg-gradient-to-tr from-rose-600 to-rose-400 rounded-full shadow-md border-2 border-rose-300 flex items-center justify-center cursor-pointer top-14"
              >
                <Heart className="w-6 h-6 text-white fill-current drop-shadow-xs" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 w-full mt-6">
        {isOpen ? (
          <button
            onClick={() => onNext('letter')}
            className="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white py-3.5 rounded-2xl font-semibold text-xs shadow-md shadow-sky-200 hover:brightness-105 transition flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>စာဖတ်မယ် 💌</span>
          </button>
        ) : (
          <button
            onClick={handleOpenEnvelope}
            className="w-full bg-sky-50 text-sky-600 border border-sky-200 py-3.5 rounded-2xl font-semibold text-xs hover:bg-sky-100 transition"
          >
            စာအိတ်ဖွင့်မယ်✨
          </button>
        )}

        <button
          onClick={() => onNext('menu')}
          className="w-full bg-slate-100 text-slate-600 py-3 rounded-2xl font-semibold text-xs hover:bg-slate-200 transition flex items-center justify-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>နောက်သို့</span>
        </button>
      </div>
    </motion.div>
  );
}