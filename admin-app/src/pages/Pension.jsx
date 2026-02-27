import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, IndianRupee } from 'lucide-react';

const Pension = () => {
    const [pensions, setPensions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', wardNumber: '', pensionType: 'Old Age Pension', statusMonth: 'Pending' });
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'private_pension'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPensions(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const openAddModal = () => {
        setEditingId(null);
        setFormData({ name: '', wardNumber: '', pensionType: 'Old Age Pension', statusMonth: 'Pending' });
        setIsMenuOpen(true);
    };

    const openEditModal = (pension) => {
        setEditingId(pension.id);
        setFormData({
            name: pension.name,
            wardNumber: pension.wardNumber,
            pensionType: pension.pensionType,
            statusMonth: pension.statusMonth || 'Pending'
        });
        setIsMenuOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this record? / റെക്കോർഡ് നീക്കം ചെയ്യണമോ?")) {
            try {
                await deleteDoc(doc(db, 'private_pension', id));
                toast.success("Pension record removed.");
            } catch (error) {
                toast.error("Error deleting record.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingId) {
                await updateDoc(doc(db, 'private_pension', editingId), formData);
                toast.success("Pension updated!");
            } else {
                await addDoc(collection(db, 'private_pension'), formData);
                toast.success("Pension tracking added!");
            }
            setIsMenuOpen(false);
        } catch (error) {
            toast.error("Failed to save.");
        } finally {
            setSaving(false);
        }
    };

    const toggleStatus = async (pension) => {
        const newStatus = pension.statusMonth === 'Paid' ? 'Pending' : 'Paid';
        try {
            await updateDoc(doc(db, 'private_pension', pension.id), { statusMonth: newStatus });
            toast.success(`Marked as ${newStatus}`);
        } catch (error) {
            toast.error("Could not update status.");
        }
    };

    const pensionTypes = [
        "Old Age Pension / വാർദ്ധക്യകാല പെൻഷൻ",
        "Widow Pension / വിധവാ പെൻഷൻ",
        "Disability Pension / വികലാംഗ പെൻഷൻ",
        "Agricultural Pension / കർഷക പെൻഷൻ",
        "Unmarried Women / അവിവാഹിതരായ വനിതകൾക്കുള്ള പെൻഷൻ"
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-bold text-slateDark flex items-center">
                    <IndianRupee className="w-6 h-6 mr-2 text-emerald-500" /> Pension Management / പെൻഷൻ വിവരങ്ങൾ
                </h2>
                <button
                    onClick={openAddModal}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-400 hover:from-emerald-700 hover:to-emerald-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition-all active:scale-95 flex items-center space-x-2 shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Record / പുതിയത് ചേർക്കുക</span>
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slateDark">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Name / പേര്</th>
                                <th className="px-6 py-4">Ward / വാർഡ്</th>
                                <th className="px-6 py-4">Type / പെൻഷൻ തരം</th>
                                <th className="px-6 py-4">Monthly Status / മാസത്തെ അലവൻസ്</th>
                                <th className="px-6 py-4 text-right">Actions / മാറ്റങ്ങൾ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">Loading Pension Registry...</td>
                                </tr>
                            ) : pensions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                        No private pension tracking records found.
                                    </td>
                                </tr>
                            ) : (
                                pensions.map(pension => (
                                    <tr key={pension.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slateDark">{pension.name}</td>
                                        <td className="px-6 py-4 text-slate-600">{pension.wardNumber}</td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {pension.pensionType && pension.pensionType.split('/')[0].trim()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleStatus(pension)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${pension.statusMonth === 'Paid'
                                                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                                        : 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200'
                                                    }`}
                                            >
                                                {pension.statusMonth === 'Paid' ? 'Paid / പണം നൽകി' : 'Pending / നൽകിയില്ല'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button onClick={() => openEditModal(pension)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(pension.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
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

            {isMenuOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slateDark/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-5 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slateDark">{editingId ? 'Edit Tracker / തിരുത്തുക' : 'New Tracker / പുതിയത്'}</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slateDark">Full Name / പേര്</label>
                                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500" placeholder="e.g. Omana" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slateDark">Ward Number / വാർഡ് നമ്പർ</label>
                                <input required type="text" value={formData.wardNumber} onChange={(e) => setFormData({ ...formData, wardNumber: e.target.value })} className="w-full px-3 py-2 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500" placeholder="e.g. 18" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slateDark">Pension Type / തരം</label>
                                <select value={formData.pensionType} onChange={(e) => setFormData({ ...formData, pensionType: e.target.value })} className="w-full px-3 py-2 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500">
                                    {pensionTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slateDark">Month Status / മാസത്തെ അലവൻസ്</label>
                                <select value={formData.statusMonth} onChange={(e) => setFormData({ ...formData, statusMonth: e.target.value })} className="w-full px-3 py-2 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500">
                                    <option value="Pending">Pending / നൽകിയില്ല</option>
                                    <option value="Paid">Paid / പണം നൽകി</option>
                                </select>
                            </div>
                            <div className="pt-2 flex gap-3">
                                <button type="button" onClick={() => setIsMenuOpen(false)} className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors">Cancel</button>
                                <button type="submit" disabled={saving} className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-xl font-medium transition-colors disabled:opacity-70 flex items-center justify-center">
                                    {saving ? "Saving..." : "Save Record"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pension;
