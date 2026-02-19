
import React, { useState, useMemo } from 'react';
import { Product, Color, Material, View } from '../types';
import ProductGrid from './ProductGrid';
import CallToAction from './CallToAction';
import Accordion from './Accordion';
import SizeGuideModal from './SizeGuideModal';
import { RulerIcon } from './icons';
import { useData } from '../context/DataContext';

interface ProductPageProps {
    product: Product;
    initialColorName?: string | null;
    onNavigate: (page: View, value?: string | null, color?: string | null) => void;
    showToast: (message: string) => void;
    materials: Material[];
    allProducts: Product[];
    onProductClick: (product: Product) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ product, initialColorName, onNavigate, materials, allProducts, onProductClick }) => {
    const { productFeatures } = useData();
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

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
    
    const imagesForDisplay = useMemo(() => {
        if (!product) return [];
        const imageUrls = product.imageUrls || {};
        if (selectedColor && selectedColor.name && imageUrls[selectedColor.name] && imageUrls[selectedColor.name].length > 0) {
            return imageUrls[selectedColor.name];
        }
        const allImages = Object.values(imageUrls);
        return allImages.length > 0 ? allImages.flat() : [];
    }, [selectedColor, product]);

    const material = useMemo(() => {
        if (!product || !materials) return null;
        return materials.find(m => m.id === product.materialId);
    }, [product, materials]);

    const relatedProducts = useMemo(() => {
        if (!allProducts || !product) return [];
        return allProducts
            .filter(p => p && p.category === product.category && p.id !== product.id)
            .slice(0, 4);
    }, [allProducts, product]);

    if (!product) return null;

    return (
        <div className="bg-white min-h-screen font-sans text-[#111]">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-16">
                
                {/* Back Navigation */}
                <button 
                    onClick={() => onNavigate('catalogue')}
                    className="mb-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors flex items-center gap-2 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Catalogue
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    
                    {/* LEFT: Gallery Section */}
                    <div className="lg:col-span-8 flex flex-col-reverse lg:flex-row gap-4 h-fit">
                        {/* Vertical Thumbnails (Desktop) / Horizontal (Mobile) */}
                        <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:h-[80vh] no-scrollbar shrink-0">
                            {imagesForDisplay.map((url, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`relative w-20 lg:w-24 aspect-[3/4] shrink-0 border transition-all duration-300 overflow-hidden ${activeImageIndex === idx ? 'border-black opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
                                >
                                    <img src={url} alt={`View ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image - Updated to object-contain to prevent zoom/crop */}
                        <div className="flex-grow bg-zinc-50 relative overflow-hidden aspect-[3/4] lg:h-[80vh] flex items-center justify-center cursor-zoom-in">
                            <img 
                                src={imagesForDisplay[activeImageIndex] || 'https://placehold.co/800x1000?text=No+Image'} 
                                alt={product.name} 
                                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* RIGHT: Product Info & Details */}
                    <div className="lg:col-span-4 flex flex-col h-full sticky top-24">
                        <header className="mb-8 border-b border-zinc-100 pb-8">
                            <h1 className="font-eurostile font-bold text-3xl md:text-4xl lg:text-5xl text-black mb-2 uppercase tracking-tight leading-none">{product.name}</h1>
                            {/* Price removed as requested */}
                            <div className="flex items-center justify-end mt-6">
                                <button 
                                    onClick={() => setIsSizeGuideOpen(true)}
                                    className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-zinc-600 hover:border-zinc-600 transition-all"
                                >
                                    <RulerIcon className="w-4 h-4" /> Size Guide
                                </button>
                            </div>
                        </header>

                        {/* Color Selection */}
                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Color</label>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">{selectedColor?.name}</span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {product.availableColors.map((color) => {
                                    const colorImage = product.imageUrls[color.name]?.[0] || imagesForDisplay[0];
                                    return (
                                        <button
                                            key={color.name}
                                            onClick={() => {
                                                setSelectedColor(color);
                                                setActiveImageIndex(0);
                                            }}
                                            className={`w-12 h-16 border transition-all duration-300 p-0.5 ${
                                                selectedColor?.name === color.name 
                                                ? 'border-black scale-110' 
                                                : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                            title={color.name}
                                        >
                                            <div className="w-full h-full bg-zinc-100 relative overflow-hidden">
                                                <img src={colorImage} alt={color.name} className="w-full h-full object-cover" />
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Accordion Details */}
                        <div className="border-t border-zinc-100">
                            <Accordion title="DESCRIPTION">
                                <div className="pb-4 text-sm leading-relaxed text-zinc-600 font-light">
                                    {product.description}
                                </div>
                            </Accordion>
                            
                            <Accordion title="DESIGNED FOR">
                                <div className="pb-4 text-sm leading-relaxed text-zinc-600 font-light">
                                    <ul className="space-y-2">
                                        <li className="flex justify-between">
                                            <span className="font-bold text-black uppercase text-[10px] tracking-widest">Category</span>
                                            <span>{product.categoryGroup} / {product.category}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="font-bold text-black uppercase text-[10px] tracking-widest">Fit</span>
                                            <span>{product.gender}</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="font-bold text-black uppercase text-[10px] tracking-widest">Min Order</span>
                                            <span>{product.moq || 24} Units</span>
                                        </li>
                                    </ul>
                                </div>
                            </Accordion>

                            <Accordion title="FABRIC + TECHNOLOGY">
                                <div className="pb-4 space-y-4">
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-black mb-1">Primary Material</h4>
                                        <p className="text-sm text-zinc-600">{material?.name || 'Premium Technical Fabric'}</p>
                                        <p className="text-xs text-zinc-400 mt-1">{material?.description || 'Engineered for durability.'}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-black mb-2">Features</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {(material?.features || ['Breathable', 'Durable']).map(f => (
                                                <span key={f} className="px-2 py-1 bg-zinc-100 text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Dynamic Product Features */}
                                    {product.features && product.features.length > 0 && (
                                        <div className="pt-4 border-t border-zinc-100 mt-4">
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-black mb-3">Specific Tech Specs</h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                {product.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        {feature.imageUrl && (
                                                            <img src={feature.imageUrl} alt={feature.name} className="w-8 h-8 object-cover rounded bg-zinc-50" />
                                                        )}
                                                        <div>
                                                            <span className="block text-[9px] font-bold uppercase tracking-wider text-black">{feature.name}</span>
                                                            <span className="block text-[9px] text-zinc-500">{feature.value}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Accordion>
                        </div>
                    </div>
                </div>

                {/* 3-CARD FEATURE SECTION */}
                <section className="mt-32 border-t border-zinc-100 pt-16">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-12 text-center">Product Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {productFeatures.sort((a,b) => (a.displayOrder || 0) - (b.displayOrder || 0)).map((feature, idx) => (
                            <div key={feature.id || idx} className="space-y-6 text-center">
                                <div className="aspect-[3/4] bg-zinc-50 w-full overflow-hidden">
                                    <img src={feature.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" alt={feature.title} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-widest mb-2">{feature.title}</h4>
                                    <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mx-auto">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                        {productFeatures.length === 0 && <p className="col-span-3 text-center text-xs text-zinc-400">No features configured.</p>}
                    </div>
                </section>

                {/* RELATED PRODUCTS */}
                {relatedProducts.length > 0 && (
                    <section className="mt-32 pt-20 border-t border-zinc-100">
                        <div className="flex justify-between items-end mb-12">
                            <h2 className="font-eurostile font-bold text-2xl md:text-3xl uppercase tracking-tight">Complete the Kit</h2>
                            <button onClick={() => onNavigate('catalogue')} className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-zinc-600 hover:border-zinc-600 transition-colors">View All</button>
                        </div>
                        <ProductGrid products={relatedProducts} onProductClick={onProductClick} />
                    </section>
                )}
            </div>

            <div className="mt-0">
                <CallToAction onNavigate={onNavigate} />
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

export default ProductPage;
