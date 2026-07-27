'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, Cake, Mail, Disc3, Images } from 'lucide-react';
import { ScreenProps } from '@/types';

export default function MenuScreen({ onNext }: ScreenProps) {
  const menuItems = [
    {
      id: 'cake' as const,
      title: 'မွေးနေ့ကိတ်',
      subtitle: 'ဖယောင်းတိုင်လေးပါမှုတ်ပြီးဆုတောင်းနော်ဘေဘီက',
      icon: <Cake className="w-7 h-7 text-sky-500" />,
      badge: 'ဟီးဟီး 🩵',
      gradient: 'from-sky-50 via-blue-50 to-indigo-50',
      borderColor: 'border-sky-200/80',
      iconBg: 'bg-sky-100/80',
      badgeBg: 'text-sky-600 bg-white/90 border-sky-100',
    },
    {
      id: 'envelope' as const,
      title: 'စာအိတ်လေး',
      subtitle: 'ဘေဘီ့အတွက် သေချာလေးရေးထားတာပေါ့နော်',
      icon: <Mail className="w-7 h-7 text-blue-500" />,
      badge: 'ကလေးလေးအတွက်💙',
      gradient: 'from-blue-50 via-sky-50 to-cyan-50',
      borderColor: 'border-blue-200/80',
      iconBg: 'bg-blue-100/80',
      badgeBg: 'text-blue-600 bg-white/90 border-blue-100',
    },
    {
      id: 'music' as const,
      title: 'ဓာတ်ပြားလေး',
      subtitle: 'ဒါလေးတေအကုန်နားထောင်ရမှာနော်ဘေဘီက',
      icon: <Disc3 className="w-7 h-7 text-indigo-500 animate-spin-slow" />,
      badge: 'ဗဲရီးဂွတ်သီချင်းလေးတွေ🎵',
      gradient: 'from-indigo-50 via-sky-50 to-slate-50',
      borderColor: 'border-indigo-200/80',
      iconBg: 'bg-indigo-100/80',
      badgeBg: 'text-indigo-600 bg-white/90 border-indigo-100',
    },
    {
      id: 'photos' as const,
      title: 'ပုံလေးတွေ',
      subtitle: 'ပုံလေးတွေကတော့ဒီတိုင်းပဲကြည့်ပေါ့နော်',
      icon: <Images className="w-7 h-7 text-pink-500" />,
      badge: 'အမှတ်တရလေးတွေ📸',
      gradient: 'from-pink-50 via-rose-50 to-sky-50',
      borderColor: 'border-pink-200/80',
      iconBg: 'bg-pink-100/80',
      badgeBg: 'text-pink-600 bg-white/90 border-pink-100',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white/85 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-md w-full border border-sky-100 flex flex-col items-center relative overflow-hidden"
    >
      {/* Background Soft Glows */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-200/40 rounded-full blur-2xl pointer-events-none" />

      {/* Header Section */}
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-4 h-4 text-sky-500 animate-pulse" />
        <span className="text-xs font-semibold tracking-wider text-sky-500 uppercase">
          လုံးဝ စပရိုက်
        </span>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-2">တစ်ခုရွေးပါခည</h2>
      <p className="text-slate-400 text-xs mb-8 text-center">
        အောက်ကဟာလေးတေအကုန်ကြည့်ရမှာနော်✨
      </p>

      {/* Interactive Options List */}
      <div className="flex flex-col gap-4 w-full">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext(item.id)}
            className={`relative w-full p-5 rounded-2xl bg-gradient-to-r ${item.gradient} border ${item.borderColor} shadow-xs hover:shadow-md transition-all text-left flex items-center justify-between group overflow-hidden`}
          >
            <div className="flex items-center gap-4 z-10">
              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>

              {/* Title & Subtitle */}
              <div>
                <span className={`text-[10px] font-bold ${item.badgeBg} px-2 py-0.5 rounded-full border inline-block mb-1`}>
                  {item.badge}
                </span>
                <h3 className="font-bold text-slate-800 text-base group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  {item.subtitle}
                </p>
              </div>
            </div>

            {/* Arrow Indicator */}
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-sky-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all z-10 shadow-xs">
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer Decoration */}
      <div className="mt-8 flex items-center gap-1.5 text-xs text-sky-400">
        <Heart className="w-3.5 h-3.5 fill-current animate-bounce" />
        <span>သဲသဲလေးအတွက်</span>
      </div>
    </motion.div>
  );
}