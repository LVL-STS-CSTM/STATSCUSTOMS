
import React, { useState, useMemo } from 'react';
import { Product, Color, Material, View } from '../types';
import ProductGrid from './ProductGrid';
import SizeGuideModal from './SizeGuideModal';
import { RulerIcon, PlusIcon, MinusIcon } from './icons';
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
 * @description Product detail page component that is optimized for responsiveness and touch interactions.
 */
const ProductPage: React.FC<ProductPageProps> = ({ product, initialColorName, onNavigate, showToast, materials, allProducts, onProductClick }) => {
    const { addToQuote } = useQuote();
    const sectionLabelClasses = "text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-3 block";

    const defaultColor = useMemo(() => {
        if (!product || !product.availableColors) return null;
        const colors = product.availableColors.filter(c => !!c);
        if (initialColorName) {
            return colors.find(c => c.name && c.name.toLowerCase() === initialColorName.toLowerCase()) || colors[0] || null;
        }
        return colors[0] || null;
    }, [product, initialColorName]);

    const [selectedColor, setSelectedColor] = useState<Color | null>(defaultColor);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: number }>({});
    
    const imagesForDisplay = useMemo(() => {
        if (!product) return [];
        const imageUrls = product.imageUrls || {};
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

    const handleAddSize = (sizeName: string) => {
        setSelectedSizes(prev => ({
            ...prev,
            [sizeName]: (prev[sizeName] || 0) + 1
        }));
    };

    const handleRemoveSize = (sizeName: string) => {
        setSelectedSizes(prev => {
            const next = { ...prev };
            if (next[sizeName] > 1) {
                next[sizeName] -= 1;
            } else {
                delete next[sizeName];
            }
            return next;
        });
    };

    const handleAddToQuote = () => {
        if (!selectedColor) {
            showToast("Please select a color.");
            return;
        }
        if (Object.keys(selectedSizes).length === 0) {
            showToast("Please select at least one size.");
            return;
        }
        
        addToQuote(product, selectedColor, selectedSizes);
        showToast(`Added ${product.name} to your inquiry list.`);
        setSelectedSizes({});
    };

    if (!product) return null;

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-12">
                {/* Main Product Layout - Changed to 50/50 Split for better scaling */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 xl:gap-24">
                    
                    {/* LEFT: Product Images Gallery */}
                    <div className="flex flex-col gap-4">
                        {/* Main Image */}
                        <div className="w-full aspect-[3/4] overflow-hidden bg-zinc-50 border border-zinc-100 rounded-lg shadow-sm">
                            <img 
                                src={imagesForDisplay[activeImageIndex] || 'https://placehold.co/800x1000?text=No+Image'} 
                                alt={product.name} 
                                className="w-full h-full object-cover transition-opacity duration-500"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
                            {imagesForDisplay.map((url, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`relative aspect-[3/4] w-20 flex-shrink-0 overflow-hidden border-2 transition-all rounded-md ${activeImageIndex === idx ? 'border-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={url} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Product Details - Sticky on Desktop */}
                    <div className="relative">
                        <div className="lg:sticky lg:top-24 space-y-10 md:space-y-12">
                            <section>
                                <div className="flex flex-col gap-2 mb-6">
                                    <div className="flex justify-between items-start">
                                        <span className={sectionLabelClasses}>{product.categoryGroup} / {product.category}</span>
                                        {product.price && (
                                            <span className="font-oswald text-xl font-bold text-black">₱{product.price.toLocaleString()}</span>
                                        )}
                                    </div>
                                    <h1 className="font-eurostile font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-widest text-gray-900 leading-[0.9]">{product.name}</h1>
                                </div>
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed antialiased font-light">{product.description}</p>
                            </section>

                            {/* Color Selection */}
                            <section>
                                <span className={sectionLabelClasses}>Select Color: <span className="text-black">{selectedColor?.name}</span></span>
                                <div className="flex flex-wrap gap-4">
                                    {product.availableColors.map(color => (
                                        <button
                                            key={color.name}
                                            onClick={() => {
                                                setSelectedColor(color);
                                                setActiveImageIndex(0);
                                            }}
                                            className={`group relative w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor?.name === color.name ? 'border-black p-1' : 'border-zinc-200'}`}
                                            aria-label={`Select color ${color.name}`}
                                        >
                                            <span className="w-full h-full rounded-full border border-zinc-100 shadow-inner" style={{ backgroundColor: color.hex }}></span>
                                            {selectedColor?.name === color.name && (
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full"></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* Size Selection */}
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <span className={sectionLabelClasses}>Select Sizes & Quantity</span>
                                    <button 
                                        onClick={() => setIsSizeGuideOpen(true)}
                                        className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors border-b border-zinc-200 hover:border-black pb-0.5"
                                    >
                                        <RulerIcon className="w-4 h-4" />
                                        Size Guide
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {product.availableSizes.map(size => (
                                        <div key={size.name} className={`flex flex-col justify-between border rounded-xl p-3 transition-all ${selectedSizes[size.name] > 0 ? 'border-black bg-zinc-50' : 'border-zinc-200 bg-white hover:border-zinc-300'}`}>
                                            <span className="text-xs font-black uppercase tracking-wider mb-3 text-center">{size.name}</span>
                                            <div className="flex items-center justify-between gap-2">
                                                <button 
                                                    onClick={() => handleRemoveSize(size.name)} 
                                                    className="w-8 h-8 flex items-center justify-center bg-white border border-zinc-200 rounded-full text-zinc-400 hover:text-black hover:border-black transition-colors"
                                                    disabled={!selectedSizes[size.name]}
                                                >
                                                    <MinusIcon className="w-3 h-3" />
                                                </button>
                                                
                                                <span className="text-sm font-mono font-black text-center w-6">
                                                    {selectedSizes[size.name] || 0}
                                                </span>
                                                
                                                <button 
                                                    onClick={() => handleAddSize(size.name)} 
                                                    className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full hover:bg-zinc-800 transition-all"
                                                >
                                                    <PlusIcon className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Action Buttons */}
                            <section className="space-y-4 pt-4">
                                <button 
                                    onClick={handleAddToQuote}
                                    className="w-full py-5 bg-black text-white font-black uppercase tracking-[0.3em] text-[11px] rounded-full hover:scale-[1.02] transition-transform shadow-xl flex items-center justify-center gap-3"
                                >
                                    <span>Add to Inquiry List</span>
                                </button>
                                {product.moq && (
                                    <p className="text-center text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                                        Minimum Order Quantity: <span className="text-zinc-900">{product.moq} pieces</span>
                                    </p>
                                )}
                            </section>

                            {/* Technical Details Accordion-like look */}
                            <section className="border-t border-zinc-100 pt-8 grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-2">Material</h4>
                                    <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">{materialName}</p>
                                </div>
                                {product.leadTimeWeeks && (
                                    <div>
                                        <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-2">Lead Time</h4>
                                        <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">{product.leadTimeWeeks} Weeks</p>
                                    </div>
                                )}
                                {product.supportedPrinting && product.supportedPrinting.length > 0 && (
                                    <div className="col-span-2">
                                        <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-2">Best For</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {product.supportedPrinting.map(method => (
                                                <span key={method} className="px-2 py-1 bg-zinc-100 rounded text-[9px] font-bold uppercase tracking-wide text-zinc-600">
                                                    {method}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                </div>

                {/* RELATED PRODUCTS */}
                {relatedProducts.length > 0 && (
                    <section className="mt-32 pt-20 border-t border-zinc-100">
                        <div className="text-center mb-16">
                            <span className={sectionLabelClasses}>Complementary Gear</span>
                            <h2 className="font-eurostile font-black text-3xl md:text-4xl uppercase tracking-tighter">Complete The Look</h2>
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

            <div className="mt-20">
                <CallToAction onNavigate={onNavigate} />
            </div>
        </div>
    );
};

export default ProductPage;
