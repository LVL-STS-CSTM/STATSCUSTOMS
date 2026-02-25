
import React, { useRef, useState } from 'react';
import { Partner } from '../types';
import { useOnScreen } from '../useOnScreen';

interface FeaturedPartnersProps {
    partners: Partner[];
}

const FeaturedPartners: React.FC<FeaturedPartnersProps> = ({ partners }) => {
    const ref = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    if (!partners || partners.length === 0) {
        return null;
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section ref={ref} className="bg-gray-100 py-16 md:py-24 overflow-hidden group relative w-full">
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out mb-12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="text-center">
                    <h2 className="font-rheiborn text-3xl md:text-4xl tracking-[0.3em] text-zinc-900 mb-6 uppercase">
                        Strategic Alliances
                    </h2>
                    <p className="text-sm md:text-base text-zinc-500 leading-relaxed max-w-2xl mx-auto uppercase tracking-widest">
                        Powering the visual identity of elite organizations, from agile startups to global icons.
                    </p>
                </div>
            </div>
            
            {/* Carousel Container */}
            <div className="relative w-full overflow-hidden py-4" style={{ overflow: 'hidden' }}>
                <div 
                    ref={scrollRef}
                    className={`flex overflow-x-auto snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing gap-12 md:gap-24 items-center px-12 select-none`}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {partners.map((partner) => (
                        <div key={partner.id} className="shrink-0 w-[120px] md:w-[160px] flex items-center justify-center grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-500 snap-center">
                            <PartnerItem partner={partner} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PartnerItem: React.FC<{ partner: Partner }> = ({ partner }) => {
    const [error, setError] = useState(false);

    if (error) {
        return (
            <span className="text-sm md:text-base font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap select-none">
                {partner.name}
            </span>
        );
    }

    return (
        <img 
            src={partner.logoUrl} 
            alt={`${partner.name} logo`} 
            className="w-full h-auto max-h-16 md:max-h-20 object-contain"
            onError={() => setError(true)}
            draggable={false}
        />
    );
};

export default FeaturedPartners;
