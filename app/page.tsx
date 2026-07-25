'use client';

import { useState } from 'react';

type Step = 'passcode' | 'prompt' | 'menu' | 'cake' | 'envelope' | 'letter';

export default function BirthdayApp() {
  const [currentStep, setCurrentStep] = useState<Step>('passcode');
  const [passcode, setPasscode] = useState<string>('');
  const CORRECT_PIN = '1234'; // Set her special passcode here!

  const handleKeyClick = (val: string) => {
    if (passcode.length < 4) {
      const newPin = passcode + val;
      setPasscode(newPin);
      if (newPin === CORRECT_PIN) {
        setTimeout(() => setCurrentStep('prompt'), 300);
      }
    }
  };

  const handleClear = () => setPasscode('');

  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      
      {/* 1. PASSCODE SCREEN */}
      {currentStep === 'passcode' && (
        <div className="bg-pink-200 p-8 rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 items-center max-w-xl w-full">
          {/* Photo Frame */}
          <div className="w-48 h-48 rounded-full border-4 border-white overflow-hidden shadow-md flex-shrink-0">
            <img 
              src="/cat-photo.jpg" 
              alt="Cute Picture" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Keypad */}
          <div className="flex flex-col items-center">
            <h2 className="text-pink-700 font-bold mb-3">Enter a passcode</h2>
            
            {/* Dots / Indicators */}
            <div className="flex gap-2 mb-4">
              {[0, 1, 2, 3].map((idx) => (
                <div 
                  key={idx} 
                  className={`w-6 h-6 border-2 border-pink-400 rounded-md bg-white flex items-center justify-center font-bold text-pink-600`}
                >
                  {passcode[idx] ? '♥' : ''}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-3">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0'].map((num) => (
                <button
                  key={num}
                  onClick={() => handleKeyClick(num)}
                  className="w-12 h-12 bg-white rounded-full text-pink-600 font-bold shadow-sm hover:bg-pink-100 transition active:scale-95"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={handleClear}
                className="w-12 h-12 bg-white rounded-full text-pink-600 text-xs font-bold shadow-sm hover:bg-pink-100 transition active:scale-95 flex items-center justify-center"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. PROMPT SCREEN */}
      {currentStep === 'prompt' && (
        <div className="text-center bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-lg max-w-md w-full">
          <p className="text-pink-500 font-semibold mb-2">Hey beautiful</p>
          <h1 className="text-2xl font-bold text-pink-700 mb-6">Do you want to see your gift?</h1>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setCurrentStep('menu')}
              className="bg-pink-400 text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:bg-pink-500 transition"
            >
              YES PLEASE
            </button>
            <button
              onClick={() => alert('Nice try! You have to say yes 😉')}
              className="bg-pink-100 text-pink-400 px-6 py-2.5 rounded-full font-medium hover:bg-pink-200 transition"
            >
              NO THANKS
            </button>
          </div>
        </div>
      )}

      {/* 3. MENU SCREEN */}
      {currentStep === 'menu' && (
        <div className="bg-blue-50/80 p-8 rounded-3xl shadow-lg text-center max-w-md w-full border border-blue-100">
          <h2 className="text-blue-600 font-bold text-xl mb-6">တစ်ခုရွေးပြီးနှိပ်ပါ</h2>
          <div className="flex justify-center gap-6">
            <button 
              onClick={() => setCurrentStep('cake')}
              className="p-4 bg-white rounded-2xl shadow-md hover:scale-105 transition"
            >
              🎂 <p className="text-xs mt-2 text-gray-600">Cake</p>
            </button>
            <button 
              onClick={() => setCurrentStep('envelope')}
              className="p-4 bg-white rounded-2xl shadow-md hover:scale-105 transition"
            >
              ✉️ <p className="text-xs mt-2 text-gray-600">Letter</p>
            </button>
          </div>
        </div>
      )}

      {/* 4. CAKE SCREEN */}
      {currentStep === 'cake' && (
        <div className="text-center flex flex-col items-center max-w-md w-full">
          <h2 className="text-blue-500 font-semibold text-2xl mb-4">Birthday Cake for you</h2>
          <div className="text-8xl my-6 animate-bounce">🎂</div>
          
          {/* Back button */}
          <button 
            onClick={() => setCurrentStep('menu')}
            className="mt-8 bg-blue-100 text-blue-600 px-6 py-2 rounded-full font-medium"
          >
            နောက်သို့
          </button>
        </div>
      )}

      {/* 5. ENVELOPE SCREEN */}
      {currentStep === 'envelope' && (
        <div className="text-center flex flex-col items-center">
          <h2 className="text-blue-500 font-semibold text-xl mb-6">စာလေးဖွင့်ဖတ်ပေးပါနော်</h2>
          <div 
            onClick={() => setCurrentStep('letter')}
            className="w-64 h-40 bg-blue-200 border-2 border-blue-300 rounded-lg flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition"
          >
            ✉️ Tap to Open
          </div>
        </div>
      )}

      {/* 6. LETTER SCREEN */}
      {currentStep === 'letter' && (
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-left border border-blue-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Happy Birthday ပါ...</h2>
          <p className="text-gray-600 leading-relaxed text-sm mb-6">
            ဒီနေ့မှာ ကျရောက်တဲ့ Babe ရဲ့မွေးနေ့ကစပြီး နောင်နှစ်ပေါင်းများစွာအထိ စိတ်အေးချမ်းသာယာမှုတွေ အပြည့်အဝ ရရှိပါစေလို့ ဆုတောင်းပေးပါတယ်။
          </p>
          <button 
            onClick={() => setCurrentStep('menu')}
            className="w-full bg-blue-100 text-blue-600 py-2 rounded-xl font-medium"
          >
            နောက်သို့
          </button>
        </div>
      )}

    </main>
  );
}