'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronLeft,
  Sparkles,
  Disc,
  ListMusic,
} from 'lucide-react';
import { ScreenProps } from '@/types';

const TRACKS = [
  {
    "id": 1,
    "title": "Photograph",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/Photograph.mp3"
  },
  {
    "id": 2,
    "title": "always",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/always.m4a"
  },
  {
    "id": 3,
    "title": "anyone",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/anyone.mp3"
  },
  {
    "id": 4,
    "title": "aty",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/aty.mp3"
  },
  {
    "id": 5,
    "title": "ayothr",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/ayothr.m4a"
  },
  {
    "id": 6,
    "title": "biw",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/biw.mp3"
  },
  {
    "id": 7,
    "title": "blue",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/blue.m4a"
  },
  {
    "id": 8,
    "title": "e",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/e.mp3"
  },
  {
    "id": 9,
    "title": "iwr",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/iwr.mp3"
  },
  {
    "id": 10,
    "title": "iysyou",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/iysyou.mp3"
  },
  {
    "id": 11,
    "title": "jtwur",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/jtwur.mp3"
  },
  {
    "id": 12,
    "title": "mu",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/mu.mp3"
  },
  {
    "id": 13,
    "title": "mym",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/mym.mp3"
  },
  {
    "id": 14,
    "title": "ngcmlfy",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/ngcmlfy.mp3"
  },
  {
    "id": 15,
    "title": "ngsun",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/ngsun.mp3"
  },
  {
    "id": 16,
    "title": "perfect",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/perfect.m4a"
  },
  {
    "id": 17,
    "title": "rts",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/rts.mp3"
  },
  {
    "id": 18,
    "title": "sywlg",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/sywlg.m4a"
  },
  {
    "id": 19,
    "title": "ten",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/ten.mp3"
  },
  {
    "id": 20,
    "title": "uify",
    "src": "https://0kplubrbumifbhvi.private.blob.vercel-storage.com/uify.m4a"
  }
];

export default function MusicScreen({ onNext }: ScreenProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = TRACKS[currentTrackIndex];

  // Reload audio safely when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.load();
    setCurrentTime(0);

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Playback error:', err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.log('Playback failed:', err);
      }
    }
  };

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const playNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const playPrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
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
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-slate-900 text-slate-100 p-7 rounded-3xl shadow-2xl max-w-sm w-full border border-sky-500/30 flex flex-col items-center relative overflow-hidden"
    >
      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={playNextTrack}
        preload="auto"
      />

      {/* Retro Header */}
      <div className="flex items-center gap-2 mb-1 z-10">
        <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
        <span className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase">
          RETRO MIXTAPE PLAYER
        </span>
      </div>
      <h2 className="text-xl font-black tracking-wide text-white mb-4 z-10">
        Mixtape For You 🎧
      </h2>

      {/* Cassette Tape Deck */}
      <div className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 shadow-inner flex flex-col items-center mb-4 relative">
        <div className="w-full bg-gradient-to-r from-sky-400 via-indigo-400 to-pink-400 rounded-t-lg p-1.5 px-3 flex justify-between items-center text-[10px] font-mono text-slate-950 font-bold mb-3">
          <span>
            TRACK {currentTrackIndex + 1 < 10 ? `0${currentTrackIndex + 1}` : currentTrackIndex + 1} / {TRACKS.length}
          </span>
        </div>

        {/* Cassette Tape Reels */}
        <div className="w-full h-24 bg-slate-950 rounded-xl border border-slate-700 p-3 flex items-center justify-around relative overflow-hidden">
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="w-14 h-14 rounded-full border-4 border-slate-600 bg-slate-900 flex items-center justify-center relative shadow-md"
            >
              <div className="w-5 h-5 rounded-full border-2 border-slate-500 bg-slate-800 flex items-center justify-center">
                <Disc className="w-3 h-3 text-sky-400" />
              </div>
            </motion.div>
          </div>

          <div className="w-12 h-6 border-b-2 border-slate-700 flex items-center justify-center">
            <div className="w-full h-1 bg-amber-900/60 rounded-full" />
          </div>

          <div className="flex flex-col items-center">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="w-14 h-14 rounded-full border-4 border-slate-600 bg-slate-900 flex items-center justify-center relative shadow-md"
            >
              <div className="w-5 h-5 rounded-full border-2 border-slate-500 bg-slate-800 flex items-center justify-center">
                <Disc className="w-3 h-3 text-pink-400" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-3 text-center px-2">
          <p className="text-xs font-mono font-bold text-sky-300 truncate">
            {currentTrack.title}
          </p>
        </div>
      </div>

      {/* Scrollable Track List */}
      <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
        <ListMusic className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-1" />
        {TRACKS.map((track, idx) => (
          <button
            key={track.id}
            onClick={() => handleSelectTrack(idx)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap transition-all border ${
              idx === currentTrackIndex
                ? 'bg-sky-500 text-white border-sky-400 font-bold shadow-xs'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}. {track.title}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-3">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <button
          onClick={playPrevTrack}
          className="p-2 text-slate-400 hover:text-white transition active:scale-90"
        >
          <SkipBack className="w-5 h-5" />
        </button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current ml-0.5" />
          )}
        </motion.button>

        <button
          onClick={playNextTrack}
          className="p-2 text-slate-400 hover:text-white transition active:scale-90"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Volume Slider */}
      <div className="w-full flex items-center gap-3 bg-slate-800/80 p-2.5 rounded-xl mb-4">
        <button onClick={toggleMute} className="text-slate-400 hover:text-white">
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-sky-400" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
        />
      </div>

      {/* Back Button */}
      <button
        onClick={() => onNext('menu')}
        className="w-full bg-slate-800 text-slate-300 py-3 rounded-2xl font-semibold text-xs hover:bg-slate-700 transition flex items-center justify-center gap-1.5 border border-slate-700"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>နောက်သို့</span>
      </button>
    </motion.div>
  );
}