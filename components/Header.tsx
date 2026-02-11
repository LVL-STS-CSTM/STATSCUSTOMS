
import React, { useState, useEffect, useMemo } from 'react';
import { SearchIcon, UserIcon, MenuIcon, CloseIcon, ChevronDownIcon } from './icons';
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
        ? 'text-gray-200 hover:text-white'
        : 'text-gray-600 hover:text-gray-900';

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
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isExploreMenuOpen, setIsExploreMenuOpen] = useState(false);

    const { products, collections } = useData();

    const isTransparent = view === 'home' && !isScrolled;
    const headerClasses = isTransparent ? 'bg-transparent' : 'bg-black shadow-lg';

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
        { label: 'How We Work', view: 'how-we-work' as View },
        { label: 'Our Materials', view: 'materials' as View },
        { label: 'Our Partners', view: 'partners' as View },
        { label: 'Other Services', view: 'services' as View },
    ].sort((a, b) => a.label.localeCompare(b.label)), []);

    useEffect(() => {
        const body = document.body;
        body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
        return () => { body.style.overflow = 'auto'; };
    }, [isMobileMenuOpen]);

    const handleNavClick = (page: View, category: string | null = null) => {
        onNavigate(page, category);
        setIsMobileMenuOpen(false);
        setIsMegaMenuOpen(false);
        setIsExploreMenuOpen(false);
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[40] transition-all duration-300 ${headerClasses}`}>
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8" onMouseLeave={() => { setIsMegaMenuOpen(false); setIsExploreMenuOpen(false); }}>
                    <div className="relative flex items-center justify-between h-14">
                        <div className="flex-1 flex justify-start items-center">
                            <nav className="hidden md:flex md:space-x-8">
                                <div className="relative h-full flex items-center" onMouseEnter={() => { setIsMegaMenuOpen(true); setIsExploreMenuOpen(false); }}>
                                    <button
                                        onClick={() => handleNavClick('browse', null)}
                                        className={`flex items-center space-x-1 text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${view === 'browse' ? 'text-white underline underline-offset-8 decoration-2' : 'text-gray-200 hover:text-white'}`}
                                    >
                                        <span>Catalogue</span>
                                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>
                                <div className="relative h-full flex items-center" onMouseEnter={() => { setIsExploreMenuOpen(true); setIsMegaMenuOpen(false); }}>
                                    <button className="flex items-center space-x-1 text-sm font-medium uppercase tracking-wider text-gray-200 hover:text-white transition-colors duration-200">
                                        <span>Explore</span>
                                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isExploreMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div className={`absolute top-full left-0 mt-0 pt-2 min-w-max bg-white shadow-xl rounded-b-md border border-gray-100 transition-all duration-300 ease-in-out z-50 ${isExploreMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                        <div className="py-2">
                                            {exploreLinks.map(link => (
                                                <button
                                                    key={link.label}
                                                    onClick={() => handleNavClick(link.view)}
                                                    className={`flex items-center justify-between w-full text-left px-5 py-3 text-sm transition-colors ${view === link.view ? 'bg-gray-100 text-black font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}
                                                >
                                                    {link.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </nav>
                            <div className="md:hidden">
                                <IconButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} ariaLabel="Menu" theme="dark">
                                    <MenuIcon className="w-7 h-7" />
                                </IconButton>
                            </div>
                        </div>

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                             <button onClick={() => handleNavClick('home')} className="flex items-center gap-x-3" aria-label="Home">
                                <img src="https://i.imgur.com/9FhbGuI.png" alt="STATS logo" className="h-7 md:h-9 w-auto" />
                                <img src="https://i.imgur.com/pNaqcyN.png" alt="CUSTOMS logo" className="h-7 md:h-9 w-auto hidden md:block" />
                            </button>
                        </div>

                        <div className="flex-1 flex items-center justify-end">
                            <div className="flex items-center justify-end space-x-4">
                                <div className="hidden sm:flex items-center space-x-4">
                                    <IconButton onClick={onSearchClick} ariaLabel="Search" theme="dark">
                                        <SearchIcon className="w-6 h-6" />
                                    </IconButton>
                                    <IconButton onClick={onSubscribeClick} ariaLabel="Subscribe" theme="dark">
                                        <UserIcon className="w-6 h-6" />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-zinc-100 transition-all duration-400 ease-in-out ${isMegaMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`} onMouseLeave={() => setIsMegaMenuOpen(false)}>
                        <div className="max-w-screen-2xl mx-auto px-8 py-10 grid grid-cols-6 gap-10">
                           {productCategories.map(group => (
                               <div key={group.groupName} className="space-y-6">
                                   <button 
                                       onClick={() => handleNavClick('catalogue', group.groupName)} 
                                       className={`font-oswald text-sm uppercase tracking-widest mb-4 hover:text-black transition-colors ${catalogueFilter?.value === group.groupName ? 'text-black border-b-2 border-black pb-1' : 'text-zinc-400'}`}
                                   >
                                       {group.groupName}
                                   </button>
                                   <ul className="space-y-3">
                                       {group.categories.map(category => (
                                           <li key={category}>
                                               <button onClick={() => handleNavClick('catalogue', category)} className={`text-xs uppercase tracking-widest font-bold hover:text-black transition-colors ${catalogueFilter?.value === category ? 'text-black underline underline-offset-4' : 'text-zinc-500'}`}>{category}</button>
                                           </li>
                                       ))}
                                   </ul>
                               </div>
                           ))}
                            <div className="space-y-6">
                                <h3 className="font-oswald text-sm uppercase tracking-widest text-zinc-400 mb-4">Gender</h3>
                                <ul className="space-y-3">
                                    {['Men', 'Women', 'Unisex'].map(gender => (
                                        <li key={gender}>
                                            <button onClick={() => handleNavClick('catalogue', gender)} className={`text-xs uppercase tracking-widest font-bold hover:text-black transition-colors ${catalogueFilter?.value === gender ? 'text-black underline underline-offset-4' : 'text-zinc-500'}`}>{gender}</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className={`fixed inset-0 z-[50] md:hidden ${isMobileMenuOpen ? '' : 'pointer-events-none'}`}>
                <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className={`fixed top-0 left-0 h-full w-full max-w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex flex-col h-full">
                        <header className="flex items-center justify-between p-6 border-b border-zinc-100">
                            <h2 className="font-eurostile font-black text-sm uppercase tracking-wider">Navigation</h2>
                            <IconButton onClick={() => setIsMobileMenuOpen(false)} ariaLabel="Close menu"><CloseIcon className="w-6 h-6" /></IconButton>
                        </header>
                        <nav className="flex-1 overflow-y-auto p-6 space-y-2 no-scrollbar">
                             <button onClick={() => handleNavClick('browse', null)} className="flex items-center justify-between w-full text-left p-4 rounded-2xl bg-zinc-900 text-white font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl">Full Catalogue</button>
                             <div className="pt-6 space-y-8">
                                {productCategories.map(group => (
                                    <div key={group.groupName} className="space-y-4">
                                        <button 
                                            onClick={() => handleNavClick('catalogue', group.groupName)} 
                                            className="w-full text-left px-2 py-1 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 border-b border-zinc-50"
                                        >
                                            {group.groupName}
                                        </button>
                                        <div className="grid grid-cols-1 gap-1 pl-2">
                                            {group.categories.map(category => (
                                                <button key={category} onClick={() => handleNavClick('catalogue', category)} className="w-full text-left py-2.5 text-[11px] font-black uppercase tracking-widest text-zinc-600 hover:text-black active:bg-zinc-50 rounded-lg">{category}</button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                             </div>
                             
                             <div className="pt-10 border-t border-zinc-100 mt-10">
                                <span className="px-2 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Information</span>
                                <div className="grid grid-cols-1 gap-1 mt-4 pl-2">
                                    {exploreLinks.map(link => (
                                        <button key={link.label} onClick={() => handleNavClick(link.view)} className={`block w-full text-left py-3 text-[11px] font-black uppercase tracking-widest ${view === link.view ? 'text-black font-black' : 'text-zinc-600'}`}>{link.label}</button>
                                    ))}
                                </div>
                             </div>
                        </nav>
                        <footer className="p-6 border-t border-zinc-100 grid grid-cols-2 gap-4">
                            <button onClick={onSearchClick} className="flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-2xl gap-2 active:bg-zinc-100 transition-colors">
                                <SearchIcon className="w-5 h-5 text-zinc-400" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Search</span>
                            </button>
                            <button onClick={onSubscribeClick} className="flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-2xl gap-2 active:bg-zinc-100 transition-colors">
                                <UserIcon className="w-5 h-5 text-zinc-400" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Sign Up</span>
                            </button>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
