import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Save, UserCircle } from 'lucide-react';

interface SingleContentPageProps {
  title: string;
  initialContent: string;
  role: string;
}

export const SingleContentPage: React.FC<SingleContentPageProps> = ({ title, initialContent, role }) => {
    const [content, setContent] = useState(initialContent);

    const handleSave = () => {
        alert(`${title} updated successfully!`);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
            
            <div className="flex gap-4 items-center mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <UserCircle size={40} className="text-[var(--color-primary)]" />
                <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Edit Message from {role}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Update the official message displayed on the website.</p>
                </div>
            </div>

            <Card title="Message Content">
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Message Body
                    </label>
                    <textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={15}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)] leading-relaxed"
                        placeholder="Type your message here..."
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
                            <Save size={18} /> Save Message
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};