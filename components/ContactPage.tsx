
import React, { useState } from 'react';
import { SendIcon } from './icons';
import Button from './Button';


interface ContactPageProps {
    showToast: (message: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ showToast }) => {
    const address = 'Block 3 Lot 4, Daang Hari Road, Ayala Alabang, Muntinlupa, 1776 Metro Manila, Philippines';
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15456.45260190539!2d121.01255532599602!3d14.42065097623344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d1e0287a2589%3A0x6758da4f78310153!2sDaang%20Hari%20Rd%2C%20Ayala%20Alabang%2C%20Muntinlupa%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1678886400000!5m2!1sen!2sph`;

    const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '', phone: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const labelClasses = "block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 ml-2 mb-1";

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
        <div className="bg-white min-h-screen">
            {/* Video Banner Section */}
            <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black">
                <video src="/store_video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80"></video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-end text-white pb-16 md:pb-24 px-4">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mb-4">Flagship Store</span>
                    <h1 className="font-eurostile text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-center leading-none drop-shadow-2xl">Muntinlupa HQ</h1>
                </div>
            </div>

            <div className="max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 mb-24">
                    {/* Left: Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="font-eurostile text-3xl md:text-4xl uppercase tracking-tighter mb-6">Location</h2>
                            <p className="text-sm md:text-base font-bold uppercase tracking-widest text-zinc-900 leading-relaxed max-w-md">
                                Block 3 Lot 4, Daang Hari Road<br/>
                                Ayala Alabang, Muntinlupa<br/>
                                1776 Metro Manila, Philippines
                            </p>
                            <Button href={googleMapsUrl} variant="light" target="_blank" rel="noopener noreferrer" className="mt-8 text-[10px] py-3 px-8 rounded-none border-black text-black hover:bg-black hover:text-white">
                                Get Directions
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Opening Hours</h3>
                                <ul className="space-y-2 text-sm font-bold uppercase tracking-widest text-zinc-900">
                                    <li className="flex justify-between"><span>Mon - Fri</span><span>9:00 AM - 6:00 PM</span></li>
                                    <li className="flex justify-between text-zinc-400"><span>Sat - Sun</span><span>Closed</span></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Contact</h3>
                                <ul className="space-y-2 text-sm font-bold uppercase tracking-widest text-zinc-900">
                                    <li><a href="tel:+63021234567" className="hover:text-zinc-500 transition-colors">+63 (02) 123 4567</a></li>
                                    <li><a href="mailto:CONTACT@STATSCUSTOMS.PH" className="hover:text-zinc-500 transition-colors break-all">CONTACT@STATSCUSTOMS.PH</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right: Map */}
                    <div className="h-[400px] md:h-full min-h-[400px] bg-zinc-100 relative">
                        <iframe src={mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Location Map" className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"></iframe>
                    </div>
                </div>

                {/* Store Images Gallery */}
                <div className="mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <img src="https://picsum.photos/seed/store1/1200/800" alt="Store Interior 1" className="w-full aspect-[4/3] object-cover" referrerPolicy="no-referrer" />
                        <img src="https://picsum.photos/seed/store2/1200/800" alt="Store Interior 2" className="w-full aspect-[4/3] object-cover" referrerPolicy="no-referrer" />
                        <img src="https://picsum.photos/seed/store3/1200/800" alt="Store Interior 3" className="w-full aspect-[4/3] object-cover" referrerPolicy="no-referrer" />
                        <img src="https://picsum.photos/seed/store4/1200/800" alt="Store Interior 4" className="w-full aspect-[4/3] object-cover" referrerPolicy="no-referrer" />
                    </div>
                </div>

                {/* Form Section */}
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-eurostile text-3xl md:text-4xl uppercase tracking-tighter mb-4">Submit Project Brief</h2>
                        <p className="text-sm text-zinc-500 uppercase tracking-widest">Get in touch with our team to start your custom apparel project.</p>
                    </div>
                    
                    {isSubmitted ? (
                        <div className="py-20 text-center space-y-8 animate-fade-in bg-zinc-50 p-12">
                            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto">
                                <SendIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="font-eurostile text-2xl uppercase tracking-widest text-black">Message Sent</h3>
                                <p className="text-zinc-500 mt-4 text-sm font-light uppercase tracking-widest">We've received your inquiry. One of our specialists will get back to you within 24 hours.</p>
                            </div>
                            <button onClick={() => setIsSubmitted(false)} className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-black transition-colors">Send Another Message</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}>Full Name</label>
                                    <input name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 text-black placeholder-zinc-400 rounded-none focus:outline-none focus:border-black transition-all text-sm" placeholder="YOUR NAME" />
                                </div>
                                <div>
                                    <label className={labelClasses}>Email Address</label>
                                    <input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 text-black placeholder-zinc-400 rounded-none focus:outline-none focus:border-black transition-all text-sm" placeholder="EMAIL@EXAMPLE.COM" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}>Contact Number</label>
                                    <input name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 text-black placeholder-zinc-400 rounded-none focus:outline-none focus:border-black transition-all text-sm" placeholder="MOBILE OR LANDLINE" />
                                </div>
                                <div>
                                    <label className={labelClasses}>Company (Optional)</label>
                                    <input name="company" value={formData.company} onChange={handleInputChange} className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 text-black placeholder-zinc-400 rounded-none focus:outline-none focus:border-black transition-all text-sm" placeholder="BUSINESS NAME" />
                                </div>
                            </div>

                            <div>
                                <label className={labelClasses}>Project Specifications</label>
                                <textarea name="message" rows={4} value={formData.message} onChange={handleInputChange} required className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 text-black placeholder-zinc-400 rounded-none focus:outline-none focus:border-black transition-all text-sm resize-none" placeholder="DESCRIBE YOUR PROJECT OR QUESTIONS..."></textarea>
                            </div>

                            <div className="pt-6">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="w-full py-5 bg-black text-white font-bold uppercase tracking-[0.3em] text-[11px] rounded-none hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
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
