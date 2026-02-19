
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

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'New': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Contacted': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'In Progress': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'Completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Cancelled': return 'bg-zinc-100 text-zinc-500 border-zinc-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-zinc-200 pb-6">
                <div>
                    <h2 className="text-2xl font-eurostile font-black uppercase tracking-widest text-zinc-900">Inquiries & Orders</h2>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Manage customer requests and production flow</p>
                </div>
                <div className="flex bg-zinc-100 p-1 rounded-lg border border-zinc-200">
                    {[
                        { id: 'all', label: `All (${counts.all})` },
                        { id: 'orders', label: `Direct Orders (${counts.orders})` },
                        { id: 'quotes', label: `Quotes (${counts.quotes})` }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setFilterTab(tab.id as any)}
                            className={`px-6 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${filterTab === tab.id ? 'bg-white text-black shadow-sm ring-1 ring-black/5' : 'text-zinc-400 hover:text-zinc-600'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-xl border border-zinc-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-zinc-100">
                        <thead className="bg-zinc-50/50">
                            <tr>
                                <th className="px-6 py-5 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Reference</th>
                                <th className="px-6 py-5 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Client</th>
                                <th className="px-6 py-5 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Type</th>
                                <th className="px-6 py-5 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Current Status</th>
                                <th className="px-6 py-5 text-right text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Manage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {filteredQuotes.map((quote) => (
                                <tr key={quote.id} className="hover:bg-zinc-50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-mono font-bold text-zinc-900 group-hover:text-black">{quote.id}</span>
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
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${
                                            quote.id.startsWith('ORD') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                        }`}>
                                            {quote.id.startsWith('ORD') ? 'Store Order' : 'Custom Quote'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="relative">
                                            <select
                                                value={quote.status}
                                                onChange={(e) => updateQuoteStatus(quote.id, e.target.value as QuoteStatus)}
                                                className={`appearance-none pl-3 pr-8 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest border cursor-pointer focus:ring-2 focus:ring-black/5 outline-none transition-all w-40 ${getStatusColor(quote.status)}`}
                                            >
                                                {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                                                <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                            </div>
                                        </div>
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
                                    <td colSpan={5} className="text-center py-24">
                                        <div className="flex flex-col items-center opacity-40">
                                            <CartIcon className="w-12 h-12 mb-4 text-zinc-300" />
                                            <p className="text-zinc-900 text-xs font-black uppercase tracking-[0.4em]">No Records Found</p>
                                        </div>
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
    );
};

const NavItem: React.FC<{ 
    active: boolean; 
    onClick: () => void; 
    label: string; 
    icon?: React.ReactNode 
}> = ({ active, onClick, label, icon }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
            active 
            ? 'bg-white text-black shadow-lg shadow-black/5' 
            : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
        }`}
    >
        {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>}
        <span className={`transition-colors ${active ? 'text-black' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
            {icon || <div className="w-4 h-4 bg-current rounded-full" />}
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
    </button>
);

const AdminDashboard: React.FC = () => {
    const { logout, subscriptions, submittedQuotes, fetchAdminData } = useAdmin();
    const { fetchData, isLoading: isDataSyncing } = useData();
    const [activeTab, setActiveTab] = useState<'analytics' | 'quotes' | 'products' | 'collections' | 'subscriptions' | 'email-marketing' | 'content' | 'pages' | 'security'>('analytics');
    const [contentSubTab, setContentSubTab] = useState<'banners' | 'feature-section' | 'product-features' | 'info-cards' | 'featured-video' | 'signup-popup'>('banners');
    const [pageSubTab, setPageSubTab] = useState<'partners' | 'how-we-work' | 'materials' | 'services' | 'brand-reviews' | 'platform-ratings' | 'faqs' | 'community' | 'page-headers'>('partners');

    const handleRefresh = async () => {
        await Promise.all([fetchAdminData(), fetchData()]);
    };

    const contentSubTabs = [
        { id: 'banners', label: 'Hero Banners' },
        { id: 'feature-section', label: 'Home Feature' },
        { id: 'info-cards', label: 'Info Cards' },
        { id: 'featured-video', label: 'Video Section' },
        { id: 'signup-popup', label: 'Newsletter Popup' },
    ];

    const pageSubTabs = [
        { id: 'partners', label: 'Partners' },
        { id: 'how-we-work', label: 'Process Steps' },
        { id: 'materials', label: 'Materials' },
        { id: 'services', label: 'Services' },
        { id: 'brand-reviews', label: 'Reviews' },
        { id: 'platform-ratings', label: 'Ratings' },
        { id: 'faqs', label: 'FAQs' },
        { id: 'community', label: 'Community' },
        // Moved here from general content
        { id: 'page-headers', label: 'Page Headers' },
    ];

    return (
        <div className="min-h-screen bg-zinc-50/50 font-sans flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-72 bg-[#0a0a0a] text-white flex-shrink-0 flex flex-col h-screen sticky top-0 overflow-y-auto no-scrollbar border-r border-zinc-800 z-50">
                <div className="p-8">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            <img src="https://i.imgur.com/OIYeMvS.png" alt="Stats" className="w-6 h-6 object-contain" />
                        </div>
                        <div>
                            <h1 className="font-eurostile font-black text-lg uppercase tracking-widest leading-none">Command Center</h1>
                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Admin v2.1</span>
                        </div>
                    </div>

                    <nav className="space-y-8">
                        <div>
                            <div className="px-5 py-2 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-2">Overview</div>
                            <div className="space-y-1">
                                <NavItem active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} label="Dashboard" icon={<ViewGridSmallIcon className="w-4 h-4"/>} />
                                <NavItem active={activeTab === 'quotes'} onClick={() => setActiveTab('quotes')} label="Orders & Quotes" icon={<CartIcon className="w-4 h-4"/>} />
                            </div>
                        </div>
                        
                        <div>
                            <div className="px-5 py-2 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-2">Catalogue</div>
                            <div className="space-y-1">
                                <NavItem active={activeTab === 'products'} onClick={() => setActiveTab('products')} label="Inventory" icon={<TargetIcon className="w-4 h-4"/>} />
                                <NavItem active={activeTab === 'collections'} onClick={() => setActiveTab('collections')} label="Collections" icon={<ViewGridSmallIcon className="w-4 h-4"/>} />
                            </div>
                        </div>

                        <div>
                            <div className="px-5 py-2 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-2">Content</div>
                            <div className="space-y-1">
                                <NavItem active={activeTab === 'content'} onClick={() => setActiveTab('content')} label="Site Content" icon={<SparklesIcon className="w-4 h-4"/>} />
                                <NavItem active={activeTab === 'pages'} onClick={() => setActiveTab('pages')} label="Page Content" icon={<ViewGridSmallIcon className="w-4 h-4"/>} />
                            </div>
                        </div>

                        <div>
                            <div className="px-5 py-2 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-2">Growth</div>
                            <div className="space-y-1">
                                <NavItem active={activeTab === 'subscriptions'} onClick={() => setActiveTab('subscriptions')} label="Audience" icon={<UserIcon className="w-4 h-4"/>} />
                                <NavItem active={activeTab === 'email-marketing'} onClick={() => setActiveTab('email-marketing')} label="Campaigns" icon={<SparklesIcon className="w-4 h-4"/>} />
                            </div>
                        </div>
                        
                        <div>
                            <div className="px-5 py-2 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-2">System</div>
                            <div className="space-y-1">
                                <NavItem active={activeTab === 'security'} onClick={() => setActiveTab('security')} label="Settings" icon={<TargetIcon className="w-4 h-4"/>} />
                            </div>
                        </div>
                    </nav>
                </div>
                
                <div className="mt-auto p-8 border-t border-white/5">
                    <button 
                        onClick={logout}
                        className="w-full py-4 border border-zinc-800 bg-zinc-900/50 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all text-zinc-400 flex items-center justify-center gap-2 group"
                    >
                        <span>End Session</span>
                        <div className="w-2 h-2 rounded-full bg-red-500 group-hover:bg-black"></div>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow p-6 md:p-12 overflow-y-auto min-h-screen">
                <div className="max-w-[1600px] mx-auto">
                    {/* Header Toolbar */}
                    <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-zinc-100">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">System Online</span>
                        </div>
                        <button 
                            onClick={handleRefresh} 
                            disabled={isDataSyncing}
                            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white border border-black rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:opacity-50 shadow-md"
                        >
                            {isDataSyncing ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Syncing Data...</span>
                                </>
                            ) : (
                                <span>Refresh Data</span>
                            )}
                        </button>
                    </div>

                    <div className="animate-fade-in pb-20">
                        {activeTab === 'analytics' && <DashboardAnalytics />}
                        {activeTab === 'quotes' && <QuoteManagement />}
                        {activeTab === 'products' && <ProductManagement />}
                        {activeTab === 'collections' && <CollectionManagement />}
                        {activeTab === 'subscriptions' && <SubscriptionManagement />}
                        {activeTab === 'email-marketing' && <EmailMarketing />}
                        {activeTab === 'security' && <SecurityManagement />}
                        
                        {/* Site Content Tab */}
                        {activeTab === 'content' && (
                            <div className="space-y-8">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-200 overflow-x-auto no-scrollbar sticky top-0 z-10">
                                    <div className="flex items-center gap-2 min-w-max">
                                        {contentSubTabs.map(tab => (
                                            <button 
                                                key={tab.id}
                                                onClick={() => setContentSubTab(tab.id as any)} 
                                                className={`px-5 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all border ${
                                                    contentSubTab === tab.id 
                                                    ? 'bg-black text-white border-black shadow-md' 
                                                    : 'bg-white text-zinc-500 border-transparent hover:bg-zinc-50 hover:border-zinc-200 hover:text-black'
                                                }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="animate-fade-in-up">
                                    {contentSubTab === 'banners' && <HeroManagement />}
                                    {contentSubTab === 'info-cards' && <InfoCardManagement />}
                                    {contentSubTab === 'featured-video' && <FeaturedVideoManagement />}
                                    {contentSubTab === 'signup-popup' && <SubscriptionModalManagement />}
                                    {contentSubTab === 'feature-section' && <HomeFeatureManagement />}
                                </div>
                            </div>
                        )}

                        {/* Pages Content Tab */}
                        {activeTab === 'pages' && (
                            <div className="space-y-8">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-200 overflow-x-auto no-scrollbar sticky top-0 z-10">
                                    <div className="flex items-center gap-2 min-w-max">
                                        {pageSubTabs.map(tab => (
                                            <button 
                                                key={tab.id}
                                                onClick={() => setPageSubTab(tab.id as any)} 
                                                className={`px-5 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all border ${
                                                    pageSubTab === tab.id 
                                                    ? 'bg-black text-white border-black shadow-md' 
                                                    : 'bg-white text-zinc-500 border-transparent hover:bg-zinc-50 hover:border-zinc-200 hover:text-black'
                                                }`}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="animate-fade-in-up">
                                    {pageSubTab === 'page-headers' && <PageBannerManagement />}
                                    {pageSubTab === 'faqs' && <FaqManagement />}
                                    {pageSubTab === 'partners' && <PartnerManagement />}
                                    {pageSubTab === 'how-we-work' && <HowWeWorkManagement />}
                                    {pageSubTab === 'materials' && <FabricManagement />}
                                    {pageSubTab === 'brand-reviews' && <BrandReviewManagement />}
                                    {pageSubTab === 'platform-ratings' && <PlatformRatingManagement />}
                                    {pageSubTab === 'community' && <CommunityManagement />}
                                    {pageSubTab === 'services' && <ServiceManagement />}
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
