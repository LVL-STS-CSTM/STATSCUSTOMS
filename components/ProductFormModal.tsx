
import React, { useState, useEffect, useRef } from 'react';
import { Product, Color, ProductFeatureItem } from '../types';
import { useData } from '../context/DataContext';
import { CloseIcon, PlusIcon, TrashIcon } from './icons';
import Accordion from './Accordion';

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    productToEdit: Product | null;
}

const emptyProduct: Omit<Product, 'id'> = {
    name: '',
    imageUrls: {},
    url: '#',
    isBestseller: false,
    description: '',
    availableSizes: [],
    availableColors: [],
    category: '',
    categoryGroup: '',
    gender: 'Unisex',
    displayOrder: 0,
    leadTimeWeeks: 2,
    supportedPrinting: [],
    features: []
};

const PRINT_METHODS = ["Heat Transfer", "Embroidery", "Sublimation", "DTF Print", "Silk Screen"];

const SectionHeader: React.FC<{number: string, title: string}> = ({number, title}) => (
    <div className="flex items-center gap-3 mb-6 pt-6 border-t border-gray-100 first:pt-0 first:border-0">
        <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-[10px]">{number}</span>
        <h3 className="font-eurostile text-lg uppercase tracking-widest text-gray-900">{title}</h3>
    </div>
);

