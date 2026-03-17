
import React, { useRef, useState } from 'react';
import { Partner } from '../types';
import { useOnScreen } from '../useOnScreen';

interface FeaturedPartnersProps {
    partners: Partner[];
}

const FeaturedPartners: React.FC<FeaturedPartnersProps> = ({ partners }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref);

    if (!partners || partners.length === 0) {
        return null;
    }

    // Duplicate partners array to create seamless loop
    const displayPartners = [...partners, ...partners, ...partners, ...partners];

    return (
        <section ref={ref} className="bg-gray-100 py-16 md:py-24 overflow-hidden group relative w-full">
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out mb-12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="text-center">
                    <h2 className="font-eurostile text-xl md:text-2xl tracking-[0.3em] text-zinc-900 mb-6 uppercase">
                        WHO WHE'VE WORKED WITH
                    </h2>
                    <p className="text-sm md:text-base text-zinc-500 leading-relaxed max-w-2xl mx-auto uppercase tracking-widest">
                        Engineered for the best. Technical apparel for the elite. </p>
                </div>
            </div>
            
            {/* Carousel Container */}
            <div className="relative w-full overflow-hidden py-8 flex">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-max animate-scroll hover:[animation-play-state:paused] items-center">
                    {displayPartners.map((partner, index) => (
                        <div key={`${partner.id}-${index}`} className="shrink-0 w-[160px] md:w-[240px] flex items-center justify-center grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500 px-8">
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
