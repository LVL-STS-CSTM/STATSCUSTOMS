
import React, { useState, useMemo } from 'react';
import { Product, Color, Material, View } from '../types';
import ProductGrid from './ProductGrid';
import SizeGuideModal from './SizeGuideModal';
import { RulerIcon } from './icons';

interface ProductPageProps {
    product: Product;
    initialColorName?: string | null;
    onNavigate: (page: View, value?: string | null, color?: string | null) => void;
    showToast: (message: string) => void;
    materials: Material[];
    allProducts: Product[];
    onProductClick: (product: Product) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ product, initialColorName, onNavigate, showToast, materials, allProducts, onProductClick }) => {
    const sectionLabelClasses = "text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2 block";

    // Determine default color based on URL param or availability
    const defaultColor = useMemo(() => {
        if (!product || !product.availableColors) return null;
        const colors = product.availableColors.filter(c => !!c); // Filter out nulls
        if (initialColorName) {
            return colors.find(c => c.name && c.name.toLowerCase() === initialColorName.toLowerCase()) || colors[0] || null;
        }
        return colors[0] || null;
    }, [product, initialColorName]);

    const [selectedColor, setSelectedColor] = useState<Color | null>(defaultColor);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    
    // Filter images based on selected color with robust null checking
    const imagesForDisplay = useMemo(() => {
        if (!product) return [];
        const imageUrls = product.imageUrls || {};
        
        // Safety check if selectedColor is valid and has images
        if (selectedColor && selectedColor.name && imageUrls[selectedColor.name] && imageUrls[selectedColor.name].length > 0) {
            return imageUrls[selectedColor.name];
        }
        
        // Fallback to all images if no specific color selected or no images for color
        const allImages = Object.values(imageUrls);
        if (allImages.length > 0) {
            return allImages.flat();
        }
        
        return [];
    }, [selectedColor, product]);

    // Lookup material name safely
    const materialName = useMemo(() => {
        if (!product || !materials) return 'Premium Technical Fabric';
        return materials.find(m => m.id === product.materialId)?.name || 'Premium Technical Fabric';
    }, [product, materials]);

    // Get related products (same category) safely
    const relatedProducts = useMemo(() => {
        if (!allProducts || !product) return [];
        return allProducts
            .filter(p => p && p.category === product.category && p.id !== product.id)
            .slice(0, 4);
    }, [allProducts, product]);

    if (!product) return null;

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    
                    {/* LEFT: Product Images Gallery */}
                    <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
                        <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-20 shrink-0 h-fit py-2 md:py-0">
                            {imagesForDisplay.map((url, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => setActiveImageIndex(i)}
                                    className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImageIndex === i ? 'border-black opacity-100 scale-100' : 'border-transparent opacity-50 hover:opacity-80 scale-95 hover:scale-100'}`}
                                >
                                    <img src={url} className="w-full h-full object-cover" alt="" />
                                </button>
                            ))}
                        </div>

                        <div className="order-1 md:order-2 flex-grow rounded-[2rem] overflow-hidden bg-zinc-50 border border-zinc-100 aspect-[4/5] shadow-sm relative group cursor-zoom-in">
                            <img 
                                src={imagesForDisplay[activeImageIndex] || imagesForDisplay[0] || 'https://placehold.co/600x800?text=No+Image'} 
                                alt={product.name} 
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                            />
                        </div>
                    </div>

                    {/* RIGHT: Product Details (Catalog View) */}
                    <div className="lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-24 space-y-10">
                            <header className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1.5 bg-zinc-100 text-[9px] font-black uppercase tracking-[0.2em] rounded-md text-zinc-600">{product.category}</span>
                                </div>
                                
                                <h1 className="font-eurostile text-4xl md:text-5xl lg:text-6xl text-zinc-900 uppercase tracking-tighter leading-[0.9] drop-shadow-sm">
                                    {product.name}
                                </h1>
                                
                                <p className="text-sm md:text-base text-zinc-500 leading-relaxed font-light antialiased border-l-2 border-zinc-200 pl-6 max-w-lg">
                                    {product.description}
                                </p>
                            </header>

                            {/* Visual Variants (Colors) */}
                            <div>
                                <span className={sectionLabelClasses}>Visual Styles</span>
                                <div className="flex flex-wrap gap-3">
                                    {(product.availableColors || []).map(color => (
                                        // Ensure color is defined before rendering
                                        color && color.name ? (
                                            <button 
                                                key={color.name}
                                                onClick={() => setSelectedColor(color)}
                                                className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${selectedColor?.name === color.name ? 'ring-2 ring-black ring-offset-2 scale-110' : 'hover:scale-110 opacity-80 hover:opacity-100'}`}
                                                title={color.name}
                                            >
                                                <div className="w-full h-full rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: color.hex }}></div>
                                                <span className="absolute -bottom-8 bg-black text-white text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-wider z-10">{color.name}</span>
                                            </button>
                                        ) : null
                                    ))}
                                </div>
                            </div>

                            {/* Materials & Fabrics */}
                            <div className="pt-8 border-t border-zinc-100">
                                <span className={sectionLabelClasses}>Material & Fabric</span>
                                <p className="text-lg font-eurostile font-bold text-zinc-900 uppercase tracking-wide">{materialName}</p>
                            </div>

                            {/* Actions: Size Chart Only */}
                            <div className="pt-4">
                                <button 
                                    onClick={() => setIsSizeGuideOpen(true)}
                                    className="w-full py-4 bg-white border border-zinc-200 text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:border-black hover:bg-zinc-50 transition-all flex items-center justify-center gap-2 group shadow-sm"
                                >
                                    <RulerIcon className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                                    <span>View Size Chart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32 pt-16 border-t border-zinc-100">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="font-eurostile text-2xl uppercase tracking-widest text-zinc-900">More from {product.categoryGroup}</h2>
                            <button onClick={() => onNavigate('catalogue', product.categoryGroup)} className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors">View All</button>
                        </div>
                        <ProductGrid products={relatedProducts} onProductClick={onProductClick} />
                    </div>
                )}
            </div>
            
            <SizeGuideModal 
                isOpen={isSizeGuideOpen} 
                onClose={() => setIsSizeGuideOpen(false)} 
                productName={product.name}
                sizes={product.availableSizes || []}
            />
        </div>
    );
};

export default ProductPage;
