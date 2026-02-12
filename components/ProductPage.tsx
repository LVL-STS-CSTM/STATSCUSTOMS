
import React, { useState, useMemo } from 'react';
import { Product, Color, Material, View } from '../types';
import ProductGrid from './ProductGrid';
import SizeGuideModal from './SizeGuideModal';
import { useQuote } from '../context/CartContext';
import CallToAction from './CallToAction';

interface ProductPageProps {
    product: Product;
    initialColorName?: string | null;
    onNavigate: (page: View, value?: string | null, color?: string | null) => void;
    showToast: (message: string) => void;
    materials: Material[];
    allProducts: Product[];
    onProductClick: (product: Product) => void;
}

/**
 * @description Product detail page component re-engineered for a simple, premium aesthetic.
 * Removes complex selectors in favor of a specification list.
 */
const ProductPage: React.FC<ProductPageProps> = ({ product, initialColorName, onNavigate, showToast, materials, allProducts, onProductClick }) => {
    const { addToQuote } = useQuote();

    const defaultColor = useMemo(() => {
        if (!product || !product.availableColors) return null;
        const colors = product.availableColors.filter(c => !!c);
        if (initialColorName) {
            return colors.find(c => c.name && c.name.toLowerCase() === initialColorName.toLowerCase()) || colors[0] || null;
        }
        return colors[0] || null;
    }, [product, initialColorName]);

    // We still track this for image display, even if selection UI is hidden/simplified
    const [selectedColor, setSelectedColor] = useState<Color | null>(defaultColor);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    
    const imagesForDisplay = useMemo(() => {
        if (!product) return [];
        const imageUrls = product.imageUrls || {};
        // Default to showing images for the selected color, or all if none/default
        if (selectedColor && selectedColor.name && imageUrls[selectedColor.name] && imageUrls[selectedColor.name].length > 0) {
            return imageUrls[selectedColor.name];
        }
        const allImages = Object.values(imageUrls);
        return allImages.length > 0 ? allImages.flat() : [];
    }, [selectedColor, product]);

    const materialName = useMemo(() => {
        if (!product || !materials) return 'Premium Technical Fabric';
        return materials.find(m => m.id === product.materialId)?.name || 'Premium Technical Fabric';
    }, [product, materials]);

    const relatedProducts = useMemo(() => {
        if (!allProducts || !product) return [];
        return allProducts
            .filter(p => p && p.category === product.category && p.id !== product.id)
            .slice(0, 4);
    }, [allProducts, product]);

    const handleAddToQuote = () => {
        // Since we removed specific selectors, we add generic/default values
        // The user will refine details during the quotation consultation process
        const colorToAdd = selectedColor || product.availableColors[0];
        // Default to 1 unit of the first available size just to get it in the list
        const defaultSize = product.availableSizes[0]?.name || 'One Size';
        const sizeQuantities = { [defaultSize]: product.moq || 1 }; // Default to MOQ or 1

        addToQuote(product, colorToAdd, sizeQuantities);
        showToast(`Added ${product.name} to inquiry list.`);
    };

    if (!product) return null;

    return (
        <div className="bg-white min-h-screen font-sans text-[#333]">
            <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* LEFT: Image Gallery (Vertical Thumbnails + Main) */}
                    <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4 lg:h-[80vh] lg:min-h-[600px] lg:max-h-[900px]">
                        {/* Vertical Thumbnails (Hidden on mobile, uses horizontal) */}
                        <div className="hidden lg:flex flex-col gap-4 overflow-y-auto no-scrollbar w-24 flex-shrink-0">
                            {imagesForDisplay.map((url, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`w-full aspect-[3/4] border transition-all ${activeImageIndex === idx ? 'border-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100 hover:border-zinc-200'}`}
                                >
                                    <img src={url} alt={`View ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Mobile Horizontal Thumbnails */}
                        <div className="flex lg:hidden gap-3 overflow-x-auto no-scrollbar pb-2">
                             {imagesForDisplay.map((url, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`w-20 aspect-[3/4] flex-shrink-0 border transition-all ${activeImageIndex === idx ? 'border-black' : 'border-transparent opacity-70'}`}
                                >
                                    <img src={url} alt={`View ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-grow bg-zinc-50 border border-zinc-100 relative overflow-hidden group cursor-zoom-in">
                            <img 
                                src={imagesForDisplay[activeImageIndex] || 'https://placehold.co/800x1000?text=No+Image'} 
                                alt={product.name} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* RIGHT: Product Details (Clean Text Layout) */}
                    <div className="lg:col-span-5 lg:pl-8 lg:sticky lg:top-24 h-fit">
                        <header className="mb-8">
                            <h1 className="font-heading text-4xl md:text-5xl text-black mb-6 uppercase tracking-tight leading-none">{product.name}</h1>
                            <div className="h-px w-full bg-zinc-200 mb-8"></div>
                            
                            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-2">
                                Best used for: <span className="text-black">{product.categoryGroup || 'Performance'}, {product.category}</span>
                            </p>
                        </header>

                        <div className="space-y-10">
                            {/* Static Specs List */}
                            <section>
                                <h3 className="font-bold text-black uppercase tracking-wider mb-6 text-sm">Customization:</h3>
                                <ul className="space-y-6 text-sm text-zinc-600 leading-relaxed">
                                    <li className="flex flex-col gap-1">
                                        <span className="font-bold text-black">1. Fabric Options:</span>
                                        <span>{materialName}. Available in 30+ colors.</span>
                                    </li>
                                    <li className="flex flex-col gap-1">
                                        <span className="font-bold text-black">2. Printing & Embroidery Options:</span>
                                        <span>{product.supportedPrinting && product.supportedPrinting.length > 0 ? product.supportedPrinting.join(', ') : 'Silk Screen Printing, Heat-press Printing, or Direct Embroidery'}</span>
                                    </li>
                                    <li className="flex flex-col gap-1">
                                        <span className="font-bold text-black">3. Available Sizes:</span>
                                        <div className="flex items-center gap-2">
                                            <span>
                                                {product.availableSizes.map(s => s.name).join(', ')}
                                                {product.availableSizes.length > 0 && ', or other Custom Sizes'}
                                            </span>
                                            <button 
                                                onClick={() => setIsSizeGuideOpen(true)}
                                                className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black border-b border-zinc-200 hover:border-black ml-2"
                                            >
                                                View Chart
                                            </button>
                                        </div>
                                    </li>
                                    <li className="flex flex-col gap-1">
                                        <span className="font-bold text-black">4. Minimum Order Quantity:</span>
                                        <span>{product.moq || 24} pieces</span>
                                    </li>
                                </ul>
                            </section>

                            <div className="h-px w-full bg-zinc-100"></div>

                            <p className="text-xs text-zinc-400 italic leading-relaxed">
                                Note: Products featured are sample works only. Stats Customs works to help you turn your designs into actual garments you can use, no matter how unique.
                            </p>

                            <button 
                                onClick={handleAddToQuote}
                                className="w-full py-5 bg-black text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 transition-all shadow-xl"
                            >
                                ADD TO REQUISITION LIST
                            </button>
                        </div>
                    </div>
                </div>

                {/* RELATED PRODUCTS */}
                {relatedProducts.length > 0 && (
                    <section className="mt-32 pt-20 border-t border-zinc-100">
                        <div className="text-center mb-16">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-3 block">Recommended Gear</span>
                            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tighter">Tactical Loadout</h2>
                        </div>
                        <ProductGrid products={relatedProducts} onProductClick={onProductClick} />
                    </section>
                )}
            </div>

            <SizeGuideModal 
                isOpen={isSizeGuideOpen} 
                onClose={() => setIsSizeGuideOpen(false)} 
                productName={product.name} 
                sizes={product.availableSizes} 
            />

            <div className="mt-0">
                <CallToAction onNavigate={onNavigate} />
            </div>
        </div>
    );
};

export default ProductPage;
