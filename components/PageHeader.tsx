
import React, { useEffect, useState } from 'react';
import { View } from '../types';
import { useData } from '../context/DataContext';

interface PageHeaderProps {
    page: View;
    fallbackTitle?: string;
    fallbackDescription?: string;
    fallbackImage?: string;
    forceTitle?: string;
    forceDescription?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ page, fallbackTitle, fallbackDescription, fallbackImage, forceTitle, forceDescription }) => {
    const { pageBanners } = useData();
    const banner = pageBanners.find(b => b.page === page);
    const [scrollPos, setScrollPos] = useState(0);

    // Logic: Use force override first, then database banner, then fallback.
    const title = forceTitle || banner?.title || fallbackTitle || '';
    const description = forceDescription || banner?.description || fallbackDescription || '';
    const imageUrl = banner?.imageUrl || fallbackImage || 'https://images.pexels.com/photos/8365691/pexels-photo-8365691.jpeg';

    useEffect(() => {
        const handleScroll = () => {
            setScrollPos(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scale = 1 + (scrollPos / 5000);

    return (
        <section className="relative h-[35vh] min-h-[250px] lg:h-[40vh] bg-black text-white text-center flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img 
                    src={imageUrl} 
                    alt={title} 
                    style={{ transform: `scale(${Math.min(scale, 1.15)})` }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
                />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/30 z-10"></div>
            <div className="absolute inset-0 bg-black/50 z-10 backdrop-blur-[1px]"></div>
            
            <div className="relative z-20 px-6 max-w-6xl">
                {/* Reduced from text-2xl/3xl/4xl to text-xl/2xl/3xl */}
                <h1 className="font-eurostile font-bold text-xl md:text-2xl lg:text-3xl tracking-widest uppercase leading-[0.95] animate-fade-in-up [animation-delay:200ms] drop-shadow-2xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-4 text-[9px] md:text-[10px] max-w-xl mx-auto text-white/60 font-medium leading-relaxed uppercase tracking-[0.3em] animate-fade-in-up [animation-delay:400ms] antialiased">
                        {description}
                    </p>
                )}
            </div>
        </section>
    );
};

export default PageHeader;
