import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Material } from '../types';
import MaterialCareModal from './MaterialCareModal';
import PageHeader from './PageHeader';
import LazyImage from './LazyImage';
import { motion, useInView } from 'framer-motion';

const TechnicalFeature: React.FC<{ label: string; index: number }> = ({ label, index }) => (
    <motion.div 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 py-2 border-b border-zinc-100 group"
    >
        <div className="w-1.5 h-1.5 bg-black rounded-full" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-black transition-colors">
            {label}
        </span>
    </motion.div>
);

const MaterialSection: React.FC<{ material: Material; index: number; openCareModal: (url?: string) => void }> = ({ material, index, openCareModal }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden border-b border-zinc-100 last:border-0">
            {/* Background Number Accent */}
            <div className="absolute right-0 top-0 text-[20vw] font-black text-zinc-50 leading-none select-none -z-10 pointer-events-none opacity-50">
                0{index + 1}
            </div>

            <div className={`container mx-auto px-4 flex flex-col lg:flex-row items-stretch gap-12 lg:gap-24 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image Section */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full lg:w-1/2 relative"
                >
                    <div className="relative z-10 group overflow-hidden bg-zinc-100">
                        <div className="absolute inset-0 border-[1px] border-black/5 z-20 pointer-events-none" />
                        
                        <div className="transition-transform duration-1000 group-hover:scale-105">
                            <LazyImage 
                                src={material.imageUrl} 
                                alt={material.name} 
                                aspectRatio="aspect-[4/5] lg:aspect-[3/4]" 
                                className="grayscale hover:grayscale-0 transition-all duration-700" 
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-black text-black mb-8 leading-tight uppercase font-heading tracking-tight">
                            {material.name}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mb-10">
                            {material.features.map((feature, fIndex) => (
                                <TechnicalFeature key={feature} label={feature} index={fIndex} />
                            ))}
                        </div>

                        <div className="relative mb-10 pl-8 border-l border-zinc-200">
                            <p className="text-zinc-500 leading-relaxed text-lg font-light antialiased">
                                {material.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-8">
                            <button 
                                onClick={() => openCareModal(material.careImageUrl)} 
                                className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-black hover:text-zinc-600 transition-all"
                            >
                                <span className="border-b-2 border-black pb-1 group-hover:border-zinc-400">
                                    Care Instructions
                                </span>
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    &rarr;
                                </motion.span>
                            </button>

                            <div className="hidden sm:block h-[1px] flex-grow bg-zinc-100" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const FabricsPage: React.FC = () => {
    const { materials } = useData();
    const [isCareModalOpen, setIsCareModalOpen] = useState(false);
    const [selectedCareImage, setSelectedCareImage] = useState<string | undefined>(undefined);

    return (
        <div className="bg-white min-h-screen">
            <PageHeader 
                page="materials" 
                fallbackTitle="STATS LAB: FABRIC LOG" 
                fallbackDescription="Advanced textile data and engineering specifications for high-performance execution." 
            />
            
            <main>
                {materials.length > 0 ? (
                    materials.map((m, i) => (
                        <MaterialSection 
                            key={m.id} 
                            material={m} 
                            index={i} 
                            openCareModal={(url) => { setSelectedCareImage(url); setIsCareModalOpen(true); }} 
                        />
                    ))
                ) : (
                    <div className="py-24 text-center">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em]">No fabric data available</span>
                    </div>
                )}
            </main>

            <MaterialCareModal 
                isOpen={isCareModalOpen} 
                onClose={() => setIsCareModalOpen(false)} 
                imageUrl={selectedCareImage} 
            />
        </div>
    );
};

export default FabricsPage;
