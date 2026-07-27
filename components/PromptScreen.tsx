'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScreenProps } from '@/types';

export default function PromptScreen({ onNext, triggerConfetti }: ScreenProps) {
  const [showWarning, setShowWarning] = useState(false);

  const handleNoClick = () => {
    setShowWarning(true);
    // Hide warning after 3 seconds
    setTimeout(() => setShowWarning(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center bg-white/85 backdrop-blur-md p-8 rounded-3xl shadow-xl max-w-sm w-full border border-blue-100 flex flex-col items-center relative overflow-hidden"
    >
     

      <p className="text-blue-400 font-medium text-sm tracking-wide mb-1">အသဲတုန်းလေးရေ✨</p>
      <h1 className="text-2xl font-bold text-blue-600 mb-6">လက်ဆောင်လေးတေကြည့်ဖို့ ရယ်ဒီပဲလား?</h1>
      
       <motion.div 
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-36 h-36 mb-4 rounded-2xl overflow-hidden flex items-center justify-center"
      >
        <video autoPlay loop muted playsInline className="w-full h-full object-contain pointer-events-none">
          <source src="/cute-cat.webm" type="video/webm" />
        </video>
      </motion.div>

      {/* Dynamic Smooth Message Alert */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            className="mb-4 text-xs font-semibold text-blue-600 bg-blue-100/80 px-4 py-2 rounded-xl border border-blue-200"
          >
            နိုးဆိုထုလိုက်မယ်နော် 😒
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={() => {
            triggerConfetti?.();
            onNext('menu');
          }}
          className="w-full bg-linear-to-r from-blue-400 to-blue-500 text-white py-3 rounded-2xl font-semibold shadow-md shadow-blue-200 hover:scale-102 active:scale-98 transition"
        >
          ကြည့်မယ်
        </button>
        
        <button
          onClick={handleNoClick}
          className="w-full bg-blue-50 text-blue-400 py-3 rounded-2xl font-semibold hover:bg-blue-100 transition text-sm active:scale-95"
        >
          နိုးပါ
        </button>
      </div>
    </motion.div>
  );
}