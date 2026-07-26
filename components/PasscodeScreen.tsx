'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Heart, Delete, RotateCcw } from 'lucide-react';
import { ScreenProps } from '@/types';

export default function PasscodeScreen({ onNext, triggerConfetti }: ScreenProps) {
  const [passcode, setPasscode] = useState('');
  const [isError, setIsError] = useState(false);
  const CORRECT_PIN = '1234';

  const handleKeyClick = (val: string) => {
    if (passcode.length < 4) {
      const newPin = passcode + val;
      setPasscode(newPin);

      if (newPin.length === 4) {
        if (newPin === CORRECT_PIN) {
          triggerConfetti?.();
          setTimeout(() => onNext('prompt'), 400);
        } else {
          // Trigger shake animation & clear after wrong attempt
          setIsError(true);
          setTimeout(() => {
            setPasscode('');
            setIsError(false);
          }, 600);
        }
      }
    }
  };

  const handleBackspace = () => {
    if (passcode.length > 0) {
      setPasscode((prev) => prev.slice(0, -1));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-sky-100 flex flex-col md:flex-row gap-8 items-center max-w-lg w-full"
    >
      {/* Avatar / Photo Section */}
      <div className="relative group shrink-0">
        <div className="w-40 h-40 rounded-full p-1.5 bg-gradient-to-tr from-sky-400 via-blue-400 to-indigo-300 shadow-lg">
          <img
            src="/cat-photo.jpg"
            alt="Aesthetic preview"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

      </div>

      {/* Keypad Section */}
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center gap-1.5 mb-3 text-sky-500 font-semibold text-xs tracking-wider uppercase">
          <Lock className="w-3.5 h-3.5" />
          <span>ပါ့စဝါထည့်ပါပေပီ</span>
        </div>

        {/* PIN Indicators with Shake Animation on Error */}
        <motion.div
          animate={isError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex gap-3 mb-6"
        >
          {[0, 1, 2, 3].map((idx) => (
            <motion.div
              key={idx}
              animate={{ scale: passcode[idx] ? 1.05 : 1 }}
              className={`w-9 h-11 border-2 rounded-xl flex items-center justify-center font-bold text-lg transition-all shadow-inner ${
                isError
                  ? 'border-rose-400 bg-rose-50 text-rose-500'
                  : passcode[idx]
                  ? 'border-sky-400 bg-sky-50 text-sky-500 shadow-sky-100'
                  : 'border-slate-200 bg-white/90 text-transparent'
              }`}
            >
              {passcode[idx] ? '♥' : ''}
            </motion.div>
          ))}
        </motion.div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[200px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyClick(num)}
              className="w-14 h-14 bg-white/90 text-slate-700 font-bold text-lg rounded-2xl shadow-xs hover:bg-sky-400 hover:text-white transition active:scale-90 border border-slate-100 flex items-center justify-center cursor-pointer"
            >
              {num}
            </button>
          ))}

          {/* Clear / Reset Button */}
          <button
            onClick={() => setPasscode('')}
            className="w-14 h-14 bg-slate-100 text-slate-400 font-semibold text-xs rounded-2xl hover:bg-rose-100 hover:text-rose-500 transition active:scale-90 flex items-center justify-center cursor-pointer"
            title="Clear all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Zero Button */}
          <button
            onClick={() => handleKeyClick('0')}
            className="w-14 h-14 bg-white/90 text-slate-700 font-bold text-lg rounded-2xl shadow-xs hover:bg-sky-400 hover:text-white transition active:scale-90 border border-slate-100 flex items-center justify-center cursor-pointer"
          >
            0
          </button>

          {/* Backspace Button */}
          <button
            onClick={handleBackspace}
            className="w-14 h-14 bg-slate-100 text-slate-400 font-semibold text-xs rounded-2xl hover:bg-slate-200 hover:text-slate-600 transition active:scale-90 flex items-center justify-center cursor-pointer"
            title="Backspace"
          >
            <Delete className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}