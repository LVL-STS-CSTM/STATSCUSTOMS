
import React, { useRef, useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import LazyImage from './LazyImage';
import { ArrowLongRightIcon } from './icons';

interface HomeFeatureSectionProps {
    onNavigate: (page: any, value?: string | null) => void;
}

const HomeFeatureSection: React.FC<HomeFeatureSectionProps> = ({ onNavigate }) => {
    const { homeFeature } = useData();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Defensive check: ensure homeFeature exists before accessing isVisible
    if (!homeFeature || !homeFeature.isVisible) return null;

    const slides = [
        {
            id: 'main-feature',
            title: homeFeature.headline || 'Custom Apparel',
            subtitle: homeFeature.tagline || 'Premium Quality',
            description: homeFeature.description || '',
            image: homeFeature.imageUrl
        },
        // Defensive check: ensure tabs is an array and items are valid before mapping
        ...(Array.isArray(homeFeature.tabs) ? homeFeature.tabs : []).map((tab, idx) => {
            if (!tab) return null;
            return {
                id: `tab-${idx}`,
                title: tab.label || 'Feature',
                subtitle: tab.subtitle || 'Professional Grade',
                description: tab.description || `Custom designed ${tab.label ? tab.label.toLowerCase() : 'gear'} crafted for durability, style, and team identity.`,
                image: tab.imageUrl
            };
        }).filter(slide => slide !== null) as { id: string; title: string; subtitle: string; description: string; image: string }[]
    ];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const slideWidth = current.clientWidth;
            current.scrollBy({ left: direction === 'left' ? -slideWidth : slideWidth, behavior: 'smooth' });
        }
    };

    // Update active index on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current) {
                const index = Math.round(scrollContainerRef.current.scrollLeft / scrollContainerRef.current.clientWidth);
                setActiveIndex(index);
            }
        };
        const el = scrollContainerRef.current;
        if (el) el.addEventListener('scroll', handleScroll);
        return () => el?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="bg-black py-0 font-grotesk">
            <div className="max-w-[100%] mx-auto relative group overflow-hidden">

                
                {/* Navigation Buttons - Simple & Centered - Hidden on Mobile */}
                <button 
                    onClick={() => scroll('left')} 
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 left-4 z-20 text-white transition-all duration-300 hover:scale-125 disabled:opacity-0 disabled:pointer-events-none drop-shadow-lg ${activeIndex === 0 ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}
                    disabled={activeIndex === 0}
                    aria-label="Previous slide"
                >
                    <ArrowLongRightIcon className="w-8 h-8 rotate-180" />
                </button>

                <button 
                    onClick={() => scroll('right')} 
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 right-4 z-20 text-white transition-all duration-300 hover:scale-125 disabled:opacity-0 disabled:pointer-events-none drop-shadow-lg ${activeIndex === slides.length - 1 ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}
                    disabled={activeIndex === slides.length - 1}
                    aria-label="Next slide"
                >
                    <ArrowLongRightIcon className="w-8 h-8" />
                </button>

                {/* Carousel - Full Width Single Frame */}
                <div 
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth rounded-none overflow-y-hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {slides.map((slide) => (
                        <div 
                            key={slide.id}
                            className="min-w-full relative aspect-[3/4] md:aspect-[21/9] snap-center overflow-hidden bg-gray-100 flex flex-col items-center text-center"
                        >
                            <LazyImage 
                                src={slide.image} 
                                alt={slide.title} 
                                aspectRatio="h-full w-full"
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 pointer-events-none"></div>
                            
                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 p-6 md:p-16 text-white max-w-4xl pointer-events-none w-full flex flex-col items-center text-center md:items-start md:text-left">
                                <span className="inline-block px-3 py-1.5 mb-4 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-none shadow-sm font-grotesk">
                                    {slide.subtitle}
                                </span>
                                {/* Minimized Text Size Here */}
                                <h3 className="font-eurostile text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-widest leading-[0.9] mb-3 md:mb-6 drop-shadow-xl break-words">
                                    {slide.title}
                                </h3>
                                {/* Minimized Description Size Here */}
                                <p className="text-[10px] sm:text-xs md:text-sm font-medium text-white/80 max-w-xl leading-relaxed drop-shadow-md line-clamp-3 md:line-clamp-none font-futura">
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Indicators - Simple Lines */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`h-1 rounded-none transition-all duration-300 shadow-sm ${activeIndex === idx ? 'w-8 md:w-12 bg-white' : 'w-2 bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeFeatureSection;
