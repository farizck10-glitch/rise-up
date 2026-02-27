import React, { useState, useEffect } from 'react';
import { Search, UserCheck, UserX, Trash2, Mail, Phone, Calendar } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Note: Depends on how your users are structured. Assuming standard collection.
        const q = query(collection(db, 'users'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Sort in memory or use orderBy if indexed
            data.sort((a, b) => {
                const getTime = (val) => val?.toMillis ? val.toMillis() : (val ? new Date(val).getTime() : 0);
                return getTime(b.createdAt) - getTime(a.createdAt);
            });
            setUsers(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const toggleBlockStatus = async (user) => {
        const isCurrentlyBlocked = user.isBlocked === true;
        const action = isCurrentlyBlocked ? 'unblock' : 'block';

        if (window.confirm(`Are you sure you want to ${action} ${user.name || 'this user'}?`)) {
            try {
                await updateDoc(doc(db, 'users', user.id), {
                    isBlocked: !isCurrentlyBlocked
                });
                toast.success(`User ${action}ed successfully.`);
            } catch (error) {
                console.error(`Error to ${action} user`, error);
                toast.error(`Failed to ${action} user.`);
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("CRITICAL: Are you sure you want to completely delete this user record from the database? This cannot be undone.")) {
            try {
                await deleteDoc(doc(db, 'users', id));
                toast.success("User permanently deleted.");
            } catch (error) {
                toast.error("Error deleting user.");
            }
        }
    };

    const filteredUsers = users.filter(user =>
        (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (user.phone || '').includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden w-full sm:max-w-md">
                    <div className="pl-3 py-2.5 flex items-center justify-center">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search users by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2.5 outline-none text-slateDark text-sm placeholder:text-slate-400"
                    />
                </div>

                <div className="bg-blue-50 text-blue-700 font-medium px-4 py-2.5 rounded-xl border border-blue-100 flex items-center shrink-0">
                    <span className="mr-2">Total App Users:</span>
                    <span className="font-bold text-lg">{users.length}</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slateDark">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">User Profile</th>
                                <th className="px-6 py-4">Contact Detail</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined On</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">Loading user registry...</td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                        No users found matching "{searchTerm}".
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map(user => (
                                    <tr key={user.id} className={`hover:bg-slate-50/50 transition-colors ${user.isBlocked ? 'bg-red-50/30' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">
                                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slateDark">{user.name || 'Anonymous User'}</p>
                                                    <p className="text-xs text-slate-500 font-mono">{user.id.substring(0, 8)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 space-y-1">
                                            {user.email && (
                                                <div className="flex items-center text-xs">
                                                    <Mail className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                                                    <span>{user.email}</span>
                                                </div>
                                            )}
                                            {user.phone && (
                                                <div className="flex items-center text-xs">
                                                    <Phone className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                                                    <span>{user.phone}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.isBlocked ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                                                    <UserX className="w-3 h-3 mr-1" /> BLOCKED
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                                                    <UserCheck className="w-3 h-3 mr-1" /> ACTIVE
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {user.createdAt ? (
                                                <div className="flex items-center text-xs">
                                                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                                    {user.createdAt?.toDate ? user.createdAt.toDate().toLocaleDateString() : new Date(user.createdAt).toLocaleDateString()}
                                                </div>
                                            ) : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => toggleBlockStatus(user)}
                                                    className={`p-1.5 rounded-lg transition-colors ${user.isBlocked
                                                        ? 'text-green-600 hover:bg-green-50'
                                                        : 'text-orange-500 hover:bg-orange-50'
                                                        }`}
                                                    title={user.isBlocked ? "Unblock User" : "Block User"}
                                                >
                                                    {user.isBlocked ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Permanently Delete"
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
        </div>
    );
};

export default Users;
