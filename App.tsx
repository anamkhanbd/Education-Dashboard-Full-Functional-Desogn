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
import { SingleContentPage } from './pages/academic/SingleContentPage';
import { ClassRoutinePage } from './pages/academic/ClassRoutinePage';
import { HolidayCalendarPage } from './pages/academic/HolidayCalendarPage';
import { AdmissionFormPage } from './pages/admission/AdmissionFormPage';
import { OnlineResultPage } from './pages/exams/OnlineResultPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

// Mock data
const mockTeachers = [
  { id: '1', name: 'Rahim Uddin', designation: 'Assistant Teacher', subject: 'Math', phone: '01711223344', status: 'Active', photo: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Karim Ahmed', designation: 'Senior Teacher', subject: 'English', phone: '01811223344', status: 'Active', photo: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Salma Begum', designation: 'Lecturer', subject: 'Bangla', phone: '01911223344', status: 'Inactive', photo: 'https://i.pravatar.cc/150?u=3' },
];

const mockStaff = [
    { id: '1', name: 'Abdul Alim', designation: 'Office Assistant', phone: '01700000000', status: 'Active', photo: 'https://i.pravatar.cc/150?u=4' },
    { id: '2', name: 'Jamal Hossain', designation: 'Cleaner', phone: '01700000001', status: 'Active', photo: 'https://i.pravatar.cc/150?u=5' },
    { id: '3', name: 'Kuddus Miah', designation: 'Guard', phone: '01700000002', status: 'Active', photo: 'https://i.pravatar.cc/150?u=6' },
];

const mockCommittee = [
    { id: '1', name: 'Hazi Md. Mohsin', designation: 'Chairman', phone: '01800000001', joinDate: '2020-01-01', photo: 'https://i.pravatar.cc/150?u=7', status: 'Active' },
    { id: '2', name: 'Advocate Rina', designation: 'Member', phone: '01800000002', joinDate: '2021-03-15', photo: 'https://i.pravatar.cc/150?u=8', status: 'Active' },
];

const mockNotices = [
  { id: '1', title: 'Eid Vacation Notice', date: '2023-10-15', status: 'Active', file: 'notice_eid.pdf' },
  { id: '2', title: 'Half Yearly Exam Schedule', date: '2023-11-01', status: 'Active', file: 'exam_routine.pdf' },
];

const mockAdmissionInfo = [
    { id: '1', title: 'Admission Circular 2024', date: '2023-11-10', status: 'Active', file: 'circular_24.pdf' },
    { id: '2', title: 'Fee Structure', date: '2023-01-01', status: 'Active', file: 'fees.pdf' },
];

const mockExamNotices = [
    { id: '1', title: 'Final Exam Routine 2023', date: '2023-11-20', status: 'Active', file: 'final_routine.pdf' },
    { id: '2', title: 'Admit Card Distribution', date: '2023-11-25', status: 'Active', file: 'admit_notice.pdf' },
];

