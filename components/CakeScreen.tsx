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
      alert('Microphone access is needed to blow out the candle! 🎙️');
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
      <p className="text-slate-400 text-xs mb-6">
        {!isLit
          ? 'Hold the lighter button to light the candle ✨'
          : 'Blow into mic or tap flame to blow it out'}
      </p>

      {/* Custom Vector Cake Container */}
      <div className="relative my-2 flex flex-col items-center justify-end h-[210px] w-full select-none">
        
        {/* Soft Flame Ambient Light */}
        <AnimatePresence>
          {isLit && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-0 w-32 h-32 bg-amber-300/40 rounded-full blur-xl pointer-events-none z-0"
            />
          )}
        </AnimatePresence>

        {/* Candle Assembly */}
        <div 
          onClick={() => isLit && extinguishCandle()}
          className="relative z-20 cursor-pointer flex flex-col items-center group -mb-1"
        >
          {/* Animated SVG Flame */}
          <AnimatePresence>
            {isLit && (
              <motion.div
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                className="relative z-30 mb-0.5"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.08, 0.95, 1.05, 1],
                    rotate: [-2, 3, -1, 2, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }}
                  className="w-5 h-8 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full blur-[0.5px] shadow-[0_0_12px_#f59e0b]"
                >
                  <div className="w-2 h-3.5 bg-white rounded-full mx-auto mt-3 blur-[0.5px]" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Smoke Physics on Blowout */}
          {!isLit && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.7, 0], y: -20 }}
              transition={{ duration: 1.8 }}
              className="absolute -top-5 text-slate-400 text-xs font-semibold pointer-events-none"
            >
              💨
            </motion.div>
          )}

          {/* Candle Wick */}
          <div className="w-1 h-2.5 bg-slate-800 rounded-t-sm z-20" />

          {/* Candle Body */}
          <div className="w-3.5 h-12 bg-gradient-to-r from-sky-300 via-sky-200 to-sky-300 rounded-t-sm border-x border-sky-300/60 shadow-xs relative overflow-hidden z-20">
            <div className="w-full h-1 bg-white/70 rounded-full" />
          </div>
        </div>

        {/* CSS/HTML Vector Layered Cake */}
        <div className="relative z-10 flex flex-col items-center w-48">
          
          {/* Top Layer Cream Drips */}
          <div className="w-36 h-8 bg-pink-100 rounded-t-2xl shadow-inner relative flex justify-around items-end overflow-hidden border-b-2 border-pink-200/50">
            <div className="w-4 h-4 bg-white rounded-full -mb-2" />
            <div className="w-5 h-5 bg-white rounded-full -mb-2" />
            <div className="w-4 h-4 bg-white rounded-full -mb-2" />
            <div className="w-6 h-6 bg-white rounded-full -mb-3" />
            <div className="w-4 h-4 bg-white rounded-full -mb-2" />
          </div>

          {/* Cake Middle Tier */}
          <div className="w-40 h-10 bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 relative flex items-center justify-center border-y border-pink-300/40">
            {/* Decorative Strawberries / Cherries */}
            <div className="flex gap-4">
              <span className="w-2.5 h-2.5 bg-rose-400 rounded-full shadow-xs inline-block" />
              <span className="w-2.5 h-2.5 bg-rose-400 rounded-full shadow-xs inline-block" />
              <span className="w-2.5 h-2.5 bg-rose-400 rounded-full shadow-xs inline-block" />
              <span className="w-2.5 h-2.5 bg-rose-400 rounded-full shadow-xs inline-block" />
            </div>
          </div>

          {/* Cake Bottom Tier */}
          <div className="w-48 h-12 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 rounded-b-2xl shadow-md border-t border-amber-200/60 relative overflow-hidden flex items-center justify-center">
            {/* Frosting Swirl Line */}
            <div className="w-full h-1.5 bg-white/80" />
          </div>

          {/* Cake Plate Stand */}
          <div className="w-56 h-3 bg-slate-200/90 rounded-full shadow-md mt-0.5 border-t border-slate-300" />
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
                {lightingProgress > 0 ? 'Hold to light...' : 'Press & Hold to Light Candle 🔥'}
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