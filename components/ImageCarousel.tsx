import React, { useState } from 'react';
import LazyImage from './LazyImage';
import { ChevronRightIcon, ChevronLeftIcon } from './icons';

interface ImageCarouselProps {
    images: string[];
    alt: string;
    aspectRatio?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, alt, aspectRatio = "aspect-[4/3]" }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // If no images or only one, just render the single LazyImage without controls
    if (!images || images.length === 0) {
        return <div className={`bg-gray-100 ${aspectRatio} w-full`}></div>;
    }
    
    if (images.length === 1) {
        return <LazyImage src={images[0]} alt={alt} aspectRatio={aspectRatio} />;
    }

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    // For touch swipe support
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe) {
            goToNext();
        }
        if (isRightSwipe) {
            goToPrevious();
        }
    };

    return (
        <div 
            className={`relative w-full overflow-hidden group ${aspectRatio}`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div 
                className="flex transition-transform duration-500 ease-out h-full w-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((src, idx) => (
                    <div key={idx} className="w-full flex-shrink-0 h-full relative">
                        <LazyImage src={src} alt={`${alt} - Image ${idx + 1}`} aspectRatio="h-full w-full object-cover" />
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/70 backdrop-blur-sm text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Previous image"
            >
                <ChevronLeftIcon size={20} />
            </button>
            
            <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/70 backdrop-blur-sm text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Next image"
            >
                <ChevronRightIcon size={20} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
