'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

import { Step } from '@/types';
import PasscodeScreen from '@/components/PasscodeScreen';
import PromptScreen from '@/components/PromptScreen';
import MenuScreen from '@/components/MenuScreen';
import CakeScreen from '@/components/CakeScreen';
import LetterScreen from '@/components/LetterScreen';

export default function BirthdayApp() {
  const [currentStep, setCurrentStep] = useState<Step>('passcode');

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#3b82f6', '#fcd34d', '#a78bfa']
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-sky-50 to-pink-50 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {currentStep === 'passcode' && (
          <PasscodeScreen key="passcode" onNext={setCurrentStep} triggerConfetti={triggerConfetti} />
        )}
        {currentStep === 'prompt' && (
          <PromptScreen key="prompt" onNext={setCurrentStep} triggerConfetti={triggerConfetti} />
        )}
        {currentStep === 'menu' && (
          <MenuScreen key="menu" onNext={setCurrentStep} />
        )}
        {currentStep === 'cake' && (
          <CakeScreen key="cake" onNext={setCurrentStep} triggerConfetti={triggerConfetti} />
        )}
        {currentStep === 'letter' && (
          <LetterScreen key="letter" onNext={setCurrentStep} />
        )}
      </AnimatePresence>
    </main>
  );
}