
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

    return (
        <section ref={ref} className="bg-gray-100 py-16 md:py-24 overflow-hidden group relative w-full">
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out mb-12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="text-center">
                    <h2 className="font-oswald text-3xl md:text-4xl tracking-widest text-gray-900 mb-4 uppercase">
                        Strategic Alliances
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        Powering the visual identity of elite organizations, from agile startups to global icons.
                    </p>
                </div>
            </div>
            
            {/* Carousel Container */}
            <div className="relative w-full overflow-hidden">
                {/* Scrollable Area */}
                <div 
                    className="flex overflow-x-auto gap-8 md:gap-16 pb-8 px-4 md:px-12 no-scrollbar snap-x snap-mandatory scroll-smooth items-center w-full"
                >
                    {/* Spacer for left padding on mobile */}
                    <div className="shrink-0 w-4 md:w-0"></div>
                    
                    {partners.map((partner) => (
                        <div key={partner.id} className="snap-center shrink-0 w-[140px] md:w-[180px] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
                            <PartnerItem partner={partner} />
                        </div>
                    ))}
                    
                    {/* Spacer for right padding on mobile */}
                    <div className="shrink-0 w-4 md:w-0"></div>
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
