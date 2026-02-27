import React, { useState, useEffect } from 'react';
import { Megaphone, Save, Trash2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, Timestamp, orderBy, query } from 'firebase/firestore';
import toast from 'react-hot-toast';

const Promos = () => {
    const [promos, setPromos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [newPromoText, setNewPromoText] = useState('');

    useEffect(() => {
        const q = query(collection(db, 'promos'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPromos(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleAddPromo = async (e) => {
        e.preventDefault();
        if (!newPromoText.trim()) return;

        setSaving(true);
        try {
            await addDoc(collection(db, 'promos'), {
                text: newPromoText,
                active: true,
                createdAt: Timestamp.now()
            });
            setNewPromoText('');
            toast.success("Promo announcement published successfully!");
        } catch (error) {
            console.error("Error adding promo:", error);
            toast.error("Failed to publish promo.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Remove this promo from the ticker?")) {
            try {
                await deleteDoc(doc(db, 'promos', id));
                toast.success("Promo removed successfully!");
            } catch (error) {
                toast.error("Error removing promo");
            }
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">

            {/* Add New Promo Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 border-b border-slate-100 bg-white flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Megaphone className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slateDark">Update Breaking News / Ticker</h2>
                        <p className="text-sm text-slate-500">This text will scroll horizontally on the main public app's top bar.</p>
                    </div>
                </div>

                <div className="p-6 bg-white">
                    <form onSubmit={handleAddPromo} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Announcement Message
                            </label>
                            <textarea
                                value={newPromoText}
                                onChange={(e) => setNewPromoText(e.target.value)}
                                placeholder="e.g. 📢 Important: Gramasabha meeting scheduled for tomorrow at 10 AM. All members of Ward 18 are requested to participate."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all text-slateDark text-sm outline-none inline-block min-h-[100px] resize-none"
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={saving || !newPromoText.trim()}
                                className="px-6 py-2.5 bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-800 hover:to-blue-500 text-white rounded-xl font-medium shadow-md shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-70 flex items-center space-x-2"
                            >
                                {saving ? (
                                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        <span>Publish Promo</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Active Promos List */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-slateDark flex items-center space-x-2">
                    <span>Active Announcements</span>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                        {promos.length}
                    </span>
                </h3>

                {loading ? (
                    <div className="animate-pulse space-y-3">
                        {[1, 2].map(i => (
                            <div key={i} className="h-20 bg-slate-200 rounded-xl w-full"></div>
                        ))}
                    </div>
                ) : promos.length === 0 ? (
                    <div className="bg-white border border-slate-200 border-dashed rounded-xl p-8 text-center text-slate-500">
                        No active promos. Add one above to display it on the public app ticker.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {promos.map((promo) => (
                            <div
                                key={promo.id}
                                className="bg-white border border-slate-200 rounded-xl p-4 flex items-start justify-between group hover:shadow-md transition-shadow"
                            >
                                <div className="flex-1 pr-6">
                                    <p className="text-slateDark text-sm">{promo.text}</p>
                                    {promo.createdAt && (
                                        <p className="text-xs text-slate-400 mt-2">
                                            Added on {promo.createdAt.toDate().toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleDelete(promo.id)}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default Promos;
