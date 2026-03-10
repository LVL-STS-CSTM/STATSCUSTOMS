
import React from 'react';
import { View } from '../types';
import { FaFacebookF, FaInstagram, FaTiktok, FaLinkedinIn, FaThreads } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";

interface FooterProps {
    onNavigate: (page: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent, page: View) => {
    e.preventDefault();
    onNavigate(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#262626] text-white">
     <footer className="py-8 px-4 md:py-10 md:px-8">
      <div className="flex justify-between flex-wrap max-w-7xl mx-auto gap-8">
        {/* About Section */}
        <div className="flex-1 min-w-[160px]">
          <h4 className="text-white mb-6 font-eurostile font-bold uppercase text-base tracking-[0.3em]">ABOUT</h4>
          <ul className="list-none p-0 m-0 text-[11px] text-zinc-400 space-y-3 font-grotesk">
            <li>
                <button onClick={(e) => handleNavClick(e, 'our-process')} className="hover:text-white transition-colors font-bold uppercase text-left w-full tracking-[0.2em]">OUR PROCESS</button>
            </li>
            <li>
                <button onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition-colors font-bold uppercase text-left w-full tracking-[0.2em]">ABOUT US</button>
            </li>
            <li>
                <button onClick={(e) => handleNavClick(e, 'the-team')} className="hover:text-white transition-colors font-bold uppercase text-left w-full tracking-[0.2em]">THE TEAM</button>
            </li>
            <li>
                <button onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-white transition-colors font-bold uppercase text-left w-full tracking-[0.2em]">LOCATION</button>
            </li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="flex-1 min-w-[160px]">
          <h4 className="text-white mb-6 font-eurostile font-bold uppercase text-base tracking-[0.3em]">SERVICES</h4>
          <ul className="list-none p-0 m-0 text-[11px] text-zinc-400 space-y-3 font-grotesk">
            <li>
                <button onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-white transition-colors font-bold uppercase text-left w-full tracking-[0.2em]">FAQS</button>
            </li>
            <li>
                <button onClick={(e) => handleNavClick(e, 'terms-of-service')} className="hover:text-white transition-colors font-bold uppercase text-left w-full tracking-[0.2em]">TERMS OF SERVICE</button>
            </li>
            <li>
                <button onClick={(e) => handleNavClick(e, 'return-policy')} className="hover:text-white transition-colors font-bold uppercase text-left w-full tracking-[0.2em]">RETURN AND EXCHANGE POLICY</button>
            </li>
            <li>
                <button onClick={(e) => handleNavClick(e, 'privacy-policy')} className="hover:text-white transition-colors font-bold uppercase text-left w-full tracking-[0.2em]">PRIVACY POLICY</button>
            </li>
          </ul>
        </div>

        {/* Connect Section */}
        <div className="flex-1 min-w-[160px]">
          <h4 className="text-white mb-6 font-eurostile font-bold uppercase text-base tracking-[0.3em]">CONNECT</h4>
          <div className="flex gap-5 my-2">
            <a href="https://www.facebook.com/statsph" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-zinc-400 hover:text-white transition-colors">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/statsphcustom/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://www.threads.net/@statsph?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" aria-label="Threads" className="text-zinc-400 hover:text-white transition-colors">
               <FaThreads className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@statsph?_t=8s5OXGDiNX8&_r=1" aria-label="Tiktok" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              <FaTiktok className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/stats-technical-apparel" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              <FaLinkedinIn className="w-5 h-5" />
            </a>
            <a href="mailto:statsfxl@gmail.com" aria-label="Email" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
              <HiOutlineMail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      </footer>
    <div className="bg-brand-black pt-6 pb-24 md:pb-6 font-grotesk text-zinc-500 text-[10px] border-t border-zinc-800 uppercase tracking-widest">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left">
            Copyright &copy; 2026 - <b className="text-white">WEARESTATSPH</b>
            </p>
        </div>
    </div>
  </div>
  );
};

export default Footer;
