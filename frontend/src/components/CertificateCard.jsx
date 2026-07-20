import React, { useState } from 'react';

export default function CertificateCard({ url, title }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="group relative overflow-hidden rounded-lg shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-105">
            <img 
                src={url} 
                alt={title} 
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => setIsOpen(true)}
            />
            <p className="p-2 text-center text-sm font-medium text-gray-700">{title}</p>

            {/* Modal للعرض بالحجم الكامل */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <img src={url} alt="Full view" className="max-w-full max-h-full rounded" />
                    <button className="absolute top-5 right-5 text-white text-3xl font-bold">&times;</button>
                </div>
            )}
        </div>
    );
}