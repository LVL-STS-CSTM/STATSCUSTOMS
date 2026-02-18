
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ProductFeature } from '../types';
import ProductFeatureFormModal from './ProductFeatureFormModal';
import { DragHandleIcon } from './icons';

const ProductFeatureManagement: React.FC = () => {
    const { productFeatures, updateData } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [featureToEdit, setFeatureToEdit] = useState<ProductFeature | null>(null);

    const handleAddNew = () => {
        setFeatureToEdit(null);
        setIsModalOpen(true);
    };

    const handleEdit = (feature: ProductFeature) => {
        setFeatureToEdit(feature);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Delete this feature?')) {
            const newFeatures = productFeatures.filter(f => f.id !== id);
            updateData('productFeatures', newFeatures);
        }
    };

    return (
        <>
            <div className="bg-[#E0E0E0] shadow-md rounded-lg overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Manage Product Page Features ({productFeatures.length})</h2>
                    <button
                        onClick={handleAddNew}
                        className="px-4 py-2 bg-[#3A3A3A] text-white text-sm font-semibold rounded-md hover:bg-[#4f4f4f] transition-colors"
                    >
                        Add New Feature
                    </button>
                </div>
                <div className="divide-y divide-gray-200">
                    {productFeatures.sort((a,b) => (a.displayOrder || 0) - (b.displayOrder || 0)).map((feature) => (
                        <div key={feature.id} className="p-4 flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="w-16 h-20 bg-gray-100 rounded-md overflow-hidden shrink-0">
                                <img src={feature.imageUrl} alt={feature.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                            </div>
                            <div className="ml-4 flex-shrink-0 space-x-2 self-center">
                                <button onClick={() => handleEdit(feature)} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Edit</button>
                                <button onClick={() => handleDelete(feature.id)} className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                            </div>
                        </div>
                    ))}
                    {productFeatures.length === 0 && (
                        <div className="text-center py-10 text-gray-500">No features found.</div>
                    )}
                </div>
            </div>
            {isModalOpen && (
                <ProductFeatureFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    featureToEdit={featureToEdit}
                />
            )}
        </>
    );
};

export default ProductFeatureManagement;
