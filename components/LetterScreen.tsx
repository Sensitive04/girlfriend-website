'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ScreenProps } from '@/types';

export default function LetterScreen({ onNext }: ScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full border border-sky-100 relative"
    >
      <div className="absolute top-4 right-4 text-pink-300">
        <Heart className="w-6 h-6 fill-current" />
      </div>

      <h2 className="text-xl font-bold text-sky-800 mb-4">Happy Birthday ပါ...</h2>
      
      <div className="text-gray-700 leading-relaxed text-sm space-y-3 mb-8">
        <p>
          ဒီနေ့မှာ ကျရောက်တဲ့ Babe ရဲ့မွေးနေ့ကစပြီး နောင်နှစ်ပေါင်းများစွာအထိ စိတ်အေးချမ်းသာယာမှုတွေ အပြည့်အဝ ရရှိပါစေလို့ ဆုတောင်းပေးပါတယ်။
        </p>
        <p>
          Babe က အမြဲတမ်း ကိုယ့်ပတ်ဝန်းကျင်ကလူတွေကို စိတ်ချမ်းသာအောင် ထားတတ်သလို၊ Babe ရဲ့ တည်ငြိမ်ပြီး စိတ်သဘောထားကောင်းတဲ့ ပုံစံလေးကလည်း ကိုယ့်အတွက်တော့ အမြဲတမ်း အားဆေးတစ်ခုလိုပါပဲ။
        </p>
      </div>

      <button
        onClick={() => onNext('menu')}
        className="w-full bg-sky-100 text-sky-700 py-3 rounded-2xl font-semibold text-sm hover:bg-sky-200 transition"
      >
        နောက်သို့
      </button>
    </motion.div>
  );
}