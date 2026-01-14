import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Plus, Edit2, Trash2, Search, X, FileText, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Column {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'select' | 'file' | 'image';
  options?: string[];
  accept?: string;
}

interface GenericCRUDPageProps {
  title: string;
  columns: Column[];
  initialData: any[];
}

export const GenericCRUDPage: React.FC<GenericCRUDPageProps> = ({ title, columns, initialData }) => {
  const { t } = useLanguage();
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  
  // Simple form state
  const [formData, setFormData] = useState<any>({});

  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string, type: 'file' | 'image') => {
      const file = e.target.files?.[0];
      if (file) {
          if (type === 'image') {
              // Create a fake local URL for preview
              const reader = new FileReader();
              reader.onload = (ev) => {
                  setFormData({ ...formData, [key]: ev.target?.result });
              };
              reader.readAsDataURL(file);
          } else {
              setFormData({ ...formData, [key]: file.name });
          }
      }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setData(data.map(item => item.id === editingItem.id ? { ...formData, id: editingItem.id } : item));
    } else {
      setData([...data, { ...formData, id: Math.random().toString(36).substr(2, 9) }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <button 
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">{t('add')}</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                {columns.map(col => (
                  <th key={col.key} className="p-4 font-semibold text-gray-600 dark:text-gray-300">
                    {col.label}
                  </th>
                ))}
                <th className="p-4 text-right font-semibold text-gray-600 dark:text-gray-300">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  {columns.map(col => (
                    <td key={col.key} className="p-4 text-gray-700 dark:text-gray-300">
                      {col.key === 'status' ? (
                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${item[col.key] === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                           {item[col.key]}
                         </span>
                      ) : col.type === 'file' ? (
                          <div className="flex items-center gap-2 text-sm text-[var(--color-primary)]">
                              <FileText size={16} />
                              {item[col.key]}
                          </div>
                      ) : col.type === 'image' ? (
                          item[col.key] ? (
                            <img src={item[col.key]} alt="Thumbnail" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                                <ImageIcon size={16} />
                            </div>
                          )
                      ) : (
                        item[col.key]
                      )}
                    </td>
                  ))}
                  <td className="p-4 flex justify-end gap-2">
                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              No data found
            </div>
          )}
        </div>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {editingItem ? t('edit') : t('add')} {title}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:bg-gray-100 rounded-full p-1">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {columns.map(col => (
                <div key={col.key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {col.label}
                  </label>
                  {col.type === 'select' ? (
                    <select
                      value={formData[col.key] || ''}
                      onChange={e => setFormData({...formData, [col.key]: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)]"
                    >
                      <option value="">Select...</option>
                      {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : col.type === 'file' || col.type === 'image' ? (
                      <div className="space-y-2">
                          <input
                            type="file"
                            accept={col.type === 'image' ? 'image/*' : col.accept}
                            onChange={(e) => handleFileChange(e, col.key, col.type as 'file' | 'image')}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-primary)] file:text-white hover:file:bg-[var(--color-primary)]/90"
                            required={!editingItem && !formData[col.key]} // Required only on add or if no data
                          />
                          {formData[col.key] && col.type === 'image' && (
                              <img src={formData[col.key]} alt="Preview" className="h-20 w-20 object-cover rounded-lg border border-gray-300" />
                          )}
                          {formData[col.key] && col.type === 'file' && (
                              <p className="text-sm text-gray-500">Selected: {formData[col.key]}</p>
                          )}
                      </div>
                  ) : (
                    <input
                      type={col.type || 'text'}
                      value={formData[col.key] || ''}
                      onChange={e => setFormData({...formData, [col.key]: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[var(--color-primary)]"
                      required
                    />
                  )}
                </div>
              ))}
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  {t('cancel')}
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:brightness-110 shadow-lg shadow-[var(--color-primary)]/30"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};