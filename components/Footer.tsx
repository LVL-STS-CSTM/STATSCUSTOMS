
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
     <footer className="p-8 md:p-12">
      <div className="flex justify-between flex-wrap max-w-7xl mx-auto gap-8">
        {/* About Section */}
        <div className="flex-1 min-w-[160px]">
          <h4 className="text-white mb-8 font-oswald font-bold uppercase text-lg tracking-[0.3em]">ABOUT</h4>
          <ul className="list-none p-0 m-0 text-xs text-zinc-400 space-y-4 font-sans">
            <li>
                <button onClick={(e) => handleNavClick(e, 'services')} className="hover:text-white transition-colors font-bold uppercase text-left w-full tracking-[0.2em]">WHAT WE DO</button>
            </li>
            <li>
                <button onClick={(e) => handleNavClick(e, 'how-we-work')} className="hover:text-white transition-colors font-bold uppercase text-left w-full tracking-[0.2em]">HOW WE WORK</button>
            </li>
            <li>
                <button onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition-colors font-bold uppercase text-left w-full tracking-[0.2em]">WHO WE ARE</button>
            </li>
            <li>
                <button onClick={(e) => handleNavClick(e, 'community')} className="hover:text-white transition-colors font-bold uppercase text-left w-full tracking-[0.2em]">COMMUNITY</button>
            </li>
            <li>
                <button onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-white transition-colors font-bold uppercase text-left w-full tracking-[0.2em]">LOCATION</button>
            </li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="flex-1 min-w-[160px]">
          <h4 className="text-white mb-8 font-oswald font-bold uppercase text-lg tracking-[0.3em]">SERVICES</h4>
          <ul className="list-none p-0 m-0 text-xs text-zinc-400 space-y-4 font-sans">
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
            {/* Hidden Admin Access - Preserved for functionality */}
            <li className="h-4 opacity-0">
                <button onClick={(e) => handleNavClick(e, 'admin')} className="w-full h-full cursor-default">Admin</button>
            </li>
          </ul>
        </div>

        {/* Connect Section */}
        <div className="flex-1 min-w-[160px]">
          <h4 className="text-white mb-8 font-oswald font-bold uppercase text-lg tracking-[0.3em]">CONNECT</h4>
          <div className="flex gap-6 my-2.5">
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
    <div className="bg-brand-black text-center py-6 font-sans text-zinc-500 text-[10px] border-t border-zinc-800 uppercase tracking-widest">
        <p>
        Copyright &copy; 2026 - <b className="text-white">STATSPH</b>
        </p>
    </div>
  </div>
  );
};

export default Footer;
