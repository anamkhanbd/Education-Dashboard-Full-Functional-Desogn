import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Plus, Search, Trash2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Result {
    id: string;
    studentName: string;
    roll: string;
    class: string;
    exam: string;
    gpa: string;
    grade: string;
}

export const OnlineResultPage: React.FC = () => {
    const { t } = useLanguage();
    const [results, setResults] = useState<Result[]>([
        { id: '1', studentName: 'Abul Hasan', roll: '101', class: '10', exam: 'Half Yearly 2023', gpa: '5.00', grade: 'A+' },
        { id: '2', studentName: 'Babul Miah', roll: '102', class: '10', exam: 'Half Yearly 2023', gpa: '4.50', grade: 'A' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<Result>>({ class: '10', exam: 'Half Yearly 2023' });

    const handleSave = () => {
        if (formData.studentName && formData.roll && formData.gpa) {
            setResults([...results, {
                id: Math.random().toString(),
                studentName: formData.studentName!,
                roll: formData.roll!,
                class: formData.class!,
                exam: formData.exam!,
                gpa: formData.gpa!,
                grade: formData.grade || 'A'
            }]);
            setIsModalOpen(false);
            setFormData({ ...formData, studentName: '', roll: '', gpa: '', grade: '' });
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('onlineResult')}</h2>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:brightness-110"
                    >
                        <Plus size={18} /> {t('publishNewResult')}
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">
                                <th className="p-4">{t('studentName')}</th>
                                <th className="p-4">{t('class')}</th>
                                <th className="p-4">{t('roll')}</th>
                                <th className="p-4">{t('examName')}</th>
                                <th className="p-4">{t('gpa')}</th>
                                <th className="p-4">{t('grade')}</th>
                                <th className="p-4 text-right">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(res => (
                                <tr key={res.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{res.studentName}</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400">{res.class}</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400">{res.roll}</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400">{res.exam}</td>
                                    <td className="p-4 font-bold text-[var(--color-primary)]">{res.gpa}</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-400">{res.grade}</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => setResults(results.filter(r => r.id !== res.id))} className="text-red-500 hover:bg-red-50 p-2 rounded">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
                        <h3 className="text-xl font-bold dark:text-white">{t('publish')}</h3>
                        
                        <div className="space-y-3">
                            <input type="text" placeholder={t('studentName')} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.studentName || ''} onChange={e => setFormData({...formData, studentName: e.target.value})} />
                            
                            <div className="flex gap-2">
                                <input type="text" placeholder={t('roll')} className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.roll || ''} onChange={e => setFormData({...formData, roll: e.target.value})} />
                                <select className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})}>
                                    <option value="6">Class 6</option>
                                    <option value="7">Class 7</option>
                                    <option value="8">Class 8</option>
                                    <option value="9">Class 9</option>
                                    <option value="10">Class 10</option>
                                </select>
                            </div>

                            <input type="text" placeholder={t('examName')} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.exam || ''} onChange={e => setFormData({...formData, exam: e.target.value})} />

                            <div className="flex gap-2">
                                <input type="text" placeholder={`${t('gpa')} (e.g. 5.00)`} className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.gpa || ''} onChange={e => setFormData({...formData, gpa: e.target.value})} />
                                <input type="text" placeholder={`${t('grade')} (e.g. A+)`} className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.grade || ''} onChange={e => setFormData({...formData, grade: e.target.value})} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300">{t('cancel')}</button>
                            <button onClick={handleSave} className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg">{t('publish')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};