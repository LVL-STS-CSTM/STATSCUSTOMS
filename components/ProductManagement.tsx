
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Product } from '../types';
import ProductFormModal from './ProductFormModal';
import { DragHandleIcon, SearchIcon, PlusIcon } from './icons';

const SortIcon: React.FC<{ direction?: 'asc' | 'desc' }> = ({ direction }) => {
    if (!direction) return <span className="w-3 h-3 inline-block ml-1 opacity-20">↕</span>;
    return direction === 'asc' ? <span className="w-3 h-3 inline-block ml-1">↑</span> : <span className="w-3 h-3 inline-block ml-1">↓</span>;
};

type SortableKeys = 'id' | 'name' | 'category' | 'categoryGroup' | 'gender';

const ProductManagement: React.FC = () => {
    const { products, updateData } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'asc' | 'desc' } | null>(null);

    const [localProductOrder, setLocalProductOrder] = useState<Product[]>([]);
    const [hasOrderChanges, setHasOrderChanges] = useState(false);

    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const isReorderingMode = !searchTerm && !sortConfig;

    useEffect(() => {
        setLocalProductOrder([...products].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
        setHasOrderChanges(false);
    }, [products]);

    const displayedProducts = useMemo(() => {
        let items: Product[] = isReorderingMode ? [...localProductOrder] : [...products];

        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            items = items.filter(p =>
                (p.id || '').toLowerCase().includes(lowercasedTerm) ||
                (p.name || '').toLowerCase().includes(lowercasedTerm) ||
                (p.category || '').toLowerCase().includes(lowercasedTerm) ||
                (p.categoryGroup || '').toLowerCase().includes(lowercasedTerm) ||
                (p.gender || '').toLowerCase().includes(lowercasedTerm)
            );
        }

        if (sortConfig) {
            items.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];
                if (!aVal) return 1;
                if (!bVal) return -1;
                
                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        } else if (!isReorderingMode) {
            items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        }

        return items;
    }, [products, localProductOrder, searchTerm, sortConfig, isReorderingMode]);
    
    const requestSort = (key: SortableKeys) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig?.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const resetToReorderingMode = () => {
        setSortConfig(null);
        setSearchTerm('');
    };

    const handleAddNew = () => {
        setProductToEdit(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleDelete = (productId: string) => {
        if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            const newProducts = products.filter(p => p.id !== productId);
            updateData('products', newProducts);
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
        dragItem.current = index;
        e.currentTarget.classList.add('bg-zinc-100', 'shadow-md');
    };

    const handleDragEnter = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
        dragOverItem.current = index;
    };

    const handleDragEnd = (e: React.DragEvent<HTMLTableRowElement>) => {
        e.currentTarget.classList.remove('bg-zinc-100', 'shadow-md');
        if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
            const newProducts = [...localProductOrder];
            const draggedItemContent = newProducts.splice(dragItem.current, 1)[0];
            newProducts.splice(dragOverItem.current, 0, draggedItemContent);
            setLocalProductOrder(newProducts);
            setHasOrderChanges(true);
        }
        dragItem.current = null;
        dragOverItem.current = null;
    };
    
    const handleSaveOrder = () => {
        const reorderedProducts = localProductOrder.map((p, index) => ({ ...p, displayOrder: index }));
        updateData('products', reorderedProducts);
        setHasOrderChanges(false);
    };

    const handleCancelOrderChanges = () => {
        setLocalProductOrder([...products].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
        setHasOrderChanges(false);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-2xl font-eurostile font-black uppercase tracking-widest">Inventory</h2>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Manage catalogue items</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-grow md:flex-grow-0">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                        <input
                            type="search"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-black w-full"
                        />
                    </div>
                    {isReorderingMode && hasOrderChanges && (
                        <>
                            <button onClick={handleCancelOrderChanges} className="px-4 py-2.5 bg-zinc-100 text-zinc-600 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-zinc-200 transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleSaveOrder} className="px-4 py-2.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200">
                                Save Order
                            </button>
                        </>
                    )}
                    <button onClick={handleAddNew} className="flex items-center gap-2 px-6 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-zinc-800 transition-all shadow-lg">
                        <PlusIcon className="w-4 h-4" /> Add Item
                    </button>
                </div>
            </div>

            {!isReorderingMode && (
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-center text-[10px] font-black uppercase tracking-widest text-indigo-700 mb-6">
                    Sorting active. Reordering disabled. <button onClick={resetToReorderingMode} className="underline ml-1">Reset</button>
                </div>
            )}
            
            <div className="bg-white shadow-sm rounded-xl border border-zinc-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-zinc-100">
                        <thead className="bg-zinc-50">
                            <tr>
                                <th className="px-3 py-4 w-10 text-center text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] cursor-pointer hover:text-black" onClick={resetToReorderingMode}>#</th>
                                <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] cursor-pointer hover:text-black select-none" onClick={() => requestSort('id')}>
                                    Ref ID <SortIcon direction={sortConfig?.key === 'id' ? sortConfig.direction : undefined} />
                                </th>
                                <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] cursor-pointer hover:text-black select-none" onClick={() => requestSort('name')}>
                                    Name <SortIcon direction={sortConfig?.key === 'name' ? sortConfig.direction : undefined} />
                                </th>
                                <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] cursor-pointer hover:text-black select-none" onClick={() => requestSort('category')}>
                                    Category <SortIcon direction={sortConfig?.key === 'category' ? sortConfig.direction : undefined} />
                                </th>
                                <th className="px-6 py-4 text-left text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] cursor-pointer hover:text-black select-none" onClick={() => requestSort('categoryGroup')}>
                                    Group <SortIcon direction={sortConfig?.key === 'categoryGroup' ? sortConfig.direction : undefined} />
                                </th>
                                <th className="px-6 py-4 text-center text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Tag</th>
                                <th className="px-6 py-4 text-right text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-zinc-50">
                            {displayedProducts.map((product, index) => (
                                <tr 
                                    key={product.id}
                                    draggable={isReorderingMode}
                                    onDragStart={isReorderingMode ? (e) => handleDragStart(e, index) : undefined}
                                    onDragEnter={isReorderingMode ? (e) => handleDragEnter(e, index) : undefined}
                                    onDragEnd={isReorderingMode ? handleDragEnd : undefined}
                                    onDragOver={isReorderingMode ? (e) => e.preventDefault() : undefined}
                                    className={`transition-colors hover:bg-zinc-50 group ${isReorderingMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
                                >
                                    <td className="px-3 py-4 whitespace-nowrap text-zinc-300 text-center">
                                        {isReorderingMode ? <DragHandleIcon className="w-4 h-4 inline-block group-hover:text-zinc-500"/> : index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[10px] font-mono font-bold text-zinc-500">{product.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs font-black uppercase text-zinc-900 tracking-tight">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[10px] font-bold uppercase text-zinc-500 tracking-widest">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[10px] font-bold uppercase text-zinc-500 tracking-widest">{product.categoryGroup}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        {product.isBestseller && <span className="px-2 py-0.5 bg-black text-white text-[8px] font-black uppercase rounded tracking-wider">Top Seller</span>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-4">
                                        <button onClick={() => handleEdit(product)} className="text-[9px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors">Edit</button>
                                        <button onClick={() => handleDelete(product.id)} className="text-[9px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">Remove</button>
                                    </td>
                                </tr>
                            ))}
                            {displayedProducts.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center py-20 text-zinc-300 text-[10px] font-black uppercase tracking-[0.4em]">
                                        No items in inventory
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <ProductFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    productToEdit={productToEdit}
                />
            )}
        </>
    );
};

export default ProductManagement;
