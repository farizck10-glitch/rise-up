import React, { useState, useEffect } from 'react';
import { Users, Briefcase, BookOpen, AlertCircle, Activity, TrendingUp } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

const DashboardHome = () => {
    const [stats, setStats] = useState({
        users: 0,
        workers: 0,
        schemes: 0,
        emergencies: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Fetch document counts 
                // Note: In a production heavily-used app, getCountFromServer() is better, 
                // but for a lightweight admin app getDocs size is fine to implement quickly.
                const usersSnap = await getDocs(query(collection(db, 'users')));
                const workersSnap = await getDocs(query(collection(db, 'workers')));
                const schemesSnap = await getDocs(query(collection(db, 'schemes')));
                const emergenciesSnap = await getDocs(query(collection(db, 'emergencies')));

                setStats({
                    users: usersSnap.size,
                    workers: workersSnap.size,
                    schemes: schemesSnap.size,
                    emergencies: emergenciesSnap.size,
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCounts();
    }, []);

    const StatCard = ({ title, value, icon, colorClass, delay }) => (
        <div className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-4 duration-500`} style={{ animationDelay: delay }}>
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
                    {icon}
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-slateDark">
                        {loading ? <div className="h-8 w-16 bg-slate-200 rounded animate-pulse inline-block" /> : value}
                    </h3>
                </div>
            </div>
            <div className="flex items-center text-sm font-medium text-green-600 bg-green-50 w-fit px-2 py-1 rounded-lg">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span>Active</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-8 text-white shadow-lg overflow-hidden relative">
                <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-3xl font-bold mb-3">System Overview / സിസ്റ്റം വിവരങ്ങൾ</h1>
                    <p className="text-blue-100 text-lg opacity-90">
                        Welcome to the Central Command. You have full remote control over the Panayi Ward 18 App. Manage users, workers, schemes, and push breaking news instantly.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users / ആകെ ഉപയോക്താക്കൾ"
                    value={stats.users}
                    icon={<Users className="w-6 h-6" />}
                    colorClass="bg-blue-50 text-blue-600"
                    delay="0ms"
                />
                <StatCard
                    title="Workers / തൊഴിലാളികൾ"
                    value={stats.workers}
                    icon={<Briefcase className="w-6 h-6" />}
                    colorClass="bg-indigo-50 text-indigo-600"
                    delay="100ms"
                />
                <StatCard
                    title="Schemes / ഗവ. സ്കീമുകൾ"
                    value={stats.schemes}
                    icon={<BookOpen className="w-6 h-6" />}
                    colorClass="bg-violet-50 text-violet-600"
                    delay="200ms"
                />
                <StatCard
                    title="Emergency / എമർജൻസി"
                    value={stats.emergencies}
                    icon={<AlertCircle className="w-6 h-6" />}
                    colorClass="bg-rose-50 text-rose-600"
                    delay="300ms"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slateDark flex items-center mb-4">
                        <Activity className="w-5 h-5 mr-2 text-blue-600" />
                        System Status / ആപ്പ് സ്റ്റാറ്റസ്
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <span className="font-medium text-slate-700">Database Connection</span>
                            <span className="flex items-center text-green-600 text-sm font-bold bg-green-100 px-3 py-1 rounded-full">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div> Healthy
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <span className="font-medium text-slate-700">App Maintenance Mode</span>
                            <span className="flex items-center text-slate-600 text-sm font-bold bg-slate-200 px-3 py-1 rounded-full">
                                Inactive
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
