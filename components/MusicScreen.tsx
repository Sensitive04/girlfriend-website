'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, ChevronLeft, Volume2, Sparkles, Heart } from 'lucide-react';
import { ScreenProps } from '@/types';

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  note: string;
}

const TRACKS: Track[] = [
  { id: 1, title: 'Always', artist: 'Special Track', src: '/audio/always.m4a', note: 'ဘေဘီ့နားမှာနေရတာနွေးထွေးတယ် အမြဲတူတူရှိနေကြမယ် 💕' },
  { id: 2, title: 'Anyone', artist: 'Special Track', src: '/audio/anyone.mp3', note: 'ဘေဘီကလွဲရင်မျက်လုံးထဲမထည့်တော့ဘူး ကို့နားမှာပဲနေနော် ✨' },
  { id: 3, title: 'A thousand years', artist: 'Special Track', src: '/audio/aty.mp3', note: 'အတူရှိရဖို့အနှစ်တစ်ထောင်ဆိုလည်းကြိုးစားမယ်🌸' },
  { id: 4, title: 'Ayothrsone sate ku', artist: 'Special Track', src: '/audio/ayothr.m4a', note: 'ဘေဘီ့နားမှာနေချင်တာ အရိုးသားဆုံးစိတ်ကူးပဲ💖' },
  { id: 5, title: 'Beautiful in White', artist: 'Special Track', src: '/audio/biw.mp3', note: 'ဘေဘီ့ကို ကိုယ့်ရဲ့သတို့သမီးလေးအဖြစ် အဖြူရောင်ဂါဝန်လေးနဲ့မြင်ချင်ပြီ🌈' },
  { id: 6, title: 'Blue', artist: 'Special Track', src: '/audio/blue.m4a', note: 'ဘေဘီကကိုယ့်ဘဝကိုအရောင်အသွေးစုံစေတယ် အေးချမ်းတယ်🌙' },
  { id: 7, title: 'Enchanted', artist: 'Special Track', src: '/audio/e.mp3', note: 'ဘေဘီနဲ့တွေ့ရတာကို့အတွက်ကံ‌အကောင်းဆုံးပဲနော် 💞' },
  { id: 8, title: 'It will Rain', artist: 'Special Track', src: '/audio/iwr.mp3', note: 'ဘေဘီ့နားမှာကပ်မနေရရင် ကို့ရင်ထဲမှာမိုးတွေအုံ့တယ်ပေါ့နော်🌷' },
  { id: 9, title: 'Its you', artist: 'Special Track', src: '/audio/iysyou.mp3', note: 'ကိုယ့်ရဲ့ရွေးချယ်မှုကအမြဲတမ်းဘေဘီပဲ ❤️' },
  { id: 10, title: 'Just the way you are', artist: 'Special Track', src: '/audio/jtwur.mp3', note: 'ဘေဘီကဘေဘီ့ပုံစံလေးအတိုင်းအမြဲလှတယ် ချစ်တယ် အလှဆုံးကောင်မလေး🎶' },
  { id: 11, title: 'Marry you', artist: 'Special Track', src: '/audio/mu.mp3', note: 'လက်ထပ်ကြစို့မိန်းမရေ✨' },
  { id: 12, title: 'Make you mine', artist: 'Special Track', src: '/audio/mym.mp3', note: 'ဘေဘီ့ကိုကို့အပိုင်လေးလုပ်လိုက်ပြီဟီးဟီး ☀️' },
  { id: 13, title: 'Nothin gon change my love 4 you', artist: 'Special Track', src: '/audio/ngcmlfy.mp3', note: 'ဘာတွေပဲဖြစ်လာလာဘေဘီ့ကိုအမြဲချစ်နေမယ်ဟုတ်ပြီလား👑' },
  { id: 14, title: 'Nothing gon stop us now', artist: 'Special Track', src: '/audio/ngsun.mp3', note: 'ကိုတို့သာတူတူကြိုးစားကြရင်ဘာတွေဖြစ်လာလာရင်ဆိုင်နိုင်တယ် 🏡' },
  { id: 15, title: 'Perfect', artist: 'Special Track', src: '/audio/perfect.m4a', note: 'ဘေဘီ့ကကို့အတွက်ပါဖက်ပဲ အများကြီးချစ်တယ်💖' },
  { id: 16, title: 'Photograph', artist: 'Special Track', src: '/audio/Photograph.mp3', note: 'ဘေဘီ့ပုံလေးတွေကြိုက်လို့ပေါ့နော်ဟဲဟဲ 📸' },
  { id: 17, title: 'Rewrite the stars', artist: 'Special Track', src: '/audio/rts.mp3', note: 'ဘေဘီနဲ့တူတူရှိရဖို့အတွက်ကြယ်တွေကိုပါပြန်စီပစ်မယ် ကံတရားတွေပြောင်းပြန်လှန်ပစ်မယ်🎧' },
  { id: 18, title: 'Say u wont let go', artist: 'Special Track', src: '/audio/sywlg.m4a', note: 'ကို့နားမှာပဲနေနော်ကလေးလေးက။ များကြီးချစ်ပေးမှာကိုက❤️‍🔥' },
  { id: 19, title: 'TEN thousand years', artist: 'Special Track', src: '/audio/ten.mp3', note: 'ဘေဘီအချစ်ကိုရဖို့နှစ်ပေါင်းတစ်သောင်းလည်းကြိုးစားမယ်ဟီးဟီး 🌟' },
  { id: 20, title: 'Until I found you', artist: 'Special Track', src: '/audio/uify.m4a', note: 'ဘေဘီနဲ့မတွေ့ခင်ထိကို့ဘဝမှာတစ်ခုခုလိုနေပြီးတော့ဘေဘီကို့အပိုင်လေးဖြစ်လာတော့အကုန်ပါဖက်ဖြစ်သွားတယ်ခည 🥰' },
];

