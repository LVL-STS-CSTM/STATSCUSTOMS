
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
    const [scrollPos, setScrollPos] = useState(0);

    // LOGIC:
    // 1. Look for a banner that explicitly matches the category name (forceTitle) first.
    // 2. Look for a banner that matches the page ID (e.g. 'catalogue').
    const specificBanner = forceTitle ? pageBanners.find(b => b.page === forceTitle) : null;
    const genericBanner = pageBanners.find(b => b.page === page);
    
    const activeBanner = specificBanner || genericBanner;

    // Title Priority: Specific Banner Title -> Force Title (Category Name) -> Generic Banner Title -> Fallback
    // Allow empty titles from banners if the user intentionally removed them.
    let title = '';
    if (specificBanner && specificBanner.title != null) {
        title = specificBanner.title;
    } else if (forceTitle) {
        title = forceTitle;
    } else if (genericBanner && genericBanner.title != null) {
        title = genericBanner.title;
    } else {
        title = fallbackTitle || '';
    }
    
    // Description Priority: Allow empty strings from user configuration if the user intentionally removed it.
    // Order: Specific Banner (Category) -> Force Desc -> Generic Banner (Page) -> Fallback
    let description = '';
    if (specificBanner && specificBanner.description != null) {
        description = specificBanner.description;
    } else if (forceDescription) {
        description = forceDescription;
    } else if (genericBanner && genericBanner.description != null) {
        description = genericBanner.description;
    } else {
        description = fallbackDescription || '';
    }
    
    // Image Priority: Active Banner Image -> Fallback -> Default
    const imageUrl = activeBanner?.imageUrl || fallbackImage || 'https://images.pexels.com/photos/8365691/pexels-photo-8365691.jpeg';

    useEffect(() => {
        const handleScroll = () => {
            setScrollPos(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scale = 1 + (scrollPos / 5000);

    return (
        <section className="relative h-[65vh] min-h-[450px] lg:h-[75vh] bg-black text-white text-center flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img 
                    src={imageUrl} 
                    alt={title} 
                    style={{ transform: `scale(${Math.min(scale, 1.15)})` }}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
                />
            </div>
            
            <div className="relative z-20 px-6 max-w-6xl">
                <h1 className="font-eurostile text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-[0.95] animate-fade-in-up [animation-delay:200ms] drop-shadow-2xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-4 text-[10px] md:text-xs max-w-xl mx-auto text-white/60 font-grotesk font-bold leading-relaxed uppercase tracking-[0.5em] animate-fade-in-up [animation-delay:400ms] antialiased">
                        {description}
                    </p>
                )}
            </div>
        </section>
    );
};

export default PageHeader;
