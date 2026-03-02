import React, { useState, useEffect, useMemo } from 'react';
import { SearchIcon, UserIcon, MenuIcon, CloseIcon, HomeIcon, ViewGridSmallIcon } from './icons';
import { View } from '../types';
import { useData } from '../context/DataContext';

const IconButton: React.FC<{
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
    ariaLabel: string,
    className?: string,
    theme?: 'light' | 'dark'
}> = ({ onClick, children, ariaLabel, className = '', theme = 'light' }) => {
    const themeClasses = theme === 'dark'
        ? 'text-gray-300 hover:text-white'
        : 'text-gray-500 hover:text-gray-900';

    return (
        <button onClick={onClick} className={`${themeClasses} transition-colors duration-200 relative ${className}`} aria-label={ariaLabel}>
            {children}
        </button>
    );
};

interface HeaderProps {
    onNavigate: (page: View, category?: string | null) => void;
    onQuoteClick: () => void;
    onSearchClick: () => void;
    onSubscribeClick: () => void;
    view: View;
    catalogueFilter: { type: 'group' | 'category' | 'gender'; value: string } | null;
    isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onQuoteClick, onSearchClick, onSubscribeClick, view, catalogueFilter, isScrolled }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const { products, collections } = useData();

    const productCategories = useMemo(() => {
        return (collections || []).map(group => {
            const categoriesSet = new Set<string>();
            (products || []).forEach(product => {
                if (product && group && product.categoryGroup === group.name) {
                    categoriesSet.add(product.category);
                }
            });
            return {
                groupName: group?.name || 'Unknown',
                categories: Array.from(categoriesSet).sort()
            };
        }).sort((a,b) => (a.groupName || '').localeCompare(b.groupName || ''));
    }, [products, collections]);
    
    const exploreLinks = useMemo(() => [
        { label: 'About Us', view: 'about' as View },
        { label: 'Contact Us', view: 'contact' as View },
        { label: 'Our Process', view: 'our-process' as View },
        { label: 'Our Materials', view: 'materials' as View },
    ].sort((a, b) => a.label.localeCompare(b.label)), []);

    useEffect(() => {
        const body = document.body;
        body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
        return () => { body.style.overflow = 'auto'; };
    }, [isMobileMenuOpen]);

    const handleNavClick = (page: View, category: string | null = null) => {
        onNavigate(page, category);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Floating Bottom Navigation */}
            <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[40] flex items-center bg-black/90 backdrop-blur-md rounded-full p-2 shadow-2xl border border-white/10 transition-all duration-500 ${isNavExpanded ? 'pl-4' : ''}`}>
                <div className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out ${isNavExpanded ? 'max-w-[300px] opacity-100 pr-4 gap-6' : 'max-w-0 opacity-0 px-0 gap-0'}`}>
                    <IconButton onClick={() => { handleNavClick('home'); setIsNavExpanded(false); }} ariaLabel="Home" theme="dark" className={view === 'home' ? 'text-white' : ''}>
                        <HomeIcon className="w-5 h-5" />
                    </IconButton>
                    <IconButton onClick={() => { handleNavClick('browse', null); setIsNavExpanded(false); }} ariaLabel="Catalogue" theme="dark" className={view === 'browse' || view === 'catalogue' ? 'text-white' : ''}>
                        <ViewGridSmallIcon className="w-5 h-5" />
                    </IconButton>
                    <IconButton onClick={() => { onSearchClick(); setIsNavExpanded(false); }} ariaLabel="Search" theme="dark">
                        <SearchIcon className="w-5 h-5" />
                    </IconButton>
                    <IconButton onClick={() => { setIsMobileMenuOpen(true); setIsNavExpanded(false); }} ariaLabel="Menu" theme="dark">
                        <MenuIcon className="w-5 h-5" />
                    </IconButton>
                    <IconButton onClick={() => { onSubscribeClick(); setIsNavExpanded(false); }} ariaLabel="Subscribe" theme="dark">
                        <UserIcon className="w-5 h-5" />
                    </IconButton>
                </div>
                <button 
                    onClick={() => setIsNavExpanded(!isNavExpanded)}
                    className="relative w-12 h-12 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shrink-0 group"
                    aria-label="Toggle Navigation"
                >
                    {/* Corner Brackets */}
                    <div className="absolute inset-0 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/80"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/80"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/80"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/80"></div>
                    </div>
                    
                    {isNavExpanded ? (
                        <CloseIcon className="w-5 h-5 text-white" />
                    ) : (
                        <img 
                            src="https://i.imgur.com/OIYeMvS.png" 
                            alt="Menu" 
                            className="w-6 h-6 object-contain" 
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} 
                        />
                    )}
                </button>
            </div>
            
            {/* Side Menu (Used for both Mobile and Desktop now) */}
            <div className={`fixed inset-0 z-[50] ${isMobileMenuOpen ? '' : 'pointer-events-none'}`}>
                <div className={`fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-700 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className={`fixed top-0 left-0 h-full w-full max-w-[300px] bg-white shadow-3xl z-50 transform transition-transform duration-700 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex flex-col h-full">
                        <header className="flex items-center justify-between p-8 border-b border-zinc-50">
                            <h2 className="font-grotesk font-bold text-[10px] uppercase tracking-[0.4em] text-zinc-400">Navigation</h2>
                            <IconButton onClick={() => setIsMobileMenuOpen(false)} ariaLabel="Close menu"><CloseIcon className="w-5 h-5" /></IconButton>
                        </header>
                        <nav className="flex-1 overflow-y-auto p-8 space-y-2 no-scrollbar">
                             <button onClick={() => handleNavClick('browse', null)} className="flex items-center justify-center w-full p-5 rounded-xl bg-zinc-900 text-white font-bold uppercase tracking-[0.3em] text-[10px] transition-all active:scale-95 shadow-xl mb-10">Full Catalogue</button>
                             <div className="space-y-10 mb-10">
                                {productCategories.map(group => (
                                    <div key={group.groupName} className="space-y-6">
                                        <button 
                                            onClick={() => handleNavClick('catalogue', group.groupName)} 
                                            className="w-full text-left text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-300"
                                        >
                                            {group.groupName}
                                        </button>
                                        <div className="grid grid-cols-1 gap-4">
                                            {group.categories.map(category => (
                                                <button key={category} onClick={() => handleNavClick('catalogue', category)} className="w-full text-left text-[11px] font-medium uppercase tracking-widest text-zinc-600 hover:text-black">{category}</button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                             </div>
                             {/* Explore Links */}
                             <div className="space-y-6 mt-10">
                                 <h3 className="w-full text-left text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-300">Explore</h3>
                                 <div className="grid grid-cols-1 gap-4">
                                     {exploreLinks.map(link => (
                                         <button
                                             key={link.label}
                                             onClick={() => handleNavClick(link.view)}
                                             className={`w-full text-left text-[11px] font-medium uppercase tracking-widest ${view === link.view ? 'text-black font-bold' : 'text-zinc-600 hover:text-black'}`}
                                         >
                                             {link.label}
                                         </button>
                                     ))}
                                 </div>
                             </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;