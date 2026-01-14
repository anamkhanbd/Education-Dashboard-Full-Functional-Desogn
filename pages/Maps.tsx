import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Save, MapPin } from 'lucide-react';

export const MapsPage: React.FC = () => {
    const [mapSrc, setMapSrc] = useState('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430138!2d90.39108031536297!3d23.75085809467636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b888ad3f988d%3A0x82c03fb22ac50e51!2sDhaka!5e0!3m2!1sen!2sbd!4v1633512345678!5m2!1sen!2sbd');
    const [inputVal, setInputVal] = useState(mapSrc);

    const handleUpdate = () => {
        // Simple extraction if user pastes full iframe code, or just use url
        let src = inputVal;
        if(inputVal.includes('<iframe')) {
             const match = inputVal.match(/src="([^"]+)"/);
             if(match && match[1]) src = match[1];
        }
        setMapSrc(src);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Google Maps Integration</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Map Configuration">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Google Maps Embed Link
                            </label>
                            <textarea 
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                rows={6}
                                placeholder="Paste the embed URL or the full <iframe> code from Google Maps here..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)] font-mono text-sm"
                            />
                        </div>
                        <button 
                            onClick={handleUpdate}
                            className="flex items-center gap-2 px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:brightness-110"
                        >
                            <Save size={18} /> Update Map
                        </button>
                    </div>
                </Card>

                <Card title="Live Preview" className="h-full min-h-[400px]">
                    <div className="w-full h-full min-h-[300px] bg-gray-100 rounded-lg overflow-hidden relative">
                         <iframe 
                            src={mapSrc} 
                            width="100%" 
                            height="100%" 
                            style={{border:0, minHeight: '300px'}} 
                            allowFullScreen 
                            loading="lazy"
                        ></iframe>
                        {!mapSrc && (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                <div className="text-center">
                                    <MapPin size={48} className="mx-auto mb-2 opacity-50" />
                                    <p>No map loaded</p>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};