export default function MusicScreen({ onNext }: ScreenProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(0);
    setDuration(0);

    if (isPlaying) {
      audio.load();
      audio.play().catch((err) => {
        console.log('Playback error:', err);
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((err) => console.log('Playback error:', err));
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
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

      {/* Optimized Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="none"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={playNext}
      />

      {/* Header */}
      <div className="w-full flex items-center justify-between mb-2 z-10">
        <button
          onClick={() => onNext('menu')}
          className="p-2 rounded-full bg-slate-100/80 text-slate-600 hover:bg-pink-100 hover:text-pink-600 transition active:scale-90 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-pink-500 uppercase">
            Music Player
          </span>
        </div>
        <div className="w-9" />
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-3 z-10 flex items-center gap-2">
        <span>သီချင်းများ</span>
        <Volume2 className="w-5 h-5 text-pink-400" />
      </h2>

      {/* --- RECORD PLAYER COMPONENT --- */}
      <div className="relative w-52 h-52 mb-3 bg-slate-900 rounded-3xl p-3 shadow-2xl border-4 border-slate-800 flex items-center justify-center overflow-hidden z-10">
        {/* Record Deck Texture */}
        <div className="absolute inset-0 bg-radial from-slate-800 to-slate-950 opacity-90" />

        {/* Spinning Vinyl Record */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'linear',
          }}
          className="relative w-44 h-44 rounded-full bg-slate-950 border-4 border-slate-800 shadow-xl flex items-center justify-center"
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-2 rounded-full border border-slate-800/80" />
          <div className="absolute inset-5 rounded-full border border-slate-800/60" />
          <div className="absolute inset-8 rounded-full border border-slate-800/40" />

          {/* Record Center Label */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-400 via-rose-300 to-indigo-300 border-2 border-white/80 shadow-md flex items-center justify-center relative">
            <Heart className="w-6 h-6 text-white fill-white" />
            <div className="absolute w-3 h-3 bg-slate-900 rounded-full border border-slate-700" />
          </div>
        </motion.div>

        {/* Tonearm / Needle */}
        <motion.div
          animate={{ rotate: isPlaying ? 22 : 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute top-2 right-4 w-12 h-20 origin-top-right pointer-events-none z-20"
        >
          {/* Tonearm Base */}
          <div className="absolute top-0 right-0 w-6 h-6 bg-slate-400 rounded-full border-2 border-slate-200 shadow-md" />
          {/* Arm Bar */}
          <div className="absolute top-3 right-2.5 w-1.5 h-16 bg-slate-300 rounded-full shadow-sm" />
          {/* Cartridge/Needle Head */}
          <div className="absolute bottom-0 right-1 w-3.5 h-5 bg-pink-500 rounded-xs shadow-sm" />
        </motion.div>
      </div>

      {/* Song Info */}
      <h3 className="text-base font-bold text-slate-800 text-center line-clamp-1 mb-0.5 z-10">
        {currentTrack.title}
      </h3>
      <span className="text-[11px] text-slate-400 mb-2 font-medium z-10">
        {currentTrack.artist} ({currentTrackIndex + 1} of {TRACKS.length})
      </span>

      {/* Special Note Banner */}
      <motion.div
        key={currentTrack.id}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[280px] bg-pink-50/90 border border-pink-200/80 rounded-xl p-2 mb-3 text-center z-10 shadow-xs"
      >
        <p className="text-xs text-pink-700 font-medium italic flex items-center justify-center gap-1">
          <span>“{currentTrack.note}”</span>
        </p>
      </motion.div>

      {/* Scrubber / Progress Bar */}
      <div className="w-full max-w-[280px] mb-3 z-10">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mb-4 z-10">
        <button
          onClick={playPrev}
          className="p-2.5 text-slate-600 hover:text-pink-500 hover:bg-pink-50 rounded-full transition active:scale-90 cursor-pointer"
        >
          <SkipBack className="w-5 h-5" />
        </button>

        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-lg hover:shadow-pink-200 transition active:scale-95 cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 fill-white ml-0.5" />
          )}
        </button>

        <button
          onClick={playNext}
          className="p-2.5 text-slate-600 hover:text-pink-500 hover:bg-pink-50 rounded-full transition active:scale-90 cursor-pointer"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Interactive Playlist Strip */}
      <div className="w-full max-h-32 overflow-y-auto space-y-1 pr-1 border-t border-slate-100 pt-2 text-xs z-10 no-scrollbar">
        {TRACKS.map((track, idx) => (
          <button
            key={track.id}
            onClick={() => selectTrack(idx)}
            className={`w-full p-2 rounded-xl flex items-center justify-between text-left transition cursor-pointer ${
              idx === currentTrackIndex
                ? 'bg-pink-50 text-pink-600 font-semibold shadow-xs border border-pink-200'
                : 'hover:bg-slate-50 text-slate-600 border border-transparent'
            }`}
          >
            <span className="truncate">
              {idx + 1}. {track.title}
            </span>
            {idx === currentTrackIndex && isPlaying && (
              <span className="text-[10px] bg-pink-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                Playing
              </span>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}