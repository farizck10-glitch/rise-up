import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, doc, updateDoc, orderBy } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Lightbulb, CheckCircle2, Clock } from 'lucide-react';

const StreetLights = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Read from main app 'complaints' collection where users log issues
        const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Filter out specifically for street lights or show all complaints mapping to street lights
            const list = data.filter(item => item.category === 'Street Light' || item.type === 'street_light' || true); // Assuming all in this pool for now
            setComplaints(list);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const toggleStatus = async (complaint) => {
        const newStatus = complaint.status === 'Completed' ? 'Pending' : 'Completed';
        try {
            await updateDoc(doc(db, 'complaints', complaint.id), { status: newStatus });
            toast.success(`Marked as ${newStatus}`);
        } catch (error) {
            toast.error("Could not update status.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-bold text-slateDark flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-amber-500" /> Street Light Faults / സ്ട്രീറ്റ് ലൈറ്റ് പരാതികൾ
                </h2>
                <div className="bg-amber-50 text-amber-700 font-medium px-4 py-2.5 rounded-xl border border-amber-100 flex items-center shrink-0">
                    <span className="mr-2">Total Reports:</span>
                    <span className="font-bold text-lg">{complaints.length}</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slateDark">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Location / സ്ഥലം</th>
                                <th className="px-6 py-4">Reported By / പരാതിക്കാരൻ</th>
                                <th className="px-6 py-4">Date / തീയതി</th>
                                <th className="px-6 py-4 text-right">Status / നില</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-400">Loading complaints...</td>
                                </tr>
                            ) : complaints.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                        No complaints logged yet.
                                    </td>
                                </tr>
                            ) : (
                                complaints.map(complaint => (
                                    <tr key={complaint.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slateDark">{complaint.location || complaint.address || 'Unknown Location'}</p>
                                            <p className="text-xs text-slate-500">{complaint.description || 'No additional details provided.'}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {complaint.userName || complaint.name || 'Anonymous User'}
                                            <br />
                                            <span className="text-xs text-slate-500">{complaint.phone || 'No Phone provided'}</span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {complaint.createdAt ? (complaint.createdAt?.toDate ? complaint.createdAt.toDate().toLocaleDateString() : new Date(complaint.createdAt).toLocaleDateString()) : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => toggleStatus(complaint)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-center space-x-2 ml-auto ${complaint.status === 'Completed'
                                                        ? 'bg-green-100 text-green-700 border-green-200'
                                                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                                                    }`}
                                            >
                                                {complaint.status === 'Completed' ? (
                                                    <><CheckCircle2 className="w-4 h-4 mr-1" /> Completed / ശരിയാക്കി</>
                                                ) : (
                                                    <><Clock className="w-4 h-4 mr-1" /> Mark Completed / ശരിയാക്കിയതായി രേഖപ്പെടുത്തുക</>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StreetLights;
