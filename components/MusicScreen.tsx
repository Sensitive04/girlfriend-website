'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Music, ChevronLeft, Volume2, Sparkles } from 'lucide-react';
import { ScreenProps } from '@/types';

const TRACKS = [
  { id: 1, title: 'Always', artist: 'Special Track', src: '/audio/always.m4a' },
  { id: 2, title: 'Anyone', artist: 'Special Track', src: '/audio/anyone.mp3' },
  { id: 3, title: 'ATY', artist: 'Special Track', src: '/audio/aty.mp3' },
  { id: 4, title: 'Ayothr', artist: 'Special Track', src: '/audio/ayothr.m4a' },
  { id: 5, title: 'BIW', artist: 'Special Track', src: '/audio/biw.mp3' },
  { id: 6, title: 'Blue', artist: 'Special Track', src: '/audio/blue.m4a' },
  { id: 7, title: 'E', artist: 'Special Track', src: '/audio/e.mp3' },
  { id: 8, title: 'IWR', artist: 'Special Track', src: '/audio/iwr.mp3' },
  { id: 9, title: 'Iysyou', artist: 'Special Track', src: '/audio/iysyou.mp3' },
  { id: 10, title: 'JTWUR', artist: 'Special Track', src: '/audio/jtwur.mp3' },
  { id: 11, title: 'MU', artist: 'Special Track', src: '/audio/mu.mp3' },
  { id: 12, title: 'MYM', artist: 'Special Track', src: '/audio/mym.mp3' },
  { id: 13, title: 'NGCMLFY', artist: 'Special Track', src: '/audio/ngcmlfy.mp3' },
  { id: 14, title: 'NGSUN', artist: 'Special Track', src: '/audio/ngsun.mp3' },
  { id: 15, title: 'Perfect', artist: 'Special Track', src: '/audio/perfect.m4a' },
  { id: 16, title: 'Photograph', artist: 'Special Track', src: '/audio/Photograph.mp3' },
  { id: 17, title: 'RTS', artist: 'Special Track', src: '/audio/rts.mp3' },
  { id: 18, title: 'SYWLG', artist: 'Special Track', src: '/audio/sywlg.m4a' },
  { id: 19, title: 'TEN', artist: 'Special Track', src: '/audio/ten.mp3' },
  { id: 20, title: 'UIFY', artist: 'Special Track', src: '/audio/uify.m4a' },
];

export default function MusicScreen({ onNext }: ScreenProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = TRACKS[currentTrackIndex];

  // Optimize track switching: loads and plays only when required
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
      className="bg-white/85 backdrop-blur-xl p-6 sm:p-7 rounded-3xl shadow-2xl max-w-md w-full border border-pink-100 flex flex-col items-center relative overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sky-200/40 rounded-full blur-2xl pointer-events-none" />

      {/* Optimized Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="none" // Key optimization: Prevents downloading audio upfront
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

      <h2 className="text-xl font-bold text-slate-800 mb-4 z-10 flex items-center gap-2">
        <span>သီချင်းများ</span>
        <Volume2 className="w-5 h-5 text-pink-400" />
      </h2>

      {/* Album Vinyl / Art Frame */}
      <div className="relative w-44 h-44 mb-4 flex items-center justify-center">
        <div
          className={`w-full h-full rounded-2xl bg-gradient-to-tr from-pink-400 via-rose-300 to-indigo-300 shadow-xl flex items-center justify-center relative overflow-hidden transition-all duration-500 ${
            isPlaying ? 'scale-105 shadow-pink-200/50' : 'scale-100'
          }`}
        >
          {/* Animated Music Note */}
          <Music
            className={`w-20 h-20 text-white/90 drop-shadow-md transition-transform duration-300 ${
              isPlaying ? 'animate-bounce' : ''
            }`}
          />
        </div>
      </div>

      {/* Song Info */}
      <h3 className="text-lg font-bold text-slate-800 text-center line-clamp-1 mb-0.5 z-10">
        {currentTrack.title}
      </h3>
      <span className="text-xs text-slate-400 mb-4 font-medium z-10">
        {currentTrack.artist} ({currentTrackIndex + 1} of {TRACKS.length})
      </span>

      {/* Scrubber / Progress Bar */}
      <div className="w-full max-w-[280px] mb-4 z-10">
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
      <div className="flex items-center gap-6 mb-5 z-10">
        <button
          onClick={playPrev}
          className="p-3 text-slate-600 hover:text-pink-500 hover:bg-pink-50 rounded-full transition active:scale-90 cursor-pointer"
        >
          <SkipBack className="w-6 h-6" />
        </button>

        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-lg hover:shadow-pink-200 transition active:scale-95 cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 fill-white ml-0.5" />
          )}
        </button>

        <button
          onClick={playNext}
          className="p-3 text-slate-600 hover:text-pink-500 hover:bg-pink-50 rounded-full transition active:scale-90 cursor-pointer"
        >
          <SkipForward className="w-6 h-6" />
        </button>
      </div>

      {/* Interactive Playlist Strip */}
      <div className="w-full max-h-36 overflow-y-auto space-y-1.5 pr-1 border-t border-slate-100 pt-3 text-xs z-10 no-scrollbar">
        {TRACKS.map((track, idx) => (
          <button
            key={track.id}
            onClick={() => selectTrack(idx)}
            className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition cursor-pointer ${
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