import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  isFadingOut: boolean;
}

/**
 * @description A full-screen splash/loading component.
 * Animation Sequence: Solid Black -> Fade In Logo -> Hold -> Fade Out to App.
 */
const SplashScreen: React.FC<SplashScreenProps> = ({ isFadingOut }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay the fade-in slightly to ensure the black screen is established first
    // This creates a smoother "Fade In" effect rather than a layout jump
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      // Background handles the final Fade Out to reveal the app
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-1000 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={isFadingOut}
    >
      {/* 
        Logo Container handling the Fade In 
        Start: Opacity 0, slightly scaled down (95%) for a subtle 'breathing' entrance
        End: Opacity 100, full scale
      */}
      <div 
        className={`relative w-32 h-32 md:w-48 md:h-48 transition-all duration-[1500ms] ease-out transform ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <img
          src="https://i.imgur.com/OIYeMvS.png"
          alt="STATS CUSTOM APPAREL"
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://i.imgur.com/vHq0L9A.png";
          }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;