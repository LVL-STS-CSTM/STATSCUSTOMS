import React from 'react';
import { useData } from '../context/DataContext';
import PageHeader from './PageHeader';
import LazyImage from './LazyImage';

const OurProcessPage: React.FC = () => {
    const { howWeWorkSections } = useData();

    return (
        <div className="bg-white">
            <PageHeader page="our-process" fallbackTitle="Our Process" fallbackDescription="Our careful process ensures every piece meets our high standards of quality." />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="space-y-32">
                    {howWeWorkSections.map((section, index) => (
                        <div key={section.id} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="w-full lg:w-3/5">
                                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-50">
                                    <LazyImage src={section.imageUrl} alt={section.title} aspectRatio="aspect-[4/3]" />
                                </div>
                            </div>
                            <div className="w-full lg:w-2/5 space-y-6">
                                <h3 className="font-rheiborn text-2xl text-gray-900 uppercase tracking-widest">{section.title}</h3>
                                <p className="text-gray-500 leading-loose text-lg font-futura font-light antialiased">{section.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurProcessPage;