import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Calendar as CalendarIcon, Flag, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Holiday {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  type: 'Government' | 'School';
}

export const HolidayCalendarPage: React.FC = () => {
    const { t } = useLanguage();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newHoliday, setNewHoliday] = useState<Partial<Holiday>>({ type: 'School', date: new Date().toISOString().split('T')[0] });
    
    // Mock Data
    const [holidays, setHolidays] = useState<Holiday[]>([
        { id: '1', date: '2024-02-21', title: 'Intl. Mother Language Day', type: 'Government' },
        { id: '2', date: '2024-03-17', title: 'Sheikh Mujibur Rahman Birthday', type: 'Government' },
        { id: '3', date: '2024-03-26', title: 'Independence Day', type: 'Government' },
        { id: '4', date: '2024-04-10', title: 'Eid-ul-Fitr (Start)', type: 'Government' },
        { id: '5', date: '2024-04-14', title: 'Pahela Baishakh', type: 'Government' },
        { id: '6', date: '2024-05-01', title: 'May Day', type: 'Government' },
        { id: '7', date: '2024-05-23', title: 'Buddha Purnima', type: 'Government' },
        { id: '8', date: '2024-06-17', title: 'Eid-ul-Adha', type: 'Government' },
        { id: '9', date: '2024-07-17', title: 'Ashura', type: 'Government' },
        { id: '10', date: '2024-08-15', title: 'National Mourning Day', type: 'Government' },
        { id: '11', date: '2024-08-26', title: 'Janmashtami', type: 'Government' },
        { id: '12', date: '2024-09-16', title: 'Eid-e-Miladunnabi', type: 'Government' },
        { id: '13', date: '2024-10-13', title: 'Durga Puja (Bijoya Dashami)', type: 'Government' },
        { id: '14', date: '2024-12-16', title: 'Victory Day', type: 'Government' },
        { id: '15', date: '2024-12-25', title: 'Christmas Day', type: 'Government' },
    ]);

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleAddHoliday = () => {
        if (newHoliday.title && newHoliday.date) {
            setHolidays([...holidays, { 
                id: Math.random().toString(), 
                date: newHoliday.date, 
                title: newHoliday.title, 
                type: newHoliday.type as 'Government' | 'School' 
            }]);
            setIsModalOpen(false);
            setNewHoliday({ type: 'School', date: new Date().toISOString().split('T')[0], title: '' });
        }
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const startDayOffset = getFirstDayOfMonth(currentDate);
        const days = [];

        for (let i = 0; i < startDayOffset; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700"></div>);
        }

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');

        for (let i = 1; i <= daysInMonth; i++) {
            const dayStr = String(i).padStart(2, '0');
            const dateStr = `${year}-${month}-${dayStr}`;
            
            const dateObj = new Date(year, currentDate.getMonth(), i);
            const dayOfWeek = dateObj.getDay();
            const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

            const dayHolidays = holidays.filter(h => h.date === dateStr);
            const isGovtHoliday = isWeekend || dayHolidays.some(h => h.type === 'Government');
            const isSchoolHoliday = dayHolidays.some(h => h.type === 'School');
            
            const isToday = new Date().toISOString().split('T')[0] === dateStr;

            days.push(
                <div 
                    key={i} 
                    className={`h-24 md:h-32 border border-gray-100 dark:border-gray-700 p-1 md:p-2 relative transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 
                        ${isGovtHoliday ? 'bg-red-50 dark:bg-red-900/10' : isSchoolHoliday ? 'bg-blue-50 dark:bg-blue-900/10' : 'bg-white dark:bg-gray-800'}
                        ${isToday ? 'ring-2 ring-inset ring-[var(--color-primary)]' : ''}
                    `}
                >
                    <span className={`text-sm font-semibold w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full 
                        ${isGovtHoliday ? 'bg-red-500 text-white' : isSchoolHoliday ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'}
                        ${isToday && !isGovtHoliday && !isSchoolHoliday ? 'bg-[var(--color-primary)] text-white' : ''}
                    `}>
                        {i}
                    </span>
                    
                    <div className="mt-1 md:mt-2 space-y-1 overflow-y-auto max-h-[calc(100%-2rem)] custom-scrollbar">
                        {isWeekend && !dayHolidays.length && (
                            <div className="p-1 rounded text-[10px] md:text-xs font-medium truncate bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                                {t('weekend')}
                            </div>
                        )}
                        {dayHolidays.map((h, idx) => (
                             <div key={idx} className={`p-1 rounded text-[10px] md:text-xs font-medium truncate ${h.type === 'Government' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'}`} title={h.title}>
                                {h.type === 'Government' && <Flag size={8} className="inline mr-1" fill="currentColor" />}
                                {h.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return days;
    };

    const upcomingHolidays = holidays
        .filter(h => new Date(h.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                 <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <CalendarIcon className="text-[var(--color-primary)]" />
                    {t('holidayList')}
                </h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:brightness-110"
                >
                    <Plus size={18} /> {t('add')}
                </button>
            </div>
           
            <Card>
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                            <ChevronLeft size={24} />
                        </button>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white w-48 text-center">
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h3>
                         <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                    
                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                            <span className="text-gray-600 dark:text-gray-300">{t('govtHoliday')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                            <span className="text-gray-600 dark:text-gray-300">{t('schoolHoliday')}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-7 text-center mb-2">
                    {[t('Sunday'), t('Monday'), t('Tuesday'), t('Wednesday'), t('Thursday'), t('Friday'), t('Saturday')].map((d, i) => (
                        <div key={i} className={`font-semibold py-2 text-sm md:text-base ${(i === 5 || i === 6) ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                            {d.substring(0, 3)}
                        </div>
                    ))}
                </div>
                
                <div className="grid grid-cols-7 border-t border-l border-gray-100 dark:border-gray-700">
                    {renderCalendar()}
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title={t('upcomingHolidays')}>
                    {upcomingHolidays.length > 0 ? (
                        <ul className="space-y-3">
                            {upcomingHolidays.map((h) => (
                                <li key={h.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-white">{h.title}</p>
                                        <p className="text-xs text-gray-500">{new Date(h.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${h.type === 'Government' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                        {h.type === 'Government' ? 'Govt.' : 'School'}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center py-4">{t('noData')}</p>
                    )}
                </Card>
                 <Card title={t('settings')}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Manage academic sessions and holiday configurations. You can sync with the national database or add manual entries.
                    </p>
                    <button className="w-full py-2 bg-[var(--color-primary)] text-white rounded-lg hover:brightness-110">
                        {t('syncNational')}
                    </button>
                </Card>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
                            <h3 className="text-xl font-bold dark:text-white">{t('add')}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:bg-gray-100 rounded-full p-1">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('title')}</label>
                            <input 
                                type="text" 
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newHoliday.title || ''}
                                onChange={(e) => setNewHoliday({...newHoliday, title: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('day')}</label>
                            <input 
                                type="date" 
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newHoliday.date}
                                onChange={(e) => setNewHoliday({...newHoliday, date: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-gray-300">{t('status')}</label>
                            <select 
                                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={newHoliday.type}
                                onChange={(e) => setNewHoliday({...newHoliday, type: e.target.value as any})}
                            >
                                <option value="School">{t('schoolHoliday')}</option>
                                <option value="Government">{t('govtHoliday')}</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700">{t('cancel')}</button>
                            <button onClick={handleAddHoliday} className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg">{t('add')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};