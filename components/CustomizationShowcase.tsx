
import React, { useRef } from 'react';
import { useOnScreen } from '../useOnScreen';
import LazyImage from './LazyImage';

const techniques = [
    { 
        id: '01',
        title: "Heat Transfer", 
        label: "Precision Depth",
        description: "Graphics cleanly applied with commercial-grade heat for a crisp, vibrant finish.", 
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5dpvr5PsCJ9D_pBSX9k93hXqqbaeRfzEVMw&s" 
    },
    { 
        id: '02',
        title: "Embroidery", 
        label: "Artisan Stitch",
        description: "Stitched directly into the grain for a textured, 3D premium signature.", 
        imageUrl: "https://image.made-in-china.com/365f3j00RCpMcDBsAUoK/Hello-Japan-12-Needles-6-Heads-2-Cab-Computerized-Embroidery-Machine-Portable-Digital-14-Needle-Cap-Embroidery-Machines.webp" 
    },
    { 
        id: '03',
        title: "Sublimation", 
        label: "Atomic Infusion",
        description: "Fade-proof designs infused into the textile for total breathability.", 
        imageUrl: "https://thevisualcommunicationguy.com/wp-content/uploads/2023/10/Sublimation-Printer-800x445.jpg" 
    },
    { 
        id: '04',
        title: "DTF Print", 
        label: "Over-the-Fabric",
        description: "Versatile, high-detail full-color transfers with a durable, flexible finish.", 
        imageUrl: "https://www.shutterstock.com/image-photo/press-printing-on-colored-tshirts-600nw-2392783701.jpg" 
    }
];

const CustomizationShowcase: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, '0px 0px -10% 0px');

    return (
        <section ref={sectionRef} className="bg-[#fcfcfc] text-black py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-16 lg:mb-24 gap-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="max-w-2xl">
                        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block mb-3">
                            Expertise & Hardware
                        </span>
                        <h2 className="font-sans font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight text-zinc-900">
                            Technical Capabilities
                        </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            <strong className="text-zinc-900 font-medium">Precision Meets Craft.</strong> Dito sa STATS, hindi kami basta-basta nagpi-print lang. We combine pro techniques with real craftsmanship para gawing reality ang vision mo. Pulidong gawa at quality na pangmatagalan.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                    {techniques.map((tech, index) => (
                        <div 
                            key={tech.title} 
                            className={`group flex flex-col gap-5 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="aspect-[4/3] overflow-hidden bg-zinc-100 rounded-2xl relative">
                                <LazyImage 
                                    src={tech.imageUrl} 
                                    alt={tech.title} 
                                    aspectRatio="h-full w-full"
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-mono text-zinc-400">{tech.id}</span>
                                    <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                                        {tech.label}
                                    </span>
                                </div>
                                <h3 className="font-sans font-medium text-lg mb-2 text-zinc-900">
                                    {tech.title}
                                </h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">
                                    {tech.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomizationShowcase;
