import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Save, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ContactPage: React.FC = () => {
    const { t } = useLanguage();
    const [info, setInfo] = useState({
        mobile: '+880 1700 000000',
        email: 'info@eduadmin.com',
        address: '123 School Road, Dhaka, Bangladesh',
        geoLocation: '23.7508, 90.3911'
    });

    const handleSave = () => {
        alert("Contact Information Updated!");
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('contactInfo')}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title={t('updateContact')}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                <Phone size={14} className="inline mr-1" /> {t('mobile')}
                            </label>
                            <input type="text" className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={info.mobile} onChange={e => setInfo({...info, mobile: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                <Mail size={14} className="inline mr-1" /> {t('email')}
                            </label>
                            <input type="email" className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={info.email} onChange={e => setInfo({...info, email: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                <MapPin size={14} className="inline mr-1" /> {t('physicalAddress')}
                            </label>
                            <textarea className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={3}
                                value={info.address} onChange={e => setInfo({...info, address: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                <Globe size={14} className="inline mr-1" /> {t('geoLocation')}
                            </label>
                            <input type="text" className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={info.geoLocation} onChange={e => setInfo({...info, geoLocation: e.target.value})} 
                                placeholder="e.g. 23.8103, 90.4125" />
                        </div>
                        <div className="flex justify-end pt-2">
                            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:brightness-110">
                                <Save size={18} /> {t('saveChanges')}
                            </button>
                        </div>
                    </div>
                </Card>

                <Card title={t('preview')}>
                    <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-lg space-y-4">
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white border-b pb-2">{t('contactInfo')}</h3>
                        <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                            <Phone className="mt-1 shrink-0 text-[var(--color-primary)]" size={18} />
                            <span>{info.mobile}</span>
                        </div>
                        <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                            <Mail className="mt-1 shrink-0 text-[var(--color-primary)]" size={18} />
                            <span>{info.email}</span>
                        </div>
                        <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                            <MapPin className="mt-1 shrink-0 text-[var(--color-primary)]" size={18} />
                            <span>{info.address}</span>
                        </div>
                        <div className="h-40 w-full bg-gray-200 rounded-lg mt-4 flex items-center justify-center text-gray-500 text-sm">
                            Map View for {info.geoLocation}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};