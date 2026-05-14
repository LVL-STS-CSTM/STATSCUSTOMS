
import React, { useState } from 'react';
import { SendIcon } from './icons';
import Button from './Button';
import { useData } from '../context/DataContext';

interface ContactPageProps {
    showToast: (message: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ showToast }) => {
    const { pageBanners } = useData();
    const banner = pageBanners.find(b => b.page === 'contact') || {
        title: 'Parañaque HQ',
        description: 'Flagship Store',
        imageUrl: '/store_video.mp4'
    };

    const isCloudinaryEmbed = banner.imageUrl.includes('player.cloudinary.com/embed');
    const isVideo = banner.imageUrl.toLowerCase().endsWith('.mp4') || banner.imageUrl.toLowerCase().endsWith('.webm');

    const address = '306 El Grande Ave, Parañaque, 1740 Metro Manila';
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.610530438676!2d121.01255532599602!3d14.42065097623344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ce5633333333%3A0x3333333333333333!2s306%20El%20Grande%20Ave%2C%20Para%C3%B1aque%2C%201740%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1678886400000!5m2!1sen!2sph`;

    const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '', phone: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isMapInteractive, setIsMapInteractive] = useState(false);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const submissionData = { contact: formData, items: [] };
        try {
            const response = await fetch('/api/quotes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });
            if (response.ok) { 
                setIsSubmitted(true);
                showToast("Message Sent! We'll get back to you soon.");
            } else { 
                const res = await response.json() as any;
                showToast(`Sorry: ${res.message || 'We couldn\'t send your message.'}`); 
            }
        } catch (error) {
            showToast('Error: Failed to connect to our team. Please try again.');
        } finally { setIsSubmitting(false); }
    };
    
    return (
        <div className="bg-white min-h-screen font-grotesk">
            {/* Video Banner Section */}
            <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black">
                {isCloudinaryEmbed ? (
                    <iframe
                        src={`${banner.imageUrl}&autoplay=true&loop=true&muted=true&controls=false`}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none"
                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                        allowFullScreen
                        frameBorder="0"
                    ></iframe>
                ) : isVideo ? (
                    <video src={banner.imageUrl} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80"></video>
                ) : (
                    <img src={banner.imageUrl} alt={banner.title} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-end text-white pb-16 md:pb-24 px-4 pointer-events-none">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mb-4 font-grotesk">{banner.description}</span>
                    <h1 className="font-eurostile text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-center leading-none drop-shadow-2xl">{banner.title}</h1>
                </div>
            </div>

            <div className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 mb-24">
                    {/* Left: Info */}
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-[10px] font-eurostile font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Location</h3>
                                <p className="text-sm font-bold uppercase tracking-widest text-zinc-900 leading-relaxed font-grotesk">
                                    306 El Grande Ave<br/>
                                    Parañaque<br/>
                                    1740 Metro Manila
                                </p>
                                <Button href={googleMapsUrl} variant="light" target="_blank" rel="noopener noreferrer" className="mt-6 text-[10px] py-3 px-6 rounded-none border-black text-black hover:bg-black hover:text-white w-full sm:w-auto">
                                    Get Directions
                                </Button>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-eurostile font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Opening Hours</h3>
                                <ul className="space-y-2 text-sm font-bold uppercase tracking-widest text-zinc-900 font-grotesk">
                                    <li className="flex justify-between gap-4"><span>Mon</span><span>8:00 AM - 5:00 PM</span></li>
                                    <li className="flex justify-between gap-4"><span>Tue</span><span>8:00 AM - 5:00 PM</span></li>
                                    <li className="flex justify-between gap-4"><span>Wed</span><span>8:00 AM - 5:00 PM</span></li>
                                    <li className="flex justify-between gap-4"><span>Thu</span><span>8:00 AM - 5:00 PM</span></li>
                                    <li className="flex justify-between gap-4"><span>Fri</span><span>8:00 AM - 5:00 PM</span></li>
                                    <li className="flex justify-between gap-4"><span>Sat</span><span>10:00 AM - 4:00 PM</span></li>
                                    <li className="flex justify-between gap-4 text-zinc-400"><span>Sun</span><span>Closed</span></li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-eurostile font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Contact</h3>
                            <ul className="space-y-2 text-sm font-bold uppercase tracking-widest text-zinc-900 font-grotesk">
                                <li><a href="tel:+639183028818" className="hover:text-zinc-500 transition-colors block">(+63) 918 302 8818</a></li> <li><a href="tel:+639457895304" className="hover:text-zinc-500 transition-colors block">(+63) 945 789 5304</a></li>
                                <li><a href="mailto:CONTACT@STATSCUSTOMS.PH" className="hover:text-zinc-500 transition-colors break-all block mt-2">CONTACT@STATSCUSTOMS.PH</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Map */}
                    <div className="h-[400px] md:h-full min-h-[400px] bg-zinc-100 relative group/map overflow-hidden">
                        <iframe 
                            src={mapEmbedUrl} 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            title="Location Map" 
                            className={`absolute inset-0 w-full h-full grayscale group-hover/map:grayscale-0 transition-all duration-700 ${!isMapInteractive ? 'pointer-events-none' : ''}`}
                        ></iframe>
                        
                        {/* Custom Pinpoint Overlay */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 -mt-8 transition-opacity duration-300 ${isMapInteractive ? 'opacity-0' : 'opacity-100'}`}>
                            <div className="relative flex flex-col items-center">
                                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-2xl border-4 border-white relative z-20 transition-transform duration-500 group-hover/map:scale-110">
                                     <img src="https://i.imgur.com/OIYeMvS.png" alt="Stats Custom" className="w-12 h-12 object-contain" />
                                </div>
                                <div className="w-6 h-6 bg-black rotate-45 -mt-3 border-r-2 border-b-2 border-white z-10"></div>
                                <div className="w-24 h-4 bg-black/30 blur-md rounded-[100%] mt-4 opacity-50 group-hover/map:opacity-80 transition-opacity duration-500"></div>
                            </div>
                        </div>

                        {/* Interaction Overlay */}
                        {!isMapInteractive && (
                            <div 
                                className="absolute inset-0 z-20 flex items-end justify-center pb-8 cursor-pointer bg-black/0 hover:bg-black/5 transition-colors"
                                onClick={() => setIsMapInteractive(true)}
                            >
                                <div className="bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl border border-white/20">
                                    Click to Explore Map
                                </div>
                            </div>
                        )}

                        {/* Reset Interaction Button */}
                        {isMapInteractive && (
                            <button 
                                onClick={() => setIsMapInteractive(false)}
                                className="absolute top-4 right-4 z-30 bg-white/90 backdrop-blur-md text-black px-4 py-2 text-[9px] font-black uppercase tracking-widest shadow-lg border border-zinc-200 hover:bg-black hover:text-white transition-all"
                            >
                                Lock Map
                            </button>
                        )}
                    </div>
                </div>

                {/* Store Images Gallery */}
                <div className="mb-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <img src="https://i.imgur.com/86xAqS4.jpeg" alt="Store Interior 1" className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
                        <img src="https://i.imgur.com/FmGQ0QK.jpeg" alt="Store Interior 2" className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
                        <img src="https://i.imgur.com/VLSVwen.jpeg" alt="Store Interior 3" className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
                        <img src="https://i.imgur.com/zVmfjTt.jpeg" alt="Store Interior 4" className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
                    </div>
                </div>

                {/* Form Section */}
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-eurostile text-xl md:text-2xl uppercase tracking-tighter mb-4">Submit Project Brief</h2>
                        <p className="text-sm text-zinc-500 uppercase tracking-widest font-futura">Get in touch with our team to start your custom apparel project.</p>
                    </div>
                    
                    {isSubmitted ? (
                        <div className="py-20 text-center space-y-8 animate-fade-in bg-zinc-50 p-12">
                            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto">
                                <SendIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="font-rheiborn text-lg uppercase tracking-widest text-black">Message Sent</h3>
                                <p className="text-zinc-500 mt-4 text-sm font-light uppercase tracking-widest font-futura">We've received your inquiry. One of our specialists will get back to you within 24 hours.</p>
                            </div>
                            <button onClick={() => setIsSubmitted(false)} className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-black transition-colors">Send Another Message</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-grotesk font-black uppercase tracking-[0.4em] text-zinc-400 ml-2 mb-1">Full Name</label>
                                    <input name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 text-black placeholder-zinc-400 rounded-none focus:outline-none focus:border-black transition-all text-sm" placeholder="YOUR NAME" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-grotesk font-black uppercase tracking-[0.4em] text-zinc-400 ml-2 mb-1">Email Address</label>
                                    <input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 text-black placeholder-zinc-400 rounded-none focus:outline-none focus:border-black transition-all text-sm" placeholder="EMAIL@EXAMPLE.COM" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-grotesk font-black uppercase tracking-[0.4em] text-zinc-400 ml-2 mb-1">Contact Number</label>
                                    <input name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 text-black placeholder-zinc-400 rounded-none focus:outline-none focus:border-black transition-all text-sm" placeholder="MOBILE OR LANDLINE" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-grotesk font-black uppercase tracking-[0.4em] text-zinc-400 ml-2 mb-1">Company (Optional)</label>
                                    <input name="company" value={formData.company} onChange={handleInputChange} className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 text-black placeholder-zinc-400 rounded-none focus:outline-none focus:border-black transition-all text-sm" placeholder="BUSINESS NAME" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-grotesk font-black uppercase tracking-[0.4em] text-zinc-400 ml-2 mb-1">Project Specifications</label>
                                <textarea name="message" rows={4} value={formData.message} onChange={handleInputChange} required className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 text-black placeholder-zinc-400 rounded-none focus:outline-none focus:border-black transition-all text-sm resize-none" placeholder="DESCRIBE YOUR PROJECT OR QUESTIONS..."></textarea>
                            </div>

                            <div className="pt-6">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full py-5 bg-black text-white font-bold uppercase tracking-[0.3em] text-[11px] rounded-none hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 font-grotesk"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <span>SUBMIT INQUIRY</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
