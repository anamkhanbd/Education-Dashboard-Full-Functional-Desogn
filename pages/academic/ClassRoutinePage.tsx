import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface RoutineItem {
    id: string;
    day: string;
    period: number;
    subject: string;
    teacher: string;
}

const PERIODS = [1, 2, 3, 4, 5, 6, 7];

export const ClassRoutinePage: React.FC = () => {
    const { t } = useLanguage();
    const DAYS = [t('Sunday'), t('Monday'), t('Tuesday'), t('Wednesday'), t('Thursday')];
    
    const [selectedClass, setSelectedClass] = useState('10');
    const [routine, setRoutine] = useState<RoutineItem[]>([
        { id: '1', day: t('Sunday'), period: 1, subject: 'Mathematics', teacher: 'R. Uddin' },
        { id: '2', day: t('Sunday'), period: 2, subject: 'English', teacher: 'K. Ahmed' },
        { id: '3', day: t('Monday'), period: 1, subject: 'Bangla', teacher: 'S. Begum' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState<Partial<RoutineItem>>({ day: t('Sunday'), period: 1 });

    const getRoutineFor = (day: string, period: number) => {
        return routine.find(r => r.day === day && r.period === period);
    };

    const handleAdd = () => {
        if (newItem.subject && newItem.teacher) {
            setRoutine([...routine, { 
                id: Math.random().toString(), 
                day: newItem.day!, 
                period: newItem.period!, 
                subject: newItem.subject!, 
                teacher: newItem.teacher! 
            }]);
            setIsModalOpen(false);
            setNewItem({ day: t('Sunday'), period: 1 });
        }
    };

    const handleDelete = (id: string) => {
        if (confirm('Remove this class?')) {
            setRoutine(routine.filter(r => r.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('classRoutine')}</h2>
                <div className="flex gap-3">
                    <select 
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="6">Class 6</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                    </select>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:brightness-110"
                    >
                        <Plus size={18} /> <span className="hidden sm:inline">{t('add')}</span>
                    </button>
                </div>
            </div>

            <Card className="overflow-x-auto">
                <table className="w-full text-center border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                            <th className="p-3 border border-gray-200 dark:border-gray-700 font-bold text-gray-700 dark:text-gray-200 w-32">{t('day')} / {t('period')}</th>
                            {PERIODS.map(p => (
                                <th key={p} className="p-3 border border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-200">
                                    {p}{p === 1 ? 'st' : p === 2 ? 'nd' : p === 3 ? 'rd' : 'th'} {t('period')}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {DAYS.map(day => (
                            <tr key={day} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                                <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium text-[var(--color-primary)] bg-gray-50 dark:bg-gray-800/50">
                                    {day}
                                </td>
                                {PERIODS.map(period => {
                                    const item = getRoutineFor(day, period);
                                    return (
                                        <td key={period} className="p-2 border border-gray-200 dark:border-gray-700 relative h-24 align-top">
                                            {item ? (
                                                <div className="h-full flex flex-col justify-between bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-sm border border-blue-100 dark:border-blue-800 group">
                                                    <div className="font-semibold text-gray-800 dark:text-gray-200">{item.subject}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.teacher}</div>
                                                    <button 
                                                        onClick={() => handleDelete(item.id)}
                                                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-gray-300 dark:text-gray-600 text-xs">-</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
                        <h3 className="text-xl font-bold dark:text-white">{t('add')}</h3>
                        
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('day')}</label>
                            <select 
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newItem.day}
                                onChange={(e) => setNewItem({...newItem, day: e.target.value})}
                            >
                                {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('period')}</label>
                            <select 
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newItem.period}
                                onChange={(e) => setNewItem({...newItem, period: Number(e.target.value)})}
                            >
                                {PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('subject')}</label>
                            <input 
                                type="text" 
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newItem.subject || ''}
                                onChange={(e) => setNewItem({...newItem, subject: e.target.value})}
                                placeholder="e.g. Mathematics"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('teacher')}</label>
                            <input 
                                type="text" 
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newItem.teacher || ''}
                                onChange={(e) => setNewItem({...newItem, teacher: e.target.value})}
                                placeholder="e.g. Mr. Rahim"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700">{t('cancel')}</button>
                            <button onClick={handleAdd} className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg">{t('add')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};