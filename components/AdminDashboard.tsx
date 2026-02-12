
import React, { useState, useMemo, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useData } from '../context/DataContext';
import { SubmittedQuote, QuoteStatus } from '../types';
import QuoteDetailModal from './QuoteDetailModal';
import ProductManagement from './ProductManagement';
import DashboardAnalytics from './DashboardAnalytics';
import FaqManagement from './FaqManagement';
import HeroManagement from './HeroManagement';
import CollectionManagement from './CollectionManagement';
import PartnerManagement from './PartnerManagement';
import HowWeWorkManagement from './HowWeWorkManagement';
import FabricManagement from './FabricManagement';
import SubscriptionManagement from './SubscriptionManagement';
import EmailMarketing from './EmailMarketing';
import InfoCardManagement from './InfoCardManagement';
import FeaturedVideoManagement from './FeaturedVideoManagement';
import BrandReviewManagement from './BrandReviewManagement';
import PlatformRatingManagement from './PlatformRatingManagement';
import CommunityManagement from './CommunityManagement';
import PageBannerManagement from './PageBannerManagement';
import SecurityManagement from './SecurityManagement';
import ServiceManagement from './ServiceManagement';
import SubscriptionModalManagement from './SubscriptionModalManagement';
import HomeFeatureManagement from './HomeFeatureManagement';
import { ViewGridSmallIcon, CartIcon, UserIcon, SparklesIcon, TargetIcon, CloseIcon } from './icons';

const STATUSES: QuoteStatus[] = ['New', 'Contacted', 'In Progress', 'Completed', 'Cancelled'];

