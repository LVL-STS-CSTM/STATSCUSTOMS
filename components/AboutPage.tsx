
import React, { useRef } from 'react';
import { View, Partner } from '../types';
import Button from './Button';
import { useOnScreen } from '../useOnScreen';
import LazyImage from './LazyImage';
import FeaturedPartners from './FeaturedPartners';
import { SampleTestingIcon, ProductionIcon, SustainabilityIcon } from './icons';

interface AboutPageProps {
    onNavigate: (page: View, value?: string | null, color?: string | null) => void;
    partners: Partner[];
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, partners }) => {
    const sectionRefs = {
        who: useRef<HTMLDivElement>(null),
        what: useRef<HTMLDivElement>(null),
        how: useRef<HTMLDivElement>(null),
        why: useRef<HTMLDivElement>(null),
        cta: useRef<HTMLDivElement>(null),
    };
    
    const visibility = {
        who: useOnScreen(sectionRefs.who),
        what: useOnScreen(sectionRefs.what),
        how: useOnScreen(sectionRefs.how),
        why: useOnScreen(sectionRefs.why),
        cta: useOnScreen(sectionRefs.cta),
    };

    return (
        <div className="bg-white text-[#3A3A3A] font-grotesk">
            {/* Full Banner Hero */}
            <section className="relative h-[calc(100dvh-3.5rem)] min-h-[600px] bg-black text-white flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.pexels.com/photos/8365691/pexels-photo-8365691.jpeg" 
                        alt="About Stats" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 z-10"></div>
                <div className="relative z-20 px-6 text-center max-w-5xl">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.6em] text-white/60 mb-6 block animate-fade-in font-grotesk"></span>
                    <h1 className="font-eurostile font-medium text-2xl md:text-4xl lg:text-5xl tracking-tighter uppercase leading-[0.85] animate-fade-in-up drop-shadow-2xl">
                        STATS CUSTOM
                    </h1>
                    <p className="mt-8 text-[10px] md:text-xs max-w-2xl mx-auto text-white/60 font-light leading-relaxed uppercase tracking-[0.4em] animate-fade-in-up [animation-delay:200ms] font-grotesk">
                        Built in the Philippines. Engineered for the World.
                    </p>
                </div>
            </section>
            
            {/* Who We Are */}
            <section ref={sectionRefs.who} className="py-32 px-6 bg-white relative overflow-hidden">
                {/* Subtle Technical Grid for Light Section */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
                    backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
                <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-black/10"></div>
                <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-black/10"></div>
                <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-black/10"></div>
                <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-black/10"></div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <div className={`transition-all duration-1000 ease-out ${visibility.who ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                         <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-[1px] bg-black"></div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-black font-grotesk">Who We Are</span>
                        </div>
                        <div className="relative p-8 border border-black/5">
                            {/* Inner Corner Markers for Text Box */}
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-black/20"></div>
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-black/20"></div>
                            
                            <h2 className="font-eurostile text-2xl lg:text-5xl text-gray-900 mb-10 uppercase tracking-tighter leading-none">
                                Technical Sportswear<br/>Pridefully Filipino
                            </h2>
                            <div className="space-y-8 text-zinc-600 leading-relaxed font-light text-lg antialiased font-futura">
                                <p>
                                    <strong>STATS Technical Sportswear</strong> is a prideful Filipino brand that produces high-performance technical sportswear, specifically designed for our tropical climate.
                                </p>
                                <p>
                                    We strive to set the industry standards for sportswear, focusing on fabric selection, construction, adaptability, and performance. We view apparel not merely as pieces of clothing, but as tools that amplify the wearer to consistently perform at their optimum level every time they use our products.
                                </p>
                                <p>
                                    Whether you're working out, playing your sport, or simply going about your daily activities—STATS wants to provide you with the perfect gear to help you confidently tackle any situation.
                                </p>
                                <p>
                                    Our products are constructed from advanced tech-fabrics that are smooth, lightweight, moisture-wicking, durable, and with high shape retention—paired with advanced cuts and construction techniques; these products are engineered for various high-performance activities, as the brand name implies: <strong>Season Condition, Tropical, Athletics, Training, and Sports.</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={`transition-all duration-1000 ease-out delay-200 ${visibility.who ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <div className="relative aspect-[4/5] overflow-hidden rounded-none shadow-2xl group">
                            <LazyImage src="https://res.cloudinary.com/dvodalpcz/image/upload/v1772365153/Screenshot_2026-03-01_193845_vqqqr6.png" alt="Technical fabrics" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            {/* Simple Black Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                            <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </section>
            


            {/* How We Work */}
            <section ref={sectionRefs.how} className="py-32 px-6 bg-white relative">
                {/* Subtle Technical Grid for Light Section */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ 
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className={`text-center mb-20 transition-all duration-1000 ease-out ${visibility.how ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="font-eurostile text-3xl md:text-5xl text-gray-900 mb-6 uppercase tracking-tighter leading-none">How We Work</h2>
                        <p className="text-zinc-900 font-medium text-lg md:text-xl antialiased font-futura max-w-4xl mx-auto">
                            Every STATS TECHNICAL SPORTSWEAR design is rooted in years of experience as athletes and individuals who live and breathe an active lifestyle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Column 1 */}
                        <div className={`flex flex-col items-center transition-all duration-1000 ease-out delay-100 ${visibility.how ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <h3 className="font-eurostile text-xl md:text-2xl uppercase tracking-wider mb-8 text-center font-bold">Sample Testing</h3>
                            <div className="aspect-[4/5] w-full overflow-hidden relative group">
                                <LazyImage src="https://res.cloudinary.com/dvodalpcz/image/upload/v1772364835/STATS2025_BRAND2-7_hxyqqk.jpg" alt="Sample Testing" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                                {/* Corner Markers for Images */}
                                <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className={`flex flex-col items-center transition-all duration-1000 ease-out delay-200 ${visibility.how ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <h3 className="font-eurostile text-xl md:text-2xl uppercase tracking-wider mb-8 text-center font-bold">Small Batch Production</h3>
                            <div className="aspect-[4/5] w-full overflow-hidden relative group">
                                <LazyImage src="https://res.cloudinary.com/dvodalpcz/image/upload/v1772364835/STATS2025_BRAND2-4_kpaxbn.jpg" alt="Small Batch Production" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>

                        {/* Column 3 */}
                        <div className={`flex flex-col items-center transition-all duration-1000 ease-out delay-300 ${visibility.how ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <h3 className="font-eurostile text-xl md:text-2xl uppercase tracking-wider mb-8 text-center font-bold">Sustainability Statement</h3>
                            <div className="aspect-[4/5] w-full overflow-hidden relative group">
                                <LazyImage src="https://res.cloudinary.com/dvodalpcz/image/upload/v1772364835/STATS2025_BRAND2-9_eoytuv.jpg" alt="Sustainability Statement" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why We Do It */}
            <section ref={sectionRefs.why} className="py-32 px-6 bg-[#0A0A0A] text-white relative overflow-hidden">
                {/* Blueprint Pattern - Updated */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    {/* Visible Dot Grid */}
                    <div className="absolute inset-0" style={{ 
                        backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}></div>
                    
                    {/* Corner Markers */}
                    <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-white/30"></div>
                    <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-white/30"></div>
                    <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-white/30"></div>
                    <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-white/30"></div>
                </div>
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className={`transition-all duration-1000 ease-out ${visibility.why ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="text-center mb-20">
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500 mb-6 block font-grotesk">Why We Do It</span>
                            <h2 className="font-eurostile text-3xl lg:text-6xl text-white mb-12 uppercase tracking-tighter leading-none">Homegrown<br/>Excellence</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-zinc-400 leading-relaxed font-light text-lg antialiased font-futura">
                            <div className="space-y-6">
                                <p>
                                    We are driven by a singular mission: to prove that the best technical sportswear in the world can be proudly made right here in the Philippines. We do it because we believe in the untapped potential of Filipino talent, craftsmanship, and innovation.
                                </p>
                                <p>
                                    Every stitch, every fabric, and every design is a testament to our commitment to elevating local excellence to global standards.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <p>
                                    We create because we want to inspire pride—not just in our products, but in the hands and hearts that craft them. For us, it’s about more than sportswear; it’s about showcasing the resilience, creativity, and relentless drive of the Filipino spirit.
                                </p>
                                <p>
                                    We exist to equip athletes, dreamers, and doers with gear that not only performs but also tells a story of homegrown passion and precision.
                                </p>
                            </div>
                        </div>
                        <div className="mt-20 p-12 bg-white text-black text-center">
                            <p className="font-eurostile text-lg md:text-xl lg:text-2xl uppercase tracking-tight leading-tight">
                                We produce the best locally made technical sportswear because this is how sportswear <span className="font-bold">SHOULD BE</span>—crafted with purpose, built to perform, and designed to inspire greatness in every step of the journey.
                            </p>
                        </div>

                        {/* WE THE ANOMALY Image */}
                        <div className="mt-20 flex justify-center">
                            <div className="relative overflow-hidden">
                                <img 
                                    src="https://res.cloudinary.com/dvodalpcz/image/upload/v1772374524/2023_WTA_2_WHITE_znjkle.png" 
                                    alt="We The Anomaly" 
                                    className="h-[80px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-500"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* CTA */}
            <section ref={sectionRefs.cta} className={`py-32 px-6 bg-white transition-all duration-1000 ease-out ${visibility.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="font-eurostile text-2xl md:text-4xl text-gray-900 mb-12 uppercase tracking-tighter leading-none">Ready to Experience<br/>Technical Excellence?</h2>
                    <Button variant="solid" onClick={() => onNavigate('catalogue')} className="px-16 py-6 text-lg rounded-none shadow-2xl shadow-black/10 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest font-bold font-grotesk">
                        Browse Collection
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
