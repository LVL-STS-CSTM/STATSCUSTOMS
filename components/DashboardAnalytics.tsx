
import React, { useEffect, useMemo } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useData } from '../context/DataContext';
import { SubmittedQuote } from '../types';
import { CartIcon, UserIcon, TargetIcon, SparklesIcon } from './icons';

const StatCard: React.FC<{
    title: string; 
    value: string | number; 
    description: string; 
    icon: React.ReactNode;
    trend?: string;
    alert?: boolean;
}> = ({ title, value, description, icon, trend, alert }) => (
    <div className={`p-8 rounded-3xl shadow-sm border transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group ${
        alert 
        ? 'bg-black text-white border-black' 
        : 'bg-white text-gray-900 border-zinc-200'
    }`}>
        <div className="flex justify-between items-start mb-6">
            <div className={`p-3 rounded-xl ${alert ? 'bg-white/10 text-white' : 'bg-zinc-50 text-black border border-zinc-100'}`}>
                {icon}
            </div>
            {trend && (
                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                    alert ? 'bg-white text-black' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                }`}>
                    {trend}
                </span>
            )}
        </div>
        
        <div>
            <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${alert ? 'text-zinc-400' : 'text-zinc-400'}`}>{title}</h3>
            <p className="text-5xl font-eurostile font-black tracking-tighter leading-none mb-4">{value}</p>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${alert ? 'text-zinc-500' : 'text-zinc-400'}`}>{description}</p>
        </div>
        
        {/* Decor */}
        <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10 ${alert ? 'bg-white' : 'bg-black'}`}></div>
    </div>
);

const DashboardAnalytics: React.FC = () => {
    const { submittedQuotes, subscriptions, fetchAdminData } = useAdmin();
    const { products } = useData();

    useEffect(() => {
        if (submittedQuotes.length === 0 || subscriptions.length === 0) {
            fetchAdminData();
        }
    }, [fetchAdminData, submittedQuotes.length, subscriptions.length]);

    const stats = useMemo(() => {
        const total = submittedQuotes.length;
        const orders = submittedQuotes.filter(q => q.id.startsWith('ORD')).length;
        const quotes = total - orders;
        const newItems = submittedQuotes.filter(q => q.status === 'New').length;
        const totalSubscribers = subscriptions.length;
        
        return { total, orders, quotes, newItems, totalSubscribers };
    }, [submittedQuotes, subscriptions]);

    const recentActivity = [...submittedQuotes]
        .sort((a,b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime())
        .slice(0, 5);

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-3xl font-eurostile font-black uppercase tracking-widest text-zinc-900 mb-2">Performance Overview</h2>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Real-time business metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Action Required" 
                    value={stats.newItems} 
                    description="Pending Quotes/Orders" 
                    icon={<SparklesIcon className="w-6 h-6"/>}
                    alert={stats.newItems > 0} 
                    trend={stats.newItems > 0 ? "ATTENTION" : "CLEARED"}
                />
                <StatCard 
                    title="Total Inquiries" 
                    value={stats.total} 
                    description={`${stats.orders} Orders / ${stats.quotes} Quotes`} 
                    icon={<CartIcon className="w-6 h-6"/>}
                    trend="LIFETIME"
                />
                <StatCard 
                    title="Audience Reach" 
                    value={stats.totalSubscribers} 
                    description="Active Subscribers" 
                    icon={<UserIcon className="w-6 h-6"/>}
                    trend="GROWING"
                />
                <StatCard 
                    title="Catalogue Size" 
                    value={products.length} 
                    description="Active SKUs" 
                    icon={<TargetIcon className="w-6 h-6"/>}
                    trend="DEPLOYED"
                />
            </div>

            <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
                <header className="px-8 py-8 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                    <div>
                        <h2 className="text-lg font-eurostile font-black uppercase tracking-widest text-zinc-900">Recent Activity Feed</h2>
                        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Latest system events</p>
                    </div>
                    <button className="text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors">
                        View All History &rarr;
                    </button>
                </header>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-zinc-100">
                        <thead>
                            <tr>
                                <th className="px-8 py-5 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Timestamp</th>
                                <th className="px-8 py-5 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Type</th>
                                <th className="px-8 py-5 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">User / Client</th>
                                <th className="px-8 py-5 text-right text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                            {recentActivity.map((quote: SubmittedQuote) => (
                                <tr key={quote.id} className="hover:bg-zinc-50 transition-colors group">
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-mono font-bold text-zinc-900">{new Date(quote.submissionDate).toLocaleDateString()}</span>
                                            <span className="text-[9px] text-zinc-400 font-bold">{new Date(quote.submissionDate).toLocaleTimeString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${quote.id.startsWith('ORD') ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-700">
                                                {quote.id.startsWith('ORD') ? 'Direct Order' : 'Quote Request'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-zinc-900 group-hover:text-black transition-colors uppercase">{quote.contact.name}</span>
                                            <span className="text-[9px] text-zinc-400 font-bold tracking-wider">{quote.contact.company || 'Personal'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap text-right">
                                        <span className={`px-4 py-1.5 inline-flex text-[9px] font-black uppercase tracking-widest rounded-full border ${
                                            quote.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            quote.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            quote.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                                            'bg-zinc-50 text-zinc-500 border-zinc-100'
                                        }`}>
                                            {quote.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {recentActivity.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-20 text-zinc-300 text-[10px] font-black uppercase tracking-[0.4em]">
                                        No recent activity
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardAnalytics;
