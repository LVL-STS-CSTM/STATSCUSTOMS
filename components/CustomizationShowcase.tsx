import React, { useRef, useState } from 'react';
import { useOnScreen } from '../useOnScreen';
import LazyImage from './LazyImage';

const techniques = [
    { 
        id: '01',
        title: "STICKERS", 
        label: "Precision Depth",
        description: "Cleanly applied with screens to press ink onto fabric for a bold and solid colors", 
        imageUrl: "https://i.imgur.com/KTo1nHD.jpeg" 
    },
    { 
        id: '02',
        title: "Embroidery", 
        label: "Artisan Stitch",
        description: "Stitched directly into the grain for a textured, 3D premium signature.", 
        imageUrl: "https://i.imgur.com/0KBR7Wy.jpeg" 
    },
    { 
        id: '03',
        title: "Sublimation", 
        label: "Atomic Infusion",
        description: "Fade-proof designs infused into the textile for total breathability.", 
        imageUrl: "https://i.imgur.com/w56R62d.jpeg" 
    },
    { 
        id: '04',
        title: "Over-the-Fabric Print", 
        label: "Adaptive Flex",
        description: "Versatile, high-detail full-color transfers with a durable, flexible finish.", 
        imageUrl: "https://i.imgur.com/MFYwnJk.jpeg" 
    }
];

const CustomizationShowcase: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, '0px 0px -20% 0px');
    const [activeId, setActiveId] = useState<string | null>(null);

    const handleCardClick = (id: string) => {
        setActiveId(prev => prev === id ? null : id);
    };

    return (
        <section ref={sectionRef} className="bg-white text-black py-12 lg:py-16 overflow-hidden relative">
            {/* Technical Background Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

            <div className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 md:gap-10 mb-8 sm:mb-12 md:mb-16 lg:mb-20">
                    <div className="relative max-w-3xl">
                        <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="w-16 md:w-24 h-[1px] bg-black mb-4 md:mb-6"></div>
                            <h2 className="font-eurostile font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] uppercase leading-[0.85] tracking-tighter">
                                Technical<br/>Capabilities
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {techniques.map((tech, index) => {
                        const isActive = activeId === tech.id;

                        return (
                            <div
                                key={tech.title}
                                onClick={() => handleCardClick(tech.id)}
                                className={`group relative aspect-square sm:aspect-[4/3] md:aspect-video overflow-hidden bg-transparent cursor-pointer transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                {/* Number bg — desktop only */}
                                <div className="absolute top-0 right-0 p-6 z-20 opacity-0 md:group-hover:opacity-20 transition-opacity duration-700 pointer-events-none hidden md:block">
                                    <span className="font-eurostile font-bold tracking-tighter text-7xl text-white leading-none">{tech.id}</span>
                                </div>

                                {/* Image */}
                                <div className={`absolute inset-0 transition-transform duration-[1.5s] ease-out ${isActive ? 'scale-105' : 'md:group-hover:scale-105'}`}>
                                    <LazyImage
                                        src={tech.imageUrl}
                                        alt={tech.title}
                                        aspectRatio="h-full w-full"
                                        className="transition-opacity duration-700 opacity-100"
                                    />
                                </div>

                                {/* Bottom text legibility strip */}
                                <div className="absolute bottom-0 inset-x-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent pointer-events-none z-10"></div>

                                {/* Border */}
                                <div className={`absolute inset-3 md:inset-5 border transition-all duration-700 pointer-events-none z-20 ${isActive ? 'border-white/10' : 'border-white/10 md:border-white/0 md:group-hover:border-white/10'}`}></div>

                                {/* Inner Content */}
                                <div className="absolute inset-0 p-6 md:p-10 z-30 flex flex-col justify-end pointer-events-none">
                                    <div className={`transform transition-transform duration-500 ease-out ${isActive ? '-translate-y-2' : 'md:group-hover:-translate-y-2'}`}>
                                        <div className="mb-2">
                                            <span className={`text-[9px] md:text-[10px] font-medium uppercase tracking-[0.25em] block transition-colors duration-500 font-sans ${isActive ? 'text-zinc-200' : 'text-zinc-400 md:group-hover:text-zinc-200'}`}>
                                                {tech.label}
                                            </span>
                                        </div>
                                        <h3 className="font-eurostile font-medium text-xl md:text-3xl uppercase tracking-wider mb-2 md:mb-3 leading-none text-white">
                                            {tech.title}
                                        </h3>
                                        <div className={`h-[1px] bg-white/30 mb-3 transition-all duration-700 ease-out ${isActive ? 'w-[60%]' : 'w-8 md:group-hover:w-[60%]'}`}></div>

                                        {/* Description */}
                                        <div className={`transition-all duration-500 ease-out overflow-hidden ${isActive ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4 md:group-hover:max-h-40 md:group-hover:opacity-100 md:group-hover:translate-y-0'}`}>
                                            <p className="text-[11px] md:text-xs text-zinc-300 font-light leading-relaxed font-sans pr-4 md:pr-12">
                                                {tech.description}
                                            </p>
                                        </div>

                                        {/* Mobile tap hint */}
                                        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isActive ? 'max-h-0 opacity-0' : 'max-h-8 opacity-100'}`}>
                                            <p className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-sans mt-2">
                                                Tap to reveal
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-8 md:mt-12 lg:mt-16 max-w-2xl mx-auto text-center">
                    <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="w-12 h-[1px] bg-black/20 mx-auto mb-6"></div>
                        <p className="text-sm md:text-base lg:text-lg text-zinc-500 leading-relaxed font-light font-sans">
                            <strong className="text-black font-medium">Precision & Quality.</strong> Crafted with purpose, built to perform, and designed to inspire greatness in every step of the journey.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomizationShowcase;