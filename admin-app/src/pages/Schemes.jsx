import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import SchemeCard from '../components/SchemeCard';
import SchemeForm from '../components/SchemeForm';
import toast from 'react-hot-toast';

const Schemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingScheme, setEditingScheme] = useState(null);

    useEffect(() => {
        // We order by title ascending initially, although created timestamp is better
        const q = query(collection(db, 'schemes'), orderBy('title'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSchemes(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const openAddModal = () => {
        setEditingScheme(null);
        setIsModalOpen(true);
    };

    const openEditModal = (scheme) => {
        setEditingScheme(scheme);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this scheme?")) {
            try {
                await deleteDoc(doc(db, 'schemes', id));
                toast.success("Scheme safely deleted.");
            } catch (error) {
                console.error("Error deleting scheme:", error);
                toast.error("Could not delete scheme.");
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
                        placeholder="Search schemes..."
                        className="w-full px-3 py-2.5 outline-none text-slateDark text-sm placeholder:text-slate-400"
                    />
                </div>

                <button
                    onClick={openAddModal}
                    className="bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-800 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-md shadow-blue-500/20 transition-all active:scale-95 flex items-center space-x-2 shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Scheme</span>
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20 text-slate-400">Loading schemes...</div>
            ) : schemes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed shadow-sm">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-400">
                        <Plus className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slateDark">No Schemes Found</h3>
                    <p className="text-slate-500 mt-1 max-w-sm text-center text-sm">Create your first government scheme to display it on the public portal.</p>
                    <button
                        onClick={openAddModal}
                        className="mt-6 text-blue-600 font-medium hover:text-blue-700"
                    >
                        Create Now &rarr;
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {schemes.map(scheme => (
                        <SchemeCard
                            key={scheme.id}
                            scheme={scheme}
                            onEdit={openEditModal}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <SchemeForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingScheme={editingScheme}
            />
        </div>
    );
};

export default Schemes;
