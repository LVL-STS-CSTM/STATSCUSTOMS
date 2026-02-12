
import React from 'react';
import { ProductSize } from '../types';
import { CloseIcon, RulerIcon } from './icons';

interface SizeGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    sizes: ProductSize[];
}

const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, productName, sizes }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
            {/* Increased max-width to 2xl for better table spread */}
            <div 
                className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="p-8 border-b border-zinc-100 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="p-2 bg-black text-white rounded-lg">
                                <RulerIcon className="w-4 h-4" />
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Size Guide</span>
                        </div>
                        <h2 className="font-eurostile text-2xl uppercase tracking-tighter text-gray-900 leading-none max-w-md">{productName}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                        <CloseIcon className="w-6 h-6 text-zinc-400 hover:text-black" />
                    </button>
                </header>

                <div className="p-8">
                    {sizes.length === 0 ? (
                        <p className="text-center text-zinc-400 text-sm">No size chart available for this item.</p>
                    ) : (
                        <>
                            <div className="overflow-x-auto rounded-xl border border-zinc-200 scrollbar-thin">
                                <table className="w-full text-sm text-left whitespace-nowrap">
                                    <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase text-[10px] tracking-widest border-b border-zinc-200">
                                        <tr>
                                            <th className="px-6 py-4 md:px-8">Size Label</th>
                                            <th className="px-6 py-4 md:px-8">Chest Width (in)</th>
                                            <th className="px-6 py-4 md:px-8">Body Length (in)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100">
                                        {sizes.map((size) => (
                                            <tr key={size.name} className="hover:bg-zinc-50/50 transition-colors">
                                                <td className="px-6 py-4 md:px-8 font-black uppercase text-zinc-900 text-base">{size.name}</td>
                                                <td className="px-6 py-4 md:px-8 text-zinc-600 font-mono text-base">{size.width}"</td>
                                                <td className="px-6 py-4 md:px-8 text-zinc-600 font-mono text-base">{size.length}"</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-100 text-xs text-zinc-500 leading-relaxed flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <p className="mb-2"><strong className="text-zinc-900 uppercase tracking-wider block mb-1">Width Measurement</strong></p>
                                    <p>Measure across the chest, 1 inch below the armhole, with the garment laying flat.</p>
                                </div>
                                <div className="flex-1">
                                    <p className="mb-2"><strong className="text-zinc-900 uppercase tracking-wider block mb-1">Length Measurement</strong></p>
                                    <p>Measure from the highest point of the shoulder down to the bottom hem.</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SizeGuideModal;
