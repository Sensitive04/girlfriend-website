'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Cake, Mail, ChevronRight } from 'lucide-react';
import { ScreenProps } from '@/types';

export default function MenuScreen({ onNext }: ScreenProps) {
  const menuItems = [
    {
      id: 'cake' as const,
      title: 'Birthday Cake',
      subtitle: 'Make a wish & blow candles',
      icon: '🎂',
      badge: 'Sweet Treat ✨',
      gradient: 'from-amber-50 to-pink-50',
      borderColor: 'border-pink-200/60',
      iconBg: 'bg-pink-100',
    },
    {
      id: 'envelope' as const,
      title: 'Special Letter',
      subtitle: 'A message written for you',
      icon: '💌',
      badge: 'For You 💖',
      gradient: 'from-sky-50 to-indigo-50',
      borderColor: 'border-sky-200/60',
      iconBg: 'bg-sky-100',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-md w-full border border-pink-100 flex flex-col items-center relative overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />

      {/* Header Section */}
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
        <span className="text-xs font-semibold tracking-wider text-pink-400 uppercase">
          Surprise Hub
        </span>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">တစ်ခုရွေးပြီးနှိပ်ပါ</h2>
      <p className="text-gray-400 text-xs mb-8 text-center">
        Choose a gift to open below ✨
      </p>

      {/* Interactive Options List */}
      <div className="flex flex-col gap-4 w-full">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNext(item.id)}
            className={`relative w-full p-5 rounded-2xl bg-linear-to-r ${item.gradient} border ${item.borderColor} shadow-sm hover:shadow-md transition-all text-left flex items-center justify-between group overflow-hidden`}
          >
            <div className="flex items-center gap-4 z-10">
              {/* Emoji / Icon Container */}
              <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>

              {/* Title & Subtitle */}
              <div>
                <span className="text-[10px] font-bold text-pink-500 bg-white/80 px-2 py-0.5 rounded-full border border-pink-100 inline-block mb-1">
                  {item.badge}
                </span>
                <h3 className="font-bold text-gray-800 text-base group-hover:text-pink-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 font-normal">
                  {item.subtitle}
                </p>
              </div>
            </div>

            {/* Arrow Indicator */}
            <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all z-10 shadow-xs">
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer Decoration */}
      <div className="mt-8 flex items-center gap-1.5 text-xs text-pink-300">
        <Heart className="w-3.5 h-3.5 fill-current animate-bounce" />
        <span>Made with love</span>
      </div>
    </motion.div>
  );
}