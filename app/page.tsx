'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

import { Step } from '@/types';
import PasscodeScreen from '@/components/PasscodeScreen';
import PromptScreen from '@/components/PromptScreen';
import MenuScreen from '@/components/MenuScreen';
import CakeScreen from '@/components/CakeScreen';
import EnvelopeScreen from '@/components/EnvelopeScreen';
import LetterScreen from '@/components/LetterScreen';
import MusicScreen from '@/components/MusicScreen';
import PhotoGalleryScreen from '@/components/PhotoGalleryScreen';

export default function BirthdayApp() {
  const [currentStep, setCurrentStep] = useState<Step>('passcode');

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#818cf8', '#f472b6', '#fcd34d'],
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {currentStep === 'passcode' && (
          <PasscodeScreen
            key="passcode"
            onNext={setCurrentStep}
            triggerConfetti={triggerConfetti}
          />
        )}
        {currentStep === 'prompt' && (
          <PromptScreen
            key="prompt"
            onNext={setCurrentStep}
            triggerConfetti={triggerConfetti}
          />
        )}
        {currentStep === 'menu' && (
          <MenuScreen key="menu" onNext={setCurrentStep} />
        )}
        {currentStep === 'cake' && (
          <CakeScreen
            key="cake"
            onNext={setCurrentStep}
            triggerConfetti={triggerConfetti}
          />
        )}
        {currentStep === 'envelope' && (
          <EnvelopeScreen key="envelope" onNext={setCurrentStep} />
        )}
        {currentStep === 'letter' && (
          <LetterScreen key="letter" onNext={setCurrentStep} />
        )}
        {currentStep === 'music' && (
          <MusicScreen
            key="music"
            onNext={setCurrentStep}
            triggerConfetti={triggerConfetti}
          />
        )}
        {currentStep === 'photos' && (
  <PhotoGalleryScreen key="photos" onNext={setCurrentStep} />
  )}
      </AnimatePresence>
    </main>
  );
}