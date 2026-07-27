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
          မွေးနေ့အတွက်💌
        </span>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-6 z-10">ဘေဘီ့အတွက်စာလေး ✨</h2>

      {/* Scrollable Letter Card */}
      <div className="w-full bg-gradient-to-b from-sky-50/60 to-white p-6 rounded-2xl border border-sky-100 shadow-inner max-h-[340px] overflow-y-auto mb-6 z-10 text-left custom-scrollbar">
        <p className="text-xs text-sky-600 font-semibold mb-3">ဘေဘီရေ,</p>
        
        <p className="text-slate-600 text-xs leading-relaxed mb-4">
Happy 22nd birthday ပါဘေဘီခဗျာ❤️💗🎂🎊🎉🥳 အဓိကကတော့ အသက်ဘယ်လောက်ကြီးလာလာ ကိုကို့ကလေးလေးပဲဟုတ်ပြီလား။ နောက်မွေးနေ့တွေတူတူရှိနေနိုင်အောင်ကြိုးစားကြမယ်နော်ဘေဘီ။ မွေးနေ့မှာများကြီးပျော််ရွှင်ရပြီးတော့ ခုမွေးနေ့ကနေစပြီး အလုပ်တေများကြီးလုပ် ပိုက်ဆံတေများကြီးရှာနိုင်ပြီး ကိုကို့သူဌေးမကြီးဖြစ်ပါစေ။   </p>

        <p className="text-slate-600 text-xs leading-relaxed mb-4">
နောက်မွေးနေ့တွေလည်းအမြဲတူတူရှိနေကြမယ်ဟုတ်ပြီလား။ မွေးနေ့လက်ဆောင်တေများကြီးမပေးနိုင်သေးပေမယ့် ဒါလေးတော့ ဘေဘီကြိုက်မယ်လို့မျှော်လင့်ပါတယ်အေ။ သေချာလုပ်ပေးထားတာပါနော်ကိုကိုက။ ဟက်ပီးဘက်ဒေးပါခည ကိုကိုကများကြီးဆက်ချစ်ပြီးတော့ များကြီးပျော်အောင်ထားမယ်ကလေးလေးကို။ ကိုကို့အချစ်တေများကြီးလက်ဆောင်ယူနော် ပေပီက။ </p>

        <p className="text-slate-600 text-xs leading-relaxed mb-6">
 ချာရာငယ်ပါပေပီရေ များကြီးချစ်ပါတယ်ခည ပျော်ရွှင်စရာမွေးနေ့လေးဖြစ်ပါစေခဗျာ။ ကိုကိုရှိတယ်နော်ဟုတ်ပြီလား လပ်ယူ မွမွမွမွမွ❤️💗        </p>

        <div className="pt-2 border-t border-sky-100/80 flex items-center justify-between text-xs text-slate-500">
          <span className="italic">အဘိုးအဘွားဖြစ်တဲ့ထိချစ်မယ် ❤️</span>
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
          <span>ရှေ့ပြန်သွားရန်</span>
        </button>
      </div>
    </motion.div>
  );
}