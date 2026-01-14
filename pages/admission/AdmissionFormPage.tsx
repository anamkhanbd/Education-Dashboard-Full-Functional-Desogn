import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Save, Check, X, FileText, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AdmissionRequest {
    id: string;
    studentName: string;
    fatherName: string;
    class: string;
    phone: string;
    date: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    photo: string;
}

export const AdmissionFormPage: React.FC = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'form' | 'list'>('list');
    
    // Demo Data
    const [requests, setRequests] = useState<AdmissionRequest[]>([
        { id: '1', studentName: 'Mohammad Ali', fatherName: 'Yusuf Ali', class: '6', phone: '01711223344', date: '2023-10-25', status: 'Pending', photo: 'https://i.pravatar.cc/150?u=10' },
        { id: '2', studentName: 'Ayesha Siddiqa', fatherName: 'Abdul Malek', class: '9', phone: '01911223355', date: '2023-10-24', status: 'Approved', photo: 'https://i.pravatar.cc/150?u=11' },
        { id: '3', studentName: 'Raju Ahmed', fatherName: 'Kabir Ahmed', class: '7', phone: '01811223366', date: '2023-10-23', status: 'Pending', photo: 'https://i.pravatar.cc/150?u=12' },
    ]);

    // Form State
    const [formData, setFormData] = useState({
        studentName: '',
        fatherName: '',
        motherName: '',
        dob: '',
        phone: '',
        class: '',
        address: '',
        prevSchool: ''
    });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRequest: AdmissionRequest = {
            id: Math.random().toString(),
            studentName: formData.studentName,
            fatherName: formData.fatherName,
            class: formData.class,
            phone: formData.phone,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            photo: 'https://i.pravatar.cc/150?u=new'
        };
        setRequests([newRequest, ...requests]);
        alert("Admission request submitted successfully!");
        setFormData({ studentName: '', fatherName: '', motherName: '', dob: '', phone: '', class: '', address: '', prevSchool: '' });
        setActiveTab('list');
    };

    const updateStatus = (id: string, newStatus: 'Approved' | 'Rejected') => {
        setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Admission Management</h2>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button 
                    onClick={() => setActiveTab('list')}
                    className={`px-6 py-3 font-medium text-sm transition-colors ${activeTab === 'list' ? 'border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                >
                    Admission Requests ({requests.filter(r => r.status === 'Pending').length})
                </button>
                <button 
                    onClick={() => setActiveTab('form')}
                    className={`px-6 py-3 font-medium text-sm transition-colors ${activeTab === 'form' ? 'border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                >
                    New Admission Form
                </button>
            </div>

            {activeTab === 'list' ? (
                <Card>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300">
                                    <th className="p-4">Applicant</th>
                                    <th className="p-4">Father's Name</th>
                                    <th className="p-4">Class</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(req => (
                                    <tr key={req.id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="p-4 flex items-center gap-3">
                                            <img src={req.photo} alt="" className="w-10 h-10 rounded-full" />
                                            <span className="font-medium text-gray-800 dark:text-gray-200">{req.studentName}</span>
                                        </td>
                                        <td className="p-4 text-gray-600 dark:text-gray-400">{req.fatherName}</td>
                                        <td className="p-4 text-gray-600 dark:text-gray-400">{req.class}</td>
                                        <td className="p-4 text-gray-600 dark:text-gray-400">{req.phone}</td>
                                        <td className="p-4 text-gray-600 dark:text-gray-400">{req.date}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                                ${req.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                                                  req.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                                                  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right flex justify-end gap-2">
                                            {req.status === 'Pending' && (
                                                <>
                                                    <button onClick={() => updateStatus(req.id, 'Approved')} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100" title="Approve">
                                                        <Check size={18} />
                                                    </button>
                                                    <button onClick={() => updateStatus(req.id, 'Rejected')} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100" title="Reject">
                                                        <X size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            ) : (
                <Card title="Student Admission Form">
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student Name</label>
                                <input required type="text" className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                                    value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Class</label>
                                <select required className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})}>
                                    <option value="">Select Class</option>
                                    <option value="6">Class 6</option>
                                    <option value="7">Class 7</option>
                                    <option value="8">Class 8</option>
                                    <option value="9">Class 9</option>
                                    <option value="10">Class 10</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Father's Name</label>
                                <input required type="text" className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mother's Name</label>
                                <input required type="text" className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.motherName} onChange={e => setFormData({...formData, motherName: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
                                <input required type="date" className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Guardian Phone</label>
                                <input required type="tel" className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                            <textarea className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white" rows={2}
                                value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Previous School (Optional)</label>
                            <input type="text" className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                value={formData.prevSchool} onChange={e => setFormData({...formData, prevSchool: e.target.value})} />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:brightness-110 flex items-center gap-2">
                                <Save size={18} /> Submit Application
                            </button>
                        </div>
                    </form>
                </Card>
            )}
        </div>
    );
};