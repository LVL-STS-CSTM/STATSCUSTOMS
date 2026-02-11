
import React, { useState, useMemo } from 'react';
import { Product, Color, Material, View } from '../types';
import ProductGrid from './ProductGrid';
import SizeGuideModal from './SizeGuideModal';
import { RulerIcon } from './icons';
// Added missing context import to handle adding items to the inquiry list
import { useQuote } from '../context/CartContext';

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
 * @description Product detail page component that allows users to select colors, sizes, and add to their inquiry list.
 */
const ProductPage: React.FC<ProductPageProps> = ({ product, initialColorName, onNavigate, showToast, materials, allProducts, onProductClick }) => {
    // FIX: Access addToQuote from CartContext
    const { addToQuote } = useQuote();
    const sectionLabelClasses = "text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-3 block";

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
    // FIX: State to track selected quantities for each size
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
                    
                    {/* LEFT: Product Images Gallery */}
                    <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
                        {/* Thumbnails */}
                        <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-y-auto max-h-[800px] no-scrollbar pr-2 min-w-[80px]">
                            {imagesForDisplay.map((url, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`relative aspect-[3/4] w-20 md:w-full overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-black' : 'border-transparent'}`}
                                >
                                    <img src={url} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="order-1 md:order-2 flex-grow aspect-[3/4] overflow-hidden bg-zinc-50 border border-zinc-100 rounded-sm">
                            <img 
                                src={imagesForDisplay[activeImageIndex] || 'https://placehold.co/800x1000?text=No+Image'} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* RIGHT: Product Details */}
                    <div className="lg:col-span-5 space-y-10">
                        <section>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className={sectionLabelClasses}>{product.categoryGroup} / {product.category}</span>
                                    <h1 className="font-eurostile font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-widest text-gray-900 leading-tight">{product.name}</h1>
                                </div>
                                {product.price && (
                                    <span className="font-oswald text-2xl font-bold">₱{product.price.toLocaleString()}</span>
                                )}
                            </div>
                            <p className="text-gray-600 leading-relaxed max-w-xl">{product.description}</p>
                        </section>

                        {/* Color Selection */}
                        <section>
                            <span className={sectionLabelClasses}>Select Color: {selectedColor?.name}</span>
                            <div className="flex flex-wrap gap-3">
                                {product.availableColors.map(color => (
                                    <button
                                        key={color.name}
                                        onClick={() => {
                                            setSelectedColor(color);
                                            setActiveImageIndex(0);
                                        }}
                                        className={`group relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor?.name === color.name ? 'border-black p-0.5' : 'border-transparent'}`}
                                        title={color.name}
                                    >
                                        <span className="w-full h-full rounded-full border border-zinc-100" style={{ backgroundColor: color.hex }}></span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Size Selection */}
                        <section>
                            <div className="flex justify-between items-center mb-3">
                                <span className={sectionLabelClasses}>Select Sizes</span>
                                <button 
                                    onClick={() => setIsSizeGuideOpen(true)}
                                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
                                >
                                    <RulerIcon className="w-3.5 h-3.5" />
                                    Size Guide
                                </button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {product.availableSizes.map(size => (
                                    <div key={size.name} className="flex items-center justify-between border border-zinc-200 rounded-lg p-3 group hover:border-black transition-colors">
                                        <span className="text-xs font-black uppercase">{size.name}</span>
                                        <div className="flex items-center gap-3">
                                            {(selectedSizes[size.name] || 0) > 0 && (
                                                <button onClick={() => handleRemoveSize(size.name)} className="text-zinc-300 hover:text-black font-bold">-</button>
                                            )}
                                            <span className={`text-xs font-mono font-bold ${(selectedSizes[size.name] || 0) > 0 ? 'text-black' : 'text-zinc-300'}`}>
                                                {selectedSizes[size.name] || 0}
                                            </span>
                                            <button onClick={() => handleAddSize(size.name)} className="text-zinc-300 hover:text-black font-bold">+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Action Buttons */}
                        <section className="pt-6 space-y-4">
                            <button 
                                onClick={handleAddToQuote}
                                className="w-full py-5 bg-black text-white font-black uppercase tracking-[0.3em] text-[11px] rounded-full hover:bg-zinc-800 transition-all shadow-2xl active:scale-95"
                            >
                                Add to Inquiry List
                            </button>
                            {product.moq && (
                                <p className="text-center text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                                    Minimum Order Quantity: {product.moq} pcs
                                </p>
                            )}
                        </section>

                        {/* Technical Details */}
                        <section className="border-t border-zinc-100 pt-10 space-y-6">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Technical Material</h4>
                                <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">{materialName}</p>
                            </div>
                            {product.supportedPrinting && product.supportedPrinting.length > 0 && (
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Compatible Finishes</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.supportedPrinting.map(method => (
                                            <span key={method} className="px-3 py-1 bg-zinc-50 border border-zinc-100 rounded text-[9px] font-black uppercase tracking-widest text-zinc-400">
                                                {method}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>
                </div>

                {/* RELATED PRODUCTS */}
                {relatedProducts.length > 0 && (
                    <section className="mt-32 pt-24 border-t border-zinc-100">
                        <div className="text-center mb-16">
                            <span className={sectionLabelClasses}>More like this</span>
                            <h2 className="font-eurostile font-black text-3xl uppercase tracking-tighter">Related Gear</h2>
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
        </div>
    );
};

// FIX: Added missing default export
export default ProductPage;
