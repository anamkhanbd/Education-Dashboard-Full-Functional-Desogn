import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Plus, Trash2, Edit2, Image as ImageIcon } from 'lucide-react';

interface BannerImage {
    id: string;
    url: string;
    type: 'Banner' | 'Cover';
    title: string;
}

export const BannerCoverPage: React.FC = () => {
    const [images, setImages] = useState<BannerImage[]>([
        { id: '1', url: 'https://picsum.photos/800/400?random=1', type: 'Banner', title: 'Main Hero Banner' },
        { id: '2', url: 'https://picsum.photos/800/400?random=2', type: 'Cover', title: 'Event Cover 2023' }
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState<{type: 'Banner' | 'Cover', title: string}>({ type: 'Banner', title: '' });

    const handleDelete = (id: string) => {
        if(confirm('Delete this image?')) {
            setImages(images.filter(img => img.id !== id));
        }
    };

    const handleAdd = () => {
        // Mock add
        setImages([...images, { 
            id: Math.random().toString(), 
            url: `https://picsum.photos/800/400?random=${Math.random()}`, 
            type: newItem.type, 
            title: newItem.title 
        }]);
        setIsModalOpen(false);
        setNewItem({ type: 'Banner', title: '' });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Banner & Cover Images</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:brightness-110"
                >
                    <Plus size={18} /> Add New
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {images.map(img => (
                    <Card key={img.id} className="overflow-hidden">
                        <div className="relative h-48 w-full bg-gray-200">
                            <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button className="p-2 bg-white/90 rounded-full text-blue-600 hover:bg-white shadow-sm">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(img.id)} className="p-2 bg-white/90 rounded-full text-red-500 hover:bg-white shadow-sm">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <span className="absolute bottom-2 left-2 px-3 py-1 bg-black/60 text-white text-xs rounded-full">
                                {img.type}
                            </span>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800 dark:text-white">{img.title}</h3>
                        </div>
                    </Card>
                ))}
            </div>

             {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
                        <h3 className="text-xl font-bold dark:text-white">Add New Image</h3>
                        
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Title</label>
                            <input 
                                type="text" 
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newItem.title}
                                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Type</label>
                            <select 
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newItem.type}
                                onChange={(e) => setNewItem({...newItem, type: e.target.value as any})}
                            >
                                <option value="Banner">Banner</option>
                                <option value="Cover">Cover</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Upload Image</label>
                            <input type="file" className="w-full text-sm dark:text-gray-300" accept="image/*" />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700">Cancel</button>
                            <button onClick={handleAdd} className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};