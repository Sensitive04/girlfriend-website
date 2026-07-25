'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Heart } from 'lucide-react';
import { ScreenProps } from '@/types';

export default function PasscodeScreen({ onNext, triggerConfetti }: ScreenProps) {
  const [passcode, setPasscode] = useState('');
  const CORRECT_PIN = '1234';

  const handleKeyClick = (val: string) => {
    if (passcode.length < 4) {
      const newPin = passcode + val;
      setPasscode(newPin);
      if (newPin === CORRECT_PIN) {
        triggerConfetti?.();
        setTimeout(() => onNext('prompt'), 400);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-blue-200/50 flex flex-col md:flex-row gap-8 items-center max-w-lg w-full"
    >
      <div className="relative group">
        <div className="w-44 h-44 rounded-full p-1.5 bg-linear-to-tr from-blue-400 to-sky-300 shadow-md">
          <img
            src="/cat-photo.jpg"
            alt="Aesthetic preview"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute -top-2 -right-2 bg-blue-400 text-white p-2 rounded-full shadow-lg">
          <Heart className="w-4 h-4 fill-current" />
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="flex items-center gap-2 mb-2 text-blue-400 font-semibold text-sm">
          <Lock className="w-4 h-4" />
          <span>ပါ့စဝါထည့်ပါပေပီ</span>
        </div>

        <div className="flex gap-3 mb-6">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="w-8 h-10 border-2 border-blue-300/80 rounded-xl bg-white/80 flex items-center justify-center font-bold text-blue-500 shadow-inner text-lg"
            >
              {passcode[idx] ? '♥' : ''}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyClick(num)}
              className="w-12 h-12 bg-white/90 text-blue-500 font-bold rounded-2xl shadow-sm hover:bg-blue-300 hover:text-white transition active:scale-90 border border-blue-100"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setPasscode('')}
            className="w-12 h-12 bg-blue-100 text-blue-300 font-semibold text-xs rounded-2xl hover:bg-blue-200 transition active:scale-90 flex items-center justify-center"
          >
            Clear
          </button>
        </div>
      </div>
    </motion.div>
  );
}