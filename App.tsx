import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { DashboardHome } from './pages/DashboardHome';
import { GenericCRUDPage } from './pages/GenericCRUDPage';
import { Settings } from './pages/Settings';
import { LogoTitlePage } from './pages/hero/LogoTitle';
import { BannerCoverPage } from './pages/hero/BannerCover';
import { MapsPage } from './pages/Maps';
import { AboutUsPage } from './pages/AboutUs';

// Mock data
const mockTeachers = [
  { id: '1', name: 'Rahim Uddin', designation: 'Assistant Teacher', subject: 'Math', phone: '01711223344', status: 'Active' },
  { id: '2', name: 'Karim Ahmed', designation: 'Senior Teacher', subject: 'English', phone: '01811223344', status: 'Active' },
  { id: '3', name: 'Salma Begum', designation: 'Lecturer', subject: 'Bangla', phone: '01911223344', status: 'Inactive' },
];

const mockNotices = [
  { id: '1', title: 'Eid Vacation Notice', date: '2023-10-15', status: 'Active', file: 'notice_eid.pdf' },
  { id: '2', title: 'Half Yearly Exam Schedule', date: '2023-11-01', status: 'Active', file: 'exam_routine.pdf' },
];

const mockStudents = [
  { id: '1', roll: 101, name: 'Abul Hasan', class: '10', section: 'A', guardianPhone: '01700000000', status: 'Active' },
  { id: '2', roll: 102, name: 'Babul Miah', class: '10', section: 'A', guardianPhone: '01700000001', status: 'Active' },
];

const mockLinks = [
    { id: '1', title: 'Ministry of Education', url: 'http://www.moedu.gov.bd', status: 'Active' },
    { id: '2', title: 'Education Board Results', url: 'http://www.educationboardresults.gov.bd', status: 'Active' },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-72 transition-all duration-300">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 lg:p-6 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
    const { t } = useLanguage();

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<DashboardHome />} />
                    
                    {/* Hero Section */}
                    <Route path="/hero/logo" element={<LogoTitlePage />} />
                    <Route path="/hero/banner" element={<BannerCoverPage />} />

                    {/* Maps */}
                    <Route path="/maps" element={<MapsPage />} />
                    
                    {/* About Us */}
                    <Route path="/about" element={<AboutUsPage />} />

                    {/* Teachers Section */}
                    <Route path="/teachers" element={
                        <GenericCRUDPage 
                            title={t('teachers')} 
                            columns={[
                                { key: 'name', label: t('name') },
                                { key: 'designation', label: t('designation') },
                                { key: 'subject', label: 'Subject' },
                                { key: 'phone', label: t('phone') },
                                { key: 'status', label: t('status'), type: 'select', options: ['Active', 'Inactive'] }
                            ]} 
                            initialData={mockTeachers} 
                        />
                    } />

                    {/* Students Sections */}
                    {['6', '7', '8', '9', '10'].map(cls => (
                         <Route key={cls} path={`/students/${cls}`} element={
                            <GenericCRUDPage 
                                title={`${t('students')} - Class ${cls}`} 
                                columns={[
                                    { key: 'roll', label: t('roll'), type: 'number' },
                                    { key: 'name', label: t('name') },
                                    { key: 'section', label: t('section') },
                                    { key: 'guardianPhone', label: 'Guardian Phone' },
                                    { key: 'status', label: t('status'), type: 'select', options: ['Active', 'Inactive'] }
                                ]} 
                                initialData={mockStudents} 
                            />
                        } />
                    ))}

                    {/* Notice Section */}
                    <Route path="/notice" element={
                        <GenericCRUDPage 
                            title={t('notice')} 
                            columns={[
                                { key: 'title', label: 'Title' },
                                { key: 'date', label: 'Date', type: 'date' },
                                { key: 'file', label: 'PDF File', type: 'file', accept: '.pdf' },
                                { key: 'status', label: t('status'), type: 'select', options: ['Active', 'Inactive'] }
                            ]} 
                            initialData={mockNotices} 
                        />
                    } />

                    {/* Main Menu (Previously Important Links) */}
                    <Route path="/main-menu" element={
                         <GenericCRUDPage 
                            title="Main Menu List"
                            columns={[
                                { key: 'title', label: 'Menu Title' },
                                { key: 'url', label: 'URL / Link' },
                                { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] }
                            ]} 
                            initialData={mockLinks} 
                        />
                    } />

                    {/* Settings */}
                    <Route path="/settings" element={<Settings />} />

                    {/* Catch all for unimplemented routes to show specific placeholder */}
                    <Route path="*" element={
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <div className="w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-4 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">Content Placeholder</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Under Construction</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">This section is part of the full dashboard architecture.</p>
                        </div>
                    } />
                </Routes>
            </Layout>
        </Router>
    );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;