'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Images, ZoomIn, X } from 'lucide-react';
import { ScreenProps } from '@/types';

// Add as many photos as you want here!
const PHOTOS = [
  {
    id: 1,
    src: '/1.jpg',
    caption: 'ခုထိဘလော့တုန်းပါ✨',
    date: 'Memory #1',
  },
  {
    id: 2,
    src: '/2.jpg', // Replace with your image path (e.g. /photo2.jpg)
    caption: 'အရှင်လတ်လတ်တဲ့🤣 💕',
    date: 'Memory #2',
  },
  {
    id: 3,
    src: '/3.jpg', // Replace with your image path
    caption: 'ခုတော့ဒို့ကကိုကိုပါ 🌸',
    date: 'Memory #3',
  },
  {
    id: 4,
    src: '/4.jpg',
    caption: 'ကလေးမွေးခိုင်းလို့ချိတ်ကောက်တာပါ',
    date: 'Memory #4',
  },
  {
    id: 5,
    src: '/5.jpg',
    caption: 'အပိုင်ဆိုတာအပိုင်ပါ😁',
    date: 'Memory #5',
  },
  {
    id: 6,
    src: '/6.jpg',
    caption: 'သီချင်းဆိုပြပြီးသူ့အပိုင်လုပ်တော့မှာပါ',
    date: 'Memory #6',
  },
  {
    id: 7,
    src: '/7.jpg',
    caption: 'ဟီးဟီး✨',
    date: 'Memory #7',
  },
  {
    id: 8,
    src: '/8.jpg',
    caption: 'ခုတော့အသဲတုန်းလေးပါကွယ်❤️',
    date: 'Memory #8',
  },
  {
    id: 9,
    src: '/9.jpg',
    caption: 'ထပ်နမ်းချင်သေးတယ်တော့✨',
    date: 'Memory #1',
  },
  {
    id: 10,
    src: '/10.jpg', // Replace with your image path (e.g. /photo2.jpg)
    caption: 'ကျောင်းကိုလာ💕',
    date: 'Memory #2',
  },
  {
    id: 11,
    src: '/11.jpg', // Replace with your image path
    caption: 'ကျောင်းကိုထပ်လာ 🌸',
    date: 'Memory #3',
  },
  {
    id: 12,
    src: '/12.jpg',
    caption: 'အာဘွားလေးရ 🚗',
    date: 'Memory #4',
  },
  {
    id: 13,
    src: '/13.jpg',
    caption: 'ကျောင်းကိုထပ်လာနမ်းတာပါကွယ်🍦',
    date: 'Memory #5',
  },
  {
    id: 14,
    src: '/14.jpg',
    caption: 'မုန့်တူတူချား😄',
    date: 'Memory #6',
  },
  {
    id: 15,
    src: '/15.jpg',
    caption: 'ကျောင်းမသွားခင်ဆိုင်ကိုတစ်ခေါက်✨',
    date: 'Memory #7',
  },
];

export default function PhotoGalleryScreen({ onNext }: ScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % PHOTOS.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white/85 backdrop-blur-xl p-5 sm:p-7 rounded-3xl shadow-2xl max-w-md w-full border border-pink-100 flex flex-col items-center relative overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-1.5 mb-1 z-10">
        <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
        <span className="text-xs font-semibold tracking-wider text-pink-500 uppercase">
          Memory Album
        </span>
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-4 z-10 flex items-center gap-2">
        <span>အမှတ်တရပုံလေးတွေပေါ့နော်</span>
        <Images className="w-5 h-5 text-pink-400" />
      </h2>

      {/* Main Polaroid Frame */}
      <div className="relative w-full aspect-4/5 max-w-[260px] mb-4 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotate: 3 }}
            transition={{ duration: 0.25 }}
            className="w-full bg-white p-3 pb-4 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center group relative"
          >
            {/* Image Box */}
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-100 relative mb-2.5">
              <img
                src={PHOTOS[currentIndex].src}
                alt={PHOTOS[currentIndex].caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button
                onClick={() => setSelectedPhoto(PHOTOS[currentIndex].src)}
                className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full backdrop-blur-xs transition cursor-pointer"
                title="View Fullsize"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Caption & Counter */}
            <p className="font-semibold text-slate-700 text-xs text-center line-clamp-1 mb-0.5">
              {PHOTOS[currentIndex].caption}
            </p>
            <span className="text-[10px] text-pink-500 font-mono">
              {PHOTOS[currentIndex].date} ({currentIndex + 1} / {PHOTOS.length})
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls & Mini Navigation Strip */}
      <div className="flex items-center justify-between w-full max-w-[260px] mb-3">
        <button
          onClick={prevPhoto}
          className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition active:scale-90 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-xs font-semibold text-slate-500">
          {currentIndex + 1} of {PHOTOS.length}
        </span>

        <button
          onClick={nextPhoto}
          className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition active:scale-90 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnail Bar (Fast Select) */}
      <div className="flex gap-1.5 overflow-x-auto w-full max-w-[280px] p-1 mb-5 no-scrollbar justify-center">
        {PHOTOS.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => setCurrentIndex(idx)}
            className={`relative shrink-0 w-8 h-8 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
              idx === currentIndex
                ? 'border-pink-500 scale-110 shadow-md ring-2 ring-pink-200'
                : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img src={photo.src} alt="thumb" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-lg w-full max-h-[80vh] flex items-center justify-center"
            >
              <img
                src={selectedPhoto}
                alt="Enlarged preview"
                className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-10 right-0 text-white bg-white/20 p-2 rounded-full hover:bg-white/40 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button */}
      <button
        onClick={() => onNext('menu')}
        className="w-full bg-slate-100 text-slate-600 py-2.5 rounded-2xl font-semibold text-xs hover:bg-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>နောက်သို့</span>
      </button>
    </motion.div>
  );
}