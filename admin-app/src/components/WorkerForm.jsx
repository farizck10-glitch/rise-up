import React, { useState, useEffect } from 'react';
import { X, Save, User as UserIcon, Phone, Briefcase, MapPin } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const WorkerForm = ({ isOpen, onClose, editingWorker, onSaved }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        ward: '',
        phone: '',
        photoUrl: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingWorker) {
            setFormData(editingWorker);
        } else {
            setFormData({ name: '', category: '', ward: '', phone: '', photoUrl: '' });
        }
    }, [editingWorker, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingWorker && editingWorker.id) {
                // Edit mode
                const workerRef = doc(db, 'workers', editingWorker.id);
                await updateDoc(workerRef, formData);
                toast.success("Worker updated successfully!");
            } else {
                // Add mode
                await addDoc(collection(db, 'workers'), formData);
                toast.success("Worker added successfully!");
            }
            onSaved();
            onClose();
        } catch (error) {
            console.error("Error saving worker: ", error);
            toast.error("Failed to save worker. Check console.");
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
            <div className="relative bg-surface rounded-2xl shadow-floating w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                    <h3 className="text-xl font-bold text-slateDark">
                        {editingWorker ? 'Edit Worker' : 'Add New Worker'}
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
                            <label className="block text-sm font-medium text-slateDark mb-1">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-slateDark"
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slateDark mb-1">Category</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Briefcase className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-slateDark"
                                    placeholder="e.g. Electrician, ASHA Worker"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slateDark mb-1">Ward</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    name="ward"
                                    value={formData.ward}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-slateDark"
                                    placeholder="e.g. Ward 18"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slateDark mb-1">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-slateDark"
                                    placeholder="e.g. +91 9876543210"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slateDark mb-1">Photo URL (Optional)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-slate-400 opacity-50" />
                                </div>
                                <input
                                    type="url"
                                    name="photoUrl"
                                    value={formData.photoUrl || ''}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-slateDark"
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>
                            {formData.photoUrl && (
                                <div className="mt-3 flex justify-center">
                                    <img src={formData.photoUrl} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-slate-200" onError={(e) => { e.target.onerror = null; e.target.style.display = "none" }} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-2 flex items-center space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 border border-transparent rounded-xl font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 text-white bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-800 hover:to-blue-500 disabled:opacity-70 disabled:cursor-not-allowed rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 shadow-md shadow-blue-500/20"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    <span>{editingWorker ? 'Update' : 'Save'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WorkerForm;
