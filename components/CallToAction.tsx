
import React, { useRef } from 'react';
import { View } from '../types';
import Button from './Button';
import { useOnScreen } from '../useOnScreen';

interface CallToActionProps {
    onNavigate: (page: View) => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onNavigate }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef);
    
    return (
        <section ref={sectionRef} className="relative bg-black py-24 md:py-32 overflow-hidden border-t border-white/10 group">
            {/* Technical Dashed Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="technical-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#technical-grid)" />
                </svg>
            </div>

            {/* Corner Crop Marks (L-Shapes) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute top-8 left-8 w-8 h-8 border-t-[1px] border-l-[1px] border-white/40"></div>
                <div className="absolute top-8 right-8 w-8 h-8 border-t-[1px] border-r-[1px] border-white/40"></div>
                <div className="absolute bottom-8 left-8 w-8 h-8 border-b-[1px] border-l-[1px] border-white/40"></div>
                <div className="absolute bottom-8 right-8 w-8 h-8 border-b-[1px] border-r-[1px] border-white/40"></div>
            </div>

            {/* Central Crosshairs (Decorative) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none opacity-10">
                <div className="absolute top-0 bottom-0 left-1/4 w-[1px] border-l border-dashed border-white"></div>
                <div className="absolute top-0 bottom-0 right-1/4 w-[1px] border-r border-dashed border-white"></div>
                <div className="absolute left-0 right-0 top-1/2 h-[1px] border-t border-dashed border-white"></div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
                <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    {/* Reduced font size */}
                    <h2 className="font-eurostile font-bold text-3xl md:text-5xl lg:text-6xl text-white mb-8 uppercase tracking-widest leading-none drop-shadow-2xl">
                        Define Your Legacy
                    </h2>
                </div>
                
                {/* Reduced text size */}
                <p className={`text-sm md:text-base text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light transition-all duration-1000 ease-out delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    We don't just manufacture; we engineer identity. Premium craftsmanship, local excellence, and fair pricing. Equip your team with gear that demands respect.
                </p>
                
                <div className={`transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <Button 
                        variant="primary"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); onNavigate('contact'); }}
                        className="px-10 py-4 text-[10px] tracking-[0.3em] shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-white/10 hover:text-white hover:border-white/50"
                    >
                        INITIATE PROJECT
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
