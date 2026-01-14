import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Upload, Save } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const LogoTitlePage: React.FC = () => {
    const { t } = useLanguage();
    const [title, setTitle] = useState('EduAdmin Pro');
    const [logo, setLogo] = useState<string | null>(null);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setLogo(ev.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSave = () => {
        alert('Settings Saved Successfully!');
        // In real app, make API call here
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('logoTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title={t('websiteTitle')}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {t('applicationName')}
                            </label>
                            <input 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                        </div>
                        <p className="text-sm text-gray-500">This title will appear in the browser tab and sidebar.</p>
                        <button 
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:brightness-110"
                        >
                            <Save size={18} /> {t('saveTitle')}
                        </button>
                    </div>
                </Card>

                <Card title={t('websiteLogo')}>
                     <div className="space-y-4">
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700/30 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700/50">
                                {logo ? (
                                    <img src={logo} alt="Logo Preview" className="h-full object-contain p-2" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                        <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
                                    </div>
                                )}
                                <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                            </label>
                        </div>
                        <button 
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:brightness-110"
                        >
                            <Save size={18} /> {t('saveLogo')}
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
};