const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
    if (!message) return null;
    return <p className="text-red-500 text-[9px] mt-1 font-bold animate-fade-in uppercase tracking-tighter">{message}</p>;
};

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, productToEdit }) => {
    const { products, collections, updateData } = useData();
    const [formData, setFormData] = useState<Product | Omit<Product, 'id'>>(productToEdit || emptyProduct);
    const [manualId, setManualId] = useState('');
    const [newColor, setNewColor] = useState({ name: '', hex: '#000000' });
    const [newSize, setNewSize] = useState({ name: '', width: 0, length: 0 });
    const [newFeature, setNewFeature] = useState<ProductFeatureItem>({ name: '', value: '', imageUrl: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setErrors({});
        if (productToEdit) {
            setFormData({ ...emptyProduct, ...productToEdit });
            setManualId('');
        } else {
            const defaultData = { ...emptyProduct };
            if (collections.length > 0) defaultData.categoryGroup = collections[0].name;
            setFormData(defaultData);
            setManualId('');
        }
    }, [productToEdit, isOpen, collections]);

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (errors[name]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }

        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else if (['moq', 'price', 'leadTimeWeeks'].includes(name)) {
             setFormData(prev => ({ ...prev, [name]: value === '' ? undefined : Number(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const togglePrintingMethod = (method: string) => {
        setFormData(prev => {
            const current = prev.supportedPrinting || [];
            if (current.includes(method)) {
                return { ...prev, supportedPrinting: current.filter(m => m !== method) };
            } else {
                return { ...prev, supportedPrinting: [...current, method] };
            }
        });
    };

    const handleImageUrlChange = (colorName: string, index: number, value: string) => {
        setFormData(prev => {
            const newImageUrls = { ...prev.imageUrls };
            const imagesForColor = [...(newImageUrls[colorName] || [])];
            imagesForColor[index] = value;
            newImageUrls[colorName] = imagesForColor;
            return { ...prev, imageUrls: newImageUrls };
        });
    };

    const handleAddColor = () => {
        if (newColor.name && newColor.hex) {
            setFormData(prev => ({
                ...prev,
                imageUrls: { ...prev.imageUrls, [newColor.name]: [] },
                availableColors: [...prev.availableColors, newColor],
            }));
            setNewColor({ name: '', hex: '#000000' });
        }
    };

    const handleAddSize = () => {
        if (newSize.name) {
            setFormData(prev => ({
                ...prev,
                availableSizes: [...prev.availableSizes, newSize]
            }));
            setNewSize({ name: '', width: 0, length: 0 });
        }
    };

    const handleRemoveSize = (index: number) => {
        setFormData(prev => ({
            ...prev,
            availableSizes: prev.availableSizes.filter((_, i) => i !== index)
        }));
    };

    const handleAddFeature = () => {
        if (newFeature.name && newFeature.value) {
            setFormData(prev => ({
                ...prev,
                features: [...(prev.features || []), newFeature]
            }));
            setNewFeature({ name: '', value: '', imageUrl: '' });
        }
    };

    const handleRemoveFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: (prev.features || []).filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        if (!productToEdit) {
            if (!manualId.trim()) newErrors.manualId = 'Reference ID is required';
            else if (products.some(p => p.id === manualId.trim().toUpperCase())) newErrors.manualId = 'ID already exists';
        }
        
        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm() || isSaving) return;

        setIsSaving(true);
        try {
            const dataToSave = { ...formData };
            let success = false;

            if (productToEdit) {
                // Update existing
                const updatedProducts = products.map(p => p.id === productToEdit.id ? (dataToSave as Product) : p);
                success = await updateData('products', updatedProducts);
            } else {
                // Create new
                const newId = manualId.trim().toUpperCase();
                const newProduct = { 
                    ...(dataToSave as Omit<Product, 'id'>), 
                    id: newId, 
                    displayOrder: products.length 
                };
                success = await updateData('products', [...products, newProduct]);
            }

            if (success) {
                onClose();
            } else {
                alert("Failed to save product. Please check your connection and try again.");
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("An error occurred while saving.");
        } finally {
            setIsSaving(false);
        }
    };
    
    const inputClasses = "mt-1 block w-full px-4 py-3 bg-zinc-50 border border-zinc-200 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all text-xs font-medium";
    const labelClasses = "block text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-1 mb-1";

    return (
        <div className="fixed inset-0 bg-black/80 z-[80] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden">
                <header className="flex items-center justify-between px-8 py-6 border-b border-zinc-100 bg-white z-10">
                    <div>
                        <h2 className="text-xl font-eurostile font-black uppercase tracking-widest text-black">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Catalogue Item Configuration</p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center transition-all group">
                        <CloseIcon className="w-5 h-5 text-zinc-400 group-hover:text-black transition-colors" />
                    </button>
                </header>

                <form onSubmit={handleSubmit} className="overflow-y-auto p-8 space-y-10 no-scrollbar bg-white">
                    {/* Identity */}
                    <section>
                        <SectionHeader number="01" title="Identification" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className={labelClasses}>Reference ID (Unique)</label>
                                <input
                                    type="text"
                                    value={productToEdit ? productToEdit.id : manualId}
                                    onChange={(e) => setManualId(e.target.value)}
                                    className={`${inputClasses} font-mono ${productToEdit ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' : ''}`}
                                    placeholder="e.g. JER-001"
                                    disabled={!!productToEdit}
                                />
                                <ErrorMessage message={errors.manualId} />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClasses}>Product Name</label>
                                <input name="name" value={formData.name} onChange={handleInputChange} className={inputClasses} placeholder="Full Product Title" />
                                <ErrorMessage message={errors.name} />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className={labelClasses}>Description</label>
                            <textarea name="description" rows={3} value={formData.description} onChange={handleInputChange} className={inputClasses} placeholder="Product description..." />
                        </div>
                        <div className="mt-4 flex gap-4">
                             <div className="flex items-center gap-2">
                                <input type="checkbox" name="isBestseller" checked={formData.isBestseller} onChange={handleInputChange} className="accent-black w-4 h-4"/>
                                <label className="text-xs font-bold uppercase tracking-wide">Mark as Bestseller</label>
                             </div>
                        </div>
                    </section>

                    {/* Specs */}
                    <section>
                        <SectionHeader number="02" title="Specifications" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <label className={labelClasses}>Category</label>
                                <input name="category" value={formData.category} onChange={handleInputChange} className={inputClasses} placeholder="e.g. Jerseys" />
                                <ErrorMessage message={errors.category} />
                            </div>
                            <div>
                                <label className={labelClasses}>Collection Group</label>
                                <select name="categoryGroup" value={formData.categoryGroup} onChange={handleInputChange} className={inputClasses}>
                                    {collections.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    <option value="">None</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleInputChange} className={inputClasses}>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Unisex">Unisex</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Base Price (PHP)</label>
                                <input type="number" name="price" value={formData.price || 0} onChange={handleInputChange} className={inputClasses} />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 mt-6">
                             <div>
                                <label className={labelClasses}>Min Order Qty</label>
                                <input type="number" name="moq" value={formData.moq || 24} onChange={handleInputChange} className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Lead Time (Weeks)</label>
                                <input type="number" name="leadTimeWeeks" value={formData.leadTimeWeeks || 2} onChange={handleInputChange} className={inputClasses} />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className={labelClasses}>Printing Methods</label>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {PRINT_METHODS.map(m => (
                                    <button 
                                        key={m} 
                                        type="button"
                                        onClick={() => togglePrintingMethod(m)}
                                        className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${formData.supportedPrinting?.includes(m) ? 'bg-black text-white border-black' : 'bg-white text-zinc-400 border-zinc-200 hover:border-zinc-300'}`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Visuals */}
                    <section>
                        <SectionHeader number="03" title="Visual Variants" />
                        <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 space-y-6">
                            {/* Add New Color */}
                            <div className="flex items-end gap-4 p-4 bg-white rounded-xl border border-zinc-100">
                                <div className="flex-grow">
                                    <label className={labelClasses}>Variant Name</label>
                                    <input value={newColor.name} onChange={e => setNewColor(c => ({ ...c, name: e.target.value }))} placeholder="e.g. Midnight Blue" className={inputClasses} />
                                </div>
                                <div>
                                    <label className={labelClasses}>Hex Code</label>
                                    <div className="flex items-center gap-2 h-[42px] px-2 bg-zinc-50 border border-zinc-200 rounded-lg">
                                        <input type="color" value={newColor.hex} onChange={e => setNewColor(c => ({ ...c, hex: e.target.value }))} className="w-8 h-8 border-0 p-0 cursor-pointer bg-transparent" />
                                        <span className="text-xs font-mono text-zinc-500">{newColor.hex}</span>
                                    </div>
                                </div>
                                <button type="button" onClick={handleAddColor} className="h-[42px] px-6 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-zinc-800 transition-colors">
                                    Add Color
                                </button>
                            </div>

                            {/* Color List */}
                            <div className="space-y-3">
                                {(formData.availableColors as Color[]).map(color => (
                                    <Accordion key={color.name} title={color.name}>
                                        <div className="p-4 space-y-4">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-4 h-4 rounded-full border border-zinc-200" style={{backgroundColor: color.hex}}></span>
                                                    <span className="text-xs font-bold">{color.name}</span>
                                                </div>
                                                <button type="button" onClick={() => setFormData(p => ({...p, availableColors: p.availableColors.filter((col) => col.name !== color.name)}))} className="text-red-500 text-[10px] font-bold uppercase hover:underline">Remove Variant</button>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                <label className={labelClasses}>Image URLs (Host your images externally and paste links here)</label>
                                                {(formData.imageUrls[color.name] || []).map((url, idx) => (
                                                    <div key={idx} className="flex gap-2">
                                                        <input 
                                                            value={url} 
                                                            onChange={e => handleImageUrlChange(color.name, idx, e.target.value)} 
                                                            placeholder="https://..." 
                                                            className={inputClasses} 
                                                        />
                                                        <button type="button" onClick={() => setFormData(p => {
                                                            const copy = { ...p.imageUrls };
                                                            copy[color.name] = copy[color.name].filter((_, i) => i !== idx);
                                                            return { ...p, imageUrls: copy };
                                                        })} className="text-zinc-400 hover:text-red-500 p-2"><TrashIcon className="w-4 h-4"/></button>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => {
                                                    setFormData(prev => {
                                                        const copy = { ...prev.imageUrls };
                                                        copy[color.name] = [...(copy[color.name] || []), ''];
                                                        return { ...prev, imageUrls: copy };
                                                    });
                                                }} className="text-[10px] font-bold uppercase text-indigo-600 hover:underline">+ Add Image URL</button>
                                            </div>
                                        </div>
                                    </Accordion>
                                ))}
                                {formData.availableColors.length === 0 && <p className="text-center text-xs text-zinc-400 py-4">No color variants added yet.</p>}
                            </div>
                        </div>
                    </section>

                    {/* Sizing */}
                    <section>
                        <SectionHeader number="04" title="Sizing Chart" />
                        <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
                            <div className="grid grid-cols-4 gap-4 mb-4 items-end">
                                <div className="col-span-1">
                                    <label className={labelClasses}>Size</label>
                                    <input value={newSize.name} onChange={e => setNewSize(s => ({ ...s, name: e.target.value }))} placeholder="e.g. XL" className={inputClasses} />
                                </div>
                                <div className="col-span-1">
                                    <label className={labelClasses}>Width (in)</label>
                                    <input type="number" value={newSize.width || ''} onChange={e => setNewSize(s => ({ ...s, width: Number(e.target.value) }))} placeholder="20" className={inputClasses} />
                                </div>
                                <div className="col-span-1">
                                    <label className={labelClasses}>Length (in)</label>
                                    <input type="number" value={newSize.length || ''} onChange={e => setNewSize(s => ({ ...s, length: Number(e.target.value) }))} placeholder="28" className={inputClasses} />
                                </div>
                                <button type="button" onClick={handleAddSize} className="col-span-1 h-[42px] bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-zinc-800 transition-colors">
                                    Add Size
                                </button>
                            </div>

                            <div className="border border-zinc-200 rounded-lg overflow-hidden bg-white">
                                <table className="w-full text-left">
                                    <thead className="bg-zinc-50">
                                        <tr>
                                            <th className="px-4 py-2 text-[9px] font-black uppercase text-zinc-400 tracking-widest">Size</th>
                                            <th className="px-4 py-2 text-[9px] font-black uppercase text-zinc-400 tracking-widest">Width</th>
                                            <th className="px-4 py-2 text-[9px] font-black uppercase text-zinc-400 tracking-widest">Length</th>
                                            <th className="px-4 py-2 text-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100">
                                        {formData.availableSizes.map((size, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 text-xs font-bold">{size.name}</td>
                                                <td className="px-4 py-2 text-xs font-mono">{size.width}"</td>
                                                <td className="px-4 py-2 text-xs font-mono">{size.length}"</td>
                                                <td className="px-4 py-2 text-right">
                                                    <button type="button" onClick={() => handleRemoveSize(index)} className="text-zinc-400 hover:text-red-500"><TrashIcon className="w-3.5 h-3.5"/></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* Features */}
                    <section>
                        <SectionHeader number="05" title="Product Features" />
                        <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-xl border border-zinc-100 items-end">
                                <div>
                                    <label className={labelClasses}>Feature Name</label>
                                    <input 
                                        value={newFeature.name} 
                                        onChange={e => setNewFeature(f => ({ ...f, name: e.target.value }))} 
                                        placeholder="e.g. Moisture Wicking" 
                                        className={inputClasses} 
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Value / Description</label>
                                    <input 
                                        value={newFeature.value} 
                                        onChange={e => setNewFeature(f => ({ ...f, value: e.target.value }))} 
                                        placeholder="e.g. Keeps you dry" 
                                        className={inputClasses} 
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Icon / Image URL</label>
                                    <input 
                                        value={newFeature.imageUrl} 
                                        onChange={e => setNewFeature(f => ({ ...f, imageUrl: e.target.value }))} 
                                        placeholder="https://..." 
                                        className={inputClasses} 
                                    />
                                </div>
                                <button type="button" onClick={handleAddFeature} className="md:col-span-3 h-[42px] bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-zinc-800 transition-colors w-full">
                                    Add Feature
                                </button>
                            </div>

                            <div className="space-y-3">
                                {(formData.features || []).map((feature, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            {feature.imageUrl && (
                                                <img src={feature.imageUrl} alt={feature.name} className="w-10 h-10 object-cover rounded-md bg-zinc-100" />
                                            )}
                                            <div>
                                                <h4 className="text-xs font-bold uppercase">{feature.name}</h4>
                                                <p className="text-[10px] text-zinc-500">{feature.value}</p>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => handleRemoveFeature(index)} className="text-zinc-400 hover:text-red-500 p-2">
                                            <TrashIcon className="w-4 h-4"/>
                                        </button>
                                    </div>
                                ))}
                                {(!formData.features || formData.features.length === 0) && (
                                    <p className="text-center text-xs text-zinc-400 py-4">No specific features added.</p>
                                )}
                            </div>
                        </div>
                    </section>

                    <footer className="pt-6 border-t border-zinc-100 flex justify-end gap-4 sticky bottom-0 bg-white pb-4">
                        <button type="button" onClick={onClose} className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-black transition-colors">Cancel</button>
                        <button 
                            type="submit" 
                            disabled={isSaving}
                            className="px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-zinc-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <span>Save Changes</span>
                            )}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default ProductFormModal;
