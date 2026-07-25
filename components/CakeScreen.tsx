'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, ChevronLeft, Flame } from 'lucide-react';
import { ScreenProps } from '@/types';

export default function CakeScreen({ onNext, triggerConfetti }: ScreenProps) {
  const [isLit, setIsLit] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [lightingProgress, setLightingProgress] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startLighting = () => {
    if (isLit) return;
    let progress = 0;
    holdTimerRef.current = setInterval(() => {
      progress += 20;
      setLightingProgress(progress);
      if (progress >= 100) {
        clearInterval(holdTimerRef.current!);
        setIsLit(true);
        setLightingProgress(0);
        triggerConfetti?.();
      }
    }, 150);
  };

  const stopLighting = () => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    if (!isLit) setLightingProgress(0);
  };

  const startMicDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      const source = audioCtx.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      source.connect(analyser);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;
      setIsListening(true);

      checkAirBlow();
    } catch (err) {
      alert('Microphone access is needed to blow out the candles! 🎙️');
    }
  };

  const checkAirBlow = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const average = sum / dataArray.length;

    if (average > 65) {
      extinguishCandle();
      stopMic();
      return;
    }

    requestAnimationFrame(checkAirBlow);
  };

  const stopMic = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsListening(false);
  };

  const extinguishCandle = () => {
    setIsLit(false);
    triggerConfetti?.();
  };

  useEffect(() => {
    return () => stopMic();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/85 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-sky-100 flex flex-col items-center text-center relative overflow-hidden"
    >
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Make a Wish! 🕯️</h2>
      <p className="text-slate-400 text-xs mb-8">
        {!isLit
          ? 'Hold the lighter button to light the candle ✨'
          : 'Blow into mic or tap flame to blow it out'}
      </p>

      {/* Candle & Cake Stage Container */}
      <div className="relative my-4 flex flex-col items-center justify-end h-[220px] w-full select-none">
        
        {/* Soft Flame Aura Glow */}
        <AnimatePresence>
          {isLit && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-2 w-28 h-28 bg-amber-300/40 rounded-full blur-xl pointer-events-none z-0"
            />
          )}
        </AnimatePresence>

        {/* Candle Assembly (Aligned Precisely) */}
        <div 
          onClick={() => isLit && extinguishCandle()}
          className="relative z-20 cursor-pointer flex flex-col items-center group -mb-18"
        >
          {/* Flame */}
          <AnimatePresence>
            {isLit && (
              <motion.div
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                className="relative z-30"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.08, 0.95, 1.05, 1],
                    rotate: [-2, 3, -1, 2, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }}
                  className="w-5 h-9 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full blur-[0.5px] shadow-[0_0_15px_#f59e0b]"
                >
                  <div className="w-2 h-4 bg-white rounded-full mx-auto mt-3 blur-[0.5px]" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Smoke on Blowout */}
          {!isLit && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.7, 0], y: -25 }}
              transition={{ duration: 1.8 }}
              className="absolute -top-6 text-slate-400 text-lg pointer-events-none"
            >
              💨
            </motion.div>
          )}

          {/* Wick */}
          <div className="w-1 h-3 bg-slate-800 rounded-t-sm z-20" />

          {/* Candle Body */}
          <div className="w-4 h-14 bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 rounded-t-sm shadow-xs border-x border-pink-300/60 relative overflow-hidden z-20">
            <div className="w-full h-2 bg-pink-100 rounded-full opacity-80" />
          </div>
        </div>

        {/* Static Cake Base (Zero Animation) */}
        <div className="relative z-10 text-9xl filter drop-shadow-md leading-none">
          🎂
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 w-full mt-4">
        {!isLit ? (
          <button
            onMouseDown={startLighting}
            onMouseUp={stopLighting}
            onMouseLeave={stopLighting}
            onTouchStart={startLighting}
            onTouchEnd={stopLighting}
            className="relative w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold text-xs shadow-md shadow-amber-200 hover:brightness-105 active:scale-98 transition overflow-hidden select-none"
          >
            {/* Hold Progress Bar */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-amber-600/30 transition-all duration-150"
              style={{ width: `${lightingProgress}%` }}
            />
            <div className="relative z-10 flex items-center justify-center gap-2">
              <Flame className="w-4 h-4 fill-current animate-bounce" />
              <span>
                {lightingProgress > 0 ? 'Hold to light...' : 'Press & Hold to Light Lighter 🔥'}
              </span>
            </div>
          </button>
        ) : (
          <button
            onClick={isListening ? stopMic : startMicDetection}
            className={`w-full py-3 rounded-2xl font-semibold text-xs transition flex items-center justify-center gap-2 border ${
              isListening
                ? 'bg-sky-500 text-white border-sky-400 animate-pulse'
                : 'bg-sky-50 text-sky-600 border-sky-200 hover:bg-sky-100'
            }`}
          >
            {isListening ? (
              <>
                <Mic className="w-4 h-4" />
                <span>Blower active! Blow into mic...</span>
              </>
            ) : (
              <>
                <MicOff className="w-4 h-4" />
                <span>Enable Mic to Blow Candle 🎙️</span>
              </>
            )}
          </button>
        )}

        <button
          onClick={() => onNext('menu')}
          className="w-full bg-slate-100 text-slate-600 py-3 rounded-2xl font-semibold text-xs hover:bg-slate-200 transition flex items-center justify-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>နောက်သို့</span>
        </button>
      </div>
    </motion.div>
  );
}