const QuoteManagement: React.FC = () => {
    const { submittedQuotes, updateQuoteStatus, fetchAdminData } = useAdmin();
    const [selectedQuote, setSelectedQuote] = useState<SubmittedQuote | null>(null);
    const [filterTab, setFilterTab] = useState<'all' | 'orders' | 'quotes'>('all');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    
    useEffect(() => {
        if (submittedQuotes.length === 0) {
            fetchAdminData();
        }
    }, [fetchAdminData, submittedQuotes.length]);

    const filteredQuotes = useMemo(() => {
        let items = [...submittedQuotes];
        if (filterTab === 'orders') items = items.filter(q => q.id.startsWith('ORD'));
        if (filterTab === 'quotes') items = items.filter(q => q.id.startsWith('QT'));
        
        return items.sort((a, b) => {
            const dateA = new Date(a.submissionDate).getTime();
            const dateB = new Date(b.submissionDate).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
    }, [submittedQuotes, filterTab, sortOrder]);

    const counts = useMemo(() => ({
        all: submittedQuotes.length,
        orders: submittedQuotes.filter(q => q.id.startsWith('ORD')).length,
        quotes: submittedQuotes.filter(q => q.id.startsWith('QT')).length
    }), [submittedQuotes]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-eurostile font-black uppercase tracking-widest">Inquiries & Orders</h2>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Manage customer requests</p>
                </div>
                <div className="flex bg-white p-1 rounded-lg border border-zinc-200 shadow-sm">
                    {[
                        { id: 'all', label: 'All' },
                        { id: 'orders', label: 'Direct Orders' },
                        { id: 'quotes', label: 'Quotes' }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setFilterTab(tab.id as any)}
                            className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${filterTab === tab.id ? 'bg-black text-white shadow-md' : 'text-zinc-400 hover:text-black'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-xl border border-zinc-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-zinc-100">
                        <thead className="bg-zinc-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">ID / Date</th>
                                <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Customer</th>
                                <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Type</th>
                                <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-4 text-right text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {filteredQuotes.map((quote) => (
                                <tr key={quote.id} className="hover:bg-zinc-50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-mono font-bold text-black">{quote.id}</span>
                                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide">{new Date(quote.submissionDate).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-zinc-800 uppercase tracking-wide">{quote.contact.name}</span>
                                            <span className="text-[10px] text-zinc-400">{quote.contact.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                            quote.id.startsWith('ORD') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                        }`}>
                                            {quote.id.startsWith('ORD') ? 'Order' : 'Quote'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={quote.status}
                                            onChange={(e) => updateQuoteStatus(quote.id, e.target.value as QuoteStatus)}
                                            className={`appearance-none pl-3 pr-8 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest border cursor-pointer focus:ring-1 focus:ring-black outline-none bg-white transition-all ${
                                                quote.status === 'New' ? 'border-amber-200 text-amber-600 bg-amber-50' :
                                                quote.status === 'Completed' ? 'border-emerald-200 text-emerald-600 bg-emerald-50' :
                                                quote.status === 'Cancelled' ? 'border-red-200 text-red-600 bg-red-50' :
                                                'border-zinc-200 text-zinc-600'
                                            }`}
                                        >
                                            {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button 
                                            onClick={() => setSelectedQuote(quote)} 
                                            className="text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-black border-b border-transparent hover:border-black transition-all pb-0.5"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredQuotes.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-20 text-zinc-300 text-[10px] font-black uppercase tracking-[0.4em]">
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedQuote && (
                <QuoteDetailModal 
                    quote={selectedQuote} 
                    isOpen={!!selectedQuote} 
                    onClose={() => setSelectedQuote(null)} 
                />
            )}
        </div>
    )
}

const NavItem: React.FC<{ 
    active: boolean; 
    onClick: () => void; 
    label: string; 
    icon?: React.ReactNode 
}> = ({ active, onClick, label, icon }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
            active 
            ? 'bg-white text-black shadow-lg shadow-black/5 transform translate-x-1' 
            : 'text-zinc-500 hover:text-black hover:bg-zinc-100'
        }`}
    >
        <span className={`transition-colors ${active ? 'text-black' : 'text-zinc-400 group-hover:text-black'}`}>
            {icon || <div className="w-4 h-4 bg-current rounded-full" />}
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-black animate-pulse" />}
    </button>
);

const AdminDashboard: React.FC = () => {
    const { logout, subscriptions, submittedQuotes, fetchAdminData } = useAdmin();
    const { fetchData, isLoading: isDataSyncing } = useData();
    const [activeTab, setActiveTab] = useState<'analytics' | 'quotes' | 'products' | 'collections' | 'subscriptions' | 'email-marketing' | 'content' | 'security'>('analytics');
    const [contentSubTab, setContentSubTab] = useState<'banners' | 'feature-section' | 'page-headers' | 'info-cards' | 'featured-video' | 'services' | 'materials' | 'how-we-work' | 'partners' | 'brand-reviews' | 'platform-ratings' | 'faqs' | 'community' | 'signup-popup'>('banners');

    const handleRefresh = async () => {
        await Promise.all([fetchAdminData(), fetchData()]);
    };

    const contentSubTabs = [
        { id: 'banners', label: 'Hero Banners' },
        { id: 'feature-section', label: 'Feature Carousel' },
        { id: 'page-headers', label: 'Page Headers' },
        { id: 'info-cards', label: 'Info Cards' },
        { id: 'featured-video', label: 'Video Section' },
        { id: 'signup-popup', label: 'Newsletter Popup' },
        { id: 'services', label: 'Services' },
        { id: 'materials', label: 'Materials' },
        { id: 'how-we-work', label: 'Process Steps' },
        { id: 'partners', label: 'Partners' },
        { id: 'brand-reviews', label: 'Reviews' },
        { id: 'platform-ratings', label: 'Ratings' },
        { id: 'faqs', label: 'FAQs' },
        { id: 'community', label: 'Community' },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 font-sans flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 lg:w-72 bg-[#0F0F0F] text-white flex-shrink-0 flex flex-col h-screen sticky top-0 overflow-y-auto no-scrollbar border-r border-black">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <img src="https://i.imgur.com/OIYeMvS.png" alt="Stats" className="w-6 h-6 object-contain" />
                        </div>
                        <div>
                            <h1 className="font-eurostile font-black text-lg uppercase tracking-widest leading-none">Admin</h1>
                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Dashboard v2.1</span>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        <div className="px-4 py-2 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Main</div>
                        <NavItem active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} label="Overview" icon={<ViewGridSmallIcon className="w-4 h-4"/>} />
                        <NavItem active={activeTab === 'quotes'} onClick={() => setActiveTab('quotes')} label="Inquiries" icon={<CartIcon className="w-4 h-4"/>} />
                        <NavItem active={activeTab === 'products'} onClick={() => setActiveTab('products')} label="Products" icon={<TargetIcon className="w-4 h-4"/>} />
                        <NavItem active={activeTab === 'collections'} onClick={() => setActiveTab('collections')} label="Collections" icon={<ViewGridSmallIcon className="w-4 h-4"/>} />
                        
                        <div className="px-4 py-2 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mt-6">Marketing</div>
                        <NavItem active={activeTab === 'subscriptions'} onClick={() => setActiveTab('subscriptions')} label="Audience" icon={<UserIcon className="w-4 h-4"/>} />
                        <NavItem active={activeTab === 'email-marketing'} onClick={() => setActiveTab('email-marketing')} label="Campaigns" icon={<SparklesIcon className="w-4 h-4"/>} />
                        
                        <div className="px-4 py-2 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mt-6">System</div>
                        <NavItem active={activeTab === 'content'} onClick={() => setActiveTab('content')} label="Site Content" icon={<ViewGridSmallIcon className="w-4 h-4"/>} />
                        <NavItem active={activeTab === 'security'} onClick={() => setActiveTab('security')} label="Settings" icon={<TargetIcon className="w-4 h-4"/>} />
                    </nav>
                </div>
                
                <div className="mt-auto p-8 border-t border-white/5">
                    <button 
                        onClick={logout}
                        className="w-full py-3 border border-zinc-700 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all text-zinc-400"
                    >
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow p-6 md:p-12 overflow-y-auto min-h-screen">
                <div className="max-w-[1600px] mx-auto">
                    {/* Header Toolbar */}
                    <div className="flex justify-end mb-8 gap-4">
                        <button 
                            onClick={handleRefresh} 
                            disabled={isDataSyncing}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-black transition-all disabled:opacity-50"
                        >
                            <div className={`w-2 h-2 rounded-full ${isDataSyncing ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></div>
                            {isDataSyncing ? 'Syncing...' : 'System Ready'}
                        </button>
                    </div>

                    <div className="animate-fade-in">
                        {activeTab === 'analytics' && <DashboardAnalytics />}
                        {activeTab === 'quotes' && <QuoteManagement />}
                        {activeTab === 'products' && <ProductManagement />}
                        {activeTab === 'collections' && <CollectionManagement />}
                        {activeTab === 'subscriptions' && <SubscriptionManagement />}
                        {activeTab === 'email-marketing' && <EmailMarketing />}
                        {activeTab === 'security' && <SecurityManagement />}
                        {activeTab === 'content' && (
                            <div className="space-y-8">
                                <div className="bg-white p-2 rounded-xl shadow-sm border border-zinc-200 overflow-x-auto no-scrollbar">
                                    <div className="flex items-center gap-1 min-w-max">
                                        {contentSubTabs.map(tab => (
                                            <button 
                                                key={tab.id}
                                                onClick={() => setContentSubTab(tab.id as any)} 
                                                className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${
                                                    contentSubTab === tab.id 
                                                    ? 'bg-black text-white' 
                                                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-black'
                                                }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="animate-fade-in-up">
                                    {contentSubTab === 'faqs' && <FaqManagement />}
                                    {contentSubTab === 'banners' && <HeroManagement />}
                                    {contentSubTab === 'page-headers' && <PageBannerManagement />}
                                    {contentSubTab === 'partners' && <PartnerManagement />}
                                    {contentSubTab === 'how-we-work' && <HowWeWorkManagement />}
                                    {contentSubTab === 'materials' && <FabricManagement />}
                                    {contentSubTab === 'info-cards' && <InfoCardManagement />}
                                    {contentSubTab === 'featured-video' && <FeaturedVideoManagement />}
                                    {contentSubTab === 'brand-reviews' && <BrandReviewManagement />}
                                    {contentSubTab === 'platform-ratings' && <PlatformRatingManagement />}
                                    {contentSubTab === 'community' && <CommunityManagement />}
                                    {contentSubTab === 'services' && <ServiceManagement />}
                                    {contentSubTab === 'signup-popup' && <SubscriptionModalManagement />}
                                    {contentSubTab === 'feature-section' && <HomeFeatureManagement />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
