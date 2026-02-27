import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Trash2, Edit2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import WorkerForm from '../components/WorkerForm';
import toast from 'react-hot-toast';

const Workers = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingWorker, setEditingWorker] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'workers'), orderBy('name'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setWorkers(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const openAddModal = () => {
        setEditingWorker(null);
        setIsModalOpen(true);
    };

    const openEditModal = (worker) => {
        setEditingWorker(worker);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this worker?")) {
            try {
                await deleteDoc(doc(db, 'workers', id));
                toast.success("Worker deleted successfully");
            } catch (error) {
                console.error("Error deleting worker: ", error);
                toast.error("Failed to delete worker");
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden w-full sm:max-w-md">
                    <div className="pl-3 py-2.5 flex items-center justify-center">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search workers by name or category..."
                        className="w-full px-3 py-2.5 outline-none text-slateDark text-sm placeholder:text-slate-400"
                    />
                </div>

                <button
                    onClick={openAddModal}
                    className="bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-800 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-blue-500/20 transition-all active:scale-95 flex items-center space-x-2 shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Worker</span>
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slateDark">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Phone</th>
                                <th className="px-6 py-4">Ward</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">Loading workers...</td>
                                </tr>
                            ) : workers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3 text-slate-300">
                                                <Filter className="w-6 h-6" />
                                            </div>
                                            <p className="text-slate-500 font-medium">No workers found.</p>
                                            <p className="text-slate-400 text-sm mt-1">Add a new worker to get started.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                workers.map(worker => (
                                    <tr key={worker.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{worker.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                {worker.category || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{worker.phone}</td>
                                        <td className="px-6 py-4 text-slate-600">{worker.ward || 'N/A'}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => openEditModal(worker)}
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(worker.id)}
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <WorkerForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingWorker={editingWorker}
                onSaved={() => { }}
            />
        </div>
    );
};

export default Workers;
