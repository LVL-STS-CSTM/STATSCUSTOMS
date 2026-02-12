
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
        <section ref={ref} className="bg-gray-100 py-16 md:py-24 overflow-hidden">
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out mb-16 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="text-center">
                    <h2 className="font-oswald text-3xl md:text-4xl tracking-widest text-gray-900 mb-4 uppercase">
                        Strategic Alliances
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        Powering the visual identity of elite organizations, from agile startups to global icons.
                    </p>
                </div>
            </div>
            
            {/* Marquee Container */}
            <div className="w-full relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
                    {/* Render 4 sets to ensure seamless infinite scroll even on ultra-wide screens with few items */}
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-12 md:gap-24 px-6 md:px-12 shrink-0">
                            {partners.map((partner) => (
                                <PartnerItem key={`${i}-${partner.id}`} partner={partner} />
                            ))}
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
            <span className="text-lg md:text-xl font-black text-gray-300 uppercase tracking-widest whitespace-nowrap select-none">
                {partner.name}
            </span>
        );
    }

    return (
        <div className="relative group">
            <img 
                src={partner.logoUrl} 
                alt={`${partner.name} logo`} 
                className="h-10 md:h-14 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                onError={() => setError(true)}
            />
        </div>
    );
};

export default FeaturedPartners;
