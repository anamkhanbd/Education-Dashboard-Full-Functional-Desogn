import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Save } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
    const [content, setContent] = useState('Welcome to EduAdmin High School, a place of excellence...');

    const handleSave = () => {
        alert("About Us content updated!");
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">About Us</h2>
            
            <Card title="Update Content">
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                    </label>
                    <textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={12}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                    <div className="flex justify-end gap-3">
                         <button 
                            onClick={() => setContent('')}
                            className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        >
                            Clear
                        </button>
                        <button 
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:brightness-110"
                        >
                            <Save size={18} /> Save Content
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};