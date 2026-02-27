import React, { useState, useEffect } from 'react';
import { Plus, Search, Phone, Edit2, Trash2, Ambulance } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const EmergencyContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', number: '', type: 'Hospital' });
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'emergencies'), orderBy('type'), orderBy('title'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setContacts(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const openAddModal = () => {
        setEditingId(null);
        setFormData({ title: '', number: '', type: 'Hospital' });
        setIsModalOpen(true);
    };

    const openEditModal = (contact) => {
        setEditingId(contact.id);
        setFormData({ title: contact.title, number: contact.number, type: contact.type || 'Hospital' });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this emergency contact?")) {
            try {
                await deleteDoc(doc(db, 'emergencies', id));
                toast.success("Contact removed.");
            } catch (error) {
                toast.error("Error deleting contact.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingId) {
                await updateDoc(doc(db, 'emergencies', editingId), formData);
                toast.success("Contact updated!");
            } else {
                await addDoc(collection(db, 'emergencies'), formData);
                toast.success("Contact added!");
            }
            setIsModalOpen(false);
        } catch {
            toast.error("Failed to save contact.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-bold text-slateDark flex items-center">
                    <Ambulance className="w-6 h-6 mr-2 text-rose-500" /> Emergency Directory / എമർജൻസി നമ്പറുകൾ
                </h2>
                <button
                    onClick={openAddModal}
                    className="bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-800 hover:to-blue-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition-all active:scale-95 flex items-center space-x-2 shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Number / നമ്പർ ചേർക്കുക</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-12 text-center text-slate-500">Loading directory...</div>
                ) : contacts.length === 0 ? (
                    <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 border-dashed text-slate-500">
                        No emergency contacts found. Click "Add Number" to start. / നമ്പറുകൾ ഒന്നും ചേർത്തിട്ടില്ല.
                    </div>
                ) : (
                    contacts.map(contact => (
                        <div key={contact.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-slateDark">{contact.title}</h3>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${contact.type === 'Police' ? 'bg-blue-100 text-blue-700' :
                                    contact.type === 'Fire' ? 'bg-orange-100 text-orange-700' :
                                        'bg-rose-100 text-rose-700'
                                    }`}>
                                    {contact.type || 'Hospital'}
                                </span>
                            </div>
                            <div className="flex items-center text-slate-600 mt-2 py-2 bg-slate-50 rounded-lg px-3 mb-4">
                                <Phone className="w-4 h-4 mr-2 text-slate-400" />
                                <span className="font-mono font-medium tracking-wide">{contact.number}</span>
                            </div>

                            <div className="flex justify-end space-x-2 mt-auto pt-4 border-t border-slate-100">
                                <button onClick={() => openEditModal(contact)} className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-lg transition-colors">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(contact.id)} className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-lg transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slateDark/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-5 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slateDark">{editingId ? 'Edit Contact' : 'New Contact'}</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slateDark">Facility / Name</label>
                                <input required type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500" placeholder="e.g. Govt Hospital" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slateDark">Phone Number</label>
                                <input required type="text" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} className="w-full px-3 py-2 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 font-mono tracking-wide" placeholder="e.g. 104" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slateDark">Category</label>
                                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-3 py-2 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500">
                                    <option value="Hospital">Hospital</option>
                                    <option value="Police">Police</option>
                                    <option value="Fire">Fire Rescue</option>
                                    <option value="Ambulance">Ambulance</option>
                                    <option value="Helpline">Helpline</option>
                                </select>
                            </div>
                            <div className="pt-2 flex gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors">Cancel</button>
                                <button type="submit" disabled={saving} className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-400 text-white rounded-xl font-medium transition-colors disabled:opacity-70 flex items-center justify-center">
                                    {saving ? "Saving..." : "Save / സേവ് ചെയ്യുക"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmergencyContacts;
