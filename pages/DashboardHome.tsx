import React from 'react';
import { 
  Users, 
  GraduationCap, 
  Megaphone, 
  DollarSign, 
  ArrowUp,
  ArrowDown,
  School,
  Book,
  Calendar
} from 'lucide-react';
import { Card } from '../components/UI/Card';
import { useLanguage } from '../contexts/LanguageContext';

const StatCard: React.FC<{ 
  title: string; 
  value: string; 
  icon: any; 
  trend: string; 
  isPositive: boolean; 
}> = ({ title, value, icon: Icon, trend, isPositive }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{value}</h3>
      </div>
      <div className="p-3 bg-[var(--color-primary)]/10 rounded-lg">
        <Icon className="text-[var(--color-primary)]" size={24} />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2">
      {isPositive ? <ArrowUp size={16} className="text-green-500" /> : <ArrowDown size={16} className="text-red-500" />}
      <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{trend}</span>
      <span className="text-xs text-gray-400">vs last month</span>
    </div>
  </div>
);

export const DashboardHome: React.FC = () => {
  const { t } = useLanguage();

  const classData = [
      { class: 'Class 6', students: 125, sections: 'A, B, C', teacher: 'Mrs. Salma' },
      { class: 'Class 7', students: 118, sections: 'A, B', teacher: 'Mr. Rahman' },
      { class: 'Class 8', students: 132, sections: 'A, B, C', teacher: 'Mr. Karim' },
      { class: 'Class 9', students: 110, sections: 'Science, Arts', teacher: 'Mrs. Rehana' },
      { class: 'Class 10', students: 105, sections: 'Science, Commerce', teacher: 'Mr. Bashir' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t('totalStudents')} 
          value="590" 
          icon={GraduationCap} 
          trend="+12%" 
          isPositive={true} 
        />
        <StatCard 
          title={t('totalTeachers')} 
          value="48" 
          icon={Users} 
          trend="+2%" 
          isPositive={true} 
        />
        <StatCard 
          title={t('activeNotices')} 
          value="7" 
          icon={Megaphone} 
          trend="-1" 
          isPositive={false} 
        />
        <StatCard 
          title="Total Revenue" 
          value="$24,500" 
          icon={DollarSign} 
          trend="+8.5%" 
          isPositive={true} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Wise Data */}
        <Card title="Class Wise Data" className="lg:col-span-2">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                            <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Class</th>
                            <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Total Students</th>
                            <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Sections</th>
                            <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Class Teacher</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classData.map((item, index) => (
                            <tr key={index} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="py-3 px-4 font-medium text-[var(--color-primary)]">{item.class}</td>
                                <td className="py-3 px-4 dark:text-gray-300">{item.students}</td>
                                <td className="py-3 px-4 dark:text-gray-300">{item.sections}</td>
                                <td className="py-3 px-4 dark:text-gray-300">{item.teacher}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>

        {/* General Info */}
        <Card title="General Information" className="lg:col-span-1">
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mt-1">
                        <School size={20} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">School Name</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">EduAdmin High School</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mt-1">
                        <Book size={20} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Academic Year</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">2023 - 2024</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mt-1">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Today's Date</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{new Date().toLocaleDateString()}</p>
                    </div>
                </div>
                 <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">System Status</h4>
                    <div className="flex items-center gap-2 text-sm text-green-500">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        All systems operational
                    </div>
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
};