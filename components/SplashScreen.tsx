
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  isFadingOut: boolean;
}

/**
 * @description A full-screen splash/loading component that displays the company logo.
 * Animation Sequence: Solid Black -> Logo Pops In -> Logo Dissolves/Fades Out -> App Revealed.
 */
const SplashScreen: React.FC<SplashScreenProps> = ({ isFadingOut }) => {
  const [animateEnter, setAnimateEnter] = useState(false);

  useEffect(() => {
    // "Black only first" - delay the logo appearance by 500ms
    const timer = setTimeout(() => {
      setAnimateEnter(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      // Background remains black until the very end when isFadingOut triggers the whole container fade
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-1000 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={isFadingOut}
    >
      {/* 
        Logo Animation Container
        1. Start: scale-50 opacity-0 (Hidden/Small) - Pure Black Screen
        2. Enter: scale-100 opacity-100 (Pop in smoothly using bezier curve)
        3. Exit: scale-110 opacity-0 blur-sm (Dissolve/Disappear effect)
      */}
      <div 
        className={`relative w-32 h-32 md:w-48 md:h-48 transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
          isFadingOut 
            ? 'scale-110 opacity-0 blur-sm' // Disappear
            : animateEnter 
              ? 'scale-100 opacity-100'   // Pop In
              : 'scale-50 opacity-0'      // Initial Black State
        }`}
      >
        <img
          src="https://i.imgur.com/9FhbGuI.png"
          alt="STATS CUSTOMS Logo"
          className="relative w-full h-full object-contain invert"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
