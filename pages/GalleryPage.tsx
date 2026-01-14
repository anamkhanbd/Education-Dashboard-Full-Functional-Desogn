import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Upload, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const GalleryPage: React.FC = () => {
    const { t } = useLanguage();
    const [images, setImages] = useState([
        { id: '1', url: 'https://picsum.photos/400/300?random=1', title: 'Sports Day' },
        { id: '2', url: 'https://picsum.photos/400/300?random=2', title: 'Science Fair' },
        { id: '3', url: 'https://picsum.photos/400/300?random=3', title: 'Cultural Program' },
    ]);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImages([...images, {
                    id: Math.random().toString(),
                    url: ev.target?.result as string,
                    title: 'New Upload'
                }]);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleDelete = (id: string) => {
        if(confirm('Delete this photo?')) {
            setImages(images.filter(img => img.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('gallery')}</h2>
                    <label className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:brightness-110 cursor-pointer">
                        <Upload size={18} />
                        <span>{t('upload')}</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                    </label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map(img => (
                        <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border dark:border-gray-700">
                            <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                <p className="text-white text-sm font-medium truncate mb-2">{img.title}</p>
                                <button 
                                    onClick={() => handleDelete(img.id)}
                                    className="p-2 bg-red-500 text-white rounded-lg self-end hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 aspect-square">
                        <Plus size={32} className="text-gray-400" />
                        <span className="text-sm text-gray-500 mt-2">{t('addPhoto')}</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                    </label>
                </div>
            </Card>
        </div>
    );
};