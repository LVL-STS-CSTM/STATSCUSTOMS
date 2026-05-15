
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

    return (
        <section ref={sectionRef} className="bg-white text-black py-16 lg:py-48 overflow-hidden relative">
            {/* Technical Background Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

            <div className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-end mb-10 sm:mb-16 md:mb-24 lg:mb-32">
                    <div className="lg:col-span-7 relative">
                        <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="w-16 md:w-24 h-[1px] bg-black mb-8 md:mb-12"></div>
                            <h2 className="font-eurostile font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.85] tracking-tighter">
                                Technical<br/>Capabilities
                            </h2>
                        </div>
                    </div>
                    <div className="lg:col-span-5 pb-2">
                        <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <p className="text-base md:text-lg lg:text-xl text-zinc-500 leading-relaxed font-light border-l border-zinc-200 pl-4 md:pl-6 font-sans">
                                <strong className="text-black font-medium">Precision & Quality.</strong> Crafted with purpose, built to perform, and designed to inspire greatness in every step of the journey.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {techniques.map((tech, index) => (
                        <div 
                            key={tech.title} 
                            className={`group relative aspect-square sm:aspect-[4/3] md:aspect-video overflow-hidden bg-zinc-900 cursor-pointer transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* number bg */}
                            <div className="absolute top-0 right-0 p-6 z-20 opacity-0 md:group-hover:opacity-20 transition-opacity duration-700 pointer-events-none hidden md:block">
                                <span className="font-eurostile font-bold tracking-tighter text-7xl text-white leading-none">{tech.id}</span>
                            </div>

                            {/* Image */}
                            <div className="absolute inset-0 transition-transform duration-[1.5s] ease-out group-hover:scale-105">
                                <LazyImage 
                                    src={tech.imageUrl} 
                                    alt={tech.title} 
                                    aspectRatio="h-full w-full"
                                    className="transition-opacity duration-700 opacity-60 group-hover:opacity-40"
                                />
                            </div>
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:from-black/50 opacity-90 md:opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Border Reveal on Hover */}
                            <div className="absolute inset-3 md:inset-5 border border-white/10 md:border-white/0 group-hover:border-white/10 transition-all duration-700 pointer-events-none z-10"></div>

                            {/* Inner Content Box */}
                            <div className="absolute inset-0 p-6 md:p-10 z-20 flex flex-col justify-end pointer-events-none">
                                <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                                    <div className="mb-2 md:mb-2">
                                        <span className="text-[9px] md:text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-400 block transition-colors duration-500 font-sans group-hover:text-zinc-200">
                                            {tech.label}
                                        </span>
                                    </div>
                                    <h3 className="font-eurostile font-medium text-xl md:text-3xl uppercase tracking-wider mb-2 md:mb-3 leading-none text-white transition-colors">
                                        {tech.title}
                                    </h3>
                                    <div className="h-[1px] bg-white/30 mb-3 transition-all duration-700 ease-out w-8 group-hover:w-[60%]"></div>
                                    
                                    {/* Description */}
                                    <div className="transition-all duration-500 ease-out max-h-0 opacity-0 translate-y-4 group-hover:max-h-40 group-hover:opacity-100 group-hover:translate-y-0 overflow-hidden">
                                        <p className="text-[11px] md:text-xs text-zinc-300 font-light leading-relaxed font-sans pr-4 md:pr-12">
                                            {tech.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomizationShowcase;
