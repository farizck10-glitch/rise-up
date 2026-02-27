import React, { useState, useEffect } from 'react';
import { X, Save, FileText, Link as LinkIcon, Edit } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const SchemeForm = ({ isOpen, onClose, editingScheme, onSaved }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        link: '',
        category: 'General',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingScheme) {
            setFormData({
                title: editingScheme.title || '',
                description: editingScheme.description || '',
                link: editingScheme.link || '',
                category: editingScheme.category || 'General',
            });
        } else {
            setFormData({ title: '', description: '', link: '', category: 'General' });
        }
    }, [editingScheme, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingScheme && editingScheme.id) {
                // Edit mode
                const schemeRef = doc(db, 'schemes', editingScheme.id);
                await updateDoc(schemeRef, formData);
                toast.success("Scheme updated successfully!");
            } else {
                // Add mode
                await addDoc(collection(db, 'schemes'), formData);
                toast.success("Scheme added successfully!");
            }
            if (onSaved) onSaved();
            onClose();
        } catch (error) {
            console.error("Error saving scheme: ", error);
            toast.error("Failed to save scheme. Check console.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slateDark/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-surface rounded-2xl shadow-lg w-full max-w-lg overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                    <h3 className="text-xl font-bold text-slateDark">
                        {editingScheme ? 'Edit Scheme' : 'Add New Scheme'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slateDark mb-1">Scheme Title</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Edit className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-slateDark"
                                    placeholder="e.g. Kerala Ration Card Online"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slateDark mb-1">Description</label>
                            <div className="relative">
                                <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                                    <FileText className="h-5 w-5 text-slate-400" />
                                </div>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="3"
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-slateDark resize-none"
                                    placeholder="Brief details about the scheme benefits..."
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slateDark mb-1">External Link</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LinkIcon className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="url"
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                required
                                className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-slateDark"
                                placeholder="e.g. https://civilsupplieskerala.gov.in"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SchemeForm;
