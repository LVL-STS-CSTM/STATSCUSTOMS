
import React, { useState, useEffect, useMemo } from 'react';
import { PageBanner, View } from '../types';
import { useData } from '../context/DataContext';
import { CloseIcon } from './icons';

interface PageBannerFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    bannerToEdit: PageBanner | null;
}

const emptyBanner: Omit<PageBanner, 'id'> = {
    page: 'about',
    title: '',
    description: '',
    imageUrl: '',
};

const internalPages: View[] = [
    'browse', 'catalogue', 'about', 'partners', 'contact', 'faq', 'services', 
    'terms-of-service', 'return-policy', 'privacy-policy', 'materials', 'community', 'how-we-work', 'mockup-generator', 'track-project'
];

const PageBannerFormModal: React.FC<PageBannerFormModalProps> = ({ isOpen, onClose, bannerToEdit }) => {
    const { pageBanners, updateData, collections, products } = useData();
    const [formData, setFormData] = useState<PageBanner | Omit<PageBanner, 'id'>>(bannerToEdit || emptyBanner);
    const [isSaving, setIsSaving] = useState(false);
    
    // Derive unique categories from products
    const categories = useMemo(() => {
        const unique = new Set(products.map(p => p.category));
        return Array.from(unique).sort();
    }, [products]);

    useEffect(() => {
        setFormData(bannerToEdit || emptyBanner);
    }, [bannerToEdit, isOpen]);

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.imageUrl) {
            alert('Please fill out Title and Image URL.');
            return;
        }

        setIsSaving(true);
        try {
            let success = false;
            if (bannerToEdit && 'id' in formData) {
                const updated = pageBanners.map(b => b.id === (formData as PageBanner).id ? formData as PageBanner : b);
                success = await updateData('pageBanners', updated);
            } else {
                const newBanner = { ...formData, id: `pb-${Date.now()}` };
                success = await updateData('pageBanners', [...pageBanners, newBanner]);
            }

            if (success) {
                onClose();
            } else {
                alert('Failed to save banner. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while saving.');
        } finally {
            setIsSaving(false);
        }
    };

    const darkInputStyles = "mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white sm:text-sm placeholder-gray-400";
    
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-semibold">{bannerToEdit ? 'Edit Page Banner' : 'Add Page Banner'}</h2>
                    <button onClick={onClose} disabled={isSaving}><CloseIcon className="w-6 h-6 text-gray-600 hover:text-black" /></button>
                </header>
                <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
                    <div>
                        <label htmlFor="page" className="block text-sm font-medium text-gray-700">Assign to Page / Category</label>
                        <select name="page" id="page" value={formData.page} onChange={handleInputChange} required className={darkInputStyles}>
                            <optgroup label="Core Pages">
                                {internalPages.map(p => <option key={p} value={p}>{p.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>)}
                            </optgroup>
                            <optgroup label="Collections">
                                {collections.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                            </optgroup>
                            <optgroup label="Categories">
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </optgroup>
                            <optgroup label="Gender">
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Unisex">Unisex</option>
                            </optgroup>
                        </select>
                        <p className="text-[10px] text-gray-400 mt-1">Select a category to override the default "Master Inventory" banner.</p>
                    </div>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Banner Title</label>
                        <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} required className={darkInputStyles} />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Subtitle / Description</label>
                        <input type="text" name="description" id="description" value={formData.description} onChange={handleInputChange} className={darkInputStyles} />
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Banner Image URL</label>
                        <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required className={darkInputStyles} />
                    </div>
                    <footer className="py-4 flex justify-end space-x-3 sticky bottom-0 bg-white z-10 border-t mt-4 -mx-6 px-6">
                        <button type="button" onClick={onClose} disabled={isSaving} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50">Cancel</button>
                        <button type="submit" disabled={isSaving} className="px-6 py-2 bg-[#3A3A3A] text-white rounded-md hover:bg-[#4f4f4f] disabled:opacity-50 flex items-center gap-2">
                            {isSaving ? 'Saving...' : 'Save Banner'}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default PageBannerFormModal;
