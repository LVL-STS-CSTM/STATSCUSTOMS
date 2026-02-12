
import React, { useState, useMemo } from 'react';
import { Product, Color, Material, View } from '../types';
import ProductGrid from './ProductGrid';
import { useQuote } from '../context/CartContext';
import CallToAction from './CallToAction';
import LazyImage from './LazyImage';

interface ProductPageProps {
    product: Product;
    initialColorName?: string | null;
    onNavigate: (page: View, value?: string | null, color?: string | null) => void;
    showToast: (message: string) => void;
    materials: Material[];
    allProducts: Product[];
    onProductClick: (product: Product) => void;
}

type Tab = 'description' | 'size-chart' | 'fab-tech';

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

    const [selectedColor, setSelectedColor] = useState<Color | null>(defaultColor);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<Tab>('description');
    
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

    const handleAddToQuote = () => {
        const colorToAdd = selectedColor || product.availableColors[0];
        const defaultSize = product.availableSizes[0]?.name || 'One Size';
        const sizeQuantities = { [defaultSize]: product.moq || 1 }; 

        addToQuote(product, colorToAdd, sizeQuantities);
        showToast(`Added ${product.name} to inquiry list.`);
    };

    if (!product) return null;

    return (
        <div className="bg-white min-h-screen font-sans text-[#333]">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
                
                {/* Back Navigation - Matches Image 1 */}
                <button 
                    onClick={() => onNavigate('catalogue')}
                    className="mb-6 text-sm text-zinc-500 hover:text-black transition-colors flex items-center gap-2"
                >
                    <span>&larr;</span> Back to Catalogue
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                    
                    {/* LEFT: Image Gallery */}
                    <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4 h-fit sticky top-24">
                        {/* Vertical Thumbnails */}
                        <div className="hidden lg:flex flex-col gap-3 w-20 flex-shrink-0">
                            {imagesForDisplay.map((url, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`w-full aspect-[4/5] border transition-all duration-300 rounded-sm overflow-hidden ${activeImageIndex === idx ? 'border-black ring-1 ring-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
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
                                    className={`w-16 aspect-[4/5] flex-shrink-0 border transition-all rounded-sm overflow-hidden ${activeImageIndex === idx ? 'border-black ring-1 ring-black' : 'border-transparent opacity-70'}`}
                                >
                                    <img src={url} alt={`View ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="flex-grow bg-zinc-50 border border-zinc-100 relative overflow-hidden group cursor-zoom-in rounded-sm aspect-[4/5]">
                            <img 
                                src={imagesForDisplay[activeImageIndex] || 'https://placehold.co/800x1000?text=No+Image'} 
                                alt={product.name} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* RIGHT: Product Details */}
                    <div className="lg:col-span-5 flex flex-col h-full pt-2">
                        <header className="mb-8">
                            <h1 className="font-heading text-4xl md:text-5xl text-black mb-4 uppercase tracking-tighter leading-[0.9]">{product.name}</h1>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold font-mono">
                                    ₱{(product.price || 0).toLocaleString()}
                                </span>
                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest bg-zinc-50 px-3 py-1 rounded-full">
                                    {product.categoryGroup} / {product.category}
                                </span>
                            </div>
                        </header>

                        {/* TABS INTERFACE - Matches Image 2 */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 border-b border-zinc-100 pb-1 mb-6 overflow-x-auto no-scrollbar">
                                <button
                                    onClick={() => setActiveTab('description')}
                                    className={`px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                                        activeTab === 'description' 
                                        ? 'bg-black text-white shadow-lg' 
                                        : 'text-zinc-400 hover:text-black hover:bg-zinc-50'
                                    }`}
                                >
                                    Description
                                </button>
                                <button
                                    onClick={() => setActiveTab('size-chart')}
                                    className={`px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                                        activeTab === 'size-chart' 
                                        ? 'bg-black text-white shadow-lg' 
                                        : 'text-zinc-400 hover:text-black hover:bg-zinc-50'
                                    }`}
                                >
                                    Size Chart
                                </button>
                                <button
                                    onClick={() => setActiveTab('fab-tech')}
                                    className={`px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                                        activeTab === 'fab-tech' 
                                        ? 'bg-black text-white shadow-lg' 
                                        : 'text-zinc-400 hover:text-black hover:bg-zinc-50'
                                    }`}
                                >
                                    Fab-Tech
                                </button>
                            </div>

                            {/* Tab Content Area */}
                            <div className="min-h-[200px] animate-fade-in">
                                {activeTab === 'description' && (
                                    <div className="prose prose-sm max-w-none text-zinc-600 leading-relaxed font-light text-base">
                                        <p>{product.description}</p>
                                        <p className="mt-4 text-xs text-zinc-400 font-medium uppercase tracking-wider">
                                            Designed for: {product.gender} • MOQ: {product.moq || 24} Units
                                        </p>
                                    </div>
                                )}

                                {activeTab === 'size-chart' && (
                                    <div>
                                        <div className="overflow-x-auto rounded-lg border border-zinc-100">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-zinc-50 text-xs font-bold uppercase text-zinc-500 tracking-wider">
                                                    <tr>
                                                        <th className="px-4 py-3">Size</th>
                                                        <th className="px-4 py-3">Chest (in)</th>
                                                        <th className="px-4 py-3">Length (in)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-zinc-50">
                                                    {product.availableSizes.map(size => (
                                                        <tr key={size.name} className="hover:bg-zinc-50/50">
                                                            <td className="px-4 py-3 font-bold text-black">{size.name}</td>
                                                            <td className="px-4 py-3 font-mono text-zinc-600">{size.width}"</td>
                                                            <td className="px-4 py-3 font-mono text-zinc-600">{size.length}"</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <p className="text-[10px] text-zinc-400 mt-3 italic">Measurements are approximate guidelines.</p>
                                    </div>
                                )}

                                {activeTab === 'fab-tech' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-widest text-black mb-2">Primary Material</h4>
                                            <p className="text-sm text-zinc-600">{material?.name || 'Premium Technical Fabric'}</p>
                                            <p className="text-xs text-zinc-400 mt-1">{material?.description || 'Engineered for durability and comfort.'}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-widest text-black mb-2">Supported Applications</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {(product.supportedPrinting || ['Screen Print', 'Embroidery', 'Heat Transfer']).map(tech => (
                                                    <span key={tech} className="px-3 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Area */}
                        <div className="mt-auto pt-8 border-t border-zinc-100">
                            <button 
                                onClick={handleAddToQuote}
                                className="w-full py-5 bg-black text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl rounded-lg flex items-center justify-center gap-3"
                            >
                                <span>Add to Requisition List</span>
                                <span className="w-px h-3 bg-white/20"></span>
                                <span className="opacity-60 font-normal">Request Quote</span>
                            </button>
                            <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-4">
                                Secure Inquiry • Official Documentation Provided
                            </p>
                        </div>
                    </div>
                </div>

                {/* RELATED PRODUCTS */}
                {relatedProducts.length > 0 && (
                    <section className="mt-32 pt-20 border-t border-zinc-100">
                        <div className="text-center mb-16">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-3 block">Complete The Look</span>
                            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tighter">Tactical Loadout</h2>
                        </div>
                        <ProductGrid products={relatedProducts} onProductClick={onProductClick} />
                    </section>
                )}
            </div>

            <div className="mt-0">
                <CallToAction onNavigate={onNavigate} />
            </div>
        </div>
    );
};

export default ProductPage;