const mockManualResults = [
    { id: '1', name: 'Half Yearly 2023', class: '10', date: new Date().toISOString().split('T')[0], file: 'class10_halfyearly.pdf', status: 'Active' },
    { id: '2', name: 'Model Test 2023', class: '8', date: '2023-08-15', file: 'class8_model.pdf', status: 'Active' },
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
                                { key: 'photo', label: t('photo'), type: 'image' },
                                { key: 'name', label: t('name') },
                                { key: 'designation', label: t('designation') },
                                { key: 'subject', label: t('subject') },
                                { key: 'phone', label: t('phone') },
                                { key: 'status', label: t('status'), type: 'select', options: ['Active', 'Inactive'] }
                            ]} 
                            initialData={mockTeachers} 
                        />
                    } />
                    
                    {/* Staff Section */}
                    <Route path="/staff" element={
                        <GenericCRUDPage 
                            title={t('employees')} 
                            columns={[
                                { key: 'photo', label: t('photo'), type: 'image' },
                                { key: 'name', label: t('name') },
                                { key: 'designation', label: t('designation') },
                                { key: 'phone', label: t('phone') },
                                { key: 'status', label: t('status'), type: 'select', options: ['Active', 'Inactive'] }
                            ]} 
                            initialData={mockStaff} 
                        />
                    } />

                    {/* Academic Section */}
                    <Route path="/academic/chairman-message" element={
                        <SingleContentPage 
                            title={t('chairmanMessage')} 
                            role="Chairman"
                            initialContent="I am delighted to welcome you to our institution..." 
                        />
                    } />
                    <Route path="/academic/principal-message" element={
                        <SingleContentPage 
                            title={t('principalMessage')} 
                            role="Principal"
                            initialContent="Education is the backbone of a nation..." 
                        />
                    } />
                    <Route path="/academic/committee" element={
                        <GenericCRUDPage 
                            title={t('managingCommittee')} 
                            columns={[
                                { key: 'photo', label: t('photo'), type: 'image' },
                                { key: 'name', label: t('name') },
                                { key: 'designation', label: t('designation') },
                                { key: 'phone', label: t('phone') },
                                { key: 'joinDate', label: t('joinDate'), type: 'date' },
                                { key: 'status', label: t('status'), type: 'select', options: ['Active', 'Inactive'] }
                            ]} 
                            initialData={mockCommittee} 
                        />
                    } />
                    <Route path="/academic/routine" element={<ClassRoutinePage />} />
                    <Route path="/academic/holidays" element={<HolidayCalendarPage />} />


                    {/* Students Sections */}
                    {['6', '7', '8', '9', '10'].map(cls => (
                         <Route key={cls} path={`/students/${cls}`} element={
                            <GenericCRUDPage 
                                title={`${t('students')} - ${t('class')} ${cls}`} 
                                columns={[
                                    { key: 'roll', label: t('roll'), type: 'number' },
                                    { key: 'name', label: t('name') },
                                    { key: 'section', label: t('section') },
                                    { key: 'guardianPhone', label: t('guardianPhone') },
                                    { key: 'status', label: t('status'), type: 'select', options: ['Active', 'Inactive'] }
                                ]} 
                                initialData={mockStudents} 
                            />
                        } />
                    ))}

                    {/* Admission Section */}
                    <Route path="/admission/info" element={
                        <GenericCRUDPage 
                            title={t('admissionInfo')} 
                            columns={[
                                { key: 'title', label: t('title') },
                                { key: 'date', label: t('publishDate'), type: 'date' },
                                { key: 'file', label: t('pdfFile'), type: 'file', accept: '.pdf' },
                                { key: 'status', label: t('status'), type: 'select', options: ['Active', 'Inactive'] }
                            ]} 
                            initialData={mockAdmissionInfo} 
                        />
                    } />
                    <Route path="/admission/form" element={<AdmissionFormPage />} />

                    {/* Exams & Results Section */}
                    <Route path="/exams/notices" element={
                        <GenericCRUDPage 
                            title={t('examNotices')} 
                            columns={[
                                { key: 'title', label: t('title') },
                                { key: 'date', label: t('publishDate'), type: 'date' },
                                { key: 'file', label: t('pdfFile'), type: 'file', accept: '.pdf' },
                                { key: 'status', label: t('status'), type: 'select', options: ['Active', 'Inactive'] }
                            ]} 
                            initialData={mockExamNotices} 
                        />
                    } />
                    <Route path="/exams/manual-result" element={
                        <GenericCRUDPage 
                            title={t('manualResult')} 
                            columns={[
                                { key: 'name', label: t('resultName') },
                                { key: 'class', label: t('class'), type: 'select', options: ['6','7','8','9','10'] },
                                { key: 'date', label: t('publishDate'), type: 'date' },
                                { key: 'file', label: t('pdfFile'), type: 'file', accept: '.pdf' },
                                { key: 'status', label: t('status'), type: 'select', options: ['Active', 'Inactive'] }
                            ]} 
                            initialData={mockManualResults} 
                        />
                    } />
                    <Route path="/exams/online-result" element={<OnlineResultPage />} />

                    {/* Notice Section */}
                    <Route path="/notice" element={
                        <GenericCRUDPage 
                            title={t('notice')} 
                            columns={[
                                { key: 'title', label: t('title') },
                                { key: 'date', label: t('publishDate'), type: 'date' },
                                { key: 'file', label: t('pdfFile'), type: 'file', accept: '.pdf' },
                                { key: 'status', label: t('status'), type: 'select', options: ['Active', 'Inactive'] }
                            ]} 
                            initialData={mockNotices} 
                        />
                    } />

                    {/* Main Menu (Previously Important Links) */}
                    <Route path="/main-menu" element={
                         <GenericCRUDPage 
                            title={t('mainMenu')}
                            columns={[
                                { key: 'title', label: t('menuTitle') },
                                { key: 'url', label: t('urlLink') },
                                { key: 'status', label: t('status'), type: 'select', options: ['Active', 'Inactive'] }
                            ]} 
                            initialData={mockLinks} 
                        />
                    } />
                    
                    {/* Gallery & Contact */}
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    {/* Settings */}
                    <Route path="/settings" element={<Settings />} />

                    {/* Catch all for unimplemented routes to show specific placeholder */}
                    <Route path="*" element={
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <div className="w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-4 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">{t('underConstruction')}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">{t('underConstruction')}</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">{t('underConstructionMsg')}</p>
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